import type { ScriptSegment } from '@/types'

// 特殊片段
import { startSegment } from './start/start'

// 保持向后兼容，导出原始 startSegment
export { startSegment }
export { blankSegment } from './blank'

// 导入所有阶段的开场片段
import { startP0Segment } from './start/start-p0'
import { startP1Segment } from './start/start-p1'
import { startP2Segment } from './start/start-p2'
import { startP3Segment } from './start/start-p3'
import { startP4Segment } from './start/start-p4'
import { startP5Segment } from './start/start-p5'
import { startP6Segment } from './start/start-p6'

/**
 * 根据当前 loop 获取对应的开头片段
 * @param loop 当前游戏阶段（loop）
 * @returns 对应的开头片段
 */
export function getStartSegment(loop?: string): ScriptSegment {
  // 根据不同的loop返回对应的开场片段
  switch (loop) {
    case 'P0':
      return startP0Segment
    case 'P1':
      return startP1Segment
    case 'P2':
      return startP2Segment
    case 'P3':
      return startP3Segment
    case 'P4':
      return startP4Segment
    case 'P5':
      return startP5Segment
    case 'P6':
      return startP6Segment
    default:
      // 默认返回原始开头片段
      return startSegment
  }
}


// 统一导出所有片段数组
import { blankSegment } from './blank'
import { TEST_CHOICE } from './sample/TEST-CHOICE'
import { TEST_TIMECHOICE } from './sample/TEST-TIMECHOICE'
import { TEST_TAGS } from './sample/TEST-TAGS'
import { TEST_COMMAND, TEST_COMMAND_2, TEST_COMMAND_END } from './sample/TEST-COMMAND'

// 阶段0: 初始循环
import { P0_CORE_T1037_FallBlur } from './segments/P0-CORE-T1037-FallBlur'

// 阶段1: 糖衣
// import { P1_DTL_T0805_Breakfast } from './segments/P1-DTL-T0805-Breakfast'
// import { P1_BKG_T0830_Gossip } from './segments/P1-BKG-T0830-Gossip'
// import { P1_DTL_T1230_Lunch } from './segments/P1-DTL-T1230-Lunch'
// import { P1_BKG_T1620_LibraryStare } from './segments/P1-BKG-T1620-LibraryStare'
// import { P1_DTL_T1900_Movie } from './segments/P1-DTL-T1900-Movie'
// import { P1_FLB_T0000_C_Whisper1 } from './segments/P1-FLB-T0000-C_Whisper1'
// import { P1_DTL_T2145_GiftPlan } from './segments/P1-DTL-T2145-GiftPlan'
// import { P1_BKG_T1400_H_Warning_A } from './segments/P1-BKG-T1400-H_Warning_A'
// import { P1_DTL_T1210_A_Note } from './segments/P1-DTL-T1210-A_Note'

// 阶段2: 裂痕
import { P2_DTL_T1500_TeaOrCoke } from './segments/P2-DTL-T1500-TeaOrCoke'
import { P2_CORE_T2215_Quarrel } from './segments/P2-CORE-T2215-Quarrel'
import { P2_BKG_T1730_E_Encounter } from './segments/P2-BKG-T1730-E_Encounter'
import { P2_DTL_T0930_SilentClass } from './segments/P2-DTL-T0930-SilentClass'
import { P2_FLB_T0000_C_Whisper2 } from './segments/P2-FLB-T0000-C_Whisper2'
import { P2_BKG_T2300_D_Concern } from './segments/P2-BKG-T2300-D_Concern'
import { P2_CORE_T1037_DeathMix } from './segments/P2-CORE-T1037-DeathMix'

// 阶段3: 受害者剧本
import { P3_CORE_T1100_InterrogationMix } from './segments/P3-CORE-T1100-InterrogationMix'
import { P3_BKG_T1325_Gossip } from './segments/P3-BKG-T1325-Gossip'
import { P3_BKG_T2000_F_Comfort } from './segments/P3-BKG-T2000-F_Comfort'
import { P3_FLB_T0000_C_Whisper3 } from './segments/P3-FLB-T0000-C_Whisper3'
import { P3_BKG_T1530_E_Struggle } from './segments/P3-BKG-T1530-E_Struggle'
import { P3_CORE_T1430_D_Confrontation } from './segments/P3-CORE-T1430-D_Confrontation'

// 阶段4: 破绽
import { P4_CORE_T1037_A_DeathReal } from './segments/P4-CORE-T1037-A_DeathReal'
import { P4_CORE_T1037_B_Confrontation } from './segments/P4-CORE-T1037-B_Confrontation'
import { P4_FLB_T1100_A_Interrogation } from './segments/P4-FLB-T1100-A_Interrogation'
import { P4_FLB_T1100_B_Interrogation } from './segments/P4-FLB-T1100-B_Interrogation'
import { P4_CORE_T1700_E_WitnessA } from './segments/P4-CORE-T1700-E_WitnessA'
import { P4_BKG_T2100_H_Aftermath } from './segments/P4-BKG-T2100-H_Aftermath'
import { P4_DTL_T1345_D_Persistence } from './segments/P4-DTL-T1345-D_Persistence'
import { P4_FLB_T0000_C_Whisper4 } from './segments/P4-FLB-T0000-C_Whisper4'
import { P4_DTL_T0720_MorningMirror } from './segments/P4-DTL-T0720-MorningMirror'

// 阶段5: 深渊
import { P5_CORE_T1840_E_Accomplice } from './segments/P5-CORE-T1840-E_Accomplice'
import { P5_FLB_T0315_Childhood } from './segments/P5-FLB-T0315-Childhood'
import { P5_BKG_T1600_C_Monologue } from './segments/P5-BKG-T1600-C_Monologue'
import { P5_BKG_T2030_E_Confession } from './segments/P5-BKG-T2030-E_Confession'
import { P5_CORE_T1037_MetaAwareness } from './segments/P5-CORE-T1037-MetaAwareness'
import { P5_FLB_T2359_FinalJudgement } from './segments/P5-FLB-T2359-FinalJudgement'

// 阶段6: 继承
import { P6_CORE_TNOW_RealTime } from './segments/P6-CORE-TNOW-RealTime'
import { P6_CORE_TFINAL_Invitation } from './segments/P6-CORE-TFINAL-Invitation'

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
  P0_CORE_T1037_FallBlur,

  // 阶段1: 糖衣
  // P1_DTL_T0805_Breakfast,
  // P1_BKG_T0830_Gossip,
  // P1_DTL_T1230_Lunch,
  // P1_BKG_T1620_LibraryStare,
  // P1_DTL_T1900_Movie,
  // P1_FLB_T0000_C_Whisper1,
  // P1_DTL_T2145_GiftPlan,
  // P1_BKG_T1400_H_Warning_A,
  // P1_DTL_T1210_A_Note,

  // 阶段2: 裂痕
  P2_DTL_T1500_TeaOrCoke,
  P2_CORE_T2215_Quarrel,
  P2_BKG_T1730_E_Encounter,
  P2_DTL_T0930_SilentClass,
  P2_FLB_T0000_C_Whisper2,
  P2_BKG_T2300_D_Concern,
  P2_CORE_T1037_DeathMix,

  // 阶段3: 受害者剧本
  P3_CORE_T1100_InterrogationMix,
  P3_BKG_T1325_Gossip,
  P3_BKG_T2000_F_Comfort,
  P3_FLB_T0000_C_Whisper3,
  P3_BKG_T1530_E_Struggle,
  P3_CORE_T1430_D_Confrontation,

  // 阶段4: 破绽
  P4_CORE_T1037_A_DeathReal,
  P4_CORE_T1037_B_Confrontation,
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
  P5_CORE_T1037_MetaAwareness,
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

