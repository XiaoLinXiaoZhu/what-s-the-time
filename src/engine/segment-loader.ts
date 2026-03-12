/**
 * 片段加载器
 *
 * 按需加载剧本片段，支持缓存和跨文件引用。
 */

import type { ScriptSegment } from "@/types";
import { parseScript } from "@/parser";
import { segmentRegistry } from "./segment-registry";

class SegmentLoader {
  private cache = new Map<string, ScriptSegment>();

  async load(id: string): Promise<ScriptSegment | undefined> {
    if (this.cache.has(id)) return this.cache.get(id);

    const registered = segmentRegistry.get(id);
    if (registered) return registered;

    const parsed = await this.loadFromFile(id);
    if (parsed) {
      this.cache.set(id, parsed);
      segmentRegistry.register(parsed);
      return parsed;
    }

    return undefined;
  }

  private async loadFromFile(id: string): Promise<ScriptSegment | undefined> {
    try {
      const module = await import(`@/data/script/segments/${id}.md`);
      const markdown = module.default || module.markdown;
      if (!markdown) return undefined;
      return parseScript(markdown);
    } catch {
      return undefined;
    }
  }

  async preload(ids: string[]): Promise<void> {
    await Promise.all(ids.map((id) => this.load(id)));
  }

  clearCache(): void {
    this.cache.clear();
  }
}

export const segmentLoader = new SegmentLoader();
