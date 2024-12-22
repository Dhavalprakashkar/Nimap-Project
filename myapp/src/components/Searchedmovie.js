import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../components/styling/deco.css';

const Searchedmovie = () => {
  const Api_key = 'c45a857c193f6302f2b5061c3b85e743';
  const Image_Url = 'https://image.tmdb.org/t/p/w500';
  
  const [state, updatestate] = useState([]);
  const [searchQuery, setSearchQuery] = useState(''); // New state for search query
  const [loading, setLoading] = useState(false); // To handle loading state
  const [noResults, setNoResults] = useState(false); // To handle no results state

  const route = useNavigate();
  const { movie_name } = useParams();

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value); // Update search query
    setNoResults(false); // Reset the no results flag when user types
  };

  const handleSearchSubmit = async () => {
    if (searchQuery.trim() === '') return; // Don't search if input is empty
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${Api_key}&language=en-US&query=${searchQuery}&page=1`
      );
      if (response.data.results.length === 0) {
        setNoResults(true);
      } else {
        setNoResults(false);
      }
      updatestate(response.data.results);
    } catch (error) {
      console.log('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetching data based on the movie name from the URL params
  useEffect(() => {
    if (!movie_name) return; // If no movie_name in the URL, do nothing
    setLoading(true);
    async function fetchData() {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/search/movie?api_key=${Api_key}&language=en-US&query=${movie_name}&page=1`
        );
        updatestate(response.data.results);
        if (response.data.results.length === 0) {
          setNoResults(true);
        }
      } catch (error) {
        console.log('Error fetching movie data', error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [movie_name]);

  return (
    <div>
      {/* Search Bar Section */}
      <div className="search-container">
        
        
      </div>

      {/* Loading and No Results Message */}
      {loading && <p className="loading-text">Loading...</p>}
      {noResults && <p className="no-results">No results found. Try another search.</p>}

      {/* Movie Results Display */}
      <div className="movie-container">
        {state.map((movies) => (
          <div
            className="movie-card"
            onClick={() => {
              route(`/movie/${movies.id}`);
            }}
            key={movies.id}
          >
            <img
              src={`${Image_Url}${movies.poster_path}`}
              alt={movies.title}
            />
            <h6>{movies.title}</h6>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Searchedmovie;
