import type { ScriptSegment } from '@/types'

/**
 * 阶段3: 受害者剧本 (The Victim's Script)
 * 
 * P3-BKG-T1530-E_Struggle
 * 作用: 展现E的内心挣扎。
 * 诡计执行: 【C+E穿插】。
 * 伏笔: E的自我欺骗。
 * 给予的线索: 栏杆 关键词
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
      text: 'E的视角。{delay:1.5}她在日记里写道：'
    },
    {
      type: 'dialogue',
      character: 'E',
      text: '我好像看到了什么……{delay:2}不，{delay:1}一定是错觉。{delay:1.5}他那么好的人……'
    },
    {
      type: 'narration',
      text: '她的自我欺骗，{delay:0.8}像藤蔓一样，{delay:0.5}缠绕住她，{delay:0.5}也缠绕住真相。{delay:1.5}'
    },
    {
      type: 'narration',
      text: '栏杆。{delay:1.5}那个词，{delay:0.8}像烙印一样，{delay:0.5}留在了她的记忆里。{delay:1.5}'
    },
    {
      type: 'narration',
      text: '栏杆。{delay:1.5}'
    }
  ]
}

