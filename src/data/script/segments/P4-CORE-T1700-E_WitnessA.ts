import type { ScriptSegment } from '@/types'

/**
 * 阶段4: 破绽 (The Unraveling)
 * 
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
      text: 'E的视角。{delay:1.5}A案发生前。{delay:1}'
    },
    {
      type: 'narration',
      text: '她因为暗恋而跟踪我，{delay:1.5}在天台角落，{delay:1}清晰地看到我在栏杆上做手脚。{delay:1.5}'
    },
    {
      type: 'dialogue',
      character: 'E',
      text: '我看到了……{delay:2}他在……{delay:1}他在破坏栏杆。'
    },
    {
      type: 'narration',
      text: '她因恐惧而逃跑，{delay:1.5}说服自己"只是恶作剧"。{delay:1.5}'
    },
    {
      type: 'dialogue',
      character: 'E',
      text: '不，{delay:1}一定是错觉。{delay:1.5}他那么好的人……'
    },
    {
      type: 'narration',
      text: '她的自我欺骗，{delay:0.8}像藤蔓一样，{delay:0.5}缠绕住她，{delay:0.5}也缠绕住真相。{delay:1.5}'
    },
    {
      type: 'narration',
      text: 'E的证人身份被确认。{delay:1.5}她的负罪感根源。{delay:1.5}'
    },
    {
      type: 'command',
      command: 'setFlag',
      params: { flag: 'FLAG_E_Is_Witness_A' }
    }
  ]
}

