/**
 * 片段注册表
 *
 * 集中管理所有已加载的剧本片段，提供按 ID 和时间查找。
 */

import type { ScriptSegment } from "@/types";

class SegmentRegistry {
  private segments = new Map<string, ScriptSegment>();
  private timeIndex = new Map<string, string[]>();

  register(segment: ScriptSegment): void {
    this.segments.set(segment.id, segment);
    const ids = this.timeIndex.get(segment.time) ?? [];
    ids.push(segment.id);
    this.timeIndex.set(segment.time, ids);
  }

  registerAll(segments: ScriptSegment[]): void {
    for (const s of segments) this.register(s);
  }

  get(id: string): ScriptSegment | undefined {
    return this.segments.get(id);
  }

  getByTime(time: string): ScriptSegment[] {
    return (this.timeIndex.get(time) ?? [])
      .map((id) => this.segments.get(id))
      .filter((s): s is ScriptSegment => s !== undefined);
  }

  has(id: string): boolean {
    return this.segments.has(id);
  }

  getAllIds(): string[] {
    return [...this.segments.keys()];
  }

  clear(): void {
    this.segments.clear();
    this.timeIndex.clear();
  }
}

export const segmentRegistry = new SegmentRegistry();
