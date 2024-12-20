import js from '@eslint/js';
import pluginVue from 'eslint-plugin-vue';
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting';

export default [
  {
    name: 'app/files-to-lint',
    files: ['**/*.{js,mjs,cjs,jsx,vue,ts,tsx}'],
  },
  {
    name: 'app/files-to-ignore',
    ignores: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**'],
  },
  js.configs.recommended,
  ...pluginVue.configs['flat/essential'],
  {
    // 添加自定义规则
    rules: {
      // 允许单个单词的 Vue 组件名称
      'vue/multi-word-component-names': 'off',
      // 强制使用单引号
      'quotes': ['error', 'single'],
    },
  },
  skipFormatting,
];
