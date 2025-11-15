import type { ScriptSegment } from '@/types'

/**
 * 阶段5: 深渊 (The Abyss)
 * 
 * P5-BKG-T2030-E_Confession
 * 作用: 展示E的扭曲心理。
 */
export const P5_BKG_T2030_E_Confession: ScriptSegment = {
  id: 'P5-BKG-T2030-E_Confession',
  time: '20:30',
  description: '阶段5 - E的告白',
  loop: 'P5',
  unlockFlags: ['FLAG_E_Is_Accomplice'],
  lines: [
    {
      type: 'narration',
      text: 'E的视角。{delay:1.5}在帮主角处理完一切后，{delay:1}她在日记里写道：'
    },
    {
      type: 'dialogue',
      character: 'E',
      text: '现在，{delay:1}我们是同一种人了。{delay:2}只有我能理解他。{delay:2}我就是他的C。'
    },
    {
      type: 'narration',
      text: '她的扭曲心理，{delay:0.8}像藤蔓一样，{delay:0.5}缠绕住她，{delay:0.5}也缠绕住真相。{delay:1.5}'
    }
  ]
}

