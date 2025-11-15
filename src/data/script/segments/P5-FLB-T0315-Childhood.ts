import type { ScriptSegment } from '@/types'

/**
 * 阶段5: 深渊 (The Abyss)
 * 
 * P5-FLB-T0315-Childhood
 * 作用: 揭示主角动机的根源。
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
      text: '破碎的童年记忆。{delay:2}'
    },
    {
      type: 'narration',
      text: '黑暗的房间。{delay:1.5}父母的争吵。{delay:1}被粗暴推入并锁门。{delay:1.5}'
    },
    {
      type: 'narration',
      text: '只有绝对的安静，{delay:2}才是安全的。{delay:2}只有完全的控制，{delay:1.5}才能阻止离别。'
    },
    {
      type: 'narration',
      text: '我为何会变成这样呢？{delay:1.5}大概是因为……{delay:1}我太累了吧。{delay:1.5}'
    },
    {
      type: 'narration',
      text: '不，{delay:0.8}我是在为自己辩解。{delay:1.5}向一个不存在的法官，{delay:0.8}解释我为何如此。'
    },
    {
      type: 'command',
      command: 'setFlag',
      params: { flag: 'FLAG_Motive_Root_Revealed' }
    }
  ]
}

