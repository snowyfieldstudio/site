import studio from '@sanity/eslint-config-studio';
import sharedConfig from '../../eslint.config.mjs';

export default [
  // Shared workspace config
  ...sharedConfig,

  // Sanity Studio specific config
  ...studio,
];
