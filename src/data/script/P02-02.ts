import type { ScriptSegment } from '@/types'

/**
 * P02-02：走廊流言（旧案）
 * 真实时间：A 案后不久
 * 建议输入：10:30（闪回）
 */
export const P02_02: ScriptSegment = {
  id: 'P02-02',
  time: '10:30',
  description: '走廊流言（旧案）',
  loop: 'C',
  unlockFlags: ['loop_b_complete'],
  lines: [
    {
      type: 'narration',
      text: '走廊里，同学们三三两两地聚在一起。'
    },
    {
      type: 'dialogue',
      text: '早就觉得那家伙有问题。'
    },
    {
      type: 'dialogue',
      text: '是啊，他平时就怪怪的。'
    },
    {
      type: 'dialogue',
      text: '没想到会做出这种事...'
    },
    {
      type: 'narration',
      text: '我路过他们身边，听着这些讨论。{br}他们说的"那家伙"，就是那个替罪羊。{br}舆论已经把他钉死了。'
    },
    {
      type: 'dialogue',
      text: '那家伙，{br}那天早上{bold}八点二十{/bold}左右，{br}好像就有点不对劲。'
    },
    {
      type: 'dialogue',
      text: '是啊，我也听说了。{br}好像在那之后，{br}就发生了那件事。'
    },
    {
      type: 'narration',
      text: '我低着头，快步走过。{br}但心里，微妙地松了一口气。{br}没有人怀疑我。{br}所有人都相信，我只是一个受害者。'
    },
    {
      type: 'narration',
      text: '晚上{bold}十一点一十五{/bold}，{br}我躺在床上，{br}回想着今天听到的话。{br}一切，{br}都在按计划进行。'
    }
  ]
}

