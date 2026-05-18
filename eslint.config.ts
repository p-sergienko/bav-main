import { defineConfig } from "eslint/config";
import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import prettier from "eslint-config-prettier";

export default defineConfig([
  {
    ignores: [
      "dist/**",
      "dist-electron/**",
      "release/**",
      "node_modules/**",

      "**/*.d.ts",
      "**/*.ts.build-*.mjs",

      "*.js",
      "*.mjs",
      "*.cjs",
    ],
  },

  js.configs.recommended,

  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,

  {
    files: ["**/*.{js,mjs,cjs,jsx,ts,tsx}"],

    ...react.configs.flat.recommended,

    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.serviceworker,
      },

      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",

        warnOnUnsupportedTypeScriptVersion: false,

        project: [
          "./tsconfig.app.json",
          "./tsconfig.electron.json",
          "./tsconfig.node.json",
        ],

        tsconfigRootDir: import.meta.dirname,
      },
    },

    settings: {
      react: {
        version: "detect",
      },
    },

    plugins: {
      "react-hooks": reactHooks as any,
    },

    rules: {
      ...reactHooks.configs.recommended.rules,

      "@typescript-eslint/consistent-type-imports": [
        "error",
        { prefer: "type-imports" },
      ],

      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],

      "@typescript-eslint/no-confusing-void-expression": "off",
      "@typescript-eslint/no-namespace": "off",

      "react/react-in-jsx-scope": "off",
      "react/jsx-uses-react": "off",
    },
  },

  react.configs.flat["jsx-runtime"],

  prettier,
]);