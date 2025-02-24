import { useState, useEffect } from "react";
import { fetchTrendingShows } from "../api/tmdbApi.js";
import { Link } from "react-router-dom";

function TvShows() {
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1); // Aktuelle Seite
  const [hasMore, setHasMore] = useState(true); // Gibt es mehr Seiten?

  const getTvShows = async (currentPage) => {
    try {
      setLoading(true);
      const data = await fetchTrendingShows(currentPage);
      setShows(data.results); // Ergebnisse ersetzen (keine Anhängung)
      setHasMore(data.page < data.total_pages); // Prüfen, ob weitere Seiten existieren
      setLoading(false);
    } catch (error) {
      console.error("Error fetching tv shows!", error);
      setError("Error fetching tv shows!");
      setLoading(false);
    }
  };

  useEffect(() => {
    getTvShows(page); // TV-Shows für die aktuelle Seite laden
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 100);
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
        Trending TvShows
      </h1>
      <div className="movie-list flex flex-wrap justify-center gap-8">
        {shows.map((show) => {
          const year = new Date(show.first_air_date).getFullYear();
          const rating = (Math.floor(show.vote_average * 10) / 10).toFixed(1);
          let shortName = show.name;
          if (show.name.length > 20) {
            shortName = show.name.slice(0, 20) + "...";
          }

          return (
            <div
              key={show.id}
              className="bg-gray-800 text-white rounded-lg w-60 overflow-hidden relative"
            >
              <p className="p-2 text-sm absolute">
                <span className="text-gray-100 bg-blue-500 rounded-md p-1">
                  {rating}
                </span>
              </p>
              <Link to={`/tv-shows/${show.id}`}>
                <img
                  src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
                  alt={show.name}
                  className="movie-poster w-60 h-80 object-cover rounded-t-lg shadow-lg"
                />
                <p className="p-0 text-xs absolute top-3 right-2">
                  <span className="text-gray-100 bg-blue-500 rounded-md p-1">
                    {year}
                  </span>
                </p>
                <p className="bg-blue-700 p-2 text-sm">{shortName}</p>
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

export default TvShows;
