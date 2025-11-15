import type { ScriptSegment } from '@/types'

/**
 * 阶段0开场片段
 * 主题：初始循环 - 模糊、混乱、时间错位
 */
export const startP0Segment: ScriptSegment = {
  id: 'START-P0',
  time: 'START',
  description: '阶段0开场 - 初始循环',
  loop: 'P0',
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
      text: '现在……现在……{br}我抬起手，看了看手表。{delay:1}时间是……{br}{delay:1}{blur}10:37{/blur}……{br}{delay:1}应该吧……{br}不，{delay:0.8}时间不对。'
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

