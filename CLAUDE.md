# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal portfolio website built with Next.js as a JAM stack application. Content is pre-rendered and served as static HTML via Netlify CDN.

**Tech Stack:**
- Next.js with static export (`output: "export"`)
- React with TypeScript
- Tailwind CSS for styling
- Framer Motion for animations
- MDX for content rendering with YAML frontmatter
- Netlify for hosting and deployment

## Development Commands

```bash
# Development server (localhost:3000)
npm run dev

# Production build
npm run build

# Start production server
npm run start

# Lint code
npm run lint
```

**Working Directory:** All commands should be run from `/src/` directory.

## Architecture

### Content System
- Blog posts and projects are stored as Markdown files in `/content/` directory
- Content loader (`src/Content/loader.tsx`) handles MDX parsing with YAML frontmatter
- Two main content loaders: `MDLoadFile()` for single files, `MDLoadDir()` for directories
- Content supports custom React components via render blocks in `src/Content/render-blocks/`

### Page Structure
- Next.js pages in `src/pages/` with TypeScript
- Dynamic routes: `[slug].tsx` for blog posts and projects
- Global app wrapper (`_app.tsx`) includes header and Framer Motion page transitions
- Special route `/gist` bypasses standard layout

### Component Organization
- UI components in `src/components/`
- Homepage-specific components in `src/components/HomePage/`
- Content rendering components in `src/Content/render-blocks/`
- Custom hooks in `src/hooks/`

### Styling
- Tailwind CSS with custom typography plugin
- Global styles in `src/styles/globals.css`
- Component-specific CSS for animations (preloader, progress ring)

### Type System
- TypeScript types in `src/types/index.ts`
- Key interfaces: `MDXDocument<T>`, `FeatureProjectData`, `Blog`
- Content system supports generic frontmatter typing

## Deployment

- Builds to `/out/` directory as static files
- Netlify configuration in `netlify.toml`
- Post-build sitemap generation via `next-sitemap`
- Legacy redirects preserved for SEO