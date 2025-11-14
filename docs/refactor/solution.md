# STAGE DESIGN: 重构方案设计

## 方案对比

### [补丁] 方案：局部优化

#### 方案 1.1：提取重复函数
- **做法**：将 `handleTimeCharInput` 和 `handleTimeCharInputForChoice` 合并为一个函数，通过参数区分
- **优点**：快速，改动小
- **缺点**：
  - 只解决了部分重复问题
  - 没有解决职责混乱问题
  - 没有改善可维护性
  - 时间输入逻辑仍然分散在组件中

#### 方案 1.2：提取常量
- **做法**：将魔法数字提取为常量
- **优点**：快速，改动小
- **缺点**：
  - 只解决了表面问题
  - 没有解决架构问题
  - 代码复杂度没有降低

**局限性**：补丁方案只能缓解症状，不能解决根本问题。代码仍然复杂，添加新功能仍然困难。

---

### [重构] 方案：系统性重构（推荐）

#### 核心原则
1. **单一职责**：每个模块只做一件事
2. **关注点分离**：UI、状态、逻辑分离
3. **DRY**：消除所有重复代码
4. **开闭原则**：对扩展开放，对修改关闭

#### 架构设计

```
src/
├── components/
│   ├── GameView.vue              # 主容器，只负责布局和组合
│   ├── WatchDisplay.vue          # 手表显示组件
│   ├── ScriptLineRenderer.vue    # 行渲染器（根据类型分发）
│   ├── NarrationLine.vue         # 场景描述行
│   ├── DialogueLine.vue          # 对话行
│   ├── ChoiceLine.vue            # 选择分支行
│   ├── TimeChoiceLine.vue        # 时间匹配分支行
│   ├── InputLine.vue             # 输入行
│   ├── TimeInput.vue             # 时间输入组件（可复用）
│   ├── FormattedText.vue         # 格式化文本（已存在）
│   └── TypingText.vue            # 打字效果（已存在）
├── composables/
│   ├── useGameState.ts           # 游戏状态（已存在，需增强）
│   ├── useTimeInput.ts           # 时间输入逻辑
│   ├── useScriptDisplay.ts       # 行显示状态管理
│   └── useGameNavigation.ts      # 游戏导航逻辑
├── constants/
│   └── index.ts                  # 常量定义
└── types/
    └── index.ts                  # 类型定义（已存在）
```

#### 详细设计

##### 1. 提取时间输入逻辑 → `useTimeInput.ts`

**职责**：管理时间输入的状态和逻辑

```typescript
export function useTimeInput(options: {
  onComplete: (time: string) => void
  onCharChange?: (index: number, value: string) => void
}) {
  // 状态
  const chars = ref<string[]>(['', '', ':', '', ''])
  const refs = ref<(HTMLInputElement | null)[]>([])
  const isProcessing = ref(false)
  
  // 方法
  const reset = () => { /* ... */ }
  const focus = (index?: number) => { /* ... */ }
  const handleInput = (e: Event, index: number) => { /* ... */ }
  const handleKeydown = (e: KeyboardEvent, index: number) => { /* ... */ }
  const handlePaste = (e: ClipboardEvent) => { /* ... */ }
  
  return {
    chars,
    refs,
    isProcessing,
    reset,
    focus,
    handleInput,
    handleKeydown,
    handlePaste
  }
}
```

**收益**：
- ✅ 消除重复代码
- ✅ 可复用（普通输入和时间匹配分支共用）
- ✅ 易于测试
- ✅ 易于维护

##### 2. 提取行显示逻辑 → `useScriptDisplay.ts`

**职责**：管理行的显示状态和进度

```typescript
export function useScriptDisplay(options: {
  currentSegment: Ref<ScriptSegment | null>
  onLineComplete?: () => void
}) {
  const currentLineIndex = ref(0)
  const displayedLines = ref<ScriptLine[]>([])
  const typingRefs = ref<Map<number, ComponentPublicInstance>>(new Map())
  
  const isAllLinesComplete = computed(() => { /* ... */ })
  
  const insertLines = (index: number, lines: ScriptLine[]) => { /* ... */ }
  const moveToLine = (index: number) => { /* ... */ }
  const skipCurrentLine = () => { /* ... */ }
  const showNextLine = () => { /* ... */ }
  
  return {
    currentLineIndex,
    displayedLines,
    typingRefs,
    isAllLinesComplete,
    insertLines,
    moveToLine,
    skipCurrentLine,
    showNextLine
  }
}
```

**收益**：
- ✅ 状态管理集中
- ✅ 逻辑清晰
- ✅ 易于测试

##### 3. 提取游戏导航逻辑 → `useGameNavigation.ts`

**职责**：处理片段切换、选择分支、时间匹配等导航逻辑

```typescript
export function useGameNavigation(options: {
  insertLines: (index: number, lines: ScriptLine[]) => void
  moveToLine: (index: number) => void
}) {
  const currentSegment = ref<ScriptSegment | null>(null)
  const displayTime = ref<string>('')
  
  const handleTimeInput = (time: string) => { /* ... */ }
  const handleChoice = (choice: Choice, lineIndex: number) => { /* ... */ }
  const handleTimeChoice = (time: string, lineIndex: number) => { /* ... */ }
  const backToStart = () => { /* ... */ }
  
  return {
    currentSegment,
    displayTime,
    handleTimeInput,
    handleChoice,
    handleTimeChoice,
    backToStart
  }
}
```

**收益**：
- ✅ 业务逻辑集中
- ✅ 易于测试
- ✅ 易于扩展

##### 4. 创建行渲染器组件 → `ScriptLineRenderer.vue`

**职责**：根据行类型分发到对应的渲染组件

```vue
<template>
  <NarrationLine v-if="line.type === 'narration'" :line="line" :index="index" />
  <DialogueLine v-else-if="line.type === 'dialogue'" :line="line" :index="index" />
  <ChoiceLine v-else-if="line.type === 'choice'" :line="line" :index="index" />
  <TimeChoiceLine v-else-if="line.type === 'timeChoice'" :line="line" :index="index" />
  <InputLine v-else-if="line.type === 'input'" :line="line" :index="index" />
</template>
```

**收益**：
- ✅ 模板简化
- ✅ 易于扩展新行类型
- ✅ 符合开闭原则

##### 5. 创建时间输入组件 → `TimeInput.vue`

**职责**：可复用的时间输入 UI

```vue
<template>
  <div class="time-input-wrapper">
    <input
      v-for="(_, index) in chars"
      :key="index"
      :ref="(el) => setRef(el, index)"
      v-model="chars[index]"
      @input="(e) => handleInput(e, index)"
      @keydown="(e) => handleKeydown(e, index)"
      @paste="handlePaste"
      class="time-input-char"
      :class="{ 'separator': index === 2 }"
    />
  </div>
</template>

<script setup>
import { useTimeInput } from '@/composables/useTimeInput'

const props = defineProps<{
  disabled?: boolean
}>()

const emit = defineEmits<{
  complete: [time: string]
}>()

const { chars, refs, handleInput, handleKeydown, handlePaste, setRef } = useTimeInput({
  onComplete: (time) => emit('complete', time)
})
</script>
```

**收益**：
- ✅ UI 和逻辑分离
- ✅ 可复用
- ✅ 易于测试

##### 6. 创建常量文件 → `constants/index.ts`

```typescript
export const TIME_INPUT_FORMAT = ['', '', ':', '', ''] as const
export const TIME_INPUT_SEPARATOR_INDEX = 2
export const INPUT_FOCUS_DELAY = 100
export const TIME_SUBMIT_DELAY = 300
export const DEFAULT_TYPING_SPEED = 30
```

**收益**：
- ✅ 消除魔法数字
- ✅ 易于修改
- ✅ 自文档化

#### 重构后的 GameView.vue

```vue
<template>
  <div class="game-view">
    <WatchDisplay :display-time="displayTime" />
    
    <div class="text-container" @click="handleTextClick">
      <div class="text-content" v-if="currentSegment">
        <ScriptLineRenderer
          v-for="(line, index) in displayedLines"
          :key="`${currentSegment.id}-${index}`"
          v-if="index <= currentLineIndex || line.type === 'choice'"
          :line="line"
          :index="index"
          :current-line-index="currentLineIndex"
          @set-typing-ref="setTypingRef"
          @line-complete="onLineComplete"
          @choice-select="handleChoice"
          @time-choice-complete="handleTimeChoice"
          @input-complete="handleTimeInput"
        />
        
        <BackToStartButton v-if="isAllLinesComplete" @click="backToStart" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useGameNavigation } from '@/composables/useGameNavigation'
import { useScriptDisplay } from '@/composables/useScriptDisplay'
import { useKeyboardNavigation } from '@/composables/useKeyboardNavigation'

const { currentSegment, displayTime, handleTimeInput, handleChoice, handleTimeChoice, backToStart } = useGameNavigation()
const { currentLineIndex, displayedLines, isAllLinesComplete, setTypingRef, showNextLine, insertLines, moveToLine } = useScriptDisplay({ currentSegment })
const { handleTextAction } = useKeyboardNavigation({ showNextLine, backToStart, isAllLinesComplete })
</script>
```

**代码行数**：从 834 行 → 约 100 行

#### 重构收益

1. **可维护性** ⬆️⬆️⬆️
   - 每个模块职责单一，易于理解
   - 修改某个功能只需修改对应模块

2. **可测试性** ⬆️⬆️⬆️
   - Composables 可以独立测试
   - 组件可以独立测试
   - 不需要复杂的 mock

3. **可扩展性** ⬆️⬆️⬆️
   - 添加新行类型：创建新组件，在 ScriptLineRenderer 中添加
   - 修改时间输入：只需修改 useTimeInput
   - 添加新功能：创建新的 composable

4. **代码复用** ⬆️⬆️⬆️
   - TimeInput 组件可在多处使用
   - useTimeInput 可在多处使用

5. **类型安全** ⬆️⬆️
   - 减少 `as any` 使用
   - 明确的接口定义

#### 重构成本

- **时间**：约 4-6 小时
- **风险**：中等（需要充分测试）
- **回滚**：可以保留原文件作为备份

#### 实施步骤

1. 创建常量文件
2. 创建 `useTimeInput` composable
3. 创建 `TimeInput` 组件
4. 创建 `useScriptDisplay` composable
5. 创建 `useGameNavigation` composable
6. 创建行渲染组件（NarrationLine, DialogueLine, ChoiceLine, TimeChoiceLine, InputLine）
7. 创建 `ScriptLineRenderer` 组件
8. 重构 `GameView.vue`
9. 测试所有功能
10. 清理未使用的代码

