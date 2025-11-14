import type { ScriptSegment } from '@/types'

/**
 * P04-01：B 第一次认真问"你当我是谁"
 * 真实时间：B 案前一段时间
 * 建议输入：12:10（Phase 2/3 版本）
 */
export const P04_01: ScriptSegment = {
  id: 'P04-01',
  time: '12:10',
  description: 'B 第一次认真问"你当我是谁"',
  loop: 'D',
  unlockFlags: [],
  lines: [
    {
      type: 'narration',
      text: '同样的午餐时间。{br}但这次，只有 B 和主角。'
    },
    {
      type: 'dialogue',
      character: 'B',
      text: '你叫我的时候，到底在叫谁？'
    },
    {
      type: 'dialogue',
      text: '...什么？'
    },
    {
      type: 'dialogue',
      character: 'B',
      text: '我问你，你叫我的时候，到底在叫谁？{br}是我，还是...{delay:1}她？'
    },
    {
      type: 'dialogue',
      text: '我...{delay:1}我不知道你在说什么。'
    },
    {
      type: 'dialogue',
      character: 'B',
      text: '你知道的。{br}你一直都知道。{br}你看着我，但你在看谁？'
    },
    {
      type: 'narration',
      text: '她的声音很平静，但眼神里有痛苦。{br}我知道，她看穿了我。{br}看穿了我把她当成"她"的替代品。'
    },
    {
      type: 'dialogue',
      text: '我...{delay:1}'
    },
    {
      type: 'dialogue',
      character: 'B',
      text: '我不是她。{br}我永远不可能是她。{br}你明白吗？'
    },
    {
      type: 'narration',
      text: '我看着她，说不出话。{br}因为我知道，她说的是对的。{br}但我...{delay:1}但我不能承认。'
    }
  ]
}

