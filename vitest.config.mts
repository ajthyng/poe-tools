import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true, // Enables global test APIs like `describe`, `it`, etc.
    environment: 'node', // Change to 'jsdom' if you need a browser-like environment
    include: ['**/*.spec.ts'], // Include all `*.spec.ts` files in the project
    exclude: ['node_modules', 'dist', '.idea', '.git', '.cache'], // Exclude common folders
    coverage: {
      provider: 'v8', // Use 'c8' or 'istanbul' if preferred
      reporter: ['text', 'lcov'], // Coverage reporters (text output and lcov for CI/IDE)
      include: ['src/**/*.ts'], // Include source files for coverage
      exclude: ['**/*.spec.ts'], // Exclude test files from coverage
    },
    setupFiles: [], // Add setup files if you need global configuration before running tests
  },
});
