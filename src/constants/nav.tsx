export interface NavItem {
  name: string;
  dropdown?: NavDropdownItem[];
}

export interface NavDropdownItem {
  name?: string;
  divider?: boolean;
}

export const NAV_ITEMS: NavItem[] = [
  { name: "Home" },
  {
    name: "Browse",
    dropdown: [
      { name: "New Releases" },
      { name: "Trending" },
      { name: "Top Rated" },
      { divider: true },
      { name: "Collections" },
    ],
  },
  {
    name: "Categories",
    dropdown: [
      { name: "Action" },
      { name: "Comedy" },
      { name: "Drama" },
      { name: "Horror" },
      { name: "Sci-Fi" },
      { divider: true },
      { name: "Documentaries" },
    ],
  },
  { name: "My Library" },
  { name: "Watchlist" },
  { name: "About" },
];

export const FOOTER_LINKS = [
  {
    heading: "Browse",
    items: [
      { name: "New Releases" },
      { name: "Trending" },
      { name: "Top Rated" },
      { name: "Collections" },
    ],
  },
  {
    heading: "Categories",
    items: [
      { name: "Action" },
      { name: "Comedy" },
      { name: "Drama" },
      { name: "Horror" },
      { name: "Sci-Fi" },
      { name: "Documentaries" },
    ],
  },
  {
    heading: "My Account",
    items: [{ name: "My Library" }, { name: "Watchlist" }],
  },
  {
    heading: "Company",
    items: [
      { name: "About" },
      { name: "Privacy Policy" },
      { name: "Terms of Service" },
      { name: "Contact Us" },
    ],
  },
];
