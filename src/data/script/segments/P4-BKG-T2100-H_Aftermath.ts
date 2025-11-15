import type { ScriptSegment } from '@/types'

/**
 * 阶段4: 破绽 (The Unraveling)
 * 
 * P4-BKG-T2100-H_Aftermath
 * 作用: 展现替罪羊的悲惨处境。
 */
export const P4_BKG_T2100_H_Aftermath: ScriptSegment = {
  id: 'P4-BKG-T2100-H_Aftermath',
  time: '21:00',
  description: '阶段4 - H的后果',
  loop: 'P4',
  unlockFlags: ['FLAG_H_Is_Innocent'],
  lines: [
    {
      type: 'narration',
      text: '非主角视角。{delay:1.5}H在被停学后，{delay:1}独自坐在公园长椅上。{delay:1.5}'
    },
    {
      type: 'narration',
      text: '他反复看A曾送给他的书，{delay:1.5}神情痛苦而茫然。{delay:1.5}'
    },
    {
      type: 'narration',
      text: '替罪羊的悲惨处境。{delay:2}我的谎言，{delay:0.8}像藤蔓一样，{delay:0.5}缠绕住他，{delay:0.5}也缠绕住真相。{delay:1.5}'
    }
  ]
}

