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
      type: 'choice',
      choices: [
        {
          text: '承认自己的错误',
          lines: [
            {
              type: 'dialogue',
              text: '我...{delay:1}我知道。{br}我知道你不是她。{br}但我...{delay:1}但我控制不住。'
            },
            {
              type: 'dialogue',
              character: 'B',
              text: '那就试着控制。{br}或者...{delay:1}或者我们暂时分开一段时间。'
            },
            {
              type: 'dialogue',
              text: '不...{delay:1}不要。'
            },
            {
              type: 'narration',
              text: '她的眼神里，{br}有失望，{br}也有决绝。'
            }
          ]
        },
        {
          text: '继续否认',
          lines: [
            {
              type: 'dialogue',
              text: '我真的不知道你在说什么。{br}你就是你，{br}我没有把你当成任何人。'
            },
            {
              type: 'dialogue',
              character: 'B',
              text: '...算了。{br}也许，{br}是我多想了。'
            },
            {
              type: 'narration',
              text: '她低下头，{br}没有再说什么。{br}但我知道，{br}她不相信。'
            }
          ]
        },
        {
          text: '保持沉默',
          lines: [
            {
              type: 'narration',
              text: '我看着她，说不出话。{br}因为我知道，她说的是对的。{br}但我...{delay:1}但我不能承认。'
            },
            {
              type: 'dialogue',
              character: 'B',
              text: '...我明白了。{br}今天{bold}下午三点一十{/bold}，{br}我想和你好好谈谈。{br}在教室。'
            },
            {
              type: 'dialogue',
              text: '...好。'
            }
          ]
        }
      ]
    }
  ]
}

