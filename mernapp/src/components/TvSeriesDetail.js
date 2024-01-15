

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { FiLink } from "react-icons/fi";
import StarRating from "./StarRating"
const TvSeriesDetail = () => {
  const [tvSeries, setTVSeries] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    const fetchTVSeries = async () => {
      try {
        // const response = await axios.get(`http://localhost:5000/api/tv-series/${id}`);
        const response = await axios.get(`https://entertainment-app-backend.onrender.com/api/tv-series/${id}`);
        setTVSeries(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    // https://entertainment-app-backend.onrender.com
    fetchTVSeries();
  }, [id]);

  if (!tvSeries) {
    return <div>Loading...</div>;
  }

  return (
<div className='h-[120vh] bg-main text-text'>
<div className='flex relative w-85'>
  <div className="p-5">
    <img className="w-80 h-64 border-2 border-gray-200 rounded-lg shadow-2xl" src={tvSeries.thumbnail.regular.large} />
  </div>
  <div className="text-white flex flex-col h-450 w-full">
    <div className="movie__detailRightTop">

      <div className='font-light text-3xl'><h2>{tvSeries.title}</h2></div>
      <div className=" text-text">{tvSeries.tagline}</div>
      <StarRating rating={tvSeries.starRating} />
      <div className="flex flex-wrap gap-20">
        <div className='pr-10 text-text'>
          Language
          <br />
          <div className='text-white'>{tvSeries.language}</div>
        </div>
        <div className='pr-10 text-text'>
          First Air
          <br />
          <div className='text-white'>{tvSeries.firstAir}</div>
        </div>
        <div className='pr-10 text-text'>
          Last Air
          <br />
          <div className='text-white'>{tvSeries.lastAir}</div>
        </div>
        <div className=' text-text'>
          Status
          <br />
          <div className='text-white'>{tvSeries.status}</div>
        </div>
      </div>
      <div className="my-5">

        <div>Genres</div>
        {
          tvSeries.genres.map(genre => (
              <><span className="px-2 py-1 rounded-md mr-4 text-sm bg-white text-main"  key={genre} >{genre}</span></>
            ))
        }
      </div>
      <div className="my-8 flex-grow-0.8">
                  <div className="text-base mb-4 font-semibold flex items-center relative">Synopsis</div>
                  <div className='text-[14px] text-text max-w-screen-md'>{tvSeries.overview}</div>
              </div>
              <div className="my-4">
                <div className='text-base mb-1 font-semibold flex items-center relative'>Casts</div>
             {tvSeries.casts.map((cast) => (
      <> <span className="pr-2 border border-gray-300 rounded px-2 text-sm bg-main text-text" key={cast}>{cast}</span></> 
      ))}
              </div>
    </div>
    <div className="p-2 flex">
      <a className="mr-5 bg-brown py-2 px-6 flex items-center rounded text-sm no-underline font-bold text-white" href="" target="_blank" rel="noopener noreferrer">
         Website<FiLink />       
      </a>
  </div>
  </div>
  
</div>
</div>
);
};
export default TvSeriesDetail;
