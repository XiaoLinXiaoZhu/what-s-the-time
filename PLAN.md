## 修改剧本编写的解析器

### 当前实现
通过 ts 代码直接导出剧本对象，比如：

```ts
import type { ScriptSegment } from '@/types'

/**
 * 阶段0开场片段
 * 主题：初始循环 - 模糊、混乱、时间错位
 */
export const startP0Segment: ScriptSegment = {
  id: 'START-P0',
  time: 'START',
  description: '阶段0开场 - 初始循环',
  loop: 'P0',
  unlockFlags: [],
  lines: [
    {
      type: 'dialogue',
      text: ''
    },
    {
      type: 'narration',
      text: '我在想，{br}时间是……？'
    },
    {
      type: 'dialogue',
      text: '不，{delay:1}是  {bold}她{/bold}  在问我。'
    },
    {
      type: 'narration',
      text: '现在……现在……{br}我抬起手，看了看手表。{delay:1}时间是……{br}{delay:1}{blur}10:37{/blur}……{br}{delay:1}应该吧……{br}不，{delay:0.8}时间不对。'
    },
    {
      type: 'dialogue',
      text: '{bold}{red}时间是:{/red}{/bold}'
    },
    {
      type: 'input',
      placeholder: '输入时间 (HH:MM)'
    }
  ]
}
```

这样实际上不方便编剧的书写，因为它需要增加过多的转义符和代码结构，影响编剧思考和书写效率。

### 目标实现

我们实现一个纯文本的、基于markdown语法的剧本编写格式，编剧可以直接使用文本编辑器进行书写，项目内部直接读取并解析该文本格式，转换为剧本对象。

### 格式约定

- 每个剧本片段以 `---` 分隔
- 每个片段的元信息使用 YAML 语法书写在片段开头
- 剧本内容首行直接表示类型，后跟换行和内容
- 支持的类型包括：
  - dialoge: 对话
  - narration: 旁白
  - input: 输入框
  - timeDisplayLine: 时间显示行
  - commandLine: 命令行
- 原有特殊格式映射
  - `{br}` -> 直接的换行
  - `{bold}文本{/bold}` -> `**文本**`
  - `{red}文本{/red}` -> `{red}文本{/red}`
  - `{delay:秒数}` -> `{delay:秒数}` 或者简易写法 `||||`(四个竖线表示1秒,一个竖线表示0.25秒)
  - `{blur}文本{/blur}` -> `==文本==`
  - `>` -> 表示注释，忽略该行内容
  - ...
- 选择分支的处理
  - 和正常类型基本一致，使用单行作为类型，如 `CHOICE`或者 `TIME_DISPLAY`，后跟选项列表
  - 选项使用 `- [选项文本](目标片段ID)` 语法
  - 目标片段id直接使用mardown跳转到小标题的形式书写
  - 例如：
    ```
    CHOICE
    - [选项一](#SEGMENT-ID-1)
    - [选项二](#SEGMENT-ID-2)
    ```
  - 解析时，通过小标题分辨主要内容和分支。
  - 支持循环引用片段ID（这意味着我们的数据结构也需要调整）最好连中间状态也给简化了，直接编译为最终的剧本对象（没有 ScriptLine 之类的中间状态）


### 示例

普通文本（无分支）：

```markdown
---
id: START-P0
time: START
description: 阶段0开场 - 初始循环
loop: P0
unlockFlags: []
---
narration
我在想，
时间是……？

dialogue
不，||||是  **她**  在问我。

narration
现在……现在……
我抬起手，看了看手表。||||时间是……
|||| ==10:37== ……
||||应该吧……
不，|||时间不对。

dialogue
**{red}时间是:{/red}**

input
输入时间 (HH:MM)
```

有分支的文本：

```markdown
---
id: P0-CORE-T1037-FallBlur
time: T1037
description: P0核心线 - 10:37模糊
loop: P0
unlockFlags: []
---
narration
风声。
|||尖锐的、||撕裂空气的风声。
|||从四面八方涌来，||将我包裹。

||||某种刺眼的光线从上方渗下来，|||让我感到一阵眩晕。
|||视野里的一切都在旋转，||失焦，|||像被水浸湿的油画。


|||||然后——

dialogue
{red}不……{/red}||||
停下……

narration
**时间不对。**
||||这个念头像一把刀刺破了我的意识。
|||{red}{typewriter}时间不对{/typewriter}{/red}
{delay:1.0}哪里不对？{delay:1.0}
我试图抓住什么，|||但只有虚无。


narration
模糊的红色，像颜料一样。
||||在视野里晕开，|||蔓延，||吞噬一切。

narration
尖叫声。
|||是她的声音吗？|||还是……|||我的？
|||像一部坏掉的电影，||声音和画面错位。

narration
意识像碎片一样散落。
|||我试图拼凑，|||试图抓住，|||但只有虚无。
|||只有风声，||只有红色，|||只有……

dialogue
是吗？
|||现在是……|||这个时间吗？
|||还是说，|||那只是某一次……|||坠落的时间？
|||我想不太清楚。|||大概，|也不需要想得那么清楚。
|||但总得有个答案。|||哪怕，||只是说给自己听。

choice
- [这是她坠落的时间。](#1)
- [不，这只是一个梦。](#2)

command
setFlag FLAG_Game_Start

# 1
narration
她坠落的时间。
|||是的，||就是{red}{typewriter}10:37{/typewriter}{/red}。
|||人们似乎总是需要一个明确的时间点，||来安放一切，||来说服自己，||这一切都是真的。

> 这里播完之后回到choice的下一行继续执行，也就是 command 行

# 2
梦。
|||对，||一定是梦。
|||可为什么，||每次醒来，|||我腕上的指针，|||还是停在{red}{typewriter}10:37{/typewriter}{/red}？

> 这里播完之后回到choice的下一行继续执行，也就是 command 行
```

