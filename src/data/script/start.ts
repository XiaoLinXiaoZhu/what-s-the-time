import type { ScriptSegment } from '@/types'

/**
 * 开场片段（特殊片段，time 为 'START'）
 */
export const startSegment: ScriptSegment = {
  id: 'START',
  time: 'START',
  description: '游戏开场',
  loop: 'START',
  unlockFlags: [],
  lines: [
    {
      type: 'narration',
      text: '时间是……？'
    },
    {
      type: 'dialogue',
      text: '不，是{delay:1}  {bold}他{/bold}  在问我。'
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

