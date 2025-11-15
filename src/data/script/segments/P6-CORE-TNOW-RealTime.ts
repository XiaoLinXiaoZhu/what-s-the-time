import type { ScriptSegment } from '@/types'

/**
 * 阶段6: 继承 (The Inheritance)
 * 
 * P6-CORE-TNOW-RealTime
 * 作用: Meta元素的高潮，将玩家拉入叙事。
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
      text: '屏幕变黑，{delay:1.5}只有输入框。{delay:2}不再是主角的记忆。{delay:1.5}'
    },
    {
      type: 'dialogue',
      character: '她',
      text: '你看了这么久，{delay:2}那你告诉我，{delay:1.5}现在是什么时间？'
    },
    {
      type: 'narration',
      text: '游戏要求玩家输入现实世界的"现在时间"。{delay:2}'
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
              text: '无论输入对错，{delay:1.5}系统都会揭示真实时间。{delay:2}'
            },
            {
              type: 'dialogue',
              character: '她',
              text: '看，{delay:1}你的时间在流逝。{delay:2}而我们，{delay:1.5}永远停在了10:37。'
            }
          ],
          setFlag: 'FLAG_4th_Wall_Broken'
        }
      ]
    }
  ]
}

