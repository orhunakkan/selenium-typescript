import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        reporters: 'html',
        globals: true,
        environment: 'node',
        include: ['tests/**/*.ts'],
    },
});