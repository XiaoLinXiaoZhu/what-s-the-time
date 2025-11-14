import type { ScriptSegment } from '@/types'

/**
 * P01-03：10:07 A 被推下（假闪回版）
 * 真实时间：Day A 10:07
 * 建议输入：10:07（玩家第一次命中）
 */
export const P01_03: ScriptSegment = {
  id: 'P01-03',
  time: '10:07',
  description: 'A 被推下（假闪回版）',
  loop: 'C',
  unlockFlags: ['loop_b_complete'],
  lines: [
    {
      type: 'narration',
      text: '楼顶。模糊的记忆。'
    },
    {
      type: 'narration',
      text: '她踉跄着，然后...{delay:1}坠落。'
    },
    {
      type: 'dialogue',
      text: '我没拉住她。'
    },
    {
      type: 'narration',
      text: '画面卡在这里，像老旧的录像带。{br}我看不清她的脸，也记不起她说了什么。{br}只记得那个瞬间——{br}她向后倒去，而我伸出手，却什么也没抓住。'
    },
    {
      type: 'dialogue',
      text: '我没拉住她。'
    },
    {
      type: 'narration',
      text: '这句话，我在心里重复了无数遍。{br}也许重复得多了，就真的成了事实。'
    }
  ]
}

