import { defineConfig } from 'vite';
import { sveltekit } from '@sveltejs/kit/vite';

export default defineConfig({
	plugins: [sveltekit()],
	test: {
    global: true,
    environment: 'jsdom',
    setupFiles: ['./setupTests.js'],
    include: ['src/**/*.{test,spec}.{js,ts}'],
    deps: {
      inline: ['@testing-library/jest-dom'],
    },
  },
});