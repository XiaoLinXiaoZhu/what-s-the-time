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
      text: '风声。{br}{delay:0.8}尖锐的、{delay:0.5}撕裂空气的风声。{br}{delay:0.8}从四面八方涌来，{delay:0.5}将我包裹。{br}{br}{delay:1.0}某种刺眼的光线从上方渗下来，{delay:0.8}让我感到一阵眩晕。{br}{delay:0.8}视野里的一切都在旋转，{delay:0.5}失焦，{delay:0.8}像被水浸湿的油画。{br}{br}{delay:1.2}然后——'
      // 原本为 风声。{delay:0.8}{br}尖锐的、{delay:0.5}撕裂空气的风声，{delay:0.8}从四面八方涌来，{delay:0.5}将我包裹。
      // 这里将第二次风声改为了单独的一句，并且增加换行，可以增加反复的层叠感。
      // {br}{delay:...} 的效果要比 {delay:...}{br} 更自然，因为前者会提前将光标移动到下一行，玩家能够知道还有话没说完
    },
    {
      type: 'dialogue',
      text: '{red}不……{/red}{delay:1.0}{br}停下……'
    },
    {
      type: 'narration',
      text: '{bold}时间不对。{bold}{br}{delay:0.8}这个念头像一把刀刺破了我的意识。{br}{delay:0.8}{red}{typewriter}时间不对{/typewriter}{/red}{br}{delay:1.0}哪里不对？{delay:1.0}{br}我试图抓住什么，{delay:0.8}但只有虚无。' 
      // {br}{delay:...} 的效果要比 {delay:...}{br} 更自然，因为前者会提前将光标移动到下一行，玩家能够知道还有话没说完
      // 这里之前的反问有点过于累赘了，精简之后加上使用 typewriter 效果进行强调，能够让叙事的节奏更紧凑
    },
    {
      type: 'narration',
      text: '模糊的红色，像颜料一样。{br}{delay:1}在视野里晕开，{delay:0.8}蔓延，{delay:0.5}吞噬一切。' 
      // 这里原本是 模糊的红色。{br}{delay:1}像颜料一样 
      // 但是这里的 模糊的红色 没有啥含义……也就是对于玩家没有吸引力，这里将比喻提前，增强画面感
      // 然后再逐步阐述 晕开、蔓延、吞噬
    },
    {
      type: 'narration',
      text: '尖叫声。{br}{delay:0.8}是她的声音吗？{delay:0.6}还是……{delay:0.8}我的？{br}{delay:0.8}像一部坏掉的电影，{delay:0.5}声音和画面错位。'
      // 精简节奏：去掉"我分不清"的重复，缩短delay时间，让紧张感更集中
    },
    {
      type: 'narration',
      text: '一切都应该停在那个完美的早晨……{br}{delay:1.0}{red}{typewriter}08:05{/typewriter}{/red}{delay:0.8}……{br}{delay:0.8}那个瞬间，{delay:0.6}一切都还是……{delay:0.8}完美的。'
      // 这里 typewriter后加一个延时，能够让这个 缓慢打字的效果更加凸显
      // 精简重复：去掉"那个时间"，缩短delay，保持回忆的节奏但不过分拖沓
    },
    {
      type: 'narration',
      text: '意识像碎片一样散落。{br}{delay:0.8}我试图拼凑，{delay:0.6}试图抓住，{delay:0.8}但只有虚无。{br}{delay:0.8}只有风声，{delay:0.5}只有红色，{delay:0.8}只有……'
      // 加快节奏：缩短所有delay，让碎片感更急促，为10:37的揭示做铺垫
    },
    {
      type: 'dialogue',
      text: '{red}……{typewriter}10:37{/typewriter}{/red}{br}{delay:0.8}——手表上的指针，{delay:0.5}停在了这一刻。'
    },
    {
      type: 'narration',
      text: '是吗？{br}{delay:0.8}现在是……{delay:0.6}这个时间吗？{br}{delay:0.8}还是说，{delay:0.6}那只是某一次……{delay:0.6}坠落的时间？{br}{delay:0.8}我想不太清楚。{delay:0.6}大概，{delay:0.4}也不需要想得那么清楚。{br}{delay:0.8}但总得有个答案。{delay:0.6}哪怕，{delay:0.5}只是说给自己听。'
      // 自然过渡：将"我该承认些什么？"改为更具体的引导，让选择项的出现更自然
    },
    {
      type: 'choice',
      choices: [
        {
          text: '这是她坠落的时间。',
          lines: [
            {
              type: 'narration',
              text: '她坠落的时间。{br}{delay:0.8}是的，{delay:0.6}就是{red}{typewriter}10:37{/typewriter}{/red}。{br}{delay:0.8}人们似乎总是需要一个明确的时间点，{delay:0.6}来安放一切，{delay:0.6}来说服自己，{delay:0.5}这一切都是真的。'
              // 自然承接：直接回应前面的疑问，去掉重复的"……是的"，让回应更直接有力
            }
          ]
        },
        {
          text: '不，这只是一个梦。',
          lines: [
            {
              type: 'narration',
              text: '梦。{br}{delay:0.8}对，{delay:0.5}一定是梦。{br}{delay:0.8}可为什么，{delay:0.6}每次醒来，{delay:0.8}我腕上的指针，{delay:0.8}还是停在{red}{typewriter}10:37{/typewriter}{/red}？'
              // 自然承接：缩短delay，让回应更紧凑，直接承接前面的疑问
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

