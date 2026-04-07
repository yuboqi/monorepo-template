import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";

const sharedIgnores = [
  "**/dist/**",
  "**/.turbo/**",
  "**/coverage/**",
  "**/node_modules/**"
];

export function createBaseConfig({
  files = ["**/*.{js,mjs,cjs,ts,mts,cts}"]
} = {}) {
  return tseslint.config(
    {
      ignores: sharedIgnores
    },
    js.configs.recommended,
    ...tseslint.configs.recommended,
    {
      files,
      languageOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        globals: {
          ...globals.browser,
          ...globals.node
        }
      },
      rules: {
        "@typescript-eslint/consistent-type-imports": "warn",
        "@typescript-eslint/no-unused-vars": [
          "warn",
          {
            "argsIgnorePattern": "^_",
            "varsIgnorePattern": "^_"
          }
        ]
      }
    }
  );
}

export function createReactConfig({
  files = ["**/*.{ts,tsx}"]
} = {}) {
  return tseslint.config(
    ...createBaseConfig({ files }),
    {
      files,
      plugins: {
        "react-hooks": reactHooks,
        "react-refresh": reactRefresh
      },
      rules: {
        ...reactHooks.configs.recommended.rules,
        "react-refresh/only-export-components": [
          "warn",
          { allowConstantExport: true }
        ]
      }
    }
  );
}
