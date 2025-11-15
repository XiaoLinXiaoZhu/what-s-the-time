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
      text: '风声。{delay:0.8}{br}尖锐的、{delay:0.5}撕裂空气的风声，{delay:0.8}从四面八方涌来，{delay:0.5}将我包裹。{br}{br}{delay:1.0}某种刺眼的光线从上方渗下来，{delay:0.8}让我感到一阵眩晕。{br}视野里的一切都在旋转，{delay:0.5}失焦，{delay:0.8}像被水浸湿的油画。{br}{br}{delay:1.2}然后——'
    },
    {
      type: 'dialogue',
      text: '{red}不……{/red}{delay:0.8}停下……'
    },
    {
      type: 'narration',
      text: '时间不对。{br}{br}{delay:1.0}这个念头，{delay:0.8}像一把刀，{delay:0.5}刺破了我的意识。{br}时间不对。{delay:1.0}哪里不对？{br}我试图抓住什么，{delay:0.8}但只有虚无。'
    },
    {
      type: 'narration',
      text: '模糊的红色。{delay:1}像颜料一样，{delay:0.5}在视野里晕开，{delay:0.8}蔓延，{delay:0.5}吞噬一切。{br}{br}{delay:1.0}尖叫声。{delay:1}{br}是她的声音吗？{delay:1.2}{br}还是……{delay:1}我的？{delay:1.2}{br}我分不清。{br}声音和画面错位，{delay:0.8}像一部坏掉的电影。'
    },
    {
      type: 'narration',
      text: '一切都应该停在那个完美的早晨……{delay:1.5}{red}08:05{/red}……{br}那个时间，{delay:0.8}那个瞬间，{delay:1}一切都还是……{delay:1.2}完美的。{br}{br}{delay:1.2}意识像碎片一样散落。{delay:1.2}{br}我试图拼凑，{delay:1}试图抓住，{delay:0.8}但只有虚无。{br}只有风声，{delay:0.8}只有红色，{delay:1}只有……'
    },
    {
      type: 'dialogue',
      text: '{red}……{typewriter}10:37{/typewriter}。{/red}'
    },
    {
      type: 'narration',
      text: '是吗？{delay:0.8}现在是……{delay:0.8}这个时间吗？{br}还是说，{delay:0.5}那只是某一次……{delay:0.8}坠落的时间？{br}{br}{delay:1.0}我想不太清楚。{delay:1}大概，{delay:0.5}也不需要想得那么清楚。{br}{br}{delay:1.2}或者……{delay:0.8}我该承认些什么？'
    },
    {
      type: 'choice',
      choices: [
        {
          text: '这是她坠落的时间。',
          lines: [
            {
              type: 'narration',
              text: '……是的。{delay:1}{br}她坠落的时间。{br}{br}{delay:1.0}人们似乎总是需要一个{delay:0.5}明确的时间点，{delay:0.8}来安放一切。'
            }
          ]
        },
        {
          text: '不，这只是一个梦。',
          lines: [
            {
              type: 'narration',
              text: '梦。{delay:1}对，{delay:0.5}一定是梦。{br}{br}{delay:1.0}可为什么，{delay:0.5}每次醒来，{delay:0.8}我腕上的指针，{delay:0.8}还是停在{red}10:37{/red}？'
            }
          ]
        }
      ]
    },
    {
      type: 'command',
      command: 'setFlag',
      params: { flag: 'FLAG_Game_Start' }
    }
  ]
}

