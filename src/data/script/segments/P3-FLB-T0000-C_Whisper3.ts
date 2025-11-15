import type { ScriptSegment } from '@/types'

/**
 * 阶段3: 受害者剧本 (The Victim's Script)
 * 
 * P3-FLB-T0000-C_Whisper3
 * 作用: 将主角的罪行合理化。
 * 进入时间: (在阶段3任意核心片段后随机触发)
 * 诡计执行: 【C+E穿插】+【主角自我洗脑】。
 * 伏笔: 主角的心理防线彻底建立。
 */
export const P3_FLB_T0000_C_Whisper3: ScriptSegment = {
  id: 'P3-FLB-T0000-C_Whisper3',
  time: '*', // 在阶段3任意核心片段后随机触发
  description: '阶段3 - C的低语3',
  loop: 'P3',
  unlockFlags: ['FLAG_H_Is_Suspect'],
  lines: [
    {
      type: 'narration',
      text: '纯白空间。{delay:1.5}'
    },
    {
      type: 'narration',
      text: '没有边界，{delay:0.8}没有声音，{delay:0.5}只有一片虚无。{delay:1.5}我站在这里，{delay:0.8}像站在世界的边缘。'
    },
    {
      type: 'narration',
      text: '然后，{delay:1.5}一个声音。{delay:1}冰冷的、{delay:0.8}诱人的声音。'
    },
    {
      type: 'dialogue',
      character: '她',
      text: '是他的错。{delay:1.5}是他污染了你。{delay:1.5}你是为了保护我，{delay:1}才不得不这么做的。{delay:1.5}你是无罪的。'
    },
    {
      type: 'narration',
      text: '声音消失了。{delay:1.5}纯白空间褪去，{delay:0.8}我又回到了现实。{delay:1.5}'
    },
    {
      type: 'narration',
      text: '我为何会相信这个声音呢？{delay:1.5}大概是因为……{delay:1}我太累了吧。{delay:1.5}'
    },
    {
      type: 'narration',
      text: '不，{delay:0.8}我是在为自己辩解。{delay:1.5}向一个不存在的法官，{delay:0.8}解释我为何如此。'
    }
  ]
}

