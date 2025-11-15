import type { ScriptSegment } from '@/types'

/**
 * 阶段2: 裂痕 (The Crack)
 * 
 * P2-DTL-T1500-TeaOrCoke
 * 作用: 强烈的矛盾点，迫使玩家开始质疑。
 * 诡计执行: 【非线性线索】+【X拆分】。这是A和B喜好的直接冲突，是玩家第一次拿到的、无法忽视的铁证。
 * 伏笔: 这些物品将成为后期解锁"两问一锁"的钥匙。
 * 给予的线索: 可乐 关键词, 茶 关键词
 */
export const P2_DTL_T1500_TeaOrCoke: ScriptSegment = {
  id: 'P2-DTL-T1500-TeaOrCoke',
  time: '15:00',
  description: '阶段2 - 茶或可乐',
  loop: 'P2',
  unlockFlags: ['FLAG_Relationship_Established'],
        lines: []
}

