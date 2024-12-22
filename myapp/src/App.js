import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import UpcomingPage from './components/UpcomingPage';
import SearchedSingleMovieDetail from './components/SearchedSingleMovieDetail';
import Searchedmovie from './components/Searchedmovie';
import MovieDetailPage from './components/MovieDetailPage';
import TopRatedpage from './components/TopRatedPage';
import HomePage from './components/HomePage';
import Navbar from './components/Navbar';


function App() {
  return (
    <div className="App">
      <Navbar></Navbar>
      <Routes>
        
        <Route path="/" element={<HomePage/>}></Route>
        <Route path="/toprated" element={<TopRatedpage/>}></Route>
        <Route path="/upcoming" element={<UpcomingPage/>}></Route>
        <Route path="/singlemovie/:movieid" element={<MovieDetailPage/>}></Route>
        <Route path="/searchedmoviepage/:movie_name" element={<Searchedmovie/>}></Route>
        <Route path="/movie/:movie_id" element={<SearchedSingleMovieDetail/>}></Route>



      </Routes>
      
      
    </div>
  );
}

export default App;