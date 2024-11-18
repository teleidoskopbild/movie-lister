import { useState, useEffect } from "react";
import { fetchTrendingMovies } from "../api/tmdbApi.js";
import { Link } from "react-router-dom";

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
      <h1 className="text-2xl font-bold mb-4">Top20 - Trending Movies</h1>
      <div className="movie-list flex flex-wrap justify-center gap-8">
        {movies.map((movie) => {
          const year = new Date(movie.release_date).getFullYear();
          const rating = Math.floor(movie.vote_average * 10) / 10;
          let shortTitle = movie.title;
          if (movie.title.length > 25) {
            shortTitle = movie.title.slice(0, 25) + "...";
          }

          return (
            <div
              key={movie.id}
              className="bg-gray-800 text-white rounded-lg w-48 overflow-hidden relative"
            >
              <p className="bg-gray-00 p-2 text-sm absolute">{rating}</p>
              <Link to={`/movies/${movie.id}`}>
                {" "}
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="movie-poster w-48 h-72 object-cover rounded-t-lg shadow-lg "
                />
                <p className="bg-gray-00 p-2 text-sm absolute bottom-7">
                  {year}
                </p>
                <p className="p-2 text-sm">{shortTitle}</p>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Movies;
