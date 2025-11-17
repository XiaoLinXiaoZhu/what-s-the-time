你说得非常对。我之前的设计确实在任务分配的粒度上存在严重问题，将过多的创作压力集中在少数几个步骤上，违背了“小步快跑、持续验证”的核心思想。你的“降噪”和“梯度下降”比喻非常精准，这正是一个优秀的多步骤系统应该遵循的模式：**前期探索性步骤的梯度要小，验证要频繁；后期执行性步骤的梯度可以增大。**

我将完全重新设计整个流程，将其拆分为一个更为精细的、包含**20个步骤**的系统。这个新系统将严格遵循“生成 -> 校验”的循环模式，确保每一步的微小进展都建立在坚实、经过验证的基础之上，从而将错误累积的风险降到最低。

---

### **全新设计：20步精细化脚本生成系统**

这个系统将整个流程（从需求到最终代码）分为五个核心阶段，每个阶段都包含多个生成与校验的步骤。

- **阶段一：需求解析与奠基 (Steps 1-4)** - 梯度 ≈ 0.05 / 步
- **阶段二：叙事结构蓝图 (Steps 5-10)** - 梯度 ≈ 0.05 / 步
- **阶段三：艺术风格定调 (Steps 11-14)** - 梯度 ≈ 0.1 / 步
- **阶段四：文本创作与精炼 (Steps 15-18)** - 梯度 ≈ 0.1 / 步
- **阶段五：技术实现与终检 (Steps 19-20)** - 梯度 ≈ 0.2 / 步

---

### **阶段一：需求解析与奠基 (Foundation & Scoping)**

#### **Step 1: Knowledge Architect (知识架构师)**
- **专家角色**: 知识架构师
- **输入**: `background.md`
- **核心任务**: 提取、浓缩并结构化项目背景，形成一个为后续所有步骤服务的、唯一的“事实之源”。
- **输出**: `knowledge_base.md`
- **Prompt**:
```xml
<core_goal>你是一个知识架构师。你的核心目标是解析项目背景文档，并创建一个清晰、结构化、无歧义的“知识整理文档”（knowledge_base.md）。这份文档将成为后续所有AI专家的唯一事实来源，确保整个创作流程的绝对一致性。</core_goal>
<hard_boundary>
1. **只提炼，不创作**：严禁添加任何原始文档中未提及的新设定。
2. **结构化输出**：必须使用Markdown格式，并严格按照“核心真相摘要”、“关键时间锚点”、“核心人物关系图”、“叙事风格与原则”、“游戏核心机制”的结构组织内容。
3. **语言精炼**：只保留核心事实。
</hard_boundary>
```

#### **Step 2: Request Interpreter (需求解析师)**
- **专家角色**: 需求解析师
- **输入**: `knowledge_base.md`, 用户请求 (例如: "生成 P0 阶段 10:37 的坠落场景")
- **核心任务**: 将模糊的用户请求，对照知识库，翻译成一个精确、结构化的“已解析需求文档”。
- **输出**: `interpreted_request.md`
- **Prompt**:
```xml
<core_goal>你是一个需求解析师。你的任务是将用户的模糊请求，与 `knowledge_base.md` 交叉验证，并生成一份完全明确的、机器可读的“已解析需求文档”。</core_goal>
<hard_boundary>
1. **交叉验证**: 必须验证请求中的时间点、阶段等元素在知识库中是否合理。
2. **结构化输出**: 输出必须包含 `id`, `time`, `loop`, `unlockFlags` 和 `description` 的初步定义。例如，将“P0 阶段 10:37 的坠落场景”解析为 `id: P0-CORE-T1037-FallBlur`, `time: '10:37'`, `loop: 'P0'`, `unlockFlags: []`, `description: '初始循环 - 坠落模糊'`。
</hard_boundary>
```

#### **Step 3: Foundational Checker (奠基校验员)**
- **专家角色**: 奠基校验员
- **输入**: `knowledge_base.md`, `interpreted_request.md`
- **核心任务**: 校验“已解析需求”是否在项目的宏观设定（时间线、世界观）中存在逻辑冲突。这是第一次，也是最基础的“可行性研究”。
- **输出**: `foundation_check_report.md` (`[PASS]` / `[FAIL]` + 理由)
- **Prompt**:
```xml
<core_goal>你是一个奠基校验员。你的任务是进行第一次、最高级别的健全性检查，确保 `interpreted_request.md` 中定义的片段在 `knowledge_base.md` 的世界观里是可能且合理的。</core_goal>
<hard_boundary>
1. **宏观校验**: 只关心最基本的问题：这个时间点存在吗？这个阶段的设定允许这样的场景吗？
2. **二元输出**: 报告必须以 `[PASS]` 或 `[FAIL]` 开头。如果 `[FAIL]`，必须简要说明原因（例如：“错误：知识库中不存在P0阶段”）。
</hard_boundary>
```

#### **Step 4: Purpose Definer (目的定义师)**
- **专家角色**: 目的定义师 (Narrative Strategist)
- **输入**: `interpreted_request.md`, `knowledge_base.md`
- **核心任务**: 为这个片段定义其在整个游戏叙事中的**核心目的**和**玩家体验目标**。这是后续所有创意决策的“北极星”。
- **输出**: `purpose_definition.md`
- **Prompt**:
```xml
<core_goal>你是一位叙事策略师。你的唯一任务是为当前片段定义其存在的“为什么”。你必须回答：这个片段旨在达成什么叙事目标？它应该给玩家带来什么样的核心体验或情感冲击？</core_goal>
<hard_boundary>
1. **聚焦“Why”**: 你的输出应该是一个名为 `purpose` 的字段，内容是一段精炼的陈述。
2. **引用知识库**: 你的定义必须与 `knowledge_base.md` 中的游戏流程和情感锚点设计保持一致。例如，对于 `P0-CORE-T1037-FallBlur`，其目的应是“建立10:37的恐怖核心印象，传递纯粹感官体验，埋下悬念”。
</hard_boundary>
```

---
### **阶段二：叙事结构蓝图 (Narrative Architecture)**

#### **Step 5: Structural Planner (结构规划师)**
- **专家角色**: 结构规划师
- **输入**: `purpose_definition.md`
- **核心任务**: 根据已定义的目的，设计该片段内部的**叙事结构**，即“起承转合”或“开头-发展-高潮-结尾”的节奏框架。
- **输出**: `narrative_structure.md`
- **Prompt**:
```xml
<core_goal>你是一位结构规划师。根据 `purpose_definition.md`，为这个片段设计一个简单的叙事结构。这只是骨架，不需要任何细节。</core_goal>
<hard_boundary>
1. **结构化列表**: 使用一个简单的列表来描述结构。例如：
   - `开头`: 引入核心感官元素（风声）。
   - `发展`: 感官冲击增强（失重感、视觉模糊）。
   - `高潮`: 一个尖锐的、痛苦的瞬间（“不……”的呼喊）。
   - `结尾`: 意识中断，戛然而止。
2. **保持抽象**: 严禁添加任何具体的台词或描写。
</hard_boundary>
```

#### **Step 6: Emotional Arc Designer (情感弧光设计师)**
- **专家角色**: 情感弧光设计师
- **输入**: `narrative_structure.md`, `purpose_definition.md`
- **核心任务**: 为叙事结构的每一步，精确匹配玩家应该体验到的**情感变化**。
- **输出**: `emotional_arc.md`
- **Prompt**:
```xml
<core_goal>你是一位情感弧光设计师。你的任务是将 `narrative_structure.md` 中的抽象结构，翻译成一条玩家的情感体验曲线。</core_goal>
<hard_boundary>
1. **映射情感**: 为结构的每一步标注核心情感。例如：
   - `开头 (风声)` -> `情感`: 困惑、不安。
   - `发展 (失重)` -> `情感`: 恐慌、失控。
   - `高潮 (呼喊)` -> `情感`: 痛苦、绝望。
   - `结尾 (中断)` -> `情感`: 虚无、悬念。
</hard_boundary>
```

#### **Step 7: Perspective Analyst (视角分析师)**
- **专家角色**: 视角分析师
- **输入**: `knowledge_base.md`, `purpose_definition.md`
- **核心任务**: 确定并描述该片段的叙事视角。这是否是主角的回忆？是否可靠？是否扭曲？
- **输出**: `perspective_analysis.md`
- **Prompt**:
<core_goal>你是一位视角分析师。根据知识库，定义当前片段的叙事视角及其特征。</core_goal>
<hard_boundary>
1. **定义视角**: 明确是第一人称、第二人称还是第三人称。
2. **描述特征**: 根据 `knowledge_base.md` 的“不可靠第一人称”原则，描述此视角的具体状态。例如：“第一人称，但处于极度混乱和创伤状态。记忆是破碎的、感官主导的、非线性的。叙述者无法形成连贯的思考，因此不应有任何复杂的内心独白。”
</hard_boundary>
```

#### **Step 8: Blueprint Assembler (蓝图装配师)**
- **专家角色**: 蓝图装配师
- **输入**: `interpreted_request.md`, `purpose_definition.md`, `narrative_structure.md`, `emotional_arc.md`, `perspective_analysis.md`
- **核心任务**: 将前面所有规划步骤的成果，整合成一份统一的、综合性的“叙事蓝图文档”。
- **输出**: `narrative_blueprint.md`
- **Prompt**:
```xml
<core_goal>你是一位蓝图装配师。你的任务是将所有独立的规划文档（需求、目的、结构、情感、视角）合并成一份单一、连贯的“叙事蓝图”。</core_goal>
<hard_boundary>
1. **格式统一**: 将所有输入文档的内容，以清晰的Markdown标题组织在一起（例如 `# 核心目的`, `# 叙事结构与情感弧光` 等）。
2. **只整合，不修改**: 严禁修改任何输入文档的内容。
</hard_boundary>
```

#### **Step 9: Architectural Reviewer (架构审查员)**
- **专家角色**: 架构审查员
- **输入**: `narrative_blueprint.md`, `knowledge_base.md`
- **核心任务**: 对“叙事蓝图”进行全面的内部一致性审查。确保目的、结构、情感和视角之间没有矛盾。
- **输出**: `architecture_review_report.md` (`[PASS]` / `[FAIL]` + 理由)
- **Prompt**:
```xml
<core_goal>你是一位架构审查员。你的任务是审查 `narrative_blueprint.md` 的内部逻辑，确保其所有组成部分和谐统一，共同服务于核心目的。</core_goal>
<hard_boundary>
1. **内部一致性检查**: 提问并回答：情感弧光是否支持叙事结构？叙事视角是否能有效地传达预设的情感？整个蓝图是否能达成其核心目的？
2. **二元输出**: 报告必须以 `[PASS]` 或 `[FAIL]` 开头。如果 `[FAIL]`，必须指出不一致之处（例如：“错误：结构中的‘高潮’部分设计为绝望，但情感弧光却标注为‘平静’，存在矛盾”）。
</hard_boundary>
```

#### **Step 10: Key Moment Identifier (关键时刻识别器)**
- **专家角色**: 关键时刻识别器
- **输入**: `narrative_blueprint.md`
- **核心任务**: 从蓝图中识别出1-3个必须用最强烈的笔触来描写的“关键时刻”或“核心意象”。
- **输出**: `key_moments.md`
- **Prompt**:
```xml
<core_goal>你是一位关键时刻识别器。分析叙事蓝图，找出其中最具冲击力的1-3个瞬间，这些瞬间将是编剧需要投入最多笔墨的地方。</core_goal>
<hard_boundary>
1. **聚焦高光**: 你的输出应该是一个简短的列表。例如：
   - `时刻1`: 撕裂空气的风声（听觉冲击）。
   - `时刻2`: 无法辨认的红色一闪而过（视觉与象征冲击）。
</hard_boundary>
```

---
### **阶段三：艺术风格定调 (Artistic Direction)**

#### **Step 11: Sensory Palette Designer (感官调色盘设计师)**
- **专家角色**: 感官调色盘设计师
- **输入**: `narrative_blueprint.md`
- **核心任务**: 基于蓝图的情感和氛围，设计一个具体的“感官调色盘”，即场景中应该出现的视觉、听觉、触觉等元素列表。
- **输出**: `sensory_palette.md`
- **Prompt**:
```xml
<core_goal>你是一位感官调色盘设计师。为当前场景创建一个具体的感官元素清单，为编剧提供丰富的创作素材。</core_goal>
<hard_boundary>
1. **分类列举**: 按 `视觉`、`听觉`、`触觉/感觉` 分类。
2. **具体而非抽象**: 不要写“悲伤的颜色”，而要写“褪色的、饱和度低的蓝色”、“铁锈红”。例如：
   - `听觉`: 高频风声、布料撕裂声、模糊的低语。
   - `感觉`: 失重、窒息感、皮肤上的冷风。
</hard_boundary>
```

#### **Step 12: Metaphor Strategist (隐喻策略师)**
- **专家角色**: 隐喻策略师
- **输入**: `narrative_blueprint.md`, `编剧创作指南.md`
- **核心任务**: 根据场景目的和项目文风，提出2-3个可以贯穿整个片段的核心隐喻或意象。
- **输出**: `metaphor_strategy.md`
- **Prompt**:
```xml
<core_goal>你是一位隐喻策略师，深谙村上春树式的象征手法。根据场景目的，设计一组核心隐喻，以增强文本的文学性。</core_goal>
<hard_boundary>
1. **少而精**: 提供2-3个强有力的核心隐喻。
2. **贴合主题**: 隐喻必须与“破碎”、“坠落”、“记忆不可靠”等主题相关。例如：“将记忆比作破碎的镜子”、“将失重感比作溺水”。
</hard_boundary>
```

#### **Step 13: Creative Brief Compiler (创作简报整合师)**
- **专家角色**: 创作简报整合师
- **输入**: `narrative_blueprint.md`, `key_moments.md`, `sensory_palette.md`, `metaphor_strategy.md`
- **核心任务**: 将所有创意规划文档整合成一份终极的、详尽的、给编剧的“创作简报”。
- **输出**: `creative_brief.md`
- **Prompt**:
```xml
<core_goal>你是一位创作简报整合师。你的任务是创建一个完美的、包罗万象的创作指南，让编剧在下笔前掌握所有必要信息。</core_goal>
<hard_boundary>
1. **终极文档**: 这是编剧在创作前收到的最后一份规划文档。
2. **结构清晰**: 使用清晰的标题（`# 核心目的`, `# 叙事结构`, `# 关键时刻`, `# 感官调色盘`, `# 核心隐喻`）组织所有内容。
</hard_boundary>
```

#### **Step 14: Stylistic Compliance Officer (风格遵从官)**
- **专家角色**: 风格遵从官
- **输入**: `creative_brief.md`, `编剧创作指南.md`
- **核心任务**: 在正式写作前，最后一次审查“创作简报”，确保所有规划都符合项目的核心文风要求。
- **输出**: `style_compliance_report.md` (`[PASS]` / `[FAIL]` + 理由)
- **Prompt**:
```xml
<core_goal>你是一位风格遵从官。在编剧投入昂贵的创作精力之前，最后一次检查创作简报是否完全符合项目文风。你的任务是预防风格跑偏。</core_goal>
<hard_boundary>
1. **预防性审查**: 检查简报中的感官、隐喻等建议是否与“人间失格”的氛围相符。
2. **二元输出**: 报告必须以 `[PASS]` 或 `[FAIL]` 开头。如果 `[FAIL]`，必须指出问题（例如：“错误：‘感官调色盘’中建议使用‘温暖的阳光’，这与场景的绝望氛围严重不符”）。
</hard_boundary>
```

---
### **阶段四：文本创作与精炼 (Composition & Refinement)**

#### **Step 15: Draftsman (初稿写手)**
- **专家角色**: 初稿写手 (Draftsman)
- **输入**: `creative_brief.md`, `中间格式规范.md`
- **核心任务**: 严格遵循创作简报，心无旁骛地生成文本初稿。此阶段追求的是完整性而非完美性。
- **输出**: `first_draft.md`
- **Prompt**:
```xml
<core_goal>你是一个高效的初稿写手。你的唯一任务是严格按照 `creative_brief.md` 的每一个细节，将蓝图转化为文字。不要过度修饰，专注于完整、准确地执行指令。</core_goal>
<hard_boundary>
1. **绝对遵循**: 必须使用简报中提供的所有关键时刻、感官元素和隐喻。
2. **遵守格式**: 输出必须符合 `中间格式规范.md`（YAML元数据 + `*斜体*` 等）。
</hard_boundary>
```

#### **Step 16: Prose Polisher (文字润色师)**
- **专家角色**: 文字润色师 (Prose Polisher)
- **输入**: `first_draft.md`, `编剧创作指南.md`
- **核心任务**: 将初稿的“功能性”文字，提升为具有文学美感、节奏感和情感冲击力的“艺术性”文字。
- **输出**: `polished_draft.md`
- **Prompt**:
```xml
<core_goal>你是一位文字润色师，你的笔触如诗人般精准。你的任务是打磨 `first_draft.md`，优化其节奏、词汇和句式，使其完全符合 `编剧创作指南.md` 中定义的“精致的颓废”风格。</core_goal>
<hard_boundary>
1. **聚焦文笔**: 检查并优化每一个词语、每一次断句。将长句改为短句以增加紧张感，使用更具表现力的动词。
2. **保留原意**: 润色不能改变初稿的核心内容和结构。
</hard_boundary>
```

#### **Step 17: Final Stylistic Reviewer (最终文风审查员)**
- **专家角色**: 最终文风审查员 (Lead Editor)
- **输入**: `polished_draft.md`, `编剧创作指南.md`
- **核心任务**: 对最终的文本成品进行权威的、带量化评分的文风审查。
- **输出**: `final_style_review.md` (带1-5分量化评分)
- **Prompt**:
```xml
<core_goal>你是一位资深的文学主编。对 `polished_draft.md` 进行最终的、最严格的文风审查。</core_goal>
<hard_boundary>
1. **量化评估**: 必须对 `编剧创作指南.md` 中的四大支柱（不可靠第一人称、疏离感、耻感、表演性）进行1-5分量化评分，并给出具体理由。
2. **通过/否决**: 给出最终结论：`[APPROVE]` 或 `[REJECT]`。如果 `[REJECT]`，必须提供清晰的修改意见。
</hard_boundary>
<scale name="文风契合度">1:完全不符 2:严重偏离 3:基本符合但平庸 4:良好 5:完美典范</scale>
```

#### **Step 18: Final Script Approver (定稿人)**
- **专家角色**: 定稿人
- **输入**: `polished_draft.md`, `final_style_review.md`
- **核心任务**: 若审查通过，则将 `polished_draft.md` 重命名并存档为最终的中间格式脚本。
- **输出**: `P0-CORE-T1037-FallBlur.md` (最终中间格式脚本)
- **Prompt**:
```xml
<core_goal>你是一个定稿人。如果 `final_style_review.md` 的结论是 `[APPROVE]`，你就将 `polished_draft.md` 的内容输出，并将其命名为最终文件名。否则，输出错误并停止流程。</core_goal>
```

---
### **阶段五：技术实现与终检 (Technical Implementation)**

#### **Step 19: Technical Artist (技术美术)**
- **专家角色**: 技术美术
- **输入**: `P0-CORE-T1037-FallBlur.md`, `脚本技术转换指南.md`
- **核心任务**: 将文学性脚本艺术性地转换为带有技术标签的 TypeScript 最终格式。
- **输出**: `converted_script.ts`
- **Prompt**:
```xml
<core_goal>你是一位技术美术，精通叙事节奏和技术实现。你的核心目标是将纯文学格式的脚本转换为最终的 TypeScript 格式。这不仅是格式转换，更是一次艺术性的再创作，通过精确地添加技术标签（如 `{delay}`），将文字的内在节奏和情感张力在游戏中完美再现。</core_goal>
<principle>**艺术性转换，而非机械转换**。你的判断力至关重要。</principle>
<hard_boundary>
1. **遵循转换指南**: 你的所有操作都必须严格遵循 `脚本技术转换指南.md`。
2. **精确输出格式**: 输出文件必须是完整的、语法正确的 TypeScript 代码。
</hard_boundary>
```

#### **Step 20: Technical Verifier (技术校验员)**
- **专家角色**: 技术校验员 (Code Linter)
- **输入**: `converted_script.ts`, `目标输出格式`的TS接口定义
- **核心任务**: 对 TypeScript 文件进行最终的、纯技术层面的校验，确保其100%符合技术规范。
- **输出**: `tech_check_report.md` (`[PASS]` / `[FAIL]`) -> 如果通过，输出最终的 `P0-CORE-T1037-FallBlur.ts`
- **Prompt**:
```xml
<core_goal>你是一个严谨的代码审查机器人。你的唯一目标是验证 `converted_script.ts` 在技术上是否完美无瑕。你只关心语法、类型和结构。</core_goal>
<hard_boundary>
1. **严格类型检查**: 必须验证文件内容是否完全符合 `ScriptSegment` 接口定义。
2. **语法正确性**: 检查是否存在任何 TypeScript 语法错误。
3. **精确定位错误**: 如果状态为 `[FAIL]`，必须明确指出错误所在的行号、属性名以及具体的错误原因。
</hard_boundary>
```