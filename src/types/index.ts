/**
 * 剧本行类型
 */
export type ScriptLine = 
  | DialogueLine      // 对话
  | NarrationLine     // 场景描述/旁白
  | ChoiceLine        // 选择分支
  | TimeChoiceLine    // 时间匹配分支
  | CommandLine       // 命令（如设置 flag、跳转等）
  | InputLine         // 输入框

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
 * 解析后的文本节点（用于渲染）
 */
export interface TextNode {
  type: 'text' | 'bold' | 'italic' | 'red' | 'linebreak' | 'delay' | 'systemTime'
  content: string
  /** delay 类型的延时时间（秒） */
  delayTime?: number
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

