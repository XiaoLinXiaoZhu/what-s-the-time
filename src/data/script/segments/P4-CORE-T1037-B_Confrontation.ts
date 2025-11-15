import type { ScriptSegment } from '@/types'

/**
 * 阶段4: 破绽 (The Unraveling)
 * 
 * P4-CORE-T1037-B_Confrontation
 * 作用: 揭示B案真相，确认主角是连环作案者。
 * 进入条件: FLAG_D_Is_Investigating + 辅助信息: 可乐
 * 诡计执行: 【X拆分】完成。玩家确认了第二个受害者B的存在。
 * 伏笔: 与A案的"激情"相比，B案的冷静暗示了主角的堕落。
 * 给予的线索: 18:40 (主角冷静地看了一眼手表)
 */
export const P4_CORE_T1037_B_Confrontation: ScriptSegment = {
  id: 'P4-CORE-T1037-B_Confrontation',
  time: '10:37',
  description: '阶段4 - B案真相',
  loop: 'P4',
  unlockFlags: ['FLAG_D_Is_Investigating'], // 需要"可乐"关键词辅助解锁
        lines: []
}

