import type { ScriptSegment } from '@/types'

/**
 * P03-04：23:15 夜间独白·软版本
 * 真实时间：现在线某晚
 * 建议输入：23:15（Phase 1）
 */
export const P03_04: ScriptSegment = {
  id: 'P03-04',
  time: '23:15',
  description: '夜间独白·软版本',
  loop: 'A',
  unlockFlags: [],
  lines: [
    {
      type: 'narration',
      text: '我抬起手腕，看表。'
    },
    {
      type: 'dialogue',
      text: '二十三点...{delay:1}二十三点一十五。'
    },
    {
      type: 'narration',
      text: '夜晚。我躺在床上。'
    },
    {
      type: 'dialogue',
      text: '时间过得真快...{delay:1}真慢...{delay:1}时间是...'
    },
    {
      type: 'narration',
      text: '话停住了。'
    },
    {
      type: 'dialogue',
      text: '时间是...{delay:1}什么？'
    },
    {
      type: 'narration',
      text: '我没有说下去。{br}有些问题，不需要答案。{br}有些时间，不需要记住。'
    },
    {
      type: 'choice',
      choices: [
        {
          text: '回想今天发生的事',
          lines: [
            {
              type: 'narration',
              text: '今天...{delay:1}今天发生了什么？{br}早上{bold}八点零五{/bold}，{br}和 B 一起上学。{br}中午{bold}十二点一十{/bold}，{br}在教室吃便当。{br}傍晚{bold}六点四十{/bold}，{br}处理了一些东西。{br}现在，{bold}十一点一十五{/bold}。'
            },
            {
              type: 'dialogue',
              text: '时间...{delay:1}时间过得真快。'
            }
          ]
        },
        {
          text: '思考明天要做什么',
          lines: [
            {
              type: 'narration',
              text: '明天...{br}明天还要继续。{br}同样的时间，{br}同样的路，{br}同样的日常。'
            },
            {
              type: 'dialogue',
              text: '明天，{bold}早上八点零五{/bold}，{br}还要和 B 一起上学。'
            }
          ]
        },
        {
          text: '什么都不想',
          lines: [
            {
              type: 'narration',
              text: '我闭上眼睛，{br}什么都不想。{br}让时间，{br}就这样过去。'
            }
          ]
        }
      ]
    }
  ]
}

