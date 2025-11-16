import type { ScriptSegment } from '@/types'

/**
 * 阶段1: 虚构恋爱史 (The Fictional Romance)
 * 
 * P1-DTL-T0805-Breakfast
 * 作用: 建立"虚构恋爱史"的开端；情感绑定；引入核心事件"生日"。
 * 诡计执行: 【X合一】。这是**她的真实日常**，但玩家会将其视为"恋爱史"的起点。
 * 给予的线索: 12:30 (她说"中午在老地方见")
 * 设置的Flag: FLAG_Knows_B_Persona, FLAG_Birthday_Introduced
 * 伏笔: 她提到下周生日，这是整个P1阶段的"闹钟"；她笑容中的疲惫，暗示着她内心的压力（5%的不适感）。
 */
export const P1_DTL_T0805_Breakfast: ScriptSegment = {
  id: 'P1-DTL-T0805-Breakfast',
  time: '08:05',
  description: '阶段1 - 早餐',
  loop: 'P1',
  unlockFlags: ['FLAG_Game_Start'],
  lines: [
    {
      type: 'narration',
      text: '早晨的阳光透过梧桐叶片的缝隙，像某种精致的花边装饰。{br}{delay:0.8}这是新学校的第一周。一切都应该是完美的。'
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
      type: 'dialogue',
      text: '她突然停下脚步，指着街角那家新开的包子店，眼睛亮晶晶的。{br}{delay:0.8}"我们去试试那个吧？听说皮薄馅大，很香的。"'
    },
    {
      type: 'narration',
      text: '那种期待的表情。{br}{delay:0.8}像某种小动物，在等待投喂。'
    },
    {
      type: 'dialogue',
      text: '我看着她，心里涌起一种奇怪的情绪。不是爱——那种东西太虚假了。{br}{delay:0.8}是一种……占有欲？不对。是保护欲？也不对。{br}{delay:0.8}"你的胃不好，早上吃这么油腻的东西会不舒服的。"'
    },
    {
      type: 'dialogue',
      character: 'B',
      text: '她眨了眨眼，像是被什么小东西绊了一下。{br}{delay:0.8}"可是……偶尔试试也没关系吧？"'
    },
    {
      type: 'dialogue',
      text: '"偶尔？"我笑了笑，去旁边的便利店买了三明治。{br}{delay:0.8}"你看，这个蛋白含量高，营养更均衡。"{br}{delay:0.8}她接过三明治，咬了一口，然后露出一个标准化的笑容。{br}{delay:0.8}"嗯，很好吃。"'
    },
    {
      type: 'narration',
      text: '那种笑容。{br}{delay:0.8}我见过。在很久很久以前，另一个女孩也露出过这样的笑容。{br}{delay:0.8}那种被训练出来的、迎合式的笑容。{br}{delay:0.8}但她的笑容里，似乎还有一丝……疲惫？{br}{delay:0.8}大概是昨晚没睡好吧。'
    },
    {
      type: 'dialogue',
      character: 'B',
      text: '她突然想起什么，转过头看着我。{br}{delay:0.8}"对了，下周我生日，你有空吗？到时候别忘了来哦。"'
    },
    {
      type: 'narration',
      text: '生日。{br}{delay:0.8}我当然知道是哪一天。我当然会去。{br}{delay:0.8}但我不会告诉她具体时间。{br}{delay:0.8}让她自己记住，让她自己期待。{br}{delay:0.8}这样，她才会更依赖我。'
    },
    {
      type: 'dialogue',
      text: '"当然，我会为你准备一个特别的礼物。"'
    },
    {
      type: 'narration',
      text: '她的笑容更甜了，但那一丝疲惫似乎更深了。{br}{delay:0.8}她为什么疲惫？昨晚为什么没睡好？{br}{delay:0.8}大概，只是学习太累了吧。'
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
      text: '我看着她的背影，想起了一个问题。{br}{delay:1.0}{bold}她今天露出的疲惫笑容，是从哪里学来的？{/bold}'
    },
    {
      type: 'command',
      command: 'setFlag',
      params: { flag: 'FLAG_Knows_B_Persona' }
    },
    {
      type: 'command',
      command: 'setFlag',
      params: { flag: 'FLAG_Birthday_Introduced' }
    }
  ]
}

