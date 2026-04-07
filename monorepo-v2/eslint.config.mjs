import { createBaseConfig, createReactConfig } from "@repo/eslint-config";

export default [
  ...createBaseConfig({
    files: [
      "*.mjs",
      "apps/*/vite.config.ts",
      "packages/eslint-config/**/*.mjs",
      "packages/request/src/**/*.ts",
      "packages/utils/src/**/*.ts"
    ]
  }),
  ...createReactConfig({
    files: ["apps/*/src/**/*.{ts,tsx}", "packages/ui/src/**/*.{ts,tsx}"]
  })
];
