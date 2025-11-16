import type { ScriptSegment } from '@/types'

/**
 * 阶段1: 糖衣 (The Honeymoon)
 * 
 * P1-FLB-T0000-C_Whisper1
 * 作用: 首次引入"理想她"C，打破日常氛围。
 * 诡计执行: 【C+E穿插】。让玩家首次接触到"第三个她"的存在，增加神秘感。
 * 伏笔: C是主角所有行为的内在驱动力。
 */
export const P1_FLB_T0000_C_Whisper1: ScriptSegment = {
  id: 'P1-FLB-T0000-C_Whisper1',
  time: '*', // 随机触发
  description: '阶段1 - C的低语1',
  loop: 'P1',
  unlockFlags: ['FLAG_Control_Established'],
  lines: [
    {
      type: 'narration',
      text: '纯白空间。{br}{delay:0.8}某种刺眼的光线，从四面八方涌来，将我包裹。{br}{delay:0.8}没有声音。{br}{delay:0.8}没有颜色。{br}{delay:0.8}只有……{br}{delay:1.0}她。'
    },
    {
      type: 'narration',
      text: '一个听不清具体面容的"她"。{br}{delay:0.8}她的声音，像某种轻柔的、会飘散的东西，在空气中弥漫。'
    },
    {
      type: 'dialogue',
      character: 'C',
      text: '"这才对。一切都应该是我喜欢的样子。"'
    },
    {
      type: 'choice',
      choices: [
        {
          text: '这才对。一切都应该是我喜欢的样子。',
          lines: [
            {
              type: 'narration',
              text: '这才对。{br}{delay:0.8}一切都应该是我喜欢的样子。{br}{delay:0.8}她。{br}{delay:0.8}那个……完美的她。{br}{delay:0.8}那个我心中理想的她。'
            }
          ]
        },
        {
          text: '那个完美的她',
          lines: [
            {
              type: 'narration',
              text: '她。{br}{delay:0.8}那个……完美的她。{br}{delay:0.8}那个我心中理想的她。{br}{delay:0.8}这才对。{br}{delay:0.8}一切都应该是我喜欢的样子。'
            }
          ]
        },
        {
          text: '她是我所有行为的内在驱动力',
          lines: [
            {
              type: 'narration',
              text: '她。{br}{delay:0.8}那个……完美的她。{br}{delay:0.8}那个我心中理想的她。{br}{delay:0.8}她是我所有行为的内在驱动力。{br}{delay:0.8}她是我所有行为的根源。{br}{delay:0.8}她是我所有行为的……'
            }
          ]
        }
      ]
    },
    {
      type: 'narration',
      text: '她应该喜欢诗集。{br}{delay:0.8}她应该喜欢文艺片。{br}{delay:0.8}她应该……{br}{delay:0.8}她应该只依赖我。{br}{delay:0.8}她不应该依赖别人。{br}{delay:0.8}她不应该……'
    },
    {
      type: 'narration',
      text: '她。{br}{delay:0.8}那个……完美的她。{br}{delay:0.8}那个我心中理想的她。{br}{delay:0.8}她应该只依赖我。{br}{delay:0.8}她不应该依赖别人。{br}{delay:0.8}她不应该……'
    },
    {
      type: 'narration',
      text: '纯白空间。{br}{delay:0.8}某种刺眼的光线，从四面八方涌来，将我包裹。{br}{delay:0.8}没有声音。{br}{delay:0.8}没有颜色。{br}{delay:0.8}只有……{br}{delay:1.0}她。'
    },
    {
      type: 'narration',
      text: '一个听不清具体面容的"她"。{br}{delay:0.8}她的声音，像某种轻柔的、会飘散的东西，在空气中弥漫。'
    },
    {
      type: 'dialogue',
      character: 'C',
      text: '"这才对。一切都应该是我喜欢的样子。"'
    },
    {
      type: 'narration',
      text: '这才对。{br}{delay:0.8}一切都应该是我喜欢的样子。{br}{delay:0.8}她。{br}{delay:0.8}那个……完美的她。{br}{delay:0.8}那个我心中理想的她。{br}{delay:0.8}她应该只依赖我。{br}{delay:0.8}她不应该依赖别人。{br}{delay:0.8}她不应该……'
    },
    {
      type: 'command',
      command: 'setFlag',
      params: { flag: 'FLAG_Knows_C_Vaguely' }
    }
  ]
}
