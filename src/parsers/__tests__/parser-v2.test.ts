import { describe, it, expect } from 'bun:test'
import { parseScriptV2 } from '../script-parser-v2'
import type { ScriptSegmentV2, ChoiceLineV2, DialogueTextLine, NarrationTextLine } from '@/types/script-v2'

describe('V2 系统测试', () => {
  describe('V2 解析器', () => {
    it('应该成功解析简单的剧本片段', () => {
      const content = `
---
id: TEST-001
time: START
description: 测试片段
loop: P0
unlockFlags: []
---
narration
这是一段旁白。

dialogue
这是一句对话。
`
      
      const segment = parseScriptV2(content)
      
      expect(segment.id).toBe('TEST-001')
      expect(segment.time).toBe('START')
      expect(segment.description).toBe('测试片段')
      expect(segment.loop).toBe('P0')
      expect(segment.unlockFlags).toEqual([])
      expect(segment.lines).toHaveLength(2)
    })
  })

  describe('V2 类型结构', () => {
    it('NarrationTextLine 应该包含 nodes 而非 text', () => {
      const narrationLine: NarrationTextLine = {
        type: 'narration',
        nodes: [
          { type: 'text', content: '测试' }
        ]
      }
      
      expect(narrationLine).toHaveProperty('nodes')
      expect(narrationLine).not.toHaveProperty('text')
    })

    it('DialogueTextLine 应该包含 nodes 而非 text', () => {
      const dialogueLine: DialogueTextLine = {
        type: 'dialogue',
        nodes: [
          { type: 'text', content: '测试' },
          { type: 'text', content: '对话', formats: ['red'] }
        ]
      }
      
      expect(dialogueLine).toHaveProperty('nodes')
      expect(dialogueLine).not.toHaveProperty('text')
    })

    it('ChoiceLineV2 应该使用 targetSegments 而非 lines', () => {
      const choiceLine: ChoiceLineV2 = {
        type: 'choice',
        choices: [
          {
            text: '选项A',
            targetSegments: ['SEGMENT-A'],
            setFlag: 'flag_a'
          }
        ]
      }
      
      expect(choiceLine).toHaveProperty('choices')
      if (choiceLine.choices[0]) {
        expect(choiceLine.choices[0]).toHaveProperty('targetSegments')
        expect(choiceLine.choices[0]).not.toHaveProperty('lines')
      }
    })
  })
})
