import {defineConfig} from 'vitest/config';

export default defineConfig({
    test: {
      environment:"node",
      environmentMatchGlobs:[['src/http/controllers/**', 'prisma']],
      dir:'src'
    },
  });
  