import type { ScriptSegment } from '@/types'

/**
 * 阶段6: 继承 (The Inheritance)
 * 
 * P6-CORE-TNOW-RealTime
 * 作用: Meta元素的高潮，将玩家拉入叙事。
 * 伏笔: -
 */
export const P6_CORE_TNOW_RealTime: ScriptSegment = {
  id: 'P6-CORE-TNOW-RealTime',
  time: 'NOW',
  description: '阶段6 - 真实时间',
  loop: 'P6',
  unlockFlags: ['FLAG_Meta_Bridge_Built'],
  lines: [
    {
      type: 'narration',
      text: '屏幕变黑，{delay:1}只有输入框。{delay:1.5}不再是主角的记忆。'
    },
    {
      type: 'dialogue',
      character: '她',
      text: '你看了这么久，{delay:1.5}那你告诉我，{delay:1}现在是什么时间？'
    },
    {
      type: 'narration',
      text: '游戏要求玩家输入现实世界的"现在时间"。{delay:1.5}'
    },
    {
      type: 'input',
      placeholder: '输入现在的时间 (HH:MM)'
    },
    {
      type: 'timeChoice',
      choices: [
        {
          time: '*',
          lines: [
            {
              type: 'narration',
              text: '无论输入对错，{delay:1}系统都会揭示真实时间。{delay:1.5}'
            },
            {
              type: 'dialogue',
              character: '她',
              text: '看，{delay:0.8}你的时间在流逝。{delay:1.5}而我们，{delay:1}永远停在了10:37。'
            }
          ],
          setFlag: 'FLAG_4th_Wall_Broken'
        }
      ]
    }
  ]
}

/**
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
      text: '理想的"C"的声音出现，{delay:1.5}平静而诱人：'
    },
    {
      type: 'dialogue',
      character: 'C',
      text: '他失败了，{delay:0.8}因为他不够完美。{delay:1.5}但那种渴望……{delay:1.5}你难道没有一瞬间，{delay:1}理解他吗？'
    },
    {
      type: 'narration',
      text: '……{delay:2}'
    },
    {
      type: 'dialogue',
      character: 'C',
      text: '手表还给你。{delay:1.5}现在，{delay:1}轮到你了。{delay:1.5}What\'s the time?'
    },
    {
      type: 'narration',
      text: '界面回到最初的输入框，{delay:1}游戏在此刻定格。{delay:1.5}'
    },
    {
      type: 'narration',
      text: '游戏的循环，{delay:1}从主角的，{delay:0.8}变成了玩家的。{delay:1.5}'
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

