import type { ScriptSegment } from '@/types'

/**
 * 阶段1: 糖衣 (The Honeymoon)
 * 
 * P1-BKG-T1620-LibraryStare
 * 作用: 建立主角对H的敌意。
 * 诡计执行: 【X合一】。这里被注视的其实是A，但玩家会无缝代入成B，认为H在觊觎自己的"女友"。
 * 伏笔: 主角的嫉妒和敌意是真实的，但对象被他自己混淆了。
 * 给予的线索: 14:00 (主角回忆起H似乎找她说过什么)
 */
export const P1_BKG_T1620_LibraryStare: ScriptSegment = {
  id: 'P1-BKG-T1620-LibraryStare',
  time: '16:20',
  description: '阶段1 - 图书馆注视',
  loop: 'P1',
  unlockFlags: ['FLAG_H_Reputation_Bad'],
  // { type: 'narration', text: '...' }
        lines: []
}

