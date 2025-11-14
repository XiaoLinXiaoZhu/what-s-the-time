import type { ScriptSegment } from '@/types'

/**
 * P08-03：最终独白·多重时间不对齐
 * 真实时间：结局收束时刻
 * 建议输入：可通过 meta 流程后自动进入
 */
export const P08_03: ScriptSegment = {
  id: 'P08-03',
  time: '23:59',
  description: '最终独白·多重时间不对齐',
  loop: 'G',
  unlockFlags: [],
  lines: [
    {
      type: 'narration',
      text: '主角在心中最后一次问"时间是……"。'
    },
    {
      type: 'narration',
      text: '手表：10:07。{br}手机：23:59。{br}红绿灯：18:40。'
    },
    {
      type: 'dialogue',
      text: '三个时间，各不相同。'
    },
    {
      type: 'narration',
      text: '他选择不说出正确答案，{br}让错位永远存在。'
    },
    {
      type: 'dialogue',
      text: '时间是...{delay:1}'
    },
    {
      type: 'narration',
      text: '话停住了。{br}没有答案。{br}也不会有答案。{br}时间，{br}就这样错位下去，{br}永远。'
    }
  ]
}

