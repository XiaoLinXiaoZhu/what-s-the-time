import type { ScriptSegment } from '@/types'

/**
 * P03-02：12:10 教室午餐·B & D & E 同场
 * 真实时间：同一天中午
 * 建议输入：12:10（Phase 1）
 */
export const P03_02: ScriptSegment = {
  id: 'P03-02',
  time: '12:10',
  description: '教室午餐·B & D & E 同场',
  loop: 'A',
  unlockFlags: [],
  lines: [
    {
      type: 'narration',
      text: '教室午休时间。'
    },
    {
      type: 'dialogue',
      character: 'B',
      text: '给你，我多带了一份。'
    },
    {
      type: 'dialogue',
      text: '谢谢。'
    },
    {
      type: 'dialogue',
      character: 'D',
      text: '你们很配嘛。'
    },
    {
      type: 'dialogue',
      character: 'B',
      text: '别乱说。'
    },
    {
      type: 'narration',
      text: 'E 路过门口，多看了我一眼。{br}她的眼神很复杂，但我读不懂。'
    },
    {
      type: 'narration',
      text: 'B 把便当盒推到我面前。{br}D 在旁边笑着打趣。{br}一切看起来，都很正常。{br}就像普通的校园日常。'
    }
  ]
}

