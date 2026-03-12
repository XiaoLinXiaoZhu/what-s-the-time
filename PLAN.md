# 剧本格式说明

## 概述

剧本使用基于 Markdown 的纯文本格式编写，解析器直接将其转换为 `ContentLine[]`（单一真相来源类型），无中间状态。

## 格式约定

- 每个剧本片段以 YAML Front Matter 开头（`---` 包裹）
- 内容行首行为类型标识，后跟换行和内容
- 支持的类型：`narration`、`dialogue`、`input`、`timeDisplayLine`、`command`、`choice`、`timeChoice`

### 文本格式标记

| 标记 | 说明 | 简写 |
|------|------|------|
| `{bold}文本{/bold}` | 粗体 | `**文本**` |
| `{red}文本{/red}` | 红色 | - |
| `{blur}文本{/blur}` | 模糊 | `==文本==` |
| `{strike}文本{/strike}` | 删除线 | - |
| `{delay:秒数}` | 延时 | `\|`=0.25s, `\|\|`=0.5s, `\|\|\|`=0.75s, `\|\|\|\|`=1s |
| `{typewriter}A,B,C{/typewriter}` | 打字机动画 | - |
| `{systemTime}` | 系统时间 | - |
| 换行 | 行内换行 | 直接换行 |
| `>` | 注释（忽略） | - |

### 选择分支

```markdown
choice
- [选项文本](#子片段ID)
- [选项文本](setFlag:FLAG_NAME)

# 子片段ID
narration
选项后续内容
```

子片段内容在解析时内联展开为 `ChoiceLine.choices[].lines`。

## 示例

```markdown
---
id: START
time: START
description: 游戏开场
loop: START
---
narration
时间是……？

dialogue
不，是||||  **他**  在问我。

dialogue
{red}时间是:{/red}

input
输入时间 (HH:MM)
```
