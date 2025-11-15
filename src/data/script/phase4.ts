import type { ScriptSegment } from '@/types'

/**
 * 阶段4: 破绽 (The Unraveling)
 * 
 * P4-CORE-T1007-A_DeathReal
 * 作用: 【首次拆分诡计】，揭示A案真相，颠覆玩家认知。
 * 进入条件: FLAG_H_Is_Suspect + 辅助信息: 天台
 * 诡计执行: 【X拆分】的决定性时刻。玩家第一次意识到"死亡"的场景是属于一个叫A的女孩。
 * 伏笔: A坠落前说的最后一句话："你根本不爱任何人…"
 */
export const P4_CORE_T1007_A_DeathReal: ScriptSegment = {
  id: 'P4-CORE-T1007-A_DeathReal',
  time: '10:37',
  description: '阶段4 - A案真相',
  loop: 'P4',
  unlockFlags: ['FLAG_H_Is_Suspect'], // 需要"天台"关键词辅助解锁
  lines: [
    {
      type: 'narration',
      text: '【两问一锁】解锁。{delay:1.5}记忆清晰化。'
    },
    {
      type: 'narration',
      text: '10:37。{delay:1}天台。{delay:0.8}'
    },
    {
      type: 'narration',
      text: '我提前在栏杆上做了手脚。{delay:1}那种动作，{delay:0.5}像在排练一场戏。'
    },
    {
      type: 'dialogue',
      text: '我为何要那么做呢？{delay:1}大概是因为……{delay:0.8}我害怕失去吧。'
    },
    {
      type: 'narration',
      text: '不，{delay:0.5}我是在为自己辩解。{delay:1}向一个不存在的法官，{delay:0.5}解释我为何如此。'
    },
    {
      type: 'narration',
      text: '我故意将A的纸条泄露给H。{delay:1}然后，{delay:0.8}与A激烈争吵。'
    },
    {
      type: 'dialogue',
      character: 'A',
      text: '你根本不爱任何人……{delay:1.5}你只是……{delay:0.8}在控制我。'
    },
    {
      type: 'narration',
      text: '她的质问，{delay:0.8}像一把刀，{delay:0.5}刺破了我的伪装。'
    },
    {
      type: 'narration',
      text: '然后——{delay:1.2}H冲上来了。{delay:1}他试图劝架，{delay:0.8}但来不及了。'
    },
    {
      type: 'narration',
      text: '我利用H的身体作为掩护，{delay:1}将A推下。{delay:1.5}'
    },
    {
      type: 'narration',
      text: '模糊的红色。{delay:0.6}像颜料一样，{delay:0.5}在视野里晕开。'
    },
    {
      type: 'dialogue',
      text: '（看呐，{delay:0.5}一个多么完美的、{delay:0.5}被自我欺骗包裹的怪物。）'
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

/**
 * P4-CORE-T1007-B_Confrontation
 * 作用: 揭示B案真相，确认主角是连环作案者。
 * 进入条件: FLAG_D_Is_Investigating + 辅助信息: 可乐
 * 诡计执行: 【X拆分】完成。玩家确认了第二个受害者B的存在。
 * 伏笔: 与A案的"激情"相比，B案的冷静暗示了主角的堕落。
 */
export const P4_CORE_T1007_B_Confrontation: ScriptSegment = {
  id: 'P4-CORE-T1007-B_Confrontation',
  time: '10:37',
  description: '阶段4 - B案真相',
  loop: 'P4',
  unlockFlags: ['FLAG_D_Is_Investigating'], // 需要"可乐"关键词辅助解锁
  lines: [
    {
      type: 'narration',
      text: '【两问一锁】解锁。{delay:1.5}记忆清晰化。'
    },
    {
      type: 'narration',
      text: '10:37。{delay:1}空教室。{delay:0.8}'
    },
    {
      type: 'dialogue',
      character: 'B',
      text: '我不是她的替代品。{delay:1.5}我不是她。'
    },
    {
      type: 'narration',
      text: '她的坚定，{delay:0.8}像一把刀，{delay:0.5}刺破了我的谎言。'
    },
    {
      type: 'dialogue',
      text: '我为何要那么做呢？{delay:1}大概是因为……{delay:0.8}我害怕失去吧。'
    },
    {
      type: 'narration',
      text: '不，{delay:0.5}我是在为自己辩解。{delay:1}向一个不存在的法官，{delay:0.5}解释我为何如此。'
    },
    {
      type: 'narration',
      text: '我在"被抛弃"的恐慌中，{delay:1}模式化地重复了暴力。{delay:1.5}'
    },
    {
      type: 'narration',
      text: '过程留白。{delay:1.5}只留下B倒地后，{delay:0.8}可乐滚落的声音。'
    },
    {
      type: 'narration',
      text: '与A案的"激情"相比，{delay:1}B案的冷静暗示了我的堕落。'
    },
    {
      type: 'narration',
      text: '我冷静地看了一眼手表。{delay:1}18:40。{delay:0.8}'
    },
    {
      type: 'command',
      command: 'setFlag',
      params: { flag: 'FLAG_B_Case_Revealed' }
    },
    {
      type: 'command',
      command: 'setFlag',
      params: { flag: 'FLAG_B_Identified' }
    }
  ]
}

/**
 * P4-FLB-T1100-A_Interrogation
 * 作用: 揭示栽赃过程。
 * 诡计执行: 【主角自我洗脑】。玩家能看到主角在说谎时，连他自己都信了。
 * 伏笔: G警官记录时，笔尖的犹豫。
 */
export const P4_FLB_T1100_A_Interrogation: ScriptSegment = {
  id: 'P4-FLB-T1100-A_Interrogation',
  time: '11:00',
  description: '阶段4 - A案审讯',
  loop: 'P4',
  unlockFlags: ['FLAG_A_Identified'],
  lines: [
    {
      type: 'narration',
      text: '【两问一锁】解锁A案问话。{delay:1.5}'
    },
    {
      type: 'narration',
      text: '警局。{delay:0.8}11:00。{delay:1}'
    },
    {
      type: 'dialogue',
      character: 'G警官',
      text: '请详细描述一下当时的情况。'
    },
    {
      type: 'dialogue',
      text: '我们吵架了。{delay:1}她质问我，{delay:0.8}说我看她的时候，{delay:0.5}到底在看谁。'
    },
    {
      type: 'dialogue',
      text: '然后……{delay:1.5}H冲过来了。{delay:1}他推了她。{delay:0.8}我试图阻止，{delay:0.5}但来不及了。'
    },
    {
      type: 'narration',
      text: '我的表演天衣无缝。{delay:1}通过混合真实（"我们吵架了"）和谎言（"H冲过来推了她"），{delay:0.8}完美地构建了H的罪犯形象。'
    },
    {
      type: 'narration',
      text: '我为何会相信这个谎言呢？{delay:1}大概是因为……{delay:0.8}我太累了吧。'
    },
    {
      type: 'dialogue',
      text: '不，{delay:0.5}我是在为自己辩解。{delay:1}向一个不存在的法官，{delay:0.5}解释我为何如此。'
    },
    {
      type: 'narration',
      text: '玩家能看到我在说谎时，{delay:0.8}连我自己都信了。{delay:1}G警官记录时，{delay:0.5}笔尖的犹豫。'
    },
    {
      type: 'command',
      command: 'setFlag',
      params: { flag: 'FLAG_H_Is_Innocent' }
    }
  ]
}

/**
 * P4-FLB-T1100-B_Interrogation
 * 作用: 展示主角谎言的崩溃。
 * 诡计执行: 【非线性探索】的成果。玩家因为知道了"菠萝包"的秘密，所以能理解主角此刻的窘境。
 * 伏笔: G警官看主角的眼神，从同情变成了怀疑。
 */
export const P4_FLB_T1100_B_Interrogation: ScriptSegment = {
  id: 'P4-FLB-T1100-B_Interrogation',
  time: '11:00',
  description: '阶段4 - B案审讯',
  loop: 'P4',
  unlockFlags: ['FLAG_B_Identified'],
  lines: [
    {
      type: 'narration',
      text: '【两问一锁】解锁B案失踪问话。{delay:1.5}'
    },
    {
      type: 'narration',
      text: '警局。{delay:0.8}11:00。{delay:1}'
    },
    {
      type: 'dialogue',
      character: 'G警官',
      text: '请详细描述一下当时的情况。'
    },
    {
      type: 'dialogue',
      text: '我试图复用上次的剧本，{delay:1}但话语卡在喉咙里。'
    },
    {
      type: 'dialogue',
      character: 'D',
      text: '她给你发了"菠萝包"！{delay:1.5}你到底对她做了什么？！'
    },
    {
      type: 'narration',
      text: '面对D带着"菠萝包"证据的质问，{delay:1}我的说辞漏洞百出。'
    },
    {
      type: 'dialogue',
      text: '我为何要那么做呢？{delay:1}大概是因为……{delay:0.8}我害怕失去吧。'
    },
    {
      type: 'narration',
      text: '不，{delay:0.5}我是在为自己辩解。{delay:1}向一个不存在的法官，{delay:0.5}解释我为何如此。'
    },
    {
      type: 'narration',
      text: 'G警官看我的眼神，{delay:0.8}从同情变成了怀疑。{delay:1}我的谎言，{delay:0.5}像藤蔓一样，{delay:0.5}开始枯萎。'
    },
    {
      type: 'command',
      command: 'setFlag',
      params: { flag: 'FLAG_Script_Failed' }
    }
  ]
}

/**
 * P4-CORE-T1700-E_WitnessA
 * 作用: 确认E是A案的关键证人。
 * 进入条件: FLAG_Knows_E + FLAG_A_Identified + 辅助信息: 栏杆
 * 诡计执行: 【C+E穿插】。E的证人身份被确认。
 * 伏笔: E的负罪感根源。
 */
export const P4_CORE_T1700_E_WitnessA: ScriptSegment = {
  id: 'P4-CORE-T1700-E_WitnessA',
  time: '17:00',
  description: '阶段4 - E的证词',
  loop: 'P4',
  unlockFlags: ['FLAG_Knows_E', 'FLAG_A_Identified'], // 需要"栏杆"关键词辅助解锁
  lines: [
    {
      type: 'narration',
      text: 'E的视角。{delay:1}A案发生前。'
    },
    {
      type: 'narration',
      text: '她因为暗恋而跟踪我，{delay:1}在天台角落，{delay:0.8}清晰地看到我在栏杆上做手脚。'
    },
    {
      type: 'dialogue',
      character: 'E',
      text: '我看到了……{delay:1.5}他在……{delay:0.8}他在破坏栏杆。'
    },
    {
      type: 'narration',
      text: '她因恐惧而逃跑，{delay:1}说服自己"只是恶作剧"。'
    },
    {
      type: 'dialogue',
      character: 'E',
      text: '不，{delay:0.8}一定是错觉。{delay:1}他那么好的人……'
    },
    {
      type: 'narration',
      text: '她的自我欺骗，{delay:0.8}像藤蔓一样，{delay:0.5}缠绕住她，{delay:0.5}也缠绕住真相。'
    },
    {
      type: 'narration',
      text: 'E的证人身份被确认。{delay:1}她的负罪感根源。'
    },
    {
      type: 'command',
      command: 'setFlag',
      params: { flag: 'FLAG_E_Is_Witness_A' }
    }
  ]
}

/**
 * P4-BKG-T2100-H_Aftermath
 * 作用: 展现替罪羊的悲惨处境。
 */
export const P4_BKG_T2100_H_Aftermath: ScriptSegment = {
  id: 'P4-BKG-T2100-H_Aftermath',
  time: '21:00',
  description: '阶段4 - H的后果',
  loop: 'P4',
  unlockFlags: ['FLAG_H_Is_Innocent'],
  lines: [
    {
      type: 'narration',
      text: '非主角视角。{delay:1}H在被停学后，{delay:0.8}独自坐在公园长椅上。'
    },
    {
      type: 'narration',
      text: '他反复看A曾送给他的书，{delay:1}神情痛苦而茫然。'
    },
    {
      type: 'narration',
      text: '替罪羊的悲惨处境。{delay:1.5}我的谎言，{delay:0.5}像藤蔓一样，{delay:0.5}缠绕住他，{delay:0.5}也缠绕住真相。'
    }
  ]
}

/**
 * P4-DTL-T1345-D_Persistence
 * 作用: 展现D的坚持和友情。
 * 伏笔: B的日记成为最终的铁证。
 */
export const P4_DTL_T1345_D_Persistence: ScriptSegment = {
  id: 'P4-DTL-T1345-D_Persistence',
  time: '13:45',
  description: '阶段4 - D的坚持',
  loop: 'P4',
  unlockFlags: ['FLAG_D_Is_Investigating'],
  lines: [
    {
      type: 'narration',
      text: '非主角视角。{delay:1}D在整理B的遗物时，{delay:0.8}发现了B的日记。'
    },
    {
      type: 'narration',
      text: '里面记录了她对我的怀疑和不安。{delay:1.5}'
    },
    {
      type: 'dialogue',
      character: 'B的日记',
      text: '他看着我，{delay:0.8}但眼神却像在看另一个人。{delay:1}我害怕。'
    },
    {
      type: 'narration',
      text: 'D的坚持和友情。{delay:1}B的日记成为最终的铁证。'
    }
  ]
}

/**
 * P4-FLB-T0000-C_Whisper4
 * 作用: 展现主角内心的合理化机制。
 * 伏笔: C已经从"理想"彻底变成了"魔鬼"。
 */
export const P4_FLB_T0000_C_Whisper4: ScriptSegment = {
  id: 'P4-FLB-T0000-C_Whisper4',
  time: '*', // 在阶段4任意核心片段后随机触发
  description: '阶段4 - C的低语4',
  loop: 'P4',
  unlockFlags: ['FLAG_Protagonist_Is_Killer'],
  lines: [
    {
      type: 'narration',
      text: '纯白空间。{delay:1}没有边界，{delay:0.5}没有声音，{delay:0.8}只有一片虚无。'
    },
    {
      type: 'narration',
      text: '然后，{delay:1.2}一个声音。{delay:0.8}冰冷的、{delay:0.5}残酷的声音。'
    },
    {
      type: 'dialogue',
      character: '她',
      text: '她们不理解。{delay:1.5}她们的离开是一种背叛。{delay:1.5}背叛者，{delay:0.8}必须被清除。'
    },
    {
      type: 'narration',
      text: '声音消失了。{delay:1.5}纯白空间褪去，{delay:0.8}我又回到了现实。'
    },
    {
      type: 'dialogue',
      text: '我为何会相信这个声音呢？{delay:1}大概是因为……{delay:0.8}我太累了吧。'
    },
    {
      type: 'narration',
      text: '不，{delay:0.5}我是在为自己辩解。{delay:1}向一个不存在的法官，{delay:0.5}解释我为何如此。'
    },
    {
      type: 'narration',
      text: 'C已经从"理想"彻底变成了"魔鬼"。{delay:1.5}'
    }
  ]
}

/**
 * P4-DTL-T0720-MorningMirror
 * 作用: 展示主角在犯罪后的日常。
 * 伏笔: 他的人格已经完全工具化。
 */
export const P4_DTL_T0720_MorningMirror: ScriptSegment = {
  id: 'P4-DTL-T0720-MorningMirror',
  time: '07:20',
  description: '阶段4 - 早晨的镜子',
  loop: 'P4',
  unlockFlags: ['FLAG_B_Case_Revealed'],
  lines: [
    {
      type: 'narration',
      text: 'B案发生后的某个清晨。{delay:1}07:20。{delay:0.8}'
    },
    {
      type: 'narration',
      text: '我在镜子前整理仪表，{delay:1}练习着悲伤的表情，{delay:0.8}就像演员上台前一样。'
    },
    {
      type: 'dialogue',
      text: '我为何要那么做呢？{delay:1}大概是因为……{delay:0.8}我害怕失去吧。'
    },
    {
      type: 'narration',
      text: '不，{delay:0.5}我是在为自己辩解。{delay:1}向一个不存在的法官，{delay:0.5}解释我为何如此。'
    },
    {
      type: 'narration',
      text: '我的人格已经完全工具化。{delay:1.5}'
    }
  ]
}

