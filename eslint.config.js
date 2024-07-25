import globals from 'globals';
import pluginJs from '@eslint/js';
import eslintPluginPrettier from 'eslint-plugin-prettier';
import eslintConfigPrettier from 'eslint-config-prettier';

export default [
  {
    ignores: ['!dist/', 'dist/*', 'postcss.config.cjs'],
    languageOptions: { globals: globals.browser },
    plugins: {
      prettier: eslintPluginPrettier,
    },
  },
  pluginJs.configs.recommended,
  {
    files: ['**/*.{js}'],
    rules: {
      ...eslintConfigPrettier.rules,
    },
  },
];
