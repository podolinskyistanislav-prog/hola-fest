// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');
const prettierRecommended = require('eslint-plugin-prettier/recommended');

// Architecture boundaries (see docs/ARCHITECTURE.md → "Layers").
// These rules are the mechanical enforcement of the layer diagram:
// a PR that breaks them fails CI, no matter which agent wrote it.
const SUPABASE_ONLY_IN_SERVICES = {
  group: ['@supabase/*'],
  message: 'Supabase may only be used inside src/services. Call a service function instead.',
};
const NO_SERVICES_IN_UI = {
  group: ['@/services', '@/services/*'],
  message: 'Shared UI components must stay pure. Fetch data in a feature hook (src/features/*).',
};
const NO_FEATURES_IN_UI = {
  group: ['@/features', '@/features/*'],
  message: 'Shared UI components must not depend on features.',
};

module.exports = defineConfig([
  expoConfig,
  prettierRecommended,
  {
    ignores: ['dist/*', '.expo/*', 'graphify-out/*', 'supabase/functions/*', 'node_modules/*'],
  },
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'error',
      'no-console': ['warn', { allow: ['warn', 'error'] }],
    },
  },
  {
    files: ['src/app/**', 'src/features/**', 'src/lib/**'],
    rules: {
      'no-restricted-imports': ['error', { patterns: [SUPABASE_ONLY_IN_SERVICES] }],
    },
  },
  {
    files: ['src/theme/**'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            SUPABASE_ONLY_IN_SERVICES,
            NO_SERVICES_IN_UI,
            NO_FEATURES_IN_UI,
            {
              group: ['@/components', '@/components/*'],
              message: 'The theme must not depend on components.',
            },
          ],
        },
      ],
    },
  },
  {
    files: ['src/components/**'],
    rules: {
      'no-restricted-imports': [
        'error',
        { patterns: [SUPABASE_ONLY_IN_SERVICES, NO_SERVICES_IN_UI, NO_FEATURES_IN_UI] },
      ],
    },
  },
]);
