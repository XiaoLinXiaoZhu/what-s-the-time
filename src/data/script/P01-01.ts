import type { ScriptSegment } from '@/types'

/**
 * P01-01：08:20 A 发约楼顶的消息
 * 真实时间：Day A 当天早晨
 * 建议输入：08:20（闪回）
 */
export const P01_01: ScriptSegment = {
  id: 'P01-01',
  time: '08:20',
  description: 'A 发约楼顶的消息',
  loop: 'C',
  unlockFlags: ['loop_b_complete'],
  lines: [
    {
      type: 'narration',
      text: '我看了看表。{br}八点二十。'
    },
    {
      type: 'narration',
      text: '手机屏幕上显示一条消息：'
    },
    {
      type: 'dialogue',
      character: 'A',
      text: '等会儿上去聊聊。'
    },
    {
      type: 'narration',
      text: '时间戳：{bold}08:20{/bold}'
    },
    {
      type: 'dialogue',
      text: '我盯着屏幕看了很久。{br}然后回复：'
    },
    {
      type: 'dialogue',
      text: '好。'
    },
    {
      type: 'narration',
      text: '一个字就够了。{br}我知道这意味着什么。{br}也知道，这是机会。'
    },
    {
      type: 'narration',
      text: '我看了看表。{br}时间还早。{br}我们约在楼顶，{br}大概{bold}十点零五{/bold}左右见面。{br}还有时间准备。'
    }
  ]
}

