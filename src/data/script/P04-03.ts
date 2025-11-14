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
      type: 'choice',
      choices: [
        {
          text: '询问 E 关于一年前的事',
          lines: [
            {
              type: 'dialogue',
              text: 'E，{delay:1}一年前那件事，{br}你...{delay:1}你知道什么吗？'
            },
            {
              type: 'dialogue',
              character: 'E',
              text: '我...{delay:1}我不知道。{br}我只是...{delay:1}我只是觉得，{br}那件事对你影响太大了。'
            },
            {
              type: 'dialogue',
              text: '是吗...'
            },
            {
              type: 'narration',
              text: '她的眼神闪烁了一下，{br}但很快恢复了平静。{br}我知道，{br}她在隐瞒什么。'
            }
          ]
        },
        {
          text: '谈论 B',
          lines: [
            {
              type: 'dialogue',
              text: 'B 她...{delay:1}她最近好像有点不对劲。'
            },
            {
              type: 'dialogue',
              character: 'E',
              text: '是吗？{br}她...{delay:1}她是个好女孩。{br}你应该...{delay:1}你应该好好对她。'
            },
            {
              type: 'dialogue',
              text: '我知道。'
            },
            {
              type: 'narration',
              text: 'E 的语气有些奇怪，{br}但我没有追问。'
            }
          ]
        },
        {
          text: '保持沉默',
          lines: [
            {
              type: 'narration',
              text: '我们继续走着，{br}但话题已经结束了。{br}我知道，她想帮我。{br}但我也知道，有些东西，是走不出来的。'
            }
          ]
        }
      ]
    },
    {
      type: 'dialogue',
      character: 'E',
      text: '对了，{br}如果...{delay:1}如果有什么事，{br}你可以来找我。{br}晚上{bold}六点一十{/bold}左右，{br}我一般都在。'
    },
    {
      type: 'dialogue',
      text: '谢谢。'
    }
  ]
}

