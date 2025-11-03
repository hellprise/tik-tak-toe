import js from '@eslint/js';
import typescript from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import importPlugin from 'eslint-plugin-import';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import prettier from 'eslint-plugin-prettier';
import unusedImports from 'eslint-plugin-unused-imports';
import nextPlugin from '@next/eslint-plugin-next';
import globals from 'globals';

export default [
	{
		ignores: [
			'node_modules/**',
			'.next/**',
			'dist/**',
			'coverage/**',
			'src/generated/**',
			'prisma/migrations/**',
		],
	},
	js.configs.recommended,
	{
		files: ['**/*.{js,jsx,ts,tsx}'],
		languageOptions: {
			parser: typescriptParser,
			parserOptions: {
				ecmaVersion: 'latest',
				sourceType: 'module',
				ecmaFeatures: {
					jsx: true,
				},
			},
			globals: {
				...globals.browser,
				...globals.node,
				myCustomGlobal: 'readonly',
			},
		},
		plugins: {
			'@typescript-eslint': typescript,
			react,
			'react-hooks': reactHooks,
			import: importPlugin,
			'jsx-a11y': jsxA11y,
			prettier,
			'unused-imports': unusedImports,
			'@next/next': nextPlugin,
		},
		settings: {
			react: { version: 'detect' },
			'import/resolver': {
				typescript: {
					alwaysTryTypes: true,
					project: './tsconfig.json',
				},
			},
		},
		rules: {
			'prettier/prettier': ['warn', { endOfLine: 'auto' }],
			'no-empty': 'warn',
			'prefer-const': 'warn',
			'no-use-before-define': 'error',
			'no-debugger': 'error',
			'no-console': 'warn',
			'no-unused-vars': 'warn',
			'@typescript-eslint/no-explicit-any': 'warn',
			'@typescript-eslint/no-unused-vars': 'warn',
			// '@typescript-eslint/no-unused-vars': [
			// 	'warn',
			// 	{
			// 		vars: 'all',
			// 		varsIgnorePattern: '^_',
			// 		args: 'after-used',
			// 		argsIgnorePattern: '^_',
			// 	},
			// ],
			'unused-imports/no-unused-imports': 'warn',
			'unused-imports/no-unused-vars': 'warn',
			// 'unused-imports/no-unused-vars': [
			// 	'warn',
			// 	{
			// 		vars: 'all',
			// 		varsIgnorePattern: '^_',
			// 		args: 'after-used',
			// 		argsIgnorePattern: '^_',
			// 	},
			// ],
			'@typescript-eslint/no-unused-expressions': 'warn',
			'react-hooks/exhaustive-deps': 'warn',
			'import/order': [
				'warn',
				{
					groups: [
						'builtin',
						'external',
						'internal',
						['parent', 'sibling', 'index'],
						'type',
						'object',
					],
					pathGroups: [
						{
							pattern: 'react',
							group: 'external',
							position: 'before',
						},
						{
							pattern: 'next',
							group: 'external',
							position: 'before',
						},
						{
							pattern: '@/app/**',
							group: 'internal',
							position: 'after',
						},
						{
							pattern: '@/entities/**',
							group: 'internal',
							position: 'after',
						},
						{
							pattern: '@/features/**',
							group: 'internal',
							position: 'after',
						},
						{
							pattern: '@/shared/**',
							group: 'internal',
							position: 'after',
						},
						{
							pattern: '@/kernel',
							group: 'internal',
							position: 'after',
						},
						{
							pattern: '@/generated/**',
							group: 'internal',
							position: 'after',
						},
					],
					pathGroupsExcludedImportTypes: ['builtin'],
					'newlines-between': 'always',
					alphabetize: {
						order: 'asc',
						caseInsensitive: true,
					},
				},
			],
			'react/jsx-key': 'error',
			'react/self-closing-comp': 'warn',
			'react/no-unescaped-entities': 'off',
			'jsx-a11y/alt-text': 'warn',
			'jsx-a11y/anchor-is-valid': 'warn',
			'react/react-in-jsx-scope': 'off',
			'@tanstack/query/no-rest-destructuring': 'off',
		},
	},
];
