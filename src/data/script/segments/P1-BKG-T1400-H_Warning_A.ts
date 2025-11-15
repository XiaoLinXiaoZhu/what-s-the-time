import type { ScriptSegment } from '@/types'

/**
 * 阶段1: 糖衣 (The Honeymoon)
 * 
 * P1-BKG-T1400-H_Warning_A
 * 作用: 揭示A觉醒的外因，为H的悲剧铺垫。
 * 诡计执行: 【X拆分】的早期伏笔。这里明确提到了A的名字（或者用一个独特的代称），但很容易被玩家忽略。
 * 伏笔: H的动机是善意的。
 * 给予的线索: 天台 关键词 (对话背景)
 */
export const P1_BKG_T1400_H_Warning_A: ScriptSegment = {
  id: 'P1-BKG-T1400-H_Warning_A',
  time: '14:00',
  description: '阶段1 - H的警告',
  loop: 'P1',
  unlockFlags: ['FLAG_Knows_H_Vaguely'],
  // { type: 'narration', text: '...' }
        lines: []
}

