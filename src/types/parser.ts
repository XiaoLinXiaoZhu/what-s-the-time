import type { ScriptSegment } from './index'

/**
 * 解析器专用类型定义
 */

/**
 * Token阶段：片段的原始表示
 */
export interface TokenSegment {
  /** 元数据（从YAML Front Matter解析） */
  metadata: SegmentMetadata
  /** 主片段内容行 */
  content: string[]
  /** 子片段映射 (#标识 -> 内容行) */
  subSegments: Map<string, string[]>
}

/**
 * 片段元数据
 */
export interface SegmentMetadata {
  /** 片段ID */
  id: string
  /** 时间点 (HH:MM) 或特殊值 (START, *, META) */
  time: string
  /** 片段描述 */
  description?: string
  /** Loop阶段 */
  loop?: string
  /** 解锁条件（flag） */
  unlockFlags?: string[]
}

/**
 * Tokenizer选项
 */
export interface TokenizerOptions {
  /** 是否保留注释行 */
  keepComments?: boolean
}

/**
 * Parser选项
 */
export interface ParserOptions {
  /** 是否启用缓存 */
  enableCache?: boolean
  /** 最大嵌套深度 */
  maxNestingDepth?: number
}

/**
 * 解析错误
 */
export class ParseError extends Error {
  constructor(
    message: string,
    public line: number,
    public column?: number,
    public segmentId?: string
  ) {
    super(message)
    this.name = 'ParseError'
  }
}

/**
 * 解析结果
 */
export interface ParseResult {
  /** 解析出的片段 */
  segment: ScriptSegment
  /** 解析耗时（毫秒） */
  parseTime: number
  /** 解析的文件路径 */
  filePath?: string
}
