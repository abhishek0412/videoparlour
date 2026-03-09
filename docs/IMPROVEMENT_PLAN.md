# 📋 VideoParlour — Improvement Plan

> **Created:** March 9, 2026
> **Source:** [Full Audit](./AUDIT.md)
> **Repo:** [abhishek0412/videoparlour](https://github.com/abhishek0412/videoparlour)
> **Methodology:** Each Epic represents a major area of improvement. Features are significant deliverables within an Epic. Stories are individual units of work (1 PR each).

---

## Labels Setup

Create these labels in GitHub before creating issues:

| Label              | Colour    | Purpose                   |
| ------------------ | --------- | ------------------------- |
| `epic`             | `#6E3CBC` | Epic-level tracking issue |
| `feature`          | `#1D76DB` | Feature-level grouping    |
| `story`            | `#0E8A16` | Individual work item      |
| `priority: high`   | `#D93F0B` | Must-do items             |
| `priority: medium` | `#FBCA04` | Should-do items           |
| `priority: low`    | `#C5DEF5` | Nice-to-have items        |
| `architecture`     | `#BFD4F2` | Architecture changes      |
| `security`         | `#EE0701` | Security-related          |
| `a11y`             | `#D4C5F9` | Accessibility             |
| `performance`      | `#FEF2C0` | Performance improvement   |
| `testing`          | `#BFD4F2` | Testing-related           |
| `ui/ux`            | `#E99695` | UI/UX improvement         |
| `cleanup`          | `#EDEDED` | Code cleanup/tech debt    |
| `react-learning`   | `#84B6EB` | React concept to learn    |

---

## Overview — 6 Epics, 19 Features, 62 Stories

| Epic                                              | Priority  | Features | Stories | Estimated Effort |
| ------------------------------------------------- | --------- | -------- | ------- | ---------------- |
| 🏗️ Epic 1: Architecture & Code Quality Foundation | 🔴 High   | 4        | 14      | ~3-4 days        |
| ⚡ Epic 2: Performance Optimization               | 🟡 Medium | 3        | 9       | ~2-3 days        |
| 🔒 Epic 3: Security & Compliance                  | 🔴 High   | 3        | 12      | ~2-3 days        |
| 🎨 Epic 4: UI/UX Modernization                    | 🟡 Medium | 4        | 13      | ~3-4 days        |
| 🧪 Epic 5: Testing & DevOps                       | 🟡 Medium | 3        | 8       | ~2-3 days        |
| 🧠 Epic 6: Advanced React Patterns                | 🟢 Low    | 2        | 6       | ~2 days          |
|                                                   |           | **19**   | **62**  | **~14-19 days**  |

---

## 🏗️ Epic 1: Architecture & Code Quality Foundation

> **Goal:** Establish a robust, maintainable codebase foundation with proper error handling, state management, and clean code practices.
>
> **Priority:** 🔴 High — Do this first
>
> **Audit References:** A1, A3, A4, A5, A6, A7, D1-D4, K1, Q5, Q6

---

### Feature 1.1: Error Handling Infrastructure

> **Goal:** Prevent app crashes and provide graceful error recovery.

| Story | Title                              | Description                                                                                                                                                                                   | Audit Ref | Acceptance Criteria                                                                                             |
| ----- | ---------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- | --------------------------------------------------------------------------------------------------------------- |
| 1.1.1 | **Add Error Boundary component**   | Create a reusable `ErrorBoundary` component using `react-error-boundary` library. Wrap the `<Outlet>` in `Layout.tsx` with it. Show a friendly "Something went wrong" UI with a retry button. | A1, R1    | ✅ App doesn't crash on render errors · ✅ User sees friendly error UI · ✅ Retry button resets the error state |
| 1.1.2 | **Add error fallback for images**  | Add `onError` handler to all `<img>` tags. Show a placeholder image when external images fail to load (Potter API covers, dog photos, character images).                                      | S3, C4    | ✅ Broken images show a placeholder · ✅ No broken image icons visible                                          |
| 1.1.3 | **Guard root element in main.tsx** | Replace `document.getElementById("root")!` with a proper null check that throws a descriptive error.                                                                                          | S5        | ✅ Descriptive error if `#root` is missing                                                                      |

---

### Feature 1.2: State Management with Context API

> **Goal:** Eliminate prop drilling and fix shared state issues using React Context.

| Story | Title                                    | Description                                                                                                                                                                                       | Audit Ref | Acceptance Criteria                                                                                     |
| ----- | ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- | ------------------------------------------------------------------------------------------------------- |
| 1.2.1 | **Create ThemeContext for dark mode**    | Create a `ThemeContext` provider in `src/contexts/ThemeContext.tsx`. Move `useDarkMode` logic into the provider. Refactor `App.tsx`, `Layout.tsx`, `Nav.tsx` to consume context instead of props. | A4, R2    | ✅ No `darkMode` / `onToggleDarkMode` props passed · ✅ Any component can access theme via `useTheme()` |
| 1.2.2 | **Create LikesContext for shared likes** | Create a `LikesContext` provider. Wrap app with it. Refactor `Movie.tsx` and `Home.tsx` to consume context. Likes toggle in one component should immediately reflect in another.                  | A5, R2    | ✅ Liking a book on Home reflects on New Releases · ✅ Single source of truth for likes                 |
| 1.2.3 | **Create contexts barrel export**        | Create `src/contexts/index.tsx` barrel file. Export all context providers and hooks.                                                                                                              | —         | ✅ Clean imports: `import { useTheme } from "../contexts"`                                              |

---

### Feature 1.3: Build & Tooling Configuration

> **Goal:** Set up path aliases and environment variables for a professional dev experience.

| Story | Title                                    | Description                                                                                                                                                         | Audit Ref | Acceptance Criteria                                                                               |
| ----- | ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- | ------------------------------------------------------------------------------------------------- |
| 1.3.1 | **Configure `@/` path alias**            | Add `@` path alias in `tsconfig.app.json` (`paths: { "@/*": ["./src/*"] }`) and `vite.config.ts` (`resolve.alias`). Update one file as proof-of-concept.            | A3        | ✅ `import { useFetch } from "@/hooks"` works · ✅ TypeScript and Vite both resolve the alias     |
| 1.3.2 | **Migrate all imports to `@/` alias**    | Update all import paths across the project to use `@/` instead of relative `../../` paths.                                                                          | A3        | ✅ No `../../` imports remain · ✅ App builds and runs                                            |
| 1.3.3 | **Move API URL to environment variable** | Create `.env` with `VITE_API_URL`. Create `.env.example` as template. Update `constants/api.tsx` to use `import.meta.env.VITE_API_URL`. Add `.env` to `.gitignore`. | S1        | ✅ API URL comes from env var · ✅ `.env.example` exists for onboarding · ✅ `.env` is gitignored |

---

### Feature 1.4: Code Cleanup & Standards

> **Goal:** Remove dead code, fix typos, and establish clean conventions.

| Story | Title                                     | Description                                                                                                     | Audit Ref | Acceptance Criteria                                                                       |
| ----- | ----------------------------------------- | --------------------------------------------------------------------------------------------------------------- | --------- | ----------------------------------------------------------------------------------------- |
| 1.4.1 | **Delete dead files**                     | Remove `src/Message.tsx`, `src/App.css`, `src/index.css` (all empty/unused). Verify no import references.       | Q5, Q6    | ✅ Files deleted · ✅ No broken imports · ✅ App builds                                   |
| 1.4.2 | **Fix Documentries typo**                 | Rename `Documentries.tsx` → `Documentaries.tsx`. Update the component name, all imports, and references.        | A7        | ✅ File renamed · ✅ All imports updated · ✅ No references to old name                   |
| 1.4.3 | **Rename non-JSX files to `.ts`**         | Rename `types/api.tsx` → `.ts`, `types/routes.tsx` → `.ts`, `constants/api.tsx` → `.ts`. Update barrel exports. | A6        | ✅ Non-JSX files use `.ts` extension · ✅ All imports work                                |
| 1.4.4 | **Extract reusable Spinner component**    | Create `components/common/Spinner.tsx`. Replace all 5 duplicated spinner markups.                               | D1        | ✅ Single `<Spinner />` component · ✅ Used in 5+ places · ✅ No duplicate spinner markup |
| 1.4.5 | **Extract reusable LikeButton component** | Create `components/common/LikeButton.tsx`. Replace duplicate like button JSX in `Movie.tsx` and `Home.tsx`.     | D3        | ✅ Single `<LikeButton />` component · ✅ Consistent size/style · ✅ Used in both places  |

---

## ⚡ Epic 2: Performance Optimization

> **Goal:** Optimize loading times, rendering efficiency, and user-perceived performance.
>
> **Priority:** 🟡 Medium — Do after Epic 1
>
> **Audit References:** A2, R3, R4, R5, R6, U3, U7

---

### Feature 2.1: Code Splitting & Lazy Loading

> **Goal:** Reduce initial bundle size by loading page components on demand.

| Story | Title                                        | Description                                                                                                                                 | Audit Ref | Acceptance Criteria                                                                                          |
| ----- | -------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- | --------- | ------------------------------------------------------------------------------------------------------------ |
| 2.1.1 | **Implement React.lazy for all page routes** | Wrap all 10 page component imports in `App.tsx` with `React.lazy()`. Add a `<Suspense>` wrapper with a loading fallback around `<Routes>`.  | A2, R3    | ✅ Pages load on demand · ✅ Loading fallback shown during chunk load · ✅ Network tab shows separate chunks |
| 2.1.2 | **Add image lazy loading**                   | Add `loading="lazy"` attribute to all `<img>` tags (book covers, character images, dog photos).                                             | U3        | ✅ Images below the fold don't load until scrolled to · ✅ No layout shift (height/width set)                |
| 2.1.3 | **Scroll to top on route change**            | Create a `ScrollToTop` component using `useLocation` and `useEffect` to scroll to top on every navigation. Add it inside `<BrowserRouter>`. | U7, R7    | ✅ Every page navigation scrolls to top · ✅ Back button behaviour preserved                                 |

---

### Feature 2.2: Rendering Optimization

> **Goal:** Prevent unnecessary re-renders for better performance.

| Story | Title                                    | Description                                                                                                              | Audit Ref | Acceptance Criteria                                                                                 |
| ----- | ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ | --------- | --------------------------------------------------------------------------------------------------- |
| 2.2.1 | **Wrap card components with React.memo** | Apply `React.memo` to `Movie`, `LikeButton`, and card components in `Trending`, `Documentaries`.                         | R5        | ✅ Components don't re-render when props haven't changed · ✅ Verified with React DevTools Profiler |
| 2.2.2 | **Memoize computed values with useMemo** | Add `useMemo` for the `books.slice(0, 4)`, `spells.slice(0, 6)` computations in `Home.tsx` and filtered/mapped arrays.   | R6        | ✅ Slice operations don't run on every render · ✅ No unnecessary array allocations                 |
| 2.2.3 | **Refactor Home.tsx to use useReducer**  | Replace 4 individual `useState` calls in `Home.tsx` with a single `useReducer` for `{ books, spells, houses, loading }`. | R4, P1    | ✅ Single state object with reducer · ✅ Cleaner state transitions · ✅ Fewer re-renders            |

---

### Feature 2.3: Data Fetching Improvements

> **Goal:** Use consistent, efficient data fetching patterns.

| Story | Title                                 | Description                                                                                                                           | Audit Ref | Acceptance Criteria                                                                           |
| ----- | ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- | --------- | --------------------------------------------------------------------------------------------- |
| 2.3.1 | **Refactor Home.tsx to use useFetch** | Replace raw `Promise.all` + `fetch` in `Home.tsx` with three `useFetch` calls (or create a `useMultiFetch` hook).                     | K1        | ✅ Consistent data fetching across app · ✅ AbortController used · ✅ Proper error handling   |
| 2.3.2 | **Add debounced search**              | Create a `useDebounce` hook. Apply it to `SearchButton.tsx` search input. Add type-ahead search that fires after 300ms of inactivity. | U4        | ✅ API not called on every keystroke · ✅ 300ms debounce · ✅ Loading indicator during search |
| 2.3.3 | **Add localStorage versioning**       | Add a version key to localStorage data (`{ version: 1, data: [...] }`). Add migration logic in hooks when version changes.            | S4        | ✅ Stored data has version · ✅ Old data is migrated gracefully                               |

---

## 🔒 Epic 3: Security & Compliance

> **Goal:** Meet WCAG 2.1 AA accessibility standards, secure the application, and add SEO basics.
>
> **Priority:** 🔴 High — Critical for production readiness
>
> **Audit References:** S1-S6, C1-C7, Q7

---

### Feature 3.1: Accessibility (WCAG 2.1 AA)

> **Goal:** Make the app usable by everyone, including screen reader and keyboard users.

| Story | Title                                            | Description                                                                                                                                | Audit Ref | Acceptance Criteria                                                               |
| ----- | ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------ | --------- | --------------------------------------------------------------------------------- |
| 3.1.1 | **Add skip-to-content link**                     | Add a visually-hidden "Skip to main content" link as the first focusable element in `Layout.tsx`. It should jump to the main content area. | C1        | ✅ Tab from page load focuses skip link · ✅ Activating it jumps past sidebar     |
| 3.1.2 | **Add aria-labels to icon-only buttons**         | Add `aria-label="Add to favourites"` / `"Remove from favourites"` to all like buttons. Add labels to dark mode toggle.                     | C2        | ✅ Screen reader announces button purpose · ✅ No unlabelled interactive elements |
| 3.1.3 | **Add per-page document titles**                 | Create a `useDocumentTitle` hook that sets `document.title`. Call it in every page component. Format: `"Page Name — VideoParlour"`.        | C3        | ✅ Each page has unique browser tab title · ✅ Title updates on navigation        |
| 3.1.4 | **Add focus indicators to custom elements**      | Ensure all custom-styled buttons (like button, search button) have visible focus rings. Use `:focus-visible` CSS.                          | C6        | ✅ Focus visible on Tab navigation · ✅ No focus ring on mouse click              |
| 3.1.5 | **Install and configure eslint-plugin-jsx-a11y** | Add `eslint-plugin-jsx-a11y` to ESLint config. Fix any violations it reports.                                                              | Q7, C7    | ✅ Plugin installed · ✅ Zero a11y lint errors                                    |

---

### Feature 3.2: Security Hardening

> **Goal:** Protect against common web vulnerabilities.

| Story | Title                                    | Description                                                                                                     | Audit Ref | Acceptance Criteria                                                              |
| ----- | ---------------------------------------- | --------------------------------------------------------------------------------------------------------------- | --------- | -------------------------------------------------------------------------------- |
| 3.2.1 | **Add Content Security Policy meta tag** | Add a CSP `<meta>` tag in `index.html` restricting script/image sources to known domains.                       | S6        | ✅ CSP header present · ✅ Only whitelisted domains allowed                      |
| 3.2.2 | **Add input validation to search**       | Limit search input length (max 100 chars). Strip HTML tags. Validate API response shape before rendering.       | S2        | ✅ Input is length-limited · ✅ HTML stripped · ✅ Invalid API responses handled |
| 3.2.3 | **Add image error boundaries**           | Add `onError` fallback handlers to all `<img>` tags project-wide. Add a default placeholder image in `assets/`. | S3        | ✅ No broken images · ✅ Graceful fallback                                       |

---

### Feature 3.3: SEO & Metadata

> **Goal:** Basic SEO readiness for the app.

| Story | Title                                        | Description                                                                                               | Audit Ref | Acceptance Criteria                                     |
| ----- | -------------------------------------------- | --------------------------------------------------------------------------------------------------------- | --------- | ------------------------------------------------------- |
| 3.3.1 | **Add meta description and Open Graph tags** | Add `<meta name="description">`, OG title, OG image, OG description in `index.html`.                      | —         | ✅ Social media link previews show correct info         |
| 3.3.2 | **Add structured heading hierarchy**         | Ensure each page has exactly one `<h1>` and headings follow `h1 → h2 → h3` order without skipping levels. | —         | ✅ Heading hierarchy is sequential · ✅ One h1 per page |
| 3.3.3 | **Add favicon and web manifest**             | Replace default Vite favicon. Add `site.webmanifest` for PWA basics.                                      | —         | ✅ Custom favicon shows · ✅ Manifest file present      |
| 3.3.4 | **Add robots.txt and sitemap**               | Create `public/robots.txt` and a basic `sitemap.xml` listing all pages.                                   | —         | ✅ Files accessible at root URL                         |

---

## 🎨 Epic 4: UI/UX Modernization

> **Goal:** Bring the UI up to modern 2025+ standards with polished interactions and responsive design.
>
> **Priority:** 🟡 Medium
>
> **Audit References:** U1-U10, P1, P2

---

### Feature 4.1: Loading & Feedback UX

> **Goal:** Replace generic spinners with modern loading patterns and user feedback.

| Story | Title                               | Description                                                                                                    | Audit Ref | Acceptance Criteria                                                              |
| ----- | ----------------------------------- | -------------------------------------------------------------------------------------------------------------- | --------- | -------------------------------------------------------------------------------- |
| 4.1.1 | **Add skeleton loading components** | Create `SkeletonCard`, `SkeletonList` components. Replace spinners with content-shaped skeleton placeholders.  | U1        | ✅ Skeleton matches final content shape · ✅ Smooth transition to loaded content |
| 4.1.2 | **Add toast notifications**         | Install `react-hot-toast` or use Bootstrap Toasts. Show toast on like/unlike ("Added to favourites ❤️").       | U2        | ✅ Toast appears on like/unlike · ✅ Auto-dismisses after 3s · ✅ Accessible     |
| 4.1.3 | **Add smooth dark mode transition** | Add CSS `transition: background-color 0.3s, color 0.3s` to `body` and key elements for smooth theme switching. | U10       | ✅ Theme switch is animated · ✅ No flash of unstyled content                    |

---

### Feature 4.2: Responsive Design

> **Goal:** Make the app fully responsive across all device sizes.

| Story | Title                                       | Description                                                                                                                    | Audit Ref | Acceptance Criteria                                                                 |
| ----- | ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ | --------- | ----------------------------------------------------------------------------------- |
| 4.2.1 | **Convert sidebar to off-canvas on mobile** | Use Bootstrap's off-canvas component. Show hamburger button on `< md` breakpoint. Sidebar slides in as overlay.                | U5        | ✅ Sidebar hidden on mobile · ✅ Hamburger button visible · ✅ Off-canvas slides in |
| 4.2.2 | **Make cards responsive**                   | Ensure card grids use proper Bootstrap breakpoints. Cards should be full-width on mobile, 2-col on tablet, 3-4 col on desktop. | —         | ✅ No horizontal scroll on any screen size · ✅ Cards stack on mobile               |
| 4.2.3 | **Add responsive typography**               | Use Bootstrap's `fs-*` responsive utilities or CSS `clamp()` for headings that scale with viewport.                            | —         | ✅ Text readable on all screen sizes · ✅ No text overflow                          |

---

### Feature 4.3: Animations & Transitions

> **Goal:** Add subtle motion design for a polished, modern feel.

| Story | Title                              | Description                                                                                                  | Audit Ref | Acceptance Criteria                                                                                |
| ----- | ---------------------------------- | ------------------------------------------------------------------------------------------------------------ | --------- | -------------------------------------------------------------------------------------------------- |
| 4.3.1 | **Add card hover effects**         | Add CSS hover effects: subtle lift (`translateY(-4px)`), shadow increase, and scale on cards.                | U9        | ✅ Cards lift on hover · ✅ Smooth 200ms transition · ✅ Works with keyboard focus too             |
| 4.3.2 | **Add page transition animations** | Install `framer-motion`. Add fade-in / slide-up animation on route changes using `AnimatePresence`.          | U6        | ✅ Pages animate in on navigation · ✅ No janky transitions · ✅ Respects `prefers-reduced-motion` |
| 4.3.3 | **Add like button animation**      | Animate the like button: scale up briefly on click (heart "pop" effect). Use CSS keyframes or Framer Motion. | —         | ✅ Heart pops on click · ✅ Smooth animation · ✅ Doesn't block interaction                        |

---

### Feature 4.4: Component Decomposition

> **Goal:** Break down large components into smaller, focused units.

| Story | Title                                | Description                                                                                                                                               | Audit Ref | Acceptance Criteria                                                                          |
| ----- | ------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- | -------------------------------------------------------------------------------------------- |
| 4.4.1 | **Decompose Home.tsx**               | Extract `HeroBanner`, `BookPreviewSection`, `SpellPreviewSection`, `HousePreviewSection` from `Home.tsx`. Home should be a composition of sub-components. | P1        | ✅ `Home.tsx` < 50 lines · ✅ Each section is its own component · ✅ Functionality preserved |
| 4.4.2 | **Decompose SearchButton.tsx**       | Extract `SearchInput`, `CharacterCard`, `CharacterGrid` from `SearchButton.tsx`. Rename container to `CharacterSearch`.                                   | P2        | ✅ Each piece < 40 lines · ✅ Components are reusable · ✅ Search works as before            |
| 4.4.3 | **Create generic Card wrapper**      | Create a `Card` component that accepts `image`, `title`, `body`, `actions` slots. Use it across all card-based UIs.                                       | D4        | ✅ Generic Card component · ✅ Used in 3+ places · ✅ Consistent look & feel                 |
| 4.4.4 | **Reuse Alert component for errors** | Update `Trending.tsx`, `Documentries.tsx`, `Movies.tsx` to use `<Alert heading="danger" message={error} />` instead of inline error divs.                 | D2        | ✅ Single error display pattern · ✅ No inline error divs                                    |

---

## 🧪 Epic 5: Testing & DevOps

> **Goal:** Add automated testing, code quality tooling, and CI/CD pipeline.
>
> **Priority:** 🟡 Medium
>
> **Audit References:** Q1-Q4

---

### Feature 5.1: Testing Infrastructure

> **Goal:** Set up testing framework and write initial tests.

| Story | Title                                     | Description                                                                                                                                         | Audit Ref | Acceptance Criteria                                                                   |
| ----- | ----------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | --------- | ------------------------------------------------------------------------------------- |
| 5.1.1 | **Set up Vitest + React Testing Library** | Install `vitest`, `@testing-library/react`, `@testing-library/jest-dom`, `jsdom`. Configure in `vite.config.ts`. Add test script to `package.json`. | Q1        | ✅ `npm test` runs · ✅ Sample test passes                                            |
| 5.1.2 | **Write tests for custom hooks**          | Test `useDarkMode`, `useLikes`, `useFetch` with `renderHook`. Mock `localStorage` and `fetch`.                                                      | Q1        | ✅ All 3 hooks have tests · ✅ Edge cases covered (empty storage, fetch error, abort) |
| 5.1.3 | **Write component tests**                 | Test `Movie`, `Alert`, `Spinner`, `Breadcrumb` components. Test rendering, user interactions, and props.                                            | Q1        | ✅ Core components have tests · ✅ >80% coverage on tested files                      |

---

### Feature 5.2: Code Quality Tooling

> **Goal:** Automate code quality enforcement.

| Story | Title                       | Description                                                                                                                                | Audit Ref | Acceptance Criteria                                                                      |
| ----- | --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | --------- | ---------------------------------------------------------------------------------------- |
| 5.2.1 | **Add Prettier**            | Install Prettier. Create `.prettierrc` with project config. Add `format` script. Format all files.                                         | Q2        | ✅ `npm run format` works · ✅ All files formatted · ✅ Prettier + ESLint don't conflict |
| 5.2.2 | **Add Husky + lint-staged** | Install Husky and lint-staged. Configure pre-commit hook to run ESLint + Prettier on staged files.                                         | Q3        | ✅ Pre-commit hook runs lint + format · ✅ Commits blocked if lint fails                 |
| 5.2.3 | **Enhance ESLint config**   | Add `eslint-plugin-jsx-a11y`, tighten rules (no-console warn, no unused vars error). Add `no-restricted-imports` for enforcing `@/` alias. | Q7        | ✅ Stricter lint rules · ✅ a11y plugin active · ✅ Zero violations                      |

---

### Feature 5.3: CI/CD Pipeline

> **Goal:** Automate build, test, and quality checks on every push.

| Story | Title                                 | Description                                                                                                                         | Audit Ref | Acceptance Criteria                                                   |
| ----- | ------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- | --------- | --------------------------------------------------------------------- |
| 5.3.1 | **Create GitHub Actions CI workflow** | Create `.github/workflows/ci.yml`. Steps: checkout → install → lint → type-check → test → build. Run on push to `main` and all PRs. | Q4        | ✅ CI runs on push/PR · ✅ All steps pass · ✅ Status badge in README |
| 5.3.2 | **Add build status badge to README**  | Add CI workflow badge and coverage badge to `README.md`.                                                                            | Q4        | ✅ Badges visible on GitHub repo page                                 |

---

## 🧠 Epic 6: Advanced React Patterns

> **Goal:** Learn and apply advanced React concepts for deeper understanding.
>
> **Priority:** 🟢 Low — Learning-focused, do when ready
>
> **Audit References:** R7-R11

---

### Feature 6.1: Advanced Hooks

> **Goal:** Practice advanced hook patterns for real use cases.

| Story | Title                            | Description                                                                                                            | Audit Ref | Acceptance Criteria                                                                |
| ----- | -------------------------------- | ---------------------------------------------------------------------------------------------------------------------- | --------- | ---------------------------------------------------------------------------------- |
| 6.1.1 | **Create useDocumentTitle hook** | Custom hook that sets `document.title` and restores the previous title on unmount. Use in all page components.         | R7, C3    | ✅ Title changes per page · ✅ Previous title restored on unmount                  |
| 6.1.2 | **Create useDebounce hook**      | Generic debounce hook using `useRef` and `useEffect`. Use it in `SearchButton.tsx` for type-ahead.                     | R7, U4    | ✅ Generic, reusable · ✅ Proper cleanup on unmount                                |
| 6.1.3 | **Use useTransition for search** | Apply React 19's `useTransition` to mark search state updates as non-urgent. Keep input responsive while results load. | R8        | ✅ Input stays responsive during search · ✅ `isPending` shown as subtle indicator |

---

### Feature 6.2: Component Patterns

> **Goal:** Learn advanced component composition patterns.

| Story | Title                                    | Description                                                                                                                                | Audit Ref | Acceptance Criteria                                                         |
| ----- | ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | --------- | --------------------------------------------------------------------------- |
| 6.2.1 | **Use forwardRef for input components**  | Refactor search input into a `TextInput` component that accepts `ref` via `forwardRef`. Auto-focus on mount.                               | R9        | ✅ Ref forwarding works · ✅ Input auto-focuses on mount                    |
| 6.2.2 | **Create a Toast portal**                | Use `createPortal` to render toast notifications outside the main DOM tree. Create a `ToastContainer` that renders at document body level. | R11       | ✅ Toasts render outside `#root` · ✅ Don't affect layout                   |
| 6.2.3 | **Add pagination with state management** | Add pagination to the Books/Spells lists. Use `useReducer` to manage `{ page, pageSize, total }` state.                                    | R4, U8    | ✅ Data paginated · ✅ Page controls visible · ✅ State managed via reducer |

---

## 📌 Recommended Implementation Order

```
Phase 1 (Week 1) — Foundation
├── Epic 1: Feature 1.4 (Cleanup) ← Start here, quick wins
├── Epic 1: Feature 1.1 (Error Handling)
├── Epic 1: Feature 1.3 (Path aliases + env vars)
└── Epic 1: Feature 1.2 (Context API)

Phase 2 (Week 2) — Performance + Security
├── Epic 2: Feature 2.1 (Lazy loading + code splitting)
├── Epic 3: Feature 3.1 (Accessibility)
├── Epic 3: Feature 3.2 (Security hardening)
└── Epic 2: Feature 2.2 (Rendering optimization)

Phase 3 (Week 3) — UI/UX + Testing
├── Epic 4: Feature 4.4 (Component decomposition)
├── Epic 4: Feature 4.1 (Loading UX)
├── Epic 4: Feature 4.2 (Responsive design)
├── Epic 5: Feature 5.1 (Testing setup)
└── Epic 5: Feature 5.2 (Code quality tooling)

Phase 4 (Week 4) — Polish + Advanced
├── Epic 4: Feature 4.3 (Animations)
├── Epic 5: Feature 5.3 (CI/CD)
├── Epic 3: Feature 3.3 (SEO)
└── Epic 6: Features 6.1 + 6.2 (Advanced React)
```

---

## 🔗 Cross-References

| Story                | Depends On | Blocks                                      |
| -------------------- | ---------- | ------------------------------------------- |
| 1.2.1 (ThemeContext) | —          | 4.1.3 (Dark mode transition)                |
| 1.2.2 (LikesContext) | —          | 4.1.2 (Toast on like), 6.2.2 (Toast portal) |
| 1.4.4 (Spinner)      | —          | 4.1.1 (Skeleton loading — replaces Spinner) |
| 1.4.5 (LikeButton)   | —          | 4.3.3 (Like animation)                      |
| 2.1.1 (React.lazy)   | —          | 4.3.2 (Page transitions)                    |
| 5.1.1 (Vitest setup) | —          | 5.1.2, 5.1.3 (All tests)                    |
| 5.2.1 (Prettier)     | —          | 5.2.2 (Husky)                               |

---

> **How to use this plan:**
>
> 1. Create GitHub Labels (table above)
> 2. Create one GitHub Issue per **Epic** with the `epic` label
> 3. Create one GitHub Issue per **Feature** with the `feature` label, reference the Epic
> 4. Create one GitHub Issue per **Story** with the `story` label, reference the Feature
> 5. Use GitHub Projects board to track progress (Kanban: Backlog → In Progress → Review → Done)
> 6. Each Story = 1 Pull Request
