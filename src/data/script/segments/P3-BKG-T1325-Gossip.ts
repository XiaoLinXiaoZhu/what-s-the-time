import type { ScriptSegment } from '@/types'

/**
 * 阶段3: 受害者剧本 (The Victim's Script)
 * 
 * P3-BKG-T1325-Gossip
 * 作用: 利用舆论强化H的负面形象。
 * 伏笔: E的沉默。
 * 给予的线索: E的名字
 */
export const P3_BKG_T1325_Gossip: ScriptSegment = {
  id: 'P3-BKG-T1325-Gossip',
  time: '13:25',
  description: '阶段3 - 流言',
  loop: 'P3',
  unlockFlags: ['FLAG_H_Is_Suspect'],
  lines: [
    {
      type: 'narration',
      text: '下午一点二十五分。{delay:1}同学们在议论H。{delay:1.5}'
    },
    {
      type: 'dialogue',
      character: '学生A',
      text: '他脾气暴躁，{delay:0.8}早就看X不爽了。'
    },
    {
      type: 'dialogue',
      character: '学生B',
      text: '是啊，{delay:0.8}听说他之前就威胁过她。'
    },
    {
      type: 'narration',
      text: '一个女生(E)在旁边，{delay:0.8}欲言又止。{delay:1.5}她的眼神，{delay:0.8}像在挣扎。{delay:1.5}'
    },
    {
      type: 'narration',
      text: '我为何会注意到她呢？{delay:1.5}大概是因为……{delay:1}她的沉默，{delay:0.8}让我感到不安。{delay:1.5}'
    },
    {
      type: 'command',
      command: 'setFlag',
      params: { flag: 'FLAG_Knows_E' }
    }
  ]
}

