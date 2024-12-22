import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import '../components/styling/deco.css'


const MovieDetailPage = () => {
  const Api_key = "c45a857c193f6302f2b5061c3b85e743";
  const imgbase = "https://image.tmdb.org/t/p/w500";
  const { movieid } = useParams();
  const [state, updatedstate] = useState(null);
  const [state2, updatedstate2] = useState({ cast: [] });

  useEffect(() => {
    async function fetchMovieDetails() {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieid}?api_key=${Api_key}&language=en-US`
        );
        updatedstate(response.data);
      } catch (error) {
        console.error("Failed to fetch movie details:", error);
      }
    }

    async function fetchCastDetails() {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieid}/credits?api_key=${Api_key}&language=en-US`
        );
        updatedstate2(response.data);
        console.log(response.data,"response3")
      } catch (error) {
        console.error("Failed to fetch cast details:", error);
      }
    }

    fetchMovieDetails();
    fetchCastDetails();
  }, [movieid]);

  return (
    <div className="movie-detail-page">
      {state ? (
        <>
          <div className="movie-header">
            <img
              className="movie-poster"
              src={`${imgbase}${state.poster_path}`}
              alt={state.title}
            />
            <div className="movie-info">
              <h1>{state.title}</h1>
              <p>Rating: <span>{state.vote_average}</span></p>
              <p>Duration: {state.runtime} min</p>
              <p>Genres: {state.genres.map((genre) => genre.name).join(", ")}</p>
              <p>Release Date: {state.release_date}</p>
              <p className="movie-overview">{state.overview}</p>
            </div>
          </div>

          <div className="movie-cast">
            <h2>Cast</h2>
            <div className="cast-container">
              {state2.cast.map((item) => (
                <div className="cast-card" key={item.id}>
                  <img
                    className="cast-image"
                    src={item.profile_path ? `${imgbase}${item.profile_path}` : "https://via.placeholder.com/100"}
                    alt={item.original_name}
                  />
                  <p className="cast-name">{item.original_name}</p>
                  <p className="cast-character">as {item.character}</p>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default MovieDetailPage;