import type { ScriptSegment } from '@/types'

/**
 * 阶段1: 糖衣 (The Honeymoon)
 * 
 * P1-DTL-T1230-Lunch
 * 作用: 引入D，强化日常感。
 * 诡计执行: 【人物混淆】。D被模糊成一个无名的、功能性的"朋友"角色。
 * 伏笔: 主角的控制欲延申到对恋人社交圈的排斥。
 * 给予的线索: 19:00 (朋友提到"晚上电影别迟到")
 */
export const P1_DTL_T1230_Lunch: ScriptSegment = {
  id: 'P1-DTL-T1230-Lunch',
  time: '12:30',
  description: '阶段1 - 午餐',
  loop: 'P1',
  unlockFlags: ['FLAG_Knows_B_Persona'],
  // { type: 'narration', text: '...' }
        lines: []
}

