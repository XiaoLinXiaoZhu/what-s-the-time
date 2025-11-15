import type { ScriptSegment } from '@/types'

/**
 * 阶段4: 破绽 (The Unraveling)
 * 
 * P4-CORE-T1037-A_DeathReal
 * 作用: 【首次拆分诡计】，揭示A案真相，颠覆玩家认知。
 * 进入条件: FLAG_H_Is_Suspect + 辅助信息: 天台
 * 诡计执行: 【X拆分】的决定性时刻。玩家第一次意识到"死亡"的场景是属于一个叫A的女孩。
 * 伏笔: A坠落前说的最后一句话："你根本不爱任何人…"
 */
export const P4_CORE_T1037_A_DeathReal: ScriptSegment = {
  id: 'P4-CORE-T1037-A_DeathReal',
  time: '10:37',
  description: '阶段4 - A案真相',
  loop: 'P4',
  unlockFlags: ['FLAG_H_Is_Suspect'], // 需要"天台"关键词辅助解锁
        lines: []
}

