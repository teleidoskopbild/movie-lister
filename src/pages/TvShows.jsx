import { useState, useEffect } from 'react';
import { fetchTrendingShows } from '../api/tmdbApi.js';

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
        console.error("Error fetching tv shows!", error)
        setError('Error fetching tv shows!');
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
    <div>
      <h1>Trending TvShows</h1>
      <div className="movie-list">
        {shows.map((show) => (
          <div key={show.id} className="movie-item">
            <img
              src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
              alt={show.title}
              className="movie-poster w-48 h-72 object-cover rounded-lg shadow-lg"
            />
            <h2>{show.title}</h2>
            <p>{show.overview}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TvShows;
