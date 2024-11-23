import { useState, useEffect } from "react";
import { fetchTrendingShows } from "../api/tmdbApi.js";
import { Link } from "react-router-dom";

function TvShows() {
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getTvShows = async () => {
      try {
        const data = await fetchTrendingShows();
        setShows(data.results);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching tv shows!", error);
        setError("Error fetching tv shows!");
        setLoading(false);
      }
    };
    getTvShows();
  }, []);

  if (loading) {
    return <div>Loading trending Movies...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Top20 - Trending TvShows</h1>
      <div className="movie-list flex flex-wrap justify-center gap-8">
        {shows.map((show) => {
          const year = new Date(show.first_air_date).getFullYear();
          const rating = Math.floor(show.vote_average * 10) / 10;
          let shortName = show.name;
          if (show.name.length > 20) {
            shortName = show.name.slice(0, 20) + "...";
          }

          return (
            <div
              key={show.id}
              className="bg-gray-800 text-white rounded-lg w-48 overflow-hidden relative"
            >
              <p className="bg-gray-00 p-2 text-sm absolute">{rating}</p>
              <Link to={`/tv-shows/${show.id}`}>
                <img
                  src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
                  alt={show.name}
                  className="movie-poster w-48 h-72 object-cover rounded-t-lg shadow-lg"
                />
                <p className="bg-gray-00 p-2 text-sm absolute bottom-7">
                  {year}
                </p>
                <p className="p-2 text-sm">{shortName}</p>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default TvShows;
