import type { ScriptSegment } from '@/types'

/**
 * 阶段1: 糖衣 (The Honeymoon)
 * 
 * P1-DTL-T0805-Breakfast
 * 作用: 建立"虚构恋爱史"的开端；情感绑定。
 * 诡计执行: 【X合一】。这是B的真实日常，但玩家会将其视为"X恋爱史"的起点。
 * 伏笔: 她笑容中的疲惫。
 */
export const P1_DTL_T0805_Breakfast: ScriptSegment = {
  id: 'P1-DTL-T0805-Breakfast',
  time: '08:05',
  description: '阶段1 - 早餐',
  loop: 'P1',
  unlockFlags: ['FLAG_Game_Start'],
  lines: [
    {
      type: 'narration',
      text: '早晨八点零五分。{delay:0.8}阳光从教室的窗户斜射进来，在桌面上投下斑驳的光影。'
    },
    {
      type: 'narration',
      text: '她站在我面前，手里拿着书包，眼神里有一种我读不懂的东西。{delay:1}或许是疲惫？'
    },
    {
      type: 'dialogue',
      character: '她',
      text: '听说学校门口新开了一家包子店，{delay:0.5}我想去试试。'
    },
    {
      type: 'dialogue',
      text: '我为何要拒绝呢？{delay:0.8}大概是因为……{delay:1}对她胃不好吧。'
    },
    {
      type: 'dialogue',
      text: '不，{delay:0.5}旁人看来或许很奇怪吧。{delay:0.8}但我只是……{delay:1}关心她。'
    },
    {
      type: 'dialogue',
      text: '我买了三明治，递给她。'
    },
    {
      type: 'dialogue',
      character: '她',
      text: '……好吧。{delay:0.8}谢谢你。'
    },
    {
      type: 'narration',
      text: '她顺从地笑了。{delay:1}那种笑容，像一块冰，被我死死攥在手心。'
    },
    {
      type: 'dialogue',
      character: '她',
      text: '中午在老地方见。'
    },
    {
      type: 'command',
      command: 'setFlag',
      params: { flag: 'FLAG_Knows_B_Persona' }
    }
  ]
}

/**
 * P1-BKG-T0830-Gossip
 * 作用: 铺垫H的负面形象。
 * 诡计执行: 【人物混淆】。在H正式登场前，用偏见给他贴上标签。
 * 伏笔: 社会偏见是主角最强大的武器。
 */
export const P1_BKG_T0830_Gossip: ScriptSegment = {
  id: 'P1-BKG-T0830-Gossip',
  time: '08:30',
  description: '阶段1 - 流言',
  loop: 'P1',
  unlockFlags: ['FLAG_Knows_B_Persona'],
  lines: [
    {
      type: 'narration',
      text: '我们走后，走廊里传来窃窃私语。'
    },
    {
      type: 'dialogue',
      character: '学生A',
      text: '你听说了吗？{delay:0.5}那个叫H的家伙……'
    },
    {
      type: 'dialogue',
      character: '学生B',
      text: '嗯，{delay:0.3}脾气差得要命。{delay:0.8}像个疯狗一样。'
    },
    {
      type: 'dialogue',
      character: '学生A',
      text: '是啊，{delay:0.5}真不知道为什么会有人愿意接近他。'
    },
    {
      type: 'narration',
      text: '我停下脚步，{delay:0.5}没有回头。{delay:1}这些声音，像藤蔓一样缠绕住我的记忆。'
    },
    {
      type: 'dialogue',
      text: '（看呐，{delay:0.5}一个多么完美的、{delay:0.5}被社会偏见标记的怪物。）'
    },
    {
      type: 'dialogue',
      character: '学生B',
      text: '下午图书馆总能看到他，{delay:0.5}一个人坐在角落里。'
    },
    {
      type: 'command',
      command: 'setFlag',
      params: { flag: 'FLAG_H_Reputation_Bad' }
    }
  ]
}

/**
 * P1-DTL-T1230-Lunch
 * 作用: 引入D，强化日常感。
 * 诡计执行: 【人物混淆】。D被模糊成一个无名的、功能性的"朋友"角色。
 * 伏笔: 主角的控制欲延申到对恋人社交圈的排斥。
 */
export const P1_DTL_T1230_Lunch: ScriptSegment = {
  id: 'P1-DTL-T1230-Lunch',
  time: '12:30',
  description: '阶段1 - 午餐',
  loop: 'P1',
  unlockFlags: ['FLAG_Knows_B_Persona'],
  lines: [
    {
      type: 'narration',
      text: '食堂里人声嘈杂。{delay:0.8}她坐在我对面，小口地吃着三明治。'
    },
    {
      type: 'dialogue',
      character: '朋友',
      text: '嘿，{delay:0.3}你们在这里啊！'
    },
    {
      type: 'narration',
      text: '一个女生走过来，{delay:0.5}熟稔地拍了拍她的肩膀。{delay:1}我礼貌地点头，{delay:0.5}但内心涌起一种类似厌恶的、{delay:0.5}沉重的东西。'
    },
    {
      type: 'dialogue',
      text: '她侵入了我们的二人世界。{delay:1}这种想法，{delay:0.5}旁人看来或许很奇怪吧。{delay:0.8}但我只是……{delay:1}想要保护属于我们的空间。'
    },
    {
      type: 'dialogue',
      character: '朋友',
      text: '晚上电影别迟到哦！'
    },
    {
      type: 'narration',
      text: '她笑着应了一声。{delay:1}我看着她们，{delay:0.8}一种疏离感将我包裹。'
    },
    {
      type: 'dialogue',
      text: '（普通人）在这种时候，{delay:0.5}似乎应该会感到开心吧。{delay:1}但我一滴喜悦也流不出来。'
    },
    {
      type: 'command',
      command: 'setFlag',
      params: { flag: 'FLAG_Knows_D_Vaguely' }
    }
  ]
}

/**
 * P1-BKG-T1620-LibraryStare
 * 作用: 建立主角对H的敌意。
 * 诡计执行: 【X合一】。这里被注视的其实是A，但玩家会无缝代入成B，认为H在觊觎自己的"女友"。
 * 伏笔: 主角的嫉妒和敌意是真实的，但对象被他自己混淆了。
 */
export const P1_BKG_T1620_LibraryStare: ScriptSegment = {
  id: 'P1-BKG-T1620-LibraryStare',
  time: '16:20',
  description: '阶段1 - 图书馆注视',
  loop: 'P1',
  unlockFlags: ['FLAG_H_Reputation_Bad'],
  lines: [
    {
      type: 'narration',
      text: '图书馆的午后，{delay:0.8}阳光透过百叶窗，{delay:0.5}在地板上投下条纹状的阴影。'
    },
    {
      type: 'narration',
      text: '我抬起头，{delay:0.5}看到了他。{delay:1}那个传闻很糟的男生——H。'
    },
    {
      type: 'narration',
      text: '他坐在角落里，{delay:0.8}目光穿过书架，{delay:0.5}落在她身上。'
    },
    {
      type: 'dialogue',
      text: '一种类似愤怒的、{delay:0.5}灼热的东西，{delay:0.8}在我的胸口盘踞。'
    },
    {
      type: 'dialogue',
      text: '我为何要那么做呢？{delay:1}大概是因为……{delay:0.8}害怕失去吧。'
    },
    {
      type: 'narration',
      text: '我的内心独白充满警告意味。{delay:1}他不能靠近她。{delay:0.8}任何人都不行。'
    },
    {
      type: 'dialogue',
      text: '（看呐，{delay:0.5}一个多么完美的、{delay:0.5}被嫉妒吞噬的怪物。）'
    },
    {
      type: 'narration',
      text: '我回忆起，{delay:0.8}他似乎找她说过什么。{delay:1}在某个下午，{delay:0.5}14:00左右。'
    },
    {
      type: 'command',
      command: 'setFlag',
      params: { flag: 'FLAG_Knows_H_Vaguely' }
    }
  ]
}

/**
 * P1-DTL-T1900-Movie
 * 作用: 强化主角的病态控制。
 * 诡计执行: 【主角自我洗脑】。主角在无意识中，用A的模板覆盖B的现实。
 * 伏笔: 两个女孩喜好的差异，是后期拆分诡计的关键。
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
      text: '电影院门口，{delay:0.8}霓虹灯在夜色中闪烁。'
    },
    {
      type: 'dialogue',
      character: '她',
      text: '我想看那部喜剧片，{delay:0.5}听说很好笑。'
    },
    {
      type: 'narration',
      text: '我买了票，{delay:0.5}但不是她说的那部。{delay:1}我选了一部文艺片，{delay:0.5}一部她从未表达过兴趣的电影。'
    },
    {
      type: 'dialogue',
      text: '我为何要那么做呢？{delay:1}大概是因为……{delay:0.8}这更适合她吧。'
    },
    {
      type: 'dialogue',
      text: '不，{delay:0.5}我是在说服她。{delay:1}用我的方式，{delay:0.5}让她明白什么才是"正确"的选择。'
    },
    {
      type: 'dialogue',
      character: '她',
      text: '……好吧。{delay:1}如果你觉得这样更好的话。'
    },
    {
      type: 'narration',
      text: '她顺从了。{delay:1}就像我预期的那样。{delay:0.8}我的谎言像藤蔓一样，{delay:0.5}缠绕住她，{delay:0.5}也缠绕住我自己。'
    },
    {
      type: 'dialogue',
      character: '她',
      text: '对了，{delay:0.5}下周是我生日。'
    },
    {
      type: 'command',
      command: 'setFlag',
      params: { flag: 'FLAG_Control_Established' }
    }
  ]
}

/**
 * P1-FLB-T0000-C_Whisper1
 * 作用: 首次引入"理想她"C，打破日常氛围。
 * 进入时间: (在阶段1任意DTL片段后随机触发一次)
 * 诡计执行: 【C+E穿插】。让玩家首次接触到"第三个她"的存在，增加神秘感。
 * 伏笔: C是主角所有行为的内在驱动力。
 */
export const P1_FLB_T0000_C_Whisper1: ScriptSegment = {
  id: 'P1-FLB-T0000-C_Whisper1',
  time: '*', // 随机触发
  description: '阶段1 - C的低语1',
  loop: 'P1',
  unlockFlags: ['FLAG_Control_Established'],
  lines: [
    {
      type: 'narration',
      text: '纯白空间。{delay:1}没有边界，{delay:0.5}没有声音，{delay:0.8}只有一片虚无。'
    },
    {
      type: 'narration',
      text: '然后，{delay:1.2}一个声音。{delay:0.8}轻柔的、{delay:0.5}听不清具体面容的声音。'
    },
    {
      type: 'dialogue',
      character: '她',
      text: '这才对。{delay:1}一切都应该是我喜欢的样子。'
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
      type: 'command',
      command: 'setFlag',
      params: { flag: 'FLAG_Knows_C_Vaguely' }
    }
  ]
}

/**
 * P1-DTL-T2145-GiftPlan
 * 作用: 情感锚点的高潮，同时是病态控制的极致展现。
 * 诡计执行: 【非线性线索】。D的反对和主角的坚持，是第一个强烈的矛盾线索。
 * 伏笔: D是第一个明确质疑主角的人。
 */
export const P1_DTL_T2145_GiftPlan: ScriptSegment = {
  id: 'P1-DTL-T2145-GiftPlan',
  time: '21:45',
  description: '阶段1 - 礼物计划',
  loop: 'P1',
  unlockFlags: [], // 通过"生日"关键词触发
  lines: [
    {
      type: 'narration',
      text: '晚上九点四十五分。{delay:0.8}我和她的朋友在讨论生日礼物。'
    },
    {
      type: 'dialogue',
      character: '朋友',
      text: '我觉得送她那个新出的手链不错，{delay:0.5}她一直想要。'
    },
    {
      type: 'dialogue',
      text: '我否决了。{delay:1}不，{delay:0.5}这不够好。'
    },
    {
      type: 'dialogue',
      character: '朋友',
      text: '那……{delay:0.5}香水？{delay:0.8}或者包包？'
    },
    {
      type: 'dialogue',
      text: '我摇头。{delay:1}我选了一本诗集，{delay:0.5}一本她从未表达过兴趣的书。'
    },
    {
      type: 'dialogue',
      text: '我为何要那么做呢？{delay:1}大概是因为……{delay:0.8}她会喜欢的。'
    },
    {
      type: 'dialogue',
      character: '朋友',
      text: '你确定吗？{delay:0.8}我觉得她可能不会……'
    },
    {
      type: 'dialogue',
      text: '我坚称："她会喜欢的。"{delay:1}语气里有一种我自己都没有察觉到的、{delay:0.5}病态的坚持。'
    },
    {
      type: 'narration',
      text: '朋友无奈地看了我一眼。{delay:1}那种眼神，{delay:0.5}像在审视一个怪物。'
    },
    {
      type: 'dialogue',
      character: '朋友',
      text: '你俩聊吧，{delay:0.5}我先走了。{delay:1}22:15了。'
    },
    {
      type: 'command',
      command: 'setFlag',
      params: { flag: 'FLAG_Relationship_Established' }
    }
  ]
}

/**
 * P1-BKG-T1400-H_Warning_A
 * 作用: 揭示A觉醒的外因，为H的悲剧铺垫。
 * 诡计执行: 【X拆分】的早期伏笔。这里明确提到了A的名字（或者用一个独特的代称），但很容易被玩家忽略。
 * 伏笔: H的动机是善意的。
 */
export const P1_BKG_T1400_H_Warning_A: ScriptSegment = {
  id: 'P1-BKG-T1400-H_Warning_A',
  time: '14:00',
  description: '阶段1 - H的警告',
  loop: 'P1',
  unlockFlags: ['FLAG_Knows_H_Vaguely'],
  lines: [
    {
      type: 'narration',
      text: '我"偶然"听到了他们的对话。{delay:1}在天台，{delay:0.5}那个我后来无数次回到的地方。'
    },
    {
      type: 'dialogue',
      character: 'H',
      text: '他控制欲太强，{delay:0.8}很不正常。{delay:1}你……{delay:0.5}要小心。'
    },
    {
      type: 'narration',
      text: '我听到了她的名字——{delay:1}A。{delay:0.8}不是"她"，{delay:0.5}是A。'
    },
    {
      type: 'dialogue',
      character: 'A',
      text: '……我知道。{delay:1.5}但我……{delay:0.8}我不知道该怎么办。'
    },
    {
      type: 'narration',
      text: 'A陷入了沉思。{delay:1}那种表情，{delay:0.5}像在挣扎。'
    },
    {
      type: 'dialogue',
      text: '我为何要记住这个呢？{delay:1}大概是因为……{delay:0.8}我害怕失去吧。'
    },
    {
      type: 'narration',
      text: '不，{delay:0.5}我是在为自己辩解。{delay:1}向一个不存在的法官，{delay:0.5}解释我为何如此。'
    },
    {
      type: 'command',
      command: 'setFlag',
      params: { flag: 'FLAG_H_Motive_Good' }
    }
  ]
}

/**
 * P1-DTL-T1210-A_Note
 * 作用: 嫁接A线的关键节点。
 * 诡计执行: 【X合一】。这是A写的纸条，但玩家会误以为是B在P2-CORE-T2215之后，决定正式约谈。这是诡计的核心嫁接点。
 * 伏笔: 纸条的字迹。
 */
export const P1_DTL_T1210_A_Note: ScriptSegment = {
  id: 'P1-DTL-T1210-A_Note',
  time: '12:10',
  description: '阶段1 - A的纸条',
  loop: 'P1',
  unlockFlags: ['FLAG_H_Motive_Good'],
  lines: [
    {
      type: 'narration',
      text: '我在课桌里发现了一张纸条。{delay:1}熟悉的字迹，{delay:0.5}但有些颤抖。'
    },
    {
      type: 'narration',
      text: '上面写着：{delay:1}'
    },
    {
      type: 'dialogue',
      text: '{bold}"天台见，{delay:0.8}我们必须谈谈。"{/bold}'
    },
    {
      type: 'narration',
      text: '我为何会感到恐慌呢？{delay:1}大概是因为……{delay:0.8}我害怕失去吧。'
    },
    {
      type: 'dialogue',
      text: '不，{delay:0.5}旁人看来或许很奇怪吧。{delay:1}但我只是……{delay:0.8}想要保护属于我们的关系。'
    },
    {
      type: 'narration',
      text: '纸条的字迹，{delay:0.8}像在诉说着什么。{delay:1}但我选择忽略。'
    },
    {
      type: 'command',
      command: 'setFlag',
      params: { flag: 'FLAG_Note_Found' }
    }
  ]
}

