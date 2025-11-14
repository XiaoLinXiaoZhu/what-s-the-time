import type { ScriptSegment } from '@/types'

// 特殊片段
import { startSegment } from './start'
import { P09_02 } from './P09-02'

// 保持向后兼容，导出原始 startSegment
export { startSegment }
export { blankSegment } from './blank'

/**
 * 根据当前 loop 获取对应的开头片段
 * @param loop 当前游戏阶段（loop）
 * @returns 对应的开头片段
 */
export function getStartSegment(loop?: string): ScriptSegment {
  // Loop G（meta 终局阶段）使用循环变体
  if (loop === 'G') {
    return P09_02
  }
  
  // 默认返回原始开头片段
  return startSegment
}


// 统一导出所有片段数组
import { blankSegment } from './blank'
import { P00_01 } from './P00-01'
import { P00_02 } from './P00-02'
import { P01_01 } from './P01-01'
import { P01_02 } from './P01-02'
import { P01_03 } from './P01-03'
import { P01_04 } from './P01-04'
import { P01_05 } from './P01-05'
import { P01_06 } from './P01-06'
import { P01_07 } from './P01-07'
import { P01_08 } from './P01-08'
import { P02_01 } from './P02-01'
import { P02_02 } from './P02-02'
import { P02_03 } from './P02-03'
import { P03_01 } from './P03-01'
import { P03_02 } from './P03-02'
import { P03_03 } from './P03-03'
import { P03_04 } from './P03-04'
import { P04_01 } from './P04-01'
import { P04_02 } from './P04-02'
import { P04_03 } from './P04-03'
import { P05_01 } from './P05-01'
import { P05_02 } from './P05-02'
import { P05_03 } from './P05-03'
import { P05_04 } from './P05-04'
import { P05_05 } from './P05-05'
import { P05_06 } from './P05-06'
import { P05_07 } from './P05-07'
import { P05_08 } from './P05-08'
import { P06_01 } from './P06-01'
import { P06_02 } from './P06-02'
import { P06_03 } from './P06-03'
import { P06_04 } from './P06-04'
import { P07_01 } from './P07-01'
import { P07_02 } from './P07-02'
import { P08_01 } from './P08-01'
import { P08_02 } from './P08-02'
import { P08_03 } from './P08-03'
import { P09_01 } from './P09-01'


/**
 * 所有剧本片段
 */
export const scriptSegments: ScriptSegment[] = [
  // 特殊片段
  startSegment,
  blankSegment,
  
  // 阶段 0：A 案前
  P00_01,
  P00_02,
  
  // 阶段 1：A 案酝酿与当日
  P01_01,
  P01_02,
  P01_03,
  P01_04,
  P01_05,
  P01_06,
  P01_07,
  P01_08,
  
  // 阶段 2：A 案后的余波
  P02_01,
  P02_02,
  P02_03,
  
  // 阶段 3：一年后，B 出现与伪日常
  P03_01,
  P03_02,
  P03_03,
  P03_04,
  
  // 阶段 4：B 线酝酿期
  P04_01,
  P04_02,
  P04_03,
  
  // 阶段 5：B 案当天
  P05_01,
  P05_02,
  P05_03,
  P05_04,
  P05_05,
  P05_06,
  P05_07,
  P05_08,
  
  // 阶段 6：B 案后续
  P06_01,
  P06_02,
  P06_03,
  P06_04,
  
  // 阶段 7：E 顶罪 & 现实收束
  P07_01,
  P07_02,
  
  // 阶段 8：主角与 E 的尾声
  P08_01,
  P08_02,
  P08_03,
  
  // 阶段 9：meta 层
  P09_01,
  P09_02,
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

