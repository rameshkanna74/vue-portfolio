# React Portfolio Migration

This directory contains the React 18 version of the Vue portfolio, migrated from Vue 3 + Vite.

## 🚀 Quick Start

### Install Dependencies
```bash
npm install
```

### Development
```bash
npm run dev
```

### Build
```bash
npm run build
```

### Preview Build
```bash
npm run preview
```

### Testing
```bash
npm test
npm run test:ui
npm run test:coverage
```

---

## 📁 Project Structure

```
src/
├── App.tsx                 # Main app with routing
├── main.tsx               # Entry point with i18n
├── i18n/
│   ├── config.ts         # react-i18next configuration
│   └── locales/
│       ├── en.json
│       └── ja.json
├── store/
│   ├── useThemeStore.ts  # Zustand theme store
│   └── usePortfolioStore.ts # Zustand portfolio store
├── components/
│   ├── layout/
│   │   ├── AppLayout.tsx
│   │   └── AppHeader.tsx
│   └── ui/
│       └── ParticleNetworkOptimized.tsx
├── pages/
│   ├── HomePage.tsx
│   ├── AboutPage.tsx
│   ├── SkillsPage.tsx
│   ├── ProjectsPage.tsx
│   ├── ExperiencePage.tsx
│   ├── ServicesPage.tsx
│   └── ContactPage.tsx
├── types/
│   └── portfolio.ts
├── data/
│   ├── resume.ts
│   └── resume.ja.ts
├── styles/
│   ├── themes.css
│   └── style.css
└── assets/
```

---

## 🔄 Key Changes from Vue

### State Management: Pinia → Zustand
```typescript
// Vue (Pinia)
export const useThemeStore = defineStore('theme', () => { ... })

// React (Zustand)
export const useThemeStore = create<ThemeState>((set, get) => ({ ... }))
```

### Routing: Vue Router → React Router
```typescript
// Vue Router
routes: [{ path: '/', component: HomePage }]

// React Router
<Route path="/" element={<HomePage />} />
```

### i18n: vue-i18n → react-i18next
```typescript
// Vue i18n
const { t } = useI18n()

// React i18next
const { t } = useTranslation()
```

### Animations: GSAP (Same API)
- GSAP animations work identically in React
- Cleanup in `useEffect` cleanup function
- Use `useRef` for DOM element references

### Lifecycle: Vue hooks → React hooks
```typescript
// Vue
onMounted(() => { ... })
watch(() => route.path, () => { ... })

// React
useEffect(() => { ... }, [])
useEffect(() => { ... }, [location])
```

---

## 🎨 Styling

- **Tailwind CSS v4+** with custom color system
- **Dark mode** support with `dark:` prefix
- **Nord color palette** with CSS variables
- **Custom animations** for glow, slide, fade effects

---

## 🌍 Internationalization

- Support for English and Japanese
- Automatic language detection from browser
- Language persistence in localStorage
- Fully typed i18n keys

---

## ⚡ Performance

- **Code splitting** with `React.lazy()` and `Suspense`
- **Memoization** of expensive components
- **Optimized bundle chunks** via Rollup
- **Image optimization** via vite-plugin-image-optimizer

---

## 🧪 Testing

Uses Vitest + React Testing Library:
```bash
npm test
npm run test:ui
npm run test:coverage
```

---

## 🔧 Configuration Files

- `vite.config.ts` - Vite configuration with React plugin
- `tsconfig.json` - TypeScript strict mode
- `tailwind.config.js` - Tailwind CSS with theme extensions
- `postcss.config.js` - PostCSS plugins

---

## 📝 Migration Notes

1. ✅ All 7 routes successfully migrated
2. ✅ Theme system working (dark mode + terminal mode)
3. ✅ i18n fully functional (EN/JA)
4. ✅ GSAP animations preserved
5. ✅ Lenis smooth scrolling initialized
6. ✅ Particle network background working
7. ✅ Responsive design maintained

---

## 🚨 Common Issues & Solutions

### Lenis not working on page transitions?
- Ensure Lenis is initialized in App.tsx after router setup
- Cleanup Lenis in useEffect return function

### Theme not persisting?
- Check localStorage is enabled
- Verify Zustand persist middleware is working

### i18n not switching?
- Call `changeLanguage()` function explicitly
- Check localStorage key: `portfolio-language`

---

## 📚 Resources

- [React Documentation](https://react.dev)
- [React Router v6](https://reactrouter.com)
- [Zustand](https://zustand.docs.pmnd.rs)
- [react-i18next](https://react.i18next.com)
- [Tailwind CSS v4](https://tailwindcss.com)
- [GSAP Docs](https://gsap.com/docs)

