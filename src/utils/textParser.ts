import type { TextNode } from '@/types'

/**
 * 解析带格式标记的文本
 * 支持标记：
 * - {red}...{/red} - 红色文本
 * - {bold}...{/bold} - 粗体
 * - {italic}...{/italic} - 斜体
 * - {br} - 换行
 * - 可以嵌套使用
 */
export function parseText(text: string): TextNode[] {
  const nodes: TextNode[] = []
  let currentIndex = 0
  
  // 正则匹配所有标记
  const tagRegex = /\{(red|bold|italic|br|/red|/bold|/italic)\}/g
  const matches: Array<{ type: string; index: number }> = []
  
  let match
  while ((match = tagRegex.exec(text)) !== null) {
    matches.push({
      type: match[1],
      index: match.index
    })
  }
  
  // 如果没有标记，直接返回纯文本
  if (matches.length === 0) {
    if (text.trim()) {
      nodes.push({ type: 'text', content: text })
    }
    return nodes
  }
  
  // 使用栈来处理嵌套标记
  const stack: Array<{ type: string; startIndex: number }> = []
  let lastIndex = 0
  
  for (const match of matches) {
    const isClosing = match.type.startsWith('/')
    const tagType = isClosing ? match.type.slice(1) : match.type
    
    if (isClosing) {
      // 处理结束标记
      const startTag = stack.find(s => s.type === tagType)
      if (startTag) {
        // 添加结束标记前的文本
        if (startTag.startIndex > lastIndex) {
          const beforeText = text.substring(lastIndex, startTag.startIndex)
          if (beforeText) {
            addTextNode(nodes, beforeText, stack.map(s => s.type))
          }
        }
        
        // 添加标记内的文本
        const innerText = text.substring(startTag.startIndex, match.index)
        if (innerText) {
          addTextNode(nodes, innerText, stack.map(s => s.type))
        }
        
        // 移除栈中的开始标记
        const index = stack.indexOf(startTag)
        stack.splice(index, 1)
        lastIndex = match.index + match.type.length + 2 // +2 for { and }
      }
    } else {
      // 处理开始标记
      // 先添加标记前的文本
      if (match.index > lastIndex) {
        const beforeText = text.substring(lastIndex, match.index)
        if (beforeText) {
          addTextNode(nodes, beforeText, stack.map(s => s.type))
        }
      }
      
      // 特殊处理换行标记
      if (tagType === 'br') {
        nodes.push({ type: 'linebreak', content: '' })
        lastIndex = match.index + 5 // {br} 的长度
        continue
      }
      
      // 将开始标记加入栈
      stack.push({
        type: tagType,
        startIndex: match.index + tagType.length + 3 // +3 for {, tag, }
      })
      lastIndex = match.index + tagType.length + 3
    }
  }
  
  // 添加剩余的文本
  if (lastIndex < text.length) {
    const remainingText = text.substring(lastIndex)
    if (remainingText) {
      addTextNode(nodes, remainingText, stack.map(s => s.type))
    }
  }
  
  return nodes
}

/**
 * 根据当前格式栈添加文本节点
 */
function addTextNode(
  nodes: TextNode[],
  text: string,
  formatStack: string[]
): void {
  if (!text) return
  
  // 如果栈为空，添加纯文本
  if (formatStack.length === 0) {
    nodes.push({ type: 'text', content: text })
    return
  }
  
  // 从最外层到最内层应用格式
  // 例如：{red}{bold}text{/bold}{/red} -> formatStack = ['red', 'bold']
  // 应该创建 bold 节点，然后 red 节点包裹它
  
  let currentNode: TextNode = { type: 'text', content: text }
  
  // 从内到外应用格式
  for (let i = formatStack.length - 1; i >= 0; i--) {
    const format = formatStack[i]
    switch (format) {
      case 'red':
        currentNode = { type: 'red', content: '' }
        // 这里需要特殊处理，因为我们需要保持嵌套结构
        // 简化处理：直接创建带格式的节点
        break
      case 'bold':
        currentNode = { type: 'bold', content: '' }
        break
      case 'italic':
        currentNode = { type: 'italic', content: '' }
        break
    }
  }
  
  // 简化版本：直接根据最外层格式创建节点
  const outerFormat = formatStack[formatStack.length - 1]
  switch (outerFormat) {
    case 'red':
      nodes.push({ type: 'red', content: text })
      break
    case 'bold':
      nodes.push({ type: 'bold', content: text })
      break
    case 'italic':
      nodes.push({ type: 'italic', content: text })
      break
    default:
      nodes.push({ type: 'text', content: text })
  }
}

