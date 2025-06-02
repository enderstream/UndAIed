// eslint.config.ts
import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  {
    ignores: ['dist'],
  },
  {
    // ============================================================
    // 1) extends: JS Recommended + TS Recommended
    // ============================================================
    extends: [js.configs.recommended, ...tseslint.configs.recommended],

    // ============================================================
    // 2) 대상 파일
    // ============================================================
    files: ['**/*.{ts,tsx}'],

    // ============================================================
    // 3) 언어 옵션
    // ============================================================
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },

    // ============================================================
    // 4) 플러그인
    // ============================================================
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },

    // ============================================================
    // 5) 커스텀 룰
    // ============================================================
    rules: {
      // React Hooks Recommended 룰을 그대로 가져오기
      ...reactHooks.configs.recommended.rules,

      // react-refresh 플러그인 중 “only-export-components” 룰만 경고로 설정
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  }
)
