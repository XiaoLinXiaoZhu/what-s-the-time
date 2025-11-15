import type { ScriptSegment } from '@/types'

/**
 * 阶段1: 糖衣 (The Honeymoon)
 * 
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
      text: '我在课桌里发现了一张纸条。{delay:1.5}熟悉的字迹，{delay:0.8}但有些颤抖。'
    },
    {
      type: 'narration',
      text: '上面写着：{delay:1.5}'
    },
    {
      type: 'dialogue',
      text: '{bold}"天台见，{delay:1}我们必须谈谈。"{/bold}'
    },
    {
      type: 'narration',
      text: '我为何会感到恐慌呢？{delay:1.5}大概是因为……{delay:1}我害怕失去吧。{delay:1.5}'
    },
    {
      type: 'narration',
      text: '不，{delay:0.8}旁人看来或许很奇怪吧。{delay:1.5}但我只是……{delay:1}想要保护属于我们的关系。'
    },
    {
      type: 'narration',
      text: '纸条的字迹，{delay:0.8}像在诉说着什么。{delay:1.5}但我选择忽略。{delay:1.5}'
    },
    {
      type: 'command',
      command: 'setFlag',
      params: { flag: 'FLAG_Note_Found' }
    }
  ]
}

