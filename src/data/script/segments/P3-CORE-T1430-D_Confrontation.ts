import type { ScriptSegment } from '@/types'

/**
 * 阶段3: 受害者剧本 (The Victim's Script)
 * 
 * P3-CORE-T1430-D_Confrontation
 * 作用: 首次出现强烈的外部质疑，开启破绽。
 * 诡计执行: 【非线性探索】。D的质问与主流的"H是凶手"叙事形成强烈冲突。
 * 伏笔: 玩家第一次意识到，"失踪"和"死亡"可能是两件事。
 * 给予的线索: D的名字
 */
export const P3_CORE_T1430_D_Confrontation: ScriptSegment = {
  id: 'P3-CORE-T1430-D_Confrontation',
  time: '14:30',
  description: '阶段3 - D的对峙',
  loop: 'P3',
  unlockFlags: ['FLAG_H_Is_Suspect'],
  lines: [
    {
      type: 'narration',
      text: 'B失踪后。{delay:1.5}D在走廊拦住我。{delay:1}'
    },
    {
      type: 'dialogue',
      character: 'D',
      text: '{red}她给你发了"菠萝包"！{/red}{delay:2}你到底对她做了什么？！'
    },
    {
      type: 'narration',
      text: '她的愤怒，{delay:0.8}像一把刀，{delay:0.5}刺破了我的谎言。{delay:1.5}'
    },
    {
      type: 'narration',
      text: '我一脸茫然地否认。{delay:1.5}"菠萝包"？{delay:1}我不知道你在说什么。'
    },
    {
      type: 'narration',
      text: '我为何要那么做呢？{delay:1.5}大概是因为……{delay:1}我害怕失去吧。{delay:1.5}'
    },
    {
      type: 'narration',
      text: '不，{delay:0.8}我是在为自己辩解。{delay:1.5}向一个不存在的法官，{delay:0.8}解释我为何如此。'
    },
    {
      type: 'narration',
      text: 'D的质问与主流的"H是凶手"叙事形成强烈冲突。{delay:1.5}玩家第一次意识到，{delay:1}"失踪"和"死亡"可能是两件事。{delay:1.5}'
    },
    {
      type: 'command',
      command: 'setFlag',
      params: { flag: 'FLAG_D_Is_Investigating' }
    }
  ]
}

