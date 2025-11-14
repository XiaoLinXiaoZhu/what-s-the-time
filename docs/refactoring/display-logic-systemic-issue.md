# 显示逻辑系统性问题分析

## STAGE 1: OBSERVE - 观察事实

### 症状
1. `timeDisplay` 行显示了，但位置不对
2. 显示逻辑通过打补丁的方式修复，缺乏系统性

### 当前显示逻辑的问题

```typescript
const shouldShowLine = (line: any, index: number) => {
  // choice 行总是显示
  if (line.type === 'choice') {
    return true
  }
  
  // timeDisplay 行总是显示（补丁）
  if (line.type === 'timeDisplay') {
    return true
  }
  
  // 其他行根据 currentLineIndex 显示
  return index <= displayState.value.currentLineIndex
}
```

### 问题分析

**系统性问题：显示逻辑混合了两个不同的概念**

1. **进度控制**：基于 `currentLineIndex` 控制哪些行应该"逐步显示"（打字效果）
2. **已完成交互行的显示**：转换后的行（如 `timeDisplay`）应该始终显示

当前逻辑的问题：
- 通过类型判断来打补丁（`if (line.type === 'timeDisplay')`）
- 没有统一的规则来判断"已完成的行"
- 位置问题可能是因为索引计算和显示判断不一致

## STAGE 2: ANALYZE - 系统性根本原因

### 五个为什么

1. **为什么需要打补丁？**
   - 因为 `shouldShowLine` 只基于 `currentLineIndex`，没有考虑行的状态

2. **为什么只基于 currentLineIndex？**
   - 设计时只考虑了"逐步显示"的场景，没有考虑"已完成交互行"的场景

3. **为什么没有考虑已完成交互行？**
   - 系统缺乏统一的"行状态"概念来判断显示逻辑

4. **为什么缺乏统一的行状态概念？**
   - 显示逻辑和行状态管理分离，没有统一的规则

5. **系统性根本原因是什么？**
   - **显示逻辑应该基于行的状态（status）和类型，而不是简单的索引比较**
   - **已完成的行（status === 'completed'）应该始终显示**
   - **交互行在完成后转换为显示行，应该保持原位置并始终显示**

## STAGE 3: DESIGN - 系统性解决方案

### 统一的显示规则

1. **已完成的行**（`status === 'completed'`）：始终显示
2. **交互行**（`input`, `timeChoice`, `choice`）：根据 `currentLineIndex` 和状态显示
3. **普通行**（`dialogue`, `narration`）：根据 `currentLineIndex` 显示

### 重构方案

```typescript
const shouldShowLine = (line: DisplayedLine, index: number) => {
  // 规则1：已完成的行始终显示
  if (line.status === 'completed') {
    return true
  }
  
  // 规则2：choice 行总是显示（它们是交互行，需要用户选择）
  if (line.type === 'choice') {
    return true
  }
  
  // 规则3：其他行根据 currentLineIndex 显示（进度控制）
  return index <= displayState.value.currentLineIndex
}
```

这样：
- 不需要为 `timeDisplay` 打补丁
- 统一的规则：所有 `status === 'completed'` 的行都显示
- 位置问题自然解决：行保持在原位置，因为索引不变

