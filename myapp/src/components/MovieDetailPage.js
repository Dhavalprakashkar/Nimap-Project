import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';


const MovieDetailPage = ({ fetchMovieDetail, movie, cast }) => {
  const { id } = useParams();

  // Fetch movie details when the id changes
  useEffect(() => {
    fetchMovieDetail(id);
  }, [id, fetchMovieDetail]);

  if (!movie) {
    return <p>Loading movie details...</p>;
  }

  return (
    <div className="movie-detail">
      <div className="poster">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
      </div>
      <div className="info">
        <h1>{movie.title}</h1>
        <p>{movie.overview}</p>
        <div className="tags">
          {movie.genres &&
            movie.genres.map((genre) => (
              <span key={genre.id}>{genre.name}</span>
            ))}
        </div>
        <p>
          <strong>Release Date:</strong> {movie.release_date}
        </p>
      </div>
      <div className="cast-section">
        <h2>Cast</h2>
        <div className="cast-list">
          {cast && cast.length > 0 ? (
            cast.map((actor) => (
              <div className="cast-card" key={actor.id}>
                <img
                  src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`}
                  alt={actor.name}
                />
                <p>{actor.name}</p>
              </div>
            ))
          ) : (
            <p>No cast information available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieDetailPage;
