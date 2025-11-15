import type { ScriptSegment } from '@/types'

/**
 * 阶段3: 受害者剧本 (The Victim's Script)
 * 
 * P3-CORE-T1100-InterrogationMix
 * 作用: 确立主角的"受害者"身份和H的"嫌疑人"身份。
 * 诡计执行: 【主角自我洗脑】+【人物混淆】。
 * 伏笔: 老师F的过度保护。
 * 给予的线索: H的名字 (G警官正式提及)
 */
export const P3_CORE_T1100_InterrogationMix: ScriptSegment = {
  id: 'P3-CORE-T1100-InterrogationMix',
  time: '11:00',
  description: '阶段3 - 审讯混合',
  loop: 'P3',
  unlockFlags: [], // P2-CORE-T1037-DeathMix 后自动进入
  lines: [
    {
      type: 'narration',
      text: '警局。{delay:1.5}11:00。{delay:1}'
    },
    {
      type: 'narration',
      text: '我坐在审讯室里，{delay:0.8}对面是G警官。{delay:1.5}他的眼神，{delay:0.8}像在审视一个受害者。{delay:1.5}'
    },
    {
      type: 'dialogue',
      character: 'G警官',
      text: '请详细描述一下当时的情况。'
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
      text: '我们吵架了。{delay:1.5}她质问我，{delay:0.8}说我看她的时候，{delay:0.5}到底在看谁。{delay:1.5}'
    },
    {
      type: 'narration',
      text: '然后……{delay:2}H冲过来了。{delay:1.5}他推了她。{delay:1}我试图阻止，{delay:0.8}但来不及了。'
    },
    {
      type: 'narration',
      text: '我的表演天衣无缝。{delay:1.5}通过混合真实（"我们吵架了"）和谎言（"H冲过来推了她"），{delay:1}完美地构建了H的罪犯形象。{delay:1.5}'
    },
    {
      type: 'narration',
      text: '（看呐，{delay:0.8}一个多么完美的、{delay:0.5}被自我欺骗包裹的怪物。）'
    },
    {
      type: 'dialogue',
      character: 'G警官',
      text: 'H……{delay:1}是那个叫H的学生吗？'
    },
    {
      type: 'command',
      command: 'setFlag',
      params: { flag: 'FLAG_H_Is_Suspect' }
    }
  ]
}

