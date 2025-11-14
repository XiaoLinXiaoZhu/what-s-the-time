import type { ScriptSegment } from '@/types'

/**
 * P02-01：第二轮问话，C 被锁定
 * 真实时间：Day A 后几天
 * 建议输入：11:00 + 第二问（例如 09:30）
 */
export const P02_01: ScriptSegment = {
  id: 'P02-01',
  time: '11:00',
  description: '第二轮问话，C 被锁定',
  loop: 'D',
  unlockFlags: [],
  lines: [
    {
      type: 'narration',
      text: '同一间办公室。{br}警官 G 再次坐在我对面。'
    },
    {
      type: 'dialogue',
      character: 'G',
      text: '那天，他有没有情绪激动？'
    },
    {
      type: 'dialogue',
      text: '...有。{br}他最近情绪很不稳定。'
    },
    {
      type: 'dialogue',
      character: 'G',
      text: '具体表现？'
    },
    {
      type: 'dialogue',
      text: '他...{delay:1}经常发脾气。{br}而且，他最近和她走得很近。{br}我担心...{delay:1}我担心他是不是对她做了什么。'
    },
    {
      type: 'narration',
      text: '我小心地构建着"替罪羊形象"。{br}每一句话，都指向那个"他"。{br}让怀疑的种子，慢慢生根发芽。'
    },
    {
      type: 'dialogue',
      character: 'G',
      text: '我知道了。{br}我们会调查的。'
    },
    {
      type: 'dialogue',
      text: '谢谢。{br}我只希望...{delay:1}能找出真相。'
    },
    {
      type: 'choice',
      choices: [
        {
          text: '询问调查进展',
          lines: [
            {
              type: 'dialogue',
              text: '那个...{delay:1}调查有进展吗？'
            },
            {
              type: 'dialogue',
              character: 'G',
              text: '还在进行中。{br}不过，{br}我们已经掌握了一些线索。{br}你不用担心，{br}我们会找出真相的。'
            },
            {
              type: 'dialogue',
              text: '谢谢。'
            },
            {
              type: 'narration',
              text: '我低下头，{br}掩饰住内心的紧张。'
            }
          ]
        },
        {
          text: '保持沉默',
          lines: [
            {
              type: 'narration',
              text: '我保持沉默，{br}没有说话。{br}G 继续写着笔录，{br}房间里只有笔尖划过纸张的声音。'
            }
          ]
        }
      ]
    },
    {
      type: 'dialogue',
      character: 'G',
      text: '你可以回去了。{br}如果想起什么，{br}随时联系我们。'
    },
    {
      type: 'dialogue',
      text: '好。'
    },
    {
      type: 'narration',
      text: '我走出办公室，{br}靠在墙上。{br}G 在笔录上写着什么。{br}我知道，替罪羊已经被锁定了。{br}接下来，{br}只需要等待结果。'
    },
    {
      type: 'narration',
      text: '走廊里，{br}有人提到{bold}十点三十{/bold}的课间，{br}说那时候好像发生了什么。{br}我加快脚步，{br}离开了那里。'
    }
  ]
}

