import type { ScriptSegment } from '@/types'

/**
 * 阶段1开场片段
 * 主题：糖衣 - 甜蜜、日常、但隐约不安
 */
export const startP1Segment: ScriptSegment = {
  id: 'START-P1',
  time: 'START',
  description: '阶段1开场 - 糖衣',
  loop: 'P1',
  unlockFlags: [],
  lines: [
    {
      type: 'narration',
      text: '我在想，{br}时间是……？'
    },
    {
      type: 'dialogue',
      text: '不，{delay:1}是  {bold}她{/bold}  在问我。'
    },
    {
      type: 'narration',
      text: '现在……现在……{br}我抬起手，看了看手表。{delay:1}时间是……{br}{delay:1}上午八点零五……{br}{delay:1}那个完美的早晨。{br}于是我张口'
    },
    {
      type: 'dialogue',
      text: '{bold}{red}时间是:{/red}{/bold}'
    },
    {
      type: 'input',
      placeholder: '输入时间 (HH:MM)'
    }
  ]
}

