import type { ScriptSegment } from '@/types'

/**
 * 阶段6: 继承 (The Inheritance)
 * 
 * P6-CORE-TFINAL-Invitation
 * 作用: 开放式结局，主题的最终升华。
 * 伏笔: 游戏的循环，从主角的，变成了玩家的。
 */
export const P6_CORE_TFINAL_Invitation: ScriptSegment = {
  id: 'P6-CORE-TFINAL-Invitation',
  time: 'FINAL',
  description: '阶段6 - 邀请',
  loop: 'P6',
  unlockFlags: ['FLAG_4th_Wall_Broken'],
  lines: [
    {
      type: 'narration',
      text: '理想的"C"的声音出现，{delay:2}平静而诱人：'
    },
    {
      type: 'dialogue',
      character: 'C',
      text: '他失败了，{delay:1}因为他不够完美。{delay:2}但那种渴望……{delay:2}你难道没有一瞬间，{delay:1.5}理解他吗？'
    },
    {
      type: 'narration',
      text: '……{delay:3}'
    },
    {
      type: 'dialogue',
      character: 'C',
      text: '手表还给你。{delay:2}现在，{delay:1.5}轮到你了。{delay:2}What\'s the time?'
    },
    {
      type: 'narration',
      text: '界面回到最初的输入框，{delay:1.5}游戏在此刻定格。{delay:2}'
    },
    {
      type: 'narration',
      text: '游戏的循环，{delay:1.5}从主角的，{delay:1}变成了玩家的。{delay:2}'
    },
    {
      type: 'input',
      placeholder: '输入时间 (HH:MM)'
    },
    {
      type: 'command',
      command: 'setFlag',
      params: { flag: 'Game_End' }
    }
  ]
}

