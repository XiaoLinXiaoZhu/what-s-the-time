import type { ScriptSegment } from '@/types'

/**
 * 阶段1: 糖衣 (The Honeymoon)
 *
 * P1-DTL-T0805-Breakfast
 * 作用: 建立"虚构恋爱史"的开端；情感绑定。
 * 诡计执行: 【X合一】。这是B的真实日常，但玩家会将其视为"X恋爱史"的起点。
 * 伏笔: 她笑容中的疲惫。
 * 给予的线索: 12:30 (她说"中午在老地方见")
 */
export const P1_DTL_T0805_Breakfast: ScriptSegment = {
  id: 'P1-DTL-T0805-Breakfast',
  time: '08:05',
  description: '阶段1 - 早餐',
  loop: 'P1',
  unlockFlags: ['FLAG_Game_Start'],
  lines: [
    { type: 'narration', text: '早晨的阳光透过梧桐叶片的缝隙，像某种精致的花边装饰。{br}{delay:0.8}这是新学校的第一周。一切都应该是完美的。' },
    { type: 'dialogue', text: '她指着街角那家新开的包子店，眼睛亮晶晶的。"我们去试试那个吧？听说皮薄馅大，很香的。"' },
    { type: 'dialogue', text: '我看着她，心里涌起一种奇怪的情绪。不是爱——那种东西太虚假了。{br}{delay:0.8}是一种……占有欲？不对。是保护欲？也不对。{br}{delay:0.8}"你的胃不好，早上吃这么油腻的东西会不舒服的。"' },
    { type: 'dialogue', text: '她眨了眨眼，像是被什么小东西绊了一下。"可是……偶尔试试也没关系吧？"' },
    { type: 'dialogue', text: '"偶尔？"我笑了笑，去旁边的便利店买了三明治。{br}{delay:0.8}"你看，这个蛋白含量高，营养更均衡。"{br}{delay:0.8}她接过三明治，咬了一口，然后露出一个标准化的笑容。"嗯，很好吃。"' },
    { type: 'narration', text: '那种笑容。{br}{delay:0.8}我见过。在很久很久以前，另一个女孩也露出过这样的笑容。{br}{delay:0.8}那种被训练出来的、迎合式的笑容。' },
    { type: 'dialogue', text: '"中午的时候，我们还是去那个老地方吧。"她走在前面，声音里没有任何起伏。{br}{delay:0.8}"还是老地方。"我重复着，仿佛在确认什么。' },
    { type: 'narration', text: '我看着她的背影，想起了一个问题。{br}{delay:1}她今天露出的疲惫笑容，是从哪里学来的？' }
  ]
}

