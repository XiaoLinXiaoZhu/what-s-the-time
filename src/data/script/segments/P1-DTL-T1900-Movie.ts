import type { ScriptSegment } from '@/types'

/**
 * 阶段1: 糖衣 (The Honeymoon)
 * 
 * P1-DTL-T1900-Movie
 * 作用: 强化主角的病态控制。
 * 诡计执行: 【主角自我洗脑】。主角在无意识中，用A的模板覆盖B的现实。
 * 伏笔: 两个女孩喜好的差异，是后期拆分诡计的关键。
 * 给予的线索: 生日 关键词 (B提到下周生日)
 */
export const P1_DTL_T1900_Movie: ScriptSegment = {
  id: 'P1-DTL-T1900-Movie',
  time: '19:00',
  description: '阶段1 - 电影',
  loop: 'P1',
  unlockFlags: ['FLAG_Knows_D_Vaguely'],
  lines: [
    {
      type: 'narration',
      text: '电影院门口，{delay:0.8}霓虹灯在夜色中闪烁。{delay:1}那些灯光，{delay:0.5}像眼睛一样，{delay:0.8}注视着我，{delay:0.5}又与我无关。'
    },
    {
      type: 'dialogue',
      character: '她',
      text: '我想看那部喜剧片，{delay:0.8}听说很好笑。'
    },
    {
      type: 'narration',
      text: '她的声音里有一种期待，{delay:0.8}像孩子一样。{delay:1.5}但我为何要拒绝呢？{delay:1.5}大概是因为……{delay:1}这更适合她吧。'
    },
    {
      type: 'narration',
      text: '我买了票，{delay:0.8}但不是她说的那部。{delay:1.5}我选了一部文艺片，{delay:0.8}一部她从未表达过兴趣的电影。{delay:1.5}'
    },
    {
      type: 'narration',
      text: '我为何要那么做呢？{delay:1.5}大概是因为……{delay:1}这更适合她吧。{delay:1.5}不，{delay:0.8}我是在说服她。{delay:1}用我的方式，{delay:0.8}让她明白什么才是"正确"的选择。'
    },
    {
      type: 'dialogue',
      character: '她',
      text: '……好吧。{delay:1.5}如果你觉得这样更好的话。'
    },
    {
      type: 'narration',
      text: '她顺从了。{delay:1.5}就像我预期的那样。{delay:1}我的谎言像藤蔓一样，{delay:0.8}缠绕住她，{delay:0.5}也缠绕住我自己。'
    },
    {
      type: 'narration',
      text: '（看呐，{delay:0.8}一个多么完美的、{delay:0.5}被自我欺骗包裹的怪物。）'
    },
    {
      type: 'dialogue',
      character: '她',
      text: '对了，{delay:0.8}下周是我生日。'
    },
    {
      type: 'narration',
      text: '生日。{delay:1.5}这个词，{delay:0.8}像一把钥匙，{delay:0.5}打开了某个开关。{delay:1.5}'
    },
    {
      type: 'command',
      command: 'setFlag',
      params: { flag: 'FLAG_Control_Established' }
    }
  ]
}

