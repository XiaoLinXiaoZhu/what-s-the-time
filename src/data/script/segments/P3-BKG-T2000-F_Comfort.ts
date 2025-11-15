import type { ScriptSegment } from '@/types'

/**
 * 阶段3: 受害者剧本 (The Victim's Script)
 * 
 * P3-BKG-T2000-F_Comfort
 * 作用: 塑造F老师，代表"体制的盲点"。
 * 伏笔: F的善意成了主角的保护伞。
 * 给予的线索: 03:15 (主角挂掉电话，失眠到深夜)
 */
export const P3_BKG_T2000_F_Comfort: ScriptSegment = {
  id: 'P3-BKG-T2000-F_Comfort',
  time: '20:00',
  description: '阶段3 - F的安慰',
  loop: 'P3',
  unlockFlags: ['FLAG_H_Is_Suspect'],
  lines: [
    {
      type: 'narration',
      text: '晚上八点。{delay:1}F老师打电话来。{delay:1.5}'
    },
    {
      type: 'dialogue',
      character: 'F老师',
      text: '你还好吗？{delay:1}相信学校，{delay:1}我们会处理好这件事的。'
    },
    {
      type: 'narration',
      text: '我为何会感到安心呢？{delay:1.5}大概是因为……{delay:1}他的善意，{delay:0.8}成了我的保护伞。{delay:1.5}'
    },
    {
      type: 'narration',
      text: '我挂掉电话，{delay:0.8}失眠到深夜。{delay:1.5}03:15。{delay:1}时间像诅咒一样，{delay:0.8}缠绕住我。{delay:1.5}'
    },
    {
      type: 'narration',
      text: '03:15。{delay:1.5}'
    }
  ]
}

