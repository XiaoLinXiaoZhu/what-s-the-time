import type { ScriptSegment } from '@/types'

/**
 * P01-08：E 的远视目击
 * 真实时间：Day A 10:07 同时刻（E 视角）
 * 建议输入：某个特殊时间，例如 16:10（纯闪回）
 */
export const P01_08: ScriptSegment = {
  id: 'P01-08',
  time: '16:10',
  description: 'E 的远视目击',
  loop: 'C',
  unlockFlags: ['loop_b_complete'],
  lines: [
    {
      type: 'narration',
      text: '操场。{br}E 坐在看台上，看着远处的教学楼。'
    },
    {
      type: 'narration',
      text: '楼顶有两个剪影。{br}一男一女。{br}他们在说话。'
    },
    {
      type: 'narration',
      text: '然后——{br}她看到了。{br}一个不正常的动作。'
    },
    {
      type: 'dialogue',
      text: '那是...{delay:1}什么？'
    },
    {
      type: 'narration',
      text: 'E 眯起眼睛，想看得更清楚。{br}但距离太远了。{br}她只能看到模糊的影子。'
    },
    {
      type: 'narration',
      text: '一个影子向后倒去。{br}然后，消失了。'
    },
    {
      type: 'dialogue',
      text: '不...{delay:1}我看错了。'
    },
    {
      type: 'narration',
      text: 'E 低下头，装作什么都没看见。{br}她告诉自己，那只是错觉。{br}只是角度问题。{br}不可能是真的。'
    },
    {
      type: 'narration',
      text: '她继续坐在那里，直到人群开始聚集。{br}直到警车的声音响起。{br}但她什么都没说。{br}只是选择，装作没看见。'
    }
  ]
}

