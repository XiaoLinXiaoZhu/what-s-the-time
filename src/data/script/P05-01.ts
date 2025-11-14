import type { ScriptSegment } from '@/types'

/**
 * P05-01：早上 08:xx，B 约"放学聊聊"
 * 真实时间：Day Bx 早晨
 * 建议输入：08:20/08:30
 */
export const P05_01: ScriptSegment = {
  id: 'P05-01',
  time: '08:30',
  description: '早上 08:xx，B 约"放学聊聊"',
  loop: 'E',
  unlockFlags: [],
  lines: [
    {
      type: 'narration',
      text: '早晨。教室。'
    },
    {
      type: 'dialogue',
      character: 'B',
      text: '今天放学后，我想和你谈谈。'
    },
    {
      type: 'dialogue',
      text: '...好。'
    },
    {
      type: 'dialogue',
      character: 'B',
      text: '下午三点一十，我在教室等你。'
    },
    {
      type: 'dialogue',
      text: '我知道了。'
    },
    {
      type: 'narration',
      text: '她看着我，眼神很认真。{br}我知道，这次谈话，不会轻松。{br}但我也知道，我必须去。'
    },
    {
      type: 'narration',
      text: '时间：15:10。{br}这个时间，会成为一个锚点。{br}在未来的某个时刻，{br}当有人问"那天从几点开始不对劲"时，{br}这就是答案。'
    }
  ]
}

