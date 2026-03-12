/**
 * 数据迁移脚本
 *
 * 将 V1 格式的剧本数据转换为 V2 格式
 */

import type { ScriptLine, ScriptSegment } from "@/types";
import type {
  ChoiceLineV2,
  ContentLine,
  ScriptSegmentV2,
  TimeChoiceLineV2,
} from "@/types/script-v2";
import { parseText } from "@/utils/textParser";

/**
 * 转换单个片段
 */
export function convertSegmentV1ToV2(segment: ScriptSegment): ScriptSegmentV2 {
  return {
    id: segment.id,
    time: segment.time,
    description: segment.description,
    loop: segment.loop,
    unlockFlags: segment.unlockFlags,
    lines: segment.lines.map(convertLineV1ToV2),
  };
}

/**
 * 转换单行
 */
function convertLineV1ToV2(line: ScriptLine): ContentLine {
  switch (line.type) {
    case "dialogue":
      return {
        type: "dialogue",
        character: line.character,
        nodes: parseText(line.text),
      };

    case "narration":
      return {
        type: "narration",
        nodes: parseText(line.text),
      };

    case "choice":
      return convertChoiceLineV1ToV2(line as any);

    case "timeChoice":
      return convertTimeChoiceLineV1ToV2(line as any);

    case "input":
      return {
        type: "input",
        placeholder: line.placeholder,
      };

    case "command":
      return {
        type: "command",
        command: line.command,
        params: line.params,
      };

    case "timeDisplay":
      return {
        type: "timeDisplay",
        value: line.value,
      };
  }
}

/**
 * 转换 ChoiceLine（提取子片段为独立片段）
 */
function convertChoiceLineV1ToV2(choiceLine: any): ChoiceLineV2 {
  const choices = choiceLine.choices.map((choice: any, index: number) => {
    // 如果有内联行，提取为独立片段
    if (choice.lines && choice.lines.length > 0) {
      // 生成新的片段ID
      const newSegmentId = `CHOICE-${Date.now()}-${index}`;

      // 返回引用
      return {
        text: choice.text,
        targetSegments: [newSegmentId],
        setFlag: choice.setFlag,
        // 保存子片段内容，后续需要创建新片段
        _subSegment: choice.lines,
      };
    }

    // 如果没有内联行，保持原样
    return {
      text: choice.text,
      targetSegments: [],
      setFlag: choice.setFlag,
    };
  });

  return {
    type: "choice",
    choices,
  };
}

/**
 * 转换 TimeChoiceLine
 */
function convertTimeChoiceLineV1ToV2(timeChoiceLine: any): TimeChoiceLineV2 {
  const choices = timeChoiceLine.choices.map((choice: any, _index: number) => {
    if (choice.lines && choice.lines.length > 0) {
      const newSegmentId = `TIMECHOICE-${Date.now()}-${Math.random()}`;
      return {
        time: choice.time,
        targetSegments: [newSegmentId],
        setFlag: choice.setFlag,
        _subSegment: choice.lines,
      };
    }

    return {
      time: choice.time,
      targetSegments: [],
      setFlag: choice.setFlag,
    };
  });

  return {
    type: "timeChoice",
    choices,
  };
}

/**
 * 提取所有子片段（从转换后的片段中）
 */
export function extractSubSegments(
  segments: ScriptSegmentV2[],
): Array<{ id: string; lines: any[] }> {
  const subSegments: Array<{ id: string; lines: any[] }> = [];

  segments.forEach((segment) => {
    segment.lines.forEach((line) => {
      if (line.type === "choice") {
        const choiceLine = line as ChoiceLineV2;
        choiceLine.choices.forEach((choice) => {
          // 检查是否有子片段
          if ("_subSegment" in choice) {
            subSegments.push({
              id: choice.targetSegments[0],
              lines: (choice as any)._subSegment,
            });
          }
        });
      }

      if (line.type === "timeChoice") {
        const timeChoiceLine = line as TimeChoiceLineV2;
        timeChoiceLine.choices.forEach((choice) => {
          if ("_subSegment" in choice) {
            subSegments.push({
              id: choice.targetSegments[0],
              lines: (choice as any)._subSegment,
            });
          }
        });
      }
    });
  });

  return subSegments;
}

/**
 * 将子片段转换为独立的 ScriptSegmentV2
 */
export function convertSubSegmentsToV2(
  subSegments: Array<{ id: string; lines: any[] }>,
  parentSegment: ScriptSegmentV2,
): ScriptSegmentV2[] {
  return subSegments.map((sub) => {
    // 转换子片段中的每行
    const lines = sub.lines.map((line: ScriptLine) => convertLineV1ToV2(line));

    return {
      id: sub.id,
      time: "AUTO", // 子片段使用 AUTO 时间
      description: `从片段 ${parentSegment.id} 提取的子片段`,
      loop: parentSegment.loop,
      unlockFlags: parentSegment.unlockFlags,
      lines,
    };
  });
}

/**
 * 完整的迁移流程
 */
export function migrateSegmentV1ToV2(
  segment: ScriptSegment,
): ScriptSegmentV2[] {
  // 1. 转换主片段
  const convertedSegment = convertSegmentV1ToV2(segment);

  // 2. 提取子片段
  const subSegmentsRaw = extractSubSegments([convertedSegment]);

  // 3. 转换子片段为独立片段
  const subSegments = convertSubSegmentsToV2(subSegmentsRaw, convertedSegment);

  // 4. 清理主片段中的临时数据
  const cleanedSegment = removeSubSegmentMarkers(convertedSegment);

  // 返回主片段和所有子片段
  return [cleanedSegment, ...subSegments];
}

/**
 * 清理片段中的子片段标记
 */
function removeSubSegmentMarkers(segment: ScriptSegmentV2): ScriptSegmentV2 {
  return {
    ...segment,
    lines: segment.lines.map((line) => {
      if (line.type === "choice") {
        const choiceLine = line as ChoiceLineV2;
        return {
          ...choiceLine,
          choices: choiceLine.choices.map((choice) => {
            const { _subSegment, ...rest } = choice as any;
            return rest;
          }),
        };
      }

      if (line.type === "timeChoice") {
        const timeChoiceLine = line as TimeChoiceLineV2;
        return {
          ...timeChoiceLine,
          choices: timeChoiceLine.choices.map((choice) => {
            const { _subSegment, ...rest } = choice as any;
            return rest;
          }),
        };
      }

      return line;
    }),
  };
}

// 如果直接运行此脚本
if (import.meta.main) {
  console.log("数据迁移脚本已加载");
  console.log("请在其他文件中导入并使用迁移函数");
}
