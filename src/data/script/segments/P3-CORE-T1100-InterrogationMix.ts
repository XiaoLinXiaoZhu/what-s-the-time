import type { ScriptSegment } from '@/types'

/**
 * 阶段3: 受害者剧本 (The Victim's Script)
 * 
 * P3-CORE-T1100-InterrogationMix
 * 作用: 确立主角的"受害者"身份和H的"嫌疑人"身份。
 * 诡计执行: 【主角自我洗脑】+【人物混淆】。
 * 伏笔: 老师F的过度保护。
 * 给予的线索: H的名字 (G警官正式提及)
 */
export const P3_CORE_T1100_InterrogationMix: ScriptSegment = {
  id: 'P3-CORE-T1100-InterrogationMix',
  time: '11:00',
  description: '阶段3 - 审讯混合',
  loop: 'P3',
  unlockFlags: [], // P2-CORE-T1037-DeathMix 后自动进入
        lines: []
}

