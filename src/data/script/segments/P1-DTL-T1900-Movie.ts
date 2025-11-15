import type { ScriptSegment } from '@/types'

/**
 * 阶段1: 糖衣 (The Honeymoon)
 * 
 * P1-DTL-T1900-Movie
 * 作用: 强化主角的病态控制。
 * 诡计执行: 【主角自我洗脑】。主角在无意识中，用A的模板覆盖B的现实。
 * 伏笔: 两个女孩喜好的差异，是后期拆分诡计的关键。
 * 给予的线索: 生日 关键词 (B提到下周生日)
 */
export const P1_DTL_T1900_Movie: ScriptSegment = {
  id: 'P1-DTL-T1900-Movie',
  time: '19:00',
  description: '阶段1 - 电影',
  loop: 'P1',
  unlockFlags: ['FLAG_Knows_D_Vaguely'],
        lines: []
}

