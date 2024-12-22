import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const TopRatedpage = () => {
  const Api_key = "c45a857c193f6302f2b5061c3b85e743";
  const imgbase = "https://image.tmdb.org/t/p/w500";
  const [state, updatedstate] = useState([]);
  const [currentPage,   setCurrentPage] = useState(1);  
  const [totalPages, setTotalPages] = useState(0); 
  const path = useNavigate();

  useEffect(() => {
    value(currentPage); 
  }, [currentPage]);

  async function value(page) {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=${Api_key}&language=en-US&page=${page}`
      );
      if (response.data.results) {
        updatedstate(response.data.results);
        setTotalPages(response.data.total_pages);  
      } else {
        console.log("fetching failed");
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1); 
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);  
    }
  };

  return (
    <>
      <div className="movie-container">
        {state.map((item) => (
          <div
            onClick={() => {
              path(`/singlemovie/${item.id}`);
            }}
            key={item.id}
            className="movie-card"
          >
            <img src={`${imgbase}${item.poster_path}`} alt={item.title} />
            <h6>{item.title}</h6>
            <h6>Language: {item.original_language}</h6>
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
    </>
  );
};

export default TopRatedpage;