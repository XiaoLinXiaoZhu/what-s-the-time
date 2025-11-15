import type { ScriptSegment } from '@/types'

/**
 * 阶段3: 受害者剧本 (The Victim's Script)
 * 
 * P3-CORE-T1100-InterrogationMix
 * 作用: 确立主角的"受害者"身份和H的"嫌疑人"身份。
 * 诡计执行: 【主角自我洗脑】+【人物混淆】。
 * 伏笔: 老师F的过度保护。
 */
export const P3_CORE_T1100_InterrogationMix: ScriptSegment = {
  id: 'P3-CORE-T1100-InterrogationMix',
  time: '11:00',
  description: '阶段3 - 审讯混合',
  loop: 'P3',
  unlockFlags: [], // P2-CORE-T1007-DeathMix 后自动进入
  lines: [
    {
      type: 'narration',
      text: '警局。{delay:0.8}11:00。{delay:1}'
    },
    {
      type: 'narration',
      text: '我坐在审讯室里，{delay:0.8}对面是G警官。{delay:1}他的眼神，{delay:0.5}像在审视一个受害者。'
    },
    {
      type: 'dialogue',
      character: 'G警官',
      text: '请详细描述一下当时的情况。'
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
      type: 'dialogue',
      text: '（看呐，{delay:0.5}一个多么完美的、{delay:0.5}被自我欺骗包裹的怪物。）'
    },
    {
      type: 'dialogue',
      character: 'G警官',
      text: 'H……{delay:0.8}是那个叫H的学生吗？'
    },
    {
      type: 'command',
      command: 'setFlag',
      params: { flag: 'FLAG_H_Is_Suspect' }
    }
  ]
}

/**
 * P3-BKG-T1325-Gossip
 * 作用: 利用舆论强化H的负面形象。
 * 伏笔: E的沉默。
 */
export const P3_BKG_T1325_Gossip: ScriptSegment = {
  id: 'P3-BKG-T1325-Gossip',
  time: '13:25',
  description: '阶段3 - 流言',
  loop: 'P3',
  unlockFlags: ['FLAG_H_Is_Suspect'],
  lines: [
    {
      type: 'narration',
      text: '下午一点二十五分。{delay:0.8}同学们在议论H。'
    },
    {
      type: 'dialogue',
      character: '学生A',
      text: '他脾气暴躁，{delay:0.5}早就看X不爽了。'
    },
    {
      type: 'dialogue',
      character: '学生B',
      text: '是啊，{delay:0.5}听说他之前就威胁过她。'
    },
    {
      type: 'narration',
      text: '一个女生(E)在旁边，{delay:0.8}欲言又止。{delay:1}她的眼神，{delay:0.5}像在挣扎。'
    },
    {
      type: 'narration',
      text: '我为何会注意到她呢？{delay:1}大概是因为……{delay:0.8}她的沉默，{delay:0.5}让我感到不安。'
    },
    {
      type: 'command',
      command: 'setFlag',
      params: { flag: 'FLAG_Knows_E' }
    }
  ]
}

/**
 * P3-BKG-T2000-F_Comfort
 * 作用: 塑造F老师，代表"体制的盲点"。
 * 伏笔: F的善意成了主角的保护伞。
 */
export const P3_BKG_T2000_F_Comfort: ScriptSegment = {
  id: 'P3-BKG-T2000-F_Comfort',
  time: '20:00',
  description: '阶段3 - F的安慰',
  loop: 'P3',
  unlockFlags: ['FLAG_H_Is_Suspect'],
  lines: [
    {
      type: 'narration',
      text: '晚上八点。{delay:0.8}F老师打电话来。'
    },
    {
      type: 'dialogue',
      character: 'F老师',
      text: '你还好吗？{delay:1}相信学校，{delay:0.8}我们会处理好这件事的。'
    },
    {
      type: 'dialogue',
      text: '我为何会感到安心呢？{delay:1}大概是因为……{delay:0.8}他的善意，{delay:0.5}成了我的保护伞。'
    },
    {
      type: 'narration',
      text: '我挂掉电话，{delay:0.8}失眠到深夜。{delay:1}03:15。{delay:0.8}时间像诅咒一样，{delay:0.5}缠绕住我。'
    }
  ]
}

/**
 * P3-FLB-T0000-C_Whisper3
 * 作用: 将主角的罪行合理化。
 * 诡计执行: 【C+E穿插】+【主角自我洗脑】。
 * 伏笔: 主角的心理防线彻底建立。
 */
export const P3_FLB_T0000_C_Whisper3: ScriptSegment = {
  id: 'P3-FLB-T0000-C_Whisper3',
  time: '*', // 在阶段3任意核心片段后随机触发
  description: '阶段3 - C的低语3',
  loop: 'P3',
  unlockFlags: ['FLAG_H_Is_Suspect'],
  lines: [
    {
      type: 'narration',
      text: '纯白空间。{delay:1}没有边界，{delay:0.5}没有声音，{delay:0.8}只有一片虚无。'
    },
    {
      type: 'narration',
      text: '然后，{delay:1.2}一个声音。{delay:0.8}冰冷的、{delay:0.5}诱人的声音。'
    },
    {
      type: 'dialogue',
      character: '她',
      text: '是他的错。{delay:1.5}是他污染了你。{delay:1}你是为了保护我，{delay:0.8}才不得不这么做的。{delay:1.5}你是无罪的。'
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
    }
  ]
}

/**
 * P3-BKG-T1530-E_Struggle
 * 作用: 展现E的内心挣扎。
 * 诡计执行: 【C+E穿插】。
 * 伏笔: E的负罪感根源。
 */
export const P3_BKG_T1530_E_Struggle: ScriptSegment = {
  id: 'P3-BKG-T1530-E_Struggle',
  time: '15:30',
  description: '阶段3 - E的挣扎',
  loop: 'P3',
  unlockFlags: ['FLAG_Knows_E'],
  lines: [
    {
      type: 'narration',
      text: 'E的视角。{delay:1}她在日记里写道：'
    },
    {
      type: 'dialogue',
      character: 'E',
      text: '我好像看到了什么……{delay:1.5}不，{delay:0.8}一定是错觉。{delay:1}他那么好的人……'
    },
    {
      type: 'narration',
      text: '她的自我欺骗，{delay:0.8}像藤蔓一样，{delay:0.5}缠绕住她，{delay:0.5}也缠绕住真相。'
    },
    {
      type: 'narration',
      text: '栏杆。{delay:1}那个词，{delay:0.5}像烙印一样，{delay:0.8}留在了她的记忆里。'
    }
  ]
}

/**
 * P3-CORE-T1430-D_Confrontation
 * 作用: 首次出现强烈的外部质疑，开启破绽。
 * 诡计执行: 【非线性探索】。D的质问与主流的"H是凶手"叙事形成强烈冲突。
 * 伏笔: 玩家第一次意识到，"失踪"和"死亡"可能是两件事。
 */
export const P3_CORE_T1430_D_Confrontation: ScriptSegment = {
  id: 'P3-CORE-T1430-D_Confrontation',
  time: '14:30',
  description: '阶段3 - D的对峙',
  loop: 'P3',
  unlockFlags: ['FLAG_H_Is_Suspect'],
  lines: [
    {
      type: 'narration',
      text: 'B失踪后。{delay:1}D在走廊拦住我。'
    },
    {
      type: 'dialogue',
      character: 'D',
      text: '{red}她给你发了"菠萝包"！{/red}{delay:1.5}你到底对她做了什么？！'
    },
    {
      type: 'narration',
      text: '她的愤怒，{delay:0.8}像一把刀，{delay:0.5}刺破了我的谎言。'
    },
    {
      type: 'dialogue',
      text: '我一脸茫然地否认。{delay:1}"菠萝包"？{delay:0.8}我不知道你在说什么。'
    },
    {
      type: 'narration',
      text: '我为何要那么做呢？{delay:1}大概是因为……{delay:0.8}我害怕失去吧。'
    },
    {
      type: 'dialogue',
      text: '不，{delay:0.5}我是在为自己辩解。{delay:1}向一个不存在的法官，{delay:0.5}解释我为何如此。'
    },
    {
      type: 'narration',
      text: 'D的质问与主流的"H是凶手"叙事形成强烈冲突。{delay:1.5}玩家第一次意识到，{delay:0.8}"失踪"和"死亡"可能是两件事。'
    },
    {
      type: 'command',
      command: 'setFlag',
      params: { flag: 'FLAG_D_Is_Investigating' }
    }
  ]
}

