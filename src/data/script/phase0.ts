import type { ScriptSegment } from '@/types'

/**
 * 阶段0: 初始循环 (The Loop)
 * 
 * P0-CORE-T1007-FallBlur
 * 作用: 建立核心悬念；植入核心时间锚点。
 * 诡计执行: 【时间诡计】的起点。这是哪个10:37？玩家无从得知。
 * 伏笔: "时间不对"是主角对自己记忆污染的无意识抵抗。
 */
export const P0_CORE_T1007_FallBlur: ScriptSegment = {
  id: 'P0-CORE-T1007-FallBlur',
  time: '10:37',
  description: '初始循环 - 坠落模糊',
  loop: 'P0',
  unlockFlags: [], // Game_Init - 游戏初始化时即可访问
  lines: [
    {
      type: 'narration',
      text: '风声。{delay:0.8}尖锐的、撕裂空气的风声。'
    },
    {
      type: 'narration',
      text: '某种刺眼的光线从上方渗下来，让我感到一阵眩晕。'
    },
    {
      type: 'narration',
      text: '然后——{delay:1.2}'
    },
    {
      type: 'dialogue',
      text: '{red}不……{/red}{delay:0.5}停下……{delay:0.8}时间不对。'
    },
    {
      type: 'narration',
      text: '模糊的红色。{delay:0.6}像颜料一样，在视野里晕开。'
    },
    {
      type: 'narration',
      text: '尖叫声。{delay:0.5}是她的声音吗？{delay:1}还是……我的？'
    },
    {
      type: 'dialogue',
      text: '一切都应该停在那个完美的早晨……{delay:1.5}08:05……'
    },
    {
      type: 'narration',
      text: '意识像碎片一样散落。{delay:1}我试图抓住什么，但只有虚无。'
    },
    {
      type: 'command',
      command: 'setFlag',
      params: { flag: 'FLAG_Game_Start' }
    }
  ]
}

