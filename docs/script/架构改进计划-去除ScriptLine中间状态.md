# 架构改进计划：去除 ScriptLine 中间状态

## 背景分析

### 当前架构

项目目前的剧本数据流如下：

```
Markdown 文本
    ↓ (Tokenizer)
TokenSegment { metadata, content[], subSegments }
    ↓ (AST Builder)
ScriptSegment { lines: ScriptLine[] }
    ↓ (运行时解析)
DisplayedLine { ...ScriptLine, status }
    ↓ (文本渲染)
TextNode[] → Vue 组件
```

### ScriptLine 的双重角色

`ScriptLine` 类型当前承担了两个职责：

1. **语义类型**：表示剧本的逻辑结构（对话、旁白、选择等）
2. **数据载体**：存储需要进一步处理的原始数据（text 字段）

这种双重角色导致了几个问题：

### 问题1：双重解析开销

```typescript
// 当前流程
// 1. Markdown → ScriptLine
const narrationLine: NarrationLine = {
  type: 'narration',
  text: '{red}你好{/red}{delay:1}'  // ❌ 原始字符串
}

// 2. ScriptLine → TextNode (在组件渲染时)
const textNodes = parseText(narrationLine.text)  // ❌ 重复解析
```

每次渲染时都需要重新解析 `text` 字段，造成不必要的性能开销。

### 问题2：Choice 内联限制

```typescript
// 当前设计
interface ChoiceLine {
  type: 'choice'
  choices: Array<{
    text: string
    lines: ScriptLine[]  // ❌ 内联内容，无法引用其他片段
    setFlag?: string
  }>
}
```

这种内联设计导致：

- **无法循环引用**：片段A引用片段B，片段B无法引用A
- **无法跨文件引用**：所有内容必须在同一文件中
- **难以内容复用**：多个choice指向相同内容时需要重复定义
- **复杂度增加**：嵌套结构使得代码难以理解和维护

**具体场景示例**：

```typescript
// 场景1：循环引用 - 当前无法实现
// 玩家选择"回到起点"，应该回到开始片段

// 场景2：内容复用 - 当前需要重复代码
// 3个不同的choice都指向"失败"的提示内容

// 场景3：跨文件引用 - 当前不支持
// 大型剧本需要分割为多个文件，但choice无法引用其他文件
```

### 问题3：职责不清

```typescript
// ScriptLine 既表示语义...
interface DialogueLine {
  type: 'dialogue'     // ✅ 语义：这是对话
  text: string          // ❌ 数据：需要解析的原始文本
}

// ...又包含展示格式
const text = '{red}你好{/red}'  // 混合了语义和展示
```

数据层应该关注"是什么"（对话、旁白），而非"怎么显示"（红色、加粗）。

## 改进目标

### 核心目标

1. **单次解析**：从 Markdown 直接解析为最终渲染格式
2. **扁平化结构**：去除嵌套，使用引用连接片段
3. **职责分离**：语义层与展示层完全解耦
4. **灵活引用**：支持循环引用、跨文件引用、内容复用

### 非目标

- ❌ 改变 Markdown 编写格式（保持用户友好）
- ❌ 改变现有组件渲染逻辑（最小化影响）
- ❌ 一次性重构所有代码（渐进式迁移）

## 改进方案

### 方案：引用式扁平化设计

#### 核心思想

将所有内容扁平化为独立的片段，通过ID引用连接，而非内联内容。

```
旧设计（内联）：
Segment A → [Choice] → (内联 lines)
Segment B → [Choice] → (内联 lines)

新设计（引用）：
Segment A → [Choice] → (引用片段 B)
Segment B → (独立片段)
```

#### 新类型系统

```typescript
/**
 * 最终的剧本片段（扁平化设计）
 */
export interface ScriptSegment {
  id: string
  time: string
  description?: string
  loop?: string
  unlockFlags?: string[]
  
  /** 
   * 扁平化的内容行
   * 每行要么是纯文本（包含格式标记），
   * 要么是特殊标记（如 CHOICE, INPUT, COMMAND）
   */
  lines: ContentLine[]
}

/**
 * 内容行类型（扁平化）
 */
export type ContentLine = 
  | TextLine           // 文本行
  | ChoiceLine        // 选择分支（引用式）
  | InputLine         // 输入框
  | CommandLine       // 命令

/**
 * 文本行（直接包含已解析的 TextNode）
 */
export interface TextLine {
  type: 'text'
  /** 
   * 已解析的文本节点
   * 无需再次解析，直接用于渲染
   */
  nodes: TextNode[]  // ✅ 最终渲染格式
}

/**
 * 选择分支（引用式）
 */
export interface ChoiceLine {
  type: 'choice'
  choices: Array<{
    /** 选项文本 */
    text: string
    /** 
     * 选择后要执行的片段ID
     * 支持多个片段依次执行
     */
    targetSegmentId: string  // ✅ 引用而非内联
    /** 选择后设置的 flag */
    setFlag?: string
  }>
}
```

#### 数据流对比

**旧流程**：
```
Markdown
  ↓ (Tokenizer)
TokenSegment
  ↓ (AST Builder)
ScriptSegment { lines: ScriptLine[] }
  ↓ (渲染时)
parseText(text)  // ❌ 重复解析
  ↓
TextNode[]
```

**新流程**：
```
Markdown
  ↓ (Tokenizer + AST Builder 一次性完成)
ScriptSegment { lines: ContentLine[] }
  ↓ (直接使用)
TextLine.nodes  // ✅ 无需再解析
```

## 实施计划

### 阶段1：类型定义准备（2-3天）

#### 目标
创建新的类型系统，与旧类型并存，支持渐进式迁移。

#### 任务

1. **创建新类型文件**
   ```
   src/types/
   ├── script-v2.ts          # 新的类型系统
   └── index.ts                # 保持不变，导出 v1 和 v2
   ```

2. **定义新类型**
   - `ScriptSegmentV2` (扁平化)
   - `ContentLine` (新行类型)
   - `TextLine` (包含已解析的 nodes)
   - `ChoiceLineV2` (引用式)
   - `InputLineV2`
   - `CommandLineV2`

3. **兼容性层**
   ```typescript
   // 旧代码继续使用
   import { ScriptSegment } from '@/types'
   
   // 新代码使用
   import { ScriptSegmentV2 as ScriptSegment } from '@/types/script-v2'
   ```

#### 为什么这么做

- ✅ 不影响现有代码
- ✅ 可并行开发新功能
- ✅ 便于回滚（如果有问题）

---

### 阶段2：解析器改造（3-4天）

#### 目标
修改解析器，输出新格式（扁平化 + 引用）。

#### 任务

1. **修改 Markdown 解析器**
   - 移除子片段内联逻辑
   - Choice 选项改为 `targetSegmentId` 引用
   - 文本内容直接解析为 `TextNode[]`

2. **修改 AST Builder**
   ```typescript
   // 旧：返回 ScriptLine
   parseNarration(text: string): NarrationLine {
     return { type: 'narration', text }
   }
   
   // 新：返回 TextLine
   parseNarration(text: string): TextLine {
     const nodes = parseText(text)  // ✅ 一次解析
     return { type: 'text', nodes }
   }
   ```

3. **修改类型转换**
   ```typescript
   // 旧：保持 ScriptLine
   build(token: TokenSegment): ScriptSegment { /* v1 */ }
   
   // 新：输出 ScriptSegmentV2
   build(token: TokenSegment): ScriptSegmentV2 { /* v2 */ }
   ```

4. **更新测试用例**
   - 所有测试改为使用新类型
   - 验证引用格式正确性

#### 为什么这么做

- ✅ 解析器改动范围可控
- ✅ 可以逐个文件迁移测试
- ✅ 保持向后兼容（保留旧解析器）

---

### 阶段3：片段查找服务（2-3天）

#### 目标
实现片段ID查找机制，支持引用跳转。

#### 任务

1. **创建片段注册表**
   ```typescript
   class SegmentRegistry {
     private segments = new Map<string, ScriptSegmentV2>()
     
     register(segment: ScriptSegmentV2) {
       this.segments.set(segment.id, segment)
     }
     
     get(id: string): ScriptSegmentV2 | undefined {
       return this.segments.get(id)
     }
   }
   ```

2. **实现片段加载器**
   ```typescript
   class SegmentLoader {
     async load(id: string): Promise<ScriptSegmentV2> {
       // 1. 查找已加载的片段
       // 2. 从文件加载新片段
       // 3. 注册到 Registry
     }
   }
   ```

3. **跨文件引用支持**
   ```typescript
   // 支持格式：[option](other-file.md#SEGMENT-ID)
   parseReference(target: string): { file?: string, id: string } {
     const [file, id] = target.split('#')
     return { file, id }
   }
   ```

#### 为什么这么做

- ✅ 集中管理所有片段
- ✅ 支持动态加载（按需加载大文件）
- ✅ 易于缓存和优化

---

### 阶段4：导航服务改造（3-4天）

#### 目标
修改导航逻辑，使用引用跳转而非内联显示。

#### 任务

1. **修改选择处理**
   ```typescript
   // 旧：直接显示内联 lines
   async handleChoice(choiceIndex: number) {
     const choice = currentSegment.lines[lineIndex].choices[choiceIndex]
     displayState.lines.push(...choice.lines)  // ❌ 内联
   }
   
   // 新：跳转到目标片段
   async handleChoice(choiceIndex: number) {
     const choice = currentSegment.lines[lineIndex].choices[choiceIndex]
     const targetSegment = segmentLoader.load(choice.targetSegmentId)
     displayState.currentSegment = targetSegment  // ✅ 引用跳转
   }
   ```

2. **实现返回逻辑**
   ```typescript
   // 支持choice后继续执行（原"子片段播放完后回到下一行"的需求）
   async executeSegment(segment: ScriptSegmentV2) {
     // 执行片段所有行
     for (const line of segment.lines) {
       if (line.type === 'command' && line.command === 'end') {
         break
       }
       await executeLine(line)
     }
     
     // 如果是通过choice跳转的，不自动返回
     // 需要明确的 command
   }
   ```

3. **循环引用检测**
   ```typescript
   class NavigationService {
     private callStack: string[] = []
     
     async navigateTo(segmentId: string) {
       // 检测循环
       if (this.callStack.includes(segmentId)) {
         throw new Error(`检测到循环引用: ${segmentId}`)
       }
       
       this.callStack.push(segmentId)
       // ... 导航逻辑
       this.callStack.pop()
     }
   }
   ```

#### 为什么这么做

- ✅ 支持复杂导航场景
- ✅ 防止无限循环
- ✅ 保持导航历史（用于"返回"功能）

---

### 阶段5：组件改造（2-3天）

#### 目标
更新Vue组件，使用新类型和引用逻辑。

#### 任务

1. **更新 ChoiceLine 组件**
   ```vue
   <!-- 旧：接收 lines -->
   <ChoiceLine 
     :choices="choice.lines" 
     @select="handleSelect"
   />
   
   <!-- 新：接收 targetSegmentId -->
   <ChoiceLine 
     :choices="choice.choices" 
     @select="handleChoice"
   />
   
   <!-- 处理选择 -->
   const handleChoice = (choice) => {
     navigationService.jumpTo(choice.targetSegmentId)  // ✅ 触发跳转
   }
   ```

2. **更新 TextLine 渲染**
   ```vue
   <!-- 旧：接收 text，内部 parseText -->
   <ScriptLineRenderer :line="line" />
   <!-- 组件内部：
     const nodes = parseText(line.text)  // ❌ 重复解析
   -->
   
   <!-- 新：直接接收 nodes -->
   <ScriptLineRenderer :line="line" />
   <!-- 组件内部：
     直接渲染 line.nodes  // ✅ 无需解析
   -->
   ```

3. **更新类型定义**
   ```typescript
   // 旧
   import type { ScriptLine } from '@/types'
   
   // 新
   import type { ContentLine } from '@/types/script-v2'
   ```

#### 为什么这么做

- ✅ 组件逻辑简化
- ✅ 性能提升（移除重复解析）
- ✅ 类型安全增强

---

### 阶段6：数据迁移（5-7天）

#### 目标
将现有TypeScript剧本迁移为新格式（Markdown + 扁平化）。

#### 任务

1. **片段拆分**
   ```typescript
   // 旧：一个片段包含choice和内联内容
   const segmentA = {
     id: 'A',
     lines: [
       {
         type: 'choice',
         choices: [
           { text: '选项一', lines: [/* 内联内容 */] }
         ]
       }
     ]
   }
   
   // 新：拆分为多个片段
   const segmentA = {
     id: 'A',
     lines: [
       {
         type: 'choice',
         choices: [
           { text: '选项一', targetSegmentId: 'A-OPTION-1' }
         ]
       }
     ]
   }
   
   const segmentAOption1 = {
     id: 'A-OPTION-1',
     lines: [
       { type: 'text', nodes: [...] }
     ]
   }
   ```

2. **编写Markdown文件**
   ```markdown
   # A.md
   ---
   id: A
   time: START
   ---
   choice
   - [选项一](A-OPTION-1)
   
   # A-OPTION-1.md
   ---
   id: A-OPTION-1
   time: AUTO
   ---
   text  # 或直接用 narration
   选择了选项一的内容。
   ```

3. **批量转换工具**
   ```typescript
   // 创建辅助工具自动转换旧格式
   import { migrateToV2 } from '@/utils/migration'
   
   const v1Data = import('./old-segment.ts')
   const v2Markdown = migrateToV2(v1Data)
   fs.writeFileSync('./new-segment.md', v2Markdown)
   ```

#### 为什么这么做

- ✅ 自动化转换，减少手工工作
- ✅ 保持数据一致性
- ✅ 便于代码审查

---

### 阶段7：旧代码清理（2天）

#### 目标
删除所有v1相关代码，完成迁移。

#### 任务

1. **删除旧类型**
   - 删除 `src/types/index.ts` 中的 ScriptLine 等类型
   - 删除旧的接口定义

2. **删除旧解析器**
   - 删除v1解析器代码（如果已完全替换）

3. **删除测试文件**
   - 删除旧格式测试
   - 只保留新格式测试

4. **更新导入**
   - 全局搜索替换导入路径
   - 统一使用 v2 类型

#### 为什么这么做

- ✅ 保持代码库整洁
- ✅ 避免混淆（新旧类型并存）
- ✅ 减少维护负担

---

## 风险评估

### 高风险

1. **现有功能破坏**
   - **风险**：导航逻辑改动可能影响现有游戏流程
   - **缓解**：保留旧代码分支，逐步验证每个场景
   - **回滚**：如果发现问题，快速回退到旧实现

2. **性能问题**
   - **风险**：片段跳转可能比内联显示慢（需要加载新片段）
   - **缓解**：实现片段预加载和缓存
   - **监控**：性能测试对比新旧实现

### 中风险

1. **学习成本**
   - **风险**：团队需要适应新的编写方式
   - **缓解**：提供详细文档和示例
   - **培训**：团队培训和代码审查

2. **兼容性问题**
   - **风险**：部分边缘场景可能无法覆盖
   - **缓解**：保留旧解析器作为fallback
   - **测试**：增加测试用例覆盖

### 低风险

1. **开发时间**
   - **风险**：预计2-3周可能延期
   - **缓解**：分阶段交付，优先级排序
   - **监控**：每周进度检查

---

## 收益分析

### 技术收益

| 指标 | 改进前 | 改进后 | 提升 |
|--------|---------|---------|------|
| **解析次数** | 2次（MD→ScriptLine→TextNode） | 1次（MD→TextNode） | 50% ↓ |
| **循环引用** | 不支持 | 完全支持 | ∞ |
| **跨文件** | 不支持 | 支持 | ∞ |
| **代码行数** | ~2000行（含嵌套） | ~1500行（扁平化） | 25% ↓ |
| **类型复杂度** | 高（嵌套） | 低（扁平） | 中 ↓ |

### 业务收益

1. **编剧效率** ✅
   - 无需管理复杂的嵌套结构
   - 可以独立编写和测试每个片段
   - 支持多人协作（不同片段由不同人编写）

2. **内容复用** ✅
   - 通用内容（如"失败提示"）可被多个choice引用
   - 减少重复代码，降低维护成本

3. **灵活性** ✅
   - 支持非线性的叙事结构
   - 可以轻松实现"分支-汇合"场景
   - 支持复杂的游戏机制（如回溯、多结局）

### 长期收益

1. **可扩展性** ✅
   - 易于添加新的行类型（无需修改嵌套逻辑）
   - 支持未来功能（如条件跳转、随机事件）

2. **可维护性** ✅
   - 结构清晰，易于理解和调试
   - 新人更容易上手
   - 降低技术债务

3. **性能优化空间** ✅
   - 片段级别的缓存和预加载
   - 惰性加载大文件
   - 并行处理（worker threads）

---

## 实施时间线

```
Week 1: 阶段1-2
  ├─ 类型定义准备
  └─ 解析器改造

Week 2: 阶段3-4
  ├─ 片段查找服务
  └─ 导航服务改造

Week 3: 阶段5-6
  ├─ 组件改造
  └─ 数据迁移（开始）

Week 4: 阶段6-7
  ├─ 数据迁移（完成）
  └─ 旧代码清理 + 测试
```

**总计**：4周（20个工作日）

---

## 成功标准

### 必须满足（P0）

- ✅ 所有现有功能在新架构下正常工作
- ✅ 所有测试通过（包括新测试）
- ✅ 无性能回退（>=当前性能）
- ✅ 文档完整（类型、API、使用示例）

### 应该满足（P1）

- ✅ 支持循环引用（至少3层深度）
- ✅ 支持跨文件引用
- ✅ 解析性能提升>=30%

### 可以满足（P2）

- ✅ 实现片段预加载和缓存
- ✅ 提供迁移工具（旧→新）
- ✅ 性能提升>=50%

---

## 决策建议

### 推荐实施 ✅

基于以上分析，**强烈推荐实施此架构改进**，原因：

1. **技术债务高**：当前设计限制了许多可能的功能
2. **成本可控**：4周的开发时间，分阶段风险可控
3. **收益巨大**：长期可维护性和灵活性显著提升
4. **市场竞争力**：符合现代DSL设计最佳实践

### 不推荐的替代方案

❌ **保持现状**
   - 技术债务会不断累积
   - 未来功能开发会越来越困难
   - 最终需要更大规模的重构

❌ **部分修复**
   - 保留内联，只修复表面问题
   - 无法根本解决问题
   - 浪费时间

---

## 下一步行动

### 如果决定实施

1. **本周内**：开始阶段1（类型定义准备）
2. **确认资源**：分配开发人员和测试时间
3. **创建任务跟踪**：使用项目管理工具跟踪进度

### 如果暂缓实施

1. **监控新功能需求**：记录每个"因为架构限制无法实现"的需求
2. **成本累积评估**：定期评估技术债务的影响
3. **等待合适时机**：选择业务压力较小的时期进行重构

---

## 附录：关键代码示例

### A. 完整的Markdown示例

```markdown
# main-segment.md
---
id: P0-MAIN
time: START
loop: P0
unlockFlags: []
---
narration
故事开始。

choice
- [去探索](P0-EXPLORE)
- [直接离开](P0-LEAVE)

command
end

---
id: P0-EXPLORE
time: AUTO
---
narration
你探索了周围环境。

choice
- [检查箱子](P0-CHECK-BOX)
- [返回起点](P0-MAIN)

---
id: P0-CHECK-BOX
time: AUTO
---
narration
箱子里是空的。
你感到失望。

command
jump P0-LEAVE

---
id: P0-LEAVE
time: END
---
narration
游戏结束。
```

### B. 循环引用示例

```markdown
---
id: LOOP-START
time: START
---
narration
你可以无限循环。

choice
- [继续循环](LOOP-STEP)
- [跳出](LOOP-END)

---
id: LOOP-STEP
time: AUTO
---
narration
循环中...

command
jump LOOP-START  # ✅ 循环引用

---
id: LOOP-END
time: END
---
narration
你选择了离开。
```

### C. TypeScript 使用示例

```typescript
import { ScriptSegmentV2 as ScriptSegment } from '@/types/script-v2'
import { SegmentLoader } from '@/services/SegmentLoader'

// 加载主片段
const mainSegment = await SegmentLoader.load('P0-MAIN')

// 导航逻辑
const handleChoice = async (choice) => {
  const nextSegment = await SegmentLoader.load(choice.targetSegmentId)
  displayState.currentSegment = nextSegment
}

// 组件使用
<template>
  <ChoiceLine 
    :choices="currentLine.choices"
    @select="handleChoice"
  />
</template>
```

---

**文档版本**：v1.0
**创建日期**：2024年
**作者**：Roo
**状态**：待评审
