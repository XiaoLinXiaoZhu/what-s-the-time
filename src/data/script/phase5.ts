import type { ScriptSegment } from '@/types'

/**
 * 阶段5: 深渊 (The Abyss)
 * 
 * P5-CORE-T1840-E_Accomplice
 * 作用: 故事的又一重大转折，揭示共犯的存在。
 * 诡计执行: 【C+E穿插】的终极反转。E主动成为了C在现实的代行者。
 * 伏笔: E的爱是毁灭性的。
 */
export const P5_CORE_T1840_E_Accomplice: ScriptSegment = {
  id: 'P5-CORE-T1840-E_Accomplice',
  time: '18:40',
  description: '阶段5 - E的共犯',
  loop: 'P5',
  unlockFlags: ['FLAG_E_Is_Witness_A', 'FLAG_B_Case_Revealed'],
  lines: [
    {
      type: 'narration',
      text: 'B案当晚。{delay:1}我正在处理现场。{delay:0.8}'
    },
    {
      type: 'narration',
      text: '然后，{delay:1.2}E出现了。{delay:1}'
    },
    {
      type: 'narration',
      text: '她在极度挣扎，{delay:0.8}手机屏幕亮起，{delay:0.5}显示报警电话。{delay:1.5}'
    },
    {
      type: 'narration',
      text: '然后，{delay:1.2}她走向我，{delay:0.8}轻声说：'
    },
    {
      type: 'dialogue',
      character: 'E',
      text: '她太吵了。{delay:1.5}我来帮你让她安静。'
    },
    {
      type: 'narration',
      text: '她戴上了手套，{delay:1}并说出"叫她C"的宣言。'
    },
    {
      type: 'dialogue',
      character: 'E',
      text: '叫她C。{delay:1.5}从今以后，{delay:0.8}她就是C。'
    },
    {
      type: 'narration',
      text: 'E主动成为了C在现实的代行者。{delay:1.5}她的爱是毁灭性的。'
    },
    {
      type: 'command',
      command: 'setFlag',
      params: { flag: 'FLAG_E_Is_Accomplice' }
    }
  ]
}

/**
 * P5-FLB-T0315-Childhood
 * 作用: 揭示主角动机的根源。
 * 伏笔: -
 */
export const P5_FLB_T0315_Childhood: ScriptSegment = {
  id: 'P5-FLB-T0315-Childhood',
  time: '03:15',
  description: '阶段5 - 童年',
  loop: 'P5',
  unlockFlags: ['FLAG_Protagonist_Is_Killer'],
  lines: [
    {
      type: 'narration',
      text: '破碎的童年记忆。{delay:1.5}'
    },
    {
      type: 'narration',
      text: '黑暗的房间。{delay:1}父母的争吵。{delay:0.8}被粗暴推入并锁门。'
    },
    {
      type: 'dialogue',
      text: '只有绝对的安静，{delay:1.5}才是安全的。{delay:1.5}只有完全的控制，{delay:1}才能阻止离别。'
    },
    {
      type: 'narration',
      text: '我为何会变成这样呢？{delay:1}大概是因为……{delay:0.8}我太累了吧。'
    },
    {
      type: 'dialogue',
      text: '不，{delay:0.5}我是在为自己辩解。{delay:1}向一个不存在的法官，{delay:0.5}解释我为何如此。'
    },
    {
      type: 'command',
      command: 'setFlag',
      params: { flag: 'FLAG_Motive_Root_Revealed' }
    }
  ]
}

/**
 * P5-BKG-T1600-C_Monologue
 * 作用: 揭示主角的终极理想，为Meta结局铺垫。
 * 伏笔: Meta环节的直接引导。
 */
export const P5_BKG_T1600_C_Monologue: ScriptSegment = {
  id: 'P5-BKG-T1600-C_Monologue',
  time: '16:00',
  description: '阶段5 - C的独白',
  loop: 'P5',
  unlockFlags: ['FLAG_E_Is_Accomplice'],
  lines: [
    {
      type: 'narration',
      text: '纯白空间。{delay:1}没有边界，{delay:0.5}没有声音，{delay:0.8}只有一片虚无。'
    },
    {
      type: 'narration',
      text: '然后，{delay:1.2}一个声音。{delay:0.8}完美的、{delay:0.5}顺从的声音。'
    },
    {
      type: 'dialogue',
      character: 'C',
      text: '我是完美的。{delay:1.5}我是顺从的。{delay:1}我永远理解你。'
    },
    {
      type: 'narration',
      text: '这是我一切罪行的终点——{delay:1.5}创造并守护这个只属于我的"完美"。'
    },
    {
      type: 'dialogue',
      character: 'C',
      text: '但"现在"呢？{delay:1.5}你完成了这一切，{delay:1}可"现在"是什么时间？'
    },
    {
      type: 'narration',
      text: '声音消失了。{delay:1.5}纯白空间褪去，{delay:0.8}我又回到了现实。'
    },
    {
      type: 'command',
      command: 'setFlag',
      params: { flag: 'FLAG_Truth_Completed' }
    }
  ]
}

/**
 * P5-BKG-T2030-E_Confession
 * 作用: 展示E的扭曲心理。
 */
export const P5_BKG_T2030_E_Confession: ScriptSegment = {
  id: 'P5-BKG-T2030-E_Confession',
  time: '20:30',
  description: '阶段5 - E的告白',
  loop: 'P5',
  unlockFlags: ['FLAG_E_Is_Accomplice'],
  lines: [
    {
      type: 'narration',
      text: 'E的视角。{delay:1}在帮主角处理完一切后，{delay:0.8}她在日记里写道：'
    },
    {
      type: 'dialogue',
      character: 'E',
      text: '现在，{delay:0.8}我们是同一种人了。{delay:1.5}只有我能理解他。{delay:1.5}我就是他的C。'
    },
    {
      type: 'narration',
      text: '她的扭曲心理，{delay:0.8}像藤蔓一样，{delay:0.5}缠绕住她，{delay:0.5}也缠绕住真相。'
    }
  ]
}

/**
 * P5-CORE-T1007-MetaAwareness
 * 作用: 打破第四面墙的预备阶段。
 * 进入条件: FLAG_Truth_Completed (在此阶段反复输入10:37)
 * 伏笔: 主角开始将责任转移给玩家。
 */
export const P5_CORE_T1007_MetaAwareness: ScriptSegment = {
  id: 'P5-CORE-T1007-MetaAwareness',
  time: '10:37',
  description: '阶段5 - Meta觉醒',
  loop: 'P5',
  unlockFlags: ['FLAG_Truth_Completed'],
  lines: [
    {
      type: 'narration',
      text: '我不再播放记忆，{delay:1}而是直接对屏幕说话。{delay:1.5}'
    },
    {
      type: 'dialogue',
      text: '又是你。{delay:1.5}你很喜欢看这个，{delay:0.8}对吗？{delay:1.5}一遍又一遍。{delay:1.5}你和我一样，{delay:1}都被困在了这里。'
    },
    {
      type: 'narration',
      text: '我开始将责任转移给玩家。{delay:1.5}'
    },
    {
      type: 'command',
      command: 'setFlag',
      params: { flag: 'FLAG_Meta_Bridge_Built' }
    }
  ]
}

/**
 * P5-FLB-T2359-FinalJudgement
 * 作用: 展示故事的现实结局。
 * 伏笔: 现实世界的尘埃落定，但精神世界的审判才刚开始。
 */
export const P5_FLB_T2359_FinalJudgement: ScriptSegment = {
  id: 'P5-FLB-T2359-FinalJudgement',
  time: '23:59',
  description: '阶段5 - 最终审判',
  loop: 'P5',
  unlockFlags: ['FLAG_Truth_Completed'],
  lines: [
    {
      type: 'narration',
      text: '结尾新闻播报的文字片段。{delay:1.5}'
    },
    {
      type: 'dialogue',
      character: '新闻',
      text: '校园连环命案告破，{delay:1}嫌疑人已被逮捕。{delay:1.5}据知情人透露，{delay:0.8}另一位同学提供的关键证据起到了重要作用。'
    },
    {
      type: 'narration',
      text: '现实世界的尘埃落定，{delay:1}但精神世界的审判才刚开始。{delay:1.5}'
    }
  ]
}

