import type { ScriptSegment } from '@/types'

/**
 * P01-06：11:00 学校第一次问话（旧案）
 * 真实时间：Day A 当天 11:00
 * 建议输入：11:00（第一次命中）
 */
export const P01_06: ScriptSegment = {
  id: 'P01-06',
  time: '11:00',
  description: '11:00 学校第一次问话（旧案）',
  loop: 'C',
  unlockFlags: ['loop_b_complete'],
  lines: [
    {
      type: 'narration',
      text: '教务处。{br}老师坐在对面，表情严肃。'
    },
    {
      type: 'dialogue',
      character: 'F',
      text: '当时发生了什么？'
    },
    {
      type: 'dialogue',
      text: '我们...{delay:1}在楼顶聊天。'
    },
    {
      type: 'dialogue',
      character: 'F',
      text: '然后呢？'
    },
    {
      type: 'dialogue',
      text: '她情绪有点激动。{br}想往外走。{br}我没拉住她。'
    },
    {
      type: 'dialogue',
      character: 'F',
      text: '你确定是意外？'
    },
    {
      type: 'dialogue',
      text: '...嗯。{br}我没拉住她。'
    },
    {
      type: 'narration',
      text: '我低着头，不敢看老师的眼睛。{br}全程只用"她""那天"这些词。{br}不说名字，不说细节。{br}只说"意外"。'
    },
    {
      type: 'dialogue',
      character: 'F',
      text: '你先回去休息吧。{br}如果想起什么，随时告诉我。'
    },
    {
      type: 'dialogue',
      text: '好。'
    },
    {
      type: 'dialogue',
      character: 'F',
      text: '对了，{bold}中午十二点三十{/bold}，{br}警官会来做个正式笔录。{br}你准备一下。'
    },
    {
      type: 'dialogue',
      text: '...好。'
    },
    {
      type: 'narration',
      text: '我走出办公室，靠在墙上。{br}手还在抖。{br}但我知道，第一关，过了。{br}接下来，{br}还有更多要面对。'
    }
  ]
}

