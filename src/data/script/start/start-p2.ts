import type { ScriptSegment } from '@/types'

/**
 * 阶段2开场片段
 * 主题：裂痕 - 开始质疑、矛盾显现
 */
export const startP2Segment: ScriptSegment = {
  id: 'START-P2',
  time: 'START',
  description: '阶段2开场 - 裂痕',
  loop: 'P2',
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
      text: '现在……现在……{br}我抬起手，看了看手表。{delay:1}时间是……{br}{delay:1}上午八点零五……{br}{delay:1}应该吧……{br}但有些东西，{delay:0.8}开始不对劲了。{br}于是我张口'
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

