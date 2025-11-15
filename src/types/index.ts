/**
 * 行的状态
 */
export type LineStatus = 'pending' | 'active' | 'completed' | 'disabled'

/**
 * 剧本行类型（静态数据，不包含运行时状态）
 */
export type ScriptLine = 
  | DialogueLine      // 对话
  | NarrationLine     // 场景描述/旁白
  | ChoiceLine        // 选择分支
  | TimeChoiceLine    // 时间匹配分支
  | CommandLine       // 命令（如设置 flag、跳转等）
  | InputLine         // 输入框
  | TimeDisplayLine   // 时间显示（只读）

/**
 * 行状态映射（运行时状态，独立于静态数据）
 * key: lineId (格式: segmentId-index 或 inserted-baseIndex-index)
 * value: LineStatus
 */
export type LineStateMap = Map<string, LineStatus>

/**
 * 显示行（视图层使用的组合类型：静态数据 + 运行时状态）
 */
export type DisplayedLine = ScriptLine & {
  /** 唯一标识，用于状态映射 */
  id: string
  /** 行的状态（从 LineStateMap 获取） */
  status: LineStatus
  /** 选中的选项索引（仅用于 choice 类型） */
  selectedChoiceIndex?: number
}

/**
 * 对话行
 */
export interface DialogueLine {
  type: 'dialogue'
  /** 角色名（可选，为空时表示内心独白或旁白） */
  character?: string
  /** 对话内容（支持格式标记：{red}、{bold}、{italic}） */
  text: string
}

/**
 * 场景描述/旁白
 */
export interface NarrationLine {
  type: 'narration'
  /** 描述文本（支持格式标记） */
  text: string
}

/**
 * 选择分支
 */
export interface ChoiceLine {
  type: 'choice'
  /** 选项列表 */
  choices: Array<{
    /** 选项文本 */
    text: string
    /** 选择后显示的后续内容（在当前片段内继续） */
    lines: ScriptLine[]
    /** 选择后设置的 flag（可选） */
    setFlag?: string
  }>
}

/**
 * 时间匹配分支
 */
export interface TimeChoiceLine {
  type: 'timeChoice'
  /** 时间选项列表 */
  choices: Array<{
    /** 匹配的时间模式（具体时间如 '08:00' 或通配符 '*'） */
    time: string
    /** 匹配后显示的后续内容 */
    lines: ScriptLine[]
    /** 匹配后设置的 flag（可选） */
    setFlag?: string
  }>
}

/**
 * 命令行
 */
export interface CommandLine {
  type: 'command'
  /** 命令类型 */
  command: 'setFlag' | 'unsetFlag' | 'jump' | 'end'
  /** 命令参数 */
  params: Record<string, any>
}

/**
 * 输入框行
 */
export interface InputLine {
  type: 'input'
  /** 提示文本 */
  placeholder?: string
}

/**
 * 时间显示行（只读，用于显示已输入的时间）
 */
export interface TimeDisplayLine {
  type: 'timeDisplay'
  /** 要显示的时间值（HH:MM格式） */
  value: string
}

/**
 * 剧本片段
 */
export interface ScriptSegment {
  /** 片段 ID */
  id: string
  /** 时间点 (HH:MM) */
  time: string
  /** 剧本行列表 */
  lines: ScriptLine[]
  /** 片段功能描述（用于开发调试） */
  description?: string
  /** 解锁条件（flag） */
  unlockFlags?: string[]
  /** Loop 阶段 */
  loop?: string
}

/**
 * 文本格式类型
 */
export type TextFormat = 'bold' | 'italic' | 'red' | 'blur' | 'strike'

/**
 * 解析后的文本节点（用于渲染）
 */
export interface TextNode {
  type: 'text' | 'bold' | 'italic' | 'red' | 'blur' | 'strike' | 'linebreak' | 'delay' | 'systemTime' | 'animateText'
  content: string
  /** 应用的格式数组（支持多个格式叠加，如同时应用 bold 和 red） */
  formats?: TextFormat[]
  /** delay 类型的延时时间（秒） */
  delayTime?: number
  /** animateText 类型的文本数组 */
  animateTexts?: string[]
}

/**
 * 游戏状态
 */
export interface GameState {
  /** 当前 Loop */
  currentLoop: string
  /** 已解锁的 flag */
  unlockedFlags: Set<string>
  /** 已观看的片段 ID */
  viewedSegments: Set<string>
  /** 当前输入的时间 */
  currentTime?: string
  /** 选择历史（记录选择的内容） */
  choiceHistory: Array<{
    choiceText: string
    timestamp: number
  }>
}

/**
 * 副作用类型
 */
export interface SideEffect {
  type: 'startTyping' | 'focusInput' | 'scrollToLine' | 'removeLine' | 'insertLines'
  target: string | number
  delay?: number
  data?: any
}

/**
 * 显示状态
 */
export interface DisplayState {
  /** 当前片段 */
  currentSegment: ScriptSegment | null
  /** 当前行索引 */
  currentLineIndex: number
  /** 显示的行列表 */
  displayedLines: DisplayedLine[]
  /** TypingText 组件引用映射 */
  typingRefs: Map<number, any>
  /** 待执行的副作用 */
  pendingSideEffects: SideEffect[]
}

