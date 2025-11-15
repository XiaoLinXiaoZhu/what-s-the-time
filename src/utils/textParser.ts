import type { TextNode, TextFormat } from '@/types'

/**
 * 解析带格式标记的文本
 * 支持标记：
 * - {red}...{/red} - 红色文本
 * - {bold}...{/bold} - 粗体
 * - {italic}...{/italic} - 斜体
 * - {blur}...{/blur} - 模糊文本
 * - {strike}...{/strike} - 删除线文本
 * - {br} - 换行
 * - {delay:1.2} - 延时（秒）
 * - {systemTime} - 系统当前时间（HH:MM格式，实时更新）
 * - {animateText:string1|string2|string3} - 动画文本（每0.5秒切换）
 * - {typewriter}...{/typewriter} - 逐字打印（转译为每个字符之间插入{delay:0.5}）
 * - 可以嵌套使用，支持多个格式叠加
 */
export function parseText(text: string, parentFormats: TextFormat[] = []): TextNode[] {
  const nodes: TextNode[] = []
  
  if (!text) return nodes
  
  // 使用栈来跟踪格式标签的嵌套
  const formatStack: TextFormat[] = [...parentFormats]
  let i = 0
  
  while (i < text.length) {
    // 查找下一个标签开始位置
    const tagStart = text.indexOf('{', i)
    
    if (tagStart === -1) {
      // 没有更多标签，添加剩余文本
      const remainingText = text.substring(i)
      if (remainingText) {
        nodes.push({
          type: 'text',
          content: remainingText,
          formats: formatStack.length > 0 ? [...formatStack] : undefined
        })
      }
      break
    }
    
    // 添加标签前的文本
    if (tagStart > i) {
      const beforeText = text.substring(i, tagStart)
      if (beforeText) {
        nodes.push({
          type: 'text',
          content: beforeText,
          formats: formatStack.length > 0 ? [...formatStack] : undefined
        })
      }
    }
    
    // 查找标签结束位置
    const tagEnd = text.indexOf('}', tagStart)
    if (tagEnd === -1) {
      // 没有找到结束标签，添加剩余文本
      const remainingText = text.substring(tagStart)
      if (remainingText) {
        nodes.push({
          type: 'text',
          content: remainingText,
          formats: formatStack.length > 0 ? [...formatStack] : undefined
        })
      }
      break
    }
    
    // 提取标签内容
    const tagContent = text.substring(tagStart + 1, tagEnd)
    
    // 处理特殊标签
    if (tagContent.startsWith('delay:')) {
      const delayTime = parseFloat(tagContent.substring(6))
      nodes.push({ type: 'delay', content: '', delayTime })
      i = tagEnd + 1
      continue
    } else if (tagContent.startsWith('animateText:')) {
      const animateContent = tagContent.substring(12)
      const animateTexts = animateContent.split('|').map(s => s.trim()).filter(s => s.length > 0)
      if (animateTexts.length > 0) {
        nodes.push({
          type: 'animateText',
          content: animateTexts[0],
          animateTexts
        })
      }
      i = tagEnd + 1
      continue
    } else if (tagContent === 'br') {
      nodes.push({ type: 'linebreak', content: '' })
      i = tagEnd + 1
      continue
    } else if (tagContent === 'systemTime') {
      nodes.push({ type: 'systemTime', content: '' })
      i = tagEnd + 1
      continue
    } else if (tagContent === 'typewriter') {
      // 处理 typewriter 标签：将内容转译为每个字符之间插入 {delay:0.5}
      const endTag = '{/typewriter}'
      const endIndex = text.indexOf(endTag, tagEnd + 1)
      
      if (endIndex !== -1) {
        // 找到结束标签，提取内部文本
        const innerText = text.substring(tagEnd + 1, endIndex)
        
        // 将每个字符之间插入 {delay:0.5}
        const translatedText = innerText
          .split('')
          .map((char, index) => {
            // 最后一个字符后面不需要 delay
            return index < innerText.length - 1 ? `${char}{delay:0.3}` : char
          })
          .join('')
        
        // 递归解析转译后的文本
        const innerNodes = parseText(translatedText, [...formatStack])
        nodes.push(...innerNodes)
        
        i = endIndex + endTag.length
      } else {
        // 没有找到结束标签，当作普通文本处理
        i = tagEnd + 1
      }
      continue
    }
    
    // 处理格式标签
    if (tagContent.startsWith('/')) {
      // 结束标签
      const formatType = tagContent.substring(1)
      // 如果是 typewriter 的结束标签，跳过（已在开始标签时处理）
      if (formatType === 'typewriter') {
        i = tagEnd + 1
        continue
      }
      // 处理格式标签的结束标签
      const formatTypeAsTextFormat = formatType as TextFormat
      const index = formatStack.lastIndexOf(formatTypeAsTextFormat)
      if (index !== -1) {
        formatStack.splice(index, 1)
      }
      i = tagEnd + 1
    } else if (['red', 'bold', 'italic', 'blur', 'strike'].includes(tagContent)) {
      // 开始标签
      const formatType = tagContent as TextFormat
      const endTag = `{/${formatType}}`
      const endIndex = text.indexOf(endTag, tagEnd + 1)
      
      if (endIndex !== -1) {
        // 找到结束标签，提取内部文本
        const innerText = text.substring(tagEnd + 1, endIndex)
        
        // 将当前格式添加到栈中
        formatStack.push(formatType)
        
        // 递归解析内部文本
        const innerNodes = parseText(innerText, [...formatStack])
        
        // 从栈中移除当前格式
        formatStack.pop()
        
        // 添加内部节点
        nodes.push(...innerNodes)
        
        i = endIndex + endTag.length
      } else {
        // 没有找到结束标签，当作普通文本处理
        i = tagEnd + 1
      }
    } else {
      // 未知标签，当作普通文本处理
      i = tagEnd + 1
    }
  }
  
  // 如果没有匹配到任何标记，返回纯文本
  if (nodes.length === 0 && text) {
    nodes.push({
      type: 'text',
      content: text,
      formats: parentFormats.length > 0 ? [...parentFormats] : undefined
    })
  }
  
  return nodes
}

