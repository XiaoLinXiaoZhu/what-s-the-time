import type { ScriptSegment } from '@/types'

/**
 * 阶段2: 裂痕 (The Crack)
 * 
 * P2-DTL-T0930-SilentClass
 * 作用: 强化暴风雨前的宁静。
 * 诡计执行: 【主角自我洗脑】。他的内心戏全是如何"赢回"她，而不是反思自己的问题。
 * 伏笔: 他所谓的"谈谈"，是又一次的"控制"。
 */
export const P2_DTL_T0930_SilentClass: ScriptSegment = {
  id: 'P2-DTL-T0930-SilentClass',
  time: '09:30',
  description: '阶段2 - 沉默的课堂',
  loop: 'P2',
  unlockFlags: ['FLAG_Talk_Is_Coming'],
  lines: [
    {
      type: 'narration',
      text: '上午九点半。{delay:1}约谈前的课上，{delay:0.8}气氛冰冷。{delay:1.5}'
    },
    {
      type: 'narration',
      text: '我坐在座位上，{delay:0.8}内心在预演即将到来的谈话。{delay:1.5}思考如何"让她回心转意"。{delay:1.5}'
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
      text: '我的内心戏全是如何"赢回"她，{delay:0.8}而不是反思自己的问题。{delay:1.5}我所谓的"谈谈"，{delay:0.8}是又一次的"控制"。{delay:1.5}'
    },
    {
      type: 'narration',
      text: '（看呐，{delay:0.8}一个多么完美的、{delay:0.5}被自我欺骗包裹的怪物。）'
    }
  ]
}

