import type { ScriptSegment } from '@/types'

/**
 * 阶段3: 受害者剧本 (The Victim's Script)
 * 
 * P3-CORE-T1430-D_Confrontation
 * 作用: 首次出现强烈的外部质疑，开启破绽。
 * 诡计执行: 【非线性探索】。D的质问与主流的"H是凶手"叙事形成强烈冲突。
 * 伏笔: 玩家第一次意识到，"失踪"和"死亡"可能是两件事。
 * 给予的线索: D的名字
 */
export const P3_CORE_T1430_D_Confrontation: ScriptSegment = {
  id: 'P3-CORE-T1430-D_Confrontation',
  time: '14:30',
  description: '阶段3 - D的对峙',
  loop: 'P3',
  unlockFlags: ['FLAG_H_Is_Suspect'],
        lines: []
}

