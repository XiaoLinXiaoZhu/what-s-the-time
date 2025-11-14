import type { ScriptSegment } from '@/types'

/**
 * P00-02：A 第一次说"我们该谈一谈"
 * 真实时间：A 案发生前几天
 * 建议输入：12:10（闪回）
 */
export const P00_02: ScriptSegment = {
  id: 'P00-02',
  time: '12:10',
  description: 'A 第一次说"我们该谈一谈"',
  loop: 'A',
  unlockFlags: [],
  lines: [
    {
      type: 'narration',
      text: '教室午休时间。{br}同学们三三两两聚在一起吃饭、聊天。'
    },
    {
      type: 'dialogue',
      text: '我看了看表。{br}十二点一十。'
    },
    {
      type: 'dialogue',
      character: 'A',
      text: '你又在看时间？{br}最近...{delay:1}你好像总是在看表。'
    },
    {
      type: 'dialogue',
      text: '...有吗？'
    },
    {
      type: 'dialogue',
      character: 'A',
      text: '嗯。{br}感觉你最近...{delay:1}有点累。'
    },
    {
      type: 'dialogue',
      text: '怎么了？'
    },
    {
      type: 'dialogue',
      character: 'A',
      text: '没什么大事。{br}只是...{delay:1}我们找个时间聊聊吧。'
    },
    {
      type: 'dialogue',
      text: '现在就可以聊啊。'
    },
    {
      type: 'dialogue',
      character: 'A',
      text: '不是现在。{br}我是说...{delay:1}找个安静的地方，好好谈谈。'
    },
    {
      type: 'narration',
      text: '她的语气很轻，但我听出了什么。'
    },
    {
      type: 'dialogue',
      text: '好，等你有空的时候。'
    },
    {
      type: 'narration',
      text: '我点点头，装作没注意到她眼中的复杂。{br}她没再说什么，只是低头继续吃饭。{br}午休的铃声很快响起，这个话题就这样被搁置了。'
    }
  ]
}

