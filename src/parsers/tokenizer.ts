import type { TokenSegment, TokenizerOptions, SegmentMetadata } from '@/types/parser'
import { ParseError } from '@/types/parser'
import { extractFrontMatter, parseYamlFrontMatter } from './utils/yaml-parser'
import { normalizeText } from './utils/text-normalizer'

/**
 * Tokenizer - 阶段1：词法分析和基本分组
 * 
 * 职责：
 * - 按 `---` 分割片段
 * - 解析YAML Front Matter
 * - 提取 `# 标识` 子片段内容
 * - 识别并转换延时简写
 * - 过滤注释行
 */
export class ScriptTokenizer {
  private options: TokenizerOptions

  constructor(options: TokenizerOptions = {}) {
    this.options = {
      keepComments: options.keepComments ?? false
    }
  }

  /**
   * Tokenize整个剧本文件
   * 支持多片段格式
   */
  tokenize(content: string): TokenSegment[] {
    const segments: TokenSegment[] = []
    
    // 按 `---` 分割片段
    const rawSegments = this.splitSegments(content)
    
    for (let i = 0; i < rawSegments.length; i++) {
      const rawSegment = rawSegments[i]
      
      // 跳过空片段
      if (!rawSegment.trim()) {
        continue
      }
      
      try {
        const tokenSegment = this.tokenizeSegment(rawSegment, i + 1)
        segments.push(tokenSegment)
      } catch (error) {
        if (error instanceof ParseError) {
          throw error
        }
        throw new ParseError(
          `解析片段失败: ${error instanceof Error ? error.message : String(error)}`,
          i + 1,
          undefined,
          undefined
        )
      }
    }
    
    return segments
  }

  /**
   * 分割原始片段
   * 处理 `---` 分隔符
   */
  private splitSegments(content: string): string[] {
    // 首先提取开头的YAML Front Matter（如果有）
    const { frontMatter: globalFrontMatter, remainingContent } = extractFrontMatter(content)
    
    if (globalFrontMatter) {
      // 有全局Front Matter，按 `---` 分割剩余内容
      const segments = remainingContent.split(/^---$/gm)
      // 将全局元数据插入到每个片段的开头
      return segments.map(seg => {
        const trimmed = seg.trim()
        if (!trimmed) return ''
        // 如果片段有自己的Front Matter，保留它
        if (trimmed.startsWith('---')) {
          return trimmed
        }
        // 否则，添加全局Front Matter
        return `---\n${globalFrontMatter}\n---\n${trimmed}`
      }).filter(Boolean)
    }
    
    // 没有全局Front Matter，直接按 `---` 分割
    return content.split(/^---$/gm).filter(Boolean)
  }

  /**
   * Tokenize单个片段
   */
  private tokenizeSegment(rawSegment: string, segmentIndex: number): TokenSegment {
    // 提取Front Matter
    const { frontMatter, remainingContent } = extractFrontMatter(rawSegment)
    
    if (!frontMatter) {
      throw new ParseError(
        '片段缺少YAML元数据块',
        segmentIndex,
        undefined,
        undefined
      )
    }
    
    // 解析元数据
    const metadata = parseYamlFrontMatter(
      frontMatter,
      `segment-${segmentIndex}`,
      segmentIndex
    )
    
    // 分离主内容和子片段
    const { mainContent, subSegments } = this.extractSubSegments(remainingContent, metadata.id)
    
    return {
      metadata,
      content: mainContent,
      subSegments
    }
  }

  /**
   * 提取子片段
   * 识别 `# 标识` 开头的子片段
   */
  private extractSubSegments(
    content: string,
    segmentId: string
  ): { mainContent: string[]; subSegments: Map<string, string[]> } {
    const lines = content.split('\n')
    const mainContent: string[] = []
    const subSegments = new Map<string, string[]>()
    
    let currentSubSegmentId: string | null = null
    let currentSubSegmentLines: string[] = []
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]
      const trimmedLine = line.trim()
      
      // 检查是否是子片段标题 `# 标识`
      const subSegmentMatch = trimmedLine.match(/^#\s+(.+)$/)
      
      if (subSegmentMatch) {
        // 保存前一个子片段
        if (currentSubSegmentId) {
          subSegments.set(currentSubSegmentId, currentSubSegmentLines)
        }
        
        // 开始新的子片段
        currentSubSegmentId = subSegmentMatch[1]
        currentSubSegmentLines = []
        continue
      }
      
      // 检查是否是注释行
      if (trimmedLine.startsWith('>')) {
        if (!this.options.keepComments) {
          continue
        }
      }
      
      // 如果当前在子片段中
      if (currentSubSegmentId) {
        currentSubSegmentLines.push(line)
      } else {
        // 主内容
        mainContent.push(line)
      }
    }
    
    // 保存最后一个子片段
    if (currentSubSegmentId) {
      subSegments.set(currentSubSegmentId, currentSubSegmentLines)
    }
    
    // 规范化文本（延时简写转换等）
    const normalizedMainContent = mainContent.map(line => normalizeText(line))
    const normalizedSubSegments = new Map<string, string[]>()
    
    subSegments.forEach((lines, id) => {
      normalizedSubSegments.set(id, lines.map(line => normalizeText(line)))
    })
    
    return {
      mainContent: normalizedMainContent,
      subSegments: normalizedSubSegments
    }
  }
}

/**
 * 便捷函数：直接tokenize内容
 */
export function tokenize(content: string, options?: TokenizerOptions): TokenSegment[] {
  const tokenizer = new ScriptTokenizer(options)
  return tokenizer.tokenize(content)
}
