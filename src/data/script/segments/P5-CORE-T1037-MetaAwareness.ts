import type { ScriptSegment } from '@/types'

/**
 * 阶段5: 深渊 (The Abyss)
 * 
 * P5-CORE-T1037-MetaAwareness
 * 作用: 打破第四面墙的预备阶段。
 * 进入条件: FLAG_Truth_Completed (在此阶段反复输入10:37)
 * 伏笔: 主角开始将责任转移给玩家。
 */
export const P5_CORE_T1037_MetaAwareness: ScriptSegment = {
  id: 'P5-CORE-T1037-MetaAwareness',
  time: '10:37',
  description: '阶段5 - Meta觉醒',
  loop: 'P5',
  unlockFlags: ['FLAG_Truth_Completed'],
        lines: []
}

