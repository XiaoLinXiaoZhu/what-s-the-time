# 代码审查 - STAGE DESIGN: 架构重新设计

## 1. 设计目标

### 核心目标
1. **消除所有补丁式设计** - 不再需要 `as any`、手动同步、直接突变
2. **类型安全** - 充分利用 TypeScript 类型系统
3. **单一数据源** - 所有状态有明确的来源和更新路径
4. **清晰的职责边界** - 数据层、状态层、逻辑层、视图层分离
5. **可测试性** - 业务逻辑与视图分离，易于测试

## 2. 架构设计

### 2.1 分层架构

```
┌─────────────────────────────────────────────────────────┐
│                   数据层 (Data Layer)                    │
│  - ScriptSegment (静态剧本数据)                          │
│  - ScriptLine (静态行数据，不包含运行时状态)             │
└─────────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────────┐
│                 状态管理层 (State Layer)                │
│  - GameStateStore (游戏状态)                            │
│  - DisplayStateStore (显示状态)                        │
│  - LineStateStore (行状态映射)                          │
│  - 统一的状态更新接口                                    │
└─────────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────────┐
│                 业务逻辑层 (Logic Layer)                 │
│  - NavigationService (导航逻辑)                         │
│  - ChoiceService (选择处理)                             │
│  - InputService (输入处理)                              │
│  - 纯函数，通过 StateStore 更新状态                      │
└─────────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────────┐
│                   视图层 (View Layer)                    │
│  - GameView (响应式渲染)                                │
│  - SideEffectExecutor (副作用执行器)                    │
│  - 只读取状态，通过 Service 更新状态                     │
└─────────────────────────────────────────────────────────┘
```

### 2.2 核心设计原则

#### 原则 #1: 分离数据模型和运行时状态

**问题**: `ScriptLine` 既表示静态数据，又承载运行时状态

**解决方案**: 
- `ScriptLine` - 纯静态数据，不包含 `status`
- `LineState` - 独立的运行时状态映射：`Map<lineId, LineStatus>`
- `DisplayedLine` - 视图层使用的组合类型：`ScriptLine + LineState`

```typescript
// 静态数据（不变）
interface ScriptLine {
  type: 'dialogue' | 'narration' | ...
  // 不包含 status
}

// 运行时状态（独立管理）
type LineStateMap = Map<string, LineStatus>

// 视图层组合类型
interface DisplayedLine extends ScriptLine {
  id: string  // 唯一标识
  status: LineStatus  // 从 LineStateMap 获取
}
```

#### 原则 #2: 单一数据源和统一更新接口

**问题**: 状态分散，多个地方可以修改

**解决方案**: 
- 创建 `StateStore` 统一管理所有状态
- 所有状态更新通过 `StateStore` 的方法
- 使用 Vue 的 `reactive` 或 `ref` 提供响应式

```typescript
class StateStore {
  // 游戏状态
  gameState: GameState
  
  // 显示状态
  displayState: DisplayState
  
  // 行状态映射
  lineStates: LineStateMap
  
  // 统一更新接口
  updateGameState(updates: Partial<GameState>): void
  updateDisplayState(updates: Partial<DisplayState>): void
  updateLineState(lineId: string, status: LineStatus): void
  updateLineStates(updates: Map<string, LineStatus>): void
}
```

#### 原则 #3: 副作用管理系统

**问题**: 副作用（打字效果、聚焦）需要手动触发

**解决方案**:
- 副作用作为状态的一部分
- 副作用执行器响应状态变化自动执行
- 使用 Vue 的 `watchEffect` 或 `watch` 自动触发

```typescript
interface SideEffect {
  type: 'startTyping' | 'focusInput' | 'scrollToLine'
  target: string  // lineId 或 index
  delay?: number
}

interface DisplayState {
  currentSegment: ScriptSegment | null
  currentLineIndex: number
  displayedLines: DisplayedLine[]
  pendingSideEffects: SideEffect[]  // 待执行的副作用
}
```

#### 原则 #4: 命令模式处理状态变更

**问题**: 状态变更逻辑分散

**解决方案**:
- 使用命令模式封装状态变更
- 每个命令返回新的状态和副作用
- 通过 StateStore 统一执行

```typescript
interface Command {
  execute(state: StateStore): {
    stateUpdates: Partial<StateStore>
    sideEffects: SideEffect[]
  }
}

class NavigateToSegmentCommand implements Command {
  constructor(private segmentId: string) {}
  
  execute(state: StateStore) {
    const segment = findSegmentById(this.segmentId)
    return {
      stateUpdates: {
        displayState: {
          currentSegment: segment,
          currentLineIndex: 0,
          displayedLines: this.createDisplayedLines(segment),
          pendingSideEffects: [
            { type: 'startTyping', target: '0' }
          ]
        }
      },
      sideEffects: []
    }
  }
}
```

## 3. 详细设计

### 3.1 类型系统重新设计

```typescript
// ========== 数据层 ==========
// 静态剧本数据，不包含运行时状态
export interface ScriptLine {
  type: 'dialogue' | 'narration' | 'choice' | 'timeChoice' | 'input' | 'timeDisplay' | 'command'
  // ... 其他属性
  // 不包含 status
}

export interface ScriptSegment {
  id: string
  time: string
  lines: ScriptLine[]
  // ...
}

// ========== 状态层 ==========
export type LineStatus = 'pending' | 'active' | 'completed' | 'disabled'

// 行状态映射：lineId -> status
export type LineStateMap = Map<string, LineStatus>

// 显示状态
export interface DisplayState {
  currentSegment: ScriptSegment | null
  currentLineIndex: number
  displayedLines: DisplayedLine[]
  typingRefs: Map<number, ComponentPublicInstance>
  pendingSideEffects: SideEffect[]
}

// 游戏状态
export interface GameState {
  currentLoop: string
  unlockedFlags: Set<string>
  viewedSegments: Set<string>
  currentTime?: string
  choiceHistory: Array<{ choiceText: string; timestamp: number }>
}

// ========== 视图层 ==========
// 组合类型：静态数据 + 运行时状态
export interface DisplayedLine extends ScriptLine {
  id: string  // 唯一标识，用于状态映射
  status: LineStatus  // 从 LineStateMap 获取
}

// 副作用
export interface SideEffect {
  type: 'startTyping' | 'focusInput' | 'scrollToLine' | 'removeLine' | 'insertLines'
  target: string | number
  delay?: number
  data?: any
}
```

### 3.2 状态管理 Store

```typescript
class StateStore {
  // 状态
  private _gameState = reactive<GameState>({
    currentLoop: 'A',
    unlockedFlags: new Set(),
    viewedSegments: new Set(),
    currentTime: undefined,
    choiceHistory: []
  })
  
  private _displayState = reactive<DisplayState>({
    currentSegment: null,
    currentLineIndex: 0,
    displayedLines: [],
    typingRefs: new Map(),
    pendingSideEffects: []
  })
  
  private _lineStates = reactive<Map<string, LineStatus>>(new Map())
  
  // Getters
  get gameState(): Readonly<GameState> { return this._gameState }
  get displayState(): Readonly<DisplayState> { return this._displayState }
  get lineStates(): Readonly<Map<string, LineStatus>> { return this._lineStates }
  
  // 更新方法
  updateGameState(updates: Partial<GameState>): void {
    Object.assign(this._gameState, updates)
  }
  
  updateDisplayState(updates: Partial<DisplayState>): void {
    Object.assign(this._displayState, updates)
  }
  
  updateLineState(lineId: string, status: LineStatus): void {
    this._lineStates.set(lineId, status)
  }
  
  updateLineStates(updates: Map<string, LineStatus>): void {
    updates.forEach((status, lineId) => {
      this._lineStates.set(lineId, status)
    })
  }
  
  // 批量更新
  batchUpdate(updates: {
    gameState?: Partial<GameState>
    displayState?: Partial<DisplayState>
    lineStates?: Map<string, LineStatus>
  }): void {
    if (updates.gameState) this.updateGameState(updates.gameState)
    if (updates.displayState) this.updateDisplayState(updates.displayState)
    if (updates.lineStates) this.updateLineStates(updates.lineStates)
  }
  
  // 重置
  reset(): void {
    this._gameState = reactive({
      currentLoop: 'A',
      unlockedFlags: new Set(),
      viewedSegments: new Set(),
      currentTime: undefined,
      choiceHistory: []
    })
    this._displayState = reactive({
      currentSegment: null,
      currentLineIndex: 0,
      displayedLines: [],
      typingRefs: new Map(),
      pendingSideEffects: []
    })
    this._lineStates.clear()
  }
}

// 单例
export const stateStore = new StateStore()
```

### 3.3 业务逻辑服务

```typescript
class NavigationService {
  constructor(private store: StateStore) {}
  
  navigateToSegment(segmentId: string): void {
    const segment = findSegmentById(segmentId)
    if (!segment) return
    
    // 创建 DisplayedLine 数组，为每行生成唯一 ID
    const displayedLines = this.createDisplayedLines(segment)
    
    // 初始化行状态
    const lineStates = new Map<string, LineStatus>()
    displayedLines.forEach(line => {
      lineStates.set(line.id, 'pending')
    })
    
    // 更新状态
    this.store.batchUpdate({
      displayState: {
        currentSegment: segment,
        currentLineIndex: 0,
        displayedLines,
        pendingSideEffects: [
          { type: 'startTyping', target: '0', delay: 0 }
        ]
      },
      lineStates
    })
  }
  
  private createDisplayedLines(segment: ScriptSegment): DisplayedLine[] {
    return segment.lines.map((line, index) => ({
      ...line,
      id: `${segment.id}-${index}`,
      status: this.store.lineStates.get(`${segment.id}-${index}`) || 'pending'
    }))
  }
}

class ChoiceService {
  constructor(private store: StateStore) {}
  
  handleChoice(choice: Choice, lineId: string): void {
    const line = this.store.displayState.displayedLines.find(l => l.id === lineId)
    if (!line || line.type !== 'choice') return
    
    // 检查是否已完成
    const status = this.store.lineStates.get(lineId)
    if (status === 'completed' || status === 'disabled') return
    
    // 更新行状态
    this.store.updateLineState(lineId, 'completed')
    
    // 更新游戏状态
    if (choice.setFlag) {
      const flags = new Set(this.store.gameState.unlockedFlags)
      flags.add(choice.setFlag)
      this.store.updateGameState({ unlockedFlags: flags })
    }
    
    // 插入新行
    const lineIndex = this.store.displayState.displayedLines.findIndex(l => l.id === lineId)
    const newLines = this.createDisplayedLines(choice.lines, lineIndex)
    
    // 更新显示状态
    const displayedLines = [...this.store.displayState.displayedLines]
    displayedLines.splice(lineIndex + 1, 0, ...newLines)
    
    this.store.updateDisplayState({
      displayedLines,
      currentLineIndex: lineIndex + 1,
      pendingSideEffects: [
        { type: 'startTyping', target: String(lineIndex + 1), delay: 0 }
      ]
    })
  }
  
  private createDisplayedLines(lines: ScriptLine[], baseIndex: number): DisplayedLine[] {
    return lines.map((line, index) => ({
      ...line,
      id: `inserted-${baseIndex}-${index}`,
      status: 'pending'
    }))
  }
}
```

### 3.4 副作用执行器

```typescript
class SideEffectExecutor {
  constructor(private store: StateStore) {
    // 监听 pendingSideEffects 变化
    watchEffect(() => {
      const effects = this.store.displayState.pendingSideEffects
      if (effects.length > 0) {
        nextTick(() => {
          effects.forEach(effect => this.execute(effect))
          // 清空已执行的副作用
          this.store.updateDisplayState({ pendingSideEffects: [] })
        })
      }
    })
  }
  
  private execute(effect: SideEffect): void {
    switch (effect.type) {
      case 'startTyping':
        this.startTyping(Number(effect.target))
        break
      case 'focusInput':
        this.focusInput(Number(effect.target))
        break
      // ...
    }
  }
  
  private startTyping(lineIndex: number): void {
    const typingComponent = this.store.displayState.typingRefs.get(lineIndex)
    if (typingComponent && typeof typingComponent.startTyping === 'function') {
      typingComponent.startTyping()
    }
  }
  
  private focusInput(lineIndex: number): void {
    // 聚焦逻辑
  }
}
```

### 3.5 视图层简化

```typescript
// GameView.vue
<script setup lang="ts">
import { computed } from 'vue'
import { stateStore } from '@/stores/StateStore'
import { navigationService } from '@/services/NavigationService'
import { choiceService } from '@/services/ChoiceService'
import { sideEffectExecutor } from '@/services/SideEffectExecutor'

// 响应式状态（只读）
const gameState = computed(() => stateStore.gameState)
const displayState = computed(() => stateStore.displayState)

// 初始化副作用执行器
onMounted(() => {
  sideEffectExecutor.init()
  navigationService.navigateToSegment('START')
})

// 事件处理（通过 Service）
const handleChoice = (choice: Choice, lineId: string) => {
  choiceService.handleChoice(choice, lineId)
}
</script>
```

## 4. 迁移策略

### 阶段 1: 创建新架构（不破坏现有代码）
1. 创建新的类型定义
2. 创建 StateStore
3. 创建 Service 层
4. 创建 SideEffectExecutor

### 阶段 2: 逐步迁移
1. 先迁移状态管理（StateStore）
2. 再迁移业务逻辑（Service）
3. 最后迁移视图层

### 阶段 3: 清理旧代码
1. 删除旧的 composables
2. 删除补丁代码
3. 更新类型定义

## 5. 设计优势

### 优势 #1: 类型安全
- 不再需要 `as any`
- 类型系统完整表达数据模型
- 编译时捕获错误

### 优势 #2: 单一数据源
- 所有状态在 StateStore 中
- 统一更新接口
- 易于追踪状态变更

### 优势 #3: 清晰的职责边界
- 数据层：静态数据
- 状态层：运行时状态
- 逻辑层：业务逻辑
- 视图层：渲染和交互

### 优势 #4: 可测试性
- Service 是纯函数，易于测试
- 状态管理独立，可以 mock
- 副作用可控制

### 优势 #5: 可维护性
- 代码组织清晰
- 易于理解和修改
- 易于扩展新功能

## 6. 对比：补丁 vs 重构

### [Patch] 方案（当前）
- ✅ 快速修复
- ❌ 需要 `as any` 绕过类型
- ❌ 手动同步状态
- ❌ 代码重复
- ❌ 难以维护

### [Refactor] 方案（推荐）
- ✅ 类型安全
- ✅ 单一数据源
- ✅ 清晰的职责边界
- ✅ 易于测试和维护
- ✅ 长期稳定

**强烈推荐 [Refactor] 方案**，因为它从根本上解决了架构问题，消除了所有补丁需求，提供了长期的可维护性和可扩展性。

