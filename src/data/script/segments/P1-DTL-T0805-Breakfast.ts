import type { ScriptSegment } from '@/types'

/**
 * 阶段1: 糖衣 (The Honeymoon)
 * 
 * P1-DTL-T0805-Breakfast
 * 作用: 建立"虚构恋爱史"的开端；情感绑定。
 * 诡计执行: 【X合一】。这是B的真实日常，但玩家会将其视为"X恋爱史"的起点。
 * 伏笔: 她笑容中的疲惫。
 * 给予的线索: 12:30 (她说"中午在老地方见")
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
      text: '早晨八点零五分。{delay:1}'
    },
    {
      type: 'narration',
      text: '某种刺眼的光线从教室的窗户斜射进来，{delay:0.8}在桌面上投下斑驳的光影。{delay:1}我坐在座位上，{delay:0.5}看着那些光影，{delay:0.8}像在看一幅与我无关的画。'
    },
    {
      type: 'narration',
      text: '她站在我面前，{delay:0.8}手里拿着书包，{delay:0.5}眼神里有一种我读不懂的东西。{delay:1.5}或许是疲惫？{delay:1}或许是……{delay:1.5}别的什么。'
    },
    {
      type: 'dialogue',
      character: '她',
      text: '听说学校门口新开了一家包子店，{delay:0.8}我想去试试。'
    },
    {
      type: 'narration',
      text: '她的声音很轻，{delay:0.8}像羽毛一样，{delay:0.5}落在我的耳边。{delay:1}我为何要拒绝呢？{delay:1.5}大概是因为……{delay:1}对她胃不好吧。'
    },
    {
      type: 'narration',
      text: '不，{delay:0.8}旁人看来或许很奇怪吧。{delay:1.5}但我只是……{delay:1}关心她。{delay:1.5}是的，{delay:0.8}只是关心。'
    },
    {
      type: 'narration',
      text: '我买了三明治，{delay:0.8}递给她。{delay:1}那种动作，{delay:0.5}像在排练一场戏。{delay:1}我扮演着"体贴的男友"，{delay:0.8}她扮演着"顺从的女友"。'
    },
    {
      type: 'dialogue',
      character: '她',
      text: '……好吧。{delay:1.5}谢谢你。'
    },
    {
      type: 'narration',
      text: '她顺从地笑了。{delay:1.5}那种笑容，{delay:0.8}像一块冰，{delay:0.5}被我死死攥在手心，{delay:0.8}既不愿它融化，{delay:0.5}又被冻得生疼。'
    },
    {
      type: 'narration',
      text: '（看呐，{delay:0.8}一个多么完美的、{delay:0.5}体贴的怪物。）'
    },
    {
      type: 'dialogue',
      character: '她',
      text: '中午在老地方见。{delay:1}12:30。'
    },
    {
      type: 'narration',
      text: '她转身离开。{delay:1}我看着她的背影，{delay:0.8}一种类似满足的、{delay:0.5}沉重的东西，{delay:0.8}在我的胸口盘踞。{delay:1.5}'
    },
    {
      type: 'narration',
      text: '12:30。{delay:1}老地方。{delay:1.5}'
    },
    {
      type: 'command',
      command: 'setFlag',
      params: { flag: 'FLAG_Knows_B_Persona' }
    }
  ]
}

