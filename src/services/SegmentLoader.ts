import { parseScriptV2 } from "@/parsers/script-parser-v2";
import type { ScriptSegmentV2 } from "@/types/script-v2";
import { segmentRegistry } from "./SegmentRegistry";

/**
 * 片段加载器
 *
 * 职责：
 * - 按需加载片段
 * - 支持跨文件引用
 * - 自动注册到注册表
 */
export class SegmentLoader {
  private cache = new Map<string, ScriptSegmentV2>();

  /**
   * 加载片段（按需）
   */
  async load(id: string): Promise<ScriptSegmentV2 | undefined> {
    // 1. 检查缓存
    if (this.cache.has(id)) {
      return this.cache.get(id);
    }

    // 2. 检查注册表
    const registered = segmentRegistry.get(id);
    if (registered) {
      return registered;
    }

    // 3. 尝试从文件加载
    const parsed = await this.loadFromFile(id);
    if (parsed) {
      this.cache.set(id, parsed);
      segmentRegistry.register(parsed);
      return parsed;
    }

    return undefined;
  }

  /**
   * 从文件加载片段
   */
  private async loadFromFile(id: string): Promise<ScriptSegmentV2 | undefined> {
    try {
      // 构建文件路径：src/data/script/segments/{id}.ts
      // 首先尝试 .ts 文件
      const tsFilePath = `@/data/script/segments/${id}.ts`;

      // 尝试动态导入
      const module = await import(tsFilePath);

      // 假设导出的是 ScriptSegmentV2
      const segment = module[id] || module.default || module.segment;

      if (!segment) {
        console.warn(`片段 ${id} 在文件 ${tsFilePath} 中未找到`);
        return undefined;
      }

      return segment;
    } catch (_error) {
      // 如果 .ts 文件加载失败，尝试 .md 文件
      try {
        const mdFilePath = `@/data/script/segments/${id}.md`;
        const module = await import(mdFilePath);
        const markdown = module.default || module.markdown;

        if (!markdown) {
          console.warn(`片段 ${id} 在文件 ${mdFilePath} 中未找到`);
          return undefined;
        }

        // 解析 Markdown
        return parseScriptV2(markdown, mdFilePath);
      } catch (mdError) {
        console.warn(`无法加载片段 ${id}:`, mdError);
        return undefined;
      }
    }
  }

  /**
   * 预加载多个片段
   */
  async preload(ids: string[]): Promise<void> {
    await Promise.all(ids.map((id) => this.load(id)));
  }

  /**
   * 清空缓存
   */
  clearCache(): void {
    this.cache.clear();
  }
}

// 全局单例
export const segmentLoader = new SegmentLoader();
