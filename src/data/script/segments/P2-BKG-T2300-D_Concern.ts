import type { ScriptSegment } from '@/types'

/**
 * 阶段2: 裂痕 (The Crack)
 * 
 * P2-BKG-T2300-D_Concern
 * 作用: 展现D的视角，提供外部线索。
 * 诡计执行: 【非线性探索】。首次引入非主角视角，打破叙事常规。
 * 伏笔: "菠萝包"成为D后期质疑主角的关键证据。
 * 给予的线索: 菠萝包 关键词 (B回复："放心，如果不对劲，我会给你发'菠萝包'的")
 */
export const P2_BKG_T2300_D_Concern: ScriptSegment = {
  id: 'P2-BKG-T2300-D_Concern',
  time: '23:00',
  description: '阶段2 - D的担忧',
  loop: 'P2',
  unlockFlags: ['FLAG_Knows_D_Vaguely'],
  lines: [
    {
      type: 'narration',
      text: '一段不属于我的记忆。{delay:1.5}可能是她的日记，{delay:0.8}或者手机信息。{delay:1.5}'
    },
    {
      type: 'dialogue',
      character: 'D',
      text: '你真的要去和他谈吗？{delay:1.5}我总觉得他不对劲。'
    },
    {
      type: 'narration',
      text: '这是D的声音。{delay:1.5}她的朋友，{delay:0.8}那个我一直试图忽略的人。{delay:1.5}'
    },
    {
      type: 'dialogue',
      character: '她',
      text: '放心，{delay:0.8}如果不对劲，{delay:0.5}我会给你发"菠萝包"的。'
    },
    {
      type: 'narration',
      text: '"菠萝包"。{delay:1.5}一个暗号，{delay:0.8}一个求救信号。{delay:1.5}'
    },
    {
      type: 'narration',
      text: '我为何会看到这个呢？{delay:1.5}大概是因为……{delay:1}我太累了吧。{delay:1.5}'
    },
    {
      type: 'narration',
      text: '不，{delay:0.8}我是在为自己辩解。{delay:1.5}向一个不存在的法官，{delay:0.8}解释我为何如此。'
    },
    {
      type: 'narration',
      text: '菠萝包。{delay:1.5}'
    },
    {
      type: 'command',
      command: 'setFlag',
      params: { flag: 'FLAG_D_Is_Concerned' }
    }
  ]
}

