import type { ScriptSegment } from '@/types'

/**
 * P06-02：12:10 空座位与便利贴
 * 真实时间：同一日中午
 * 建议输入：12:10（Phase 2 版本）
 * 
 * 设计说明：
 * - 便利贴可能是未来的时间线索，但现在只写物，不解释，让它成为一个谜
 */
export const P06_02: ScriptSegment = {
  id: 'P06-02',
  time: '12:10',
  description: '空座位与便利贴',
  loop: 'B',
  unlockFlags: ['loop_a_complete'],
  lines: [
    {
      type: 'narration',
      text: '我看了看表。{br}十二点一十。'
    },
    {
      type: 'narration',
      text: 'B 的座位空着。{br}桌上留着一张便利贴。'
    },
    {
      type: 'dialogue',
      text: '但我看不清上面写了什么。'
    },
    {
      type: 'narration',
      text: '我走近，想看清楚。{br}但字迹模糊，{br}或者，{br}我根本不想看清楚。'
    },
    {
      type: 'narration',
      text: '纸上似乎写了什么，{br}但被水渍晕开了。{br}只留下模糊的痕迹，{br}像是一个谜。'
    }
  ]
}

