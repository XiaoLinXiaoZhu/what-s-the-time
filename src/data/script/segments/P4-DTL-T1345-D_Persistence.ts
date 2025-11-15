import type { ScriptSegment } from '@/types'

/**
 * 阶段4: 破绽 (The Unraveling)
 * 
 * P4-DTL-T1345-D_Persistence
 * 作用: 展现D的坚持和友情。
 * 伏笔: B的日记成为最终的铁证。
 * 给予的线索: 日记 关键词
 */
export const P4_DTL_T1345_D_Persistence: ScriptSegment = {
  id: 'P4-DTL-T1345-D_Persistence',
  time: '13:45',
  description: '阶段4 - D的坚持',
  loop: 'P4',
  unlockFlags: ['FLAG_D_Is_Investigating'],
  lines: [
    {
      type: 'narration',
      text: '非主角视角。{delay:1.5}D在整理B的遗物时，{delay:1}发现了B的日记。{delay:1.5}'
    },
    {
      type: 'narration',
      text: '里面记录了她对我的怀疑和不安。{delay:2}'
    },
    {
      type: 'dialogue',
      character: 'B的日记',
      text: '他看着我，{delay:1}但眼神却像在看另一个人。{delay:1.5}我害怕。'
    },
    {
      type: 'narration',
      text: 'D的坚持和友情。{delay:1.5}B的日记成为最终的铁证。{delay:1.5}'
    },
    {
      type: 'narration',
      text: '日记。{delay:1.5}'
    }
  ]
}

