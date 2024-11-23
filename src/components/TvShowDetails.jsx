import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchTvShowDetails, fetchTvShowCast } from "../api/tmdbApi";

function TvShowDetails() {
  const { id } = useParams();
  const [show, setShow] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cast, setCast] = useState([]);

  useEffect(() => {
    const getTvShowDetails = async () => {
      try {
        const data = await fetchTvShowDetails(id); // Holen der Details für den Film
        const credits = await fetchTvShowCast(id); // Holen der Credits (Cast) für den Film
        setShow(data);
        console.log(credits);
        setCast(credits);
        console.log(cast);
        setLoading(false);
      } catch (error) {
        setError("Error fetching tv-show details", error);
        setLoading(false);
      }
    };
    getTvShowDetails();
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
        {show.name}
      </h1>
      <div className="flex flex-col sm:flex-row gap-8 mb-4 m-8">
        <img
          src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
          alt={show.name}
          className="w-full sm:w-48 md:w-64 lg:w-80 xl:w-96 mx-auto my-4 rounded-lg object-cover"
        />
        <div className="flex flex-col justify-end p-4">
          <p className="my-4 mx-4">{show.overview}</p>
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
          <strong>First air date: </strong> {show.first_air_date}
        </p>
        <p>
          <strong>Rating:</strong> {show.vote_average}
        </p>
        <p>
          <strong>Genres:</strong>{" "}
          {show.genres.map((genre) => genre.name).join(", ")}
        </p>
      </div>
    </div>
  );
}

export default TvShowDetails;
