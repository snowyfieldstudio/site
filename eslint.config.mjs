// Shared ESLint config for all workspace apps
import { defineConfig } from 'eslint/config';
import typescriptPlugin from '@typescript-eslint/eslint-plugin';
import prettierPlugin from 'eslint-plugin-prettier';

// Note: eslint-plugin-tailwindcss is not compatible with Tailwind CSS v4
// The plugin requires tailwindcss/resolveConfig which doesn't exist in v4
// We'll skip TailwindCSS linting for now until the plugin supports v4

export default defineConfig([
  {
    ignores: ['dist/*', 'build/*', '.next/*', 'out/*', 'node_modules/*'],

    plugins: {
      '@typescript-eslint': typescriptPlugin,
      prettier: prettierPlugin,
    },

    rules: {
      // Disable JS-only rule
      'no-unused-vars': 'off',

      // TypeScript-aware unused enforcement
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          vars: 'all',
          args: 'all',
          caughtErrors: 'all',

          // allow rest siblings
          ignoreRestSiblings: true,

          // allow intentional unused via `_`
          varsIgnorePattern: '^_',
          argsIgnorePattern: '^_',
        },
      ],

      // Prettier enforcement
      'prettier/prettier': 'error',
    },
  },

  // Exception: Allow clsx, tailwind-merge, and class-variance-authority imports in utils.ts
  {
    files: ['**/lib/utils.ts', '**/lib/utils.tsx'],
    rules: {
      'no-restricted-imports': 'off',
    },
  },
]);
