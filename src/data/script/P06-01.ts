import type { ScriptSegment } from '@/types'

/**
 * P06-01：08:05 空路·B 消失
 * 真实时间：B 失踪后的某个早晨
 * 建议输入：08:05（Phase 2 版本）
 */
export const P06_01: ScriptSegment = {
  id: 'P06-01',
  time: '08:05',
  description: '空路·B 消失',
  loop: 'B',
  unlockFlags: ['loop_a_complete'],
  lines: [
    {
      type: 'narration',
      text: '空荡荡的路。B 不在。'
    },
    {
      type: 'dialogue',
      character: 'D',
      text: '她怎么没来？'
    },
    {
      type: 'dialogue',
      text: '...我不知道。'
    },
    {
      type: 'dialogue',
      character: 'D',
      text: '她昨天还说要一起上学的。'
    },
    {
      type: 'dialogue',
      text: '也许...{delay:1}也许她有事。'
    },
    {
      type: 'narration',
      text: '路人的话全部围绕"她怎么没来"。{br}D 的情绪不对，{br}我知道，她在担心。{br}我也在担心，{br}但原因不同。'
    },
    {
      type: 'narration',
      text: '和 P03-01 对照，{br}同样的时间，{br}同样的路，{br}但 B 不在了。{br}就像，{br}从来没有存在过。'
    }
  ]
}

