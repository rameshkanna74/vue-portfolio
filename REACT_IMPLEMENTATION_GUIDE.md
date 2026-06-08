# React 18 Migration - Implementation Guide

Complete step-by-step guide to implement the React migration.

## 📋 Prerequisites

- Node.js 16+ installed
- Existing Vue portfolio project
- Basic familiarity with React

---

## 🚀 Installation Steps

### Step 1: Create New React Project Directory

Option A: Start fresh
```bash
mkdir portfolio-react
cd portfolio-react
```

Option B: Create branch in existing repo
```bash
git checkout -b feat/react-migration
```

### Step 2: Setup Core Files

Copy the following files to your project root:

```
REACT_package.json → package.json
REACT_vite.config.ts → vite.config.ts
REACT_tsconfig.json → tsconfig.json
REACT_tsconfig.node.json → tsconfig.node.json
REACT_tailwind.config.js → tailwind.config.js
REACT_postcss.config.js → postcss.config.js
REACT_vitest.config.ts → vitest.config.ts
REACT_index.html → index.html
```

### Step 3: Install Dependencies

```bash
npm install
```

### Step 4: Create Directory Structure

```bash
mkdir -p src/{components,pages,store,i18n,types,data,styles}
mkdir -p src/components/{layout,ui,sections}
mkdir -p src/i18n/locales
```

### Step 5: Copy Store Files

Create the following in `src/store/`:

1. **useThemeStore.ts** - From `REACT_src_store_useThemeStore.ts`
2. **usePortfolioStore.ts** - From `REACT_src_store_usePortfolioStore.ts`

### Step 6: Setup i18n

1. Create `src/i18n/config.ts` from `REACT_src_i18n_config.ts`
2. Copy locale files from Vue project:
   - `src/i18n/locales/en.json`
   - `src/i18n/locales/ja.json`

### Step 7: Setup App Structure

Create the following files:

1. **src/main.tsx** - From `REACT_src_main.tsx`
2. **src/App.tsx** - From `REACT_src_App.tsx`
3. **src/components/layout/AppLayout.tsx** - From `REACT_src_components_layout_AppLayout.tsx`
4. **src/components/layout/AppHeader.tsx** - From `REACT_src_components_layout_AppHeader.tsx`

### Step 8: Add UI Components

Create the following files:

1. **src/components/ui/ParticleNetworkOptimized.tsx** - From `REACT_src_components_ui_ParticleNetworkOptimized.tsx`

### Step 9: Create Pages

Create the following page components in `src/pages/`:

1. **HomePage.tsx** - From `REACT_src_pages_HomePage.tsx`
2. **AboutPage.tsx** - From `REACT_src_pages_AboutPage.tsx`
3. **SkillsPage.tsx** - From `REACT_src_pages_SkillsPage.tsx`
4. **ProjectsPage.tsx** - From `REACT_src_pages_ProjectsPage.tsx`
5. **ExperiencePage.tsx** - From `REACT_src_pages_ExperiencePage.tsx`
6. **ServicesPage.tsx** - From `REACT_src_pages_ServicesPage.tsx`
7. **ContactPage.tsx** - From `REACT_src_pages_ContactPage.tsx`

### Step 10: Copy Data & Types

Copy from Vue project to React project:

```bash
# Copy data files
cp src/data/resume.ts src/data/
cp src/data/resume.ja.ts src/data/

# Copy type definitions
cp src/types/portfolio.ts src/types/

# Copy CSS (optional - will be replaced by Tailwind)
cp src/styles/themes.css src/styles/
cp src/styles/style.css src/styles/
```

### Step 11: Add CSS/Theme Files

Create `src/styles/`:

**themes.css** - Nord color variable definitions
```css
:root {
  --nord-0: 46 52 64;
  --nord-1: 59 66 82;
  --nord-2: 76 86 106;
  --nord-3: 216 222 233;
  --nord-4: 236 239 244;
  --nord-5: 229 233 240;
  --nord-6: 216 222 233;
  --nord-7: 143 188 187;
  --nord-8: 136 192 208;
  --nord-9: 129 161 193;
  --nord-10: 94 129 172;
  --nord-11: 191 97 106;
  --nord-12: 235 203 139;
  --nord-13: 163 190 140;
  --nord-14: 235 203 139;
  --nord-15: 191 97 106;
}

.dark {
  color-scheme: dark;
}
```

**style.css** - Reset and global styles
```css
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
```

### Step 12: Add Test Configuration

1. Copy `REACT_src_App.test.tsx` → `src/App.test.tsx`

### Step 13: Development Server

```bash
npm run dev
```

Visit: http://localhost:5173

---

## 🔧 Configuration Details

### Zustand Store Setup

Theme store uses localStorage persistence:
```typescript
persist(
  (set) => ({ ... }),
  {
    name: 'theme-store',
    storage: localStorage,
    partialize: (state) => ({ /* only persist these */ }),
  }
)
```

### i18next Configuration

Auto-detects language from browser and localStorage:
```typescript
const getBrowserLanguage = (): string => {
  const saved = localStorage.getItem('portfolio-language');
  if (saved) return saved;
  
  const browserLang = navigator.language.toLowerCase();
  if (browserLang.startsWith('ja')) return 'ja';
  return 'en';
};
```

### React Router Setup

Lazy-loaded pages with Suspense:
```typescript
const HomePage = React.lazy(() => import('@/pages/HomePage'));

<Suspense fallback={<PageLoading />}>
  <HomePage />
</Suspense>
```

---

## 🎯 Verification Checklist

After setup, verify:

- [ ] `npm run dev` starts without errors
- [ ] All routes accessible (`/`, `/about`, `/skills`, etc.)
- [ ] Dark mode toggle works
- [ ] Language switcher works (EN/JA)
- [ ] Particle animation renders
- [ ] GSAP animations work on homepage
- [ ] Lenis smooth scrolling active
- [ ] Responsive design works on mobile
- [ ] All pages load content correctly
- [ ] LocalStorage persists theme/language

---

## 🐛 Troubleshooting

### "Module not found: @/..."
- Check path alias in `vite.config.ts`
- Verify `tsconfig.json` has correct baseUrl and paths

### "Cannot find module 'react/jsx-runtime'"
- Run `npm install` again
- Delete `node_modules` and reinstall

### Tailwind classes not working
- Check PostCSS config
- Restart dev server
- Clear Tailwind cache: `rm -rf node_modules/.vite`

### i18n not switching
- Check browser console for errors
- Verify locale JSON files exist
- Clear localStorage: `localStorage.clear()`

### GSAP animations not triggering
- Check useRef correctly targets elements
- Verify useEffect dependencies
- Check browser DevTools for errors

---

## 📦 Build for Production

```bash
npm run build
npm run preview
```

Output in `dist/` folder ready for deployment.

---

## 🚀 Next Steps

1. **Testing**: Write tests using React Testing Library
2. **Performance**: Use React DevTools Profiler
3. **SEO**: Add react-helmet for meta tags
4. **Analytics**: Integrate Umami/Google Analytics
5. **Deployment**: Deploy to Vercel, Netlify, or GitHub Pages

---

## 📞 Support

Refer to documentation:
- [React Docs](https://react.dev)
- [React Router Docs](https://reactrouter.com)
- [Zustand GitHub](https://github.com/pmndrs/zustand)
- [react-i18next Docs](https://react.i18next.com)

