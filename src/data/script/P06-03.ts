import type { ScriptSegment } from '@/types'

/**
 * P06-03：11:00 问话（新案 B 失踪）
 * 真实时间：B 失踪后不久
 * 建议输入：11:00 + 第二问（13:00 等）
 * 
 * 设计说明：
 * - G 用几乎和旧案一样的话问主角，场景构图相似，让玩家感受"重复审判"的味道
 * - 语言中同时提"你当年也经历过那件事吧""你是她最后见到的人之一"，旧案与新案在语言层面缝合
 * - 让玩家分不清，到底在问哪一次
 */
export const P06_03: ScriptSegment = {
  id: 'P06-03',
  time: '11:00',
  description: '11:00 问话（新案 B 失踪）',
  loop: 'B',
  unlockFlags: ['loop_a_complete'],
  lines: [
    {
      type: 'narration',
      text: '办公室。{br}警官 G 坐在我对面。'
    },
    {
      type: 'dialogue',
      character: 'G',
      text: '你当年也经历过那件事吧。'
    },
    {
      type: 'dialogue',
      text: '...嗯。'
    },
    {
      type: 'dialogue',
      character: 'G',
      text: '你是她最后见到的人之一。'
    },
    {
      type: 'dialogue',
      text: '...是。'
    },
    {
      type: 'narration',
      text: '同样的房间，{br}同样的位置，{br}同样的问题。{br}就像，{br}时间又回到了那一年。'
    },
    {
      type: 'dialogue',
      character: 'G',
      text: '那天发生了什么？'
    },
    {
      type: 'dialogue',
      text: '我们...{delay:1}我们约好见面。{br}但她没来。'
    },
    {
      type: 'dialogue',
      character: 'G',
      text: '你确定？'
    },
    {
      type: 'dialogue',
      text: '...确定。'
    },
    {
      type: 'narration',
      text: '他问的是"她"，{br}但没说，{br}是哪一个"她"。{br}是那一年，{br}还是现在？{br}我分不清。{br}也许，{br}他也分不清。'
    }
  ]
}

