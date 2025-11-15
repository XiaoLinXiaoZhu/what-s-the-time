import type { ScriptSegment } from '@/types'

/**
 * 阶段4: 破绽 (The Unraveling)
 * 
 * P4-CORE-T1700-E_WitnessA
 * 作用: 确认E是A案的关键证人。
 * 进入条件: FLAG_Knows_E + FLAG_A_Identified + 辅助信息: 栏杆
 * 诡计执行: 【C+E穿插】。E的证人身份被确认。
 * 伏笔: E的负罪感根源。
 */
export const P4_CORE_T1700_E_WitnessA: ScriptSegment = {
  id: 'P4-CORE-T1700-E_WitnessA',
  time: '17:00',
  description: '阶段4 - E的证词',
  loop: 'P4',
  unlockFlags: ['FLAG_Knows_E', 'FLAG_A_Identified'], // 需要"栏杆"关键词辅助解锁
        lines: []
}

