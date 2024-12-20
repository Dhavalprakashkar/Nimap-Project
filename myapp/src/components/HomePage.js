import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = ({ movies }) => (
  <div>
    <h1>Popular Movies</h1>
    <div className="movie-grid">
      {movies.map((movie) => (
        <div key={movie.id} className="movie-card">
          <Link to={`/movie/${movie.id}`}>
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
            <h2>{movie.title}</h2>
          </Link>
        </div>
      ))}
    </div>
  </div>
);

export default HomePage;