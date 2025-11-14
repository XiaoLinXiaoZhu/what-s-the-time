
# 可长期演进的分层架构重构规范（详细版）

---

## 1. 设计哲学与核心原则

### 1.1 设计哲学

本架构的核心目标是构建一个能够长期演进、易于理解和维护的系统。我们通过严格的分层和明确的职责划分，将软件的复杂性（业务逻辑、状态管理、副作用）完全分离，从而实现对复杂性的完全掌控。

### 1.2 核心原则

- **KISS原则**：保持简单直接。每个组件只做一件事，并做好它。避免过度设计和不必要的抽象。
- **DRY原则**：不要重复自己。任何重复出现超过两次的业务逻辑必须抽象为独立函数。
- **YAGNI原则**：你不会需要它。只实现当前需要的功能，避免为未来做过度设计。
- **依赖成熟库**：不要重复造轮子。优先选用社区成熟、经过验证的库，减少自维护成本。
- **约定优于配置**：通过明确的约定减少配置项，提高开发效率。
- **显式优于隐式**：所有依赖、流程和状态都应该是显式的，避免魔法和隐式约定。

### 1.3 SOLID 精神（无类亦可实现）

SOLID 原则是面向对象设计的基石，其精神同样适用于我们的函数式分层架构。

- **单一职责**：每个函数/模块/Service 只做一件事。
- **开闭原则**：通过组合/高阶函数扩展功能，禁止直接修改原有实现。
- **里氏替换**：所有 Service/Module/工具均通过接口（类型）暴露，便于 mock/替换。
- **接口隔离**：只暴露最小必要接口，避免"胖接口"。
- **依赖倒置**：高层 Service 依赖抽象（类型），具体实现由 main wiring 注入。

---

## 2. 四层架构与依赖方向

### 2.1 架构概览

本规范采用 `Kernel → Module → Service → Main` 四层架构，强调依赖单向、职责分明、可组合、可测试、可维护。

### 2.2 依赖方向戒律

> **依赖方向戒律：** 仅允许从左到右的单向依赖。严禁任何形式的反向依赖或跨层依赖。
>
> **依赖流向：** `Kernel` → `Module` → `Service` → `Main`

### 2.3 层级定义

#### 2.3.1 Kernel 层 (`src/kernels/`)
- **职责**：提供**无业务语义**的**跨项目通用工具**和**系统级能力封装**。注意必须是业务无关的，也就是说，如果该模块中存在任何业务相关的逻辑比如具体的类型等，那么它就不应该属于 Kernel 层。
- **特点**：允许副作用，但禁止持有状态；可跨项目复用；为上层提供纯粹的副作用隔离。
- **示例**：文件读写、网络请求、定时器、日志记录、性能上报等。

#### 2.3.2 Module 层 (`src/modules/`)
- **职责**：封装有业务语义、但完全无状态的逻辑单元。
- **特点**：纯函数集合；可持有不可变状态（如配置常量）；核心业务逻辑的载体；包含**流程编排器**。
- **Orchestrator定义**：`Orchestrator`是`Module`层的一种高级形态，是一个自定义类，封装了一个完整的、有生命周期的业务流程（如状态机）。它自身无状态，通过接受外部注入的"能力函数"来驱动流程。

#### 2.3.3 Service 层 (`src/services/`)
- **职责**：系统中唯一允许持有运行时状态和管理生命周期的部分。
- **特点**：绝对隔离（`Service`之间禁止任何形式的直接或间接通信）；自主运行；能力暴露（每个`Service`对外只暴露一组最小化的"能力函数"）；状态封装。

#### 2.3.4 Main 层 (`src/main/`)
- **职责**：应用的启动入口和所有"胶水逻辑"的所在地。
- **特点**：禁止业务逻辑；依赖注入；流程编排；结构化组织（`Main`层可以是一个目录，按业务域或事件源组织多个文件）。

---

## 3. 核心交互模式

### 3.1 事件驱动的响应链

1.  **事件触发**：外部事件被一个`EventAdapter`类型的`Service`捕获。
2.  **Main层响应**：`EventAdapter`触发一个在`Main`层预先注册好的回调函数。
3.  **Main层编排**：`Main`层的`handler`函数被调用，它实例化一个`Module`层的`Orchestrator`，并将所有需要的能力函数作为参数注入。
4.  **流程执行**：`Orchestrator`在`Module`层执行其内部的状态机或业务逻辑。
5.  **链路结束**：`Orchestrator.run()`执行完毕，控制权交还`Main`层。

---

## 4. 工程实践与编码规范

### 4.1 项目结构

```
src/
├── kernels/          # 系统能力抽象层
├── modules/          # 业务逻辑工具箱
├── services/         # 状态与生命周期容器
├── main/             # 依赖注入与流程编排的组装区
│   ├── init.ts       # 初始化阶段
│   ├── lifecycle.ts  # 生命周期管理
│   ├── triggers/     # 事件触发器注册
│   └── handlers/     # 业务流程处理器
├── types/            # 全局类型定义
├── config/           # 程序级配置
└── utils/            # 项目级工具函数
```

### 4.2 单元的通用文件组织

每个 Kernel、Module 或 Service 都是一个功能内聚的"单元"，其内部文件组织应遵循如下规范：

- **单一职责文件**：每个 .ts 文件只关注一个单一的职责。复杂单元应拆分为多个内部文件。
- **公共门面**：index.ts 是单元对外的唯一公共接口。简单工具可直接在index.ts中定义和导出，复杂工具建议拆分为单独文件。单元的内部实现细节（如 utils/ 目录下的文件）不应被单元外部直接导入。
- **types.ts 作为类型中心**：定义所有该单元对外暴露或内部复用的复杂类型与接口。
- **全局类型定义**：跨层共享的类型应放在 `src/types/` 目录下，使用 `@/types/` 别名导入。
- **config.ts（可选）**：只导出编译时确定的只读常量，用于消除魔法值。
- **utils/ 目录（可选）**：存放内部使用的、更细粒度的纯函数或工具。

#### 组织原则
- 复杂单元应拆分为多个文件，避免巨型 index.ts。
- 业务无关的底层工具优先放 kernel，业务相关但无状态的逻辑放 module。
- 只有 Service 层可以持有状态和副作用，其他层保持无状态。

### 4.3 严格的类型定义

类型安全是本项目的第一道防线。必须编写精确、无歧义的类型定义。

- **禁止使用 `any`**：`any` 类型会完全绕过 TypeScript 的类型检查，是类型安全的最大敌人。任何使用 `any` 的场景都必须被一个更具体的类型替代。
- **谨慎使用可选参数 `?`**：可选参数通常意味着一个函数或一个类型承担了过多的职责，或一个流程没有被正确定义。应优先考虑将变体拆分为不同的函数或使用联合类型。
- **使用判别式联合类型处理变体数据**：当一个对象有多种形态时，禁止使用一个带有可选 `any` 属性的宽泛类型。应定义多个具体的类型，然后使用联合类型。

**错误示例：**
```typescript
type Car = {
  name: string;
  metadata?: any; // ❌ 严禁
};
```

**正确示例：**
```typescript
// 正确示例：抽象为"多类型事件系统"（完整的 metadata + 判别式联合类型模式）

// 1. 定义每种事件类型对应的 metadata 映射表
interface EventMetadataMap {
  userLogin: {
    userId: string;
    ipAddress: string;
    timestamp: number;
  };
  userLogout: {
    userId: string;
    sessionDuration: number;
    timestamp: number;
  };
  dataSync: {
    recordCount: number;
    syncedAt: number;
    source: string;
  };
  errorOccurred: {
    errorCode: string;
    errorMessage: string;
    stackTrace: string;
    timestamp: number;
  };
}

// 2. 定义基础事件结构（使用泛型 + 映射类型确保类型安全）
type BaseEvent<T extends keyof EventMetadataMap> = {
  type: T;  // 判别字段
  metadata: EventMetadataMap[T];  // 类型安全的 metadata
  processed: boolean;
};

// 3. 为每种事件创建具体的类型别名
type UserLoginEvent = BaseEvent<'userLogin'>;
type UserLogoutEvent = BaseEvent<'userLogout'>;
type DataSyncEvent = BaseEvent<'dataSync'>;
type ErrorOccurredEvent = BaseEvent<'errorOccurred'>;

// 4. 组合为联合类型
type Event = 
  | UserLoginEvent 
  | UserLogoutEvent 
  | DataSyncEvent 
  | ErrorOccurredEvent;

// 5. 条件类型辅助工具（实现类型安全的访问）
type EventByType<T extends keyof EventMetadataMap> = 
  Extract<Event, { type: T }>;

// 6. 使用示例：类型会自动收窄
function handleEvent(event: Event) {
  if (event.type === 'userLogin') {
    // TypeScript 自动推断 event.metadata 的类型
    console.log(event.metadata.userId);     // ✅ 类型安全
    console.log(event.metadata.ipAddress);  // ✅ 类型安全
    // console.log(event.metadata.errorCode); // ❌ 编译错误
  }
}
```

**核心设计模式**：
1. **集中式 metadata 映射表**（`EventMetadataMap`）：为每种事件类型定义精确的 metadata 结构
2. **泛型基础类型**（`BaseEvent<T>`）：通过映射类型 `EventMetadataMap[T]` 确保类型安全
3. **判别字段**（`type`）：实现自动类型收窄
4. **显式类型别名**：提高可读性，便于文档和维护
5. **条件类型工具**：提供类型安全的查询能力

**关键优势**：
- 禁止使用 `metadata?: any` 或可选参数
- 新增事件类型时，TypeScript 强制要求在映射表中定义 metadata 结构
- 所有类型在编译时完全确定，运行时零开销
- 自动类型收窄，消除运行时类型检查代码

### 4.4 命名与格式化规范

- **文件/目录**：kebab-case（如：`user-service.ts`）
- **变量/函数**：camelCase（如：`getUserInfo`）
- **类/接口/类型**：PascalCase（如：`UserService`）
- **常量**：UPPER_SNAKE_CASE（如：`MAX_RETRY_COUNT`）
- **私有成员**：下划线前缀（如：`_internalState`）
- **格式化**：所有代码必须通过 Prettier 和 ESLint 格式化，并在提交时自动检查。

### 4.5 导入规范

- 使用ES Modules（`import/export`）。
- 跨单元导入用路径别名（如：`import { foo } from '@/modules/bar'`）。
- 单元内导入用相对路径（如：`import { foo } from './utils'`）。
- 导入顺序：第三方库 → 内部模块（`@/`） → 相对路径（`./`）。

### 4.6 代码抽象与文件规模

- **逻辑复用**：任何重复出现超过两次的业务逻辑必须抽象为独立函数。
- **函数规模**：建议不超过30行。
- **文件规模**：建议不超过300行。
- **圈复杂度**：建议不超过10。

### 4.7 配置管理

配置即代码，应享受与业务代码同等的类型安全保障。

- **禁止使用 `.env`、`.json`、`.yaml`、`.xml` 等进行配置。**
- **使用 TypeScript 和纯文本文件（`.txt`, `.md`）进行配置。**
- **程序级配置**：在 `src/config/` 目录下创建对应的配置条目，使用 `import` 直接导入使用。
- **模块级配置**：所有硬编码配置，都应该在模块的 `config.ts` 文件中导出。禁止任何硬编码。且该配置在运行时不可变。
- **类型校验**：所有的配置项都应该使用 `type` 严格定义类型。使用 `tsc` 在编译时完成配置校验，而不是编写运行时校验代码。

#### 4.7.1 简单配置示例

**从 `src/services/qq-client/config.ts` 提取的模式**：导出编译时常量

**抽象为通用示例**："数据库连接配置"

```typescript
/**
 * 数据库连接配置常量
 * 所有配置项在编译时确定，运行时不可变
 */

export const DEFAULT_CONNECTION_TIMEOUT = 10000;
export const DEFAULT_RETRY_INTERVAL = 5000;
export const DEFAULT_MAX_RETRY_INTERVAL = 30000;
export const DEFAULT_POOL_SIZE = 10;
export const DEFAULT_IDLE_TIMEOUT = 60000;
```

**关键点**：
- 使用 `UPPER_SNAKE_CASE` 命名
- 直接导出常量，不使用对象包裹
- 添加 JSDoc 注释说明配置用途

#### 4.7.2 复杂配置示例

**从 `src/toolcall/memory/config.ts` 提取的模式**：
- `as const` 断言
- `typeof` 派生类型
- `Record<K, V>` 结构化映射
- 内联注释文档

**抽象为通用示例**："API 端点配置"

```typescript
/**
 * API 端点配置
 */

// 1. 使用 as const 创建字面量类型
export const API_ENDPOINTS = [
  'users',
  'products',
  'orders',
  'analytics'
] as const;

// 2. 从常量派生联合类型
export type ApiEndpoint = typeof API_ENDPOINTS[number];
// 结果: 'users' | 'products' | 'orders' | 'analytics'

// 3. 使用 Record 创建结构化配置映射
export const ENDPOINT_CONFIG: Record<ApiEndpoint, {
  rateLimit: number;      // 每分钟请求数
  cacheDuration: number;  // 缓存时长（秒）
  requiresAuth: boolean;  // 是否需要认证
}> = {
  users: {
    rateLimit: 100,
    cacheDuration: 300,
    requiresAuth: true
  },
  products: {
    rateLimit: 200,
    cacheDuration: 600,
    requiresAuth: false
  },
  orders: {
    rateLimit: 50,
    cacheDuration: 60,
    requiresAuth: true
  },
  analytics: {
    rateLimit: 10,
    cacheDuration: 3600,
    requiresAuth: true
  }
};

// 4. 多层级配置示例
export const HTTP_METHOD_CONFIG = {
  GET: { idempotent: true, cacheable: true },
  POST: { idempotent: false, cacheable: false },
  PUT: { idempotent: true, cacheable: false },
  DELETE: { idempotent: true, cacheable: false }
} as const;

export type HttpMethod = keyof typeof HTTP_METHOD_CONFIG;
```

**关键优势**：
- TypeScript 编译器自动验证配置完整性
- 新增端点时，`Record` 类型会强制要求补全配置
- `as const` 确保配置不可变且类型精确
- 所有"魔法值"集中管理，便于维护

---

## 5. 测试策略

### 5.1 测试金字塔

- **Kernel层**：完备的单元测试（覆盖率≈100%）。
- **Module层**：纯粹的单元测试（覆盖率>95%），Mock所有Kernel依赖。
- **Service层**：集成测试，Mock所有外部依赖，重点进行并发测试。
- **Main层**：端到端测试，验证完整的业务流程。

---

## 6. 错误处理与可观测性

### 6.1 错误处理策略

- **Kernel/Module层**：可直接抛出异常或返回 `T | E` 模式。
- **Service/Main层**：必须使用 `try...catch` 处理可预见的外部错误。
- 所有外部调用必须包装在错误处理中，并提供有意义的错误信息和恢复策略。

### 6.2 可观测性

- 通过 `Kernel` 层的 `logger` 和 `reporter` 实现日志和指标收集。
- 关键业务流程应有明确的日志记录。

---

## 7. 四层架构详解

### 7.1 Kernel层 (`src/kernels/`)
- **职责**：提供通用工具函数和系统级工具，不关注任何业务逻辑
- **工具分类**：
  - **通用工具函数**：构建树状结构、logger、uuid生成、文本过滤、指数退避算法等
  - **系统级工具**：fs、http、timer、axios等（避免Service直接接触副作用）
- **特点**：允许副作用，但禁止持有状态，可跨项目复用。目的是让Module层完全不用关心副作用

### 7.2 Module层 (`src/modules/`)
- **职责**：有业务语义但无状态的业务逻辑工具箱
- **示例**：memory parser、context builder、search、openai formatter等
- **特点**：通过调用Kernel工具实现间接副作用，自身不持有状态，可被多个Service调用

### 7.3 Service层 (`src/services/`)
- **职责**：有状态且有业务语义的服务，负责业务编排和生命周期管理
- **示例**：schedule manager、timeout manager、memory storage、QQ adapter、CLI adapter等
- **特点**：唯一持有运行时状态的地方，Service 之间完全隔离，不直接或间接通信

#### Service分层设计原则
- **单一职责**：每个Service只负责一个业务领域（如调度、记忆、消息收发等）
- **无直接依赖**：Service 之间禁止直接导入，也禁止通过回调/事件等方式进行间接通信；所有跨服务协作一律由 Main 同时调用两边的能力函数来完成
- **状态封装**：每个Service封装自己的状态，不暴露内部实现
- **能力函数导出**：通过 TypeScript 类型定义"能力函数集合（capabilities）"，便于 mock/替换和最小授权
- **生命周期管理**：提供明确的初始化、运行、关闭生命周期
- **错误隔离**：Service内部错误不应影响其他Service的正常运行

### 7.4 Main层 (`src/main.ts` 或 `src/main/`)
- **职责**：应用启动与 wiring 组装点；显式编排"能力函数"；注册事件处理器（onMessage、onEvent 等）
- **特点**：禁止领域算法与状态持有；允许少量命令式流程控制、错误处理和日志；所有跨服务协作必须在 Main 层显式发生

### 7.5 v5 组装示例（零耦合服务 + 纯函数 Orchestrator）

```ts
// 1) init：创建服务并提取"能力函数"
const services = createServices();
const cap = extractCapabilities(services); // memoryRead/Write、llmGenerate、qqOnMessage/send 等

// 2) lifecycle：启动/关闭与内部周期任务
startApplication(services);
setupGracefulShutdown(services);

// 3) triggers：注册外部事件
cap.qqOnMessage(async (msg) => {
  await handleQQMessage(msg, cap);
});
cap.scheduleOnEvent(async (evt) => {
  await handleScheduleEvent(evt, cap);
});

// 4) handlers：显式编排（调用纯函数 orchestrator + 服务能力函数）
async function handleQQMessage(msg, cap) {
  const result = await orchestrateMessage({
    userMessage: msg.content,
    userId: msg.userId,
  }, {
    callLLM: cap.llmGenerate,
    appendMessages: cap.dialogAppendMessages,
    getHistory: cap.dialogGetHistory,
  });

  if (result.assistantMessage) {
    await cap.qqSendMessage(msg.peer, result.assistantMessage.content);
  }
}
```

要点：
- 服务之间不相互传参、也不相互注册回调；Main 单向拿取"能力函数"并组合使用
- Orchestrator 归属 Module 层，暴露纯函数；流程控制发生在 Main 的 handlers 中
- 事件型服务（QQ、Schedule）只提供 onX 注册入口，不承载编排逻辑

### 7.6 Main 四阶段结构（建议落地）

- init：加载配置、创建服务、提取能力函数（capabilities）
- lifecycle：启动服务、健康检查、状态上报、优雅关闭
- triggers：注册外部事件源（QQ onMessage、Schedule onEvent、HTTP webhook 等）
- handlers：命令式处理器，显式调用"模块纯函数 + 服务能力函数"完成业务流程

---

## 8. 层级内部结构与编码规范

### 8.1 单元的通用文件组织
每个 Kernel、Module 或 Service 都是一个功能内聚的"单元"，其内部文件组织应遵循如下规范：

- **单一职责文件**：每个 .ts 文件只关注一个单一的职责。复杂单元应拆分为多个内部文件。
- **index.ts 作为公共门面 (Public Facade)**：index.ts 是单元对外的唯一公共接口。简单工具可直接在index.ts中定义和导出，复杂工具建议拆分为单独文件。单元的内部实现细节（如 utils/ 目录下的文件）不应被单元外部直接导入。
- **types.ts 作为类型中心**：定义所有该单元对外暴露或内部复用的复杂类型与接口。
- **全局类型定义**：跨层共享的类型应放在 `src/types/` 目录下，使用 `@/types/` 别名导入。
- **config.ts（可选）**：只导出编译时确定的只读常量，用于消除魔法值。类似于 `reference/v4/src/toolcall/memory/config.ts` 中的配置常量。
- **utils/ 目录（可选）**：存放内部使用的、更细粒度的纯函数或工具。

#### 目录结构典型示例（以 src/modules/user-validator/ 为例）：
```
user-validator/
├── utils/          # (可选) 存放内部使用的、更细粒度的纯函数
│   ├── email.ts
│   └── password.ts
├── index.ts        # 唯一的公共出口，组装并导出最终的函数
├── types.ts        # 定义该单元的专属类型
└── config.ts       # (可选) 只读常量配置
```

#### 组织原则
- 复杂单元应拆分为多个文件，避免巨型 index.ts。
- 业务无关的底层工具优先放 kernel，业务相关但无状态的逻辑放 module。
- 只有 Service 层可以持有状态和副作用，其他层保持无状态。

### 8.2 Kernel 与 Module 的内部结构
- 只提供无状态的函数工具箱。允许副作用（通过 Kernel 工具），但自身不持有状态。
- effect.ts 相关内容全部取缔。
- 允许 config.ts 文件，只导出编译时确定的只读常量。

### 8.3 Service 的内部结构
- 封装状态和副作用，提供业务能力。
- 不再强制 effect.ts，副作用可直接在 Service 内部实现。
- 允许动态配置，可用 config.ts。
- 允许使用 class 或闭包，推荐 class（更易维护和表达状态）。

### 8.4 模块化与代码风格
#### 模块系统
- 强制使用 ES Modules（import/export）。
- 推荐具名函数导出（export const myFunction = ...）。

#### 导入路径规范
- 项目必须在 tsconfig.json 配置路径别名 {"@/*": ["src/*"]}。
- 跨单元导入用 @ 别名（如 import { foo } from '@/modules/bar'）。
- 单元内导入用相对路径（如 import { foo } from './utils'）。

#### 命名与格式化
- 变量/函数 camelCase，类型/接口 PascalCase，常量 UPPER_SNAKE_CASE，目录/文件 kebab-case。
- 所有代码必须通过 Prettier 和 ESLint 格式化。

#### 配置项管理
- 禁止使用.env,json,yaml,xml等进行配置。使用ts和纯文本文件（txt,md）进行配置。
- 对于 程序层面的配置项目，在 `src/config/` 目录下创建对应的配置条目，使用import直接导入使用。
- 对于 模块层面的 所有 硬编码配置，都应该在模块的 config.ts 文件中导出。禁止任何硬编码。且该配置在运行时不可变。
- 所有的配置项都应该使用 type 严格定义类型。使用tsc完成配置校验，而不是编写校验代码。

### 8.5 代码抽象与文件规模
#### 逻辑复用
- 任何重复出现超过两次的业务逻辑必须抽象为独立函数。

#### 文件与函数规模约束
- 函数建议不超 30 行。
- 文件建议不超 300 行。
- 单个函数圈复杂度建议不超 10。

#### 例外机制
- 对于复杂算法、模板代码、工具生成代码等特殊情况，超出上述建议时可在 Code Review 说明理由。

---

## 9. 专项工程实践

### 9.1 错误处理（分层策略）
- **Kernel/Module 层**：可直接抛出异常或返回 T | E，灵活处理。
  - 纯函数推荐返回 `T | E` 模式，便于组合和测试
  - 有副作用的函数可直接抛出异常，由上层处理
- **Service/Main 层**：必须使用 try...catch 处理可预见的外部错误。
  - 所有外部调用（网络、文件、数据库等）必须包装在 try...catch 中
  - 提供有意义的错误信息和恢复策略

### 9.2 测试（分层策略）
#### Kernel 层
- 完备的单元测试（覆盖率 ≈ 100%）。
#### Module 层
- 纯粹的单元测试（覆盖率 > 95%），严禁在业务代码中使用 Mock。
- 测试文件中可以使用 Mock 来隔离 Kernel 层依赖，确保测试独立性。
#### Service 层
- 集成测试，必须 Mock 掉所有外部依赖。
#### Main 层
- 端到端（E2E）测试。

### 9.3 其他全局规范
#### 性能优化哲学
- 禁止过早优化，必须遵循"测量 -> 分析 -> 优化 -> 验证"流程。

#### 代码注释与文档
- 重要类型、接口、导出函数必须有 JSDoc 注释。
- 复杂业务建议在index.ts中添加注释说明分层和依赖关系。

#### 依赖管理
- 禁止重复造轮子，优先选用社区成熟库。

#### 代码生成与 AI 协作
- 目录结构、命名、接口、注释务必清晰，便于 AI/人类快速定位和理解。

---

## 10. 长期演进与可维护性建议

- 规范应持续迭代，鼓励根据实际开发反馈补充完善。
- 目录结构、命名、接口、注释务必清晰，便于 AI/人类快速定位和理解。
- 复杂业务建议在index.ts中添加注释说明分层和依赖关系。
- 任何"有副作用但无状态"的工具优先归为 module，无需 service。
- 允许 service 层用 class 管理状态，module/kernel 层禁止 class。

---

> 本规范为长期可演进的分层架构基础，适用于各类中大型 TypeScript/Node.js 项目，尤其适合重构和 AI 协作场景。
