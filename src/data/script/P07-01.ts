import type { ScriptSegment } from '@/types'

/**
 * P07-01：流言再起·这次是关于 E
 * 真实时间：E 顶罪消息传出后
 * 建议输入：任意课间时间，如 10:30
 */
export const P07_01: ScriptSegment = {
  id: 'P07-01',
  time: '10:30',
  description: '流言再起·这次是关于 E',
  loop: 'F',
  unlockFlags: [],
  lines: [
    {
      type: 'narration',
      text: '教室。{br}课间时间。'
    },
    {
      type: 'dialogue',
      text: '听说，她是凶手。'
    },
    {
      type: 'dialogue',
      text: '是啊，早就觉得她有问题。'
    },
    {
      type: 'dialogue',
      text: '没想到会做出这种事...'
    },
    {
      type: 'narration',
      text: '教室流言从"她失踪了"变成"她是凶手"。{br}名字换成 E，{br}同学用同样的句型评价她，{br}重复旧案对替罪羊的态度。'
    },
    {
      type: 'narration',
      text: '我路过他们身边，{br}听着这些讨论。{br}就像一年前一样，{br}替罪羊被钉死了。{br}只是，{br}这次是 E。'
    }
  ]
}

