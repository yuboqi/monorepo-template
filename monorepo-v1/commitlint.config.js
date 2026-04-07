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
