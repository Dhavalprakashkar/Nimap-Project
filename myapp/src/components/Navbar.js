import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (query) {
      onSearch(query);
    }
  };

  return (
    <nav>
      <ul>
        <li><Link to="/">Popular Movies</Link></li>
        <li><Link to="/top-rated">Top Rated</Link></li>
        <li><Link to="/upcoming">Upcoming Movies</Link></li>
      </ul>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
    </nav>
  );
};
export default Navbar;