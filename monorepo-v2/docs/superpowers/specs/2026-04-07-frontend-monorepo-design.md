# Frontend Monorepo Design

## Goal

搭建一个前端 monorepo 的基础框架，包含三个应用：

- `admin`
- `web`
- `mobile`（H5）

同时提供共享基础设施：

- 公共工具函数
- 公共 UI 组件
- 公共 request 配置
- 共享 ESLint 配置
- 共享 TypeScript 配置

## Recommended Stack

- `pnpm workspace`
- `Turbo`
- `Vite`
- `React`
- `TypeScript`

## Architecture

### Applications

- `apps/admin`：管理后台
- `apps/web`：PC/Web 主站
- `apps/mobile`：移动端 H5

### Shared Packages

- `packages/utils`：公共工具方法
- `packages/ui`：公共展示组件
- `packages/request`：请求封装与默认配置
- `packages/eslint-config`：共享代码规范
- `packages/tsconfig`：共享 TS 配置

## Decisions

### Why Vite

当前目标是快速建立三个独立可运行的前端应用，Vite 的开发体验轻量，适合作为基础框架起点。

### Why Turbo

Turbo 能够统一管理构建、开发、lint、typecheck 等任务，便于后续在 CI/CD 中继续扩展。

### Why H5 for Mobile

用户已确认 `mobile` 目标是 H5，因此与 `admin`、`web` 统一使用 React + Vite，可以降低维护复杂度。

## Shared Capability Plan

### Utils

提供 `buildWorkspaceGreeting(appName)`，确保三个应用都实际引用同一个公共工具函数。

### UI

提供基础组件：

- `WorkspaceCard`
- `StatPill`

### Request

提供：

- `defaultRequestConfig`
- `createRequestClient`

用于统一管理 `baseURL`、`timeout`、请求头及 URL 拼接逻辑。

## Delivery

### Repo-Level Files

- `package.json`
- `pnpm-workspace.yaml`
- `turbo.json`
- `eslint.config.mjs`
- `README.md`

### App-Level Files

每个应用提供：

- `package.json`
- `tsconfig.json`
- `vite.config.ts`
- `index.html`
- `src/main.tsx`
- `src/App.tsx`
- `src/styles.css`

### Package-Level Files

每个共享包提供对应 `package.json`、`tsconfig.json` 与 `src/index.ts(x)`。

## Deployment Direction

三个应用均输出静态资源，可分别部署到：

- Vercel
- Netlify
- Nginx
- OSS / S3 + CDN

后续部署建议采用“每个 app 独立构建、独立发布”的策略。
