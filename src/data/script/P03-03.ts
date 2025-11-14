import type { ScriptSegment } from '@/types'

/**
 * P03-03：18:40 垃圾袋 + 锯子（伪日常版）
 * 真实时间：某天傍晚，暂未表明是案日
 * 建议输入：18:40（Phase 1/2）
 */
export const P03_03: ScriptSegment = {
  id: 'P03-03',
  time: '18:40',
  description: '垃圾袋 + 锯子（伪日常版）',
  loop: 'A',
  unlockFlags: [],
  lines: [
    {
      type: 'narration',
      text: '我抬起手腕，看表。'
    },
    {
      type: 'dialogue',
      text: '十八点...{delay:1}十八点四十。'
    },
    {
      type: 'narration',
      text: '我提着垃圾袋，旁边放着锯子。'
    },
    {
      type: 'dialogue',
      text: '家里农活用的工具。'
    },
    {
      type: 'narration',
      text: '我对自己解释着。{br}也对着空气解释着。{br}虽然，没有人问我。'
    },
    {
      type: 'narration',
      text: '垃圾袋很重。{br}锯子很干净。{br}一切都看起来，很正常。{br}只是...{delay:1}只是心里，有种说不出的违和感。'
    },
    {
      type: 'dialogue',
      text: '18:40...{delay:1}时间到了。'
    },
    {
      type: 'narration',
      text: '我看了看表，{br}确认时间。{br}然后，{br}继续手里的动作。{br}一切，{br}都很正常。'
    },
    {
      type: 'narration',
      text: '处理完这些，{br}我该回去了。{br}晚上{bold}十一点一十五{/bold}，{br}还有别的事要做。'
    }
  ]
}

