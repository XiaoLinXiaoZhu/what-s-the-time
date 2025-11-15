import type { ScriptSegment } from '@/types'

/**
 * 阶段1: 糖衣 (The Honeymoon)
 * 
 * P1-BKG-T1400-H_Warning_A
 * 作用: 揭示A觉醒的外因，为H的悲剧铺垫。
 * 诡计执行: 【X拆分】的早期伏笔。这里明确提到了A的名字（或者用一个独特的代称），但很容易被玩家忽略。
 * 伏笔: H的动机是善意的。
 * 给予的线索: 天台 关键词 (对话背景)
 */
export const P1_BKG_T1400_H_Warning_A: ScriptSegment = {
  id: 'P1-BKG-T1400-H_Warning_A',
  time: '14:00',
  description: '阶段1 - H的警告',
  loop: 'P1',
  unlockFlags: ['FLAG_Knows_H_Vaguely'],
  lines: [
    {
      type: 'narration',
      text: '我"偶然"听到了他们的对话。{delay:1.5}在天台，{delay:0.8}那个我后来无数次回到的地方。'
    },
    {
      type: 'narration',
      text: '天台。{delay:1}风很大，{delay:0.8}吹乱了他们的头发。{delay:1}我躲在角落里，{delay:0.5}像一个小偷，{delay:0.8}偷听着不属于我的秘密。'
    },
    {
      type: 'dialogue',
      character: 'H',
      text: '他控制欲太强，{delay:1}很不正常。{delay:1.5}你……{delay:0.8}要小心。'
    },
    {
      type: 'narration',
      text: '我听到了她的名字——{delay:1.5}A。{delay:1}不是"她"，{delay:0.8}是A。{delay:1.5}'
    },
    {
      type: 'dialogue',
      character: 'A',
      text: '……我知道。{delay:2}但我……{delay:1.5}我不知道该怎么办。'
    },
    {
      type: 'narration',
      text: 'A陷入了沉思。{delay:1.5}那种表情，{delay:0.8}像在挣扎。{delay:1.5}'
    },
    {
      type: 'narration',
      text: '我为何要记住这个呢？{delay:1.5}大概是因为……{delay:1}我害怕失去吧。{delay:1.5}不，{delay:0.8}我是在为自己辩解。{delay:1}向一个不存在的法官，{delay:0.5}解释我为何如此。'
    },
    {
      type: 'narration',
      text: '天台。{delay:1.5}'
    },
    {
      type: 'command',
      command: 'setFlag',
      params: { flag: 'FLAG_H_Motive_Good' }
    }
  ]
}

