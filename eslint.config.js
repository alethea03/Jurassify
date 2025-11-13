import js from '@eslint/js';
import typescriptPlugin from '@typescript-eslint/eslint-plugin';
import prettier from 'eslint-config-prettier';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';

/** @type {import('eslint').Linter.Config[]} */
export default [
    // Base JavaScript recommended rules
    js.configs.recommended,

    // React Hooks rules
    reactHooks.configs.recommended,

    // TypeScript rules
    typescriptPlugin.configs.recommended,

    // React rules
    {
        ...react.configs.recommended,
        languageOptions: {
            globals: {
                ...globals.browser,
            },
        },
        rules: {
            'react/react-in-jsx-scope': 'off',
            'react/prop-types': 'off',
            'react/no-unescaped-entities': 'off',
        },
        settings: {
            react: {
                version: 'detect',
            },
        },
    },

    // Ignore unnecessary folders
    {
        ignores: [
            'vendor',
            'node_modules',
            'public',
            'bootstrap/ssr',
            'tailwind.config.js',
        ],
    },

    // Prettier recommended rules
    prettier.configs.recommended,
];
