# Copilot Instructions for awesome-todo

## Project Architecture

This is a **static-export Next.js 16** app configured for GitHub Pages deployment. Key architectural decisions:

- **Static Export**: `next.config.ts` sets `output: "export"` with `basePath: '/awesome-todo'` for GitHub Pages
- **App Router**: Uses Next.js 13+ app directory structure (`src/app/`)  
- **Tailwind v4**: Modern Tailwind CSS with inline theme configuration in `globals.css`
- **TypeScript**: Strict TypeScript setup with path aliases (`@/*` → `./src/*`)

## Development Workflow

```bash
npm run dev          # Development server on localhost:3000
npm run build        # Static export to /dist directory  
npm run start        # Serve production build locally
npm run lint         # ESLint with Next.js config
```

**Important**: This project builds to `/dist` (not `.next`) for static hosting compatibility.

## Styling Patterns

### Tailwind v4 Configuration
- **Theme variables** defined in `globals.css` using `@theme inline` directive
- **CSS custom properties** for colors: `--background`, `--foreground` 
- **Dark mode** via `prefers-color-scheme: dark` media query
- **Typography**: Geist Sans and Geist Mono fonts loaded via `next/font/google`

### Component Styling Example
```tsx
// Use semantic color classes that map to CSS custom properties
className="bg-background text-foreground"
className="text-zinc-600 dark:text-zinc-400"  // Conditional dark mode
```

## File Structure Conventions

```
src/app/
├── layout.tsx       # Root layout with font loading & metadata
├── page.tsx         # Homepage component  
└── globals.css      # Tailwind imports + theme variables
```

### Path Aliases
- Use `@/` for imports from `src/`: `import Component from "@/components/ui"`
- Relative imports for same-directory files

## Static Export Considerations

### Asset Handling  
- Images use `next/image` with `src="/image.svg"` (assets in `/public`)
- All assets must be referenced with the `basePath` in mind for production
- Links should use `next/link` for proper routing in static export

### Routing Limitations
- No server-side rendering or API routes (static export)
- Client-side routing only via Next.js router
- All pages must be statically generateable at build time

## Code Quality

### ESLint Configuration
- Uses Next.js recommended configs: `core-web-vitals` + `typescript`
- Modern flat config format in `eslint.config.mjs`
- Ignores build outputs: `.next/**`, `out/**`, `dist/**`

### TypeScript Setup
- **Strict mode** enabled with `noEmit: true`
- **Target**: ES2017 for broad browser compatibility
- **Module resolution**: `bundler` for modern tooling compatibility

## Key Dependencies

- **React 19.2.0** - Latest React with concurrent features
- **Next.js 16.0.1** - App Router with static export capability
- **Tailwind CSS 4** - Latest version with enhanced DX
- **TypeScript 5** - Modern TypeScript features

## Todo App Architecture

### Core Features
- **CRUD Operations**: Add, update, delete todos with real-time UI updates
- **Mobile-First Design**: Responsive layout using Tailwind breakpoints (`sm:`, `md:`, `lg:`)
- **Client-Side Storage**: Persistent data using `localStorage` or `IndexedDB`

### Data Management Patterns
```tsx
// Prefer localStorage for simple todo data
const saveTodos = (todos: Todo[]) => {
  localStorage.setItem('awesome-todos', JSON.stringify(todos));
};

// Use IndexedDB for larger datasets or complex queries
// Consider libraries like Dexie.js for IndexedDB abstraction
```

### Component Organization
```
src/components/
├── todo/
│   ├── TodoList.tsx      # Main todo container
│   ├── TodoItem.tsx      # Individual todo component  
│   └── TodoForm.tsx      # Add/edit form
├── ui/
│   ├── Button.tsx        # Reusable UI components
│   └── Input.tsx
└── layout/
    └── Header.tsx        # App header/navigation
```

## Deployment Workflow

### GitHub Actions Setup
- **Trigger**: Automatic deployment on `main` branch push/merge
- **Build Process**: `npm run build` → static files to `/dist`
- **Deploy Target**: GitHub Pages from `/dist` directory
- **Asset Paths**: All assets must work with `/awesome-todo` base path

### Expected Workflow File
Create `.github/workflows/deploy.yml` to:
1. Install dependencies (`npm ci`)
2. Run build (`npm run build`) 
3. Deploy `/dist` to `gh-pages` branch
4. Enable GitHub Pages from `gh-pages` branch

## Quick Start for New Features

1. **Components**: Create in `src/components/` following the organization above
2. **Pages**: Add `.tsx` files in `src/app/` following App Router conventions  
3. **Styling**: Use Tailwind classes with mobile-first approach (`class="text-sm sm:text-base"`)
4. **Assets**: Place in `/public/`, reference as `/filename.ext`
5. **Types**: Define todo interfaces in `src/types/todo.ts`
6. **Storage**: Use hooks pattern for localStorage/IndexedDB operations