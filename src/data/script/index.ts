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

