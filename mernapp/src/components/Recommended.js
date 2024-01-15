
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LuDot } from 'react-icons/lu';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaBookmark, FaRegBookmark } from 'react-icons/fa';
import { MdLocalMovies } from 'react-icons/md';
import {  PiTelevision } from 'react-icons/pi';
import { addBookmark, removeBookmark , getBookmarks} from '../slices/bookmarkSlice';
import {removeFromBookmarked} from '../slices/bookmarkSlice';
import {addToBookmarks} from '../slices/bookmarkSlice';
const Recommended = ({ searchTerm }) => {
  const dispatch = useDispatch();
  const [recommended, setRecommended] = useState([]);
  const bookmarks = useSelector((state) => state.bookmarks);

  useEffect(() => {
    const fetchRecommended = async () => {
      try {
        // const response = await axios.get('http://localhost:5000/api/recommended');
        const response = await axios.get('https://entertainment-app-backend.onrender.com/api/recommended');

        setRecommended(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRecommended();
  }, []);

  useEffect(() => {
    // Fetch bookmarks when component mounts
    dispatch(getBookmarks());
  }, [dispatch]);

  const isBookmarked = (item) => bookmarks.some((r) => r._id === item._id);

  const handleBookmarkClick = async (event, item) => {
    event.preventDefault();
    event.stopPropagation();

    try {
      if (isBookmarked(item)) {
        dispatch(removeBookmark(item));
         dispatch(removeFromBookmarked({ item: item }));
      } else {
        dispatch(addBookmark(item));
         dispatch(addToBookmarks({ item: item }));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const filteredRecommended = recommended.filter((item) =>
  item.title.toLowerCase().includes(searchTerm.toLowerCase())
);

  return (
    <div className="container mx-auto pl-24 pt-5">
       <h1 className="text-xl mb-4 text-white pl-2">Recommended for you</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
         {filteredRecommended.map((item) => (
          <Link
            to={item.category === 'Movie' ? `/movies/${item._id}` : `/tvseries/${item._id}`}
            key={item._id}
          >
            <div key={item._id} className="relative bg-main p-2 shadow-md rounded-md">
            <button
                onClick={(event) => handleBookmarkClick(event, item)}
                className={`bookmark-btn absolute top-2 right-2 p-4 bg-gray-400 rounded-full cursor-pointer hover:opacity-80 ${isBookmarked(item) ? 'bookmarked' : ''}`}
              >
                {isBookmarked(item) ? (
                  <FaBookmark className="hovered-icon text-white" />
                ) : (
                  <FaRegBookmark className="not-hovered-icon text-white" />
                )}
              </button>
              <img
                src={item.thumbnail.regular.large}
                alt={item.title}
                className="w-full h-40 object-cover mb-3 rounded-md"
              />
              <div className="flex items-center mb-2">
                <p className="text-sm text-gray-400">{item.year}</p>
                <LuDot className=" text-gray-400" />
                <span>
                  {item.category === 'Movie' ? (
                    <MdLocalMovies className="text-gray-400" />
                  ) : (
                    <PiTelevision className="text-gray-400" />
                  )}
                </span>
                <p className="text-sm text-gray-300">
                  {item.category === 'Movie' ? 'Movie' : 'TV Series'}
                </p>
                <LuDot className=" text-gray-400" />
                <p className="text-sm text-gray-400">{item.rating}</p>
              </div>
              <div>
                <h3 className="text-lg text-white">{item.title}</h3>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Recommended;

