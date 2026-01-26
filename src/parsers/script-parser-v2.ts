import type { ParserOptions, ParseResult } from '@/types/index'
import type { ScriptSegmentV2 } from '@/types/script-v2'
import { ScriptTokenizer } from './tokenizer'
import { ScriptAstBuilderV2 } from './ast-builder-v2'

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

  /**
   * 清除缓存
   */
  clearCache(): void {
    this.cache.clear()
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
export function parseScriptV2(content: string, filePath?: string): ScriptSegmentV2 {
  const parser = new ScriptParserV2({ enableCache: true })
  const result = parser.parse(content, filePath)
  return result.segment as ScriptSegmentV2
}

/**
 * 创建解析器实例（带选项）
 */
export function createParserV2(options?: ParserOptions): ScriptParserV2 {
  return new ScriptParserV2(options)
}
