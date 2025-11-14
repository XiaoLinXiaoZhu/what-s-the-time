# 代码审查 - STAGE OBSERVE: 观察与事实收集

## 1. 项目概述

这是一个基于 Vue 3 + TypeScript 的文字冒险游戏，核心机制是：
- 玩家输入时间 (HH:MM) 来触发剧本片段
- 支持多种行类型：对话、旁白、选择、时间匹配、输入、命令等
- 使用 flag 系统控制剧本流程和解锁
- 支持多周目（Loop）机制

## 2. 架构组件概览

### 核心 Composables
- `useGameState.ts` - 游戏状态管理（全局单例）
- `useGameNavigation.ts` - 游戏导航逻辑（片段切换、选择处理）
- `useScriptDisplay.ts` - 行显示状态管理（当前行索引、打字效果）
- `useLineState.ts` - 行状态管理（pending/active/completed/disabled）
- `useTimeInput.ts` - 时间输入逻辑
- `useKeyboardNavigation.ts` - 键盘导航
- `useSystemTime.ts` - 系统时间管理

### 核心组件
- `GameView.vue` - 主游戏视图，协调所有功能
- `ScriptLineRenderer.vue` - 行渲染器，根据类型分发到具体组件
- 各种行组件：`DialogueLine`, `NarrationLine`, `ChoiceLine`, `TimeChoiceLine`, `InputLine`, `TimeDisplayLine`, `CommandLine`

## 3. 识别的补丁式设计

### 补丁 #1: 行状态的直接突变

**位置**: 多个文件

**现象**:
- `useGameNavigation.ts:61` - 直接修改行对象：`(line as any).status = 'completed'`
- `useGameNavigation.ts:142` - 直接修改行对象：`(line as any).status = 'completed'`
- `useLineState.ts:22` - 通过类型断言直接修改：`(line as any).status = 'completed'`
- `GameView.vue:86-88` - 手动清理状态属性：`delete (cleanLine as any).status`

**问题**:
- 违反了 Vue 的响应式原则（直接修改对象属性）
- 使用 `as any` 绕过 TypeScript 类型检查
- 状态管理分散，没有单一数据源
- `ScriptLine` 类型定义中 `status` 是可选的，但运行时被直接添加

### 补丁 #2: displayedLines 的双重管理

**位置**: `GameView.vue`, `useScriptDisplay.ts`

**现象**:
- `useScriptDisplay.ts` 内部管理 `displayedLines`
- `GameView.vue:91` 通过 `setDisplayedLines` 外部修改
- `GameView.vue:143` 在 `handleCommandExecute` 中再次手动设置 `displayedLines`
- `useGameNavigation.ts:160` 直接使用 `displayedLines.value.splice()` 删除行

**问题**:
- 数据流不清晰，多个地方可以修改同一状态
- `useScriptDisplay` 的 `watch` 监听 `currentSegment` 自动设置 lines，但外部也在手动设置
- 导致状态同步问题

### 补丁 #3: 行类型的运行时转换

**位置**: `useGameNavigation.ts:94-103`, `GameView.vue:122-134`

**现象**:
- `convertInputToTimeDisplay` 将 `InputLine` 直接替换为 `TimeDisplayLine`
- `handleTimeChoice` 中直接删除 `timeChoice` 行：`displayedLines.value.splice(lineIndex, 1)`
- 类型在运行时被改变，但 TypeScript 无法追踪

**问题**:
- 破坏了类型安全
- 行数组的结构在运行时动态改变，难以追踪
- 插入/删除逻辑复杂，容易出错（如 `insertIndex` 的计算）

### 补丁 #4: 状态同步的手动处理

**位置**: `GameView.vue:79-103`, `GameView.vue:142-154`

**现象**:
- `GameView.vue` 中手动 watch `currentSegment` 并清理状态
- `handleCommandExecute` 中手动重置 `currentLineIndex` 和 `typingRefs`
- 使用 `nextTick` + `setTimeout` 来确保 DOM 更新后再启动打字效果

**问题**:
- 状态同步逻辑分散在多个地方
- 依赖时序（nextTick + setTimeout），容易产生竞态条件
- 重复的初始化代码

### 补丁 #5: 类型系统的绕过

**位置**: 全项目

**现象**:
- 大量使用 `(line as any).status` 访问可选属性
- `ScriptLineWithStatus` 类型定义了但很少使用
- 组件中通过 `(props.line as any).status` 访问状态

**问题**:
- TypeScript 类型系统被绕过，失去类型安全
- 类型定义与实际使用不一致

### 补丁 #6: 职责边界模糊

**位置**: `GameView.vue`

**现象**:
- `GameView.vue` 既是视图组件，又包含大量业务逻辑
- 协调多个 composables，但逻辑耦合
- `handleInputComplete` 中判断下一行类型并决定处理方式

**问题**:
- 单一组件承担过多职责
- 难以测试和维护
- 逻辑分散，难以追踪数据流

### 补丁 #7: 行状态检查的重复逻辑

**位置**: `useGameNavigation.ts`, `ChoiceLine.vue`, `InputLine.vue`, `TimeChoiceLine.vue`

**现象**:
- 每个组件都重复检查 `status === 'completed' || status === 'disabled'`
- `useGameNavigation` 中也重复检查
- `useLineState` 提供了工具函数但未被使用

**问题**:
- 代码重复
- 逻辑不一致的风险
- 工具函数未被充分利用

## 4. 数据流问题

### 当前数据流（混乱）
```
ScriptSegment (静态数据)
  ↓
GameView.watch(currentSegment) 
  → setDisplayedLines (清理状态)
  → currentLineIndex = 0
  → typingRefs.clear()
  → nextTick + setTimeout → startTyping

用户交互
  → handleChoice/handleTimeChoice/handleInputComplete
  → 直接修改 displayedLines.value[index].status
  → insertLines / splice
  → moveToLine
  → nextTick → startTyping
```

### 问题
- 没有清晰的状态机
- 状态变更分散在多个地方
- 副作用（如启动打字效果）需要手动触发
- 难以追踪状态变更历史

## 5. 类型系统问题

### 类型定义 vs 实际使用
- `ScriptLine` 类型中 `status` 是可选的
- 但运行时几乎所有行都有 `status`
- `ScriptLineWithStatus` 定义了但未使用
- 大量使用 `as any` 绕过类型检查

## 6. 观察总结

**核心问题**: 
1. **状态管理缺乏统一抽象** - 行状态、显示状态、游戏状态分散管理
2. **数据流不清晰** - 多个地方可以修改同一状态，难以追踪
3. **类型系统被绕过** - 大量使用 `as any`，失去类型安全
4. **职责边界模糊** - 组件和 composables 职责重叠
5. **副作用管理混乱** - 打字效果、聚焦等副作用需要手动触发

**补丁的目标**:
- 让现有架构"工作起来"
- 处理类型不匹配
- 同步分散的状态
- 处理运行时类型转换

**为什么需要补丁**:
- 架构设计时没有考虑状态管理的统一性
- 类型系统设计不完整（status 应该是必需的）
- 数据流设计不清晰（没有单一数据源）
- 职责划分不明确（视图和逻辑混合）

