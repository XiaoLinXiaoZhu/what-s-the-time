import type { ScriptSegment } from '@/types'

/**
 * 阶段2: 裂痕 (The Crack)
 * 
 * P2-FLB-T0000-C_Whisper2
 * 作用: 强化主角的内在动机。
 * 进入时间: (在阶段2任意核心片段后随机触发)
 * 诡计执行: 【C+E穿插】。
 * 伏笔: 主角的暴力行为有了内在的"许可"。
 */
export const P2_FLB_T0000_C_Whisper2: ScriptSegment = {
  id: 'P2-FLB-T0000-C_Whisper2',
  time: '*', // 在阶段2任意核心片段后随机触发
  description: '阶段2 - C的低语2',
  loop: 'P2',
  unlockFlags: ['FLAG_Talk_Is_Coming'],
        lines: []
}

