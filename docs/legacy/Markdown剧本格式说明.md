# Markdown 剧本格式说明

## 基本结构

```markdown
---
id: SEGMENT-ID
time: START | HH:MM | "*"
description: 片段描述
loop: P0 | P1 | "*"
unlockFlags: [FLAG1, FLAG2]
---

### type [extra]
content
```

## 语法设计

- `## scope` - 子片段/作用域（省略则为默认入口 main）
- `### type [extra]` - 行类型
- `> 注释` - 注释行，不会显示

## 行类型

### 旁白 (narration)

```markdown
### narration
风声。
尖锐的、撕裂空气的风声。
```

### 对话 (dialogue)

```markdown
### dialogue
这是无角色名的对话。

### dialogue E
这是角色E说的话。
可以有多行。
```

### 选择 (choice)

```markdown
### choice
- [选项A](#fall)
- [选项B](#dream)

## fall
### narration
选择A后的内容。

## dream
### narration
选择B后的内容。
```

### 输入 (input)

```markdown
### input 输入时间 (HH:MM)
```

### 命令 (command)

```markdown
### command setFlag FLAG_NAME
### command unsetFlag FLAG_NAME
### command jump SEGMENT-ID
### command end
```

### 时间显示 (timeDisplay)

```markdown
### timeDisplay 10:37
```

## 文本格式

| 语法 | 效果 |
|------|------|
| `**文本**` | 粗体 |
| `==文本==` | 模糊 |
| `{red}文本{/red}` | 红色 |
| `/` 或 `\|` | 延迟 0.25秒（可叠加，4个=1秒） |

## 完整示例

```markdown
---
id: P0-CORE-T1037
time: 10:37
loop: P0
---

### narration
风声。
|||尖锐的、||撕裂空气的风声。

### dialogue
{red}不……{/red}||||
停下……

### dialogue E
你还好吗？

### choice
- [这是她坠落的时间。](#fall)
- [不，这只是一个梦。](#dream)

### command setFlag FLAG_Game_Start

## fall

### narration
她坠落的时间。
|||是的，||就是{red}10:37{/red}。

## dream

### narration
梦。对，一定是梦。
```
