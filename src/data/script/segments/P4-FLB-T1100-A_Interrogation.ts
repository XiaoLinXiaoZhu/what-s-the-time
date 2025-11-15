import type { ScriptSegment } from '@/types'

/**
 * 阶段4: 破绽 (The Unraveling)
 * 
 * P4-FLB-T1100-A_Interrogation
 * 作用: 揭示栽赃过程。
 * 诡计执行: 【主角自我洗脑】。玩家能看到主角在说谎时，连他自己都信了。
 * 伏笔: G警官记录时，笔尖的犹豫。
 */
export const P4_FLB_T1100_A_Interrogation: ScriptSegment = {
  id: 'P4-FLB-T1100-A_Interrogation',
  time: '11:00',
  description: '阶段4 - A案审讯',
  loop: 'P4',
  unlockFlags: ['FLAG_A_Identified'],
        lines: []
}

