import type { ScriptSegment } from '@/types'

/**
 * P08-02：回家的路·新闻推送 + 看表
 * 真实时间：同一天傍晚
 * 建议输入：18:10
 */
export const P08_02: ScriptSegment = {
  id: 'P08-02',
  time: '18:10',
  description: '回家的路·新闻推送 + 看表',
  loop: 'F',
  unlockFlags: [],
  lines: [
    {
      type: 'narration',
      text: '回家的路。{br}手机推送了一条新闻。'
    },
    {
      type: 'narration',
      text: '关于 E 判决的新闻。{br}标题很醒目，{br}但我没有点开。'
    },
    {
      type: 'narration',
      text: '我锁屏，{br}然后看表——'
    },
    {
      type: 'narration',
      text: '手表停在 10:07。{br}手机时间正常。{br}时间错位彻底固定。'
    },
    {
      type: 'dialogue',
      text: '时间是...{delay:1}什么？'
    },
    {
      type: 'narration',
      text: '手表说 10:07，{br}手机说 18:10，{br}现实说...{br}我不知道。{br}时间，{br}已经彻底错位了。'
    }
  ]
}

