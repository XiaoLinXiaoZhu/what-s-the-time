import type { ScriptSegment } from '@/types'

/**
 * 阶段2: 裂痕 (The Crack)
 * 
 * P2-CORE-T2215-Quarrel
 * 作用: "虚构恋爱史"的转折点。
 * 诡计执行: 【X合一】。这是B的觉醒，但玩家会把它理解为"X"对主角日益增强的控制欲的反抗，并将其与A的约谈动机联系起来。
 * 伏笔: B已经察觉到10:37这个时间对主角的特殊意义。
 * 给予的线索: 10:37 (B说"明天上午，在那个永远不变的时间，我们必须说清楚")
 */
export const P2_CORE_T2215_Quarrel: ScriptSegment = {
  id: 'P2-CORE-T2215-Quarrel',
  time: '22:15',
  description: '阶段2 - 争吵',
  loop: 'P2',
  unlockFlags: ['FLAG_Relationship_Established'],
        lines: []
}

