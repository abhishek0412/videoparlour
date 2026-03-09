import type { RouteConfig } from "../types";

export const routes: Record<string, RouteConfig> = {
  Home: { path: "/", label: "Home" },
  "New Releases": {
    path: "/new-releases",
    label: "New Releases",
    parent: "Browse",
  },
  Trending: { path: "/trending", label: "Trending", parent: "Browse" },
  "Top Rated": { path: "/top-rated", label: "Top Rated", parent: "Browse" },
  Collections: {
    path: "/collections",
    label: "Collections",
    parent: "Browse",
  },
  Action: { path: "/action", label: "Action", parent: "Categories" },
  Comedy: { path: "/comedy", label: "Comedy", parent: "Categories" },
  Drama: { path: "/drama", label: "Drama", parent: "Categories" },
  Horror: { path: "/horror", label: "Horror", parent: "Categories" },
  "Sci-Fi": { path: "/sci-fi", label: "Sci-Fi", parent: "Categories" },
  Documentaries: {
    path: "/documentaries",
    label: "Documentaries",
    parent: "Categories",
  },
  "My Library": { path: "/my-library", label: "My Library" },
  Watchlist: { path: "/watchlist", label: "Watchlist" },
  About: { path: "/about", label: "About" },
};

export function getPath(pageName: string): string {
  return routes[pageName]?.path ?? "/";
}

export function getPageName(path: string): string {
  const entry = Object.entries(routes).find(
    ([, config]) => config.path === path,
  );
  return entry ? entry[0] : "Home";
}
