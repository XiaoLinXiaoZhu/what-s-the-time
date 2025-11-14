import type { ScriptSegment } from '@/types'

/**
 * P03-04：23:15 夜间独白·软版本
 * 真实时间：现在线某晚
 * 建议输入：23:15（Phase 1）
 */
export const P03_04: ScriptSegment = {
  id: 'P03-04',
  time: '23:15',
  description: '夜间独白·软版本',
  loop: 'A',
  unlockFlags: [],
  lines: [
    {
      type: 'narration',
      text: '夜晚。我躺在床上。'
    },
    {
      type: 'dialogue',
      text: '时间过得真快...{delay:1}真慢...{delay:1}时间是...'
    },
    {
      type: 'narration',
      text: '话停住了。'
    },
    {
      type: 'dialogue',
      text: '时间是...{delay:1}什么？'
    },
    {
      type: 'narration',
      text: '我没有说下去。{br}有些问题，不需要答案。{br}有些时间，不需要记住。'
    }
  ]
}

