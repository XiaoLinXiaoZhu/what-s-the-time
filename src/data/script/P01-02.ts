import type { ScriptSegment } from '@/types'

/**
 * P01-02：10:05 楼顶前的"平静几分钟"
 * 真实时间：Day A 10:05
 * 建议输入：10:05（闪回）
 */
export const P01_02: ScriptSegment = {
  id: 'P01-02',
  time: '10:05',
  description: '10:05 楼顶前的"平静几分钟"',
  loop: 'C',
  unlockFlags: ['loop_b_complete'],
  lines: [
    {
      type: 'narration',
      text: '我抬起手腕，看了一眼表。{br}十点零五。'
    },
    {
      type: 'narration',
      text: '楼顶的风很大。{br}我们站在栏杆边，看着远处的操场。'
    },
    {
      type: 'dialogue',
      character: 'A',
      text: '这里视野真好。'
    },
    {
      type: 'dialogue',
      text: '嗯。'
    },
    {
      type: 'dialogue',
      text: '时间还早。'
    },
    {
      type: 'dialogue',
      character: 'A',
      text: '是啊...{delay:1}还早。'
    },
    {
      type: 'narration',
      text: '她转过身，背对着栏杆。{br}我们之间的距离，刚好够我伸出手。{br}气氛微妙得让人窒息。'
    },
    {
      type: 'dialogue',
      character: 'A',
      text: '我想说——'
    },
    {
      type: 'dialogue',
      text: '说吧。'
    },
    {
      type: 'narration',
      text: '我看着她，等着她开口。{br}表盘上的指针，还在慢慢往前走。'
    },
    {
      type: 'dialogue',
      text: '十点...{delay:1}十点零五...{delay:1}十点零六...{delay:1}十点零七...'
    },
    {
      type: 'narration',
      text: '时间，{br}终于到了。'
    }
  ]
}

