// eslint.config.ts
import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import react from 'eslint-plugin-react'
// import jsxA11y from 'eslint-plugin-jsx-a11y' // flat config 지원 확인 필요, 임시 비활성화
// import importPlugin from 'eslint-plugin-import' // flat config 지원 불완전으로 임시 비활성화
import tseslint from 'typescript-eslint'

export default tseslint.config(
  {
    ignores: [
      'dist', 
      'node_modules',
      // 파싱 에러 발생하는 설정 파일들만 제외
      'eslint.config.ts',
      'postcss.config.js', 
      'tailwind.config.js',
    ],
  },
  {
    // ============================================================
    // 1) 기본 설정 및 확장
    // ============================================================
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
    ],

    // ============================================================
    // 2) 대상 파일 (src 폴더의 TypeScript/React 파일들만)
    // ============================================================
    files: ['src/**/*.{ts,tsx}', 'src/**/*.{js,jsx}'],

    // ============================================================
    // 3) 언어 옵션 (TypeScript 최적화)
    // ============================================================
    languageOptions: {
      ecmaVersion: 2025,
      globals: {
        ...globals.browser,
        ...globals.es2025,
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        // Vite 프로젝트의 app용 tsconfig 참조
        project: './tsconfig.app.json',
      },
    },

    // ============================================================
    // 4) 플러그인
    // ============================================================
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'react': react,
      // 'jsx-a11y': jsxA11y, // flat config 지원 확인 필요, 임시 비활성화
      // 'import': importPlugin, // flat config 지원 불완전으로 임시 비활성화
    },

    // ============================================================
    // 5) React 19 + TypeScript 관련 설정
    // ============================================================
    settings: {
      react: {
        version: '19.0.0',
        runtime: 'automatic', // React 19 JSX Runtime
      },
      // import resolver는 import 플러그인 활성화 시에만 사용
      // 'import/resolver': {
      //   typescript: {
      //     alwaysTryTypes: true,
      //     project: './tsconfig.json',
      //   },
      // },
      // 'import/extensions': ['.ts', '.tsx'],
    },

    // ============================================================
    // 6) React 19 최적화 룰
    // ============================================================
    rules: {
      // ========== React Hooks 권장 룰 ==========
      ...reactHooks.configs.recommended.rules,

      // ========== React Refresh ==========
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],

      // ========== React 19 특화 룰 ==========
      // React 19에서는 React import 불필요
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'off',

      // ========== React 베스트 프랙티스 ==========
      'react/prop-types': 'off', // TypeScript 사용시 불필요
      'react/display-name': 'error',
      'react/jsx-key': 'error',
      'react/jsx-no-duplicate-props': 'error',
      'react/jsx-no-undef': 'error',
      'react/jsx-uses-vars': 'error',
      'react/no-danger-with-children': 'error',
      'react/no-deprecated': 'error',
      'react/no-direct-mutation-state': 'error',
      'react/no-unknown-property': 'error',
      'react/require-render-return': 'error',
      'react/self-closing-comp': 'warn',

      // ========== JSX 스타일링 (관대하게) ==========
      'react/jsx-closing-bracket-location': 'off', // 스타일 자유도 허용
      'react/jsx-closing-tag-location': 'warn',
      'react/jsx-curly-spacing': ['warn', 'never'],
      'react/jsx-equals-spacing': ['warn', 'never'],
      // 다음 룰들은 Prettier가 처리하므로 비활성화
      // 'react/jsx-first-prop-new-line': 'off',
      // 'react/jsx-indent': 'off', 
      // 'react/jsx-indent-props': 'off',
      // 'react/jsx-max-props-per-line': 'off',

      // ========== Import 관련 룰 (기본만) ==========
      // 주의: eslint-plugin-import의 flat config 지원이 불완전함
      // 필요시 eslint-plugin-import-x로 교체 고려

      // ========== 접근성 관련 (jsx-a11y 기본만) ==========
      // 주의: jsx-a11y의 flat config 지원 확인 필요
      // 'jsx-a11y/anchor-is-valid': 'warn',
      // 'jsx-a11y/alt-text': 'error',
      // 'jsx-a11y/aria-props': 'error',
      // 'jsx-a11y/aria-proptypes': 'error',
      // 'jsx-a11y/aria-unsupported-elements': 'error',
      // 'jsx-a11y/click-events-have-key-events': 'warn',
      // 'jsx-a11y/no-static-element-interactions': 'warn',

      // ========== TypeScript 전용 강화 룰 ==========
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/prefer-nullish-coalescing': 'error',
      '@typescript-eslint/prefer-optional-chain': 'error',
      '@typescript-eslint/no-unnecessary-type-assertion': 'error',
      '@typescript-eslint/no-non-null-assertion': 'warn',
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          prefer: 'type-imports',
          disallowTypeAnnotations: false,
        },
      ],

      // ========== React + TypeScript 조합 최적화 ==========
      'react/jsx-no-useless-fragment': 'warn',
      'react/jsx-fragments': ['warn', 'syntax'],
      'react/function-component-definition': [
        'warn',
        {
          namedComponents: 'arrow-function',
          unnamedComponents: 'arrow-function',
        },
      ],

      // ========== Vite + React 최적화 ==========
      // 컴포넌트 파일명은 PascalCase 권장
      // 'react/jsx-pascal-case': 'warn', // React 컴포넌트명 PascalCase

      // ========== TypeScript 프로젝트 코드 품질 ==========
      'no-console': 'warn',
      'no-debugger': 'error',
      'object-shorthand': 'warn',
      'prefer-template': 'warn',
    },
  },

  // ============================================================
  // 6) TypeScript 선언 파일용 설정
  // ============================================================
  {
    files: ['src/**/*.d.ts'],
    rules: {
      // 선언 파일에서는 관대한 룰 적용
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/consistent-type-imports': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      'prefer-const': 'off',
    },
  },

  // ============================================================
  // 8) TypeScript 테스트 파일용 별도 설정
  // ============================================================
  {
    files: ['src/**/*.test.{ts,tsx}', 'src/**/*.spec.{ts,tsx}', 'src/**/__tests__/**/*.{ts,tsx}'],
    rules: {
      // 테스트에서는 더 관대한 룰 적용
      'no-console': 'off',
      'no-debugger': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/consistent-type-imports': 'off',
      'react/display-name': 'off',
      'react-hooks/exhaustive-deps': 'off',
    },
  }
)