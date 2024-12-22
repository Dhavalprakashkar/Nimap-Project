import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import '../components/styling/deco.css'

const HomePage = () => {
  const Api_key = "c45a857c193f6302f2b5061c3b85e743";
  const imgbase = "https://image.tmdb.org/t/p/w500";
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); 
  const [totalPages, setTotalPages] = useState(0);  
  const navigate = useNavigate();

  useEffect(() => {
    fetchMovies(currentPage); 
  }, [currentPage]);

  async function fetchMovies(page) {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${Api_key}&language=en-US&page=${page}`
      );
      if (response.data.results) {
        setMovies(response.data.results);
        setTotalPages(response.data.total_pages); 
      } else {
        console.log("Fetching failed");
      }
    } catch (error) {
      console.log(error);
    }
  }

  
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  return (
    <div>
      <div className="movie-container">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="movie-card"
            onClick={() => navigate(`/singlemovie/${movie.id}`)}
          >
            <img src={`${imgbase}${movie.poster_path}`} alt={movie.title} />
            <h6>{movie.title}</h6>
            <h6>Language: {movie.original_language}</h6>
          </div>
        ))}
      </div>

      <div className="pagination-controls">
        <button
          disabled={currentPage === 1}
          onClick={handlePreviousPage}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          disabled={currentPage === totalPages}
          onClick={handleNextPage}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default HomePage;