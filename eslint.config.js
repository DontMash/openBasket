import { FlatCompat } from "@eslint/eslintrc";
import eslintPluginAstro from 'eslint-plugin-astro';
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
    baseDirectory: __dirname
});

export default [
    ...eslintPluginAstro.configs.recommended,
    ...compat.extends('plugin:jsx-a11y/strict')
];
