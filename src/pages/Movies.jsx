import { useState, useEffect } from "react";
import { fetchTrendingMovies } from "../api/tmdbApi.js";

function Movies() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getMovies = async () => {
      try {
        const data = await fetchTrendingMovies();
        setMovies(data.results);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching movies!", error);
        setError("Error fetching movies!");
        setLoading(false);
      }
    };
    getMovies();
  }, []);

  if (loading) {
    return <div>Loading trending Movies...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Trending Movies</h1>
      <div className="movie-list flex flex-wrap justify-center gap-8">
        {movies.map((movie) => (
          <div key={movie.id}>
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="movie-poster w-48 h-72 object-cover rounded-lg shadow-lg "
            />
            {/* <h2>{movie.title}</h2> */}
            {/* <p className="text-sm text-darkgray-600 text-justify">
              {movie.overview}
            </p> */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Movies;
