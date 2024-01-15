
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import { FaImdb } from "react-icons/fa6";
import { FiLink } from "react-icons/fi";
import StarRating from "./StarRating";

const MovieDetail = () => {
  const [movie, setMovie] = useState(null);
  const { id } = useParams();
  // https://entertainment-app-backend.onrender.com
  useEffect(() => {
    const fetchMovieDetail = async () => {
      try {
        // const response = await axios.get(`http://localhost:5000/api/movies/${id}`);
        const response = await axios.get(`https://entertainment-app-backend.onrender.com/api/movies/${id}`);
        setMovie(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMovieDetail();
  }, [id]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div className='h-[120vh] bg-main text-text'>
      <div className="flex relative w-85">
        <div className="p-5">
          <img className="w-80 h-64 border-2 border-gray-200 rounded-lg shadow-2xl" src={movie.thumbnail.regular.large} alt={movie.title} />
        </div>
        <div className="text-white flex flex-col h-450 w-full">
          <div className="movie__detailRightTop">
            <div className="font-light text-3xl"><h2>{movie.title}</h2></div>
            <div className=" text-text">{movie.tagline}</div>
            <StarRating rating={movie.starRating} />
            <div className="flex flex-wrap gap-20">
              <div className='pr-10 text-text'>
                Length
                <br />
                <div className='text-white'> {movie.length}.</div>
              </div>
              <div className='pr-10 text-text'>
                Language
                <br />
                <div className='text-white'>{movie.language}</div>
              </div>
              <div className='pr-10 text-text'>
                Year
                <br />
                <div className='text-white'>{movie.year}</div>
              </div>
              <div className='text-text'>
                Status
                <br />
                <div className='text-white'> {movie.status} </div>
              </div>
            </div>
            <div className="my-5">
              <div>Genres</div>
              {movie.genres.map((genre) => (
                <span className="px-2 py-1 rounded-md mr-4 text-sm bg-white text-main" key={genre}>
                  {genre}
                </span>
              ))}
            </div>
            <div className="my-8 flex-grow-0.8">
              <div className="text-base mb-4 font-semibold flex items-center relative">Synopsis</div>
              <div className='text-[14px] text-text max-w-screen-md'>{movie.overview}</div>
            </div>
            <div className="my-4">
              <div className='text-base mb-1 font-semibold flex items-center relative'>Casts</div>
              {movie.casts.map((cast) => (
                <span className="pr-2 border border-gray-300 rounded px-2 text-sm bg-main text-text" key={cast}>
                  {cast}
                </span>
              ))}
            </div>
          </div>
          <div className="p-2 flex"> {/* Flex container for "Website" and "IMDb" links */}
            <a className="mr-5 bg-brown py-2 px-6 flex items-center rounded text-sm no-underline font-bold text-white" href="" target="_blank" rel="noopener noreferrer">
              Website<FiLink />
            </a>
            <a className="mr-5 bg-brown py-2 px-6 flex items-center rounded text-sm no-underline font-bold text-white" href="https://www.imdb.com/" target="_blank" rel="noopener noreferrer">
              IMDb<FaImdb />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
