const BASE_URL = "https://api.themoviedb.org/3";
const TOKEN = import.meta.env.VITE_TMDB_ACCESS_TOKEN;

export async function fetchTrendingMovies(page = 1) {
  const response = await fetch(`${BASE_URL}/trending/movie/week?page=${page}`, {
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

export async function fetchMovieDetails(id) {
  const response = await fetch(`${BASE_URL}/movie/${id}`, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch movie details");
  }

  return response.json();
}

export async function fetchMovieCast(movieId) {
  const response = await fetch(`${BASE_URL}/movie/${movieId}/credits`, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch movie cast");
  }
  const data = await response.json();
  return data.cast;
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

export async function fetchTvShowDetails(id) {
  const response = await fetch(`${BASE_URL}/tv/${id}`, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch tv-show details");
  }

  return response.json();
}

export async function fetchTvShowCast(id) {
  const response = await fetch(`${BASE_URL}/tv/${id}/credits`, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch tv-show cast");
  }
  const data = await response.json();
  return data.cast;
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

export async function fetchActorDetails(actorId) {
  const response = await fetch(`${BASE_URL}/person/${actorId}`, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch actor details");
  }
  return response.json();
}
