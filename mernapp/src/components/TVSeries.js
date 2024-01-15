

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import { PiTelevision } from 'react-icons/pi';
import { LuDot } from 'react-icons/lu';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaBookmark, FaRegBookmark } from 'react-icons/fa';
import { FaSearch } from "react-icons/fa";
import { addBookmark, removeBookmark, getBookmarks } from '../slices/bookmarkSlice';
import {removeFromBookmarked} from '../slices/bookmarkSlice';
import {addToBookmarks} from '../slices/bookmarkSlice';

const TVSeries = () => {
  const dispatch = useDispatch();
  const [tvSeries, setTVSeries] = useState([]);
  const bookmarks = useSelector((state) => state.bookmarks);
  const [searchTerm, setSearchTerm] = useState('');
  // https://entertainment-app-backend.onrender.com
  useEffect(() => {
    const fetchTVSeries = async () => {
      try {
        // const response = await axios.get('http://localhost:5000/api/tv-series');
        const response = await axios.get('https://entertainment-app-backend.onrender.com/api/tv-series');
        setTVSeries(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTVSeries();
  }, []);

  useEffect(() => {
    // Fetch bookmarks when component mounts
    dispatch(getBookmarks());
  }, [dispatch]);

  const isBookmarked = (tvSeries) => bookmarks.some((t) => t._id === tvSeries._id);

  const handleBookmarkClick = async (event, series) => {
    event.preventDefault();
    event.stopPropagation();

    try {
      if (isBookmarked(series)) {
        dispatch(removeBookmark(series));
         dispatch(removeFromBookmarked({ item: series }));
      } else {
        dispatch(addBookmark(series));
       dispatch(addToBookmarks({ item: series }));
      }
    } catch (error) {
      console.error(error);
    }
  };
  
  const filteredSeries = tvSeries.filter((series) =>
  series.title.toLowerCase().includes(searchTerm.toLowerCase())
)

  return (
    <div className="bg-main min-h-screen">
      <div>
      <div className=' h-auto md:w-96  bg-main p-4  ml-32 '>
          <section className='w-full h-10 flex items-center'>
            <span className='w-8 h-full flex items-center font-light text-white'><FaSearch />
            </span>
            <input type='text' placeholder='Search for movies or Tv Series' className='w-full h-full font-medium md:pl-2 focus:outline-none text-text bg-main' value={searchTerm}  onChange={(e) => setSearchTerm(e.target.value)} />
          </section>
        </div>
      </div>
      <div>
        <Sidebar />
      </div>
      <div className="container mx-auto pl-20">
        <h1 className="text-xl mb-4 text-white pl-2">TV Series</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {filteredSeries.map((series) => (
            <Link to={`/tvseries/${series._id}`} key={series._id}>
              <div className="relative bg-main p-2 shadow-md rounded-md" key={series._id}>
              <button
                  onClick={(event) => handleBookmarkClick(event, series)}
                  className={`bookmark-btn absolute top-2 right-2 p-4 bg-gray-400 rounded-full cursor-pointer hover:opacity-80 ${isBookmarked(series) ? 'bookmarked' : ''}`}
                >
                  {isBookmarked(series) ? (
                    <FaBookmark className="hovered-icon text-white " />
                  ) : (
                    <FaRegBookmark className="not-hovered-icon text-white" />
                  )}
                </button>
                <img
                  src={series.thumbnail.regular.large}
                  alt={series.title}
                  className="w-full h-40 object-cover mb-3 rounded-md"
                />
                <div className="flex items-center mb-2">
                  <p className="text-sm text-gray-400">{series.year}</p>
                  <LuDot className=" text-gray-400" />
                  <span>
                    <PiTelevision className="text-gray-400" />
                  </span>
                  <p className="text-gray-400">TV Series</p>
                  <LuDot className=" text-gray-400" />
                  <p className="text-sm text-gray-400">{series.rating}</p>
                </div>
                <div>
                  <h3 className="text-lg text-white">{series.title}</h3>
                </div>
                
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TVSeries;
