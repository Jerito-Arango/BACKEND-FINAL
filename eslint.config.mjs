// @ts-check
import eslint from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: ['eslint.config.mjs', 'node_modules/', 'dist/'], // Ignora archivos innecesarios
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  eslintPluginPrettierRecommended,
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      ecmaVersion: 5,
      sourceType: 'module',
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'warn', // Permite 'any' advertencias
      '@typescript-eslint/no-unsafe-call': 'warn', // Evita errores con llamadas inseguras
      '@typescript-eslint/no-floating-promises': 'warn', // Advierte si no manejas Promesas
      '@typescript-eslint/no-unsafe-argument': 'warn', // Advierte si pasas valores inseguros
      '@typescript-eslint/no-unsafe-assignment': 'warn', // 🔥 Apaga el error que tienes
      '@typescript-eslint/no-unsafe-member-access': 'warn', // 🔥 Apaga el error que tienes
      'prettier/prettier': 'error', // Hace que Prettier marque errores en estilos de código
    },
  }
);