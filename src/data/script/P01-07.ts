import type { ScriptSegment } from '@/types'

/**
 * P01-07：12:30 警局初步笔录（旧案）
 * 真实时间：Day A 当天 12:30
 * 建议输入：12:30（闪回）
 */
export const P01_07: ScriptSegment = {
  id: 'P01-07',
  time: '12:30',
  description: '12:30 警局初步笔录（旧案）',
  loop: 'C',
  unlockFlags: ['loop_b_complete'],
  lines: [
    {
      type: 'narration',
      text: '警局。{br}警官 G 坐在我对面，手里拿着笔。'
    },
    {
      type: 'dialogue',
      character: 'G',
      text: '把当时的情况，详细说一遍。'
    },
    {
      type: 'dialogue',
      text: '我们约在楼顶见面。{br}她说想聊聊。{br}然后...{delay:1}她情绪很激动。'
    },
    {
      type: 'dialogue',
      character: 'G',
      text: '因为什么激动？'
    },
    {
      type: 'dialogue',
      text: '...因为一些事情。{br}她最近压力很大。'
    },
    {
      type: 'dialogue',
      character: 'G',
      text: '具体是什么事情？'
    },
    {
      type: 'dialogue',
      text: '我不太清楚。{br}但她提到过...{delay:1}提到过一个人。'
    },
    {
      type: 'dialogue',
      character: 'G',
      text: '谁？'
    },
    {
      type: 'dialogue',
      text: '一个...{delay:1}和她走得很近的人。{br}最近他们经常在一起。'
    },
    {
      type: 'narration',
      text: '我小心地选择用词。{br}不直接说名字，但暗示得足够明显。{br}让矛头，慢慢转向那个"替罪羊"。'
    },
    {
      type: 'dialogue',
      character: 'G',
      text: '我知道了。{br}你还有什么要补充的吗？'
    },
    {
      type: 'dialogue',
      text: '没有了。{br}我只希望...{delay:1}能找出真相。'
    },
    {
      type: 'dialogue',
      character: 'G',
      text: '之后几天，{br}我们可能还会再找你。{br}如果想起什么，{br}随时联系我。'
    },
    {
      type: 'dialogue',
      text: '我知道了。'
    },
    {
      type: 'narration',
      text: '我低下头，做出悲伤的样子。{br}G 看了我一眼，在笔录上写了什么。{br}我知道，种子已经种下了。{br}接下来，{br}只需要等待。'
    },
    {
      type: 'narration',
      text: '走出警局，{br}我看了看表。{br}时间还在往前走。{br}但在我心里，{br}有些东西，{br}已经停住了。'
    }
  ]
}

