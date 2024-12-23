import { useState, useEffect } from "react";
import { fetchTrendingActors } from "../api/tmdbApi.js";
import { Link } from "react-router-dom";

function Actors() {
  const [actors, setActors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getActors = async () => {
      try {
        const data = await fetchTrendingActors();
        setActors(data.results);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching actors!", error);
        setError("Error fetching actors!");
        setLoading(false);
      }
    };
    getActors();
  }, []);

  if (loading) {
    return <div>Loading trending Actors...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Top20 - Trending Actors</h1>
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
    </div>
  );
}

export default Actors;
