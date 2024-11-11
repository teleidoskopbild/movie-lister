import { useState, useEffect } from 'react';
import { fetchTrendingActors } from '../api/tmdbApi.js';

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
        console.error("Error fetching actors!", error)
        setError('Error fetching actors!');
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
    <div>
      <h1>Trending Actors</h1>
      <div className="movie-list">
        {actors.map((actor) => (
          <div key={actor.id} className="movie-item">
            <img
              src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
              alt={actor.name}
              className="movie-poster w-48 h-72 object-cover rounded-lg shadow-lg"
            />
            <h2>{actor.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Actors;
