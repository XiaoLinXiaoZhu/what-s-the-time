import type { ScriptSegment } from '@/types'

/**
 * 阶段2: 裂痕 (The Crack)
 * 
 * P2-CORE-T1037-DeathMix
 * 作用: 【阶段3的入口】"虚构恋爱史"的终结。
 * 诡计执行: 所有诡计的集大成。
 * 伏笔: 声音和画面的错位是最大的破绽。
 * 给予的线索: 11:00 (警笛声)
 */
export const P2_CORE_T1037_DeathMix: ScriptSegment = {
  id: 'P2-CORE-T1037-DeathMix',
  time: '10:37',
  description: '阶段2 - 死亡混合',
  loop: 'P2',
  unlockFlags: ['FLAG_Talk_Is_Coming'],
  lines: [
    {
      type: 'narration',
      text: '10:37。{delay:2}'
    },
    {
      type: 'narration',
      text: '风声。{delay:0.8}尖锐的、{delay:0.5}撕裂空气的风声，{delay:0.8}从四面八方涌来。'
    },
    {
      type: 'dialogue',
      character: '她',
      text: '{red}我不是她！{/red}{delay:1.5}我不是她！'
    },
    {
      type: 'narration',
      text: '她的质问，{delay:0.8}像一把刀，{delay:0.5}刺破了我的谎言。{delay:1.5}'
    },
    {
      type: 'narration',
      text: '然后——{delay:1.5}'
    },
    {
      type: 'narration',
      text: '模糊的红色。{delay:0.8}像颜料一样，{delay:0.5}在视野里晕开，{delay:0.8}蔓延，{delay:0.5}吞噬一切。'
    },
    {
      type: 'narration',
      text: 'H冲上来的身影。{delay:1.5}他的表情，{delay:0.8}像在挣扎。{delay:1.5}'
    },
    {
      type: 'narration',
      text: '声音和画面错位。{delay:1.5}我试图抓住什么，{delay:0.8}但只有虚无。{delay:1.5}'
    },
    {
      type: 'narration',
      text: '警笛声。{delay:1.5}11:00。{delay:1}一切都结束了。{delay:1.5}'
    }
  ]
}

