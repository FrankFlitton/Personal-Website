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

### Content Management System
- **YAML + MDX Pipeline**: Custom loader (`src/Content/loader.tsx`) parses YAML frontmatter and serializes MDX content
- **Directory Structure**: 
  - `/content/blog/` - Blog posts with metadata (title, slug, date, categories, featuredImage)
  - `/content/projects/` - Project case studies with rich metadata (client, projectUrl, color, contributions)
  - `/content/pages/` - Static pages
- **Custom MDX Components**: Supports embedded JSX in Markdown:
  - `<NPM id="package-name" />` - Styled package cards
  - `<YouTube id="video-id" />` - Video embeds
  - `<Gist id="gist-id" />` - GitHub Gist iframes (renders via `/gist/?gist={id}`)
  - `<IFrame>`, `<Img>` with dialog slider integration

### State Management Patterns
- **No External Libraries**: Uses React built-in state with specific patterns
- **Custom Hooks**: `useTheme`, `useIsRefVisible`, `useIsMobile`, `useIsScrollPastY`
- **Event-Driven**: PostMessage API, IntersectionObserver, MediaQuery listeners
- **Image Gallery System**: Auto-generated lightbox from MDX `<img>` tags with swipe navigation

### GitHub API Integration
- **Build-Time Fetching**: GraphQL API in `getStaticProps` for pinned repositories
- **Data Shape**: Repository metadata, language breakdown with percentages, custom OpenGraph images
- **Dynamic Layout**: Grid adapts based on `usesCustomOpenGraphImage` boolean

### Animation System
- **Tailwind Custom Animations**: Defined in `tailwind.config.ts` (featureSliderInKF, etc.)
- **Swipe Gestures**: `react-swipeable` for touch/mouse interaction
- **Framer Motion**: Page transitions and component animations
- **Image Preloading**: Feature slider preloads all images before display

### Styling Architecture
- **Tailwind + Custom CSS**: Dark mode via `class` strategy, prose styling with typography plugin
- **Dynamic Theming**: Projects have color metadata for component theming
- **Custom Breakpoints**: `hzphone` for horizontal phone layouts
- **Container Queries**: Support via `@tailwindcss/container-queries`

### Type System
- **Strict TypeScript**: Full type safety with custom MDX document interfaces
- **Generic Content Types**: `MDXDocument<T>` supports typed frontmatter
- **Key Interfaces**: `FeatureProjectData`, `Blog`, content loaders

## Development Workflow

### Adding New Content
- **Blog Posts**: Create `.md` file in `/content/blog/` with YAML frontmatter (title, slug, description, featuredImage, date, categories)
- **Projects**: Create `.md` file in `/content/projects/` with project metadata (client, projectUrl, color, contributions array)
- **Custom Components**: Add to `/src/Content/render-blocks/` and import in `renderer.tsx`

### Component Patterns
- **Theme Support**: Import `useTheme` hook, destructure `{ isDark }`, use `dark:` Tailwind classes
- **Responsive Design**: Use `useIsMobile` hook for conditional rendering, `hzphone` breakpoint for horizontal mobile
- **Animation**: Framer Motion with consistent `initial/animate/exit` patterns, custom Tailwind animations for complex sequences
- **Image Handling**: All images in `/public/img/` organized by content type, use Next.js `Image` component with `unoptimized: true`

### Common Utilities
- **Content Loading**: Use `MDLoadFile<T>` for single files, `MDLoadDir<T>` for directories with typed frontmatter
- **Sorting**: Blog posts sorted by date in `sortBlogs.ts`, repositories sorted by `usesCustomOpenGraphImage`
- **Gist Integration**: Render via iframe route `/gist/?gist={id}` for CSP compliance and height auto-adjustment

## Performance Considerations
- **Static Generation**: All pages pre-rendered at build time via `getStaticProps`/`getStaticPaths`
- **Image Optimization**: Disabled for static hosting, manual optimization recommended
- **Bundle Size**: No external state management, minimal dependencies, tree-shaking enabled
- **Loading States**: Image preloading in sliders, progressive enhancement patterns

## Deployment

- **Static Export**: Builds to `/out/` directory as static files
- **Netlify Configuration**: `netlify.toml` with Next.js plugin and legacy redirects
- **Post-Build**: Automatic sitemap generation via `next-sitemap`
- **Environment**: No server-side dependencies, pure static hosting