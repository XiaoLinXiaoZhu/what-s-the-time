import type { ScriptSegment } from '@/types'

/**
 * 阶段1: 虚构恋爱史 (The Fictional Romance)
 * 
 * P1-DTL-T0900-MorningWalk
 * 作用: 强化日常感；强化情感锚点；围绕生日准备展开。
 * 诡计执行: 【X合一】。强化玩家对她的情感投入。
 * 给予的线索: 12:30 (她提到"中午在老地方见")，或者不给线索
 * 设置的Flag: 
 * 伏笔: 甜蜜中的诡异（5%的不适感）。
 */
export const P1_DTL_T0900_MorningWalk: ScriptSegment = {
  id: 'P1-DTL-T0900-MorningWalk',
  time: '09:00',
  description: '阶段1 - 早晨散步',
  loop: 'P1',
  unlockFlags: ['FLAG_Birthday_Introduced'],
  lines: [
    {
      type: 'narration',
      text: '教学楼附近，课间。{br}{delay:0.8}初秋的早晨，空气里有一种类似清冷的、透明的质感。'
    },
    {
      type: 'dialogue',
      text: '她走在我身边，正在分享昨晚看的电视剧。声音轻快，像某种清脆的、会跳跃的音符。{br}{delay:0.8}"你看了吗？那个男主角最后的选择，我觉得太可惜了。明明可以在一起的。"'
    },
    {
      type: 'narration',
      text: '我听着，偶尔点头。心里却在想别的事情。{br}{delay:0.8}不是爱——那种东西太虚假了。{br}{delay:0.8}是一种……占有欲？不对。是保护欲？也不对。{br}{delay:0.8}大概，只是因为她需要我。'
    },
    {
      type: 'narration',
      text: '我们路过几个同学，他们正在议论什么。'
    },
    {
      type: 'dialogue',
      text: '"听说了吗？那个男生又被叫去问话了。"'
    },
    {
      type: 'dialogue',
      text: '"哪个？"'
    },
    {
      type: 'dialogue',
      text: '"就是那个H啊。总是惹事，脾气差得像疯狗一样。"'
    },
    {
      type: 'narration',
      text: '{red}H{/red}。{br}{delay:0.8}那个名字像某种尖锐的东西，刺破了我的意识。'
    },
    {
      type: 'dialogue',
      character: 'B',
      text: '她突然停下脚步，好奇地问："那个男生是谁？"'
    },
    {
      type: 'narration',
      text: '她不应该知道。{br}{delay:0.8}她不应该好奇。{br}{delay:0.8}她不应该……'
    },
    {
      type: 'dialogue',
      text: '"就是那个总是惹事的家伙。"一个同学回答，"听说昨天又在图书馆跟人起冲突了。"'
    },
    {
      type: 'narration',
      text: '图书馆。{br}{delay:0.8}她不应该去那里。{br}{delay:0.8}那里是……'
    },
    {
      type: 'narration',
      text: '我看着她，注意到她的表情变得微妙。{br}{delay:0.8}那种微妙的表情。{br}{delay:0.8}像某种被压抑的、想要说什么但没有说的东西。{br}{delay:0.8}她认识他吗？{br}{delay:0.8}她不应该认识他。'
    },
    {
      type: 'narration',
      text: '{red}{typewriter}14:00{/typewriter}{/red}那天，那个男生似乎找她说过什么。{br}{delay:0.8}我记得。{br}{delay:0.8}我记得那个场景。{br}{delay:0.8}那个男生看着她，眼神里有一种……{br}{delay:0.8}不。{br}{delay:0.8}她不应该认识他。{br}{delay:0.8}她只是好奇。{br}{delay:0.8}只是好奇而已。'
    },
    {
      type: 'dialogue',
      character: 'B',
      text: '"你认识他吗？"她突然问我。'
    },
    {
      type: 'narration',
      text: '我认识他吗？{br}{delay:0.8}我不应该认识他。{br}{delay:0.8}但她不应该认识他。'
    },
    {
      type: 'dialogue',
      text: '"不认识。"我回答，声音平静。'
    },
    {
      type: 'narration',
      text: '但内心，有一种类似敌意的东西，在慢慢升起。'
    },
    {
      type: 'narration',
      text: '她听到我的回答，表情变得更加微妙。{br}{delay:0.8}那种微妙的表情。{br}{delay:0.8}像某种被压抑的、想要说什么但没有说的东西。{br}{delay:0.8}她为什么会有这种表情？{br}{delay:0.8}她不应该有这种表情。{br}{delay:0.8}她不应该认识他。{br}{delay:0.8}她不应该去图书馆。{br}{delay:0.8}她不应该……'
    },
    {
      type: 'dialogue',
      character: 'B',
      text: '"中午的时候，我们还是去那个老地方吧。"她走在前面，声音里没有任何起伏。'
    },
    {
      type: 'dialogue',
      text: '"还是老地方。"我重复着，仿佛在确认什么。'
    },
    {
      type: 'narration',
      text: '老地方。{br}{delay:0.8}那是我们的地方。{br}{delay:0.8}只有我们两个人知道的地方。{br}{delay:0.8}{red}{typewriter}12:30{/typewriter}{/red}。{br}{delay:0.8}中午{red}{typewriter}12:30{/typewriter}{/red}，在老地方。{br}{delay:0.8}我会记住的。{br}{delay:0.8}但她不需要知道，我已经记住了。'
    },
    {
      type: 'narration',
      text: '我看着她的背影，想起了一个问题。{br}{delay:1.0}{bold}那个男生，为什么她听到他的名字，会有那种微妙的表情？{/bold}'
    }
  ]
}

