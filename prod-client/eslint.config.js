import js from '@eslint/js';
import globals from 'globals';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';

export default [
    {
        ignores: ['dist/**', 'build/**', 'node_modules/**', 'coverage/**', '*.min.js', 'public/**']
    },
    {
        files: ['**/*.{js,jsx}'],
        languageOptions: {
            ecmaVersion: 2024,
            globals: {
                ...globals.browser,
                ...globals.es2024,
                ...globals.node
            },
            parserOptions: {
                ecmaVersion: 'latest',
                ecmaFeatures: { jsx: true },
                sourceType: 'module'
            }
        },
        settings: {
            react: { version: '18.3' },
            'import/resolver': {
                node: {
                    extensions: ['.js', '.jsx']
                }
            }
        },
        plugins: {
            react,
            'react-hooks': reactHooks,
            'react-refresh': reactRefresh
        },
        rules: {
            // Base ESLint recommended rules
            ...js.configs.recommended.rules,

            // React recommended rules
            ...react.configs.recommended.rules,
            ...react.configs['jsx-runtime'].rules,
            ...reactHooks.configs.recommended.rules,

            // Production-level error prevention
            'no-console': 'error',
            'no-debugger': 'error',
            'no-alert': 'error',
            'no-eval': 'error',
            'no-implied-eval': 'error',
            'no-new-func': 'error',
            'no-script-url': 'error',

            // Code quality rules
            'default-case': 'error',
            'default-case-last': 'error',
            eqeqeq: ['error', 'always'],
            // 'no-magic-numbers': [
            //     'warn',
            //     {
            //         ignore: [-1, 0, 1, 2],
            //         ignoreArrayIndexes: true,
            //         ignoreDefaultValues: true
            //     }
            // ],
            'no-unused-vars': [
                'error',
                {
                    vars: 'all',
                    args: 'after-used',
                    ignoreRestSiblings: true,
                    argsIgnorePattern: '^_'
                }
            ],
            'no-var': 'error',
            'prefer-const': 'error',
            'prefer-arrow-callback': 'error',
            'prefer-template': 'error',

            // React specific rules
            'react/prop-types': 'error',
            'react/jsx-no-target-blank': [
                'error',
                {
                    enforceDynamicLinks: 'always',
                    allowReferrer: true
                }
            ],
            'react/jsx-key': [
                'error',
                {
                    checkFragmentShorthand: true,
                    checkKeyMustBeforeSpread: true
                }
            ],
            'react/no-array-index-key': 'warn',
            'react/no-danger': 'warn',
            'react/no-deprecated': 'error',
            'react/no-direct-mutation-state': 'error',
            'react/no-unsafe': 'error',
            'react/jsx-no-duplicate-props': 'error',
            'react/jsx-no-undef': 'error',
            'react/jsx-uses-vars': 'error',
            'react/self-closing-comp': 'error',
            'react/jsx-pascal-case': 'error',
            'react/jsx-no-constructed-context-values': 'error',
            'react/jsx-no-useless-fragment': 'error',
            'react/no-unstable-nested-components': 'error',

            // React Hooks rules (enhanced)
            'react-hooks/rules-of-hooks': 'error',
            'react-hooks/exhaustive-deps': 'error',

            // React Refresh
            'react-refresh/only-export-components': [
                'warn',
                {
                    allowConstantExport: true,
                    allowExportNames: ['meta', 'links', 'headers', 'loader', 'action']
                }
            ],

            // Performance and best practices
            'no-unneeded-ternary': 'error',
            'object-shorthand': 'error',
            'prefer-destructuring': [
                'error',
                {
                    array: false,
                    object: true
                }
            ],

            // Error handling
            'no-throw-literal': 'error',
            'prefer-promise-reject-errors': 'error',

            // Security
            'no-new-wrappers': 'error',

            // Accessibility hints
            'jsx-a11y/alt-text': 'off' // Would need jsx-a11y plugin
        }
    },
    // Separate config for test files if needed
    {
        files: ['**/*.test.{js,jsx}', '**/*.spec.{js,jsx}', '**/test/**'],
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.jest
            }
        },
        rules: {
            'no-console': 'off',
            'no-magic-numbers': 'off'
        }
    }
];
