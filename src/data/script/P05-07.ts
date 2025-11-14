import type { ScriptSegment } from '@/types'

/**
 * P05-07：18:40 分尸真相·E 成为共犯
 * 真实时间：Day Bx 18:40
 * 建议输入：18:40（后期真相版）
 */
export const P05_07: ScriptSegment = {
  id: 'P05-07',
  time: '18:40',
  description: '18:40 分尸真相·E 成为共犯',
  loop: 'E',
  unlockFlags: [],
  lines: [
    {
      type: 'narration',
      text: '18:40。{br}垃圾站。'
    },
    {
      type: 'narration',
      text: 'E 出现了。'
    },
    {
      type: 'dialogue',
      character: 'E',
      text: '她说，叫她 C。'
    },
    {
      type: 'dialogue',
      text: '...什么？'
    },
    {
      type: 'dialogue',
      character: 'E',
      text: '她会帮他处理掉 C。'
    },
    {
      type: 'narration',
      text: 'E 戴上手套，{br}走向那个袋子。{br}她说的 C，{br}既指现在这具 B 的尸体，{br}也指一年前死去的 A，{br}更指围绕这个名字的一切罪与纠缠。'
    },
    {
      type: 'dialogue',
      character: 'E',
      text: '让我来帮你。{br}把这一整个 C 处理掉——{br}过去和现在，都交给我。'
    },
    {
      type: 'narration',
      text: '她开始帮忙。{br}处理尸体，{br}使用锯子，{br}把一切装进垃圾袋。{br}她不再是目击者，{br}而是共犯。'
    },
    {
      type: 'narration',
      text: '把 A/B/名字/罪全部压缩成一个 C。{br}然后，{br}一起处理掉。'
    }
  ]
}

