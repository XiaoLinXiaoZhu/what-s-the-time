# 详细迁移计划：去除 ScriptLine 中间状态

## 📊 当前架构分析总结

### 代码影响范围（基于静态分析）

| 层级 | 文件数 | 关键文件 |
|------|--------|----------|
| **类型定义** | 2 | [src/types/index.ts](src/types/index.ts:1), [src/types/parser.ts](src/types/parser.ts:1) |
| **解析器** | 3 | [src/parsers/script-parser.ts](src/parsers/script-parser.ts:1), [src/parsers/ast-builder.ts](src/parsers/ast-builder.ts:1), [src/parsers/tokenizer.ts](src/parsers/tokenizer.ts:1) |
| **服务层** | 5 | [src/services/ChoiceService.ts](src/services/ChoiceService.ts:1), [src/services/NavigationService.ts](src/services/NavigationService.ts:1), [src/services/TimeChoiceService.ts](src/services/TimeChoiceService.ts:1), [src/services/CommandService.ts](src/services/CommandService.ts:1), [src/services/LineConversionService.ts](src/services/LineConversionService.ts:1) |
| **组件层** | 7 | [src/components/ScriptLineRenderer.vue](src/components/ScriptLineRenderer.vue:1), [src/components/ChoiceLine.vue](src/components/ChoiceLine.vue:1), [src/components/TimeChoiceLine.vue](src/components/TimeChoiceLine.vue:1), [src/components/InputLine.vue](src/components/InputLine.vue:1), [src/components/NarrationLine.vue](src/components/NarrationLine.vue:1), [src/components/DialogueLine.vue](src/components/DialogueLine.vue:1), [src/components/CommandLine.vue](src/components/CommandLine.vue:1) |
| **组合式函数** | 5 | [src/composables/useGameNavigation.ts](src/composables/useGameNavigation.ts:1), [src/composables/useLineState.ts](src/composables/useLineState.ts:1), [src/composables/useScriptDisplay.ts](src/composables/useScriptDisplay.ts:1), [src/composables/useTimeInput.ts](src/composables/useTimeInput.ts:1), [src/composables/useAnimateText.ts](src/composables/useAnimateText.ts:1) |
| **数据层** | 14 | [src/data/script/index.ts](src/data/script/index.ts:1), [src/data/script/start/](src/data/script/start/) (7 files), [src/data/script/sample/](src/data/script/sample/) (4 files), [src/data/script/segments/](src/data/script/segments/) (1 file), [src/data/script/blank.ts](src/data/script/blank.ts:1) |
| **状态管理** | 1 | [src/stores/StateStore.ts](src/stores/StateStore.ts:1) |
| **工具函数** | 1 | [src/utils/textParser.ts](src/utils/textParser.ts:1) |
| **测试** | 1 | [src/parsers/__tests__/parser.test.ts](src/parsers/__tests__/parser.test.ts:1) |
| **总计** | **39** | |

---

## 🔍 核心问题详细分析

### 问题1：双重解析开销

**当前流程**：
```typescript
// 1. 解析器阶段（src/parsers/ast-builder.ts）
const narrationLine: NarrationLine = {
  type: 'narration',
  text: '{red}你好{/red}{delay:1}'  // ❌ 原始字符串
}

// 2. 运行时渲染阶段（每次渲染）
const textNodes = parseText(narrationLine.text)  // ❌ 重复解析
```

**影响范围**：
- 所有包含 `text` 字段的行类型：[DialogueLine](src/types/index.ts:40), [NarrationLine](src/types/index.ts:51)
- 所有渲染这些行的组件：[DialogueLine.vue](src/components/DialogueLine.vue:1), [NarrationLine.vue](src/components/NarrationLine.vue:1)
- 文本解析工具：[textParser.ts](src/utils/textParser.ts:1)

### 问题2：Choice 内联限制

**当前设计**：
```typescript
// src/types/index.ts:60-71
interface ChoiceLine {
  type: 'choice'
  choices: Array<{
    text: string
    lines: ScriptLine[]  // ❌ 内联内容，无法引用其他片段
    setFlag?: string
  }>
}
```

**导致的问题**：
1. **无法循环引用**：片段A → 片段B → 片段A 不可能实现
2. **无法跨文件引用**：所有内容必须在同一文件中
3. **内容复用困难**：多个choice指向相同内容需要重复定义
4. **复杂度增加**：嵌套结构使得代码难以理解和维护

**影响范围**：
- 解析器：[ast-builder.ts:376-396](src/parsers/ast-builder.ts:376-396) 递归解析子片段
- 服务层：[ChoiceService.ts:58-59](src/services/ChoiceService.ts:58-59) 直接插入内联行
- 组件层：[ChoiceLine.vue](src/components/ChoiceLine.vue:1) 接收内联行

### 问题3：职责不清

**当前类型职责混合**：
```typescript
// ScriptLine 既表示语义...
interface DialogueLine {
  type: 'dialogue'     // ✅ 语义：这是对话
  text: string          // ❌ 数据：需要解析的原始文本
}

// ...又包含展示格式
const text = '{red}你好{/red}'  // 混合了语义和展示
```

---

## 🎯 详细迁移计划

### 阶段0：准备工作（1天）

#### 目标
创建开发分支，建立基础架构，准备测试环境。

#### 任务清单

1. **创建特性分支**
   ```bash
   git checkout -b feature/remove-scriptline-intermediate
   ```

2. **创建新类型文件**
   - 文件：`src/types/script-v2.ts`
   - 内容：定义新的扁平化类型系统
   - 见下文"新类型定义"章节

3. **创建迁移文档**
   - 文件：`docs/script/MIGRATION_GUIDE.md`
   - 内容：详细的迁移步骤和注意事项

4. **备份现有数据**
   - 确保所有 `.ts` 和 `.md` 剧本文件已提交到 Git
   - 创建数据备份分支

---

### 阶段1：类型定义重构（2-3天）

#### 目标
创建新的类型系统，与旧类型并存，支持渐进式迁移。

#### 1.1 创建新类型文件

**文件**：`src/types/script-v2.ts`

```typescript
/**
 * 新的剧本类型系统（V2）
 * 
 * 核心改进：
 * 1. 扁平化设计：去除内联，使用片段引用
 * 2. 单次解析：文本直接解析为 TextNode[]
 * 3. 职责分离：语义层与展示层完全解耦
 */

/**
 * 剧本片段（扁平化设计）
 */
export interface ScriptSegmentV2 {
  id: string
  time: string
  description?: string
  loop?: string
  unlockFlags?: string[]
  
  /**
   * 扁平化的内容行
   * 每行要么是已解析的文本节点，
   * 要么是特殊标记（如 CHOICE, INPUT, COMMAND）
   */
  lines: ContentLine[]
}

/**
 * 内容行类型（扁平化）
 */
export type ContentLine = 
  | TextLine           // 文本行（包含已解析的 TextNode[]）
  | ChoiceLineV2       // 选择分支（引用式）
  | InputLineV2        // 输入框
  | CommandLineV2      // 命令
  | TimeDisplayLineV2  // 时间显示

/**
 * 文本行（直接包含已解析的 TextNode）
 */
export interface TextLine {
  type: 'text'
  /**
   * 已解析的文本节点
   * 无需再次解析，直接用于渲染
   */
  nodes: TextNode[]
}

/**
 * 对话文本行
 */
export interface DialogueTextLine {
  type: 'dialogue'
  /** 角色名（可选） */
  character?: string
  /** 已解析的文本节点 */
  nodes: TextNode[]
}

/**
 * 旁白文本行
 */
export interface NarrationTextLine {
  type: 'narration'
  /** 已解析的文本节点 */
  nodes: TextNode[]
}

/**
 * 选择分支（引用式）
 */
export interface ChoiceLineV2 {
  type: 'choice'
  choices: Array<{
    /** 选项文本 */
    text: string
    /**
     * 选择后要执行的片段ID列表
     * 支持多片段依次执行
     */
    targetSegments: string[]
    /** 选择后设置的 flag */
    setFlag?: string
  }>
}

/**
 * 时间匹配分支（引用式）
 */
export interface TimeChoiceLineV2 {
  type: 'timeChoice'
  choices: Array<{
    /** 匹配的时间模式 */
    time: string
    /**
     * 匹配后要执行的片段ID列表
     */
    targetSegments: string[]
    /** 匹配后设置的 flag */
    setFlag?: string
  }>
}

/**
 * 输入框行
 */
export interface InputLineV2 {
  type: 'input'
  /** 提示文本 */
  placeholder?: string
}

/**
 * 命令行
 */
export interface CommandLineV2 {
  type: 'command'
  /** 命令类型 */
  command: 'setFlag' | 'unsetFlag' | 'jump' | 'end' | 'return'
  /** 命令参数 */
  params: Record<string, any>
}

/**
 * 时间显示行
 */
export interface TimeDisplayLineV2 {
  type: 'timeDisplay'
  /** 要显示的时间值（HH:MM格式） */
  value: string
}

/**
 * 文本格式类型（复用）
 */
export type TextFormat = 'bold' | 'italic' | 'red' | 'blur' | 'strike'

/**
 * 解析后的文本节点（用于渲染）
 * 复用现有定义
 */
export interface TextNode {
  type: 'text' | 'bold' | 'italic' | 'red' | 'blur' | 'strike' | 'linebreak' | 'delay' | 'systemTime' | 'animateText'
  content: string
  formats?: TextFormat[]
  delayTime?: number
  animateTexts?: string[]
}

/**
 * 显示行（运行时状态）
 */
export interface DisplayedLineV2 extends ContentLine {
  /** 唯一标识 */
  id: string
  /** 行的状态 */
  status: LineStatus
  /** 选中的选项索引（仅用于 choice 类型） */
  selectedChoiceIndex?: number
}

/**
 * 行的状态
 */
export type LineStatus = 'pending' | 'active' | 'completed' | 'disabled'

/**
 * 片段引用行（新增，支持跨文件引用）
 */
export interface SegmentRefLine {
  type: 'segmentRef'
  /** 目标片段ID（可选包含文件路径） */
  targetId: string
  /** 引用的行索引范围（可选） */
  lineRange?: [number, number]
}
```

#### 1.2 更新类型导出

**文件**：`src/types/index.ts`

在文件末尾添加：

```typescript
// 导出新类型系统（V2）
export * from './script-v2'

// 旧类型保留，用于渐进式迁移
// ... 现有代码保持不变
```

#### 1.3 创建类型兼容层

**文件**：`src/utils/type-conversion.ts`

```typescript
import type { ScriptSegment, ScriptLine } from '@/types'
import type { ScriptSegmentV2, ContentLine, TextNode } from '@/types/script-v2'
import { parseText } from './textParser'

/**
 * 将 V1 ScriptSegment 转换为 V2 ScriptSegmentV2
 * 用于渐进式迁移
 */
export function convertSegmentV1ToV2(segment: ScriptSegment): ScriptSegmentV2 {
  return {
    id: segment.id,
    time: segment.time,
    description: segment.description,
    loop: segment.loop,
    unlockFlags: segment.unlockFlags,
    lines: segment.lines.map(convertLineV1ToV2)
  }
}

/**
 * 将 V1 ScriptLine 转换为 V2 ContentLine
 */
export function convertLineV1ToV2(line: ScriptLine): ContentLine {
  switch (line.type) {
    case 'dialogue':
      return {
        type: 'dialogue',
        character: line.character,
        nodes: parseText(line.text)
      }
    
    case 'narration':
      return {
        type: 'narration',
        nodes: parseText(line.text)
      }
    
    case 'choice':
      // Choice 暂时保持不变，后续阶段处理
      return line as any
    
    case 'timeChoice':
      // TimeChoice 暂时保持不变，后续阶段处理
      return line as any
    
    case 'input':
      return {
        type: 'input',
        placeholder: line.placeholder
      }
    
    case 'command':
      return {
        type: 'command',
        command: line.command,
        params: line.params
      }
    
    case 'timeDisplay':
      return {
        type: 'timeDisplay',
        value: line.value
      }
  }
}
```

#### 验收标准
- [ ] 新类型文件创建完成
- [ ] 类型导出正确配置
- [ ] 兼容层函数编写完成
- [ ] TypeScript 编译通过

---

### 阶段2：解析器改造（3-4天）

#### 目标
修改解析器，输出新格式（扁平化 + 引用）。

#### 2.1 创建 V2 解析器

**文件**：`src/parsers/script-parser-v2.ts`

```typescript
import type { ParserOptions, ParseResult } from '@/types/parser'
import type { ScriptSegmentV2 } from '@/types/script-v2'
import { ScriptTokenizer } from './tokenizer'
import { ScriptAstBuilderV2 } from './ast-builder-v2'
import { parseText } from '@/utils/textParser'

/**
 * ScriptParser V2 - 主解析器
 * 
 * 流程：
 * Markdown文件 -> Tokenizer -> TokenSegment -> AstBuilderV2 -> ScriptSegmentV2
 * 
 * 改进：
 * - 文本直接解析为 TextNode[]
 * - Choice 选项改为 targetSegments 引用
 * - 去除子片段内联逻辑
 */
export class ScriptParserV2 {
  private options: ParserOptions
  private cache: Map<string, ParseResult>

  constructor(options: ParserOptions = {}) {
    this.options = {
      enableCache: options.enableCache ?? true,
      maxNestingDepth: options.maxNestingDepth ?? 5
    }
    this.cache = new Map()
  }

  /**
   * 解析剧本文件
   */
  parse(content: string, filePath?: string): ParseResult {
    const cacheKey = filePath || content
    
    if (this.options.enableCache && this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey)!
    }

    const startTime = performance.now()
    
    try {
      // 阶段1：Tokenization（复用现有 Tokenizer）
      const tokenizer = new ScriptTokenizer({ keepComments: false })
      const tokens = tokenizer.tokenize(content)
      
      // 阶段2：AST构建（使用新的 V2 Builder）
      const astBuilder = new ScriptAstBuilderV2()
      const segments = tokens.map(token => astBuilder.build(token))
      
      if (segments.length === 0) {
        throw new Error('未找到有效的剧本片段')
      }
      
      const segment = segments[0]
      
      const parseTime = performance.now() - startTime
      
      const result: ParseResult = {
        segment: segment as any, // TODO: 修改 ParseResult 类型以支持 V2
        parseTime,
        filePath
      }
      
      if (this.options.enableCache) {
        this.cache.set(cacheKey, result)
      }
      
      return result
    } catch (error) {
      throw new Error(
        `解析失败: ${error instanceof Error ? error.message : String(error)}`
      )
    }
  }

  clearCache(): void {
    this.cache.clear()
  }
}

/**
 * 便捷函数
 */
export function parseScriptV2(content: string, filePath?: string): ScriptSegmentV2 {
  const parser = new ScriptParserV2({ enableCache: true })
  const result = parser.parse(content, filePath)
  return result.segment as ScriptSegmentV2
}
```

#### 2.2 创建 V2 AST Builder

**文件**：`src/parsers/ast-builder-v2.ts`

```typescript
import type { TokenSegment } from '@/types/parser'
import type { ScriptSegmentV2, ContentLine, TextNode, ChoiceLineV2 } from '@/types/script-v2'
import { ParseError } from '@/types/parser'
import { parseText } from '@/utils/textParser'

/**
 * AST Builder V2 - 阶段2：类型转换和引用解析
 * 
 * 改进：
 * - 文本直接解析为 TextNode[]
 * - Choice 选项改为 targetSegments 引用
 * - 去除子片段内联逻辑
 */
export class ScriptAstBuilderV2 {
  /**
   * 构建ScriptSegmentV2
   */
  build(token: TokenSegment): ScriptSegmentV2 {
    const { metadata, content, subSegments } = token
    
    const lines = this.parseLines(content, subSegments, metadata.id)
    
    return {
      id: metadata.id,
      time: metadata.time,
      description: metadata.description,
      loop: metadata.loop,
      unlockFlags: metadata.unlockFlags,
      lines
    }
  }

  /**
   * 解析内容行
   */
  private parseLines(
    lines: string[],
    subSegments: Map<string, string[]>,
    segmentId: string
  ): ContentLine[] {
    const scriptLines: ContentLine[] = []
    let i = 0
    
    while (i < lines.length) {
      const line = lines[i].trim()
      
      if (!line) {
        i++
        continue
      }
      
      const parsed = this.parseLine(lines, i, segmentId, subSegments)
      if (parsed) {
        scriptLines.push(...parsed.lines)
        i += parsed.consumedLines
      } else {
        i++
      }
    }
    
    return scriptLines
  }

  /**
   * 解析单行
   */
  private parseLine(
    lines: string[],
    lineIndex: number,
    segmentId: string,
    subSegments: Map<string, string[]>
  ): { lines: ContentLine[]; consumedLines: number } | null {
    const line = lines[lineIndex].trim()
    const typeMatch = line.match(/^(narration|dialogue|input|timeDisplayLine|choice|command)(?:\s+(.+))?$/i)
    
    if (!typeMatch) {
      return null
    }
    
    const type = typeMatch[1].toLowerCase()
    const extra = typeMatch[2]
    
    switch (type) {
      case 'narration':
        return this.parseNarration(extra, lines, lineIndex)
      
      case 'dialogue':
        return this.parseDialogue(extra, lines, lineIndex)
      
      case 'input':
        return this.parseInput(extra, lines, lineIndex)
      
      case 'timedisplayline':
        return this.parseTimeDisplayLine(extra, lineIndex)
      
      case 'choice':
        return this.parseChoice(extra, lines, lineIndex, segmentId, subSegments)
      
      case 'command':
        return this.parseCommand(extra, lines, lineIndex)
      
      default:
        return null
    }
  }

  /**
   * 解析旁白行（V2：直接返回 TextNode[]）
   */
  private parseNarration(
    text: string | undefined,
    lines: string[],
    lineIndex: number
  ): { lines: ContentLine[]; consumedLines: number } {
    if (text) {
      return {
        lines: [{
          type: 'narration',
          nodes: parseText(text.trim())  // ✅ 一次解析
        }],
        consumedLines: 1
      }
    }
    
    return this.parseMultilineText('narration', lines, lineIndex)
  }

  /**
   * 解析对话行（V2：直接返回 TextNode[]）
   */
  private parseDialogue(
    text: string | undefined,
    lines: string[],
    lineIndex: number
  ): { lines: ContentLine[]; consumedLines: number } {
    if (text) {
      return {
        lines: [{
          type: 'dialogue',
          character: undefined,
          nodes: parseText(text.trim())  // ✅ 一次解析
        }],
        consumedLines: 1
      }
    }
    
    return this.parseMultilineDialogue(lines, lineIndex)
  }

  /**
   * 解析多行对话
   */
  private parseMultilineDialogue(
    lines: string[],
    lineIndex: number
  ): { lines: ContentLine[]; consumedLines: number } {
    let i = lineIndex + 1
    const textParts: string[] = []
    let character: string | undefined = undefined
    
    // 第一行可能是角色名
    const firstLine = lines[i]?.trim()
    if (firstLine && !firstLine.startsWith('#') && !firstLine.startsWith('>') && 
        !firstLine.match(/^(narration|dialogue|input|choice|command)/i)) {
      // 可能是角色名
      const characterMatch = firstLine.match(/^([^:]+):/)
      if (characterMatch) {
        character = characterMatch[1].trim()
        i++
      } else {
        textParts.push(firstLine)
        i++
      }
    }
    
    while (i < lines.length) {
      const line = lines[i].trim()
      
      if (!line) break
      
      if (line.match(/^(narration|dialogue|input|choice|command)/i)) break
      
      textParts.push(line)
      i++
    }
    
    return {
      lines: [{
        type: 'dialogue',
        character,
        nodes: parseText(textParts.join('\n'))
      }],
      consumedLines: i - lineIndex
    }
  }

  /**
   * 解析多行文本
   */
  private parseMultilineText(
    type: 'narration',
    lines: string[],
    startIndex: number
  ): { lines: ContentLine[]; consumedLines: number } {
    const textParts: string[] = []
    let i = startIndex + 1
    
    while (i < lines.length) {
      const line = lines[i].trim()
      
      if (!line) break
      
      if (line.match(/^(narration|dialogue|input|choice|command)/i)) break
      
      textParts.push(line)
      i++
    }
    
    return {
      lines: [{
        type,
        nodes: parseText(textParts.join('\n'))
      }],
      consumedLines: i - startIndex + 1
    }
  }

  /**
   * 解析输入行
   */
  private parseInput(
    placeholder: string | undefined,
    lines: string[],
    lineIndex: number
  ): { lines: ContentLine[]; consumedLines: number } {
    if (placeholder) {
      return {
        lines: [{
          type: 'input',
          placeholder: placeholder.trim()
        }],
        consumedLines: 1
      }
    }
    
    const nextLine = lineIndex + 1 < lines.length ? lines[lineIndex + 1].trim() : ''
    
    if (!nextLine) {
      throw new ParseError('input 需要指定 placeholder 内容', lineIndex)
    }
    
    return {
      lines: [{
        type: 'input',
        placeholder: nextLine
      }],
      consumedLines: 2
    }
  }

  /**
   * 解析时间显示行
   */
  private parseTimeDisplayLine(
    value: string | undefined,
    lineIndex: number
  ): { lines: ContentLine[]; consumedLines: number } {
    if (!value) {
      throw new ParseError('timeDisplayLine 需要指定时间值', lineIndex)
    }
    
    return {
      lines: [{
        type: 'timeDisplay',
        value: value.trim()
      }],
      consumedLines: 1
    }
  }

  /**
   * 解析选择行（V2：使用引用而非内联）
   */
  private parseChoice(
    _extra: string | undefined,
    lines: string[],
    lineIndex: number,
    segmentId: string,
    subSegments: Map<string, string[]>
  ): { lines: ContentLine[]; consumedLines: number } {
    const result = this.parseChoiceOptionsV2(lines, lineIndex + 1, segmentId, subSegments)
    
    return {
      lines: [{
        type: 'choice',
        choices: result.choices
      }],
      consumedLines: 1 + result.consumedLines
    }
  }

  /**
   * 解析选项列表（V2：使用引用）
   */
  private parseChoiceOptionsV2(
    lines: string[],
    startIndex: number,
    segmentId: string,
    subSegments: Map<string, string[]>
  ): { choices: ChoiceLineV2['choices']; consumedLines: number } {
    const choices: ChoiceLineV2['choices'] = []
    let i = startIndex
    
    while (i < lines.length) {
      const line = lines[i].trim()
      
      if (!line || !line.startsWith('-')) {
        break
      }
      
      const linkMatch = line.match(/-\s*\[([^\]]+)\]\(([^\)]+)\)/)
      
      if (!linkMatch) {
        throw new ParseError(`无效的选项格式: ${line}`, i)
      }
      
      const text = linkMatch[1]
      const target = linkMatch[2]
      
      // 检查是否是子片段引用
      const subSegmentIdMatch = target.match(/^#(.+)$/)
      
      if (subSegmentIdMatch) {
        // V2：子片段转换为独立片段引用
        const subSegmentId = subSegmentIdMatch[1]
        const subSegmentLines = subSegments.get(subSegmentId)
        
        if (!subSegmentLines) {
          throw new ParseError(
            `未找到子片段: #${subSegmentId}`,
            i,
            undefined,
            segmentId
          )
        }
        
        // ✅ 改为引用：创建独立的片段ID
        const targetSegmentId = `${segmentId}-${subSegmentId}`
        
        // TODO: 这里需要将子片段内容保存为独立片段
        // 暂时使用临时方案：将子片段ID映射到实际片段ID
        choices.push({
          text,
          targetSegments: [targetSegmentId]
        })
      } else {
        // 普通选项，可能包含flag设置
        const setFlagMatch = target.match(/^setFlag:(.+)$/)
        const setFlag = setFlagMatch ? setFlagMatch[1] : undefined
        
        // 如果不是子片段引用，且没有flag，则是一个空选项（无效）
        if (!setFlag && !subSegmentIdMatch) {
          throw new ParseError(`无效的选项目标: ${target}`, i)
        }
        
        // 如果有flag但没有子片段，则不需要跳转
        if (setFlag && !subSegmentIdMatch) {
          choices.push({
            text,
            targetSegments: [],  // 不跳转，只设置flag
            setFlag
          })
        }
      }
      
      i++
    }
    
    return {
      choices,
      consumedLines: i - startIndex
    }
  }

  /**
   * 解析命令行
   */
  private parseCommand(
    commandStr: string | undefined,
    lines: string[],
    lineIndex: number
  ): { lines: ContentLine[]; consumedLines: number } {
    if (!commandStr) {
      const nextLine = lineIndex + 1 < lines.length ? lines[lineIndex + 1].trim() : ''
      
      if (!nextLine) {
        throw new ParseError('command 需要指定命令类型', lineIndex)
      }
      
      commandStr = nextLine
    }
    
    const parts = commandStr.trim().split(/\s+/)
    const commandType = parts[0]
    const params: Record<string, any> = {}
    
    switch (commandType) {
      case 'setFlag':
        if (parts.length < 2) {
          throw new ParseError('setFlag 命令需要指定flag名称', lineIndex)
        }
        params.flag = parts.slice(1).join(' ')
        break
      
      case 'unsetFlag':
        if (parts.length < 2) {
          throw new ParseError('unsetFlag 命令需要指定flag名称', lineIndex)
        }
        params.flag = parts.slice(1).join(' ')
        break
      
      case 'jump':
        if (parts.length < 2) {
          throw new ParseError('jump 命令需要指定目标片段ID', lineIndex)
        }
        params.segmentId = parts.slice(1).join(' ')
        break
      
      case 'end':
        // 无参数
        break
      
      case 'return':
        // 新增命令：返回到上一个片段
        break
      
      default:
        throw new ParseError(`未知的命令类型: ${commandType}`, lineIndex)
    }
    
    return {
      lines: [{
        type: 'command',
        command: commandType as any,
        params
      }],
      consumedLines: commandStr === lines[lineIndex + 1]?.trim() ? 2 : 1
    }
  }
}
```

#### 2.3 更新测试用例

**文件**：`src/parsers/__tests__/parser-v2.test.ts`

创建新的测试文件，验证 V2 解析器：

```typescript
import { describe, it, expect } from 'bun:test'
import { parseScriptV2 } from '../script-parser-v2'

describe('ScriptParserV2', () => {
  describe('基本解析', () => {
    it('应该成功解析简单的剧本片段', () => {
      const content = `
---
id: TEST-001
time: START
description: 测试片段
loop: P0
unlockFlags: []
---
narration
这是一段旁白。

dialogue
这是一句对话。
`
      
      const segment = parseScriptV2(content)
      
      expect(segment.id).toBe('TEST-001')
      expect(segment.time).toBe('START')
      expect(segment.description).toBe('测试片段')
      expect(segment.loop).toBe('P0')
      expect(segment.unlockFlags).toEqual([])
      expect(segment.lines).toHaveLength(2)
    })

    it('应该正确解析narration类型（包含已解析的nodes）', () => {
      const content = `
---
id: TEST-002
time: START
---
narration
这是{bold}旁白{/bold}内容。
`
      
      const segment = parseScriptV2(content)
      
      expect(segment.lines).toHaveLength(1)
      const line = segment.lines[0]
      expect(line.type).toBe('narration')
      
      // ✅ 验证已包含 TextNode[]
      if (line.type === 'narration') {
        expect(line.nodes).toHaveLength(3) // '这是', '旁白', '内容。'
        expect(line.nodes[1].type).toBe('bold')
        expect(line.nodes[1].content).toBe('旁白')
      }
    })
  })

  describe('Choice和引用', () => {
    it('应该正确解析choice选项（使用引用）', () => {
      const content = `
---
id: TEST-003
time: START
---
narration
选择你的答案：

choice
- [选项一](SEGMENT-OPTION-1)
- [选项二](SEGMENT-OPTION-2)

# SEGMENT-OPTION-1
narration
选择了选项一。

# SEGMENT-OPTION-2
narration
选择了选项二。
`
      
      const segment = parseScriptV2(content)
      
      const choiceLine = segment.lines.find(l => l.type === 'choice')
      expect(choiceLine).toBeDefined()
      
      if (choiceLine?.type === 'choice') {
        expect(choiceLine.choices).toHaveLength(2)
        expect(choiceLine.choices[0].text).toBe('选项一')
        expect(choiceLine.choices[1].text).toBe('选项二')
        
        // ✅ 验证使用引用而非内联
        expect(choiceLine.choices[0].targetSegments).toEqual(['TEST-003-SEGMENT-OPTION-1'])
        expect(choiceLine.choices[1].targetSegments).toEqual(['TEST-003-SEGMENT-OPTION-2'])
      }
    })
  })
})
```

#### 验收标准
- [ ] V2 解析器创建完成
- [ ] V2 AST Builder 创建完成
- [ ] 文本直接解析为 TextNode[]
- [ ] Choice 使用引用而非内联
- [ ] 所有测试用例通过

---

### 阶段3：片段查找服务（2-3天）

#### 目标
实现片段ID查找机制，支持引用跳转。

#### 3.1 创建片段注册表

**文件**：`src/services/SegmentRegistry.ts`

```typescript
import type { ScriptSegmentV2 } from '@/types/script-v2'

/**
 * 片段注册表
 * 
 * 职责：
 * - 集中管理所有片段
 * - 提供片段查找功能
 * - 支持片段缓存
 */
export class SegmentRegistry {
  private segments = new Map<string, ScriptSegmentV2>()
  private segmentIndex: Map<string, string[]> = new Map()  // time -> segmentIds
  
  /**
   * 注册片段
   */
  register(segment: ScriptSegmentV2): void {
    this.segments.set(segment.id, segment)
    
    // 索引时间点
    if (!this.segmentIndex.has(segment.time)) {
      this.segmentIndex.set(segment.time, [])
    }
    this.segmentIndex.get(segment.time)!.push(segment.id)
  }
  
  /**
   * 批量注册片段
   */
  registerAll(segments: ScriptSegmentV2[]): void {
    segments.forEach(segment => this.register(segment))
  }
  
  /**
   * 根据ID获取片段
   */
  get(id: string): ScriptSegmentV2 | undefined {
    return this.segments.get(id)
  }
  
  /**
   * 根据时间获取片段列表
   */
  getByTime(time: string): ScriptSegmentV2[] {
    const ids = this.segmentIndex.get(time) || []
    return ids.map(id => this.segments.get(id)!).filter(Boolean)
  }
  
  /**
   * 检查片段是否存在
   */
  has(id: string): boolean {
    return this.segments.has(id)
  }
  
  /**
   * 获取所有片段ID
   */
  getAllIds(): string[] {
    return Array.from(this.segments.keys())
  }
  
  /**
   * 清空注册表
   */
  clear(): void {
    this.segments.clear()
    this.segmentIndex.clear()
  }
  
  /**
   * 获取统计信息
   */
  getStats(): {
    totalSegments: number
    uniqueTimes: number
    segmentIds: string[]
  } {
    return {
      totalSegments: this.segments.size,
      uniqueTimes: this.segmentIndex.size,
      segmentIds: Array.from(this.segments.keys())
    }
  }
}

// 全局单例
export const segmentRegistry = new SegmentRegistry()
```

#### 3.2 创建片段加载器

**文件**：`src/services/SegmentLoader.ts`

```typescript
import type { ScriptSegmentV2 } from '@/types/script-v2'
import { segmentRegistry } from './SegmentRegistry'
import { parseScriptV2 } from '@/parsers/script-parser-v2'

/**
 * 片段加载器
 * 
 * 职责：
 * - 按需加载片段
 * - 支持跨文件引用
 * - 自动注册到注册表
 */
export class SegmentLoader {
  private loadedFiles = new Set<string>()
  private cache = new Map<string, ScriptSegmentV2>()
  
  /**
   * 加载片段（按需）
   */
  async load(id: string): Promise<ScriptSegmentV2 | undefined> {
    // 1. 检查缓存
    if (this.cache.has(id)) {
      return this.cache.get(id)
    }
    
    // 2. 检查注册表
    const registered = segmentRegistry.get(id)
    if (registered) {
      return registered
    }
    
    // 3. 尝试从文件加载
    const parsed = await this.loadFromFile(id)
    if (parsed) {
      this.cache.set(id, parsed)
      segmentRegistry.register(parsed)
      return parsed
    }
    
    return undefined
  }
  
  /**
   * 从文件加载片段
   */
  private async loadFromFile(id: string): Promise<ScriptSegmentV2 | undefined> {
    try {
      // 构建文件路径：src/data/script/segments/{id}.ts
      const filePath = `/src/data/script/segments/${id}.ts`
      
      // 动态导入
      const module = await import(filePath)
      
      // 假设导出的是 ScriptSegmentV2
      const segment = module[id] || module.default || module.segment
      
      if (!segment) {
        console.warn(`片段 ${id} 在文件 ${filePath} 中未找到`)
        return undefined
      }
      
      return segment
    } catch (error) {
      console.warn(`无法加载片段 ${id}:`, error)
      return undefined
    }
  }
  
  /**
   * 预加载多个片段
   */
  async preload(ids: string[]): Promise<void> {
    await Promise.all(ids.map(id => this.load(id)))
  }
  
  /**
   * 清空缓存
   */
  clearCache(): void {
    this.cache.clear()
  }
}

// 全局单例
export const segmentLoader = new SegmentLoader()
```

#### 验收标准
- [ ] 片段注册表创建完成
- [ ] 片段加载器创建完成
- [ ] 支持按需加载
- [ ] 支持跨文件引用

---

### 阶段4：导航服务改造（3-4天）

#### 目标
修改导航逻辑，使用引用跳转而非内联显示。

#### 4.1 修改 ChoiceService

**文件**：`src/services/ChoiceService.ts`

```typescript
import { stateStore } from '@/stores/StateStore'
import { navigationService } from './NavigationService'
import type { ChoiceLineV2, DisplayedLineV2, LineStatus } from '@/types/script-v2'

/**
 * 选择服务（V2）
 * 
 * 改进：
 * - 使用引用跳转而非内联插入
 * - 支持多片段依次执行
 */
export class ChoiceServiceV2 {
  /**
   * 处理选择（V2：跳转到目标片段）
   */
  async handleChoice(
    choice: ChoiceLineV2['choices'][0],
    lineId: string,
    choiceIndex: number
  ): Promise<void> {
    const displayState = stateStore._internalDisplayState
    const line = displayState.displayedLines.find(l => l.id === lineId)

    if (!line || line.type !== 'choice') {
      return
    }

    // 检查是否已完成
    const status = stateStore._internalLineStates.get(lineId)
    if (status === 'completed' || status === 'disabled') {
      return
    }

    // 更新行状态
    stateStore.updateLineState(lineId, 'completed')

    // 更新游戏状态
    if (choice.setFlag) {
      const flags = new Set(stateStore._internalGameState.unlockedFlags)
      flags.add(choice.setFlag)
      stateStore.updateGameState({ unlockedFlags: flags })
    }

    // 记录选择历史
    const choiceHistory = [...stateStore._internalGameState.choiceHistory]
    choiceHistory.push({
      choiceText: choice.text,
      timestamp: Date.now()
    })
    stateStore.updateGameState({ choiceHistory })

    // 更新选中状态
    const lineIndex = displayState.displayedLines.findIndex(l => l.id === lineId)
    const displayedLines = [...displayState.displayedLines]
    const lineToUpdate = displayedLines[lineIndex]
    if (lineToUpdate && lineToUpdate.type === 'choice') {
      displayedLines[lineIndex] = {
        ...lineToUpdate,
        status: 'completed',
        selectedChoiceIndex: choiceIndex
      }
    }
    
    stateStore.updateDisplayState({
      displayedLines,
      currentLineIndex: lineIndex
    })

    // ✅ V2：跳转到目标片段而非插入行
    if (choice.targetSegments.length > 0) {
      const targetSegmentId = choice.targetSegments[0]
      
      // 保存返回点（如果需要）
      stateStore.updateGameState({
        returnToSegment: displayState.currentSegment?.id,
        returnToLineIndex: lineIndex + 1
      })
      
      // 跳转到目标片段
      navigationService.navigateToSegment(targetSegmentId)
    }
  }
}

// 单例
export const choiceServiceV2 = new ChoiceServiceV2()
```

#### 4.2 修改 NavigationService

**文件**：`src/services/NavigationService.ts`

```typescript
import { stateStore } from '@/stores/StateStore'
import { segmentRegistry } from './SegmentRegistry'
import { segmentLoader } from './SegmentLoader'
import type { ScriptSegmentV2, DisplayedLineV2, LineStatus } from '@/types/script-v2'

/**
 * 导航服务（V2）
 * 
 * 改进：
 * - 使用 SegmentRegistry 查找片段
 * - 支持片段引用跳转
 * - 支持返回功能
 */
export class NavigationServiceV2 {
  private callStack: string[] = []
  private maxCallDepth = 50

  /**
   * 导航到指定片段
   */
  async navigateToSegment(segmentId: string): Promise<void> {
    // 检测循环引用
    if (this.callStack.includes(segmentId)) {
      console.warn(`检测到循环引用: ${segmentId}`)
      throw new Error(`检测到循环引用: ${segmentId}`)
    }
    
    // 检查调用深度
    if (this.callStack.length > this.maxCallDepth) {
      throw new Error(`调用栈深度超过限制: ${this.maxCallDepth}`)
    }

    // 查找片段
    let segment = segmentRegistry.get(segmentId)
    
    if (!segment) {
      // 尝试加载
      segment = await segmentLoader.load(segmentId)
    }
    
    if (!segment) {
      console.warn(`Segment not found: ${segmentId}`)
      return
    }

    // 推入调用栈
    this.callStack.push(segmentId)

    // 执行片段
    this._navigateToSegment(segment)
  }

  /**
   * 导航到指定时间对应的片段
   */
  async navigateToTime(time: string): Promise<void> {
    const gameState = stateStore._internalGameState
    const segments = segmentRegistry.getByTime(time)
    
    // 筛选符合条件的片段
    let targetSegment: ScriptSegmentV2 | undefined
    for (const segment of segments) {
      // 检查解锁条件
      if (segment.unlockFlags) {
        const unlocked = segment.unlockFlags.every(flag => 
          gameState.unlockedFlags.has(flag)
        )
        if (!unlocked) continue
      }
      
      // 检查是否已观看
      if (gameState.viewedSegments.has(segment.id)) {
        continue
      }
      
      targetSegment = segment
      break
    }

    if (targetSegment) {
      gameState.viewedSegments.add(targetSegment.id)
      await this.navigateToSegment(targetSegment.id)
      stateStore.updateGameState({ currentTime: time })
    } else {
      // 未找到片段，显示空白
      const blankSegments = segmentRegistry.getByTime('*')
      if (blankSegments.length > 0) {
        const blankSegment = blankSegments[0]
        await this.navigateToSegment(blankSegment.id)
        stateStore.updateGameState({ currentTime: time })
      }
    }
  }

  /**
   * 返回到上一个片段
   */
  async returnToPrevious(): Promise<void> {
    const gameState = stateStore._internalGameState
    
    if (gameState.returnToSegment) {
      const returnSegmentId = gameState.returnToSegment
      const returnLineIndex = gameState.returnToLineIndex
      
      // 清除返回点
      stateStore.updateGameState({
        returnToSegment: undefined,
        returnToLineIndex: undefined
      })
      
      // 跳转并设置行索引
      await this.navigateToSegment(returnSegmentId)
      stateStore.updateDisplayState({
        currentLineIndex: returnLineIndex || 0
      })
    } else {
      console.warn('没有返回点')
    }
  }

  /**
   * 导航到开始片段
   */
  async navigateToStart(): Promise<void> {
    const gameState = stateStore._internalGameState
    // TODO: 从注册表中查找 start 片段
    const startSegments = segmentRegistry.getByTime('START')
    if (startSegments.length > 0) {
      await this.navigateToSegment(startSegments[0].id)
    }
  }

  /**
   * 内部方法：导航到片段
   */
  private _navigateToSegment(segment: ScriptSegmentV2): void {
    // 清除片段相关的行状态
    this._clearSegmentLineStates(segment)

    // 创建 DisplayedLine 数组
    const displayedLines = this._createDisplayedLines(segment)

    // 初始化行状态
    const lineStates = new Map<string, LineStatus>()
    displayedLines.forEach(line => {
      lineStates.set(line.id, 'pending')
    })

    // 更新状态
    stateStore.batchUpdate({
      displayState: {
        currentSegment: segment,
        currentLineIndex: 0,
        displayedLines,
        typingRefs: new Map(),
        pendingSideEffects: [
          { type: 'startTyping', target: 0, delay: 0 }
        ]
      },
      lineStates
    })
  }

  /**
   * 清除片段相关的行状态
   */
  private _clearSegmentLineStates(segment: ScriptSegmentV2): void {
    const lineStates = stateStore._internalLineStates
    segment.lines.forEach((_, index) => {
      const lineId = `${segment.id}-${index}`
      lineStates.delete(lineId)
    })
  }

  /**
   * 创建 DisplayedLine 数组
   */
  private _createDisplayedLines(segment: ScriptSegmentV2): DisplayedLineV2[] {
    const lineStates = stateStore._internalLineStates
    return segment.lines.map((line, index) => {
      const lineId = `${segment.id}-${index}`
      const status = lineStates.get(lineId) || 'pending'
      return {
        ...line,
        id: lineId,
        status,
        selectedChoiceIndex: undefined
      }
    })
  }
  
  /**
   * 清空调用栈
   */
  clearCallStack(): void {
    this.callStack = []
  }
}

// 单例
export const navigationServiceV2 = new NavigationServiceV2()
```

#### 验收标准
- [ ] ChoiceService 改造完成
- [ ] NavigationService 改造完成
- [ ] 支持引用跳转
- [ ] 支持返回功能
- [ ] 循环引用检测工作正常

---

### 阶段5：组件改造（2-3天）

#### 目标
更新组件以使用新的 V2 类型。

#### 5.1 修改 ScriptLineRenderer

**文件**：`src/components/ScriptLineRenderer.vue`

```vue
<template>
  <NarrationLine
    v-if="line.type === 'narration'"
    :line="line"
    :index="index"
    :current-line-index="currentLineIndex"
    @set-typing-ref="$emit('set-typing-ref', $event, index)"
    @line-complete="$emit('line-complete')"
  />
  <DialogueLine
    v-else-if="line.type === 'dialogue'"
    :line="line"
    :index="index"
    :current-line-index="currentLineIndex"
    @set-typing-ref="$emit('set-typing-ref', $event, index)"
    @line-complete="$emit('line-complete')"
  />
  <ChoiceLine
    v-else-if="line.type === 'choice'"
    :line="line"
    :index="index"
    @choice-select="(choice, lineIndex, choiceIndex) => $emit('choice-select', choice, lineIndex, choiceIndex)"
  />
  <TimeChoiceLine
    v-else-if="line.type === 'timeChoice'"
    :line="line"
    :index="index"
    :current-line-index="currentLineIndex"
    @time-choice-complete="$emit('time-choice-complete', $event, index)"
  />
  <InputLine
    v-else-if="line.type === 'input'"
    :line="line"
    :index="index"
    :current-line-index="currentLineIndex"
    @input-complete="$emit('input-complete', $event, index)"
  />
  <TimeDisplayLine
    v-else-if="line.type === 'timeDisplay'"
    :line="line"
    :index="index"
  />
  <CommandLine
    v-else-if="line.type === 'command'"
    :line="line"
    :index="index"
    @command-execute="$emit('command-execute', $event, index)"
  />
</template>

<script setup lang="ts">
import type { DisplayedLineV2 } from '@/types/script-v2'
import NarrationLine from './NarrationLine.vue'
import DialogueLine from './DialogueLine.vue'
import ChoiceLine from './ChoiceLine.vue'
import TimeChoiceLine from './TimeChoiceLine.vue'
import InputLine from './InputLine.vue'
import TimeDisplayLine from './TimeDisplayLine.vue'
import CommandLine from './CommandLine.vue'

defineProps<{
  line: DisplayedLineV2
  index: number
  currentLineIndex: number
}>()

defineEmits<{
  'set-typing-ref': [el: any, index: number]
  'line-complete': []
  'choice-select': [choice: any, lineIndex: number, choiceIndex: number]
  'time-choice-complete': [time: string, lineIndex: number]
  'input-complete': [time: string, lineIndex: number]
  'command-execute': [command: any, lineIndex: number]
}>()
</script>
```

#### 5.2 修改 NarrationLine 和 DialogueLine

**文件**：`src/components/NarrationLine.vue`

```vue
<template>
  <div class="narration">
    <TypingText
      :text-nodes="line.nodes"
      :is-active="index === currentLineIndex"
      @complete="$emit('line-complete')"
      ref="typingText"
    />
  </div>
</template>

<script setup lang="ts">
import type { NarrationTextLine, DisplayedLineV2 } from '@/types/script-v2'
import TypingText from './TypingText.vue'

const props = defineProps<{
  line: DisplayedLineV2 & NarrationTextLine
  index: number
  currentLineIndex: number
}>()

const emit = defineEmits<{
  'line-complete': []
  'set-typing-ref': [el: any, index: number]
}>()

const typingText = ref()

// 暴露给父组件
defineExpose({
  startTyping: () => typingText.value?.startTyping?.(),
  skipToEnd: () => typingText.value?.skipToEnd?.()
})

onMounted(() => {
  emit('set-typing-ref', typingText.value, props.index)
})
</script>
```

**文件**：`src/components/DialogueLine.vue`

类似修改，使用 `line.nodes` 而非 `line.text`。

#### 验收标准
- [ ] ScriptLineRenderer 更新完成
- [ ] NarrationLine 更新完成
- [ ] DialogueLine 更新完成
- [ ] ChoiceLine 更新完成
- [ ] 所有组件使用 V2 类型
- [ ] 组件渲染正常

---

### 阶段6：数据迁移（3-4天）

#### 目标
将现有剧本数据迁移到新的 V2 格式。

#### 6.1 创建数据迁移脚本

**文件**：`scripts/migrate-data.ts`

```typescript
/**
 * 数据迁移脚本
 * 
 * 将 V1 格式的剧本数据转换为 V2 格式
 */

import type { ScriptSegment } from '@/types'
import type { ScriptSegmentV2 } from '@/types/script-v2'
import { parseText } from '@/utils/textParser'
import { writeFileSync, mkdirSync } from 'fs'
import { join } from 'path'

/**
 * 转换单个片段
 */
export function convertSegmentV1ToV2(segment: ScriptSegment): ScriptSegmentV2 {
  return {
    id: segment.id,
    time: segment.time,
    description: segment.description,
    loop: segment.loop,
    unlockFlags: segment.unlockFlags,
    lines: segment.lines.map(convertLineV1ToV2)
  }
}

/**
 * 转换单行
 */
function convertLineV1ToV2(line: any): any {
  switch (line.type) {
    case 'dialogue':
      return {
        type: 'dialogue',
        character: line.character,
        nodes: parseText(line.text)
      }
    
    case 'narration':
      return {
        type: 'narration',
        nodes: parseText(line.text)
      }
    
    case 'choice':
      // Choice 需要特殊处理：提取子片段
      return convertChoiceLineV1ToV2(line)
    
    case 'timeChoice':
      return convertTimeChoiceLineV1ToV2(line)
    
    case 'input':
      return {
        type: 'input',
        placeholder: line.placeholder
      }
    
    case 'command':
      return {
        type: 'command',
        command: line.command,
        params: line.params
      }
    
    case 'timeDisplay':
      return {
        type: 'timeDisplay',
        value: line.value
      }
  }
}

/**
 * 转换 ChoiceLine（提取子片段为独立片段）
 */
function convertChoiceLineV1ToV2(choiceLine: any): any {
  const choices = choiceLine.choices.map((choice: any, index: number) => {
    // 如果有内联行，提取为独立片段
    if (choice.lines && choice.lines.length > 0) {
      // 生成新的片段ID
      const newSegmentId = `CHOICE-${Date.now()}-${index}`
      
      // 返回引用
      return {
        text: choice.text,
        targetSegments: [newSegmentId],
        setFlag: choice.setFlag,
        // 保存子片段内容，后续需要创建新片段
        _subSegment: choice.lines
      }
    }
    
    // 如果没有内联行，保持原样
    return {
      text: choice.text,
      targetSegments: [],
      setFlag: choice.setFlag
    }
  })
  
  return {
    type: 'choice',
    choices
  }
}

/**
 * 转换 TimeChoiceLine
 */
function convertTimeChoiceLineV1ToV2(timeChoiceLine: any): any {
  const choices = timeChoiceLine.choices.map((choice: any) => {
    if (choice.lines && choice.lines.length > 0) {
      const newSegmentId = `TIMECHOICE-${Date.now()}-${Math.random()}`
      return {
        time: choice.time,
        targetSegments: [newSegmentId],
        setFlag: choice.setFlag,
        _subSegment: choice.lines
      }
    }
    
    return {
      time: choice.time,
      targetSegments: [],
      setFlag: choice.setFlag
    }
  })
  
  return {
    type: 'timeChoice',
    choices
  }
}

/**
 * 批量迁移片段
 */
export async function migrateAllSegments(
  inputPath: string,
  outputPath: string
): Promise<void> {
  // TODO: 实现批量迁移逻辑
  console.log('开始迁移片段...')
  console.log(`输入路径: ${inputPath}`)
  console.log(`输出路径: ${outputPath}`)
}

// 如果直接运行此脚本
if (import.meta.main) {
  migrateAllSegments('./data', './data-v2')
}
```

#### 6.2 迁移示例数据

**步骤**：

1. 运行迁移脚本
2. 验证迁移结果
3. 更新数据导入文件

**文件**：`src/data/script/index.ts`（更新）

```typescript
import { segmentRegistry } from '@/services/SegmentRegistry'
import { segmentLoader } from '@/services/SegmentLoader'

// 导入所有 V2 片段
import { START_P0_V2 } from './start/start-p0-v2'
import { START_P1_V2 } from './start/start-p1-v2'
// ... 其他片段

/**
 * 初始化所有片段
 */
export function initializeSegments(): void {
  // 注册所有片段到注册表
  segmentRegistry.registerAll([
    START_P0_V2,
    START_P1_V2,
    // ... 其他片段
  ])
  
  console.log('片段初始化完成')
  console.log(segmentRegistry.getStats())
}

/**
 * 查找片段（兼容旧API）
 */
export function findSegmentById(id: string): ScriptSegmentV2 | undefined {
  return segmentRegistry.get(id)
}

export function findSegment(
  time: string,
  unlockedFlags: Set<string>,
  viewedSegments: Set<string>
): ScriptSegmentV2 | undefined {
  const segments = segmentRegistry.getByTime(time)
  
  // 筛选符合条件的片段
  for (const segment of segments) {
    if (segment.unlockFlags) {
      const unlocked = segment.unlockFlags.every(flag => unlockedFlags.has(flag))
      if (!unlocked) continue
    }
    
    if (viewedSegments.has(segment.id)) continue
    
    return segment
  }
  
  return undefined
}

export function getStartSegment(loop?: string): ScriptSegmentV2 | undefined {
  const startSegments = segmentRegistry.getByTime('START')
  
  if (loop) {
    return startSegments.find(seg => seg.loop === loop)
  }
  
  return startSegments[0]
}
```

#### 验收标准
- [ ] 数据迁移脚本创建完成
- [ ] 所有示例数据迁移完成
- [ ] 数据导入更新完成
- [ ] 片段注册表正确初始化

---

### 阶段7：测试与验证（2-3天）

#### 目标
全面测试新系统，确保功能正确。

#### 7.1 单元测试

更新所有测试文件以使用 V2 类型：

- [ ] `src/parsers/__tests__/parser-v2.test.ts`
- [ ] `src/services/__tests__/SegmentRegistry.test.ts`
- [ ] `src/services/__tests__/SegmentLoader.test.ts`
- [ ] `src/services/__tests__/NavigationServiceV2.test.ts`

#### 7.2 集成测试

创建集成测试文件：

**文件**：`src/__tests__/integration/game-flow-v2.test.ts`

```typescript
import { describe, it, expect, beforeEach } from 'bun:test'
import { initializeSegments } from '@/data/script'
import { navigationServiceV2 } from '@/services/NavigationService'
import { choiceServiceV2 } from '@/services/ChoiceService'
import { stateStore } from '@/stores/StateStore'

describe('游戏流程集成测试（V2）', () => {
  beforeEach(() => {
    // 初始化片段
    initializeSegments()
    
    // 重置状态
    stateStore.reset()
    navigationServiceV2.clearCallStack()
  })
  
  it('应该完整执行选择流程', async () => {
    // 1. 开始游戏
    await navigationServiceV2.navigateToStart()
    
    expect(stateStore._internalDisplayState.currentSegment?.id).toBe('START-P0')
    
    // 2. 选择选项
    const choiceLine = stateStore._internalDisplayState.displayedLines
      .find(l => l.type === 'choice')
    
    if (choiceLine?.type === 'choice') {
      const choice = choiceLine.choices[0]
      await choiceServiceV2.handleChoice(choice, choiceLine.id, 0)
      
      // 3. 验证跳转到目标片段
      expect(stateStore._internalDisplayState.currentSegment?.id)
        .toBe(choice.targetSegments[0])
    }
  })
  
  it('应该支持循环引用检测', async () => {
    // 创建循环引用的场景
    // TODO: 实现测试
  })
})
```

#### 7.3 手动测试清单

- [ ] 开始游戏正常
- [ ] 旁白和对话显示正常
- [ ] 选择功能正常
- [ ] 时间输入正常
- [ ] 片段跳转正常
- [ ] 返回功能正常
- [ ] flag 设置正常
- [ ] 循环引用检测正常

#### 验收标准
- [ ] 所有单元测试通过
- [ ] 所有集成测试通过
- [ ] 手动测试通过

---

### 阶段8：清理与优化（1-2天）

#### 目标
清理旧代码，优化新系统。

#### 8.1 删除旧代码

删除以下文件或标记为废弃：

- [ ] `src/services/ChoiceService.ts`（重命名为 `ChoiceService.v1.ts`）
- [ ] `src/services/NavigationService.ts`（重命名为 `NavigationService.v1.ts`）
- [ ] 旧解析器（保留用于兼容性测试）

#### 8.2 更新文档

- [ ] 更新 `docs/script/Markdown剧本格式说明.md`
- [ ] 创建 `docs/script/V2格式说明.md`
- [ ] 更新 `README.md`

#### 8.3 性能优化

- [ ] 添加片段预加载
- [ ] 优化 TextNode 缓存
- [ ] 优化片段查找性能

#### 验收标准
- [ ] 旧代码清理完成
- [ ] 文档更新完成
- [ ] 性能优化完成

---

## 📝 Markdown 格式变更说明

### 当前格式（V1）

```markdown
---
id: START-P0
time: START
description: 阶段0开场片段
loop: P0
unlockFlags: []
---
narration
我在想，
时间是……？

dialogue
不，||||是  **她**  在问我。

choice
- [选项A](#1)
- [选项B](#2)

# 1
narration
选择了选项A。

# 2
narration
选择了选项B。
```

### 新格式（V2）

```markdown
---
id: START-P0
time: START
description: 阶段0开场片段
loop: P0
unlockFlags: []
---
narration
我在想，
时间是……？

dialogue
不，||||是  **她**  在问我。

choice
- [选项A](SEGMENT-START-P0-OPTION-A)
- [选项B](SEGMENT-START-P0-OPTION-B)
```

选项A的独立片段：

```markdown
---
id: SEGMENT-START-P0-OPTION-A
time: AUTO
description: 选项A的后续
---
narration
选择了选项A。
```

选项B的独立片段：

```markdown
---
id: SEGMENT-START-P0-OPTION-B
time: AUTO
description: 选项B的后续
---
narration
选择了选项B。
```

### 关键变化

| 方面 | V1 | V2 |
|------|-----|-----|
| **子片段** | 使用 `#` 标识，内联在主片段中 | 拆分为独立片段，使用片段ID引用 |
| **Choice选项** | `[文本](#子片段ID)` | `[文本](片段ID)` |
| **格式标记** | `**粗体**`、`==模糊==` | `{bold}粗体{/bold}`、`{blur}模糊{/blur}` |
| **延时** | `||||` | `{delay:1}` |

---

## 🚀 实施建议

### 渐进式迁移策略

1. **并行开发**：V1 和 V2 系统并存
2. **特性开关**：使用环境变量切换版本
3. **A/B测试**：在测试环境中对比两个版本
4. **灰度发布**：逐步迁移到 V2

### 风险控制

1. **回滚计划**：保留 V1 代码，随时可回滚
2. **数据备份**：迁移前备份所有数据
3. **监控告警**：添加错误监控和性能监控
4. **文档完善**：详细记录迁移步骤和注意事项

---

## 📊 时间估算总结

| 阶段 | 预计时间 | 关键产出 |
|------|----------|----------|
| 阶段0：准备工作 | 1天 | 开发分支、基础架构 |
| 阶段1：类型定义重构 | 2-3天 | 新类型系统、兼容层 |
| 阶段2：解析器改造 | 3-4天 | V2 解析器、AST Builder |
| 阶段3：片段查找服务 | 2-3天 | SegmentRegistry、SegmentLoader |
| 阶段4：导航服务改造 | 3-4天 | ChoiceServiceV2、NavigationServiceV2 |
| 阶段5：组件改造 | 2-3天 | 所有组件更新 |
| 阶段6：数据迁移 | 3-4天 | 所有数据迁移完成 |
| 阶段7：测试与验证 | 2-3天 | 测试通过 |
| 阶段8：清理与优化 | 1-2天 | 旧代码清理、文档更新 |
| **总计** | **19-27天** | **约3-4周** |

---

## ✅ 最终验收标准

### 功能完整性

- [ ] 所有现有功能正常工作
- [ ] 选择功能使用引用跳转
- [ ] 支持循环引用检测
- [ ] 支持跨文件引用
- [ ] 文本只需解析一次

### 性能指标

- [ ] 首次加载时间 ≤ 100ms
- [ ] 片段切换时间 ≤ 50ms
- [ ] 渲染性能无明显下降

### 代码质量

- [ ] TypeScript 编译无错误
- [ ] 所有测试通过
- [ ] 代码覆盖率 ≥ 80%
- [ ] 文档完整清晰

---

## 📚 附录

### A. 文件清单

**新增文件**：
- `src/types/script-v2.ts`
- `src/utils/type-conversion.ts`
- `src/parsers/script-parser-v2.ts`
- `src/parsers/ast-builder-v2.ts`
- `src/parsers/__tests__/parser-v2.test.ts`
- `src/services/SegmentRegistry.ts`
- `src/services/SegmentLoader.ts`
- `src/services/ChoiceServiceV2.ts`
- `src/services/NavigationServiceV2.ts`
- `src/services/__tests__/SegmentRegistry.test.ts`
- `src/services/__tests__/SegmentLoader.test.ts`
- `src/services/__tests__/NavigationServiceV2.test.ts`
- `src/__tests__/integration/game-flow-v2.test.ts`
- `scripts/migrate-data.ts`

**修改文件**：
- `src/types/index.ts`（添加 V2 导出）
- `src/components/ScriptLineRenderer.vue`
- `src/components/NarrationLine.vue`
- `src/components/DialogueLine.vue`
- `src/components/ChoiceLine.vue`
- `src/data/script/index.ts`
- 所有 `.ts` 剧本数据文件

**重命名文件**：
- `src/services/ChoiceService.ts` → `src/services/ChoiceService.v1.ts`
- `src/services/NavigationService.ts` → `src/services/NavigationService.v1.ts`

### B. 测试数据示例

**V1 格式**：
```typescript
export const TEST_CHOICE_V1: ScriptSegment = {
  id: 'TEST-CHOICE',
  time: '00:00',
  lines: [
    {
      type: 'choice',
      choices: [
        {
          text: '选项A',
          lines: [{ type: 'narration', text: '选择了A' }],
          setFlag: 'flag_a'
        }
      ]
    }
  ]
}
```

**V2 格式**：
```typescript
export const TEST_CHOICE_V2: ScriptSegmentV2 = {
  id: 'TEST-CHOICE',
  time: '00:00',
  lines: [
    {
      type: 'choice',
      choices: [
        {
          text: '选项A',
          targetSegments: ['TEST-CHOICE-OPTION-A'],
          setFlag: 'flag_a'
        }
      ]
    }
  ]
}

export const TEST_CHOICE_OPTION_A: ScriptSegmentV2 = {
  id: 'TEST-CHOICE-OPTION-A',
  time: 'AUTO',
  lines: [
    {
      type: 'narration',
      nodes: [{ type: 'text', content: '选择了A' }]
    }
  ]
}
```

---

**文档版本**：1.0  
**创建日期**：2025-01-XX  
**最后更新**：2025-01-XX  
**维护者**：Roo
