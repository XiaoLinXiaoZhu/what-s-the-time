import type { ScriptSegment } from '@/types'

/**
 * P08-01：探视室见面·E 自称 C
 * 真实时间：判决之后某个下午
 * 建议输入：14:30
 */
export const P08_01: ScriptSegment = {
  id: 'P08-01',
  time: '14:30',
  description: '探视室见面·E 自称 C',
  loop: 'F',
  unlockFlags: [],
  lines: [
    {
      type: 'narration',
      text: '探视室。{br}隔着玻璃。'
    },
    {
      type: 'dialogue',
      character: 'E',
      text: '对我来说，现在一直是那天晚上十八点四十。'
    },
    {
      type: 'dialogue',
      text: '...什么？'
    },
    {
      type: 'dialogue',
      character: 'E',
      text: '你就当是 C 吧。'
    },
    {
      type: 'dialogue',
      text: '...'
    },
    {
      type: 'narration',
      text: '主角默认她为"最后的 C"。{br}E 选择了这个位置，{br}选择了成为"怪物"。{br}而我，{br}选择了接受。'
    },
    {
      type: 'dialogue',
      character: 'E',
      text: '这样，你就自由了。'
    },
    {
      type: 'dialogue',
      text: '...谢谢。'
    },
    {
      type: 'narration',
      text: '但我知道，{br}我永远不可能自由。{br}时间，{br}还停在 10:07。'
    }
  ]
}

