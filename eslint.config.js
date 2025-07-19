import js from '@eslint/js'

export default [
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        Alpine: 'readonly',
        console: 'readonly',
        document: 'readonly',
        process: 'readonly',
        window: 'readonly',
      },
    },
    files: ['src/**/*.js', 'builds/**/*.js', 'scripts/**/*.js'],
  },
  {
    ignores: ['dist/**', 'node_modules/**'],
  },
]
