import yaml from 'js-yaml'
import type { SegmentMetadata } from '@/types/parser'
import { ParseError } from '@/types/parser'

/**
 * 解析YAML Front Matter
 */
export function parseYamlFrontMatter(
  frontMatter: string,
  segmentId: string = 'unknown',
  lineNumber: number = 1
): SegmentMetadata {
  try {
    // 使用安全模式解析，避免执行任意代码
    const parsed = yaml.load(frontMatter, {
      schema: yaml.FAILSAFE_SCHEMA
    }) as any

    // 验证必需字段
    if (!parsed.id) {
      throw new ParseError(
        'Missing required field: id',
        lineNumber,
        undefined,
        segmentId
      )
    }

    if (!parsed.time) {
      throw new ParseError(
        'Missing required field: time',
        lineNumber,
        undefined,
        segmentId
      )
    }

    // 构建元数据对象
    const metadata: SegmentMetadata = {
      id: String(parsed.id),
      time: String(parsed.time)
    }

    // 可选字段
    if (parsed.description !== undefined) {
      metadata.description = String(parsed.description)
    }

    if (parsed.loop !== undefined) {
      metadata.loop = String(parsed.loop)
    }

    if (parsed.unlockFlags !== undefined) {
      if (Array.isArray(parsed.unlockFlags)) {
        metadata.unlockFlags = parsed.unlockFlags.map((f: any) => String(f))
      } else {
        metadata.unlockFlags = []
      }
    }

    return metadata
  } catch (error) {
    if (error instanceof ParseError) {
      throw error
    }
    
    throw new ParseError(
      `YAML解析失败: ${error instanceof Error ? error.message : String(error)}`,
      lineNumber,
      undefined,
      segmentId
    )
  }
}

/**
 * 提取Front Matter内容
 * 检测文档开头的YAML块（---分隔）
 */
export function extractFrontMatter(
  content: string
): { frontMatter: string | null; remainingContent: string } {
  const lines = content.split('\n')
  
  // 跳过开头的空行
  let startIndex = 0
  while (startIndex < lines.length && lines[startIndex].trim() === '') {
    startIndex++
  }
  
  // 检查是否以 --- 开头（跳过空行后）
  if (startIndex >= lines.length || lines[startIndex].trim() !== '---') {
    return { frontMatter: null, remainingContent: content }
  }
  
  // 查找结束的 ---
  let endIndex = -1
  for (let i = startIndex + 1; i < lines.length; i++) {
    if (lines[i].trim() === '---') {
      endIndex = i
      break
    }
  }
  
  if (endIndex === -1) {
    // 没有找到结束标记，整个内容都不是有效的Front Matter
    return { frontMatter: null, remainingContent: content }
  }
  
  const frontMatter = lines.slice(startIndex + 1, endIndex).join('\n')
  const remainingContent = lines.slice(endIndex + 1).join('\n')
  
  return { frontMatter, remainingContent }
}
