# 🔍 VideoParlour — Comprehensive Project Audit

> **Audit Date:** March 9, 2026
> **Tech Stack:** React 19.2 · TypeScript 5.9 · Vite 7.3 · Bootstrap 5.3 · React Router 7.13
> **API:** Potter API (`potterapi-fedeperin.vercel.app/en`)
> **Repo:** [abhishek0412/videoparlour](https://github.com/abhishek0412/videoparlour)

---

## Table of Contents

1. [Architecture & Structure](#1-architecture--structure)
2. [Coding Principles (SOLID, DRY, KISS)](#2-coding-principles)
3. [Security](#3-security)
4. [Compliance & Accessibility](#4-compliance--accessibility)
5. [Coding Guidelines & Quality](#5-coding-guidelines--quality)
6. [Missed React Concepts](#6-missed-react-concepts)
7. [UI/UX Modern Trends](#7-uiux-modern-trends)
8. [Current File Inventory](#8-current-file-inventory)

---

## 1. Architecture & Structure

### ✅ What's Done Well

| Area                 | Details                                                                                          |
| -------------------- | ------------------------------------------------------------------------------------------------ |
| Folder organisation  | Clean separation: `hooks/`, `constants/`, `types/`, `utils/`, `components/{layout,pages,common}` |
| Barrel exports       | Every module folder has an `index.tsx` re-export                                                 |
| Custom hooks         | `useFetch`, `useDarkMode`, `useLikes` — proper separation of concerns                            |
| Routing              | React Router v7 with `<Routes>`, `<Route>`, `<Outlet>`, `NavLink`, `Link`                        |
| Constants extraction | API URLs and nav config externalised                                                             |
| Type definitions     | Dedicated `types/` folder with proper TypeScript interfaces                                      |

### ❌ Issues Found

| #   | Issue                                                   | Severity  | File(s)                            | Details                                                                                                                                                                                      |
| --- | ------------------------------------------------------- | --------- | ---------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| A1  | **No Error Boundary**                                   | 🔴 High   | App-wide                           | Any unhandled render error crashes the entire app. React's `ErrorBoundary` (or `react-error-boundary` library) is missing.                                                                   |
| A2  | **No `React.lazy` / code splitting**                    | 🟡 Medium | `App.tsx`                          | All 10 page components are eagerly imported. As the app grows, the bundle size will increase unnecessarily.                                                                                  |
| A3  | **No path aliases**                                     | 🟡 Medium | All imports                        | Deep relative imports like `../../hooks` and `../../constants` are fragile. Vite + `tsconfig.json` support `@/` aliases.                                                                     |
| A4  | **Dark mode state lives in `App.tsx`, passed as props** | 🟡 Medium | `App.tsx`, `Layout.tsx`, `Nav.tsx` | Prop drilling through 3 levels. Should use React Context for theme state.                                                                                                                    |
| A5  | **`useLikes` creates independent state per component**  | 🟡 Medium | `Movie.tsx`, `Home.tsx`            | Each component that calls `useLikes()` gets its own `useState`. Likes sync only via `localStorage` — not reactive across components. Should be a `LikesContext` provider.                    |
| A6  | **File extension inconsistency**                        | 🟢 Low    | `*.tsx`                            | Type-only files (`types/api.tsx`, `types/routes.tsx`) and pure JS constants (`constants/api.tsx`) use `.tsx` even though they contain no JSX. Convention: `.ts` for non-JSX, `.tsx` for JSX. |
| A7  | **Filename typo**                                       | 🟢 Low    | `Documentries.tsx`                 | Should be `Documentaries.tsx`. The route path is already correct (`/documentaries`), but the filename and component name are misspelled.                                                     |

---

## 2. Coding Principles

### SOLID Violations

| #   | Principle | Issue                                                                                                                                                                                     | File(s)            |
| --- | --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ |
| P1  | **SRP**   | `Home.tsx` (199 lines) does too much: hero banner, 3 API calls via `Promise.all`, book cards with inline like button, spell cards, house cards. Should be decomposed into sub-components. | `Home.tsx`         |
| P2  | **SRP**   | `SearchButton.tsx` handles search input, API fetching, error state, and result rendering in one component (102 lines).                                                                    | `SearchButton.tsx` |
| P3  | **OCP**   | `Nav.tsx` mixes rendering logic with dropdown/non-dropdown conditionals. Hard to extend with new nav item types.                                                                          | `Nav.tsx`          |

### DRY Violations

| #   | Issue                                                                                                                                                                       | File(s) |
| --- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| D1  | Loading spinner is duplicated in `Movies.tsx`, `Trending.tsx`, `Documentries.tsx`, `Home.tsx`, `SearchButton.tsx` — same exact markup. Should be a `<Spinner />` component. |
| D2  | Error alert markup is duplicated in `Movies.tsx`, `Trending.tsx`, `Documentries.tsx`. Should reuse `<Alert />`.                                                             |
| D3  | Like button JSX + styles are duplicated between `Movie.tsx` and `Home.tsx` with slight size differences. Should be a `<LikeButton />` component.                            |
| D4  | Card layout patterns are repeated across pages with minor variations. Could benefit from a generic `<Card />` wrapper.                                                      |

### KISS Violations

| #   | Issue                                                                                                                                                   | File(s)    |
| --- | ------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| K1  | `Home.tsx` uses raw `fetch` + `Promise.all` + 3 `useState` calls instead of the already-available `useFetch` hook. Inconsistent data fetching strategy. | `Home.tsx` |

---

## 3. Security

| #   | Issue                                       | Severity  | File(s)                           | Details                                                                                                                                                                                                                                                                                         |
| --- | ------------------------------------------- | --------- | --------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| S1  | **API URL hardcoded**                       | 🔴 High   | `constants/api.tsx`               | Base URL should come from environment variables (`import.meta.env.VITE_API_URL`). Hardcoded URLs can't be changed per environment.                                                                                                                                                              |
| S2  | **No input sanitisation**                   | 🟡 Medium | `SearchButton.tsx`                | User search input is passed to API via `encodeURIComponent` (good), but the API response is rendered directly without sanitisation. If the API returns malicious data, it could lead to XSS. React's JSX auto-escapes, but `dangerouslySetInnerHTML` or href injection must be guarded against. |
| S3  | **External images without validation**      | 🟡 Medium | `NotFound.tsx`, `Movie.tsx`       | Dog API and Potter API images are loaded directly. No fallback for broken images. No CSP headers configured.                                                                                                                                                                                    |
| S4  | **`localStorage` has no expiry/versioning** | 🟡 Medium | `useDarkMode.tsx`, `useLikes.tsx` | Stored data persists forever. No migration strategy if the data shape changes. Should include a version key.                                                                                                                                                                                    |
| S5  | **Non-null assertion on root element**      | 🟢 Low    | `main.tsx`                        | `document.getElementById("root")!` — will throw if root element is missing. Should use a guard.                                                                                                                                                                                                 |
| S6  | **No CSP / security headers**               | 🟡 Medium | Build config                      | No Content Security Policy configured. External scripts/images could be injected.                                                                                                                                                                                                               |

---

## 4. Compliance & Accessibility

| #   | Issue                                         | Standard            | File(s)                    | Details                                                                                                                           |
| --- | --------------------------------------------- | ------------------- | -------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| C1  | **No skip-to-content link**                   | WCAG 2.1 AA (2.4.1) | `Layout.tsx`               | Keyboard users must tab through the entire sidebar before reaching content.                                                       |
| C2  | **Missing `aria-label` on icon-only buttons** | WCAG 2.1 AA (1.1.1) | `Movie.tsx`, `Home.tsx`    | Like buttons use emoji (❤️/🤍) as content — screen readers can't interpret these meaningfully. Need `aria-label`.                 |
| C3  | **No `<title>` per page**                     | WCAG 2.1 AA (2.4.2) | All pages                  | Browser tab always shows "Vite + React + TS". Each page should set `document.title`.                                              |
| C4  | **Images lack meaningful alt text**           | WCAG 2.1 AA (1.1.1) | `SearchButton.tsx`         | Character images use `character.fullName` as alt (good), but broken images have no fallback.                                      |
| C5  | **Colour contrast not verified**              | WCAG 2.1 AA (1.4.3) | Theme-wide                 | Dark mode colours haven't been tested for contrast ratios. Bootstrap's `bg-body-tertiary` may not meet 4.5:1 ratio with all text. |
| C6  | **No focus indicators on custom elements**    | WCAG 2.1 AA (2.4.7) | Like buttons, search input | Custom-styled buttons may lose default focus rings.                                                                               |
| C7  | **No keyboard navigation for dropdowns**      | WCAG 2.1 AA (2.1.1) | `Nav.tsx`                  | Bootstrap JS handles some keyboard nav, but custom React + Bootstrap dropdown mixing may break it.                                |

---

## 5. Coding Guidelines & Quality

| #   | Issue                                          | Category   | File(s)                        | Details                                                                       |
| --- | ---------------------------------------------- | ---------- | ------------------------------ | ----------------------------------------------------------------------------- |
| Q1  | **No testing**                                 | Testing    | Project-wide                   | Zero test files. No Vitest, Jest, or React Testing Library configured.        |
| Q2  | **No Prettier**                                | Formatting | Project-wide                   | No `.prettierrc`. Code formatting relies on editor settings.                  |
| Q3  | **No Husky / lint-staged**                     | Git hooks  | Project-wide                   | No pre-commit hooks to enforce lint/format. Broken code can be committed.     |
| Q4  | **No CI/CD pipeline**                          | DevOps     | Project-wide                   | No GitHub Actions workflow for build, test, or deploy.                        |
| Q5  | **`index.css` and `App.css` are empty/unused** | Cleanup    | `src/index.css`, `src/App.css` | Bootstrap handles all styling. These files are remnants of the Vite template. |
| Q6  | **`Message.tsx` still exists**                 | Cleanup    | `src/Message.tsx`              | Dead code — no longer imported anywhere.                                      |
| Q7  | **ESLint config is default**                   | Linting    | `eslint.config.js`             | No custom rules. Missing `eslint-plugin-jsx-a11y` for accessibility linting.  |

---

## 6. Missed React Concepts

| #   | Concept                       | Status      | Impact | Notes                                                                                                                       |
| --- | ----------------------------- | ----------- | ------ | --------------------------------------------------------------------------------------------------------------------------- |
| R1  | **Error Boundaries**          | ❌ Not used | High   | Class component or `react-error-boundary` to catch render errors gracefully.                                                |
| R2  | **Context API**               | ❌ Not used | High   | Dark mode and likes are prime candidates for Context instead of prop drilling / independent hook state.                     |
| R3  | **`React.lazy` + `Suspense`** | ❌ Not used | Medium | Route-based code splitting for better initial load performance.                                                             |
| R4  | **`useReducer`**              | ❌ Not used | Medium | `Home.tsx` with 4 state variables and `SearchButton.tsx` with 4 state variables would benefit from `useReducer`.            |
| R5  | **`React.memo`**              | ❌ Not used | Medium | Card components (`Movie`, spell cards, house cards) re-render unnecessarily when parent state changes.                      |
| R6  | **`useMemo` / `useCallback`** | ⚠️ Partial  | Medium | `useDarkMode` uses `useCallback` (good), but filtering/mapping in render functions isn't memoised.                          |
| R7  | **`useRef`**                  | ❌ Not used | Low    | Could be used for scroll-to-top, input focus, animation refs.                                                               |
| R8  | **`useTransition`**           | ❌ Not used | Low    | React 19 feature for non-blocking UI updates during search or page transitions.                                             |
| R9  | **`forwardRef`**              | ❌ Not used | Low    | Needed for reusable input components and integration with form libraries.                                                   |
| R10 | **Custom hook composition**   | ⚠️ Partial  | Low    | Hooks are well-structured but don't compose with each other (e.g., a `usePageData` hook combining fetch + title + loading). |
| R11 | **Portal**                    | ❌ Not used | Low    | Useful for modals, tooltips, toast notifications.                                                                           |

---

## 7. UI/UX Modern Trends

| #   | Trend                              | Status | Recommendation                                                                                           |
| --- | ---------------------------------- | ------ | -------------------------------------------------------------------------------------------------------- |
| U1  | **Skeleton loading**               | ❌     | Replace spinners with skeleton placeholders (content-shaped grey blocks). Industry standard since 2020+. |
| U2  | **Toast notifications**            | ❌     | Use toast for like/unlike feedback instead of no feedback. Bootstrap Toasts or `react-hot-toast`.        |
| U3  | **Image lazy loading**             | ❌     | Use `loading="lazy"` on `<img>` tags. Large cover images load eagerly on all pages.                      |
| U4  | **Debounced search**               | ❌     | `SearchButton.tsx` fires API call immediately on Enter. Should debounce for type-ahead UX.               |
| U5  | **Responsive sidebar → hamburger** | ❌     | Sidebar is always visible. On mobile, it should collapse to a hamburger/off-canvas menu.                 |
| U6  | **Page transitions / animations**  | ❌     | No transitions between routes. `framer-motion` or CSS transitions would improve feel.                    |
| U7  | **Scroll to top on navigate**      | ❌     | Navigating between pages doesn't scroll to top. Standard UX expectation.                                 |
| U8  | **Infinite scroll / pagination**   | ❌     | All data loads at once. As data grows, pagination or infinite scroll is needed.                          |
| U9  | **Glassmorphism / modern cards**   | ❌     | Card designs are plain Bootstrap defaults. Modern UIs use blur, gradients, hover effects.                |
| U10 | **Dark mode transition**           | ❌     | Theme switches instantly. A CSS transition on `background-color` / `color` would be smoother.            |

---

## 8. Current File Inventory

```
videoparlour/
├── docs/
│   ├── AUDIT.md                    ← This file
│   └── IMPROVEMENT_PLAN.md         ← Epic/Feature/Story plan
├── public/
├── src/
│   ├── App.tsx                     ← Root routes (10 pages + 404)
│   ├── App.css                     ⚠️ Empty — can be deleted
│   ├── index.css                   ⚠️ Empty — can be deleted
│   ├── main.tsx                    ← Entry point
│   ├── Message.tsx                 ⚠️ Dead code — can be deleted
│   ├── assets/
│   ├── components/
│   │   ├── common/
│   │   │   ├── Alert.tsx           ← Dismissible alert (useState)
│   │   │   ├── Movie.tsx           ← Book card with like button
│   │   │   ├── Movies.tsx          ← Book list via useFetch
│   │   │   └── SearchButton.tsx    ← Character search (102 lines)
│   │   ├── layout/
│   │   │   ├── Breadcrumb.tsx      ← Location-based breadcrumb
│   │   │   ├── Footer.tsx          ← Footer with Link grid
│   │   │   ├── Layout.tsx          ← Outlet + Nav + Footer
│   │   │   └── Nav.tsx             ← Sidebar nav with dark mode toggle
│   │   └── pages/
│   │       ├── About.tsx           ← Static about page
│   │       ├── Collections.tsx     ← Wraps SearchButton
│   │       ├── Documentries.tsx    ⚠️ Typo in filename
│   │       ├── Home.tsx            ← Hero + 3 API previews (199 lines)
│   │       ├── MyLibrary.tsx       ← Wraps Movies
│   │       ├── NewReleases.tsx     ← Wraps Movies
│   │       ├── NotFound.tsx        ← Amazon-style 404 with dogs
│   │       ├── TopRated.tsx        ← Wraps Movies
│   │       ├── Trending.tsx        ← Spells list via useFetch
│   │       └── Watchlist.tsx       ← Empty state placeholder
│   ├── constants/
│   │   ├── api.tsx                 ← API_BASE_URL, API_ENDPOINTS
│   │   ├── index.tsx               ← Barrel export
│   │   └── nav.tsx                 ← NAV_ITEMS, FOOTER_LINKS
│   ├── hooks/
│   │   ├── index.tsx               ← Barrel export
│   │   ├── useDarkMode.tsx         ← Theme state + localStorage
│   │   ├── useFetch.tsx            ← Generic fetch with AbortController
│   │   └── useLikes.tsx            ← Like state + localStorage (Set)
│   ├── types/
│   │   ├── api.tsx                 ← Book, Spell, House, Character
│   │   ├── index.tsx               ← Barrel export
│   │   └── routes.tsx              ← RouteConfig interface
│   └── utils/
│       ├── index.tsx               ← Barrel export
│       └── routes.tsx              ← routes Record, getPath, getPageName
├── eslint.config.js
├── index.html
├── package.json
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

---

> **Next Steps:** See [IMPROVEMENT_PLAN.md](./IMPROVEMENT_PLAN.md) for the full Epic → Feature → Story breakdown ready for GitHub Issues.
