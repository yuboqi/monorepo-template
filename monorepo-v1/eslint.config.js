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
