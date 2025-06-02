import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  {
    ignores: ['dist', 'node_modules'],
  },
  {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
    ],
    
    files: ['src/**/*.{ts,tsx}'],
    
    languageOptions: {
      ecmaVersion: 2025,
      globals: globals.browser,
    },
    
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    
    rules: {
      // React Hooks 필수 규칙
      ...reactHooks.configs.recommended.rules,
      
      // React Refresh (HMR)
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      
      // TypeScript 핵심 규칙
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/no-explicit-any': 'warn',
      
      // 기본 품질 규칙
      'no-console': 'warn',
      'no-debugger': 'error',
    },
  }
)