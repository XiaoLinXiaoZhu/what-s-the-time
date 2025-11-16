import type { ScriptSegment } from '@/types'

/**
 * 阶段1: 糖衣 (The Honeymoon)
 *
 * P1-BKG-T0830-Gossip
 * 作用: 铺垫H的负面形象。
 * 诡计执行: 【人物混淆】。在H正式登场前，用偏见给他贴上标签。
 * 伏笔: 社会偏见是主角最强大的武器。
 * 给予的线索: 16:20 (对话中提到"下午图书馆总能看到他")
 */
export const P1_BKG_T0830_Gossip: ScriptSegment = {
  id: 'P1-BKG-T0830-Gossip',
  time: '08:30',
  description: '阶段1 - 流言',
  loop: 'P1',
  unlockFlags: ['FLAG_Knows_B_Persona'],
  lines: [
    { type: 'narration', text: '脚步声在身后响起，然后是压低的谈话声。{br}{delay:0.8}我很自然地走开几步——没有人喜欢被窃窃私语。' },
    { type: 'dialogue', character: 'B', text: '你刚才有没有看到？{br}{delay:0.5}我们班那个H，刚才在走廊里……' },
    { type: 'dialogue', character: 'C', text: '他又怎么了？{br}{delay:0.8}最近他总是这样，像个随时要爆炸的气球。' },
    { type: 'narration', text: '气球。这个比喻很生动。{br}{delay:0.8}我也观察过H，他确实总是紧绷绷的，像一根拉得太紧的弦。' },
    { type: 'dialogue', character: 'B', text: '刚才他突然冲过来，直接撞到了小王。{br}{delay:0.8}小王的书包都被撞翻了，笔记本散了一地。' },
    { type: 'dialogue', character: 'C', text: '然后呢？H道歉了吗？' },
    { type: 'dialogue', character: 'B', text: '道什么歉啊。{br}{delay:0.8}他看都不看一眼，直接就走了。{br}{delay:0.8}小王气得要死，说要去找老师。' },
    { type: 'narration', text: '我停下了脚步。{br}{delay:0.8}这确实像是H会做的事情。他的注意力总是集中在别的事情上——或者说，他有更重要的事情要处理。' },
    { type: 'dialogue', character: 'C', text: '他最近到底怎么了？{br}{delay:0.8}以前虽然不爱说话，但至少不会这么……粗鲁。' },
    { type: 'dialogue', character: 'B', text: '听说是感情问题。{br}{delay:0.8}有人看到他经常在图书馆里发呆，有时候还会突然站起来，看起来很生气的样子。' },
    { type: 'dialogue', character: 'C', text: '图书馆？他经常去那里吗？{br}{delay:0.8}我好像确实在哪里见过他。' },
    { type: 'dialogue', character: 'B', text: '对啊，特别是下午的时候。{br}{delay:0.8}你知道的，{red}16:20{/red}左右吧，总能在图书馆看到他的身影。{br}{delay:0.8}也不知道他到底在里面做什么。' },
    { type: 'narration', text: '{red}16:20{/red}。{br}{delay:0.8}图书馆，下午。{br}{delay:0.8}一个固定的时间，一个固定的地点。{br}{delay:0.8}这听起来像是某种……习惯，或者说是执念。' },
    { type: 'dialogue', character: 'C', text: '感情问题……{br}{delay:0.8}话说回来，他最近确实总是盯着某个方向看。{br}{delay:0.8}特别是下午的时候。' },
    { type: 'dialogue', character: 'B', text: '我知道你想说什么。{br}{delay:0.8}但是我觉得他应该不会……他那个人虽然奇怪，但还不至于……' },
    { type: 'narration', text: '她们的对话停住了。{br}{delay:0.8}有些话不需要说出口，人人都能理解其中的含义。{br}{delay:0.8}这就是流言的力量——它会自动补全那些空白的地方。' },
    { type: 'choice',
      choices: [
        {
          text: '上前为H辩护，维护朋友关系',
          lines: [
            { type: 'narration', text: '我转过身，脸上带着恰到好处的关切。"你们在说什么？H怎么了？"' },
            { type: 'dialogue', character: 'B', text: '哦，我们只是……{br}{delay:0.8}没什么大不了的。' },
            { type: 'dialogue', character: 'C', text: 'H刚才撞到了人，然后直接就走了。{br}{delay:0.8}可能他有什么急事吧。' },
            { type: 'narration', text: '我点点头。"H那个人就是这样，{br}{delay:0.8}有时候会沉浸在自己的世界里。{br}{delay:0.8}不过你们放心，我会和他谈谈的。"' },
            { type: 'command', command: 'setFlag', params: { flag: 'FLAG_Appears_Defensive' } }
          ],
          setFlag: 'FLAG_Appears_Defensive'
        },
        {
          text: '装作没听到，继续往前走',
          lines: [
            { type: 'narration', text: '我继续往前走，假装什么也没听到。{br}{delay:0.8}有些事情，知道得太多反而不好。' },
            { type: 'command', command: 'setFlag', params: { flag: 'FLAG_Ignores_Conflict' } }
          ],
          setFlag: 'FLAG_Ignores_Conflict'
        },
        {
          text: '收集更多关于H的信息',
          lines: [
            { type: 'narration', text: '我假装在远处等人，刻意地停留了一段时间。{br}{delay:0.8}她们的谈话声变得更加清晰。' },
            { type: 'dialogue', character: 'B', text: '话说回来，H最近确实很不对劲。{br}{delay:0.8}你们知道吗？我听小王说，他昨天在图书馆里和某个女生发生了争执。' },
            { type: 'dialogue', character: 'C', text: '争执？为什么？' },
            { type: 'dialogue', character: 'B', text: '具体不太清楚，但是听起来好像是因为座位的问题。{br}{delay:0.8}H坚持要坐在某个特定的位子，但是那个位子本来是别人的。' },
            { type: 'narration', text: '特定的位子。{br}{delay:0.8}这进一步证实了他下午在图书馆的固定习惯。{br}{delay:0.8}某种程度上的……仪式感？' },
            { type: 'command', command: 'setFlag', params: { flag: 'FLAG_Habit_Observed' } }
          ],
          setFlag: 'FLAG_Habit_Observed'
        }
      ]
    }
  ]
}

