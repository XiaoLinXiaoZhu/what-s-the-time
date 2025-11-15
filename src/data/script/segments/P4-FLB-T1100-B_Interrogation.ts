import type { ScriptSegment } from '@/types'

/**
 * 阶段4: 破绽 (The Unraveling)
 * 
 * P4-FLB-T1100-B_Interrogation
 * 作用: 展示主角谎言的崩溃。
 * 诡计执行: 【非线性探索】的成果。玩家因为知道了"菠萝包"的秘密，所以能理解主角此刻的窘境。
 * 伏笔: G警官看主角的眼神，从同情变成了怀疑。
 */
export const P4_FLB_T1100_B_Interrogation: ScriptSegment = {
  id: 'P4-FLB-T1100-B_Interrogation',
  time: '11:00',
  description: '阶段4 - B案审讯',
  loop: 'P4',
  unlockFlags: ['FLAG_B_Identified'],
        lines: []
}

