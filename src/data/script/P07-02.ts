import type { ScriptSegment } from '@/types'

/**
 * P07-02：警官 G 最后一次谈话（"你可以回去了"）
 * 真实时间：判决前后
 * 建议输入：11:30
 */
export const P07_02: ScriptSegment = {
  id: 'P07-02',
  time: '11:30',
  description: '警官 G 最后一次谈话（"你可以回去了"）',
  loop: 'F',
  unlockFlags: [],
  lines: [
    {
      type: 'narration',
      text: '警局。{br}警官 G 坐在我对面。'
    },
    {
      type: 'dialogue',
      character: 'G',
      text: '你可以回去了。'
    },
    {
      type: 'dialogue',
      text: '...什么？'
    },
    {
      type: 'dialogue',
      character: 'G',
      text: '之后好好生活。'
    },
    {
      type: 'dialogue',
      text: '...好。'
    },
    {
      type: 'narration',
      text: '我下意识看表。{br}表盘仍是 10:07。{br}法律与心里时间割裂。'
    },
    {
      type: 'narration',
      text: '法律说，{br}我可以回去了。{br}但时间说，{br}我还停在 10:07。{br}永远，{br}停在那里。'
    }
  ]
}

