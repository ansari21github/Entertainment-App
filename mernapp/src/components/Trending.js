


import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { LuDot } from 'react-icons/lu';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addBookmark, removeBookmark , getBookmarks } from '../slices/bookmarkSlice';
import {removeFromBookmarked} from '../slices/bookmarkSlice';
import {addToBookmarks} from '../slices/bookmarkSlice';
import { FaBookmark, FaRegBookmark } from 'react-icons/fa';
import { PiTelevision } from 'react-icons/pi';
import {  MdLocalMovies } from 'react-icons/md';

const Trending = ({ searchTerm }) => {
  const dispatch = useDispatch();
  const [trendingList, setTrendingList] = useState([]); 
  const bookmarks = useSelector((state) => state.bookmarks);
  // https://entertainment-app-backend.onrender.com
  
  useEffect(() => {
    // fetch('http://localhost:5000/api/trending')
    fetch('https://entertainment-app-backend.onrender.com/api/trending')
      .then((response) => response.json())
      .then((data) => {
        console.log('Trending data:', data); // Add this line to log the data
        setTrendingList(data);
      })
      .catch((error) => console.error('Error fetching trending data:', error));
  }, []);


      useEffect(() => {
        // Fetch bookmarks when component mounts
        dispatch(getBookmarks());
      }, [dispatch]);
    

      const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
      };

  const isBookmarked = (item) => bookmarks.some((t) => t._id === item._id);

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

  const filteredTrendingList = trendingList.filter((item) =>
  item.title.toLowerCase().includes(searchTerm.toLowerCase())
);

  return (
    <div className="container mx-auto pl-24 ">
       <h1 className="text-xl mb-4 ml-2 text-white">Trending</h1>
      <div className=" grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1  ">
        <Slider {...settings}>
           {filteredTrendingList.map((item) => (
            <Link
              to={item.category === 'Movie' ? `/movies/${item._id}` : `/tvseries/${item._id}`}
              key={item._id}
            >
              <div className="relative  rounded-lg overflow-hidden shadow-lg m-2">
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
                <img className="w-full h-40 object-cover " src={item.thumbnail.regular.large} alt={item.title} />
                <div className="absolute bottom-0 w-full text-white p-4">
                  <div className="flex items-center mb-2">
                    <p className="text-sm text-gray-300">{item.year}</p>
                    <LuDot className=" text-gray-300" />
                    <p className="text-sm text-gray-300">
                      {item.category === 'Movie' ? <MdLocalMovies /> : <PiTelevision />}
                    </p>
                    <p className="text-sm text-gray-300">{item.category === 'Movie' ? 'Movie' : 'TV Series'}</p>
                    <LuDot className=" text-gray-300" />
                    <p className="text-sm text-gray-300">{item.rating}</p>
                  </div>
                  <h2 className="text-lg  mb-2">{item.title}</h2> 
                </div>
              </div>
            </Link>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Trending;


