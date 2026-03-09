# 🎬 VideoParlour

A React-based video streaming UI built with TypeScript, Vite, Bootstrap 5, and React Router. Powered by the [Potter API](https://potterapi-fedeperin.vercel.app/) for demo content.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3-7952B3?logo=bootstrap)

## Features

- **📚 Browse Content** — Books, spells, houses, and characters from the wizarding world
- **🔍 Character Search** — Live search against the Potter API
- **🌙 Dark Mode** — Toggle with `data-bs-theme`, persisted in localStorage
- **🧭 Client-side Routing** — React Router v7 with a centralized route config
- **🍞 Auto Breadcrumbs** — Derived from route hierarchy using `useLocation`
- **🐶 404 Page** — Amazon-style "Dogs of VideoParlour" with random dog photos
- **📱 Responsive Layout** — Sidebar nav + Bootstrap grid
- **❤️ Like/Favourite** — Add books to favourites from Home preview
- **✨ Trending Spells** — Preview spells on Home and full list in Trending
- **🏠 Hogwarts Houses** — Preview houses on Home and full list in Documentaries

## Pages

| Route            | Component     | Description                                  |
| ---------------- | ------------- | -------------------------------------------- |
| `/`              | Home          | Hero banner with sneak peeks of all sections |
| `/new-releases`  | NewReleases   | Harry Potter book catalogue                  |
| `/trending`      | Trending      | Spell cards from the Potter API              |
| `/top-rated`     | TopRated      | Top-rated content                            |
| `/collections`   | Collections   | Character search                             |
| `/documentaries` | Documentaries | Hogwarts houses                              |
| `/my-library`    | MyLibrary     | Personal library                             |
| `/watchlist`     | Watchlist     | Saved-for-later list                         |
| `/about`         | About         | About VideoParlour                           |
| `*`              | NotFound      | 404 with random dogs 🐾                      |

## Tech Stack

- **React 19** — UI library
- **TypeScript 5.9** — Type safety
- **Vite 7** — Build tool with HMR
- **Bootstrap 5.3** — Styling & components (CSS + JS bundle)
- **React Router 7** — Declarative routing with `<Link>`, `<NavLink>`, `useNavigate`, `useLocation`
- **Potter API** — External data source (`/en/books`, `/en/spells`, `/en/houses`, `/en/characters`)

## Project Structure

```
src/
├── main.tsx                # Entry point (BrowserRouter + Bootstrap imports)
├── App.tsx                 # Route definitions, dark mode state
├── types/                  # TypeScript types for API data
├── hooks/                  # Custom hooks (useLikes, useFetch, useDarkMode)
├── utils/                  # Utility functions (routes, getPath)
├── constants/              # Route and API endpoint constants
├── components/
│   ├── layout/
│   │   ├── Layout.tsx      # Shared layout (Nav + Breadcrumb + Outlet + Footer)
│   │   ├── Nav.tsx         # Sidebar navigation with NavLink, dark mode toggle
│   │   ├── Breadcrumb.tsx  # Auto-generated breadcrumb trail
│   │   ├── Footer.tsx      # Site footer with Link-based navigation
│   ├── pages/
│   │   ├── Home.tsx        # Home page with API-driven previews
│   │   ├── NewReleases.tsx # New releases page
│   │   ├── Trending.tsx    # Spell grid (fetches /en/spells)
│   │   ├── TopRated.tsx    # Top rated page
│   │   ├── Collections.tsx # Character search wrapper
│   │   ├── Documentries.tsx# House cards (fetches /en/houses)
│   │   ├── MyLibrary.tsx   # My library page
│   │   ├── Watchlist.tsx   # Watchlist page
│   │   ├── About.tsx       # About page
│   │   ├── NotFound.tsx    # Amazon-style 404 with dogs
│   ├── common/
│   │   ├── Movies.tsx      # Book list (fetches /en/books)
│   │   ├── Movie.tsx       # Single book card
│   │   ├── SearchButton.tsx# Character search with API fetch
│   │   ├── Alert.tsx       # Dismissible alert (useState-based)
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- npm

### Install & Run

```bash
# Install dependencies
npm install

# Start dev server with HMR
npm run dev
```

The app will be available at `http://localhost:5173/`.

### Build for Production

```bash
npm run build
npm run preview
```

### Lint

```bash
npm run lint
```

## API Reference

All data is fetched from the [Potter API](https://potterapi-fedeperin.vercel.app/):

| Endpoint                 | Used By             | Returns                  |
| ------------------------ | ------------------- | ------------------------ |
| `/en/books`              | Movies, Home        | 8 Harry Potter books     |
| `/en/spells`             | Trending, Home      | Spell list               |
| `/en/houses`             | Documentaries, Home | 4 Hogwarts houses        |
| `/en/characters?search=` | SearchButton        | Character search results |

## License

This project is for learning purposes.
