import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchActorDetails } from "../api/tmdbApi.js";

function ActorDetails() {
  const { id } = useParams(); // ID aus der URL
  const [actor, setActor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getActorDetails = async () => {
      try {
        const data = await fetchActorDetails(id);
        setActor(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching actor details!", error);
        setError("Error fetching actor details!");
        setLoading(false);
      }
    };
    getActorDetails();
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
          <ul>{actor.known_for_department}</ul>
        </div>
      </div>
    </div>
  );
}

export default ActorDetails;
