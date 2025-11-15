import type { ScriptSegment } from '@/types'

/**
 * 阶段6: 继承 (The Inheritance)
 * 
 * P6-CORE-TFINAL-Invitation
 * 作用: 开放式结局，主题的最终升华。
 * 伏笔: 游戏的循环，从主角的，变成了玩家的。
 */
export const P6_CORE_TFINAL_Invitation: ScriptSegment = {
  id: 'P6-CORE-TFINAL-Invitation',
  time: 'FINAL',
  description: '阶段6 - 邀请',
  loop: 'P6',
  unlockFlags: ['FLAG_4th_Wall_Broken'],
        lines: []
}

