import type { ScriptSegment } from '@/types'

/**
 * 阶段1: 糖衣 (The Honeymoon)
 * 
 * P1-FLB-T0000-C_Whisper1
 * 作用: 首次引入"理想她"C，打破日常氛围。
 * 进入时间: (在阶段1任意DTL片段后随机触发一次)
 * 诡计执行: 【C+E穿插】。让玩家首次接触到"第三个她"的存在，增加神秘感。
 * 伏笔: C是主角所有行为的内在驱动力。
 */
export const P1_FLB_T0000_C_Whisper1: ScriptSegment = {
  id: 'P1-FLB-T0000-C_Whisper1',
  time: '*', // 随机触发
  description: '阶段1 - C的低语1',
  loop: 'P1',
  unlockFlags: ['FLAG_Control_Established'],
        lines: []
}

