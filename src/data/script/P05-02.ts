import type { ScriptSegment } from '@/types'

/**
 * P05-02：10:05 等待 B 的焦虑（看表）
 * 真实时间：Day Bx 10:05
 * 建议输入：10:05
 */
export const P05_02: ScriptSegment = {
  id: 'P05-02',
  time: '10:05',
  description: '10:05 等待 B 的焦虑（看表）',
  loop: 'E',
  unlockFlags: [],
  lines: [
    {
      type: 'narration',
      text: '我抬起手腕，看表。'
    },
    {
      type: 'dialogue',
      text: '十点...{delay:1}十点零五。'
    },
    {
      type: 'narration',
      text: '约定地点。{br}我站在这里，等着 B。'
    },
    {
      type: 'dialogue',
      text: '还有两分钟。'
    },
    {
      type: 'narration',
      text: '我又看了一次表。{br}10:05。'
    },
    {
      type: 'narration',
      text: '每一次看表，都让我想到一年前。{br}同样的时间，{br}同样的等待，{br}同样的...{delay:1}不安。'
    },
    {
      type: 'dialogue',
      text: '10:05...{delay:1}10:06...{delay:1}10:07...'
    },
    {
      type: 'narration',
      text: '表盘上的指针，一格一格地移动。{br}每一格，都像在提醒我——{br}历史，又要重演了。'
    }
  ]
}

