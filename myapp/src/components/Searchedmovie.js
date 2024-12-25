import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import '../components/styling/deco.css'

const Searchedmovie = () => {
    const Api_key= 'c45a857c193f6302f2b5061c3b85e743'
    const Image_Url = 'https://image.tmdb.org/t/p/w500';
    
    const[state,updatestate]=useState([])
    const route=useNavigate()
    // useEffect(()=>{
    //     console.log(state,"statefromsearch")
    // })



    const {movie_name}=useParams()
    // useEffect(()=>{console.log(movie_name,'MovieNAME')})

    useEffect(()=>{
        async function datafetch(){
        try{
            
            const response =await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${Api_key}&language=en-US&query=${movie_name}&page=1`)
            if(response){
                updatestate(response.data.results)
                
            }
        }
        catch(error){
        console.log("error")
        }
    }   
    datafetch()
    })
    


  return (
    <div>
    <div>Searchedmovie</div>
    <div className='movie-container'>

    {state.map((movies)=>(
        <div onClick={()=>{route(`/movie/${movies.id}`)}}
        className='movie-card'
        >
            
        <img src={`${Image_Url}${movies.poster_path}`} alt='error'
        className='movie-card'
        />        
        </div>


    ))
    }
    </div>
    </div>
  )
}

export default Searchedmovie