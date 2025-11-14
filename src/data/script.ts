import type { ScriptSegment } from '@/types'

/**
 * 剧本数据
 * 使用 TypeScript 直接定义，支持类型检查和 IDE 自动补全
 * 
 * 格式说明：
 * - DialogueLine: { type: 'dialogue', character?: '角色名', text: '对话内容' }
 * - NarrationLine: { type: 'narration', text: '场景描述' }
 * - ChoiceLine: { type: 'choice', choices: [...] }
 * - 文本格式标记：{red}红色文本{/red} {bold}粗体{/bold} {italic}斜体{/italic} {br}换行
 */
/**
 * 开场片段（特殊片段，time 为 'START'）
 */
export const startSegment: ScriptSegment = {
  id: 'START',
  time: 'START',
  description: '游戏开场',
  loop: 'START',
  unlockFlags: [],
  lines: [
    {
      type: 'narration',
      text: '时间是……？'
    },
    {
      type: 'dialogue',
      text: '不，是{delay:1}  {bold}他{/bold}  在问我。'
    },
    {
      type: 'dialogue',
      text: '{red}时间是:{/red}'
    },
    {
      type: 'input',
      placeholder: '输入时间 (HH:MM)'
    }
  ]
}

export const scriptSegments: ScriptSegment[] = [
  // 阶段 0：A 案前（普通恋爱期 & 预兆）
  {
    id: 'P00-01',
    time: '08:05',
    description: 'A 和主角的"正常早晨"（闪回）',
    loop: 'A',
    unlockFlags: [],
    lines: [
      {
        type: 'narration',
        text: '早晨的阳光很温柔。{br}我们并肩走在去学校的路上。'
      },
      {
        type: 'dialogue',
        character: 'A',
        text: '今天想吃什么早餐？'
      },
      {
        type: 'dialogue',
        text: '我看了看她，然后说——'
      },
      {
        type: 'dialogue',
        text: '还是老样子吧。三明治和牛奶，对胃好。'
      },
      {
        type: 'dialogue',
        character: 'A',
        text: '嗯...{delay:1}其实我想试试那家新开的包子铺。'
      },
      {
        type: 'dialogue',
        text: '我停下脚步，看着她。'
      },
      {
        type: 'dialogue',
        text: '三明治更有营养。而且你昨天不是说胃不舒服吗？'
      },
      {
        type: 'dialogue',
        character: 'A',
        text: '...{italic}好吧{/italic}。'
      },
      {
        type: 'narration',
        text: '她点点头，嘴角还挂着笑。{br}但我注意到，那笑容里有一丝...{delay:1}{red}疲惫{/red}？'
      },
      {
        type: 'dialogue',
        text: '走吧，要迟到了。'
      },
      {
        type: 'narration',
        text: '我牵起她的手，继续往前走。{br}她的手很软，很温暖。{br}就像这段关系一样，看起来完美无缺。'
      }
    ]
  },

  // Loop A: 完全伪日常
  {
    id: 'P03-01',
    time: '08:05',
    description: '和 B 一起上学（伪恋爱开场）',
    loop: 'A',
    unlockFlags: [],
    lines: [
      {
        type: 'narration',
        text: '早晨的上学路。阳光透过树叶洒下来。'
      },
      {
        type: 'dialogue',
        character: 'B',
        text: '一年前那件事，你现在还好吗？'
      },
      {
        type: 'dialogue',
        text: '我点点头，没有回答。'
      }
    ]
  },
  {
    id: 'P03-02',
    time: '12:10',
    description: '教室午餐·B & D & E 同场',
    loop: 'A',
    unlockFlags: [],
    lines: [
      {
        type: 'narration',
        text: '教室午休时间。'
      },
      {
        type: 'dialogue',
        character: 'B',
        text: '给你，我多带了一份。'
      },
      {
        type: 'dialogue',
        character: 'D',
        text: '你们很配嘛。'
      },
      {
        type: 'narration',
        text: 'E 路过门口，多看了我一眼。'
      }
    ]
  },
  {
    id: 'P03-03',
    time: '18:40',
    description: '垃圾袋 + 锯子（伪日常版）',
    loop: 'A',
    unlockFlags: [],
    lines: [
      {
        type: 'narration',
        text: '我提着垃圾袋，旁边放着锯子。'
      },
      {
        type: 'dialogue',
        text: '家里农活用的工具。'
      }
    ]
  },
  {
    id: 'P03-04',
    time: '23:15',
    description: '夜间独白·软版本',
    loop: 'A',
    unlockFlags: [],
    lines: [
      {
        type: 'narration',
        text: '夜晚。我躺在床上。'
      },
      {
        type: 'dialogue',
        text: '时间过得真快...真慢...时间是...'
      },
      {
        type: 'narration',
        text: '话停住了。'
      }
    ]
  },

  // Loop B: B 消失后的日常错位
  {
    id: 'P06-01',
    time: '08:05',
    description: '空路·B 消失',
    loop: 'B',
    unlockFlags: ['loop_a_complete'],
    lines: [
      {
        type: 'narration',
        text: '空荡荡的路。B 不在。'
      },
      {
        type: 'dialogue',
        character: 'D',
        text: '她怎么没来？'
      }
    ]
  },
  {
    id: 'P06-02',
    time: '12:10',
    description: '空座位与便利贴',
    loop: 'B',
    unlockFlags: ['loop_a_complete'],
    lines: [
      {
        type: 'narration',
        text: 'B 的座位空着。桌上留着一张便利贴。'
      },
      {
        type: 'dialogue',
        text: '但我看不清上面写了什么。'
      }
    ]
  },

  // Loop C: 假闪回与旧案影子
  {
    id: 'P01-03',
    time: '10:07',
    description: 'A 被推下（假闪回版）',
    loop: 'C',
    unlockFlags: ['loop_b_complete'],
    lines: [
      {
        type: 'narration',
        text: '楼顶。模糊的记忆。'
      },
      {
        type: 'narration',
        text: '她踉跄着，然后...坠落。'
      },
      {
        type: 'dialogue',
        text: '我没拉住她。'
      }
    ]
  },
  {
    id: 'P01-01',
    time: '08:20',
    description: 'A 发约楼顶的消息',
    loop: 'C',
    unlockFlags: ['loop_b_complete'],
    lines: [
      {
        type: 'narration',
        text: '手机屏幕上显示一条消息：'
      },
      {
        type: 'dialogue',
        character: 'A',
        text: '等会儿上去聊聊。'
      },
      {
        type: 'narration',
        text: '时间戳：{bold}08:20{/bold}'
      }
    ]
  },

  // 时间匹配分支示例：10:07 真相版
  {
    id: 'P01-04',
    time: '10:07',
    description: 'A 被推下（使用时间匹配分支）',
    loop: 'D',
    unlockFlags: [],
    lines: [
      {
        type: 'narration',
        text: '楼顶。模糊的记忆。'
      },
      {
        type: 'dialogue',
        text: '我需要更清楚地回忆...'
      },
      {
        type: 'timeChoice',
        choices: [
          {
            time: '08:20',
            setFlag: 'saw_p01_01_detail',
            lines: [
              {
                type: 'narration',
                text: '楼顶。清晰的记忆。'
              },
              {
                type: 'dialogue',
                character: 'A',
                text: '我们分手吧。'
              },
              {
                type: 'narration',
                text: '我抓住她的手腕，有意识地...多推了一点点。'
              }
            ]
          },
          {
            time: '*',
            lines: [
              {
                type: 'narration',
                text: '记忆依然模糊。'
              },
              {
                type: 'dialogue',
                text: '我想不起来了...'
              }
            ]
          }
        ]
      }
    ]
  },

  // ========== 示例：多分支选择 ==========
  {
    id: 'EXAMPLE-01',
    time: '09:00',
    description: '示例：选择分支',
    loop: 'A',
    unlockFlags: [],
    lines: [
      {
        type: 'narration',
        text: '你站在十字路口，不知道该往哪里走。'
      },
      {
        type: 'choice',
        choices: [
          {
            text: '向左走',
            setFlag: 'went_left',
            lines: [
              {
                type: 'narration',
                text: '你选择了向左走。'
              },
              {
                type: 'dialogue',
                text: '这条路看起来很熟悉...'
              },
              {
                type: 'dialogue',
                text: '似乎有什么在召唤着你。'
              }
            ]
          },
          {
            text: '向右走',
            setFlag: 'went_right',
            lines: [
              {
                type: 'narration',
                text: '你选择了向右走。'
              },
              {
                type: 'dialogue',
                text: '这里似乎有什么不对劲...'
              },
              {
                type: 'dialogue',
                text: '空气中弥漫着一种不安的气息。'
              }
            ]
          },
          {
            text: '站在原地',
            lines: [
              {
                type: 'narration',
                text: '你决定站在原地。'
              },
              {
                type: 'dialogue',
                text: '也许等待是最好的选择...'
              },
              {
                type: 'dialogue',
                text: '时间会给出答案。'
              }
            ]
          }
        ]
      }
    ]
  },

  // ========== 示例：选择分支 + 时间匹配分支组合 ==========
  {
    id: 'SCENE-01',
    time: '14:00',
    description: '发现线索',
    loop: 'B',
    unlockFlags: [],
    lines: [
      {
        type: 'narration',
        text: '你发现了一张纸条。'
      },
      {
        type: 'dialogue',
        text: '上面写着：{bold}今晚8点，老地方见{/bold}'
      },
      {
        type: 'choice',
        choices: [
          {
            text: '去赴约',
            setFlag: 'decided_to_meet',
            lines: [
              {
                type: 'narration',
                text: '你决定去赴约。'
              },
              {
                type: 'dialogue',
                text: '晚上8点，你准时到达了约定地点。'
              },
              {
                type: 'timeChoice',
                choices: [
                  {
                    time: '20:00',
                    setFlag: 'saw_scene_02',
                    lines: [
                      {
                        type: 'narration',
                        text: '但是...{delay:1}没有人。'
                      },
                      {
                        type: 'dialogue',
                        text: '你意识到，这可能是一个陷阱。'
                      }
                    ]
                  },
                  {
                    time: '14:00',
                    lines: [
                      {
                        type: 'narration',
                        text: '你想起了发现纸条的时间。'
                      },
                      {
                        type: 'dialogue',
                        text: '也许线索就在那里...'
                      }
                    ]
                  },
                  {
                    time: '*',
                    lines: [
                      {
                        type: 'narration',
                        text: '时间不对。'
                      },
                      {
                        type: 'dialogue',
                        text: '你意识到自己来错了时间。'
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            text: '不去',
            setFlag: 'decided_not_to_meet',
            lines: [
              {
                type: 'narration',
                text: '你决定不去赴约。'
              },
              {
                type: 'dialogue',
                text: '也许这是正确的选择...'
              },
              {
                type: 'dialogue',
                text: '但心中总有一丝不安。'
              }
            ]
          }
        ]
      }
    ]
  },

  // 记忆空白片段（用于未匹配的时间）
  {
    id: 'BLANK',
    time: '*',
    description: '记忆空白',
    loop: '*',
    unlockFlags: [],
    lines: [
      {
        type: 'narration',
        text: '那段时间对我来说，就是一片黑。'
      },
      {
        type: 'dialogue',
        text: '我不想想得太清楚。'
      }
    ]
  },
]

/**
 * 根据时间和条件查找片段
 */
export function findSegment(
  time: string,
  unlockedFlags: Set<string> = new Set(),
  _viewedSegments?: Set<string>
): ScriptSegment | null {
  // 时间匹配
  const timeMatch = scriptSegments.find(
    seg => seg.time === time &&
      checkUnlockConditions(seg, unlockedFlags)
  )
  if (timeMatch) return timeMatch

  // 返回空白片段
  return scriptSegments.find(seg => seg.id === 'BLANK') || null
}

/**
 * 检查解锁条件
 */
function checkUnlockConditions(
  segment: ScriptSegment,
  unlockedFlags: Set<string>
): boolean {
  if (!segment.unlockFlags || segment.unlockFlags.length === 0) {
    return true
  }

  return segment.unlockFlags.every(flag => unlockedFlags.has(flag))
}

/**
 * 获取所有可用的时间点（用于提示）
 */
export function getAvailableTimes(
  unlockedFlags: Set<string> = new Set()
): string[] {
  const times = new Set<string>()

  scriptSegments.forEach(seg => {
    if (seg.time !== '*' && checkUnlockConditions(seg, unlockedFlags)) {
      times.add(seg.time)
    }
  })

  return Array.from(times).sort()
}

