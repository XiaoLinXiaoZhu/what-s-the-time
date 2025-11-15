import type { ScriptSegment } from '@/types'

/**
 * 阶段1: 糖衣 (The Honeymoon)
 * 
 * P1-DTL-T1230-Lunch
 * 作用: 引入D，强化日常感。
 * 诡计执行: 【人物混淆】。D被模糊成一个无名的、功能性的"朋友"角色。
 * 伏笔: 主角的控制欲延申到对恋人社交圈的排斥。
 * 给予的线索: 19:00 (朋友提到"晚上电影别迟到")
 */
export const P1_DTL_T1230_Lunch: ScriptSegment = {
  id: 'P1-DTL-T1230-Lunch',
  time: '12:30',
  description: '阶段1 - 午餐',
  loop: 'P1',
  unlockFlags: ['FLAG_Knows_B_Persona'],
  lines: [
    {
      type: 'narration',
      text: '食堂里人声嘈杂。{delay:1}那些声音，{delay:0.5}像潮水一样，{delay:0.8}将我包围，{delay:0.5}又与我无关。'
    },
    {
      type: 'narration',
      text: '她坐在我对面，{delay:0.8}小口地吃着三明治。{delay:1}那种动作，{delay:0.5}像在表演一场戏。{delay:1}我看着她，{delay:0.8}试图从她的表情里读出什么，{delay:0.5}但只有模糊。'
    },
    {
      type: 'dialogue',
      character: '朋友',
      text: '嘿，{delay:0.5}你们在这里啊！'
    },
    {
      type: 'narration',
      text: '一个女生走过来，{delay:0.8}熟稔地拍了拍她的肩膀。{delay:1}我礼貌地点头，{delay:0.8}但内心涌起一种类似厌恶的、{delay:0.5}沉重的东西。'
    },
    {
      type: 'narration',
      text: '她侵入了我们的二人世界。{delay:1.5}这种想法，{delay:0.8}旁人看来或许很奇怪吧。{delay:1.5}但我只是……{delay:1}想要保护属于我们的空间。'
    },
    {
      type: 'dialogue',
      character: '朋友',
      text: '晚上电影别迟到哦！{delay:0.8}19:00。'
    },
    {
      type: 'narration',
      text: '她笑着应了一声。{delay:1.5}我看着她们，{delay:0.8}一种疏离感将我包裹。{delay:1.5}'
    },
    {
      type: 'narration',
      text: '（普通人）在这种时候，{delay:0.8}似乎应该会感到开心吧。{delay:1.5}但我一滴喜悦也流不出来。'
    },
    {
      type: 'narration',
      text: '19:00。{delay:1}电影。{delay:1.5}'
    },
    {
      type: 'command',
      command: 'setFlag',
      params: { flag: 'FLAG_Knows_D_Vaguely' }
    }
  ]
}

