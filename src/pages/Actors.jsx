import { useState, useEffect } from "react";
import { fetchTrendingActors } from "../api/tmdbApi.js";
import { Link } from "react-router-dom";

function Actors() {
  const [actors, setActors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1); // Aktuelle Seite
  const [hasMore, setHasMore] = useState(true); // Gibt es mehr Seiten?

  const getActors = async (currentPage) => {
    try {
      const data = await fetchTrendingActors(currentPage);
      // const filteredActors = data.results.filter(
      //   (actor) => actor.adult === false
      // );
      // setActors(filteredActors);
      setActors(data.results);
      setHasMore(data.results.length > 0);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching actors!", error);
      setError("Error fetching actors!");
      setLoading(false);
    }
  };

  useEffect(() => {
    getActors(page);
  }, [page]);

  const handlePageChange = (newPage) => {
    setPage(newPage); // Seite wechseln
  };

  if (loading) {
    return <div>Loading trending Actors...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Trending Actors</h1>
      <div className="movie-list flex flex-wrap justify-center gap-8">
        {actors.map((actor) => (
          <Link
            key={actor.id}
            to={`/actors/${actor.id}`}
            className="bg-gray-800 text-white rounded-lg w-48 overflow-hidden relative"
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
              alt={actor.name}
              className="movie-poster w-48 h-72 object-cover rounded-lg shadow-lg"
            />
            <h2 className="p-2">{actor.name}</h2>
          </Link>
        ))}
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

export default Actors;
