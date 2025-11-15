import type { ScriptSegment } from '@/types'

/**
 * 阶段5: 深渊 (The Abyss)
 * 
 * P5-CORE-T1840-E_Accomplice
 * 作用: 故事的又一重大转折，揭示共犯的存在。
 * 诡计执行: 【C+E穿插】的终极反转。E主动成为了C在现实的代行者。
 * 伏笔: E的爱是毁灭性的。
 * 给予的线索: C 关键词
 */
export const P5_CORE_T1840_E_Accomplice: ScriptSegment = {
  id: 'P5-CORE-T1840-E_Accomplice',
  time: '18:40',
  description: '阶段5 - E的共犯',
  loop: 'P5',
  unlockFlags: ['FLAG_E_Is_Witness_A', 'FLAG_B_Case_Revealed'],
  lines: [
    {
      type: 'narration',
      text: 'B案当晚。{delay:1.5}我正在处理现场。{delay:1}'
    },
    {
      type: 'narration',
      text: '然后，{delay:1.5}E出现了。{delay:1.5}'
    },
    {
      type: 'narration',
      text: '她在极度挣扎，{delay:1}手机屏幕亮起，{delay:0.8}显示报警电话。{delay:2}'
    },
    {
      type: 'narration',
      text: '然后，{delay:1.5}她走向我，{delay:1}轻声说：'
    },
    {
      type: 'dialogue',
      character: 'E',
      text: '她太吵了。{delay:2}我来帮你让她安静。'
    },
    {
      type: 'narration',
      text: '她戴上了手套，{delay:1.5}并说出"叫她C"的宣言。{delay:1.5}'
    },
    {
      type: 'dialogue',
      character: 'E',
      text: '叫她C。{delay:2}从今以后，{delay:1}她就是C。'
    },
    {
      type: 'narration',
      text: 'E主动成为了C在现实的代行者。{delay:2}她的爱是毁灭性的。{delay:1.5}'
    },
    {
      type: 'narration',
      text: 'C。{delay:1.5}'
    },
    {
      type: 'command',
      command: 'setFlag',
      params: { flag: 'FLAG_E_Is_Accomplice' }
    }
  ]
}

