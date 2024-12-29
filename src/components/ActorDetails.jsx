import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchActorDetails, fetchActorCredits } from "../api/tmdbApi.js";

function ActorDetails() {
  const { id } = useParams(); // ID aus der URL
  const [actor, setActor] = useState(null);
  const [movies, setMovies] = useState([]);
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getActorData = async () => {
      try {
        // Schauspieler-Details und Credits gleichzeitig laden
        const [actorData, creditsData] = await Promise.all([
          fetchActorDetails(id),
          fetchActorCredits(id),
        ]);

        setActor(actorData);

        // Nach Medien-Typ filtern
        const moviesList = creditsData.cast.filter(
          (item) => item.media_type === "movie"
        );
        const showsList = creditsData.cast.filter(
          (item) => item.media_type === "tv"
        );

        setMovies(moviesList);
        setShows(showsList);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching actor details or credits!", error);
        setError("Error fetching actor details or credits!");
        setLoading(false);
      }
    };

    getActorData();
  }, [id]);

  if (loading) {
    return <div>Loading actor details...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">{actor.name}</h1>
      <div className="flex flex-col md:flex-row gap-8">
        <img
          src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
          alt={actor.name}
          className="w-64 h-auto object-cover rounded-lg shadow-lg"
        />
        <div>
          <h2 className="text-xl font-semibold mb-2">Biography:</h2>
          <p>{actor.biography || "No biography available."}</p>
          <h2 className="text-xl font-semibold mt-4">Known for:</h2>
          <p>{actor.known_for_department}</p>
        </div>
      </div>

      {/* Movies Section */}
      <h2 className="text-2xl font-bold mt-8">Movies:</h2>
      <div className="movie-list flex flex-wrap justify-center gap-8 mt-4">
        {movies.map((movie) => {
          const title = movie.title;
          const posterPath = movie.poster_path;
          const year = movie.release_date
            ? new Date(movie.release_date).getFullYear()
            : "N/A";

          return (
            <div
              key={movie.id}
              className="bg-gray-800 text-white rounded-lg w-48 overflow-hidden relative"
            >
              <img
                src={
                  posterPath
                    ? `https://image.tmdb.org/t/p/w500${posterPath}`
                    : "https://via.placeholder.com/150x225?text=No+Image"
                }
                alt={title}
                className="movie-poster w-48 h-72 object-cover rounded-t-lg shadow-lg"
              />
              <p className="p-2 text-sm">{title}</p>
              <p className="text-xs text-gray-400">{year}</p>
            </div>
          );
        })}
      </div>

      {/* TV Shows Section */}
      <h2 className="text-2xl font-bold mt-8">TV Shows:</h2>
      <div className="movie-list flex flex-wrap justify-center gap-8 mt-4">
        {shows.map((show) => {
          const title = show.name;
          const posterPath = show.poster_path;
          const year = show.first_air_date
            ? new Date(show.first_air_date).getFullYear()
            : "N/A";

          return (
            <div
              key={show.id}
              className="bg-gray-800 text-white rounded-lg w-48 overflow-hidden relative"
            >
              <img
                src={
                  posterPath
                    ? `https://image.tmdb.org/t/p/w500${posterPath}`
                    : "https://via.placeholder.com/150x225?text=No+Image"
                }
                alt={title}
                className="movie-poster w-48 h-72 object-cover rounded-t-lg shadow-lg"
              />
              <p className="p-2 text-sm">{title}</p>
              <p className="text-xs text-gray-400">{year}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ActorDetails;
