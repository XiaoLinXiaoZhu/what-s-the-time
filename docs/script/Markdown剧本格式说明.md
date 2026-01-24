# Markdown 剧本格式说明

本文档说明如何使用Markdown格式编写游戏剧本，以及如何通过解析器将其转换为TypeScript对象。

## 概述

Markdown剧本格式提供了一个简洁、易读的剧本编写方式，让编剧能够专注于内容创作，而不需要关注代码语法。

## 基本结构

### 片段格式

每个剧本片段由以下部分组成：

```markdown
---
id: 片段ID
time: 时间点
description: 片段描述
loop: 循环阶段
unlockFlags: []
---
narration
这是旁白内容。
```

### 元数据说明

| 字段 | 类型 | 必需 | 说明 |
|------|------|------|------|
| `id` | string | ✅ | 片段唯一标识符 |
| `time` | string | ✅ | 时间点 (HH:MM) 或特殊值 (START, *, META) |
| `description` | string | ❌ | 片段功能描述（用于开发调试） |
| `loop` | string | ❌ | Loop 阶段 (P0-P6) |
| `unlockFlags` | string[] | ❌ | 解锁条件（flag数组） |

### 多片段文件

一个文件可以包含多个片段，使用 `---` 分隔：

```markdown
---
id: SEGMENT-1
time: START
---
narration
第一个片段

---
id: SEGMENT-2
time: T1037
---
narration
第二个片段
```

## 内容类型

### 1. 旁白 (narration)

```markdown
narration
这是一段旁白文本。
```

**多行形式**：

```markdown
narration
这是第一行旁白。
这是第二行旁白。
这是第三行旁白。
```

### 2. 对话 (dialogue)

```markdown
dialogue
这是一句对话。
```

**多行形式**：

```markdown
dialogue
这是第一句对话。
这是第二句对话。
```

### 3. 输入框 (input)

```markdown
input
输入时间 (HH:MM)
```

### 4. 时间显示 (timeDisplayLine)

```markdown
timeDisplayLine
10:37
```

### 5. 选择分支 (choice)

```markdown
choice
- [选项一](#1)
- [选项二](#2)
- [选项三](setFlag:FLAG_Answer_C)
```

#### 子片段引用

选择分支可以引用子片段，子片段播放完后会回到choice后的下一行继续执行：

```markdown
narration
你需要做出选择。

choice
- [这是她的时间。](#answer1)
- [这只是梦。](#answer2)

command
setFlag FLAG_Choice_Made

# answer1
narration
是的，那就是她的时间。

# answer2
narration
不，这只是一个梦。
```

### 6. 命令 (command)

支持以下命令类型：

**setFlag**: 设置标志

```markdown
command
setFlag FLAG_Name
```

**unsetFlag**: 取消标志

```markdown
command
unsetFlag FLAG_Name
```

**jump**: 跳转到指定片段

```markdown
command
jump SEGMENT-ID
```

**end**: 结束

```markdown
command
end
```

## 文本格式

### 延时标记

使用竖线表示延时：

| 标记 | 延时 | 标准格式 |
|------|--------|----------|
| `\|\|\|\|` | 1.0秒 | `{delay:1}` |
| `\|\|\|` | 0.75秒 | `{delay:0.75}` |
| `\|\|` | 0.5秒 | `{delay:0.5}` |
| `\|` | 0.25秒 | `{delay:0.25}` |

**示例**：

```markdown
narration
||||这是一个一秒的延迟。|||这是0.75秒。||这是0.5秒。|这是0.25秒。
```

**转换后**：

```markdown
{delay:1}这是一个一秒的延迟。{delay:0.75}这是0.75秒。{delay:0.5}这是0.5秒。{delay:0.25}这是0.25秒。
```

### 格式标记

| 标记 | 效果 | Markdown语法 |
|------|--------|------------|
| 粗体 | 加粗文本 | `**文本**` |
| 模糊 | 模糊文本 | `==文本==` |
| 换行 | 强制换行 | `{br}` |
| 红色 | 红色文本 | `{red}文本{/red}` |
| 打字机 | 逐字打印 | `{typewriter}文本{/typewriter}` |
| 延时 | 延迟N秒 | `{delay:N}` |

**示例**：

```markdown
narration
**这是粗体文本**，==这是模糊文本==，{red}这是红色文本{/red}。
```

### 注释

使用 `>` 开头的行表示注释，会被解析器忽略：

```markdown
narration
这是旁白。

> 这是一条注释，不会被解析。

narration
这是另一段旁白。
```

## 在项目中使用

### 1. 创建Markdown剧本文件

在 `src/data/script/` 目录下创建 `.md` 文件：

```
src/data/script/
├── my-segment.md
├── another-segment.md
└── segments/
    └── chapter-1.md
```

### 2. 使用解析器

```typescript
import { parseScript } from '@/parsers/script-parser'

// 方法1：直接解析字符串
const content = `
---
id: MY-SEGMENT
time: START
---
narration
Hello, World!
`
const segment = parseScript(content)

// 方法2：解析Markdown文件（需要导入）
import mySegmentContent from '@/data/script/my-segment.md?raw'
const segment = parseScript(mySegmentContent)
```

### 3. 导出解析后的片段

```typescript
// src/data/script/my-segment.ts
import { parseScript } from '@/parsers/script-parser'
import content from './my-segment.md?raw'

export const MySegment = parseScript(content)
```

然后在其他文件中使用：

```typescript
import { MySegment } from '@/data/script/my-segment'
```

## 完整示例

```markdown
---
id: P0-CORE-T1037-INTRO
time: T1037
description: 阶段0核心线 - 开场
loop: P0
unlockFlags: []
---
narration
风声。
|||尖锐的、||撕裂空气的风声。

dialogue
{red}不……{/red}||||
停下……

narration
**时间不对。**
||||这个念头像一把刀刺破了我的意识。
|||{red}{typewriter}时间不对{/typewriter}{/red}
{delay:1.0}哪里不对？

narration
我试图抓住什么，|||但只有虚无。

dialogue
是吗？
|||现在是……|||这个时间吗？

choice
- [这是她坠落的时间。](#answer1)
- [不，这只是一个梦。](#answer2)

command
setFlag FLAG_Game_Start

# answer1
narration
她坠落的时间。
|||是的，||就是{red}{typewriter}10:37{/typewriter}{/red}。
|||人们似乎总是需要一个明确的时间点。

# answer2
narration
梦。
|||对，||一定是梦。
|||可为什么，||每次醒来，|||我腕上的指针，|||还是停在{red}{typewriter}10:37{/typewriter}{/red}？

> 选择结束后继续执行command行
```

## 注意事项

1. **空行**：内容行之间的空行会被忽略，但不同类型之间需要空行或类型标识分隔
2. **转义字符**：不需要额外的转义，Markdown语法自然处理
3. **子片段**：子片段ID在同一个文件内必须唯一
4. **字符编码**：使用UTF-8编码保存文件
5. **行尾符**：建议使用LF (Unix)行尾符

## 故障排查

### 解析失败

如果遇到解析错误：

1. **检查YAML语法**：确保元数据块格式正确
2. **检查片段分隔符**：使用 `---` 分隔片段
3. **检查类型标识**：确保类型标识正确拼写
4. **查看错误信息**：解析器会提供详细的错误行号

### 文本格式不生效

如果延时或格式标记不工作：

1. **检查竖线数量**：确保延时标记使用正确数量的竖线
2. **检查标记闭合**：确保 `{red}` 和 `{/red}` 成对出现
3. **查看转换结果**：在调试时可以打印解析后的文本

## 最佳实践

1. **文件组织**：按章节或场景组织剧本文件
2. **命名规范**：使用清晰的片段ID（如 `P0-CORE-T1037-INTRO`）
3. **注释使用**：使用注释说明复杂的逻辑或设计意图
4. **版本控制**：使用Git管理剧本文件的变更历史
5. **团队协作**：Markdown格式便于多人协作和代码审查
