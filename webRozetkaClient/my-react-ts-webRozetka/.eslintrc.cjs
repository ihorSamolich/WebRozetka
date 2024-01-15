module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'quotes': ["error", "single"],             //
    'jsx-quotes': ["error", "prefer-double"],
    'eqeqeq': "error",                         //Вимагати використання === та !==
    'indent': ["warn", 4],
    'comma-dangle': ["error", "always-multiline"],
    'semi': ["error", "always"]
  },
}
