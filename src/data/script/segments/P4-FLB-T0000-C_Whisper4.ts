import type { ScriptSegment } from '@/types'

/**
 * 阶段4: 破绽 (The Unraveling)
 * 
 * P4-FLB-T0000-C_Whisper4
 * 作用: 展现主角内心的合理化机制。
 * 进入时间: (在阶段4任意核心片段后随机触发)
 * 伏笔: C已经从"理想"彻底变成了"魔鬼"。
 */
export const P4_FLB_T0000_C_Whisper4: ScriptSegment = {
  id: 'P4-FLB-T0000-C_Whisper4',
  time: '*', // 在阶段4任意核心片段后随机触发
  description: '阶段4 - C的低语4',
  loop: 'P4',
  unlockFlags: ['FLAG_Protagonist_Is_Killer'],
        lines: []
}

