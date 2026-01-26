import type { TokenSegment } from '@/types/index'
import type {
  ScriptSegmentV2,
  ContentLine,
  TextNode,
  ChoiceLineV2,
  DialogueTextLine,
  NarrationTextLine
} from '@/types/script-v2'
import { ParseError } from '@/types/index'
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
