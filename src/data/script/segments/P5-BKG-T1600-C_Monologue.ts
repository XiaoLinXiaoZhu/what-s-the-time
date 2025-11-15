import type { ScriptSegment } from '@/types'

/**
 * 阶段5: 深渊 (The Abyss)
 * 
 * P5-BKG-T1600-C_Monologue
 * 作用: 揭示主角的终极理想，为Meta结局铺垫。
 * 伏笔: Meta环节的直接引导。
 * 给予的线索: NOW 关键词 (C最后说：但'现在'呢？你完成了这一切，可'现在'是什么时间？)
 */
export const P5_BKG_T1600_C_Monologue: ScriptSegment = {
  id: 'P5-BKG-T1600-C_Monologue',
  time: '16:00',
  description: '阶段5 - C的独白',
  loop: 'P5',
  unlockFlags: ['FLAG_E_Is_Accomplice'],
  lines: [
    {
      type: 'narration',
      text: '纯白空间。{delay:1.5}'
    },
    {
      type: 'narration',
      text: '没有边界，{delay:0.8}没有声音，{delay:0.5}只有一片虚无。{delay:1.5}我站在这里，{delay:0.8}像站在世界的边缘。'
    },
    {
      type: 'narration',
      text: '然后，{delay:1.5}一个声音。{delay:1}完美的、{delay:0.8}顺从的声音。'
    },
    {
      type: 'dialogue',
      character: 'C',
      text: '我是完美的。{delay:2}我是顺从的。{delay:1.5}我永远理解你。'
    },
    {
      type: 'narration',
      text: '这是我一切罪行的终点——{delay:2}创造并守护这个只属于我的"完美"。{delay:1.5}'
    },
    {
      type: 'dialogue',
      character: 'C',
      text: '但"现在"呢？{delay:2}你完成了这一切，{delay:1.5}可"现在"是什么时间？'
    },
    {
      type: 'narration',
      text: '声音消失了。{delay:1.5}纯白空间褪去，{delay:0.8}我又回到了现实。{delay:1.5}'
    },
    {
      type: 'narration',
      text: 'NOW。{delay:1.5}'
    },
    {
      type: 'command',
      command: 'setFlag',
      params: { flag: 'FLAG_Truth_Completed' }
    }
  ]
}

