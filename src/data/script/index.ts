import type { ScriptSegment } from '@/types'

// 特殊片段
import { startSegment } from './start'

// 保持向后兼容，导出原始 startSegment
export { startSegment }
export { blankSegment } from './blank'

let isFirstStart = true
/**
 * 根据当前 loop 获取对应的开头片段
 * @param loop 当前游戏阶段（loop）
 * @returns 对应的开头片段
 */
export function getStartSegment(loop?: string): ScriptSegment {
  // Loop G（meta 终局阶段）使用循环变体
  if (isFirstStart) {
    isFirstStart = false
    return startFirstSegment
  }
  if (loop === 'A') {
    return startASegment
  }

  // 默认返回原始开头片段
  return startSegment
}


// 统一导出所有片段数组
import { blankSegment } from './blank'
import { TEST_CHOICE } from './TEST-CHOICE'
import { TEST_TIMECHOICE } from './TEST-TIMECHOICE'
import { TEST_TAGS } from './TEST-TAGS'
import { TEST_COMMAND, TEST_COMMAND_2, TEST_COMMAND_END } from './TEST-COMMAND'
import { startFirstSegment } from './start-first'
import { startASegment } from './start-a'

// 阶段0: 初始循环
import { P0_CORE_T1007_FallBlur } from './phase0'

// 阶段1: 糖衣
import {
  P1_DTL_T0805_Breakfast,
  P1_BKG_T0830_Gossip,
  P1_DTL_T1230_Lunch,
  P1_BKG_T1620_LibraryStare,
  P1_DTL_T1900_Movie,
  P1_FLB_T0000_C_Whisper1,
  P1_DTL_T2145_GiftPlan,
  P1_BKG_T1400_H_Warning_A,
  P1_DTL_T1210_A_Note
} from './phase1'

// 阶段2: 裂痕
import {
  P2_DTL_T1500_TeaOrCoke,
  P2_CORE_T2215_Quarrel,
  P2_BKG_T1730_E_Encounter,
  P2_DTL_T0930_SilentClass,
  P2_FLB_T0000_C_Whisper2,
  P2_BKG_T2300_D_Concern,
  P2_CORE_T1007_DeathMix
} from './phase2'

// 阶段3: 受害者剧本
import {
  P3_CORE_T1100_InterrogationMix,
  P3_BKG_T1325_Gossip,
  P3_BKG_T2000_F_Comfort,
  P3_FLB_T0000_C_Whisper3,
  P3_BKG_T1530_E_Struggle,
  P3_CORE_T1430_D_Confrontation
} from './phase3'

// 阶段4: 破绽
import {
  P4_CORE_T1007_A_DeathReal,
  P4_CORE_T1007_B_Confrontation,
  P4_FLB_T1100_A_Interrogation,
  P4_FLB_T1100_B_Interrogation,
  P4_CORE_T1700_E_WitnessA,
  P4_BKG_T2100_H_Aftermath,
  P4_DTL_T1345_D_Persistence,
  P4_FLB_T0000_C_Whisper4,
  P4_DTL_T0720_MorningMirror
} from './phase4'

// 阶段5: 深渊
import {
  P5_CORE_T1840_E_Accomplice,
  P5_FLB_T0315_Childhood,
  P5_BKG_T1600_C_Monologue,
  P5_BKG_T2030_E_Confession,
  P5_CORE_T1007_MetaAwareness,
  P5_FLB_T2359_FinalJudgement
} from './phase5'

// 阶段6: 继承
import {
  P6_CORE_TNOW_RealTime,
  P6_CORE_TFINAL_Invitation
} from './phase6'

/**
 * 所有剧本片段
 */
export const scriptSegments: ScriptSegment[] = [
  // 特殊片段
  startSegment,
  blankSegment,

  // 测试片段
  TEST_CHOICE,
  TEST_TIMECHOICE,
  TEST_TAGS,
  TEST_COMMAND,
  TEST_COMMAND_2,
  TEST_COMMAND_END,

  // 阶段0: 初始循环
  P0_CORE_T1007_FallBlur,

  // 阶段1: 糖衣
  P1_DTL_T0805_Breakfast,
  P1_BKG_T0830_Gossip,
  P1_DTL_T1230_Lunch,
  P1_BKG_T1620_LibraryStare,
  P1_DTL_T1900_Movie,
  P1_FLB_T0000_C_Whisper1,
  P1_DTL_T2145_GiftPlan,
  P1_BKG_T1400_H_Warning_A,
  P1_DTL_T1210_A_Note,

  // 阶段2: 裂痕
  P2_DTL_T1500_TeaOrCoke,
  P2_CORE_T2215_Quarrel,
  P2_BKG_T1730_E_Encounter,
  P2_DTL_T0930_SilentClass,
  P2_FLB_T0000_C_Whisper2,
  P2_BKG_T2300_D_Concern,
  P2_CORE_T1007_DeathMix,

  // 阶段3: 受害者剧本
  P3_CORE_T1100_InterrogationMix,
  P3_BKG_T1325_Gossip,
  P3_BKG_T2000_F_Comfort,
  P3_FLB_T0000_C_Whisper3,
  P3_BKG_T1530_E_Struggle,
  P3_CORE_T1430_D_Confrontation,

  // 阶段4: 破绽
  P4_CORE_T1007_A_DeathReal,
  P4_CORE_T1007_B_Confrontation,
  P4_FLB_T1100_A_Interrogation,
  P4_FLB_T1100_B_Interrogation,
  P4_CORE_T1700_E_WitnessA,
  P4_BKG_T2100_H_Aftermath,
  P4_DTL_T1345_D_Persistence,
  P4_FLB_T0000_C_Whisper4,
  P4_DTL_T0720_MorningMirror,

  // 阶段5: 深渊
  P5_CORE_T1840_E_Accomplice,
  P5_FLB_T0315_Childhood,
  P5_BKG_T1600_C_Monologue,
  P5_BKG_T2030_E_Confession,
  P5_CORE_T1007_MetaAwareness,
  P5_FLB_T2359_FinalJudgement,

  // 阶段6: 继承
  P6_CORE_TNOW_RealTime,
  P6_CORE_TFINAL_Invitation
]

/**
 * 检查解锁条件
 */
function checkUnlockConditions(
  segment: ScriptSegment,
  unlockedFlags: Set<string>
): boolean {
  if (!segment.unlockFlags || segment.unlockFlags.length === 0) {
    return true
  }

  return segment.unlockFlags.every(flag => unlockedFlags.has(flag))
}

/**
 * 根据时间和条件查找片段
 */
export function findSegment(
  time: string,
  unlockedFlags: Set<string> = new Set(),
  _viewedSegments?: Set<string>
): ScriptSegment | null {
  // 时间匹配
  const timeMatch = scriptSegments.find(
    seg => seg.time === time &&
      checkUnlockConditions(seg, unlockedFlags)
  )
  if (timeMatch) return timeMatch

  // 返回空白片段
  return scriptSegments.find(seg => seg.id === 'BLANK') || null
}

/**
 * 根据片段 ID 查找片段
 */
export function findSegmentById(segmentId: string): ScriptSegment | null {
  return scriptSegments.find(seg => seg.id === segmentId) || null
}

/**
 * 获取所有可用的时间点（用于提示）
 */
export function getAvailableTimes(
  unlockedFlags: Set<string> = new Set()
): string[] {
  const times = new Set<string>()

  scriptSegments.forEach(seg => {
    if (seg.time !== '*' && seg.time !== 'START' && seg.time !== 'META' && checkUnlockConditions(seg, unlockedFlags)) {
      times.add(seg.time)
    }
  })

  return Array.from(times).sort()
}

