import type { ScriptSegment } from '@/types'

/**
 * TEST-CHOICE：ChoiceLine 功能测试脚本
 * 用于测试选择分支功能
 */
export const TEST_CHOICE: ScriptSegment = {
  id: 'TEST-CHOICE',
  time: '00:00',
  description: 'ChoiceLine 功能测试',
  loop: 'TEST',
  unlockFlags: [],
  lines: [
    {
      type: 'narration',
      text: '这是一个测试场景，用于验证 ChoiceLine 功能。'
    },
    {
      type: 'dialogue',
      text: '请做出你的选择：'
    },
    {
      type: 'choice',
      choices: [
        {
          text: '选项 A：继续前进',
          lines: [
            {
              type: 'narration',
              text: '你选择了继续前进。'
            },
            {
              type: 'dialogue',
              text: '前方有什么在等待着你...'
            },
            {
              type: 'dialogue',
              character: '旁白',
              text: '这是一个测试选项 A 的后续内容。'
            }
          ],
          setFlag: 'choice_a_selected'
        },
        {
          text: '选项 B：停下来思考',
          lines: [
            {
              type: 'narration',
              text: '你停下来，开始思考。'
            },
            {
              type: 'dialogue',
              text: '有时候，{bold}停下来{/bold}比盲目前进更重要。'
            },
            {
              type: 'dialogue',
              character: '内心',
              text: '这个选择会带来不同的结果...'
            }
          ],
          setFlag: 'choice_b_selected'
        },
        {
          text: '选项 C：返回',
          lines: [
            {
              type: 'narration',
              text: '你决定返回。'
            },
            {
              type: 'dialogue',
              text: '{red}有时候，回头看看也是必要的。{/red}'
            },
            {
              type: 'dialogue',
              character: '系统',
              text: '这个选项测试了格式标记和角色名显示。'
            }
          ],
          setFlag: 'choice_c_selected'
        }
      ]
    },
    {
      type: 'narration',
      text: '测试完成。你可以尝试不同的选项来查看效果。'
    }
  ]
}

