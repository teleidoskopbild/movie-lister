import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  fetchMovieDetails,
  fetchMovieCast,
  fetchMovieImages,
} from "../api/tmdbApi";

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cast, setCast] = useState([]);
  const [images, setImages] = useState([]);

  useEffect(() => {
    const getMovieDetails = async () => {
      try {
        const data = await fetchMovieDetails(id);
        const credits = await fetchMovieCast(id);
        const imagesData = await fetchMovieImages(id);
        setMovie(data);
        setCast(credits);
        setImages(imagesData.backdrops);
        console.log(imagesData);
        setLoading(false);
      } catch (error) {
        setError("Error fetching movie details", error);
        setLoading(false);
      }
    };
    getMovieDetails();
  }, [id]);
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      {" "}
      <h1 className="mt-4 text-center text-4xl sm:text-2xl md:text-5xl font-bold text-white mb-4 mx-4">
        {movie.title}
      </h1>
      <div className="flex flex-col lg:flex-row gap-4 mb-4 m-8">
        <div className="">
          {/* <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="w-36 sm:w-80 lg:w-80 xl:w-96 mx-auto my-4 rounded-lg object-cover"
          /> */}
          {images.length > 0 && (
            <div className="relative flex overflow-x-hidden gap-4 p-4">
              {images.slice(0, 20).map((img) => (
                <img
                  key={img.file_path}
                  src={`https://image.tmdb.org/t/p/w500${img.file_path}`}
                  alt="Movie scene"
                  className="w-full rounded-lg w-64"
                />
              ))}
            </div>
          )}
          <div className="flex flex-col justify-end p-4">
            <p className="my-4 mx-4">{movie.overview}</p>
            <div className="mt-4 mx-4">
              <h2 className="text-xl font-semibold mb-2 text-center">Cast</h2>
              <div className="flex flex-wrap gap-4 justify-center">
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
      </div>
      <div className="mx-12 text-center">
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
