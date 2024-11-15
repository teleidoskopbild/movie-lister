
const BASE_URL = "https://api.themoviedb.org/3";
const TOKEN = import.meta.env.VITE_TMDB_ACCESS_TOKEN;

export async function fetchTrendingMovies() {
  const response = await fetch(`${BASE_URL}/trending/movie/week`, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch trending movies");
  }
  return response.json();
}


export async function fetchTrendingShows() {
  const response = await fetch(`${BASE_URL}/trending/tv/week`, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch trending tv shows");
  }
  return response.json();
}

export async function fetchTrendingActors() {
  const response = await fetch(`${BASE_URL}/trending/person/week`, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch trending actors");
  }
  return response.json();
}