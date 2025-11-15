import type { ScriptSegment } from '@/types'

/**
 * 阶段3: 受害者剧本 (The Victim's Script)
 * 
 * P3-BKG-T1325-Gossip
 * 作用: 利用舆论强化H的负面形象。
 * 伏笔: E的沉默。
 * 给予的线索: E的名字
 */
export const P3_BKG_T1325_Gossip: ScriptSegment = {
  id: 'P3-BKG-T1325-Gossip',
  time: '13:25',
  description: '阶段3 - 流言',
  loop: 'P3',
  unlockFlags: ['FLAG_H_Is_Suspect'],
        lines: []
}

