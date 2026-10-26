import { defineConfig } from 'vite';

// BASE различается: корень для прода, /staging/ для беты (GitHub Pages отдаёт обе из одной ветки).
export default defineConfig({ base: process.env.BASE ?? '/' });
