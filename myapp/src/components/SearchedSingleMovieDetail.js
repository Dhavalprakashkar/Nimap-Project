import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../components/styling/deco.css';

const SearchedSingleMovieDetail = () => {
    const Api_key = 'c45a857c193f6302f2b5061c3b85e743';
    const Image_Url = 'https://image.tmdb.org/t/p/w500';

    const { movie_id } = useParams();

    const [state, updatestate] = useState(null);
    const [caststate, updatecaststate] = useState([]);

    useEffect(() => {
        async function datafetch() {
            try {
                const response = await axios.get(
                    `https://api.themoviedb.org/3/movie/${movie_id}?api_key=${Api_key}&language=en-US`
                );

                if (response) {
                    console.log(response.data, "movie details");
                    updatestate(response.data);
                }
            } catch (error) {
                console.error("Error fetching movie details:", error);
            }
        }

        async function CastDetail() {
            try {
                const response = await axios.get(
                    `https://api.themoviedb.org/3/movie/${movie_id}/credits?api_key=${Api_key}&language=en-US`
                );
                console.log(response.data.cast, "cast details");
                updatecaststate(response.data.cast);
            } catch (error) {
                console.error("Cannot fetch the cast", error);
            }
        }

        datafetch();
        CastDetail();
    }, [movie_id]);

    if (!state) {
        return <p className="loading-text">Loading movie details...</p>;
    }

    return (
        <div className="movie-detail-page">
            <div className="movie-header">
                <img
                    src={`${Image_Url}${state.poster_path}`}
                    alt={state.title}
                    className="movie-poster"
                />
                <div className="movie-info">
                    <h1>{state.title}</h1>
                    <p>
                        <span>Release Date:</span> {state.release_date}
                    </p>
                    <p>
                        <span>Rating:</span> {state.vote_average} / 10
                    </p>
                    <div className="movie-overview">
                        <h3>Overview:</h3>
                        <p>{state.overview}</p>
                    </div>
                </div>
            </div>

            <div className="movie-cast">
                <h2>Cast</h2>
                <div className="cast-container">
                    {caststate.length > 0 ? (
                        caststate.map((actor) => (
                            <div key={actor.id} className="cast-card">
                                <img
                                    src={`${Image_Url}${actor.profile_path}`}
                                    alt={actor.name}
                                    className="cast-image"
                                />
                                <div className="cast-name">{actor.name}</div>
                                <div className="cast-character">
                                    as {actor.character}
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>Loading cast details...</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SearchedSingleMovieDetail;
