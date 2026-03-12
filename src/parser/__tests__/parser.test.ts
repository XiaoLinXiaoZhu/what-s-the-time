import { describe, expect, it } from "bun:test";
import type { ChoiceLine, DialogueLine, NarrationLine } from "@/types";
import { parseScript } from "../index";

describe("剧本解析器", () => {
  it("应该成功解析简单的剧本片段", () => {
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
`;

    const segment = parseScript(content);

    expect(segment.id).toBe("TEST-001");
    expect(segment.time).toBe("START");
    expect(segment.description).toBe("测试片段");
    expect(segment.loop).toBe("P0");
    expect(segment.unlockFlags).toEqual([]);
    expect(segment.lines).toHaveLength(2);
  });

  it("NarrationLine 应该包含 nodes 而非 text", () => {
    const content = `
---
id: TEST-002
time: START
---
narration
测试旁白
`;
    const segment = parseScript(content);
    const line = segment.lines[0] as NarrationLine;

    expect(line.type).toBe("narration");
    expect(line).toHaveProperty("nodes");
    expect(line).not.toHaveProperty("text");
    expect(line.nodes[0].content).toBe("测试旁白");
  });

  it("DialogueLine 应该包含 nodes 而非 text", () => {
    const content = `
---
id: TEST-003
time: START
---
dialogue
测试对话
`;
    const segment = parseScript(content);
    const line = segment.lines[0] as DialogueLine;

    expect(line.type).toBe("dialogue");
    expect(line).toHaveProperty("nodes");
    expect(line).not.toHaveProperty("text");
  });

  it("ChoiceLine 应该使用 targetSegments 而非 lines", () => {
    const content = `
---
id: TEST-004
time: START
---
choice
- [选项A](#sub1)
- [选项B](#sub2)

# sub1
narration
选项A的内容

# sub2
narration
选项B的内容
`;
    const segment = parseScript(content);
    const line = segment.lines[0] as ChoiceLine;

    expect(line.type).toBe("choice");
    expect(line.choices).toHaveLength(2);
    expect(line.choices[0]).toHaveProperty("targetSegments");
    expect(line.choices[0]).not.toHaveProperty("lines");
    expect(line.choices[0].targetSegments[0]).toBe("TEST-004-sub1");
  });

  it("应该正确解析命令行", () => {
    const content = `
---
id: TEST-005
time: START
---
command
setFlag FLAG_TEST
`;
    const segment = parseScript(content);
    expect(segment.lines).toHaveLength(1);
    expect(segment.lines[0].type).toBe("command");
  });

  it("应该正确解析输入行", () => {
    const content = `
---
id: TEST-006
time: START
---
input
输入时间 (HH:MM)
`;
    const segment = parseScript(content);
    expect(segment.lines).toHaveLength(1);
    expect(segment.lines[0].type).toBe("input");
  });
});
