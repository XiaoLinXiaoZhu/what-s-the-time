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
    {
      type: 'narration',
      text: '我们走后，{delay:0.8}走廊里传来窃窃私语。{delay:1}那些声音，{delay:0.5}像藤蔓一样，{delay:0.8}缠绕住我的记忆。'
    },
    {
      type: 'dialogue',
      character: '学生A',
      text: '你听说了吗？{delay:0.8}那个叫H的家伙……'
    },
    {
      type: 'dialogue',
      character: '学生B',
      text: '嗯，{delay:0.5}脾气差得要命。{delay:1}像个疯狗一样。'
    },
    {
      type: 'narration',
      text: '我停下脚步，{delay:0.8}没有回头。{delay:1.5}这些声音，{delay:0.5}像烙印一样，{delay:0.8}留在了我的记忆里。'
    },
    {
      type: 'dialogue',
      character: '学生A',
      text: '是啊，{delay:0.8}真不知道为什么会有人愿意接近他。'
    },
    {
      type: 'dialogue',
      character: '学生B',
      text: '下午图书馆总能看到他，{delay:0.8}一个人坐在角落里。{delay:1}16:20左右吧。'
    },
    {
      type: 'narration',
      text: '我为何会记住这个呢？{delay:1.5}大概是因为……{delay:1}这些声音，{delay:0.5}像武器一样，{delay:0.8}被我收藏起来。{delay:1.5}'
    },
    {
      type: 'narration',
      text: '（看呐，{delay:0.8}一个多么完美的、{delay:0.5}被社会偏见标记的怪物。）'
    },
    {
      type: 'narration',
      text: '16:20。{delay:1}图书馆。{delay:1.5}'
    },
    {
      type: 'command',
      command: 'setFlag',
      params: { flag: 'FLAG_H_Reputation_Bad' }
    }
  ]
}

