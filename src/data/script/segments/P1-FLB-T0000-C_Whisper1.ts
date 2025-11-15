import type { ScriptSegment } from '@/types'

/**
 * 阶段1: 糖衣 (The Honeymoon)
 * 
 * P1-FLB-T0000-C_Whisper1
 * 作用: 首次引入"理想她"C，打破日常氛围。
 * 进入时间: (在阶段1任意DTL片段后随机触发一次)
 * 诡计执行: 【C+E穿插】。让玩家首次接触到"第三个她"的存在，增加神秘感。
 * 伏笔: C是主角所有行为的内在驱动力。
 */
export const P1_FLB_T0000_C_Whisper1: ScriptSegment = {
  id: 'P1-FLB-T0000-C_Whisper1',
  time: '*', // 随机触发
  description: '阶段1 - C的低语1',
  loop: 'P1',
  unlockFlags: ['FLAG_Control_Established'],
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
      text: '然后，{delay:1.5}一个声音。{delay:1}轻柔的、{delay:0.8}听不清具体面容的声音。'
    },
    {
      type: 'dialogue',
      character: '她',
      text: '这才对。{delay:1.5}一切都应该是我喜欢的样子。'
    },
    {
      type: 'narration',
      text: '声音消失了。{delay:1.5}纯白空间褪去，{delay:0.8}我又回到了现实。{delay:1.5}'
    },
    {
      type: 'narration',
      text: '我为何会听到这个声音呢？{delay:1.5}大概是因为……{delay:1}我太累了吧。{delay:1.5}不，{delay:0.8}我是在为自己辩解。{delay:1}向一个不存在的法官，{delay:0.5}解释我为何如此。'
    },
    {
      type: 'command',
      command: 'setFlag',
      params: { flag: 'FLAG_Knows_C_Vaguely' }
    }
  ]
}

