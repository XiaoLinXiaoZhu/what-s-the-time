import type { ScriptSegment } from '@/types'

/**
 * 阶段1: 糖衣 (The Honeymoon)
 * 
 * P1-BKG-T1620-LibraryStare
 * 作用: 建立主角对H的敌意。
 * 诡计执行: 【X合一】。这里被注视的其实是A，但玩家会无缝代入成B，认为H在觊觎自己的"女友"。
 * 伏笔: 主角的嫉妒和敌意是真实的，但对象被他自己混淆了。
 * 给予的线索: 14:00 (主角回忆起H似乎找她说过什么)
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
      text: '图书馆的午后，{delay:1}阳光透过百叶窗，{delay:0.8}在地板上投下条纹状的阴影。{delay:1}那些阴影，{delay:0.5}像牢笼一样，{delay:0.8}将我困住。'
    },
    {
      type: 'narration',
      text: '我抬起头，{delay:0.8}看到了他。{delay:1.5}那个传闻很糟的男生——H。'
    },
    {
      type: 'narration',
      text: '他坐在角落里，{delay:0.8}目光穿过书架，{delay:0.5}落在她身上。{delay:1.5}那种注视，{delay:0.8}像一把刀，{delay:0.5}刺破了我的伪装。'
    },
    {
      type: 'narration',
      text: '一种类似愤怒的、{delay:0.8}灼热的东西，{delay:0.5}在我的胸口盘踞。{delay:1.5}我为何要那么做呢？{delay:1.5}大概是因为……{delay:1}害怕失去吧。'
    },
    {
      type: 'narration',
      text: '不，{delay:0.8}我是在为自己辩解。{delay:1.5}向一个不存在的法官，{delay:0.8}解释我为何如此。'
    },
    {
      type: 'narration',
      text: '我的内心独白充满警告意味。{delay:1.5}他不能靠近她。{delay:1}任何人都不行。{delay:1.5}'
    },
    {
      type: 'narration',
      text: '（看呐，{delay:0.8}一个多么完美的、{delay:0.5}被嫉妒吞噬的怪物。）'
    },
    {
      type: 'narration',
      text: '我回忆起，{delay:1}他似乎找她说过什么。{delay:1.5}在某个下午，{delay:0.8}14:00左右。{delay:1.5}在天台。'
    },
    {
      type: 'narration',
      text: '14:00。{delay:1}天台。{delay:1.5}'
    },
    {
      type: 'command',
      command: 'setFlag',
      params: { flag: 'FLAG_Knows_H_Vaguely' }
    }
  ]
}

