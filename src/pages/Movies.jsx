import { useState, useEffect } from "react";
import { fetchTrendingMovies } from "../api/tmdbApi.js";
import { Link } from "react-router-dom";

function Movies() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1); // Aktuelle Seite
  const [hasMore, setHasMore] = useState(true); // Gibt es mehr Seiten?

  const getMovies = async (currentPage) => {
    try {
      setLoading(true);
      const data = await fetchTrendingMovies(currentPage);
      setMovies(data.results); // Ergebnisse ersetzen (keine Anhängung)
      setHasMore(data.results.length > 0); // Prüfen, ob weitere Filme existieren
      setLoading(false);
    } catch (error) {
      console.error("Error fetching movies!", error);
      setError("Error fetching movies!");
      setLoading(false);
    }
  };

  useEffect(() => {
    getMovies(page); // Filme für die aktuelle Seite laden
  }, [page]);

  const handlePageChange = (newPage) => {
    setPage(newPage); // Seite wechseln
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-center sm:text-left">
        Trending Movies
      </h1>

      {/* Ladeanzeige */}
      {loading && <div className="text-center mb-4">Loading movies...</div>}

      <div className="movie-list flex flex-wrap justify-center gap-8">
        {movies.map((movie) => {
          const year = new Date(movie.release_date).getFullYear();
          const rating = (Math.floor(movie.vote_average * 10) / 10).toFixed(1);
          let shortTitle = movie.title;
          if (movie.title.length > 25) {
            shortTitle = movie.title.slice(0, 25) + "...";
          }

          return (
            <div
              key={movie.id}
              className="bg-gray-800 text-white rounded-lg w-60 overflow-hidden relative"
            >
              <p className="p-2 text-sm absolute">
                <span className="text-gray-100 bg-blue-500 rounded-md p-1">
                  {rating}
                </span>
              </p>
              <Link to={`/movies/${movie.id}`}>
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="movie-poster w-60 h-80 object-cover rounded-t-lg shadow-lg"
                />
                <p className="p-0 text-xs absolute top-3 right-2">
                  <span className="text-gray-100 bg-blue-500 rounded-md p-1">
                    {year}
                  </span>
                </p>
                <p className="bg-blue-700 p-2 text-sm">{shortTitle}</p>
              </Link>
            </div>
          );
        })}
      </div>

      <div className="pagination-controls flex justify-center mt-4 gap-4">
        {/* Previous Button */}
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1 || loading} // Deaktiviert bei erster Seite oder während des Ladens
          className="w-32 px-4 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50"
        >
          Previous
        </button>

        {/* Page Number */}
        <span className="flex items-center justify-center w-20 h-10 bg-blue-500 text-white rounded-md">
          {page}
        </span>

        {/* Next Button */}
        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={!hasMore || loading} // Deaktiviert bei keiner weiteren Seite oder während des Ladens
          className="w-32 px-4 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Movies;
