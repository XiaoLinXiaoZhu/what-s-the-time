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

