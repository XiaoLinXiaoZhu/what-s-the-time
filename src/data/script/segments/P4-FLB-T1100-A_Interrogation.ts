import type { ScriptSegment } from '@/types'

/**
 * 阶段4: 破绽 (The Unraveling)
 * 
 * P4-FLB-T1100-A_Interrogation
 * 作用: 揭示栽赃过程。
 * 诡计执行: 【主角自我洗脑】。玩家能看到主角在说谎时，连他自己都信了。
 * 伏笔: G警官记录时，笔尖的犹豫。
 */
export const P4_FLB_T1100_A_Interrogation: ScriptSegment = {
  id: 'P4-FLB-T1100-A_Interrogation',
  time: '11:00',
  description: '阶段4 - A案审讯',
  loop: 'P4',
  unlockFlags: ['FLAG_A_Identified'],
  lines: [
    {
      type: 'narration',
      text: '【两问一锁】解锁A案问话。{delay:2}'
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
      text: '我为何会相信这个谎言呢？{delay:1.5}大概是因为……{delay:1}我太累了吧。{delay:1.5}'
    },
    {
      type: 'narration',
      text: '不，{delay:0.8}我是在为自己辩解。{delay:1.5}向一个不存在的法官，{delay:0.8}解释我为何如此。'
    },
    {
      type: 'narration',
      text: '玩家能看到我在说谎时，{delay:0.8}连我自己都信了。{delay:1.5}G警官记录时，{delay:0.8}笔尖的犹豫。{delay:1.5}'
    },
    {
      type: 'command',
      command: 'setFlag',
      params: { flag: 'FLAG_H_Is_Innocent' }
    }
  ]
}

