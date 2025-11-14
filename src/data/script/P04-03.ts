import type { ScriptSegment } from '@/types'

/**
 * P04-03：E 试图"带主角走出来"的一次相处
 * 真实时间：B 案前一段时间
 * 建议输入：18:10
 */
export const P04_03: ScriptSegment = {
  id: 'P04-03',
  time: '18:10',
  description: 'E 试图"带主角走出来"的一次相处',
  loop: 'D',
  unlockFlags: [],
  lines: [
    {
      type: 'narration',
      text: '放学后。{br}E 找主角一起走路。'
    },
    {
      type: 'dialogue',
      character: 'E',
      text: '今天天气真好。'
    },
    {
      type: 'dialogue',
      text: '嗯。'
    },
    {
      type: 'dialogue',
      character: 'E',
      text: '你...{delay:1}最近还好吗？'
    },
    {
      type: 'dialogue',
      text: '还好。'
    },
    {
      type: 'dialogue',
      character: 'E',
      text: '那件事，已经过去一年了。{br}你应该...{delay:1}试着走出来。'
    },
    {
      type: 'dialogue',
      text: '我知道。'
    },
    {
      type: 'narration',
      text: 'E 试图把话题从"她"引开，{br}但说着说着，又绕了回去。{br}她的眼神很复杂，{br}有同情，有担心，还有...{delay:1}还有什么？'
    },
    {
      type: 'dialogue',
      character: 'E',
      text: '如果你需要人陪，我随时都在。'
    },
    {
      type: 'dialogue',
      text: '谢谢。'
    },
    {
      type: 'narration',
      text: '我们继续走着，{br}但话题已经结束了。{br}我知道，她想帮我。{br}但我也知道，有些东西，是走不出来的。'
    }
  ]
}

