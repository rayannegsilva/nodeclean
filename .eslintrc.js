module.exports = {
  overrides: [
    {
      files: ['*.jsx', '*.ts', '*.tsx'],
      extends: 'standard-with-typescript',
      parserOptions: {
        project: './tsconfig.json',
        ecmaVersion: 'latest',
      },
      env: {
        es6: true,
      },
       rules: {
        "@typescript-eslint/consistent-type-definitions": "off",
        "@typescript-eslint/no-namespace": "off",
        "@typescript-eslint/consistent-type-imports": "off",
        "@typescript-eslint/no-confusing-void-expression": "off",
        "@typescript-eslint/strict-boolean-expressions": "off",
        "@typescript-eslint/method-signature-style": "off"
      }
    }
  ],
}
