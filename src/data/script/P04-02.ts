import type { ScriptSegment } from '@/types'

/**
 * P04-02：D 私下为 B 担心
 * 真实时间：B 案前一段时间
 * 建议输入：15:30
 */
export const P04_02: ScriptSegment = {
  id: 'P04-02',
  time: '15:30',
  description: 'D 私下为 B 担心',
  loop: 'D',
  unlockFlags: [],
  lines: [
    {
      type: 'narration',
      text: '操场。{br}D 和主角站在走廊上。'
    },
    {
      type: 'dialogue',
      character: 'D',
      text: '她最近有点不对劲。'
    },
    {
      type: 'dialogue',
      text: '谁？'
    },
    {
      type: 'dialogue',
      character: 'D',
      text: 'B。{br}她最近和你在一起的时间变多了，但是...{delay:1}她看起来不开心。'
    },
    {
      type: 'dialogue',
      text: '是吗？'
    },
    {
      type: 'dialogue',
      character: 'D',
      text: '她说，你有时候看她的眼神很奇怪。{br}就像...{delay:1}就像在看另一个人。'
    },
    {
      type: 'narration',
      text: 'D 的口气从玩笑变成严肃。{br}我知道，她在担心 B。{br}也在怀疑我。'
    },
    {
      type: 'dialogue',
      text: '我没有——'
    },
    {
      type: 'dialogue',
      character: 'D',
      text: '我只是提醒你。{br}如果你真的在乎她，就别伤害她。'
    },
    {
      type: 'dialogue',
      character: 'D',
      text: '她约了你，{br}今天{bold}下午三点一十{/bold}，{br}在教室见面，对吧？'
    },
    {
      type: 'dialogue',
      text: '...你怎么知道？'
    },
    {
      type: 'dialogue',
      character: 'D',
      text: '她告诉我的。{br}她说，{br}想和你好好谈谈。{br}我希望...{delay:1}我希望你能认真听她说。'
    },
    {
      type: 'dialogue',
      text: '我会的。'
    },
    {
      type: 'narration',
      text: 'D 看了我一眼，转身走了。{br}我站在原地，心里五味杂陈。{br}我知道，她说的是对的。{br}但我...{delay:1}但我已经停不下来了。'
    }
  ]
}

