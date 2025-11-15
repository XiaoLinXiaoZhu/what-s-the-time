import type { ScriptSegment } from '@/types'

/**
 * 阶段1: 糖衣 (The Honeymoon)
 * 
 * P1-BKG-T0830-Gossip
 * 作用: 铺垫H的负面形象。
 * 诡计执行: 【人物混淆】。在H正式登场前，用偏见给他贴上标签。
 * 伏笔: 社会偏见是主角最强大的武器。
 * 给予的线索: 16:20 (对话中提到"下午图书馆总能看到他")
 */
export const P1_BKG_T0830_Gossip: ScriptSegment = {
  id: 'P1-BKG-T0830-Gossip',
  time: '08:30',
  description: '阶段1 - 流言',
  loop: 'P1',
  unlockFlags: ['FLAG_Knows_B_Persona'],
  // { type: 'narration', text: '...' }
        lines: []
}

