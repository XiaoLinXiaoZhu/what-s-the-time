import type { ScriptSegment } from '@/types'

/**
 * 阶段1: 糖衣 (The Honeymoon)
 * 
 * P1-DTL-T1210-A_Note
 * 作用: 嫁接A线的关键节点。
 * 诡计执行: 【X合一】。这是A写的纸条，但玩家会误以为是B在P2-CORE-T2215之后，决定正式约谈。这是诡计的核心嫁接点。
 * 伏笔: 纸条的字迹。
 */
export const P1_DTL_T1210_A_Note: ScriptSegment = {
  id: 'P1-DTL-T1210-A_Note',
  time: '12:10',
  description: '阶段1 - A的纸条',
  loop: 'P1',
  unlockFlags: ['FLAG_H_Motive_Good'],
  // { type: 'narration', text: '...' }
        lines: []
}

