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
      text: '我看了看表。{br}十二点一十。'
    },
    {
      type: 'narration',
      text: '教室午休时间。'
    },
    {
      type: 'dialogue',
      character: 'B',
      text: '你来了。{br}正好，我多带了一份。'
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
    },
    {
      type: 'choice',
      choices: [
        {
          text: '问 B 今天还有什么安排',
          lines: [
            {
              type: 'dialogue',
              text: '今天...{delay:1}你还有别的安排吗？'
            },
            {
              type: 'dialogue',
              character: 'B',
              text: '嗯，{bold}下午六点四十{/bold}左右，我要去处理一些东西。{br}不过应该很快就能回来。'
            },
            {
              type: 'dialogue',
              text: '需要我帮忙吗？'
            },
            {
              type: 'dialogue',
              character: 'B',
              text: '不用，我自己可以。{br}你...{delay:1}你照顾好自己就行。'
            },
            {
              type: 'narration',
              text: '她的语气有些奇怪，{br}但我没有追问。'
            }
          ]
        },
        {
          text: '和 D 聊几句',
          lines: [
            {
              type: 'dialogue',
              text: 'D，你今天看起来心情不错。'
            },
            {
              type: 'dialogue',
              character: 'D',
              text: '是啊，今天天气好嘛。{br}对了，你听说了吗？{br}一年前那件事，{br}好像有人提到过，{br}那天早上{bold}八点二十{/bold}左右，{br}好像发生了什么。'
            },
            {
              type: 'dialogue',
              text: '...什么？'
            },
            {
              type: 'dialogue',
              character: 'D',
              text: '我也不太清楚，{br}只是听别人说的。{br}可能是谣言吧。'
            },
            {
              type: 'narration',
              text: '我低下头，{br}没有继续这个话题。'
            }
          ]
        },
        {
          text: '保持沉默',
          lines: [
            {
              type: 'narration',
              text: '我默默地吃着便当，{br}没有说话。{br}B 和 D 继续聊着，{br}但我已经听不进去了。'
            }
          ]
        }
      ]
    },
    {
      type: 'narration',
      text: '午休时间很快过去。{br}铃声响起，{br}大家各自回到座位上。{br}我看了看表，{br}时间还在往前走。'
    }
  ]
}

