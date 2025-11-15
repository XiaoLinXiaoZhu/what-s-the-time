import type { ScriptSegment } from '@/types'

/**
 * 阶段3: 受害者剧本 (The Victim's Script)
 * 
 * P3-BKG-T2000-F_Comfort
 * 作用: 塑造F老师，代表"体制的盲点"。
 * 伏笔: F的善意成了主角的保护伞。
 * 给予的线索: 03:15 (主角挂掉电话，失眠到深夜)
 */
export const P3_BKG_T2000_F_Comfort: ScriptSegment = {
  id: 'P3-BKG-T2000-F_Comfort',
  time: '20:00',
  description: '阶段3 - F的安慰',
  loop: 'P3',
  unlockFlags: ['FLAG_H_Is_Suspect'],
        lines: []
}

