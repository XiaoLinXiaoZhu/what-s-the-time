import type { TokenSegment } from '@/types/parser'
import type { ScriptSegment, ScriptLine } from '@/types'
import { ParseError } from '@/types/parser'

/**
 * AST Builder - 阶段2：类型转换和引用解析
 * 
 * 职责：
 * - 将内容行转换为ScriptLine类型
 * - 解析choice选项的 `# 标识` 引用
 * - 处理各种行类型
 * - 调用parseText进行文本格式化
 */
export class ScriptAstBuilder {
  /**
   * 构建ScriptSegment
   */
  build(token: TokenSegment): ScriptSegment {
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
  ): ScriptLine[] {
    const scriptLines: ScriptLine[] = []
    let i = 0
    
    while (i < lines.length) {
      const line = lines[i].trim()
      
      // 跳过空行
      if (!line) {
        i++
        continue
      }
      
      // 解析行类型
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
   * 返回：{ lines: ScriptLine[], consumedLines: number }
   */
  private parseLine(
    lines: string[],
    lineIndex: number,
    segmentId: string,
    subSegments: Map<string, string[]>
  ): { lines: ScriptLine[]; consumedLines: number } | null {
    const line = lines[lineIndex].trim()
    // 检查是否是类型标识行
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
   * 解析旁白行
   * 格式：narration [文本]
   * 或多行形式：narration 后面跟着内容行
   */
  private parseNarration(
    text: string | undefined,
    lines: string[],
    lineIndex: number
  ): { lines: ScriptLine[]; consumedLines: number } {
    if (text) {
      // 单行形式
      return {
        lines: [{
          type: 'narration',
          text: text.trim()
        }],
        consumedLines: 1
      }
    }
    
    // 多行形式，需要读取后续行
    return this.parseMultilineText('narration', lines, lineIndex)
  }

  /**
   * 解析对话行
   */
  private parseDialogue(
    text: string | undefined,
    lines: string[],
    lineIndex: number
  ): { lines: ScriptLine[]; consumedLines: number } {
    if (text) {
      return {
        lines: [{
          type: 'dialogue',
          text: text.trim()
        }],
        consumedLines: 1
      }
    }
    
    return this.parseMultilineText('dialogue', lines, lineIndex)
  }

  /**
   * 解析输入行
   * 格式：input [placeholder]
   * 或多行形式：input 后面跟着一行作为 placeholder
   */
  private parseInput(
    placeholder: string | undefined,
    lines: string[],
    lineIndex: number
  ): { lines: ScriptLine[]; consumedLines: number } {
    if (placeholder) {
      // 单行形式
      return {
        lines: [{
          type: 'input',
          placeholder: placeholder.trim()
        }],
        consumedLines: 1
      }
    }
    
    // 多行形式，读取下一行作为 placeholder
    const nextLine = lineIndex + 1 < lines.length ? lines[lineIndex + 1].trim() : ''
    
    if (!nextLine) {
      throw new ParseError('input 需要指定 placeholder 内容', lineIndex)
    }
    
    return {
      lines: [{
        type: 'input',
        placeholder: nextLine
      }],
      consumedLines: 2 // input行 + placeholder行
    }
  }

  /**
   * 解析时间显示行
   */
  private parseTimeDisplayLine(
    value: string | undefined,
    lineIndex: number
  ): { lines: ScriptLine[]; consumedLines: number } {
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
   * 解析选择行
   * 格式：choice
   * 后面跟着选项列表：- [文本](#子片段ID) 或 - [文本](setFlag:FLAG_NAME)
   */
  private parseChoice(
    _extra: string | undefined,
    lines: string[],
    lineIndex: number,
    segmentId: string,
    subSegments: Map<string, string[]>
  ): { lines: ScriptLine[]; consumedLines: number } {
    // 解析选项列表（从下一行开始）
    const result = this.parseChoiceOptions(lines, lineIndex + 1, segmentId, subSegments)
    
    return {
      lines: [{
        type: 'choice',
        choices: result.choices
      }],
      consumedLines: 1 + result.consumedLines // choice行 + 选项行数
    }
  }

  /**
   * 解析命令行
   * 格式：command [setFlag|unsetFlag|jump|end] [参数...]
   * 或多行形式：command 后面跟着一行作为命令参数
   */
  private parseCommand(
    commandStr: string | undefined,
    lines: string[],
    lineIndex: number
  ): { lines: ScriptLine[]; consumedLines: number } {
    if (!commandStr) {
      // 多行形式，读取下一行作为命令参数
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
        // 如果使用了下一行的内容，则消耗2行；否则消耗1行
    }
  }

  /**
   * 解析多行文本
   * 读取后续行直到遇到空行或其他类型标识
   */
  private parseMultilineText(
    type: 'narration' | 'dialogue',
    lines: string[],
    startIndex: number
  ): { lines: ScriptLine[]; consumedLines: number } {
    const textParts: string[] = []
    let i = startIndex + 1 // 类型标识行已在 parseLine 中处理，从下一行开始读取
    
    while (i < lines.length) {
      const line = lines[i].trim()
      
      // 空行结束解析
      if (!line) {
        break
      }
      
      // 检查是否是新类型的开始
      if (line.match(/^(narration|dialogue|input|timeDisplayLine|choice|command)(?:\s+|$)/i)) {
        break
      }
      
      textParts.push(line)
      i++
    }
    
    return {
      lines: [{
        type,
        text: textParts.join('\n')
      }],
      consumedLines: i - startIndex + 1 // 包含类型标识行本身
    }
  }

  /**
   * 解析选项列表
   * 格式：- [选项文本](#子片段ID) 或 - [选项文本](setFlag:FLAG_NAME)
   */
  private parseChoiceOptions(
    lines: string[],
    startIndex: number,
    segmentId: string,
    subSegments: Map<string, string[]>
  ): { choices: any[]; consumedLines: number } {
    const choices: any[] = []
    let i = startIndex
    
    while (i < lines.length) {
      const line = lines[i].trim()
      
      // 空行或非列表项，结束解析
      if (!line || !line.startsWith('-')) {
        break
      }
      
      // 解析Markdown链接：[文本](target)
      const linkMatch = line.match(/-\s*\[([^\]]+)\]\(([^\)]+)\)/)
      
      if (!linkMatch) {
        throw new ParseError(`无效的选项格式: ${line}`, i)
      }
      
      const text = linkMatch[1]
      const target = linkMatch[2]
      
      // 检查是否是子片段引用
      const subSegmentIdMatch = target.match(/^#(.+)$/)
      
      if (subSegmentIdMatch) {
        // 引用子片段
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
        
        // 递归解析子片段内容
        const parsedSubLines = this.parseLines(subSegmentLines, subSegments, segmentId)
        
        choices.push({
          text,
          lines: parsedSubLines
        })
      } else {
        // 普通选项，可能包含flag设置
        const setFlagMatch = target.match(/^setFlag:(.+)$/)
        
        choices.push({
          text,
          lines: [],
          setFlag: setFlagMatch ? setFlagMatch[1] : undefined
        })
      }
      
      i++
    }
    
    return {
      choices,
      consumedLines: i - startIndex
    }
  }
}

/**
 * 便捷函数：直接构建AST
 */
export function buildAst(token: TokenSegment): ScriptSegment {
  const builder = new ScriptAstBuilder()
  return builder.build(token)
}
