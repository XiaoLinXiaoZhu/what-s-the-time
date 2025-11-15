import type { ScriptSegment } from '@/types'

/**
 * 阶段1: 糖衣 (The Honeymoon)
 * 
 * P1-DTL-T0805-Breakfast
 * 作用: 建立"虚构恋爱史"的开端；情感绑定。
 * 诡计执行: 【X合一】。这是B的真实日常，但玩家会将其视为"X恋爱史"的起点。
 * 伏笔: 她笑容中的疲惫。
 * 给予的线索: 12:30 (她说"中午在老地方见")
 */
export const P1_DTL_T0805_Breakfast: ScriptSegment = {
  id: 'P1-DTL-T0805-Breakfast',
  time: '08:05',
  description: '阶段1 - 早餐',
  loop: 'P1',
  unlockFlags: ['FLAG_Game_Start'],
  // { type: 'narration', text: '...' }
        lines: []
}

