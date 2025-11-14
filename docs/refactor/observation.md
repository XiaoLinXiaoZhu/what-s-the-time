# STAGE OBSERVE: 代码结构观察报告

## 1. 文件结构

```
src/
├── components/
│   ├── GameView.vue (834行) ⚠️ 过大
│   ├── FormattedText.vue (44行) ✓
│   └── TypingText.vue (248行) ✓
├── composables/
│   └── useGameState.ts (49行) ✓
├── data/
│   └── script.ts (549行) ✓
├── types/
│   └── index.ts (131行) ✓
└── utils/
    └── textParser.ts (113行) ✓
```

## 2. GameView.vue 职责分析

### 2.1 当前职责（违反单一职责原则）
- ✅ UI 渲染（手表、文本显示）
- ✅ 时间输入处理（普通输入框）
- ✅ 时间输入处理（时间匹配分支）
- ✅ 行显示状态管理
- ✅ 打字效果控制
- ✅ 选择分支处理
- ✅ 时间匹配分支处理
- ✅ 片段导航
- ✅ 键盘事件处理
- ✅ 点击事件处理
- ✅ 游戏状态更新

### 2.2 状态变量（15+ 个）
```typescript
- timeInputChars: ref<string[]>
- timeInputRefs: ref<(HTMLInputElement | null)[]>
- currentSegment: ref<ScriptSegment | null>
- displayTime: ref<string>
- isProcessing: ref<boolean>
- currentLineIndex: ref<number>
- displayedLines: ref<ScriptLine[]>
- typingRefs: ref<Map<number, ComponentPublicInstance>>
- currentTimeChoiceLineIndex: ref<number | null>
```

## 3. 重复代码识别（DRY 违反）

### 3.1 时间输入处理逻辑重复
- `handleTimeCharInput` (34行) vs `handleTimeCharInputForChoice` (35行)
  - 几乎完全相同，只有一行差异：`currentTimeChoiceLineIndex.value = lineIndex`
  
- `handleTimePaste` (13行) vs `handleTimePasteForChoice` (13行)
  - 完全相同，只是调用的完成检查函数不同

- `checkTimeComplete` (13行) vs `checkTimeCompleteForChoice` (13行)
  - 完全相同，只是调用的处理函数不同

### 3.2 时间字符串构建重复
在多处重复出现：
```typescript
const timeStr = `${timeInputChars.value[0]}${timeInputChars.value[1]}:${timeInputChars.value[3]}${timeInputChars.value[4]}`
```

### 3.3 输入框重置逻辑重复
在多处重复：
```typescript
timeInputChars.value = ['', '', ':', '', '']
```

### 3.4 聚焦逻辑重复
在多处重复：
```typescript
nextTick(() => {
  timeInputRefs.value[0]?.focus()
})
```

## 4. 模板复杂度

### 4.1 条件渲染嵌套过深
- 4层嵌套：`v-for` → `v-if` → `v-if` → `v-else-if` (×4)
- 难以维护和测试

### 4.2 缺少 InputLine 渲染
- 类型定义中有 `InputLine`，但模板中没有对应的渲染逻辑
- 可能导致功能缺失

## 5. 依赖关系

### 5.1 GameView 直接依赖
- `findSegment`, `startSegment` (script.ts)
- `useGameState` (composables)
- `FormattedText`, `TypingText` (components)
- Vue 核心 API

### 5.2 隐式依赖
- 时间输入格式约定（HH:MM，5个位置）
- 行类型约定（narration, dialogue, choice, timeChoice）
- 打字效果生命周期约定

## 6. 魔法数字和硬编码

- `['', '', ':', '', '']` - 时间输入格式硬编码
- `index === 2` - 冒号位置硬编码
- `100` - 聚焦延迟硬编码
- `300` - 提交延迟硬编码
- `30` - 打字速度默认值（在 TypingText 中）

## 7. 类型安全问题

- 大量使用 `as any` 类型断言
- `ComponentPublicInstance` 类型使用不够精确
- 缺少对 TypingText 组件接口的类型定义

## 8. 测试困难点

- 组件过大，难以单元测试
- 状态分散，难以模拟
- 事件处理逻辑复杂，难以测试边界情况
- DOM 操作多，需要大量 mock

## 9. 扩展性问题

- 添加新的行类型需要修改多个地方
- 修改时间输入逻辑需要同步修改多处
- 添加新的交互方式需要修改核心组件

## 10. 性能考虑

- 大量 `nextTick` 和 `setTimeout` 调用
- 频繁的 DOM 查询和操作
- 没有使用虚拟滚动（如果内容很长）

