import type { ScriptSegment } from '@/types'

/**
 * 阶段2: 裂痕 (The Crack)
 * 
 * P2-CORE-T2215-Quarrel
 * 作用: "虚构恋爱史"的转折点。
 * 诡计执行: 【X合一】。这是B的觉醒，但玩家会把它理解为"X"对主角日益增强的控制欲的反抗，并将其与A的约谈动机联系起来。
 * 伏笔: B已经察觉到10:37这个时间对主角的特殊意义。
 * 给予的线索: 10:37 (B说"明天上午，在那个永远不变的时间，我们必须说清楚")
 */
export const P2_CORE_T2215_Quarrel: ScriptSegment = {
  id: 'P2-CORE-T2215-Quarrel',
  time: '22:15',
  description: '阶段2 - 争吵',
  loop: 'P2',
  unlockFlags: ['FLAG_Relationship_Established'],
  lines: [
    {
      type: 'narration',
      text: '晚上十点十五分。{delay:1.5}房间里只有我们两个人。{delay:1}'
    },
    {
      type: 'narration',
      text: '某种沉重的、{delay:0.8}压抑的东西，{delay:0.5}在空气中弥漫。{delay:1.5}我看着她，{delay:0.8}试图从她的表情里读出什么，{delay:0.5}但只有模糊。'
    },
    {
      type: 'dialogue',
      character: '她',
      text: '你看着我的时候，{delay:1.5}到底在看谁？'
    },
    {
      type: 'narration',
      text: '她的质问，{delay:0.8}像一把刀，{delay:0.5}刺破了我的伪装。{delay:1.5}'
    },
    {
      type: 'narration',
      text: '我为何要搪塞呢？{delay:1.5}大概是因为……{delay:1}我害怕失去吧。{delay:1.5}'
    },
    {
      type: 'narration',
      text: '不，{delay:0.8}我是在为自己辩解。{delay:1.5}向一个不存在的法官，{delay:0.8}解释我为何如此。'
    },
    {
      type: 'dialogue',
      character: '她',
      text: '明天上午，{delay:1}在那个永远不变的时间，{delay:1.5}我们必须说清楚。{delay:2}10:37。'
    },
    {
      type: 'narration',
      text: '10:37。{delay:2}这个时间，{delay:0.8}像诅咒一样，{delay:0.5}缠绕住我。{delay:1.5}'
    },
    {
      type: 'narration',
      text: '（看呐，{delay:0.8}一个多么完美的、{delay:0.5}被时间困住的怪物。）'
    },
    {
      type: 'command',
      command: 'setFlag',
      params: { flag: 'FLAG_Talk_Is_Coming' }
    }
  ]
}

