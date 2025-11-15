import type { ScriptSegment } from '@/types'

/**
 * 阶段2: 裂痕 (The Crack)
 * 
 * P2-BKG-T1730-E_Encounter
 * 作用: 引入E，增加不安感。
 * 诡计执行: 【C+E穿插】。E的出现，让"她"的身份更加扑朔迷离。
 * 伏笔: E知道一些事情。
 * 给予的线索: E的名字 (主角内心模糊地想起她的名字)
 */
export const P2_BKG_T1730_E_Encounter: ScriptSegment = {
  id: 'P2-BKG-T1730-E_Encounter',
  time: '17:30',
  description: '阶段2 - E的相遇',
  loop: 'P2',
  unlockFlags: ['FLAG_Talk_Is_Coming'],
        lines: []
}

