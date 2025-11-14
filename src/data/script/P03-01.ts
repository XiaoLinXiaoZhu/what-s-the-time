import type { ScriptSegment } from '@/types'

/**
 * P03-01：08:05 和 B 一起上学（伪恋爱开场）
 * 真实时间：一年后，某普通上学日早晨
 * 建议输入：08:05（Phase 1）
 */
export const P03_01: ScriptSegment = {
  id: 'P03-01',
  time: '08:05',
  description: '和 B 一起上学（伪恋爱开场）',
  loop: 'A',
  unlockFlags: [],
  lines: [
    {
      type: 'narration',
      text: '早晨的上学路。阳光透过树叶洒下来。'
    },
    {
      type: 'dialogue',
      character: 'B',
      text: '一年前那件事，你现在还好吗？'
    },
    {
      type: 'dialogue',
      text: '我点点头，没有回答。'
    },
    {
      type: 'dialogue',
      character: 'B',
      text: '如果...{delay:1}如果你需要人陪，我随时都在。'
    },
    {
      type: 'dialogue',
      text: '谢谢。'
    },
    {
      type: 'narration',
      text: '我们并肩走着，就像...{delay:1}就像以前一样。{br}她的名字，她的声音，都让我想起"她"。{br}但我知道，她们不一样。{br}至少，现在不一样。'
    },
    {
      type: 'dialogue',
      character: 'B',
      text: '今天天气真好。'
    },
    {
      type: 'dialogue',
      text: '是啊。'
    },
    {
      type: 'narration',
      text: '我看着她，阳光照在她脸上。{br}有那么一瞬间，我几乎以为...{br}但我知道，那只是错觉。'
    }
  ]
}

