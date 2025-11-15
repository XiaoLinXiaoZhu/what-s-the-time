import type { ScriptSegment } from '@/types'

/**
 * 阶段4: 破绽 (The Unraveling)
 * 
 * P4-FLB-T1100-B_Interrogation
 * 作用: 展示主角谎言的崩溃。
 * 诡计执行: 【非线性探索】的成果。玩家因为知道了"菠萝包"的秘密，所以能理解主角此刻的窘境。
 * 伏笔: G警官看主角的眼神，从同情变成了怀疑。
 */
export const P4_FLB_T1100_B_Interrogation: ScriptSegment = {
  id: 'P4-FLB-T1100-B_Interrogation',
  time: '11:00',
  description: '阶段4 - B案审讯',
  loop: 'P4',
  unlockFlags: ['FLAG_B_Identified'],
  lines: [
    {
      type: 'narration',
      text: '【两问一锁】解锁B案失踪问话。{delay:2}'
    },
    {
      type: 'narration',
      text: '警局。{delay:1}11:00。{delay:1.5}'
    },
    {
      type: 'dialogue',
      character: 'G警官',
      text: '请详细描述一下当时的情况。'
    },
    {
      type: 'narration',
      text: '我试图复用上次的剧本，{delay:1.5}但话语卡在喉咙里。{delay:1.5}'
    },
    {
      type: 'dialogue',
      character: 'D',
      text: '她给你发了"菠萝包"！{delay:2}你到底对她做了什么？！'
    },
    {
      type: 'narration',
      text: '面对D带着"菠萝包"证据的质问，{delay:1.5}我的说辞漏洞百出。{delay:1.5}'
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
      text: 'G警官看我的眼神，{delay:0.8}从同情变成了怀疑。{delay:1.5}我的谎言，{delay:0.8}像藤蔓一样，{delay:0.5}开始枯萎。{delay:1.5}'
    },
    {
      type: 'command',
      command: 'setFlag',
      params: { flag: 'FLAG_Script_Failed' }
    }
  ]
}

