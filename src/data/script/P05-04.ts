import type { ScriptSegment } from '@/types'

/**
 * P05-04：10:08–10:xx B 案后几分钟
 * 真实时间：Day Bx 10:08–10:xx
 * 建议输入：10:08/10:09/10:10（后期分钟切片）
 */
export const P05_04: ScriptSegment = {
  id: 'P05-04',
  time: '10:08',
  description: '10:08–10:xx B 案后几分钟',
  loop: 'E',
  unlockFlags: [],
  lines: [
    {
      type: 'narration',
      text: '地点更隐蔽。{br}无即时目击。'
    },
    {
      type: 'narration',
      text: '我站在原地，看着倒下的 B。{br}短暂的慌乱后，{br}我快速进入"处理模式"。'
    },
    {
      type: 'dialogue',
      text: '10:08...{delay:1}10:09...{delay:1}10:10...'
    },
    {
      type: 'narration',
      text: '四周很安静。{br}没有人会来。{br}我有时间，{br}有时间处理一切。'
    },
    {
      type: 'narration',
      text: '我检查四周，确认没有人。{br}然后，开始思考下一步。{br}分尸，抛尸，{br}让一切消失。'
    },
    {
      type: 'dialogue',
      text: '这次...{delay:1}这次要做得更干净。'
    },
    {
      type: 'narration',
      text: '我看了看表。{br}时间还早。{br}处理这些，{br}需要等到晚上。{br}比如，{br}{bold}十八点三十九{/bold}，{br}或者{bold}十八点四十{/bold}。{br}那时候，{br}才是真正开始的时候。'
    }
  ]
}

