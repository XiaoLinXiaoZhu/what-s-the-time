import type { ScriptSegment } from '@/types'

/**
 * P02-03：夜间独白·A 案后的失眠
 * 真实时间：A 案后若干晚
 * 建议输入：23:15（旧案闪回）
 */
export const P02_03: ScriptSegment = {
  id: 'P02-03',
  time: '23:15',
  description: '夜间独白·A 案后的失眠',
  loop: 'C',
  unlockFlags: ['loop_b_complete'],
  lines: [
    {
      type: 'narration',
      text: '夜晚。我躺在床上。'
    },
    {
      type: 'narration',
      text: '脑中反复出现 10:07 的表盘。{br}指针停在那个位置，一动不动。'
    },
    {
      type: 'dialogue',
      text: '10:07...{delay:1}10:07...{delay:1}10:07...'
    },
    {
      type: 'narration',
      text: '我看向床头的闹钟。{br}现实时间：23:15。'
    },
    {
      type: 'dialogue',
      text: '但在我心里，时间还停在 10:07。'
    },
    {
      type: 'narration',
      text: '两个时间，在我心里分裂。{br}现实的时间在走，{br}但心里的时间，卡住了。'
    },
    {
      type: 'dialogue',
      text: '时间是...{delay:1}什么？'
    },
    {
      type: 'narration',
      text: '我闭上眼睛，但那个表盘还在眼前。{br}10:07。{br}永远停在那一刻。'
    }
  ]
}

