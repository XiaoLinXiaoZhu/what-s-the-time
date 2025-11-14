import type { TextNode } from '@/types'

/**
 * 解析带格式标记的文本
 * 支持标记：
 * - {red}...{/red} - 红色文本
 * - {bold}...{/bold} - 粗体
 * - {italic}...{/italic} - 斜体
 * - {br} - 换行
 * - {delay:1.2} - 延时（秒）
 * - 可以嵌套使用（简化处理：只支持最外层格式）
 */
export function parseText(text: string): TextNode[] {
  const nodes: TextNode[] = []
  
  if (!text) return nodes
  
  // 先处理 delay 标记
  const delayPattern = /\{delay:([\d.]+)\}/g
  const delayMatches: Array<{ index: number; time: number }> = []
  let delayMatch
  while ((delayMatch = delayPattern.exec(text)) !== null) {
    delayMatches.push({
      index: delayMatch.index,
      time: parseFloat(delayMatch[1])
    })
  }
  
  // 使用正则表达式匹配所有标记，转义斜杠
  const tagPattern = /\{(red|bold|italic|br|\/red|\/bold|\/italic|delay:[\d.]+)\}/g
  let lastIndex = 0
  let match: RegExpExecArray | null
  
  while ((match = tagPattern.exec(text)) !== null) {
    const tag = match[1]
    const matchIndex = match.index
    
    if (matchIndex === undefined) break
    
    // 添加标记前的文本
    if (matchIndex > lastIndex) {
      const beforeText = text.substring(lastIndex, matchIndex)
      if (beforeText) {
        nodes.push({ type: 'text', content: beforeText })
      }
    }
    
    // 处理标记
    if (tag.startsWith('delay:')) {
      // delay 标记
      const delayTime = parseFloat(tag.substring(6))
      nodes.push({ type: 'delay', content: '', delayTime })
      lastIndex = matchIndex + match[0].length
    } else if (tag === 'br') {
      nodes.push({ type: 'linebreak', content: '' })
      lastIndex = matchIndex + 4 // {br} 的长度
    } else if (tag.startsWith('/')) {
      // 结束标记，暂时忽略（简化处理）
      lastIndex = matchIndex + tag.length + 2
    } else {
      // 开始标记，找到对应的结束标记
      const endTag = `{/${tag}}`
      const endIndex = text.indexOf(endTag, matchIndex)
      
      if (endIndex !== -1) {
        // 提取标记内的文本
        const innerText = text.substring(matchIndex + tag.length + 2, endIndex)
        if (innerText) {
          // 递归解析内部文本（处理嵌套）
          const innerNodes = parseText(innerText)
          
          // 如果内部有节点，应用当前格式；否则直接创建
          if (innerNodes.length > 0) {
            // 简化：只对第一个文本节点应用格式
            for (const innerNode of innerNodes) {
              if (innerNode.type === 'text' && nodes.length === 0) {
                const formatType = tag as 'red' | 'bold' | 'italic'
                nodes.push({ type: formatType, content: innerNode.content })
              } else {
                nodes.push(innerNode)
              }
            }
          } else {
            const formatType = tag as 'red' | 'bold' | 'italic'
            nodes.push({ type: formatType, content: innerText })
          }
        }
        lastIndex = endIndex + endTag.length
      } else {
        // 没有找到结束标记，当作普通文本处理
        lastIndex = matchIndex + tag.length + 2
      }
    }
  }
  
  // 添加剩余的文本
  if (lastIndex < text.length) {
    const remainingText = text.substring(lastIndex)
    if (remainingText) {
      nodes.push({ type: 'text', content: remainingText })
    }
  }
  
  // 如果没有匹配到任何标记，返回纯文本
  if (nodes.length === 0 && text) {
    nodes.push({ type: 'text', content: text })
  }
  
  return nodes
}

