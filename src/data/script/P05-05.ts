import type { ScriptSegment } from '@/types'

/**
 * P05-05：E 清晰目击 B 案
 * 真实时间：同一时段（E 视角）
 * 建议输入：单独闪回时间，例如 16:20
 */
export const P05_05: ScriptSegment = {
  id: 'P05-05',
  time: '16:20',
  description: 'E 清晰目击 B 案',
  loop: 'E',
  unlockFlags: [],
  lines: [
    {
      type: 'narration',
      text: 'E 从楼下/对面看到整个动作。'
    },
    {
      type: 'narration',
      text: '这次，她完全确认——{br}不是意外。{br}不是错觉。{br}是真的。'
    },
    {
      type: 'dialogue',
      text: '他...{delay:1}他真的做了。'
    },
    {
      type: 'narration',
      text: 'E 站在原地，看着那个场景。{br}她应该报警。{br}她应该说出来。{br}但是——'
    },
    {
      type: 'dialogue',
      text: '不...{delay:1}我不能...'
    },
    {
      type: 'narration',
      text: '她选择沉默。{br}就像一年前一样。{br}但这次，{br}她知道，这不是错觉。{br}这是真的。{br}而她，选择了沉默。'
    },
    {
      type: 'narration',
      text: '她会等到晚上。{br}等到 18:40。{br}然后，做出她的选择。'
    }
  ]
}

