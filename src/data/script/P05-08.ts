import type { ScriptSegment } from '@/types'

/**
 * P05-08：18:55 分尸后洗净的日常动作
 * 真实时间：Day Bx 18:55
 * 建议输入：18:55
 */
export const P05_08: ScriptSegment = {
  id: 'P05-08',
  time: '18:55',
  description: '18:55 分尸后洗净的日常动作',
  loop: 'E',
  unlockFlags: [],
  lines: [
    {
      type: 'narration',
      text: '水龙头下。{br}我洗手。{br}洗锯子。'
    },
    {
      type: 'dialogue',
      text: '今天的水有点凉。'
    },
    {
      type: 'narration',
      text: 'E 也在旁边洗手。{br}我们就像在做一件，{br}很平常的事。'
    },
    {
      type: 'dialogue',
      character: 'E',
      text: '结束了。'
    },
    {
      type: 'dialogue',
      text: '嗯。'
    },
    {
      type: 'narration',
      text: '我们把极度异常包成平常动作。{br}就像，{br}只是做了一次家务。{br}只是，{br}处理了一些垃圾。'
    },
    {
      type: 'narration',
      text: '水很凉，{br}但洗得很干净。{br}一切，{br}都结束了。'
    }
  ]
}

