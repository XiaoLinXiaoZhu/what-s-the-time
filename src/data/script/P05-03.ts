import type { ScriptSegment } from '@/types'

/**
 * P05-03：10:07 杀 B（真相版）
 * 真实时间：Day Bx 10:07
 * 建议输入：10:07 + 第二问（15:10 等）
 */
export const P05_03: ScriptSegment = {
  id: 'P05-03',
  time: '10:07',
  description: '10:07 杀 B（真相版）',
  loop: 'E',
  unlockFlags: [],
  lines: [
    {
      type: 'narration',
      text: '10:07。'
    },
    {
      type: 'dialogue',
      character: 'B',
      text: '我不是她。'
    },
    {
      type: 'dialogue',
      text: '...什么？'
    },
    {
      type: 'dialogue',
      character: 'B',
      text: '我说，我不是她。{br}我永远不可能是她。{br}你明白吗？'
    },
    {
      type: 'dialogue',
      text: '我知道...{delay:1}我知道你不是。'
    },
    {
      type: 'dialogue',
      character: 'B',
      text: '那你为什么还要这样？{br}为什么还要把我当成她？'
    },
    {
      type: 'dialogue',
      text: '我...{delay:1}'
    },
    {
      type: 'dialogue',
      character: 'B',
      text: '我们结束吧。{br}我不想再这样下去了。'
    },
    {
      type: 'narration',
      text: '她转身要走。{br}就像一年前一样。{br}她要离开我。{br}她要毁掉我。'
    },
    {
      type: 'dialogue',
      text: '不——'
    },
    {
      type: 'narration',
      text: '我伸出手，抓住她。{br}她挣扎。{br}我用力。{br}然后——'
    },
    {
      type: 'narration',
      text: '我重复了 A 案的暴力模式。{br}将她推下，{br}或者，用其他方式。{br}总之，她倒下了。'
    },
    {
      type: 'narration',
      text: '表盘上，指针停在 10:07。{br}和一年前，一模一样。{br}历史，真的重演了。'
    }
  ]
}

