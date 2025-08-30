import js from "@eslint/js";
import globals from "globals";
import pluginReact from "eslint-plugin-react";
import * as pluginTs from "@typescript-eslint/eslint-plugin";
import parserTs from "@typescript-eslint/parser"; // No * here, just import default
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    languageOptions: {
      parser: js,
      globals: globals.browser,
    },
    plugins: { js },
    extends: ["js/recommended"],
  },
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser: parserTs,
      parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: process.cwd(),
        sourceType: "module",
      },
      globals: globals.browser,
    },
    plugins: { "@typescript-eslint": pluginTs },
    extends: [
      "plugin:@typescript-eslint/recommended",
      "plugin:react/recommended",       // Add React rules for TS files
      "plugin:react-hooks/recommended" // Recommended hooks rules
    ],
    rules: {
      // You can add any overrides or rule customizations here
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
  // React rules for JS/JSX files outside TS config, keep it at root
  {
    files: ["**/*.{js,jsx}"],
    plugins: { react: pluginReact },
    extends: ["plugin:react/recommended", "plugin:react-hooks/recommended"],
    settings: {
      react: {
        version: "detect",
      },
    },
  },
  {
    ignores: ["**/node_modules/**", "**/.next/**", "**/dist/**"],
  },
]);
