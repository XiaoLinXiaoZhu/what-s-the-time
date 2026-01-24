import { describe, it, expect } from 'bun:test'
import { parseScript } from '../script-parser'

describe('ScriptParser', () => {
  describe('基本解析', () => {
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
      
      const segment = parseScript(content)
      
      expect(segment.id).toBe('TEST-001')
      expect(segment.time).toBe('START')
      expect(segment.description).toBe('测试片段')
      expect(segment.loop).toBe('P0')
      expect(segment.unlockFlags).toEqual([])
      expect(segment.lines).toHaveLength(2)
    })

    it('应该正确解析narration类型', () => {
      const content = `
---
id: TEST-002
time: START
---
narration
这是旁白内容。
`
      
      const segment = parseScript(content)
      
      expect(segment.lines).toHaveLength(1)
      expect(segment.lines[0].type).toBe('narration')
      expect((segment.lines[0] as any).text).toBe('这是旁白内容。')
    })

    it('应该正确解析dialogue类型', () => {
      const content = `
---
id: TEST-003
time: START
---
dialogue
这是对话内容。
`
      
      const segment = parseScript(content)
      
      expect(segment.lines).toHaveLength(1)
      expect(segment.lines[0].type).toBe('dialogue')
      expect((segment.lines[0] as any).text).toBe('这是对话内容。')
    })

    it('应该正确解析input类型', () => {
      const content = `
---
id: TEST-004
time: START
---
input
输入时间 (HH:MM)
`
      
      const segment = parseScript(content)
      
      expect(segment.lines).toHaveLength(1)
      expect(segment.lines[0].type).toBe('input')
      expect((segment.lines[0] as any).placeholder).toBe('输入时间 (HH:MM)')
    })
  })

  describe('文本格式转换', () => {
    it('应该将延时简写转换为标准格式', () => {
      const content = `
---
id: TEST-005
time: START
---
narration
||||这是一秒。|||这是0.75秒。||这是0.5秒。|这是0.25秒。
`
      
      const segment = parseScript(content)
      const text = (segment.lines[0] as any).text
      
      expect(text).toContain('{delay:1}')
      expect(text).toContain('{delay:0.75}')
      expect(text).toContain('{delay:0.5}')
      expect(text).toContain('{delay:0.25}')
    })

    it('应该将粗体标记转换为标准格式', () => {
      const content = `
---
id: TEST-006
time: START
---
narration
**粗体文本**
`
      
      const segment = parseScript(content)
      const text = (segment.lines[0] as any).text
      
      expect(text).toBe('{bold}粗体文本{/bold}')
    })

    it('应该将模糊标记转换为标准格式', () => {
      const content = `
---
id: TEST-007
time: START
---
narration
==模糊文本==
`
      
      const segment = parseScript(content)
      const text = (segment.lines[0] as any).text
      
      expect(text).toBe('{blur}模糊文本{/blur}')
    })
  })

  describe('Choice和子片段', () => {
    it('应该正确解析choice选项', () => {
      const content = `
---
id: TEST-008
time: START
---
narration
选择你的答案：

choice
- [选项一](#1)
- [选项二](#2)

command
setFlag FLAG_Test

# 1
narration
选择了选项一。

# 2
narration
选择了选项二。
`
      
      const segment = parseScript(content)
      
      const choiceLine = segment.lines.find(l => l.type === 'choice')
      expect(choiceLine).toBeDefined()
      
      const choices = (choiceLine as any).choices
      expect(choices).toHaveLength(2)
      expect(choices[0].text).toBe('选项一')
      expect(choices[1].text).toBe('选项二')
      expect(choices[0].lines).toHaveLength(1)
      expect(choices[1].lines).toHaveLength(1)
    })

    it('应该正确解析command类型', () => {
      const content = `
---
id: TEST-009
time: START
---
command
setFlag FLAG_Test
`
      
      const segment = parseScript(content)
      
      expect(segment.lines).toHaveLength(1)
      expect(segment.lines[0].type).toBe('command')
      expect((segment.lines[0] as any).command).toBe('setFlag')
      expect((segment.lines[0] as any).params.flag).toBe('FLAG_Test')
    })
  })

  describe('注释处理', () => {
    it('应该过滤注释行', () => {
      const content = `
---
id: TEST-010
time: START
---
narration
这是旁白。

> 这是一条注释，应该被忽略。

narration
这是另一段旁白。
`
      
      const segment = parseScript(content)
      
      expect(segment.lines).toHaveLength(2)
    })
  })
})
