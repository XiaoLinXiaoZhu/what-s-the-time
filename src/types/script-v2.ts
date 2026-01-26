/**
 * 新的剧本类型系统（V2）
 * 
 * 核心改进：
 * 1. 扁平化设计：去除内联，使用片段引用
 * 2. 单次解析：文本直接解析为 TextNode[]
 * 3. 职责分离：语义层与展示层完全解耦
 */

/**
 * 剧本片段（扁平化设计）
 */
export interface ScriptSegmentV2 {
  id: string
  time: string
  description?: string
  loop?: string
  unlockFlags?: string[]
  
  /**
   * 扁平化的内容行
   * 每行要么是已解析的文本节点，
   * 要么是特殊标记（如 CHOICE, INPUT, COMMAND）
   */
  lines: ContentLine[]
}

/**
 * 内容行类型（扁平化）
 */
export type ContentLine = 
  | TextLine           // 文本行（包含已解析的 TextNode[]）
  | DialogueTextLine    // 对话文本行
  | NarrationTextLine   // 旁白文本行
  | ChoiceLineV2        // 选择分支（引用式）
  | TimeChoiceLineV2    // 时间匹配分支（引用式）
  | InputLineV2         // 输入框
  | CommandLineV2       // 命令
  | TimeDisplayLineV2   // 时间显示

/**
 * 文本行（直接包含已解析的 TextNode）
 */
export interface TextLine {
  type: 'text'
  /**
   * 已解析的文本节点
   * 无需再次解析，直接用于渲染
   */
  nodes: TextNode[]
}

/**
 * 对话文本行
 */
export interface DialogueTextLine {
  type: 'dialogue'
  /** 角色名（可选） */
  character?: string
  /** 已解析的文本节点 */
  nodes: TextNode[]
}

/**
 * 旁白文本行
 */
export interface NarrationTextLine {
  type: 'narration'
  /** 已解析的文本节点 */
  nodes: TextNode[]
}

/**
 * 选择分支（引用式）
 */
export interface ChoiceLineV2 {
  type: 'choice'
  choices: Array<{
    /** 选项文本 */
    text: string
    /**
     * 选择后要执行的片段ID列表
     * 支持多片段依次执行
     */
    targetSegments: string[]
    /** 选择后设置的 flag */
    setFlag?: string
  }>
}

/**
 * 时间匹配分支（引用式）
 */
export interface TimeChoiceLineV2 {
  type: 'timeChoice'
  choices: Array<{
    /** 匹配的时间模式 */
    time: string
    /**
     * 匹配后要执行的片段ID列表
     */
    targetSegments: string[]
    /** 匹配后设置的 flag */
    setFlag?: string
  }>
}

/**
 * 输入框行
 */
export interface InputLineV2 {
  type: 'input'
  /** 提示文本 */
  placeholder?: string
}

/**
 * 命令行
 */
export interface CommandLineV2 {
  type: 'command'
  /** 命令类型 */
  command: 'setFlag' | 'unsetFlag' | 'jump' | 'end' | 'return'
  /** 命令参数 */
  params: Record<string, any>
}

/**
 * 时间显示行
 */
export interface TimeDisplayLineV2 {
  type: 'timeDisplay'
  /** 要显示的时间值（HH:MM格式） */
  value: string
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
  formats?: TextFormat[]
  delayTime?: number
  animateTexts?: string[]
}

/**
 * 显示行（运行时状态）
 *
 * 注意：ContentLine 是联合类型，不能使用 extends，改用类型交叉
 */
export type DisplayedLineV2 = ContentLine & {
  /** 唯一标识 */
  id: string
  /** 行的状态 */
  status: LineStatus
  /** 选中的选项索引（仅用于 choice 类型） */
  selectedChoiceIndex?: number
}

/**
 * 行的状态
 */
export type LineStatus = 'pending' | 'active' | 'completed' | 'disabled'

/**
 * 片段引用行（新增，支持跨文件引用）
 */
export interface SegmentRefLine {
  type: 'segmentRef'
  /** 目标片段ID（可选包含文件路径） */
  targetId: string
  /** 引用的行索引范围（可选） */
  lineRange?: [number, number]
}
