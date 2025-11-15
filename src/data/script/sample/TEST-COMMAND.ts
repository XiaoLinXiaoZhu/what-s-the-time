import type { ScriptSegment } from '@/types'

/**
 * TEST-COMMAND：CommandLine 功能测试脚本
 * 用于测试命令行的各种功能
 */
export const TEST_COMMAND: ScriptSegment = {
  id: 'TEST-COMMAND',
  time: '00:01',
  description: 'CommandLine 功能测试',
  loop: 'TEST',
  unlockFlags: [],
  lines: [
    {
      type: 'narration',
      text: '这是一个测试场景，用于验证 CommandLine 功能。'
    },
    {
      type: 'dialogue',
      text: '我们将测试各种命令：setFlag、unsetFlag、jump 和 end。'
    },
    {
      type: 'narration',
      text: '--- 测试 1: setFlag ---'
    },
    {
      type: 'command',
      command: 'setFlag',
      params: {
        flag: 'test_flag_1'
      }
    },
    {
      type: 'dialogue',
      text: '已设置 flag: test_flag_1'
    },
    {
      type: 'narration',
      text: '--- 测试 2: unsetFlag ---'
    },
    {
      type: 'command',
      command: 'setFlag',
      params: {
        flag: 'test_flag_2'
      }
    },
    {
      type: 'command',
      command: 'unsetFlag',
      params: {
        flag: 'test_flag_2'
      }
    },
    {
      type: 'dialogue',
      text: '已设置并取消 flag: test_flag_2'
    },
    {
      type: 'narration',
      text: '--- 测试 3: jump (通过 segmentId) ---'
    },
    {
      type: 'dialogue',
      text: '准备跳转到 TEST-CHOICE 片段...'
    },
    {
      type: 'command',
      command: 'jump',
      params: {
        segmentId: 'TEST-CHOICE'
      }
    },
    {
      type: 'narration',
      text: '{red}注意：如果看到这条消息，说明 jump 命令没有正确执行。{/red}'
    }
  ]
}

/**
 * TEST-COMMAND-2：用于测试 jump (通过 time) 和 end 命令
 */
export const TEST_COMMAND_2: ScriptSegment = {
  id: 'TEST-COMMAND-2',
  time: '00:02',
  description: 'CommandLine 功能测试 - jump 和 end',
  loop: 'TEST',
  unlockFlags: [],
  lines: [
    {
      type: 'narration',
      text: '--- 测试 4: jump (通过 time) ---'
    },
    {
      type: 'dialogue',
      text: '准备跳转到时间 00:00 的片段...'
    },
    {
      type: 'command',
      command: 'jump',
      params: {
        time: '00:00'
      }
    },
    {
      type: 'narration',
      text: '{red}注意：如果看到这条消息，说明 jump 命令没有正确执行。{/red}'
    }
  ]
}

/**
 * TEST-COMMAND-END：用于测试 end 命令
 */
export const TEST_COMMAND_END: ScriptSegment = {
  id: 'TEST-COMMAND-END',
  time: '00:03',
  description: 'CommandLine 功能测试 - end',
  loop: 'TEST',
  unlockFlags: [],
  lines: [
    {
      type: 'narration',
      text: '--- 测试 5: end 命令 ---'
    },
    {
      type: 'dialogue',
      text: '准备结束游戏...'
    },
    {
      type: 'command',
      command: 'end',
      params: {
        message: '游戏测试结束。感谢测试！'
      }
    },
    {
      type: 'narration',
      text: '{red}注意：如果看到这条消息，说明 end 命令没有正确执行。{/red}'
    }
  ]
}

