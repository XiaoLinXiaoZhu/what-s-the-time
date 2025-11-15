import type { ScriptSegment } from '@/types'

/**
 * 阶段2: 裂痕 (The Crack)
 * 
 * P2-DTL-T1500-TeaOrCoke
 * 作用: 强烈的矛盾点，迫使玩家开始质疑。
 * 诡计执行: 【非线性线索】+【X拆分】。这是A和B喜好的直接冲突，是玩家第一次拿到的、无法忽视的铁证。
 * 伏笔: 这些物品将成为后期解锁"两问一锁"的钥匙。
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
      text: '下午三点。{delay:0.8}我买了热茶，{delay:0.5}递给她。'
    },
    {
      type: 'dialogue',
      character: '她',
      text: '……茶？{delay:1}我不是一直喜欢喝可乐吗？'
    },
    {
      type: 'narration',
      text: '她的困惑，{delay:0.8}像一把刀，{delay:0.5}刺破了我的谎言。'
    },
    {
      type: 'dialogue',
      text: '我为何会感到恐慌呢？{delay:1}大概是因为……{delay:0.8}我害怕失去吧。'
    },
    {
      type: 'dialogue',
      text: '不，{delay:0.5}我是在为自己辩解。{delay:1}向一个不存在的法官，{delay:0.5}解释我为何如此。'
    },
    {
      type: 'narration',
      text: '一种类似恐惧的、{delay:0.5}沉重的东西，{delay:0.8}在我的胸口盘踞。'
    },
    {
      type: 'dialogue',
      text: '我试图解释，{delay:0.8}但话语卡在喉咙里。{delay:1}我的谎言像藤蔓一样，{delay:0.5}缠绕住我，{delay:0.5}也缠绕住她。'
    },
    {
      type: 'command',
      command: 'setFlag',
      params: { flag: 'FLAG_Identity_Contradiction' }
    }
  ]
}

/**
 * P2-CORE-T2215-Quarrel
 * 作用: "虚构恋爱史"的转折点。
 * 诡计执行: 【X合一】。这是B的觉醒，但玩家会把它理解为"X"对主角日益增强的控制欲的反抗，并将其与A的约谈动机联系起来。
 * 伏笔: B已经察觉到10:37这个时间对主角的特殊意义。
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
      text: '晚上十点十五分。{delay:1}房间里只有我们两个人。'
    },
    {
      type: 'dialogue',
      character: '她',
      text: '你看着我的时候，{delay:1.2}到底在看谁？'
    },
    {
      type: 'narration',
      text: '她的质问，{delay:0.8}像一把刀，{delay:0.5}刺破了我的伪装。'
    },
    {
      type: 'dialogue',
      text: '我为何要搪塞呢？{delay:1}大概是因为……{delay:0.8}我害怕失去吧。'
    },
    {
      type: 'dialogue',
      text: '不，{delay:0.5}我是在为自己辩解。{delay:1}向一个不存在的法官，{delay:0.5}解释我为何如此。'
    },
    {
      type: 'dialogue',
      character: '她',
      text: '明天上午，{delay:0.8}在那个永远不变的时间，{delay:1}我们必须说清楚。{delay:1.5}10:37。'
    },
    {
      type: 'narration',
      text: '10:37。{delay:1.5}这个时间，{delay:0.5}像诅咒一样，{delay:0.8}缠绕住我。'
    },
    {
      type: 'dialogue',
      text: '（看呐，{delay:0.5}一个多么完美的、{delay:0.5}被时间困住的怪物。）'
    },
    {
      type: 'command',
      command: 'setFlag',
      params: { flag: 'FLAG_Talk_Is_Coming' }
    }
  ]
}

/**
 * P2-BKG-T1730-E_Encounter
 * 作用: 引入E，增加不安感。
 * 诡计执行: 【C+E穿插】。E的出现，让"她"的身份更加扑朔迷离。
 * 伏笔: E知道一些事情。
 */
export const P2_BKG_T1730_E_Encounter: ScriptSegment = {
  id: 'P2-BKG-T1730-E_Encounter',
  time: '17:30',
  description: '阶段2 - E的相遇',
  loop: 'P2',
  unlockFlags: ['FLAG_Talk_Is_Coming'],
  lines: [
    {
      type: 'narration',
      text: '下午五点半。{delay:0.8}我在校园里心烦意乱地走着。'
    },
    {
      type: 'narration',
      text: '一个女生走过，{delay:0.8}看了我一眼。{delay:1}眼神复杂，{delay:0.5}似乎想说什么，{delay:0.8}但又没说。'
    },
    {
      type: 'narration',
      text: '我停下脚步，{delay:0.8}试图想起她的名字。{delay:1}E……{delay:0.5}是E吗？'
    },
    {
      type: 'dialogue',
      text: '我为何会感到不安呢？{delay:1}大概是因为……{delay:0.8}她的眼神里有什么东西，{delay:0.5}让我感到恐惧。'
    },
    {
      type: 'narration',
      text: '她走远了。{delay:1}但那种眼神，{delay:0.5}像烙印一样，{delay:0.8}留在了我的记忆里。'
    },
    {
      type: 'command',
      command: 'setFlag',
      params: { flag: 'FLAG_Knows_E' }
    }
  ]
}

/**
 * P2-DTL-T0930-SilentClass
 * 作用: 强化暴风雨前的宁静。
 * 诡计执行: 【主角自我洗脑】。他的内心戏全是如何"赢回"她，而不是反思自己的问题。
 * 伏笔: 他所谓的"谈谈"，是又一次的"控制"。
 */
export const P2_DTL_T0930_SilentClass: ScriptSegment = {
  id: 'P2-DTL-T0930-SilentClass',
  time: '09:30',
  description: '阶段2 - 沉默的课堂',
  loop: 'P2',
  unlockFlags: ['FLAG_Talk_Is_Coming'],
  lines: [
    {
      type: 'narration',
      text: '上午九点半。{delay:0.8}约谈前的课上，{delay:0.5}气氛冰冷。'
    },
    {
      type: 'narration',
      text: '我坐在座位上，{delay:0.8}内心在预演即将到来的谈话。{delay:1}思考如何"让她回心转意"。'
    },
    {
      type: 'dialogue',
      text: '我为何要那么做呢？{delay:1}大概是因为……{delay:0.8}我害怕失去吧。'
    },
    {
      type: 'dialogue',
      text: '不，{delay:0.5}我是在为自己辩解。{delay:1}向一个不存在的法官，{delay:0.5}解释我为何如此。'
    },
    {
      type: 'narration',
      text: '我的内心戏全是如何"赢回"她，{delay:0.8}而不是反思自己的问题。{delay:1}我所谓的"谈谈"，{delay:0.5}是又一次的"控制"。'
    },
    {
      type: 'dialogue',
      text: '（看呐，{delay:0.5}一个多么完美的、{delay:0.5}被自我欺骗包裹的怪物。）'
    }
  ]
}

/**
 * P2-FLB-T0000-C_Whisper2
 * 作用: 强化主角的内在动机。
 * 诡计执行: 【C+E穿插】。
 * 伏笔: 主角的暴力行为有了内在的"许可"。
 */
export const P2_FLB_T0000_C_Whisper2: ScriptSegment = {
  id: 'P2-FLB-T0000-C_Whisper2',
  time: '*', // 在阶段2任意核心片段后随机触发
  description: '阶段2 - C的低语2',
  loop: 'P2',
  unlockFlags: ['FLAG_Talk_Is_Coming'],
  lines: [
    {
      type: 'narration',
      text: '纯白空间。{delay:1}没有边界，{delay:0.5}没有声音，{delay:0.8}只有一片虚无。'
    },
    {
      type: 'narration',
      text: '然后，{delay:1.2}一个声音。{delay:0.8}严厉的、{delay:0.5}冰冷的声音。'
    },
    {
      type: 'dialogue',
      character: '她',
      text: '不能有瑕疵。{delay:1.5}任何不完美的东西，{delay:1}都必须被修正。'
    },
    {
      type: 'narration',
      text: '声音消失了。{delay:1.5}纯白空间褪去，{delay:0.8}我又回到了现实。'
    },
    {
      type: 'dialogue',
      text: '我为何会听到这个声音呢？{delay:1}大概是因为……{delay:0.8}我太累了吧。'
    },
    {
      type: 'narration',
      text: '不，{delay:0.5}我是在为自己辩解。{delay:1}向一个不存在的法官，{delay:0.5}解释我为何如此。'
    }
  ]
}

/**
 * P2-BKG-T2300-D_Concern
 * 作用: 展现D的视角，提供外部线索。
 * 诡计执行: 【非线性探索】。首次引入非主角视角，打破叙事常规。
 * 伏笔: "菠萝包"成为D后期质疑主角的关键证据。
 */
export const P2_BKG_T2300_D_Concern: ScriptSegment = {
  id: 'P2-BKG-T2300-D_Concern',
  time: '23:00',
  description: '阶段2 - D的担忧',
  loop: 'P2',
  unlockFlags: ['FLAG_Knows_D_Vaguely'],
  lines: [
    {
      type: 'narration',
      text: '一段不属于我的记忆。{delay:1}可能是她的日记，{delay:0.5}或者手机信息。'
    },
    {
      type: 'dialogue',
      character: 'D',
      text: '你真的要去和他谈吗？{delay:1}我总觉得他不对劲。'
    },
    {
      type: 'narration',
      text: '这是D的声音。{delay:1}她的朋友，{delay:0.5}那个我一直试图忽略的人。'
    },
    {
      type: 'dialogue',
      character: '她',
      text: '放心，{delay:0.8}如果不对劲，{delay:0.5}我会给你发"菠萝包"的。'
    },
    {
      type: 'narration',
      text: '"菠萝包"。{delay:1.5}一个暗号，{delay:0.5}一个求救信号。'
    },
    {
      type: 'narration',
      text: '我为何会看到这个呢？{delay:1}大概是因为……{delay:0.8}我太累了吧。'
    },
    {
      type: 'dialogue',
      text: '不，{delay:0.5}我是在为自己辩解。{delay:1}向一个不存在的法官，{delay:0.5}解释我为何如此。'
    },
    {
      type: 'command',
      command: 'setFlag',
      params: { flag: 'FLAG_D_Is_Concerned' }
    }
  ]
}

/**
 * P2-CORE-T1007-DeathMix
 * 作用: 【阶段3的入口】"虚构恋爱史"的终结。
 * 诡计执行: 所有诡计的集大成。
 * 伏笔: 声音和画面的错位是最大的破绽。
 */
export const P2_CORE_T1007_DeathMix: ScriptSegment = {
  id: 'P2-CORE-T1007-DeathMix',
  time: '10:37',
  description: '阶段2 - 死亡混合',
  loop: 'P2',
  unlockFlags: ['FLAG_Talk_Is_Coming'],
  lines: [
    {
      type: 'narration',
      text: '10:37。{delay:1.5}'
    },
    {
      type: 'narration',
      text: '风声。{delay:0.8}尖锐的、{delay:0.5}撕裂空气的风声。'
    },
    {
      type: 'dialogue',
      character: '她',
      text: '{red}我不是她！{/red}{delay:1.5}我不是她！'
    },
    {
      type: 'narration',
      text: '她的质问，{delay:0.8}像一把刀，{delay:0.5}刺破了我的谎言。'
    },
    {
      type: 'narration',
      text: '然后——{delay:1.2}'
    },
    {
      type: 'narration',
      text: '模糊的红色。{delay:0.6}像颜料一样，{delay:0.5}在视野里晕开。'
    },
    {
      type: 'narration',
      text: 'H冲上来的身影。{delay:1}他的表情，{delay:0.5}像在挣扎。'
    },
    {
      type: 'narration',
      text: '声音和画面错位。{delay:1.5}我试图抓住什么，{delay:0.8}但只有虚无。'
    },
    {
      type: 'narration',
      text: '警笛声。{delay:1}11:00。{delay:0.8}一切都结束了。'
    }
  ]
}

