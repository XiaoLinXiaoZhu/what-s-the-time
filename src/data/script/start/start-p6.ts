import type { ScriptSegment } from '@/types'

/**
 * 阶段6开场片段
 * 主题：继承 - 循环、邀请玩家
 */
export const startP6Segment: ScriptSegment = {
  id: 'START-P6',
  time: 'START',
  description: '阶段6开场 - 继承',
  loop: 'P6',
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
      text: '现在……现在……{br}我抬起手，看了看手表。{delay:1}时间是……{br}{delay:1}你的时间。{br}{delay:1}现在，{delay:0.8}轮到你了。{br}于是我张口'
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

