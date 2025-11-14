/**
 * 剧本行类型
 */
export type ScriptLine = 
  | DialogueLine      // 对话
  | NarrationLine     // 场景描述/旁白
  | ChoiceLine        // 选择分支
  | CommandLine       // 命令（如设置 flag、跳转等）

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
    /** 选择后跳转到的片段 ID */
    targetSegmentId: string
    /** 选择后设置的 flag（可选） */
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
 * 剧本片段
 */
export interface ScriptSegment {
  /** 片段 ID */
  id: string
  /** 时间点 (HH:MM) */
  time: string
  /** 第二问时间（用于两问一锁机制） */
  secondTime?: string
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
 * 解析后的文本节点
 */
export interface TextNode {
  type: 'text' | 'bold' | 'italic' | 'red' | 'linebreak'
  content: string
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
  /** 是否需要第二问 */
  needsSecondQuestion: boolean
}

