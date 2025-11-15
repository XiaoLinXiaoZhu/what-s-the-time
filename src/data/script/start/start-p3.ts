import type { ScriptSegment } from '@/types'

/**
 * 阶段3开场片段
 * 主题：受害者剧本 - 表演、伪装、受害者身份
 */
export const startP3Segment: ScriptSegment = {
  id: 'START-P3',
  time: 'START',
  description: '阶段3开场 - 受害者剧本',
  loop: 'P3',
  unlockFlags: [],
  lines: [
    {
      type: 'narration',
      text: '我在想，{br}时间是……？'
    },
    {
      type: 'dialogue',
      text: '不，{delay:1}是  {bold}他{/bold}  在问我。'
    },
    {
      type: 'narration',
      text: '现在……现在……{br}我抬起手，看了看手表。{delay:1}时间是……{br}{delay:1}上午八点零五……{br}{delay:1}应该吧……{br}我必须记住，{delay:0.8}我是受害者。{br}于是我张口'
    },
    {
      type: 'dialogue',
      text: '{bold}{red}时间是:{/red}{/bold}'
    },
    {
      type: 'input',
      placeholder: '输入时间 (HH:MM)'
    }
  ]
}

