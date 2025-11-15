import type { ScriptSegment } from '@/types'

/**
 * 阶段2: 裂痕 (The Crack)
 * 
 * P2-BKG-T2300-D_Concern
 * 作用: 展现D的视角，提供外部线索。
 * 诡计执行: 【非线性探索】。首次引入非主角视角，打破叙事常规。
 * 伏笔: "菠萝包"成为D后期质疑主角的关键证据。
 * 给予的线索: 菠萝包 关键词 (B回复："放心，如果不对劲，我会给你发'菠萝包'的")
 */
export const P2_BKG_T2300_D_Concern: ScriptSegment = {
  id: 'P2-BKG-T2300-D_Concern',
  time: '23:00',
  description: '阶段2 - D的担忧',
  loop: 'P2',
  unlockFlags: ['FLAG_Knows_D_Vaguely'],
        lines: []
}

