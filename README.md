<!-- 建议选择v2，README为v2文档 -->
# Frontend Monorepo Template

一个基于 `pnpm workspace + Turbo + Vite + React + TypeScript` 的前端 monorepo 基础框架，内置三个应用：

- `admin`：后台管理端
- `web`：PC/Web 业务站点
- `mobile`：H5 移动端站点

同时提供一组共享包，方便后续继续扩展业务能力：

- `@repo/utils`：公共工具函数
- `@repo/ui`：公共 UI 组件
- `@repo/request`：请求配置与请求客户端
- `@repo/eslint-config`：共享 ESLint 配置
- `@repo/tsconfig`：共享 TypeScript 配置

## 技术栈

- `pnpm` 管理 workspace
- `Turbo` 管理多包任务编排
- `Vite` 作为三个前端应用的构建工具
- `React + TypeScript` 作为页面开发基础
- `ESLint + shared config` 统一代码规范

## 目录结构

```text
.
├─ apps
│  ├─ admin
│  ├─ mobile
│  └─ web
├─ docs
│  └─ superpowers
│     └─ specs
├─ packages
│  ├─ eslint-config
│  ├─ request
│  ├─ tsconfig
│  ├─ ui
│  └─ utils
├─ eslint.config.mjs
├─ package.json
├─ pnpm-workspace.yaml
└─ turbo.json
```

## 快速开始

### 1. 安装依赖

```bash
pnpm install
```

### 2. 启动全部应用

```bash
pnpm dev
```

### 3. 单独启动某个应用

```bash
pnpm --filter @repo/admin dev
pnpm --filter @repo/web dev
pnpm --filter @repo/mobile dev
```

### 4. 常用命令

```bash
pnpm build
pnpm lint
pnpm typecheck
```

## 应用说明

### `apps/admin`

后台管理端示例，展示：

- 如何使用 `@repo/utils` 中的公共工具函数
- 如何使用 `@repo/ui` 中的共享 UI 组件
- 如何引用 `@repo/request` 中的请求配置

### `apps/web`

Web 业务站点示例，适合作为官网、运营页、门户页或业务首页的起点。

### `apps/mobile`

移动端 H5 示例，默认是标准 Vite React 应用，适合后续接入：

- 移动端营销页
- 活动页
- 移动端业务站点
- PWA 或 Hybrid 容器页面

## 共享包说明

### `@repo/utils`

当前内置了一个 `buildWorkspaceGreeting` 工具函数，三个应用均已引用。

```ts
import { buildWorkspaceGreeting } from "@repo/utils";
```

### `@repo/ui`

当前提供两个基础组件：

- `WorkspaceCard`
- `StatPill`

```tsx
import { WorkspaceCard, StatPill } from "@repo/ui";
```

### `@repo/request`

提供统一请求默认配置与请求客户端工厂。

```ts
import { createRequestClient, defaultRequestConfig } from "@repo/request";
```

默认能力包括：

- `baseURL`
- `timeout`
- `headers`
- `buildUrl(path)`
- `get(path)` 基础 GET 请求封装

### `@repo/eslint-config`

用于集中维护 monorepo 的 ESLint Flat Config，根目录的 `eslint.config.mjs` 已接入共享配置。

### `@repo/tsconfig`

统一维护 TypeScript 配置，应用和共享包通过 `extends` 复用。

## 后续扩展建议

### 新增应用

当你要增加新的前端应用时，建议直接在 `apps/` 下新增目录，例如：

```text
apps/marketing
```

然后复制一个现有应用的这几个文件即可快速起步：

- `package.json`
- `tsconfig.json`
- `vite.config.ts`
- `src/main.tsx`
- `src/App.tsx`
- `src/styles.css`

### 新增共享包

如果后续需要更多公共能力，建议按职责拆在 `packages/` 下，例如：

- `packages/hooks`
- `packages/constants`
- `packages/assets`
- `packages/business-sdk`

## 部署方式

这套模板里的三个应用都是标准的静态前端应用，构建产物默认输出到各自应用目录下的 `dist/`，因此部署方式非常灵活。

### 方式一：Vercel

适合快速部署单个应用。

以 `web` 为例：

- Install Command：`pnpm install`
- Build Command：`pnpm --filter @repo/web build`
- Output Directory：`apps/web/dist`

`admin` 和 `mobile` 也一样，只需要把 filter 和输出目录替换掉：

- `@repo/admin` -> `apps/admin/dist`
- `@repo/mobile` -> `apps/mobile/dist`

如果你希望三个应用分别部署成三个独立域名，这是最省心的方式。

### 方式二：Netlify

同样适合静态站点部署，配置方式与 Vercel 类似：

- Base directory：仓库根目录
- Build command：`pnpm --filter @repo/mobile build`
- Publish directory：`apps/mobile/dist`

可以为 `admin`、`web`、`mobile` 分别创建三个站点。

### 方式三：Nginx / 云服务器静态托管

适合你自己管理部署环境。

执行构建：

```bash
pnpm --filter @repo/admin build
pnpm --filter @repo/web build
pnpm --filter @repo/mobile build
```

然后把以下目录分别上传到你的静态资源目录：

- `apps/admin/dist`
- `apps/web/dist`
- `apps/mobile/dist`

可按域名或路径拆分，例如：

- `admin.example.com` -> `apps/admin/dist`
- `www.example.com` -> `apps/web/dist`
- `m.example.com` -> `apps/mobile/dist`

### 方式四：对象存储 + CDN

适合纯静态前端场景，例如：

- AWS S3 + CloudFront
- 阿里云 OSS + CDN
- 腾讯云 COS + CDN

构建后将各应用的 `dist/` 上传到对应 bucket 或目录即可。

## 推荐的 CI/CD 思路

后续可以在 GitHub Actions、GitLab CI 或 Jenkins 中按应用拆分构建：

```bash
pnpm install
pnpm lint
pnpm typecheck
pnpm --filter @repo/web build
```

如果以后应用和共享包变多，Turbo 的缓存能力会让构建速度更稳定。

## 适合继续补充的能力

- 路由方案：`react-router`
- 状态管理：`zustand` 或 `redux-toolkit`
- 网络层：接入真实 API 与环境变量配置
- 组件库：引入 `shadcn/ui` 或自建 design system
- 测试：`vitest`、`testing-library`
- 发布流程：CI/CD、Preview 环境、灰度部署

## 设计文档

本次初始化对应的设计说明已写入：

- `docs/superpowers/specs/2026-04-07-frontend-monorepo-design.md`
