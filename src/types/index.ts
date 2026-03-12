/**
 * 行的状态
 */
export type LineStatus = "pending" | "active" | "completed" | "disabled";

/**
 * 行状态映射（运行时状态，独立于静态数据）
 * key: lineId (格式: segmentId-index 或 inserted-baseIndex-index)
 * value: LineStatus
 */
export type LineStateMap = Map<string, LineStatus>;

/**
 * 文本格式类型
 */
export type TextFormat = "bold" | "italic" | "red" | "blur" | "strike";

/**
 * 解析后的文本节点（用于渲染）
 */
export interface TextNode {
  type:
    | "text"
    | "bold"
    | "italic"
    | "red"
    | "blur"
    | "strike"
    | "linebreak"
    | "delay"
    | "systemTime"
    | "animateText";
  content: string;
  /** 应用的格式数组（支持多个格式叠加，如同时应用 bold 和 red） */
  formats?: TextFormat[];
  /** delay 类型的延时时间（秒） */
  delayTime?: number;
  /** animateText 类型的文本数组 */
  animateTexts?: string[];
}

/**
 * 游戏状态
 */
export interface GameState {
  /** 当前 Loop */
  currentLoop: string;
  /** 已解锁的 flag */
  unlockedFlags: Set<string>;
  /** 已观看的片段 ID */
  viewedSegments: Set<string>;
  /** 当前输入的时间 */
  currentTime?: string;
  /** 选择历史（记录选择的内容） */
  choiceHistory: Array<{
    choiceText: string;
    timestamp: number;
  }>;
}

/**
 * 副作用类型
 */
export interface SideEffect {
  type:
    | "startTyping"
    | "focusInput"
    | "scrollToLine"
    | "removeLine"
    | "insertLines";
  target: string | number;
  delay?: number;
  data?: any;
}

// ============================================================================
// Parser 基础类型定义
// ============================================================================

/**
 * 解析错误
 */
export class ParseError extends Error {
  /** 错误消息 */
  message: string;
  /** 错误所在行号 */
  lineNumber?: number;
  /** 错误所在列号 */
  columnNumber?: number;
  /** 相关的片段ID */
  segmentId?: string;

  constructor(
    message: string,
    lineNumber?: number,
    columnNumber?: number,
    segmentId?: string,
  ) {
    super(message);
    this.name = "ParseError";
    this.message = message;
    this.lineNumber = lineNumber;
    this.columnNumber = columnNumber;
    this.segmentId = segmentId;
  }
}

/**
 * 片段元数据
 */
export interface SegmentMetadata {
  /** 片段ID */
  id: string;
  /** 时间点 */
  time: string;
  /** 描述（可选） */
  description?: string;
  /** Loop ID（可选） */
  loop?: string;
  /** 解锁的flag列表（可选） */
  unlockFlags?: string[];
}

/**
 * Token片段
 * Tokenizer 的输出结果
 */
export interface TokenSegment {
  /** 片段元数据 */
  metadata: SegmentMetadata;
  /** 主内容（原始行数组） */
  content: string[];
  /** 子片段映射（key: 子片段标识, value: 行数组） */
  subSegments: Map<string, string[]>;
}

/**
 * Tokenizer 选项
 */
export interface TokenizerOptions {
  /** 是否保留注释行（以 > 开头的行） */
  keepComments?: boolean;
}

/**
 * Parser 选项
 */
export interface ParserOptions {
  /** 是否启用缓存 */
  enableCache?: boolean;
  /** 最大嵌套深度 */
  maxNestingDepth?: number;
}

/**
 * 解析结果
 */
export interface ParseResult<T = any> {
  /** 解析后的片段 */
  segment: T;
  /** 解析耗时（毫秒） */
  parseTime: number;
  /** 源文件路径（可选） */
  filePath?: string;
}

/**
 * 展示状态（用于 StateStore）
 * 通用接口，支持 V1 和 V2 系统
 */
export interface DisplayState {
  /** 当前片段（类型未知，可能是 V1 或 V2） */
  currentSegment: any;
  /** 当前行索引 */
  currentLineIndex: number;
  /** 已展示的行列表 */
  displayedLines: any[];
  /** 打字动画引用映射 */
  typingRefs: Map<number, any>;
  /** 待处理的副作用队列 */
  pendingSideEffects: SideEffect[];
}

// ============================================================================
// V2 类型系统导出
// ============================================================================
// 用于渐进式迁移的新类型系统
//
// 核心改进：
// 1. 扁平化设计：去除内联，使用片段引用
// 2. 单次解析：文本直接解析为 TextNode[]
// 3. 职责分离：语义层与展示层完全解耦
//
// 导出所有 V2 类型供其他模块使用
// ============================================================================

export type {
  ChoiceLineV2,
  CommandLineV2,
  ContentLine,
  DialogueTextLine,
  DisplayedLineV2,
  InputLineV2,
  NarrationTextLine,
  ScriptSegmentV2,
  SegmentRefLine,
  TextLine,
  TimeChoiceLineV2,
  TimeDisplayLineV2,
} from "./script-v2";
