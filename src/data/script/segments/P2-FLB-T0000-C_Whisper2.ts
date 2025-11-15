import type { ScriptSegment } from '@/types'

/**
 * 阶段2: 裂痕 (The Crack)
 * 
 * P2-FLB-T0000-C_Whisper2
 * 作用: 强化主角的内在动机。
 * 进入时间: (在阶段2任意核心片段后随机触发)
 * 诡计执行: 【C+E穿插】。
 * 伏笔: 主角的暴力行为有了内在的"许可"。
 */
export const P2_FLB_T0000_C_Whisper2: ScriptSegment = {
  id: 'P2-FLB-T0000-C_Whisper2',
  time: '*', // 在阶段2任意核心片段后随机触发
  description: '阶段2 - C的低语2',
  loop: 'P2',
  unlockFlags: ['FLAG_Talk_Is_Coming'],
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
      text: '然后，{delay:1.5}一个声音。{delay:1}严厉的、{delay:0.8}冰冷的声音。'
    },
    {
      type: 'dialogue',
      character: '她',
      text: '不能有瑕疵。{delay:1.5}任何不完美的东西，{delay:1}都必须被修正。'
    },
    {
      type: 'narration',
      text: '声音消失了。{delay:1.5}纯白空间褪去，{delay:0.8}我又回到了现实。{delay:1.5}'
    },
    {
      type: 'narration',
      text: '我为何会听到这个声音呢？{delay:1.5}大概是因为……{delay:1}我太累了吧。{delay:1.5}'
    },
    {
      type: 'narration',
      text: '不，{delay:0.8}我是在为自己辩解。{delay:1.5}向一个不存在的法官，{delay:0.8}解释我为何如此。'
    }
  ]
}

