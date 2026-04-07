# pnpm monorepo 流程

## 初始化项目

1.  在root目录下创建packages目录、 apps目录
2.  创建pnpm-workspace.yaml文件
    1.  `touch pnpm-workspace.yaml`
    2.  ```yaml
        # pnpm-workspace.yaml

        packages:
          - "packages/*"
          - "apps/*"
        ```

3.  执行工程命令

    `pnpm --workspace-root [....] `init， install等.

    `pnpm --workspace-root init` 后续的install 命令可以用-Dw代替--workspace-root 如： `pnpm i -Dw typescript`

## 环境版本锁定

在根目录的package.json中添加版本锁定代码

```json
{
  "name": "monorepo-template",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "type": "module",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "packageManager": "pnpm@10.18.1",
  "engines": {
    "node": ">=20.18.3",
    "npm": ">=10.8.2",
    "pnpm": ">=10.18.1"
  }
}
```

通过加入engines现在如果环境不一致使用命令安装库只是弹出警告，如果需要报错则需要添加`.npmrc`文件并写入

```json
engine-strict=true
```

比如安装typescript，使用命令

`pnpm i -Dw typescript` (-Dw 就等同于 `pnpm i --workspace-root typescript`)

## Typescript

`pnpm i -Dw typescript`

`pnpm -Dw add typescript @types/node`

`touch tsconfig.json`

```json
// tsconfig.json
{
  "compilerOptions": {
    "baseUrl": ".",
    "module": "esnext",
    "target": "esnext",
    "types": [],
    "lib": ["esnext"],
    "sourceMap": true,
    "declaration": true,
    "declarationMap": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true,
    "strict": true,
    "verbatimModuleSyntax": true,
    "moduleResolution": "bundler",
    "isolatedModules": true,
    "noUncheckedSideEffectImports": true,
    "moduleDetection": "force",
    "skipLibCheck": true
  },
  "exclude": ["node_modules", "dist"]
}
```

下面子工程的单独ts配置可以在相关的子工程下建立tsconfig，然后extends 根目录的tsconfig即可（比如为app/backend中ts创建node环境）

```json
// apps/backend/tsconfig.json
{
  "extends": "../../tsconfig.json",
  "compilerOptions": {
    "types": ["node"],
    "lib": ["esnext"]
  },
  "include": ["src"]
}
```

```json
// apps/frontend/tsconfig.json (为前端创建dom环境 这样使用window等方法就不会报错了)
{
  "extends": "../../tsconfig.json",
  "compilerOptions": {
    "types": [],
    "lib": ["esnext", "dom"]
  },
  "include": ["src"]
}
```

## 代码风格与质量检查&#x20;

### prettier

#### prettier安装

&#x9;`pnpm -Dw add prettier`

#### prettier配置

&#x9;`touch prettier.config.js`

```json
	// prettier.config.js
/**
 * @type {import('prettier').Config}
 * @see https://www.prettier.cn/docs/options.html
 */

export default {
  // 指定最大换行长度
  printWidth: 120,
  // 缩进制表宽度 ｜ 空格数
  tabWidth: 2,
  // 使用制表符而不是空格进行缩进 (true: 制表符, false: 空格)
  useTabs: false,
  // 结尾不用分号 (true: 分号, false: 不加分号)
  semi: true,
  // 使用单引号 (true: 单引号, false: 双引号)
  singleQuote: false,
  // 在对象字面量中决定是否将属性名用括号括起来，可选值 “<as-needed|consistent|preserve>”
  quoteProps: "as-needed",
  // 在JSX中使用单引号而不是双引号 (true: 单引号, false: 双引号)
  jsxSingleQuote: false,
  // 多行尽可能打印尾随逗号，可选值"<none|es5|all>""
  trailingComma: "none",
  // 在对象，数组括号与文字之间加空格 "{ foo: bar }" (true: 加, false: 不加)
  bracketSpacing: true,
  // 将 > 多行元素放在最后一行的末尾，而不是单独放在下一行（true: 放末尾， false: 单独一行）
  bracketSameLine: false,
  // (x) => {} 箭头函数参数只有一个的时候是否要有小括号 （avoid: 省略括号, always: 不省略括号）
  arrowParens: "avoid",
  // 指定要使用的解析器，不需要写文件开头的 @prettier
  requirePragma: false,
  // 可以在文件顶部插入一个特殊的标记，指定该文件已经使用 Prettier 格式化
  insertPragma: false,
  // 用于控制文本是否应该被换行以及如何进行换行
  proseWrap: "preserve",
  // 在html中空格是否敏感的 “css” - 遵守 CSS 显示属性的默认值， ”strict“ - 空格认为是敏感的， ”ignore“ - 空格不敏感
  htmlWhitespaceSensitivity: "css",
  // 控制 Vue 在单文件组件中 <script> 和 <style> 标签内的代码缩进方式
  vueIndentScriptAndStyle: false,
  // 换行符使用 lf 结尾 可选值"<auto|lf|crlf|cr>"
  endOfLine: "auto",
  // 这两个选项可用于格式化以给定字符偏移量(分别包括和不包括)开头和结尾的代码(rangeStart: 开始, rangeEnd: 结束)
  rangeStart: 0,
  rangeEnd: Infinity,
};
```

#### prettier忽略项

&#x9;`touch .prettierignore`

```json
// .prettierignore
dist
public
.local
node_modules
pnpm-lock.yaml
```

#### prettier命令脚本

```json
  "scripts": {
	// ...其他项省略
    "lint:prettier": "prettier --write \"**/*.{js,ts,mjs,cjs,json,tsx,css,less,scss,vue,html,md}\"",
  },
```

#### 执行命令

`pnpm run lint:prettier`

### Eslint

#### Eslint 插件和规则集安装

`pnpm -Dw add eslint@latest @eslint/js globals typescript-eslint eslint-plugin-prettier eslint-config-prettier eslint-plugin-reac`

| 类别               | 库名                                                                                                                                      |
| :----------------- | :---------------------------------------------------------------------------------------------------------------------------------------- |
| 核心引擎           | eslint                                                                                                                                    |
| 官方规则集         | `@eslint/js`                                                                                                                              |
| 全局变量支持       | `globals` (防止eslint对于node环境和dom环境不支持报错)                                                                                     |
| Typescript支持     | `typescript-eslint`                                                                                                                       |
| 类型定义(辅助)     | @types/node                                                                                                                               |
| Prettier集成       | `eslint-plugin-prettier（将eslint和prettier的冲突问题报错到eslint中） eslint-config-prettier（当eslint和prettier冲突使用prettier的配置）` |
| React支持、vue支持 | `eslint-plugin-react` `eslint-plugin-vue`                                                                                                 |

#### Eslint 配置

`touch eslint.config.js`

```javascript
// eslint.config.js
import { defineConfig } from "eslint/config";
import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import eslintPluginPrettier from "eslint-plugin-prettier";
import eslintPluginReact from "eslint-plugin-react";
import globals from "globals";
import eslintConfigPrettier from "eslint-config-prettier/flat";

const ignores = ["**/dist/**", "**/node_modules/**", ".*", "scripts/**", "**/*.d.ts"];

export default defineConfig([
  // 🟢 通用配置（基础规则 + TS 支持）
  {
    ignores,
    extends: [eslint.configs.recommended, ...tseslint.configs.recommended, eslintConfigPrettier],
    plugins: {
      prettier: eslintPluginPrettier
    },
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parser: tseslint.parser
    },
    rules: {
      "no-var": "error"
    }
  },

  // 🟦 前端配置（React / Browser）
  {
    files: ["apps/frontend/**/*.{js,ts,jsx,tsx,vue}", "packages/components/**/*.{js,ts,jsx,tsx,vue}"],
    extends: [eslintConfigPrettier],
    plugins: {
      react: eslintPluginReact // 必须显式注册插件
    },
    rules: {
      ...eslintPluginReact.configs.recommended.rules
    },
    settings: {
      react: {
        version: "detect" // ✅ 自动从已安装的 React 版本检测
      }
    },
    languageOptions: {
      globals: {
        ...globals.browser
      }
    }
  },
  // 🟩 后端配置（Node.js）
  {
    files: ["apps/backend/**/*.{js,ts}"],
    languageOptions: {
      globals: {
        ...globals.node
      }
    }
  }
]);
```

#### Eslint脚本命令

```javascript
  "scripts": {
	// ...其他项省略
    "lint:eslint": "eslint",
  },
```

### 拼写检查

#### 安装

`pnpm -Dw add cspell @cspell/dict-lorem-ipsum`

#### 配置

`touch cspell.json`

```json
{
  "import": ["@cspell/dict-lorem-ipsum/cspell-ext.json"],
  "caseSensitive": false,
  "dictionaries": ["custom-dictionary"],
  "dictionaryDefinitions": [
    {
      "name": "custom-dictionary",
      "path": "./.cspell/custom-dictionary.txt", //根目录下面自己创建cspell文件夹和custom-dictionary为字典
      "addWords": true
    }
  ],
  "ignorePaths": [
    "**/node_modules/**",
    "**/dist/**",
    "**/build/**",
    "**/lib/**",
    "**/docs/**",
    "**/vendor/**",
    "**/public/**",
    "**/static/**",
    "**/out/**",
    "**/tmp/**",
    "**/*.d.ts",
    "**/package.json",
    "**/*.md",
    "**/stats.html",
    "eslint.config.mjs",
    ".gitignore",
    ".prettierignore",
    "cspell.json",
    "commitlint.config.js",
    ".cspell"
  ]
}
```

#### 自定义字典

`mkdir -p ./.cspell && touch ./.cspell/custom-dictionary.txt `&#x20;

#### 检查脚本

```json
 "scripts": {
	// ...其他项省略
    "lint:spellcheck": "cspell lint \"(packages|apps)/**/*.{js,ts,mjs,cjs,json,tsx,css,less,scss,vue,html,md}\"",
  },
```

## Git提交规范

### git仓库创建

`touch .gitignore`

```javascript
# See https://help.github.com/articles/ignoring-files/ for more about ignoring files.

# sitemap generated
/public/sitemap.xml

# dependencies
/node_modules
/.yarn
/.pnp
.pnp.js

# testing
/coverage

# production
/build

# misc
.DS_Store
.env.local
.env.development.local
.env.test.local
.env.production.local

npm-debug.log*
yarn-debug.log*
yarn-error.log*

.idea/*
.eslintcache
.vscode

# dev file

dev
```

`git init`

### commitizen

#### 安装

`pnpm -Dw add @commitlint/cli @commitlint/config-conventional commitizen cz-git`

- `@commitlint/cli` 是 commitlint工具的核心
- `@commitlint/config-conventional` 是基于conventional commits规范的配置文件
- `commitizen` 提供了一个交互式撰写commit信息的插件
- `cz-git` 是国人开发的工具，工程性更强、交互性更好、自定义更高

#### 配置命令

```json
// package.json
 "scripts": {
	// ...其他项省略
    "commit": "git-cz"
  },
 "config": {
    "commitizen": {
      "path": "node_modules/cz-git"
    }
  },

```

#### 配置cz-git

`touch commitlint.config.js`

```javascript
/** @type {import('@commitlint/types').UserConfig} */
export default {
  extends: ["@commitlint/config-conventional"],
  rules: {
    // @see: https:commitlint.js.org/#/reference-rules
    "body-leading-blank": [2, "always"],
    "footer-leading-blank": [1, "always"],
    "header-max-length": [2, "always", 108],
    "subject-empty": [2, "never"],
    "type-empty": [2, "never"],
    "subject-case": [0],
    "type-enum": [
      2,
      "always",
      [
        "feat",
        "fix",
        "docs",
        "style",
        "refactor",
        "perf",
        "test",
        "build",
        "ci",
        "chore",
        "revert",
        "wip",
        "workflow",
        "types",
        "release"
      ]
    ]
  },
  prompt: {
    types: [
      { value: "feat", name: "✨ 新功能: 新增功能" },
      { value: "fix", name: "🐛 修复: 修复缺陷" },
      { value: "docs", name: "📝 文档: 文档变更" },
      { value: "refactor", name: "🔨 重构: 代码重构" },
      { value: "perf", name: "🚀 性能: 性能优化" },
      { value: "test", name: "🚨 测试: 添加测试" },
      { value: "chore", name: "🔨 构建: 构建流程、外部依赖变更" },
      { value: "revert", name: "🔙 回滚: 回滚到上一个版本" },
      { value: "style", name: "💄 样式: 样式变更" },
      { value: "build", name: "🛠 构建: 构建流程、外部依赖变更" },
      { value: "ci", name: "🔧 CI: CI配置、脚本变更" },
      { value: "wip", name: "🚧 开发中: 开发中" },
      { value: "workflow", name: "🚧 工作流: 工作流变更" },
      { value: "types", name: "🔧 类型: 类型变更" },
      { value: "release", name: "🚀 发布: 发布新版本" }
    ],
    scopes: ["root", "backend", "frontend", "components", "utils"],
    allowCustomScopes: true,
    skipQuestions: ["body", "footerPrefix", "footer", "breaking"], // 跳过“详细描述” 和 “底部信息”
    message: {
      type: "📌 请选择提交的类型:",
      scope: "🎯 请选择影响范围（可选）:",
      subject: "💡 请简要描述本次提交（必填）:",
      body: "📝 请提供更详细的描述(可选):",
      footer: "🏷 关联的 ISSUE 或 BREAKING CHANGE (可选):",
      confirmCommit: "✅ 是否确认提交?"
    }
  }
};
```

后续执行git add 后再执行 `pnpm run commit`即可

### Husky(可以连接git hook，让项目在git前做一些工作)

#### 安装Husky

`pnpm -Dw add husky`

#### 初始化

`pnpx husky init`

#### 配置

初始化后在根目录下面会有 .husky目录，在里面的pre-commit中加入在commit前需要进行的校验(prettier、eslint、spellcheck)

    #!/usr/bin/env sh
    pnpm lint:prettier && pnpm lint:eslint && pnpm lint:spellcheck

### lint-staged (检查暂存区文件)

#### 安装

`pnpm -Dw add lint-staged`

#### 配置命令

```json
 "scripts": {
	// ...其他项省略
    "precommit": "lint-staged",
  },
```

#### 配置文件

`touch .lintstagedrc.js`

```javascript
// .lintstagedrc.js

export default {
  "*.{js,ts,mjs,cjs,jsx,json,tsx,css,less,scss,vue,html,md}": ["cspell --no-must-find-files"],
  "*.{js,ts,vue,jsx,tsx}": ["prettier --write", "eslint"]
};
```

### 为什么Husky和lint-staged要配合使用

如果用户不使用 pnpm commit 或者 pnpm pre-commit，直接使用git commit可以直接跳过lint-staged检查代码的步骤，但是husky可以通过hooks抓住这次请求，所以如果你既要使用lint-stage又要使用husky，建议在.husky/pre-commit 中加入 pnpm pre-commit步骤(正常用pnpm commit可能代码会走两次pnpm pre-commit)
