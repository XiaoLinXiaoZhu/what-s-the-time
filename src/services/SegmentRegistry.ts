import type { ScriptSegmentV2 } from '@/types/script-v2'

/**
 * 片段注册表
 * 
 * 职责：
 * - 集中管理所有片段
 * - 提供片段查找功能
 * - 支持片段缓存
 */
export class SegmentRegistry {
  private segments = new Map<string, ScriptSegmentV2>()
  private segmentIndex: Map<string, string[]> = new Map()  // time -> segmentIds
  
  /**
   * 注册片段
   */
  register(segment: ScriptSegmentV2): void {
    this.segments.set(segment.id, segment)
    
    // 索引时间点
    if (!this.segmentIndex.has(segment.time)) {
      this.segmentIndex.set(segment.time, [])
    }
    this.segmentIndex.get(segment.time)!.push(segment.id)
  }
  
  /**
   * 批量注册片段
   */
  registerAll(segments: ScriptSegmentV2[]): void {
    segments.forEach(segment => this.register(segment))
  }
  
  /**
   * 根据ID获取片段
   */
  get(id: string): ScriptSegmentV2 | undefined {
    return this.segments.get(id)
  }
  
  /**
   * 根据时间获取片段列表
   */
  getByTime(time: string): ScriptSegmentV2[] {
    const ids = this.segmentIndex.get(time) || []
    return ids.map(id => this.segments.get(id)!).filter(Boolean)
  }
  
  /**
   * 检查片段是否存在
   */
  has(id: string): boolean {
    return this.segments.has(id)
  }
  
  /**
   * 获取所有片段ID
   */
  getAllIds(): string[] {
    return Array.from(this.segments.keys())
  }
  
  /**
   * 清空注册表
   */
  clear(): void {
    this.segments.clear()
    this.segmentIndex.clear()
  }
  
  /**
   * 获取统计信息
   */
  getStats(): {
    totalSegments: number
    uniqueTimes: number
    segmentIds: string[]
  } {
    return {
      totalSegments: this.segments.size,
      uniqueTimes: this.segmentIndex.size,
      segmentIds: Array.from(this.segments.keys())
    }
  }
}

// 全局单例
export const segmentRegistry = new SegmentRegistry()
