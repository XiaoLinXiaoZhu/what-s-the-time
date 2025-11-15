import type { ScriptSegment } from '@/types'

/**
 * 阶段5开场片段
 * 主题：深渊 - 彻底暴露、Meta觉醒
 */
export const startP5Segment: ScriptSegment = {
  id: 'START-P5',
  time: 'START',
  description: '阶段5开场 - 深渊',
  loop: 'P5',
  unlockFlags: [],
  lines: [
    {
      type: 'narration',
      text: '我在想，{br}时间是……？'
    },
    {
      type: 'dialogue',
      text: '不，{delay:1}是  {bold}你{/bold}  在问我。'
    },
    {
      type: 'narration',
      text: '现在……现在……{br}我抬起手，看了看手表。{delay:1}时间是……{br}{delay:1}上午八点零五……{br}{delay:1}应该吧……{br}但"现在"，{delay:0.8}又是什么时间？{br}于是我张口'
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

