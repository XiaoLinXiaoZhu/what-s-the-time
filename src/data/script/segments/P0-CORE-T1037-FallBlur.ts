import type { ScriptSegment } from '@/types'

/**
 * 阶段0: 初始循环 (The Loop)
 * 
 * P0-CORE-T1037-FallBlur
 * 作用: 建立核心悬念；植入核心时间锚点。
 * 诡计执行: 【时间诡计】的起点。这是哪个10:37？玩家无从得知。
 * 伏笔: "时间不对"是主角对自己记忆污染的无意识抵抗。
 * 给予的线索: 08:05 (内心独白中闪过的念头："一切都应该停在那个完美的早晨")
 */
export const P0_CORE_T1037_FallBlur: ScriptSegment = {
  id: 'P0-CORE-T1037-FallBlur',
  time: '10:37',
  description: '初始循环 - 坠落模糊',
  loop: 'P0',
  unlockFlags: [], // Game_Init - 游戏初始化时即可访问
  lines: [
    {
      type: 'narration',
      text: '风声。{delay:1.2}'
    },
    {
      type: 'narration',
      text: '尖锐的、{delay:0.5}撕裂空气的风声，{delay:0.8}从四面八方涌来，{delay:0.5}将我包裹。'
    },
    {
      type: 'narration',
      text: '某种刺眼的光线从上方渗下来，{delay:0.8}让我感到一阵眩晕。{delay:1}视野里的一切都在旋转，{delay:0.5}失焦，{delay:0.8}像被水浸湿的油画。'
    },
    {
      type: 'narration',
      text: '然后——{delay:1.5}'
    },
    {
      type: 'narration',
      text: '{red}不……{/red}{delay:0.8}停下……{delay:1.2}时间不对。'
    },
    {
      type: 'narration',
      text: '这个念头，{delay:0.8}像一把刀，{delay:0.5}刺破了我的意识。{delay:1}时间不对。{delay:1.5}哪里不对？{delay:1}我试图抓住什么，{delay:0.8}但只有虚无。'
    },
    {
      type: 'narration',
      text: '模糊的红色。{delay:1}像颜料一样，{delay:0.5}在视野里晕开，{delay:0.8}蔓延，{delay:0.5}吞噬一切。'
    },
    {
      type: 'narration',
      text: '尖叫声。{delay:1}是她的声音吗？{delay:1.5}还是……{delay:1}我的？{delay:1.5}我分不清。{delay:1}声音和画面错位，{delay:0.8}像一部坏掉的电影。'
    },
    {
      type: 'narration',
      text: '一切都应该停在那个完美的早晨……{delay:2}08:05……{delay:1.5}那个时间，{delay:0.8}那个瞬间，{delay:1}一切都还是……{delay:1.5}完美的。'
    },
    {
      type: 'narration',
      text: '意识像碎片一样散落。{delay:1.5}我试图拼凑，{delay:1}试图抓住，{delay:0.8}但只有虚无。{delay:1.5}只有风声，{delay:0.8}只有红色，{delay:1}只有……{delay:2}'
    },
    {
      type: 'narration',
      text: '10:37。{delay:2}'
    },
    {
      type: 'command',
      command: 'setFlag',
      params: { flag: 'FLAG_Game_Start' }
    }
  ]
}

