import type { ScriptSegment } from '@/types'

/**
 * TEST-TIMECHOICE：TimeChoiceLine 功能测试脚本
 * 用于测试时间匹配分支功能
 * 
 * 测试场景：
 * 1. 精确时间匹配（08:00）
 * 2. 通配符匹配（*）
 * 3. 特殊值 NOW 匹配（匹配当前系统时间）
 * 4. 不匹配的情况
 * 5. Flag 设置功能
 * 6. 后续内容插入
 * 7. 格式标记和角色名显示
 */
export const TEST_TIMECHOICE: ScriptSegment = {
  id: 'TEST-TIMECHOICE',
  time: '00:03',
  description: 'TimeChoiceLine 功能测试',
  loop: 'TEST',
  unlockFlags: [],
  lines: [
    {
      type: 'narration',
      text: '这是一个测试场景，用于验证 TimeChoiceLine 功能。'
    },
    {
      type: 'dialogue',
      text: '请输入一个时间，系统会根据你的输入匹配不同的分支。'
    },
    {
      type: 'dialogue',
      character: '系统',
      text: '测试场景 1：精确时间匹配（输入 08:00）'
    },
    {
      type: 'timeChoice',
      choices: [
        {
          time: '08:00',
          lines: [
            {
              type: 'narration',
              text: '你输入了 08:00，这是一个精确匹配。'
            },
            {
              type: 'dialogue',
              text: '{bold}早晨 8 点{/bold}，新的一天开始了。'
            },
            {
              type: 'dialogue',
              character: '旁白',
              text: '这个选项测试了精确时间匹配和格式标记。'
            }
          ],
          setFlag: 'time_08_00_matched'
        },
        {
          time: '*',
          lines: [
            {
              type: 'narration',
              text: '你输入了其他时间，触发了通配符匹配。'
            },
            {
              type: 'dialogue',
              text: '通配符 {red}*{/red} 可以匹配任何时间。'
            }
          ],
          setFlag: 'time_wildcard_matched'
        }
      ]
    },
    {
      type: 'narration',
      text: '---'
    },
    {
      type: 'dialogue',
      character: '系统',
      text: '测试场景 2：通配符匹配（输入任意时间，如 12:30）'
    },
    {
      type: 'timeChoice',
      choices: [
        {
          time: '*',
          lines: [
            {
              type: 'narration',
              text: '通配符匹配成功！'
            },
            {
              type: 'dialogue',
              text: '通配符 {bold}*{/bold} 总是会匹配，因为它位于选项列表的第一位。'
            },
            {
              type: 'dialogue',
              character: '提示',
              text: '注意：通配符应该放在选项列表的最后，作为默认选项。'
            }
          ],
          setFlag: 'wildcard_test_passed'
        }
      ]
    },
    {
      type: 'narration',
      text: '---'
    },
    {
      type: 'dialogue',
      character: '系统',
      text: '测试场景 3：NOW 特殊值匹配（输入当前系统时间）'
    },
    {
      type: 'timeChoice',
      choices: [
        {
          time: 'NOW',
          lines: [
            {
              type: 'narration',
              text: '你输入了当前系统时间！'
            },
            {
              type: 'dialogue',
              text: '{bold}NOW{/bold} 特殊值会匹配当前系统时间。'
            },
            {
              type: 'dialogue',
              character: '系统',
              text: '这是一个测试 NOW 特殊值匹配的场景。'
            }
          ],
          setFlag: 'now_time_matched'
        },
        {
          time: '*',
          lines: [
            {
              type: 'narration',
              text: '输入的时间不是当前系统时间。'
            },
            {
              type: 'dialogue',
              text: '请尝试输入当前系统时间以触发 NOW 匹配。'
            }
          ]
        }
      ]
    },
    {
      type: 'narration',
      text: '---'
    },
    {
      type: 'dialogue',
      character: '系统',
      text: '测试场景 4：多个精确时间选项（测试优先级）'
    },
    {
      type: 'timeChoice',
      choices: [
        {
          time: '12:00',
          lines: [
            {
              type: 'narration',
              text: '中午 12 点，午餐时间。'
            },
            {
              type: 'dialogue',
              text: '{bold}12:00{/bold} - 这是第一个精确匹配选项。'
            },
            {
              type: 'dialogue',
              character: '提示',
              text: '选项按顺序匹配，第一个匹配的选项会被选中。'
            }
          ],
          setFlag: 'time_12_00_matched'
        },
        {
          time: '18:00',
          lines: [
            {
              type: 'narration',
              text: '傍晚 6 点，下班时间。'
            },
            {
              type: 'dialogue',
              text: '{bold}18:00{/bold} - 这是第二个精确匹配选项。'
            }
          ],
          setFlag: 'time_18_00_matched'
        },
        {
          time: '23:59',
          lines: [
            {
              type: 'narration',
              text: '深夜 23:59，一天即将结束。'
            },
            {
              type: 'dialogue',
              text: '{red}23:59{/red} - 这是第三个精确匹配选项。'
            }
          ],
          setFlag: 'time_23_59_matched'
        },
        {
          time: '*',
          lines: [
            {
              type: 'narration',
              text: '你输入了其他时间。'
            },
            {
              type: 'dialogue',
              text: '通配符作为默认选项，匹配所有未精确匹配的时间。'
            }
          ],
          setFlag: 'time_default_matched'
        }
      ]
    },
    {
      type: 'narration',
      text: '---'
    },
    {
      type: 'dialogue',
      character: '系统',
      text: '测试场景 5：复杂后续内容和 Flag 设置'
    },
    {
      type: 'timeChoice',
      choices: [
        {
          time: '00:00',
          lines: [
            {
              type: 'narration',
              text: '午夜 00:00，新的一天开始了。'
            },
            {
              type: 'dialogue',
              text: '{bold}午夜时分{/bold}，一切都重新开始。'
            },
            {
              type: 'dialogue',
              character: '内心',
              text: '这个时间点具有特殊的意义...'
            },
            {
              type: 'dialogue',
              text: '{red}注意：{/red}这个选项设置了 flag，可以用于解锁后续内容。'
            },
            {
              type: 'command',
              command: 'setFlag',
              params: { flag: 'midnight_visited' }
            }
          ],
          setFlag: 'midnight_flag_set'
        },
        {
          time: '*',
          lines: [
            {
              type: 'narration',
              text: '你选择了其他时间。'
            },
            {
              type: 'dialogue',
              text: '尝试输入 00:00 以查看完整的后续内容。'
            }
          ]
        }
      ]
    },
    {
      type: 'narration',
      text: '---'
    },
    {
      type: 'dialogue',
      character: '系统',
      text: '测试场景 6：不匹配的情况（无通配符）'
    },
    {
      type: 'timeChoice',
      choices: [
        {
          time: '09:09',
          lines: [
            {
              type: 'narration',
              text: '你输入了 09:09，这是一个精确匹配。'
            },
            {
              type: 'dialogue',
              text: '如果没有通配符，只有精确匹配的时间才会触发后续内容。'
            }
          ],
          setFlag: 'time_09_09_matched'
        }
      ]
    },
    {
      type: 'narration',
      text: '---'
    },
    {
      type: 'dialogue',
      text: '测试完成。你可以尝试输入不同的时间来验证各种匹配场景：'
    },
    {
      type: 'dialogue',
      character: '提示',
      text: '• 精确时间：08:00, 12:00, 18:00, 23:59, 00:00, 09:09'
    },
    {
      type: 'dialogue',
      character: '提示',
      text: '• 当前系统时间：输入 NOW 或当前实际时间'
    },
    {
      type: 'dialogue',
      character: '提示',
      text: '• 通配符：输入任何其他时间（如果选项中有 *）'
    },
    {
      type: 'narration',
      text: '测试脚本结束。'
    }
  ]
}

