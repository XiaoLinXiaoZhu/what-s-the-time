import type { ScriptSegment } from '@/types'

/**
 * 阶段2: 裂痕 (The Crack)
 * 
 * P2-DTL-T1500-TeaOrCoke
 * 作用: 强烈的矛盾点，迫使玩家开始质疑。
 * 诡计执行: 【非线性线索】+【X拆分】。这是A和B喜好的直接冲突，是玩家第一次拿到的、无法忽视的铁证。
 * 伏笔: 这些物品将成为后期解锁"两问一锁"的钥匙。
 * 给予的线索: 可乐 关键词, 茶 关键词
 */
export const P2_DTL_T1500_TeaOrCoke: ScriptSegment = {
  id: 'P2-DTL-T1500-TeaOrCoke',
  time: '15:00',
  description: '阶段2 - 茶或可乐',
  loop: 'P2',
  unlockFlags: ['FLAG_Relationship_Established'],
  lines: [
    {
      type: 'narration',
      text: '下午三点。{delay:1}'
    },
    {
      type: 'narration',
      text: '我买了热茶，{delay:0.8}递给她。{delay:1.5}那种动作，{delay:0.5}像在排练一场戏。{delay:1}我扮演着"体贴的男友"，{delay:0.8}她扮演着"顺从的女友"。'
    },
    {
      type: 'dialogue',
      character: '她',
      text: '……茶？{delay:1.5}我不是一直喜欢喝可乐吗？'
    },
    {
      type: 'narration',
      text: '她的困惑，{delay:0.8}像一把刀，{delay:0.5}刺破了我的谎言。{delay:1.5}'
    },
    {
      type: 'narration',
      text: '我为何会感到恐慌呢？{delay:1.5}大概是因为……{delay:1}我害怕失去吧。{delay:1.5}'
    },
    {
      type: 'narration',
      text: '不，{delay:0.8}我是在为自己辩解。{delay:1.5}向一个不存在的法官，{delay:0.8}解释我为何如此。'
    },
    {
      type: 'narration',
      text: '一种类似恐惧的、{delay:0.8}沉重的东西，{delay:0.5}在我的胸口盘踞。{delay:1.5}'
    },
    {
      type: 'narration',
      text: '我试图解释，{delay:0.8}但话语卡在喉咙里。{delay:1.5}我的谎言像藤蔓一样，{delay:0.8}缠绕住我，{delay:0.5}也缠绕住她。'
    },
    {
      type: 'narration',
      text: '可乐。{delay:1}茶。{delay:1.5}'
    },
    {
      type: 'command',
      command: 'setFlag',
      params: { flag: 'FLAG_Identity_Contradiction' }
    }
  ]
}

