import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import '../components/styling/deco.css'

const Navbar = () => {
  const Api_key = "c45a857c193f6302f2b5061c3b85e743";
  const imgbase = "https://image.tmdb.org/t/p/w500";
  const[movie_name,updatedmovie_name]=useState("")
  
    const path= useNavigate()

    function value(){
        path("/toprated")

    }
    function value2(){
        path("/")

    }
    function value3(){
        path("/upcoming")

    }
    function userdata(event){
      console.log(event.target.value)
      updatedmovie_name(event.target.value)
    }

   async function fetchmovie(){
    path(`searchedmoviepage/${movie_name}`)
    
  }
  return (
    <div>
        <div className="navbar">
        <div className="logo">🎬MovieDb</div>
        <div onClick={value2} className="nav-link">Popular</div>
        <div onClick={value} className="nav-link">Top Rated</div>
        <div onClick={value3} className="nav-link">Upcoming</div>
        <div className="search-container">
          <input
            type="text"
            onChange={userdata}
            placeholder="Movie Name"
            className="search-input"
          />
          <button onClick={fetchmovie} className="search-button">Search</button>
        </div>
      </div>
      
    </div>
  )
}

export default Navbar