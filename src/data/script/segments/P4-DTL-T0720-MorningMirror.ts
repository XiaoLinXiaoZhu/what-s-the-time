import type { ScriptSegment } from '@/types'

/**
 * 阶段4: 破绽 (The Unraveling)
 * 
 * P4-DTL-T0720-MorningMirror
 * 作用: 展示主角在犯罪后的日常。
 * 伏笔: 他的人格已经完全工具化。
 */
export const P4_DTL_T0720_MorningMirror: ScriptSegment = {
  id: 'P4-DTL-T0720-MorningMirror',
  time: '07:20',
  description: '阶段4 - 早晨的镜子',
  loop: 'P4',
  unlockFlags: ['FLAG_B_Case_Revealed'],
  lines: [
    {
      type: 'narration',
      text: 'B案发生后的某个清晨。{delay:1.5}07:20。{delay:1}'
    },
    {
      type: 'narration',
      text: '我在镜子前整理仪表，{delay:1.5}练习着悲伤的表情，{delay:1}就像演员上台前一样。{delay:1.5}'
    },
    {
      type: 'narration',
      text: '我为何要那么做呢？{delay:1.5}大概是因为……{delay:1}我害怕失去吧。{delay:1.5}'
    },
    {
      type: 'narration',
      text: '不，{delay:0.8}我是在为自己辩解。{delay:1.5}向一个不存在的法官，{delay:0.8}解释我为何如此。'
    },
    {
      type: 'narration',
      text: '我的人格已经完全工具化。{delay:2}'
    }
  ]
}

