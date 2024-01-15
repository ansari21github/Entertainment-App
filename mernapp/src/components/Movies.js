

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { MdLocalMovies } from 'react-icons/md';
import { LuDot } from 'react-icons/lu';
import { FaBookmark, FaRegBookmark } from 'react-icons/fa';
import { FaSearch } from "react-icons/fa";
import Sidebar from './Sidebar';
import { addBookmark, removeBookmark , getBookmarks } from '../slices/bookmarkSlice';
import {removeFromBookmarked} from '../slices/bookmarkSlice';
import {addToBookmarks} from '../slices/bookmarkSlice';

const Movies = () => {
  const dispatch = useDispatch();
  const [movies, setMovies] = useState([]);
  const bookmarks = useSelector((state) => state.bookmarks);
  const [searchTerm, setSearchTerm] = useState('');

  // https://entertainment-app-backend.onrender.com
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        // const response = await axios.get('http://localhost:5000/api/movies');
        const response = await axios.get('https://entertainment-app-backend.onrender.com/api/movies');
        setMovies(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    

    fetchMovies();
  }, []);

  useEffect(() => {
    // Fetch bookmarks when component mounts
    dispatch(getBookmarks());
  }, [dispatch]);

  const isBookmarked = (movie) => bookmarks.some((m) => m._id === movie._id);

  const handleBookmarkClick = async (event, movie) => {
    event.preventDefault();
    event.stopPropagation();

    try {
      if (isBookmarked(movie)) {
        dispatch(removeBookmark(movie));
         dispatch(removeFromBookmarked({ item: movie }));
      } else {
        dispatch(addBookmark(movie));
         dispatch(addToBookmarks({ item: movie }));
      }
    } catch (error) {
      console.error(error);
    }
  };


  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  // const filteredMovies = movies.length > 0
  // ? movies.filter((movie) =>
  //     movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  //   )
  // : [];

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
        <h1 className="text-xl mb-4 text-white pl-2">Movies</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {filteredMovies.map((movie) => (
            <Link to={`/movies/${movie._id}`} key={movie._id}>
              <div className="relative bg-main p-2 shadow-md rounded-md" key={movie._id}>
                <button
                  onClick={(event) => handleBookmarkClick(event, movie)}
                  className={`bookmark-btn absolute top-2 right-2 p-4 bg-gray-400 rounded-full cursor-pointer hover:opacity-80 ${isBookmarked(movie) ? 'bookmarked' : ''}`}
                >
                  {isBookmarked(movie) ? (
                    <FaBookmark className="hovered-icon text-white" />
                  ) : (
                    <FaRegBookmark className="not-hovered-icon text-white" />
                  )}
                </button>
                {/* {isBookmarked(movie) ? (
                    <FaBookmark className={`hovered-icon text-white bookmark-btn  cursor-pointer hover:opacity-80 ${isBookmarked(movie) ? 'bookmarked' : ''} `} onClick={(event) => handleBookmarkClick2(event, movie)} />
                  ) : (
                    <FaRegBookmark className={`not-hovered-icon text-white bookmark-btn   cursor-pointer hover:opacity-80 ${isBookmarked(movie) ? 'bookmarked' : ''} `} onClick={(event) => handleBookmarkClick1(event, movie)} />
                  )} */}
                <img
                  src={movie.thumbnail.regular.large}
                  alt={movie.title}
                  className="w-full h-40 object-cover mb-3 rounded-md"
                />
                <div className="flex items-center mb-2">
                  <p className="text-sm text-gray-400">{movie.year}</p>
                  <LuDot className=" text-gray-400" />
                  <span>
                    <MdLocalMovies className="text-gray-400" />
                  </span>
                  <p className="text-gray-400">Movie</p>
                  <LuDot className=" text-gray-400" />
                  <p className="text-sm text-gray-400">{movie.rating}</p>
                </div>
                <div>
                  <h3 className="text-lg text-white">{movie.title}</h3>
                </div>

              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Movies;

