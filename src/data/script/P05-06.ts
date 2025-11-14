import type { ScriptSegment } from '@/types'

/**
 * P05-06：18:39 分尸前一分钟看表
 * 真实时间：Day Bx 18:39
 * 建议输入：18:39
 */
export const P05_06: ScriptSegment = {
  id: 'P05-06',
  time: '18:39',
  description: '18:39 分尸前一分钟看表',
  loop: 'E',
  unlockFlags: [],
  lines: [
    {
      type: 'narration',
      text: '垃圾站前。{br}我拖着袋子，一次次看表。'
    },
    {
      type: 'dialogue',
      text: '18:39...{delay:1}还有一分钟。'
    },
    {
      type: 'narration',
      text: '我再看一次表。{br}18:39。'
    },
    {
      type: 'dialogue',
      text: '还有一分钟。'
    },
    {
      type: 'narration',
      text: '还有一分钟。{br}我知道，接下来要做什么。{br}我知道，这是必须的。{br}但我也知道，{br}这一分钟，是我最后的犹豫。'
    },
    {
      type: 'dialogue',
      text: '18:39...{delay:1}18:40...'
    },
    {
      type: 'narration',
      text: '时间到了。{br}没有退路了。'
    }
  ]
}

