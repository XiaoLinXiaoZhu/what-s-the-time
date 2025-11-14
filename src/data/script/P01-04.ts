import type { ScriptSegment } from '@/types'

/**
 * P01-04：10:07 A 被推下（真相版）
 * 真实时间：Day A 10:07
 * 建议输入：10:07 + 第二问 08:20
 */
export const P01_04: ScriptSegment = {
  id: 'P01-04',
  time: '10:07',
  description: 'A 被推下（使用时间匹配分支）',
  loop: 'D',
  unlockFlags: [],
  lines: [
    {
      type: 'narration',
      text: '楼顶。模糊的记忆。'
    },
    {
      type: 'dialogue',
      text: '我需要更清楚地回忆...'
    },
    {
      type: 'timeChoice',
      choices: [
        {
          time: '08:20',
          setFlag: 'saw_p01_01_detail',
          lines: [
            {
              type: 'narration',
              text: '楼顶。清晰的记忆。'
            },
            {
              type: 'dialogue',
              character: 'A',
              text: '我们分手吧。'
            },
            {
              type: 'dialogue',
              text: '什么？'
            },
            {
              type: 'dialogue',
              character: 'A',
              text: '我说，我们分手吧。{br}我不能再这样下去了。'
            },
            {
              type: 'dialogue',
              text: '为什么？'
            },
            {
              type: 'dialogue',
              character: 'A',
              text: '你知道为什么。{br}你一直都知道。'
            },
            {
              type: 'narration',
              text: '她的声音很平静，但眼神里有决绝。{br}我知道，她说的是真的。{br}如果她离开，她会说出一切。'
            },
            {
              type: 'dialogue',
              text: '不...{delay:1}你不能——'
            },
            {
              type: 'dialogue',
              character: 'A',
              text: '我必须。'
            },
            {
              type: 'narration',
              text: '她转身要走。{br}我伸出手，想拉住她——{br}想让她停下来，想让她改变主意。'
            },
            {
              type: 'narration',
              text: '我抓住她的手腕。{br}她挣扎了一下。{br}然后，我...{delay:1}有意识地，多推了一点点。'
            },
            {
              type: 'narration',
              text: '她失去平衡，向后倒去。{br}栏杆很低。{br}她翻了过去。'
            },
            {
              type: 'dialogue',
              text: '不——'
            },
            {
              type: 'narration',
              text: '但已经来不及了。{br}她掉了下去。{br}我站在原地，看着空荡荡的栏杆。{br}表盘上，指针停在 10:07。'
            }
          ]
        },
        {
          time: '*',
          lines: [
            {
              type: 'narration',
              text: '记忆依然模糊。'
            },
            {
              type: 'dialogue',
              text: '我想不起来了...'
            },
            {
              type: 'narration',
              text: '那些细节，像被水冲淡的墨迹。{br}我只知道，她掉下去了。{br}而我，没能拉住她。'
            }
          ]
        }
      ]
    }
  ]
}

