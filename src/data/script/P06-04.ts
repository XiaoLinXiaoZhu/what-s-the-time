import type { ScriptSegment } from '@/types'

/**
 * P06-04：23:15 夜间·D 或 E 来敲门
 * 真实时间：B 失踪后的某晚
 * 建议输入：23:15（Phase 2/3 版本）
 */
export const P06_04: ScriptSegment = {
  id: 'P06-04',
  time: '23:15',
  description: '23:15 夜间·D 或 E 来敲门',
  loop: 'B',
  unlockFlags: ['loop_a_complete'],
  lines: [
    {
      type: 'narration',
      text: '夜晚。{br}主角独白被敲门声打断。'
    },
    {
      type: 'choice',
      choices: [
        {
          text: '是 D',
          lines: [
            {
              type: 'dialogue',
              character: 'D',
              text: '她有没有跟你说什么？'
            },
            {
              type: 'dialogue',
              text: '...没有。'
            },
            {
              type: 'dialogue',
              character: 'D',
              text: '如果这次也是因为你，{br}我永远不会原谅你。'
            },
            {
              type: 'narration',
              text: 'D 的眼神很冷。{br}我知道，{br}她已经开始怀疑了。'
            }
          ]
        },
        {
          text: '是 E',
          lines: [
            {
              type: 'dialogue',
              character: 'E',
              text: '睡了吗？'
            },
            {
              type: 'dialogue',
              text: '...还没。'
            },
            {
              type: 'dialogue',
              character: 'E',
              text: '那就好。'
            },
            {
              type: 'narration',
              text: 'E 什么也没问，{br}却在门口站了很久。{br}我知道，{br}她什么都知道。{br}但她选择，{br}什么都不说。'
            }
          ]
        }
      ]
    }
  ]
}

