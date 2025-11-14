import type { ScriptSegment } from '@/types'

/**
 * P09-02：开头句的轻微变体（循环或重置）
 * 真实时间：重开时刻
 * 建议输入：新一周目启动
 * 
 * 设计说明：
 * - 游戏再次出现"时间是……？"，但文本细节略有变化（例如"不是他在问我，是你在问我"），暗示循环但不解释
 */
export const P09_02: ScriptSegment = {
  id: 'P09-02',
  time: 'START',
  description: '开头句的轻微变体（循环或重置）',
  loop: 'G',
  unlockFlags: [],
  lines: [
    {
      type: 'narration',
      text: '时间是……？'
    },
    {
      type: 'dialogue',
      text: '不，是{delay:1}  {bold}你{/bold}  在问我。'
    },
    {
      type: 'dialogue',
      text: '{red}时间是:{/red}'
    },
    {
      type: 'input',
      placeholder: '输入时间 (HH:MM)'
    }
  ]
}

