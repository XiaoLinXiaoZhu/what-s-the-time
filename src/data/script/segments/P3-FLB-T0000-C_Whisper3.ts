import type { ScriptSegment } from '@/types'

/**
 * 阶段3: 受害者剧本 (The Victim's Script)
 * 
 * P3-FLB-T0000-C_Whisper3
 * 作用: 将主角的罪行合理化。
 * 进入时间: (在阶段3任意核心片段后随机触发)
 * 诡计执行: 【C+E穿插】+【主角自我洗脑】。
 * 伏笔: 主角的心理防线彻底建立。
 */
export const P3_FLB_T0000_C_Whisper3: ScriptSegment = {
  id: 'P3-FLB-T0000-C_Whisper3',
  time: '*', // 在阶段3任意核心片段后随机触发
  description: '阶段3 - C的低语3',
  loop: 'P3',
  unlockFlags: ['FLAG_H_Is_Suspect'],
        lines: []
}

