import type { ParserOptions, ParseResult } from '@/types/parser'
import type { ScriptSegment } from '@/types'
import { ScriptTokenizer } from './tokenizer'
import { ScriptAstBuilder } from './ast-builder'

/**
 * ScriptParser - 主解析器
 * 
 * 整合Tokenizer和AstBuilder，提供完整的解析流程
 * 
 * 流程：
 * Markdown文件 -> Tokenizer -> TokenSegment -> AstBuilder -> ScriptSegment
 */
export class ScriptParser {
  private options: ParserOptions
  private cache: Map<string, ParseResult>
  private textNodeCache: Map<string, any>

  constructor(options: ParserOptions = {}) {
    this.options = {
      enableCache: options.enableCache ?? true,
      maxNestingDepth: options.maxNestingDepth ?? 5
    }
    this.cache = new Map()
    this.textNodeCache = new Map()
  }

  /**
   * 解析剧本文件
   * @param content - Markdown格式的剧本内容
   * @param filePath - 文件路径（用于缓存）
   * @returns 解析结果
   */
  parse(content: string, filePath?: string): ParseResult {
    const cacheKey = filePath || content
    
    // 检查缓存
    if (this.options.enableCache && this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey)!
    }

    const startTime = performance.now()
    
    try {
      // 阶段1：Tokenization
      const tokenizer = new ScriptTokenizer({ keepComments: false })
      const tokens = tokenizer.tokenize(content)
      
      // 阶段2：AST构建
      const astBuilder = new ScriptAstBuilder()
      const segments = tokens.map(token => astBuilder.build(token))
      
      // 目前只支持单片段文件，取第一个片段
      // 未来可以支持多片段文件
      if (segments.length === 0) {
        throw new Error('未找到有效的剧本片段')
      }
      
      const segment = segments[0]
      
      const parseTime = performance.now() - startTime
      
      const result: ParseResult = {
        segment,
        parseTime,
        filePath
      }
      
      // 存入缓存
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

  /**
   * 清除缓存
   */
  clearCache(): void {
    this.cache.clear()
    this.textNodeCache.clear()
  }

  /**
   * 获取缓存统计信息
   */
  getCacheStats(): { size: number; keys: string[] } {
    return {
      size: this.cache.size,
      keys: Array.from(this.cache.keys())
    }
  }
}

/**
 * 便捷函数：直接解析剧本内容
 */
export function parseScript(content: string, filePath?: string): ScriptSegment {
  const parser = new ScriptParser({ enableCache: true })
  const result = parser.parse(content, filePath)
  return result.segment
}

/**
 * 创建解析器实例（带选项）
 */
export function createParser(options?: ParserOptions): ScriptParser {
  return new ScriptParser(options)
}
