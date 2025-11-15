import type { ScriptSegment } from '@/types'

/**
 * 阶段4: 破绽 (The Unraveling)
 * 
 * P4-CORE-T1037-B_Confrontation
 * 作用: 揭示B案真相，确认主角是连环作案者。
 * 进入条件: FLAG_D_Is_Investigating + 辅助信息: 可乐
 * 诡计执行: 【X拆分】完成。玩家确认了第二个受害者B的存在。
 * 伏笔: 与A案的"激情"相比，B案的冷静暗示了主角的堕落。
 * 给予的线索: 18:40 (主角冷静地看了一眼手表)
 */
export const P4_CORE_T1037_B_Confrontation: ScriptSegment = {
  id: 'P4-CORE-T1037-B_Confrontation',
  time: '10:37',
  description: '阶段4 - B案真相',
  loop: 'P4',
  unlockFlags: ['FLAG_D_Is_Investigating'], // 需要"可乐"关键词辅助解锁
  lines: [
    {
      type: 'narration',
      text: '【两问一锁】解锁。{delay:2}记忆清晰化。{delay:1.5}'
    },
    {
      type: 'narration',
      text: '10:37。{delay:1.5}空教室。{delay:1}'
    },
    {
      type: 'dialogue',
      character: 'B',
      text: '我不是她的替代品。{delay:2}我不是她。'
    },
    {
      type: 'narration',
      text: '她的坚定，{delay:0.8}像一把刀，{delay:0.5}刺破了我的谎言。{delay:1.5}'
    },
    {
      type: 'narration',
      text: '我为何要那么做呢？{delay:1.5}大概是因为……{delay:1}我害怕失去吧。{delay:1.5}'
    },
    {
      type: 'narration',
      text: '不，{delay:0.8}我是在为自己辩解。{delay:1.5}向一个不存在的法官，{delay:0.8}解释我为何如此。'
    },
    {
      type: 'narration',
      text: '我在"被抛弃"的恐慌中，{delay:1.5}模式化地重复了暴力。{delay:2}'
    },
    {
      type: 'narration',
      text: '过程留白。{delay:2}只留下B倒地后，{delay:1}可乐滚落的声音。{delay:1.5}'
    },
    {
      type: 'narration',
      text: '与A案的"激情"相比，{delay:1.5}B案的冷静暗示了我的堕落。{delay:1.5}'
    },
    {
      type: 'narration',
      text: '我冷静地看了一眼手表。{delay:1.5}18:40。{delay:1}'
    },
    {
      type: 'narration',
      text: '18:40。{delay:1.5}'
    },
    {
      type: 'command',
      command: 'setFlag',
      params: { flag: 'FLAG_B_Case_Revealed' }
    },
    {
      type: 'command',
      command: 'setFlag',
      params: { flag: 'FLAG_B_Identified' }
    }
  ]
}

