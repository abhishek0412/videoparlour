export const API_BASE_URL = "https://potterapi-fedeperin.vercel.app/en";

export const API_ENDPOINTS = {
  BOOKS: `${API_BASE_URL}/books`,
  SPELLS: `${API_BASE_URL}/spells`,
  HOUSES: `${API_BASE_URL}/houses`,
  CHARACTERS: `${API_BASE_URL}/characters`,
} as const;
