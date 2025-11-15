import type { ScriptSegment } from '@/types'

/**
 * 阶段2: 裂痕 (The Crack)
 * 
 * P2-BKG-T1730-E_Encounter
 * 作用: 引入E，增加不安感。
 * 诡计执行: 【C+E穿插】。E的出现，让"她"的身份更加扑朔迷离。
 * 伏笔: E知道一些事情。
 * 给予的线索: E的名字 (主角内心模糊地想起她的名字)
 */
export const P2_BKG_T1730_E_Encounter: ScriptSegment = {
  id: 'P2-BKG-T1730-E_Encounter',
  time: '17:30',
  description: '阶段2 - E的相遇',
  loop: 'P2',
  unlockFlags: ['FLAG_Talk_Is_Coming'],
  lines: [
    {
      type: 'narration',
      text: '下午五点半。{delay:1}我在校园里心烦意乱地走着。{delay:1.5}'
    },
    {
      type: 'narration',
      text: '那些声音，{delay:0.8}像潮水一样，{delay:0.5}将我包围，{delay:0.8}又与我无关。{delay:1.5}我试图思考，{delay:0.8}但只有混乱。'
    },
    {
      type: 'narration',
      text: '一个女生走过，{delay:0.8}看了我一眼。{delay:1.5}眼神复杂，{delay:0.8}似乎想说什么，{delay:0.5}但又没说。'
    },
    {
      type: 'narration',
      text: '我停下脚步，{delay:0.8}试图想起她的名字。{delay:1.5}E……{delay:1}是E吗？{delay:1.5}'
    },
    {
      type: 'narration',
      text: '我为何会感到不安呢？{delay:1.5}大概是因为……{delay:1}她的眼神里有什么东西，{delay:0.8}让我感到恐惧。'
    },
    {
      type: 'narration',
      text: '她走远了。{delay:1.5}但那种眼神，{delay:0.8}像烙印一样，{delay:0.5}留在了我的记忆里。{delay:1.5}'
    },
    {
      type: 'command',
      command: 'setFlag',
      params: { flag: 'FLAG_Knows_E' }
    }
  ]
}

