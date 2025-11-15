import type { ScriptSegment } from '@/types'

/**
 * 阶段4: 破绽 (The Unraveling)
 * 
 * P4-FLB-T0000-C_Whisper4
 * 作用: 展现主角内心的合理化机制。
 * 进入时间: (在阶段4任意核心片段后随机触发)
 * 伏笔: C已经从"理想"彻底变成了"魔鬼"。
 */
export const P4_FLB_T0000_C_Whisper4: ScriptSegment = {
  id: 'P4-FLB-T0000-C_Whisper4',
  time: '*', // 在阶段4任意核心片段后随机触发
  description: '阶段4 - C的低语4',
  loop: 'P4',
  unlockFlags: ['FLAG_Protagonist_Is_Killer'],
  lines: [
    {
      type: 'narration',
      text: '纯白空间。{delay:1.5}'
    },
    {
      type: 'narration',
      text: '没有边界，{delay:0.8}没有声音，{delay:0.5}只有一片虚无。{delay:1.5}我站在这里，{delay:0.8}像站在世界的边缘。'
    },
    {
      type: 'narration',
      text: '然后，{delay:1.5}一个声音。{delay:1}冰冷的、{delay:0.8}残酷的声音。'
    },
    {
      type: 'dialogue',
      character: '她',
      text: '她们不理解。{delay:2}她们的离开是一种背叛。{delay:2}背叛者，{delay:1}必须被清除。'
    },
    {
      type: 'narration',
      text: '声音消失了。{delay:1.5}纯白空间褪去，{delay:0.8}我又回到了现实。{delay:1.5}'
    },
    {
      type: 'narration',
      text: '我为何会相信这个声音呢？{delay:1.5}大概是因为……{delay:1}我太累了吧。{delay:1.5}'
    },
    {
      type: 'narration',
      text: '不，{delay:0.8}我是在为自己辩解。{delay:1.5}向一个不存在的法官，{delay:0.8}解释我为何如此。'
    },
    {
      type: 'narration',
      text: 'C已经从"理想"彻底变成了"魔鬼"。{delay:2}'
    }
  ]
}

