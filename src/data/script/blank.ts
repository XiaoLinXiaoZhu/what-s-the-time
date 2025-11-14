import type { ScriptSegment } from '@/types'

/**
 * 记忆空白片段（用于未匹配的时间）
 */
export const blankSegment: ScriptSegment = {
  id: 'BLANK',
  time: '*',
  description: '记忆空白',
  loop: '*',
  unlockFlags: [],
  lines: [
    {
      type: 'narration',
      text: '那段时间对我来说，就是一片黑。'
    },
    {
      type: 'dialogue',
      text: '我不想想得太清楚。'
    }
  ]
}

