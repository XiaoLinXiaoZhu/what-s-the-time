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
    { type: 'narration', text: '食堂里弥漫着饭菜的香味和各种交谈声。{br}{delay:0.8}我端着餐盘，在人群中寻找座位。' },
    { type: 'dialogue', character: '她', text: '这里！' },
    { type: 'narration', text: '她向我挥手，指向食堂角落的一个双人座位。{br}{delay:0.8}阳光从窗户斜射进来，在桌面上投下温暖的光斑。' },
    { type: 'dialogue', text: '"还是老地方。"我在她对面坐下，注意到她餐盘里的菜。{br}{delay:0.8}青椒炒肉丝，白米饭，还有一小碗紫菜蛋花汤。' },
    { type: 'dialogue', character: '她', text: '嗯，清淡一点比较舒服。{br}{delay:0.8}你今天的菜看起来……很丰富。' },
    { type: 'narration', text: '我的餐盘里确实放着好几样菜：红烧排骨、炒青菜、蒸蛋，还有汤。{br}{delay:0.8}我习惯性地想要分享。"尝尝这个排骨，很香的。"' },
    { type: 'dialogue', character: '她', text: '谢谢……{br}{delay:0.8}不过我吃这么多会胖的。' },
    { type: 'narration', text: '她笑了笑，用筷子夹了一小块排骨。{br}{delay:0.8}就在这时，一个熟悉的声音从身后传来。' },
    { type: 'dialogue', character: 'D', text: '嘿！原来你们在这里！{br}{delay:0.8}我还以为你们会跑去那家新开的餐厅呢。' },
    { type: 'narration', text: '我转过身，看到她的朋友D端着餐盘走了过来。{br}{delay:0.8}D是个活泼的女生，总是充满了精力。' },
    { type: 'dialogue', character: '她', text: 'D！要不要一起坐？{br}{delay:0.8}这里地方还挺大的。' },
    { type: 'dialogue', character: 'D', text: '好啊！' },
    { type: 'narration', text: 'D在我们旁边坐下，开始了她的长篇大论。{br}{delay:0.8}我注意到她的话题总是围绕着社交活动。' },
    { type: 'dialogue', character: 'D', text: '对了对了！{br}{delay:0.8}今晚七点的电影，你们还记得吧？{br}{delay:0.8}千万别迟到哦，那个影院很严格的。' },
    { type: 'dialogue', character: '她', text: '电影……{br}{delay:0.8}哦对，我差点忘了。' },
    { type: 'narration', text: '我看着她，她的表情有些微妙的变化。{br}{delay:0.8}从期待变成了一种……无奈？或者说是疲惫。' },
    { type: 'dialogue', character: 'D', text: '你怎么了？看起来不太高兴的样子。{br}{delay:0.8}是因为电影票的事情吗？' },
    { type: 'dialogue', character: '她', text: '不是啦，就是……{br}{delay:0.8}没什么。' },
    { type: 'narration', text: 'D的注意力转移到了我身上。' },
    { type: 'dialogue', character: 'D', text: '你呢？你想看什么类型的电影？{br}{delay:0.8}我记得你们男生一般都比较喜欢动作片之类的。' },
    { type: 'dialogue', text: '"动作片也不错，但是……{br}{delay:0.8}我觉得文艺片可能更有深度一些。"{br}{delay:0.8}我看了一眼她，"你觉得呢？"' },
    { type: 'narration', text: '她抬起头，眼中闪过一丝困惑。{br}{delay:0.8}但很快又恢复了那种温和的笑容。' },
    { type: 'dialogue', character: '她', text: '嗯……文艺片也挺好的。{br}{delay:0.8}我觉得哪种类型都行，只要……开心就好。' },
    { type: 'dialogue', character: 'D', text: '哇，你们两个真的很配呢！{br}{delay:0.8}总是这么温柔地商量事情。' },
    { type: 'narration', text: 'D的话让我感到一阵微妙的满足感。{br}{delay:0.8}是的，我们总是这样协商。{br}{delay:0.8}就像一对真正的情侣那样。' },
    { type: 'choice',
      choices: [
        {
          text: '主动提议我们换个安静的地方聊聊',
          lines: [
            { type: 'dialogue', text: '"这里有点吵，要不要我们找个更安静的地方？{br}{delay:0.8}我想和你单独聊聊。"' },
            { type: 'dialogue', character: 'D', text: '哦，那我就不打扰你们了！{br}{delay:0.8}反正我也要去找其他人。' },
            { type: 'narration', text: 'D識趣地离开了。{br}{delay:0.8}我看着她走远的背影，感到一种奇妙的胜利感。' },
            { type: 'dialogue', character: '她', text: '其实……{br}{delay:0.8}不用特意避开D的。' },
            { type: 'dialogue', text: '"我只是觉得，{br}{delay:0.8}我们之间的事情，不需要太多人参与。"' },
            { type: 'command', command: 'setFlag', params: { flag: 'FLAG_Seclusion_Preference' } }
          ],
          setFlag: 'FLAG_Seclusion_Preference'
        },
        {
          text: '询问她对电影的真实想法',
          lines: [
            { type: 'dialogue', text: '"你真的想看文艺片吗？{br}{delay:0.8}还是说，你想看别的？"' },
            { type: 'dialogue', character: '她', text: '我……{br}{delay:0.8}我其实不太确定。' },
            { type: 'narration', text: '她的声音变得很小，仿佛在承认什么秘密。' },
            { type: 'dialogue', character: '她', text: '我比较喜欢轻松一点的电影，{br}{delay:0.8}比如喜剧片之类的。{br}{delay:0.8}但是……' },
            { type: 'dialogue', text: '"但是？"' },
            { type: 'dialogue', character: '她', text: '没什么。{br}{delay:0.8}我觉得文艺片也挺好的。' },
            { type: 'narration', text: '她重新戴上了那种温和的面具。{br}{delay:0.8}我不知道她真正想要的是什么。' },
            { type: 'command', command: 'setFlag', params: { flag: 'FLAG_Hidden_Desires' } }
          ],
          setFlag: 'FLAG_Hidden_Desires'
        },
        {
          text: '和D聊聊，了解她的社交圈',
          lines: [
            { type: 'dialogue', text: 'D，你们平时都去哪里玩？{br}{delay:0.8}感觉你们女孩子的话题总是很有趣。' },
            { type: 'dialogue', character: 'D', text: '哈哈，我们就是瞎聊啊！{br}{delay:0.8}最近新开了一家购物中心，{br}{delay:0.8}要不要一起去看看？' },
            { type: 'narration', text: '她的眼睛亮了起来。{br}{delay:0.8}我知道那个表情——那是真正的兴趣。' },
            { type: 'dialogue', character: '她', text: '购物中心……{br}{delay:0.8}听起来很有意思。' },
            { type: 'narration', text: '我感到一丝微妙的不安。{br}{delay:0.8}那种不安来自于她对别人提议的积极反应。' },
            { type: 'dialogue', text: '"下次吧，{br}{delay:0.8}今天我们先专注于电影的事情。"' },
            { type: 'command', command: 'setFlag', params: { flag: 'FLAG_Social_Monitoring' } }
          ],
          setFlag: 'FLAG_Social_Monitoring'
        }
      ]
    }
  ]
}

