import type { ScriptSegment } from '@/types'

/**
 * P00-01：A 和主角的"正常早晨"（闪回）
 * 真实时间：A 案发生前若干周，某个上学日早晨
 * 建议输入：08:05（闪回）
 */
export const P00_01: ScriptSegment = {
  id: 'P00-01',
  time: '08:05',
  description: 'A 和主角的"正常早晨"（闪回）',
  loop: 'A',
  unlockFlags: [],
  lines: [
    {
      type: 'narration',
      text: '早晨的阳光很温柔。{br}我们并肩走在去学校的路上。'
    },
    {
      type: 'dialogue',
      character: 'A',
      text: '你刚才说...{delay:1}八点零五？'
    },
    {
      type: 'dialogue',
      text: '嗯，{delay:1}我看了看表。{br}应该是这个时间。'
    },
    {
      type: 'dialogue',
      character: 'A',
      text: '时间过得真快呢。{br}感觉才刚起床，{br}就已经这个点了。'
    },
    {
      type: 'dialogue',
      text: '是啊...{delay:1}时间总是这样。'
    },
    {
      type: 'dialogue',
      character: 'A',
      text: '对了，今天想吃什么早餐？'
    },
    {
      type: 'dialogue',
      text: '我看了看她，然后说——'
    },
    {
      type: 'dialogue',
      text: '还是老样子吧。三明治和牛奶，对胃好。'
    },
    {
      type: 'dialogue',
      character: 'A',
      text: '嗯...{delay:1}其实我想试试那家新开的包子铺。'
    },
    {
      type: 'dialogue',
      text: '我停下脚步，看着她。'
    },
    {
      type: 'dialogue',
      text: '三明治更有营养。而且你昨天不是说胃不舒服吗？'
    },
    {
      type: 'dialogue',
      character: 'A',
      text: '...{italic}好吧{/italic}。'
    },
    {
      type: 'narration',
      text: '她点点头，嘴角还挂着笑。{br}但我注意到，那笑容里有一丝...{delay:1}{red}疲惫{/red}？'
    },
    {
      type: 'dialogue',
      text: '走吧，要迟到了。'
    },
    {
      type: 'narration',
      text: '我牵起她的手，继续往前走。{br}她的手很软，很温暖。{br}就像这段关系一样，看起来完美无缺。'
    },
    {
      type: 'dialogue',
      character: 'A',
      text: '对了，{bold}中午十二点一十{/bold}，{br}我们在教室见吧。{br}我想...{delay:1}我想和你聊聊。'
    },
    {
      type: 'dialogue',
      text: '好，我会去的。'
    },
    {
      type: 'narration',
      text: '她看着我，{br}眼神里有种说不出的复杂。{br}但我没有多想。{br}那时候，{br}我还以为，{br}一切都会一直这样下去。'
    }
  ]
}

