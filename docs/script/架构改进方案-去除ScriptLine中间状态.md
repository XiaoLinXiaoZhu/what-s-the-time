# 架构改进方案：去除 ScriptLine 中间状态

## 问题分析

### 当前架构的问题

1. **ScriptLine 不是最终渲染格式**
   - 文本字符串（如 `text` 字段）还需要进一步解析为 `TextNode`
   - 存在两个解析阶段：Markdown → ScriptLine → TextNode
   - 增加了不必要的数据转换开销

2. **Choice/TimeChoice 的 `lines: ScriptLine[]` 限制**
   ```typescript
   interface ChoiceLine {
     type: 'choice'
     choices: Array<{
       text: string
       lines: ScriptLine[]  // ❌ 内联内容，无法引用其他片段
       setFlag?: string
     }>
   }
   ```
   - 不支持循环引用（片段A → 片段B → 片段A）
   - 不支持跨文件引用
   - 嵌套结构增加了复杂度

3. **数据层与展示层耦合**
   - `ScriptLine` 既表示语义类型（dialogue, narration等）
   - 又包含展示格式（text字段包含格式标记）
   - 职责不清晰

## 改进方案

### 方案A：纯文本 + 标记（推荐）

将所有内容扁平化为字符串，使用特殊标记表示复杂结构。

#### 新的类型定义

```typescript
/**
 * 最终的剧本片段（扁平化设计）
 */
export interface ScriptSegment {
  id: string
  time: string
  description?: string
  loop?: string
  unlockFlags?: string[]
  
  /** 
   * 扁平化的内容行
   * 每行要么是纯文本（包含格式标记），
   * 要么是特殊标记（如 CHOICE, INPUT, COMMAND）
   */
  lines: ContentLine[]
}

/**
 * 内容行类型
 */
export type ContentLine = 
  | TextLine              // 文本行（包含格式标记）
  | ChoiceLine           // 选择分支
  | InputLine            // 输入框
  | CommandLine          // 命令
  | SegmentRefLine      // 片段引用（新增）
```

#### 新的 ChoiceLine 设计

```typescript
/**
 * 选择分支（使用引用而非内联）
 */
export interface ChoiceLine {
  type: 'choice'
  choices: Array<{
    /** 选项文本 */
    text: string
    /** 
     * 选择后要执行的片段ID列表
     * 支持多片段依次执行
     */
    targetSegments: string[]  // 改为引用
    /** 选择后设置的 flag */
    setFlag?: string
  }>
}
```

#### 新增片段引用类型

```typescript
/**
 * 片段引用行（支持跨文件引用和循环）
 */
export interface SegmentRefLine {
  type: 'segmentRef'
  /** 目标片段ID（可选包含文件路径） */
  targetId: string
  /** 引用的行索引范围（可选） */
  lineRange?: [number, number]
}
```

#### 示例对比

**当前设计（内联）**：

```markdown
choice
- [选项一](#1)
- [选项二](#2)

# 1
narration
选择了选项一的内容。

# 2
narration
选择了选项二的内容。
```

**新设计（引用）**：

```markdown
choice
- [选项一](SEGMENT-OPTION-1)
- [选项二](SEGMENT-OPTION-2)
```

其中 `SEGMENT-OPTION-1` 和 `SEGMENT-OPTION-2` 是独立的片段：

```markdown
---
id: SEGMENT-OPTION-1
time: AUTO
---
narration
选择了选项一的内容。
```

### 方案B：渲染节点树（备选）

直接存储解析后的渲染节点，跳过中间状态。

```typescript
export interface ScriptSegment {
  id: string
  time: string
  description?: string
  loop?: string
  unlockFlags?: string[]
  
  /** 直接是渲染节点 */
  nodes: DisplayNode[]
}

export type DisplayNode =
  | TextDisplayNode
  | ChoiceDisplayNode
  | InputDisplayNode
  | CommandNode

export interface TextDisplayNode {
  type: 'text'
  nodes: TextNode[]  // 现有的 TextNode（已解析的格式标记）
}

export interface ChoiceDisplayNode {
  type: 'choice'
  choices: Array<{
    text: string
    targetNodeId: string  // 引用其他 DisplayNode
    setFlag?: string
  }>
}
```

## 推荐方案：方案A

### 理由

1. **保持人类可读性**：Markdown 格式仍然是纯文本，易于编辑
2. **灵活性最高**：支持任意片段间的引用、循环、跨文件
3. **向后兼容**：可以逐步迁移现有代码
4. **性能优化**：避免重复解析（只需一次从 string → TextNode）
5. **符合 DSL 最佳实践**：引用而非内联

### 实施步骤

#### 阶段1：类型定义重构
1. 创建新的类型文件 `src/types/script-v2.ts`
2. 定义 `ContentLine`、`ChoiceLine`（新）、`SegmentRefLine`
3. 保留旧类型作为过渡

#### 阶段2：解析器改造
1. 修改 Markdown 解析器，输出新格式
2. Choice 选项的目标改为 `targetSegments: string[]`
3. 移除子片段内联逻辑

#### 阶段3：导航服务改造
1. `NavigationService` 支持片段引用解析
2. 实现片段查找和跳转逻辑
3. 处理循环引用检测

#### 阶段4：组件改造
1. `ChoiceLine` 组件接收 `targetSegments` 而非 `lines`
2. 选择时触发导航跳转而非直接显示内容
3. 更新状态管理逻辑

#### 阶段5：旧代码清理
1. 删除旧的 `ScriptLine` 相关代码
2. 删除 `src/types/index.ts` 中的旧类型
3. 更新所有测试用例

## 迁移示例

### 当前格式

```typescript
// 片段A
const segmentA: ScriptSegment = {
  id: 'A',
  time: 'START',
  lines: [
    {
      type: 'choice',
      choices: [
        {
          text: '选项一',
          lines: [  // ❌ 内联
            { type: 'narration', text: '选择了选项一' }
          ]
        }
      ]
    }
  ]
}
```

### 新格式

```typescript
// 片段A
const segmentA: ScriptSegment = {
  id: 'A',
  time: 'START',
  lines: [
    {
      type: 'choice',
      choices: [
        {
          text: '选项一',
          targetSegments: ['A-OPTION-1']  // ✅ 引用
        }
      ]
    }
  ]
}

// 片段 A-OPTION-1
const segmentAOption1: ScriptSegment = {
  id: 'A-OPTION-1',
  time: 'AUTO',
  lines: [
    { type: 'narration', text: '选择了选项一' }
  ]
}
```

### Markdown 格式对比

**当前（需要子片段）**：

```markdown
---
id: A
time: START
---
choice
- [选项一](#1)

# 1
narration
选择了选项一。
```

**新（直接引用）**：

```markdown
---
id: A
time: START
---
choice
- [选项一](A-OPTION-1)

---
id: A-OPTION-1
time: AUTO
---
narration
选择了选项一。
```

## 优势总结

| 方面 | 当前设计 | 新设计 |
|------|---------|--------|
| **循环引用** | ❌ 不支持 | ✅ 完全支持 |
| **跨文件引用** | ❌ 不支持 | ✅ 支持（targetId可包含路径） |
| **内容复用** | ❌ 难以复用 | ✅ 简单复用（多choice指向同一片段） |
| **复杂度** | 高（嵌套结构） | 低（扁平化） |
| **性能** | 中（需多次解析） | 高（一次解析） |
| **调试难度** | 中 | 低（结构清晰） |
| **人类可读** | 中（子片段需要理解） | 高（直接引用清晰） |

## 风险与挑战

1. **重构范围大**：需要修改解析器、导航服务、组件等
2. **学习成本**：团队需要适应新的编写方式
3. **现有数据迁移**：需要将现有片段拆分为多个小片段
4. **导航逻辑复杂**：需要实现片段查找、缓存、循环检测

## 建议

**采用方案A（扁平化 + 引用）**，因为：

1. ✅ 符合 DSL 设计最佳实践
2. ✅ 灵活性和可扩展性最好
3. ✅ 性能和维护性最优
4. ✅ 可以渐进式迁移，降低风险

实施时建议分阶段进行，每个阶段验证后再进入下一阶段。
