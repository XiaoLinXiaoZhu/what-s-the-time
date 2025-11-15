import type { ScriptSegment } from '@/types'

/**
 * 阶段5: 深渊 (The Abyss)
 * 
 * P5-CORE-T1037-MetaAwareness
 * 作用: 打破第四面墙的预备阶段。
 * 进入条件: FLAG_Truth_Completed (在此阶段反复输入10:37)
 * 伏笔: 主角开始将责任转移给玩家。
 */
export const P5_CORE_T1037_MetaAwareness: ScriptSegment = {
  id: 'P5-CORE-T1037-MetaAwareness',
  time: '10:37',
  description: '阶段5 - Meta觉醒',
  loop: 'P5',
  unlockFlags: ['FLAG_Truth_Completed'],
  lines: [
    {
      type: 'narration',
      text: '我不再播放记忆，{delay:1.5}而是直接对屏幕说话。{delay:2}'
    },
    {
      type: 'dialogue',
      text: '又是你。{delay:2}你很喜欢看这个，{delay:1}对吗？{delay:2}一遍又一遍。{delay:2}你和我一样，{delay:1.5}都被困在了这里。'
    },
    {
      type: 'narration',
      text: '我开始将责任转移给玩家。{delay:2}'
    },
    {
      type: 'command',
      command: 'setFlag',
      params: { flag: 'FLAG_Meta_Bridge_Built' }
    }
  ]
}

