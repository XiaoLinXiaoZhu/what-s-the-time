import type { ScriptSegment } from '@/types'

/**
 * 阶段4: 破绽 (The Unraveling)
 * 
 * P4-CORE-T1037-A_DeathReal
 * 作用: 【首次拆分诡计】，揭示A案真相，颠覆玩家认知。
 * 进入条件: FLAG_H_Is_Suspect + 辅助信息: 天台
 * 诡计执行: 【X拆分】的决定性时刻。玩家第一次意识到"死亡"的场景是属于一个叫A的女孩。
 * 伏笔: A坠落前说的最后一句话："你根本不爱任何人…"
 */
export const P4_CORE_T1037_A_DeathReal: ScriptSegment = {
  id: 'P4-CORE-T1037-A_DeathReal',
  time: '10:37',
  description: '阶段4 - A案真相',
  loop: 'P4',
  unlockFlags: ['FLAG_H_Is_Suspect'], // 需要"天台"关键词辅助解锁
  lines: [
    {
      type: 'narration',
      text: '【两问一锁】解锁。{delay:2}记忆清晰化。{delay:1.5}'
    },
    {
      type: 'narration',
      text: '10:37。{delay:1.5}天台。{delay:1}'
    },
    {
      type: 'narration',
      text: '我提前在栏杆上做了手脚。{delay:1.5}那种动作，{delay:0.8}像在排练一场戏。{delay:1.5}'
    },
    {
      type: 'narration',
      text: '我为何要那么做呢？{delay:1.5}大概是因为……{delay:1}我害怕失去吧。{delay:1.5}'
    },
    {
      type: 'narration',
      text: '不，{delay:0.8}我是在为自己辩解。{delay:1.5}向一个不存在的法官，{delay:0.8}解释我为何如此。'
    },
    {
      type: 'narration',
      text: '我故意将A的纸条泄露给H。{delay:1.5}然后，{delay:1}与A激烈争吵。{delay:1.5}'
    },
    {
      type: 'dialogue',
      character: 'A',
      text: '你根本不爱任何人……{delay:2}你只是……{delay:1}在控制我。'
    },
    {
      type: 'narration',
      text: '她的质问，{delay:0.8}像一把刀，{delay:0.5}刺破了我的伪装。{delay:1.5}'
    },
    {
      type: 'narration',
      text: '然后——{delay:1.5}H冲上来了。{delay:1.5}他试图劝架，{delay:0.8}但来不及了。{delay:1.5}'
    },
    {
      type: 'narration',
      text: '我利用H的身体作为掩护，{delay:1.5}将A推下。{delay:2}'
    },
    {
      type: 'narration',
      text: '模糊的红色。{delay:0.8}像颜料一样，{delay:0.5}在视野里晕开，{delay:0.8}蔓延，{delay:0.5}吞噬一切。{delay:1.5}'
    },
    {
      type: 'narration',
      text: '（看呐，{delay:0.8}一个多么完美的、{delay:0.5}被自我欺骗包裹的怪物。）'
    },
    {
      type: 'command',
      command: 'setFlag',
      params: { flag: 'FLAG_Protagonist_Is_Killer' }
    },
    {
      type: 'command',
      command: 'setFlag',
      params: { flag: 'FLAG_A_Identified' }
    }
  ]
}

