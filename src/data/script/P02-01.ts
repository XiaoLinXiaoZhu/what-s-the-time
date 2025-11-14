import type { ScriptSegment } from '@/types'

/**
 * P02-01：第二轮问话，C 被锁定
 * 真实时间：Day A 后几天
 * 建议输入：11:00 + 第二问（例如 09:30）
 */
export const P02_01: ScriptSegment = {
  id: 'P02-01',
  time: '11:00',
  description: '第二轮问话，C 被锁定',
  loop: 'D',
  unlockFlags: [],
  lines: [
    {
      type: 'narration',
      text: '同一间办公室。{br}警官 G 再次坐在我对面。'
    },
    {
      type: 'dialogue',
      character: 'G',
      text: '那天，他有没有情绪激动？'
    },
    {
      type: 'dialogue',
      text: '...有。{br}他最近情绪很不稳定。'
    },
    {
      type: 'dialogue',
      character: 'G',
      text: '具体表现？'
    },
    {
      type: 'dialogue',
      text: '他...{delay:1}经常发脾气。{br}而且，他最近和她走得很近。{br}我担心...{delay:1}我担心他是不是对她做了什么。'
    },
    {
      type: 'narration',
      text: '我小心地构建着"替罪羊形象"。{br}每一句话，都指向那个"他"。{br}让怀疑的种子，慢慢生根发芽。'
    },
    {
      type: 'dialogue',
      character: 'G',
      text: '我知道了。{br}我们会调查的。'
    },
    {
      type: 'dialogue',
      text: '谢谢。{br}我只希望...{delay:1}能找出真相。'
    },
    {
      type: 'narration',
      text: '我低下头，做出痛苦的样子。{br}G 在笔录上写着什么。{br}我知道，替罪羊已经被锁定了。'
    }
  ]
}

