import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import HomePage from './components/HomePage';
import MovieDetailPage from './components/MovieDetailPage';
import TopRatedPage from './components/TopRatedPage';
import UpcomingPage from './components/UpcomingPage';
import Navbar from './components/Navbar';

const API_KEY = 'c45a857c193f6302f2b5061c3b85e743';
const BASE_URL = 'https://api.themoviedb.org/3';

const App = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [searchedMovies, setSearchedMovies] = useState([]);
  const [movieDetail, setMovieDetail] = useState(null); // Renamed this
  const [movieCast, setMovieCast] = useState([]);

  useEffect(() => {
    axios.get(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`)
      .then((res) => setPopularMovies(res.data.results));

    axios.get(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`)
      .then((res) => setTopRatedMovies(res.data.results));

    axios.get(`${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`)
      .then((res) => setUpcomingMovies(res.data.results));
  }, []);

  const fetchMovieDetail = (id) => {
    axios.get(`${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=en-US`)
      .then((res) => setMovieDetail(res.data));

    axios.get(`${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}&language=en-US`)
      .then((res) => setMovieCast(res.data.cast));
  };

  const handleSearch = (query) => {
    axios.get(`${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${query}&page=1`)
      .then((res) => setSearchedMovies(res.data.results));
  };

  return (
    <Router>
      <Navbar onSearch={handleSearch} />
      <Routes>
        <Route path="/" element={<HomePage movies={popularMovies} />} />
        <Route path="/top-rated" element={<TopRatedPage movies={topRatedMovies} />} />
        <Route path="/upcoming" element={<UpcomingPage movies={upcomingMovies} />} />
        <Route path="/movie/:id" element={<MovieDetailPage fetchMovieDetail={fetchMovieDetail} movie={movieDetail} cast={movieCast} />} />
        <Route path="/search" element={<HomePage movies={searchedMovies} />} />
      </Routes>
    </Router>
  );
};

export default App;
