/**
 * 文本规范化工具
 * 处理延时简写和其他文本格式转换
 */

/**
 * 规范化延时标记
 * - |||| (4个竖线) -> {delay:1}
 * - ||| (3个竖线) -> {delay:0.75}
 * - || (2个竖线) -> {delay:0.5}
 * - | (1个竖线) -> {delay:0.25}
 *
 * 注意：只匹配非转义的竖线，避免误伤Markdown中的表格、列表等
 */
export function normalizeDelayNotation(text: string): string {
  // 从长到短替换所有竖线组合
  let result = text
  
  // |||| -> {delay:1}
  result = result.replace(/\|\|\|\|/g, '{delay:1}')
  
  // ||| -> {delay:0.75}
  result = result.replace(/\|\|\|/g, '{delay:0.75}')
  
  // || -> {delay:0.5}
  result = result.replace(/\|\|/g, '{delay:0.5}')
  
  // 此时所有连续的竖线组合已被替换，剩下的单竖线 | 都是独立的
  // | -> {delay:0.25} (直接替换所有剩余的单竖线)
  result = result.replace(/\|/g, '{delay:0.25}')
  
  return result
}

/**
 * 规范化粗体标记
 * - **文本** -> {bold}文本{/bold}
 */
export function normalizeBoldNotation(text: string): string {
  return text.replace(/\*\*(.+?)\*\*/g, '{bold}$1{/bold}')
}

/**
 * 规范化模糊标记
 * - ==文本== -> {blur}文本{/blur}
 */
export function normalizeBlurNotation(text: string): string {
  return text.replace(/==(.+?)==/g, '{blur}$1{/blur}')
}

/**
 * 完整的文本规范化流程
 * 按顺序应用所有转换
 */
export function normalizeText(text: string): string {
  let result = text
  
  // 1. 先处理延时标记（因为它们包含竖线）
  result = normalizeDelayNotation(result)
  
  // 2. 处理粗体标记
  result = normalizeBoldNotation(result)
  
  // 3. 处理模糊标记
  result = normalizeBlurNotation(result)
  
  return result
}
