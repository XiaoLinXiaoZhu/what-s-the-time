import type { ScriptSegment } from '@/types'

/**
 * 开场片段（特殊片段，time 为 'START'）
 */
export const startFirstSegment: ScriptSegment = {
  id: 'START',
  time: 'START',
  description: '游戏开场',
  loop: 'START',
  unlockFlags: [],
  lines: [
    {
      type: 'narration',
      text: '我在想，{br}时间是……？'
    },
    {
      type: 'dialogue',
      text: '不，是{delay:1}  {bold}她{/bold} {animateText:ta|她|他|它|祂}  在问我。'
    },
    {
      type: "narration",
      text: "现在……现在……{br}我抬起手，看了看手表。时间是……{br}{delay:1}上午八点零五……{br}{delay:1}应该吧……{br}于是我张口"
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

