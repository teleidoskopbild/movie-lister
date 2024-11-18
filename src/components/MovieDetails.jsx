import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchMovieDetails, fetchMovieCast } from "../api/tmdbApi";

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cast, setCast] = useState([]);

  useEffect(() => {
    const getMovieDetails = async () => {
      try {
        const data = await fetchMovieDetails(id); // Holen der Details für den Film
        const credits = await fetchMovieCast(id); // Holen der Credits (Cast) für den Film
        setMovie(data);
        console.log(credits);
        setCast(credits);
        console.log(cast);
        setLoading(false);
      } catch (error) {
        setError("Error fetching movie details", error);
        setLoading(false);
      }
    };
    getMovieDetails();
  }, [id, cast]); // Die ID ändert sich, wenn der Film gewechselt wird

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      {" "}
      <h1 className="text-4xl sm:text-2xl md:text-5xl font-bold text-white mb-4 mx-4">
        {movie.title}
      </h1>
      <div className="flex flex-col sm:flex-row gap-8 mb-4 m-8">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="w-full sm:w-48 md:w-64 lg:w-80 xl:w-96 mx-auto my-4 rounded-lg object-cover"
        />
        <div className="flex flex-col justify-end p-4">
          <p className="my-4 mx-4">{movie.overview}</p>
          <div className="mt-4 mx-4">
            <h2 className="text-xl font-semibold mb-2">Cast</h2>
            <div className="flex flex-wrap gap-4">
              {cast &&
                cast.slice(0, 6).map((actor) => (
                  <div key={actor.id} className="w-32 sm:w-40 md:w-48">
                    <img
                      src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                      alt={actor.name}
                      className="rounded-md"
                    />
                    <div className="bg-gray-800 text-white p-2 mt-2 rounded-md text-center">
                      <p className="text-xs">{actor.name}</p>
                      <p className="text-xs italic">{actor.character}</p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
      <div className="mx-12">
        <p>
          <strong>Release Date:</strong> {movie.release_date}
        </p>
        <p>
          <strong>Rating:</strong> {movie.vote_average}
        </p>
        <p>
          <strong>Genres:</strong>{" "}
          {movie.genres.map((genre) => genre.name).join(", ")}
        </p>
      </div>
    </div>
  );
}

export default MovieDetails;
