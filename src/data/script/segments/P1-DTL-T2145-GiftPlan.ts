import type { ScriptSegment } from '@/types'

/**
 * 阶段1: 糖衣 (The Honeymoon)
 * 
 * P1-DTL-T2145-GiftPlan
 * 作用: 情感锚点的高潮，同时是病态控制的极致展现。
 * 诡计执行: 【非线性线索】。D的反对和主角的坚持，是第一个强烈的矛盾线索。
 * 伏笔: D是第一个明确质疑主角的人。
 * 给予的线索: 22:15 (D无奈地说"你俩聊吧，我先走了")
 */
export const P1_DTL_T2145_GiftPlan: ScriptSegment = {
  id: 'P1-DTL-T2145-GiftPlan',
  time: '21:45',
  description: '阶段1 - 礼物计划',
  loop: 'P1',
  unlockFlags: [], // 通过"生日"关键词触发
  lines: [
    {
      type: 'narration',
      text: '晚上九点四十五分。{delay:1}我和她的朋友在讨论生日礼物。{delay:1.5}'
    },
    {
      type: 'dialogue',
      character: '朋友',
      text: '我觉得送她那个新出的手链不错，{delay:0.8}她一直想要。'
    },
    {
      type: 'narration',
      text: '我否决了。{delay:1.5}不，{delay:0.8}这不够好。{delay:1.5}'
    },
    {
      type: 'dialogue',
      character: '朋友',
      text: '那……{delay:0.8}香水？{delay:1}或者包包？'
    },
    {
      type: 'narration',
      text: '我摇头。{delay:1.5}我选了一本诗集，{delay:0.8}一本她从未表达过兴趣的书。{delay:1.5}'
    },
    {
      type: 'narration',
      text: '我为何要那么做呢？{delay:1.5}大概是因为……{delay:1}她会喜欢的。{delay:1.5}'
    },
    {
      type: 'dialogue',
      character: '朋友',
      text: '你确定吗？{delay:1}我觉得她可能不会……'
    },
    {
      type: 'narration',
      text: '我坚称："她会喜欢的。"{delay:1.5}语气里有一种我自己都没有察觉到的、{delay:0.8}病态的坚持。'
    },
    {
      type: 'narration',
      text: '朋友无奈地看了我一眼。{delay:1.5}那种眼神，{delay:0.8}像在审视一个怪物。{delay:1.5}'
    },
    {
      type: 'dialogue',
      character: '朋友',
      text: '你俩聊吧，{delay:0.8}我先走了。{delay:1}22:15了。'
    },
    {
      type: 'narration',
      text: '22:15。{delay:1.5}'
    },
    {
      type: 'command',
      command: 'setFlag',
      params: { flag: 'FLAG_Relationship_Established' }
    }
  ]
}

