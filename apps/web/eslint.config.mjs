import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import sharedConfig from '../../eslint.config.mjs';

const eslintConfig = defineConfig([
  // Shared workspace config
  ...sharedConfig,

  // Next.js specific configs
  ...nextVitals,
  ...nextTs,

  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
  ]),
  {
    rules: {
      // --- 🚫 no relative imports ---
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['../*'],
              message:
                "Do not use parent-relative imports. Use absolute imports (e.g. '@/shared/components/...') instead.",
            },
          ],
          paths: [
            {
              name: 'clsx',
              message:
                "Do not import 'clsx' directly. Use the 'cn' function from '@/lib/utils' instead.",
            },
            {
              name: 'tailwind-merge',
              message:
                "Do not import 'tailwind-merge' directly. Use the 'cn' function from '@/lib/utils' instead.",
            },
          ],
        },
      ],
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

export default eslintConfig;
