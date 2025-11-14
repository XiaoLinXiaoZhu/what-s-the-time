import type { ScriptSegment } from '@/types'

/**
 * P01-05：10:08 A 死后 1 分钟，主角疯狂看表
 * 真实时间：Day A 10:08
 * 建议输入：10:08（闪回）
 */
export const P01_05: ScriptSegment = {
  id: 'P01-05',
  time: '10:08',
  description: '10:08 A 死后 1 分钟，主角疯狂看表',
  loop: 'D',
  unlockFlags: [],
  lines: [
    {
      type: 'narration',
      text: '楼顶只剩我一个人。'
    },
    {
      type: 'narration',
      text: '我抬起手腕，看表。{br}10:07。'
    },
    {
      type: 'narration',
      text: '不对，应该已经过去了。{br}我再看一次。{br}10:08。'
    },
    {
      type: 'dialogue',
      text: '时间...{delay:1}还在走。'
    },
    {
      type: 'narration',
      text: '我又看了一次。{br}10:08。'
    },
    {
      type: 'narration',
      text: '再看一次。{br}10:08。'
    },
    {
      type: 'narration',
      text: '再看一次——'
    },
    {
      type: 'dialogue',
      text: '时间没有倒回去。{br}它还在往前走。'
    },
    {
      type: 'narration',
      text: '我盯着表盘，看着秒针一格一格地移动。{br}每一格，都像在提醒我——{br}刚才发生的事，是真的。{br}时间不会倒流。{br}她不会回来。'
    },
    {
      type: 'dialogue',
      text: '10:08...{delay:1}10:09...{delay:1}10:10...'
    },
    {
      type: 'narration',
      text: '我一遍遍地看表，确认时间还在流动。{br}确认这个世界还在运转。{br}确认...{delay:1}我还在。'
    }
  ]
}

