import type { ScriptSegment } from '@/types'

/**
 * TEST-TAGS：文本标签功能测试脚本
 * 用于测试所有支持的文本格式标签
 * 
 * 支持的标签类型：
 * - {red}...{/red} - 红色文本
 * - {bold}...{/bold} - 粗体
 * - {italic}...{/italic} - 斜体
 * - {blur}...{/blur} - 模糊文本
 * - {strike}...{/strike} - 删除线文本
 * - {br} - 换行
 * - {delay:1.2} - 延时（秒）
 * - {systemTime} - 系统当前时间（HH:MM格式，实时更新）
 * - {animateText:string1|string2|string3} - 动画文本（每0.5秒切换）
 */
export const TEST_TAGS: ScriptSegment = {
  id: 'TEST-TAGS',
  time: '00:02',
  description: '文本标签功能测试',
  loop: 'TEST',
  unlockFlags: [],
  lines: [
    {
      type: 'narration',
      text: '=== 文本标签功能测试 ==='
    },
    {
      type: 'narration',
      text: '本测试脚本用于验证所有支持的文本格式标签。'
    },
    {
      type: 'dialogue',
      text: '让我们开始测试各种标签效果...'
    },
    
    // 1. 基础格式标签测试
    {
      type: 'narration',
      text: '--- 1. 基础格式标签 ---'
    },
    {
      type: 'dialogue',
      text: '红色文本：{red}这是红色文字{/red}，这是普通文字。'
    },
    {
      type: 'dialogue',
      text: '粗体文本：{bold}这是粗体文字{/bold}，这是普通文字。'
    },
    {
      type: 'dialogue',
      text: '斜体文本：{italic}这是斜体文字{/italic}，这是普通文字。'
    },
    {
      type: 'dialogue',
      text: '模糊文本：{blur}这是模糊文字{/blur}，这是普通文字。'
    },
    {
      type: 'dialogue',
      text: '删除线文本：{strike}这是删除线文字{/strike}，这是普通文字。'
    },
    
    // 2. 换行标签测试
    {
      type: 'narration',
      text: '--- 2. 换行标签 ---'
    },
    {
      type: 'dialogue',
      text: '第一行{br}第二行{br}第三行'
    },
    {
      type: 'dialogue',
      text: '连续换行测试：{br}{br}{br}上面有三个换行'
    },
    
    // 3. 延时标签测试
    {
      type: 'narration',
      text: '--- 3. 延时标签 ---'
    },
    {
      type: 'dialogue',
      text: '延时前{delay:0.5}延时后（0.5秒）'
    },
    {
      type: 'dialogue',
      text: '短延时{delay:0.2}中延时{delay:0.8}长延时{delay:1.5}完成'
    },
    
    // 4. 系统时间标签测试
    {
      type: 'narration',
      text: '--- 4. 系统时间标签 ---'
    },
    {
      type: 'dialogue',
      text: '当前系统时间：{systemTime}（实时更新）'
    },
    {
      type: 'dialogue',
      text: '时间显示：现在是 {systemTime}，时间会实时更新。'
    },
    
    // 5. 动画文本标签测试
    {
      type: 'narration',
      text: '--- 5. 动画文本标签 ---'
    },
    {
      type: 'dialogue',
      text: '动画文本：{animateText:加载中|加载中.|加载中..|加载中...}'
    },
    {
      type: 'dialogue',
      text: '状态切换：{animateText:思考中|分析中|处理中|完成}'
    },
    {
      type: 'dialogue',
      text: '多状态动画：{animateText:等待|准备|执行|完成|就绪}'
    },
    
    // 6. 组合使用测试
    {
      type: 'narration',
      text: '--- 6. 组合使用测试 ---'
    },
    {
      type: 'dialogue',
      text: '红色粗体：{red}{bold}红色粗体文字{/bold}{/red}'
    },
    {
      type: 'dialogue',
      text: '红色斜体：{red}{italic}红色斜体文字{/italic}{/red}'
    },
    {
      type: 'dialogue',
      text: '粗体斜体：{bold}{italic}粗体斜体文字{/italic}{/bold}'
    },
    {
      type: 'dialogue',
      text: '复杂组合：{red}{bold}红色粗体{/bold}{/red} 和 {italic}斜体{/italic} 以及 {strike}删除线{/strike}'
    },
    
    // 7. 嵌套使用测试
    {
      type: 'narration',
      text: '--- 7. 嵌套使用测试 ---'
    },
    {
      type: 'dialogue',
      text: '嵌套测试：{bold}粗体中的{red}红色文字{/red}和{italic}斜体文字{/italic}{/bold}'
    },
    {
      type: 'dialogue',
      text: '多层嵌套：{red}红色{bold}粗体{italic}斜体文字{/italic}{/bold}结束{/red}'
    },
    
    // 8. 混合使用测试
    {
      type: 'narration',
      text: '--- 8. 混合使用测试 ---'
    },
    {
      type: 'dialogue',
      text: '混合测试：普通文字 {red}红色{/red} {bold}粗体{/bold} {delay:0.3}延时后{br}换行后的文字 {systemTime} 系统时间 {animateText:状态1|状态2|状态3}'
    },
    {
      type: 'dialogue',
      text: '复杂场景：{bold}重要提示{/bold}：请在 {systemTime} 之前完成。{br}当前状态：{animateText:初始化|处理中|完成} {delay:1.0} {red}警告{/red}：{blur}敏感信息{/blur}'
    },
    
    // 9. 边界情况测试
    {
      type: 'narration',
      text: '--- 9. 边界情况测试 ---'
    },
    {
      type: 'dialogue',
      text: '空标签内容：{bold}{/bold}（应该不显示）'
    },
    {
      type: 'dialogue',
      text: '只有开始标签：{bold}没有结束标签的文字'
    },
    {
      type: 'dialogue',
      text: '标签内的换行：{red}第一行{br}第二行{/red}'
    },
    {
      type: 'dialogue',
      text: '标签内的延时：{bold}延时前{delay:0.5}延时后{/bold}'
    },
    {
      type: 'dialogue',
      text: '标签内的系统时间：{red}当前时间：{systemTime}{/red}'
    },
    {
      type: 'dialogue',
      text: '标签内的动画文本：{bold}状态：{animateText:待机|运行|停止}{/bold}'
    },
    
    // 10. 实际应用场景示例
    {
      type: 'narration',
      text: '--- 10. 实际应用场景示例 ---'
    },
    {
      type: 'dialogue',
      character: '系统',
      text: '{red}{bold}警告{/bold}{/red}：系统将在 {systemTime} 进行维护。{br}请保存您的工作。'
    },
    {
      type: 'dialogue',
      character: '内心',
      text: '时间一分一秒地流逝...{delay:0.8}现在是 {systemTime}。{br}我{italic}必须{/italic}做出决定。'
    },
    {
      type: 'dialogue',
      character: '旁白',
      text: '屏幕上的文字不断变化：{animateText:思考|分析|决策|行动}...{delay:1.0}{br}最终，{bold}选择{/bold}已经做出。'
    },
    {
      type: 'dialogue',
      text: '{strike}旧的想法{/strike} {red}新的想法{/red} {bold}重要的想法{/bold}'
    },
    
    // 11. 测试完成
    {
      type: 'narration',
      text: '--- 测试完成 ---'
    },
    {
      type: 'dialogue',
      text: '所有标签测试已完成。{br}请检查上述所有标签是否正确渲染。'
    },
    {
      type: 'dialogue',
      text: '特别关注：{br}1. 格式是否正确应用{br}2. 延时是否生效{br}3. 系统时间是否实时更新{br}4. 动画文本是否正常切换{br}5. 嵌套和组合是否正确处理'
    }
  ]
}
