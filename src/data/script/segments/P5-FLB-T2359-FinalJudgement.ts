import type { ScriptSegment } from '@/types'

/**
 * 阶段5: 深渊 (The Abyss)
 * 
 * P5-FLB-T2359-FinalJudgement
 * 作用: 展示故事的现实结局。
 * 伏笔: 现实世界的尘埃落定，但精神世界的审判才刚开始。
 */
export const P5_FLB_T2359_FinalJudgement: ScriptSegment = {
  id: 'P5-FLB-T2359-FinalJudgement',
  time: '23:59',
  description: '阶段5 - 最终审判',
  loop: 'P5',
  unlockFlags: ['FLAG_Truth_Completed'],
  lines: [
    {
      type: 'narration',
      text: '结尾新闻播报的文字片段。{delay:2}'
    },
    {
      type: 'dialogue',
      character: '新闻',
      text: '校园连环命案告破，{delay:1.5}嫌疑人已被逮捕。{delay:2}据知情人透露，{delay:1}另一位同学提供的关键证据起到了重要作用。'
    },
    {
      type: 'narration',
      text: '现实世界的尘埃落定，{delay:1.5}但精神世界的审判才刚开始。{delay:2}'
    }
  ]
}

