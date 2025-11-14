import type { ScriptSegment } from '@/types'

/**
 * P09-01：最终 meta 问答
 * 真实时间：叙事层，玩家当前现实时间
 * 建议输入：系统时间
 */
export const P09_01: ScriptSegment = {
  id: 'P09-01',
  time: 'META',
  description: '最终 meta 问答',
  loop: 'G',
  unlockFlags: [],
  lines: [
    {
      type: 'narration',
      text: '"她"让玩家输入现在时间。'
    },
    {
      type: 'dialogue',
      text: '现在，是几点？'
    },
    {
      type: 'input',
      placeholder: '输入现在的时间 (HH:MM)'
    },
    {
      type: 'timeChoice',
      choices: [
        {
          time: '*',
          lines: [
            {
              type: 'dialogue',
              text: '不对，现在是 {systemTime}，对吧？'
            },
            {
              type: 'narration',
              text: '在 {systemTime}，你又来看了一遍。'
            },
            {
              type: 'narration',
              text: '这一步将"叙事时间 / 游戏时间 / 现实时间"折叠到一起，{br}把玩家也拖入"你在重播这场暴力"的责任之中。'
            }
          ]
        }
      ]
    }
  ]
}

