/**
 * 文本规范化
 *
 * 将 Markdown 简写转换为标准标记格式：
 * - |||| → {delay:1}
 * - **text** → {bold}text{/bold}
 * - ==text== → {blur}text{/blur}
 */

/** 规范化延时标记（从长到短替换） */
export function normalizeDelayNotation(text: string): string {
  return text
    .replace(/\|\|\|\|/g, "{delay:1}")
    .replace(/\|\|\|/g, "{delay:0.75}")
    .replace(/\|\|/g, "{delay:0.5}")
    .replace(/\|/g, "{delay:0.25}");
}

/** 规范化粗体标记 */
export function normalizeBoldNotation(text: string): string {
  return text.replace(/\*\*(.+?)\*\*/g, "{bold}$1{/bold}");
}

/** 规范化模糊标记 */
export function normalizeBlurNotation(text: string): string {
  return text.replace(/==(.+?)==/g, "{blur}$1{/blur}");
}

/** 完整规范化流程 */
export function normalizeText(text: string): string {
  let result = text;
  result = normalizeDelayNotation(result);
  result = normalizeBoldNotation(result);
  result = normalizeBlurNotation(result);
  return result;
}
