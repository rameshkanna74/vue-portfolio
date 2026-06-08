# Vue 3 → React 18 Migration Plan

## 📊 Project Analysis

### Current Stack (Vue 3)
- **Framework**: Vue 3 + Vite
- **Routing**: Vue Router v4
- **State**: Pinia
- **i18n**: Vue i18n
- **Animations**: GSAP + Lenis
- **UI**: Tailwind CSS v3.4
- **Icons**: @iconify/vue
- **Testing**: Vitest + Vue Test Utils

### New Stack (React 18)
- **Framework**: React 18 + TypeScript + Vite
- **Routing**: React Router v6
- **State**: Zustand
- **i18n**: react-i18next
- **Animations**: GSAP + Lenis (unchanged)
- **UI**: Tailwind CSS v4+
- **Icons**: @iconify/react
- **Testing**: Vitest + React Testing Library

---

## 📁 Project Structure

### Routes (7 pages)
```
/ → HomePage
/about → AboutPage
/skills → SkillsPage
/projects → ProjectsPage
/experience → ExperiencePage
/services → ServicesPage
/contact → ContactPage
```

### Components
- **Layout**: AppHeader
- **UI**: ParticleNetworkOptimized
- **Sections**: Various portfolio sections
- **Three.js**: 3D components

### State Management
- **Theme Store**: Dark mode, theme switching, terminal/desktop mode
- **Portfolio Store**: Resume data, skills, projects, experience (locale-aware)

---

## 🔄 Migration Mapping

### Vue → React Conversion
| Vue | React |
|-----|-------|
| `ref()` | `useState` |
| `computed()` | `useMemo` |
| `watch()` | `useEffect` |
| `onMounted()` | `useEffect(() => {}, [])` |
| Vue components | Functional components |
| Slots | `children` prop / composition |
| `<RouterView />` | `<Outlet />` |
| Pinia store | Zustand store |
| vue-i18n | react-i18next |
| Props binding | Props + TypeScript |
| v-if/v-show | Conditional JSX |
| v-for | `.map()` |
| @click | `onClick` |
| Class binding | className / clsx |

---

## 📋 Migration Checklist

### Phase 1: Foundation
- [ ] Setup React 18 + Vite + TypeScript
- [ ] Configure Tailwind CSS v4
- [ ] Setup Zustand stores
- [ ] Setup react-i18next
- [ ] Configure TypeScript strict mode
- [ ] Setup React Router v6

### Phase 2: Core Infrastructure
- [ ] Create theme store (Zustand)
- [ ] Create portfolio store (Zustand)
- [ ] Setup i18n with locales
- [ ] Create app layout structure
- [ ] Initialize GSAP + Lenis globally

### Phase 3: Components
- [ ] Migrate AppHeader
- [ ] Migrate ParticleNetworkOptimized
- [ ] Migrate layout components
- [ ] Migrate UI components
- [ ] Migrate section components

### Phase 4: Pages
- [ ] Migrate HomePage
- [ ] Migrate AboutPage
- [ ] Migrate SkillsPage
- [ ] Migrate ProjectsPage
- [ ] Migrate ExperiencePage
- [ ] Migrate ServicesPage
- [ ] Migrate ContactPage

### Phase 5: Optimization
- [ ] Add React.lazy() for route splitting
- [ ] Optimize bundle size
- [ ] Add Suspense boundaries
- [ ] Test animations & scroll
- [ ] Performance profiling

### Phase 6: Testing
- [ ] Setup React Testing Library
- [ ] Migrate/write tests
- [ ] Test coverage report

---

## ⚡ Key Considerations

1. **Animations**: GSAP patterns must account for React's reconciliation
2. **Scroll Behavior**: Lenis initialization must be global, handle re-renders
3. **Locales**: Data dynamically switches based on i18n locale
4. **Theme**: localStorage persistence, classList manipulation
5. **Performance**: Code splitting, lazy loading, memoization

---

## 🎯 Expected Outcomes

✅ Feature parity with Vue version
✅ All 7 routes working
✅ Smooth animations preserved
✅ i18n EN/JA fully functional
✅ Theme switching working
✅ Better React performance (hooks, memoization)
✅ TypeScript strict mode
✅ Modern React patterns
✅ Production-ready code

---

## 📦 Dependencies to Add

```json
{
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-router-dom": "^6.20.0",
    "zustand": "^4.4.1",
    "react-i18next": "^13.5.0",
    "i18next": "^23.7.0",
    "gsap": "^3.14.2",
    "lenis": "^1.3.17",
    "@iconify/react": "^1.4.1",
    "clsx": "^2.0.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.43",
    "@types/react-dom": "^18.2.17",
    "@vitejs/plugin-react": "^4.2.1",
    "tailwindcss": "^4.0.0",
    "@testing-library/react": "^14.1.2",
    "@testing-library/jest-dom": "^6.1.5"
  }
}
```

---

## 🚀 Next Steps

1. Generate all React configuration files
2. Create Zustand stores
3. Setup react-i18next
4. Migrate core components
5. Migrate pages one by one
6. Test and optimize

