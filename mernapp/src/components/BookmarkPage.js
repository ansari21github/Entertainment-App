
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { MdLocalMovies } from 'react-icons/md';
import { PiTelevision } from 'react-icons/pi';
import { FaBookmark, FaRegBookmark } from 'react-icons/fa';
import { LuDot } from 'react-icons/lu';
import Sidebar from './Sidebar';
import { FaSearch } from "react-icons/fa";
import { addBookmark, removeBookmark } from '../slices/bookmarkSlice';
import {removeFromBookmarked} from '../slices/bookmarkSlice';
import {addToBookmarks , getBookmarks} from '../slices/bookmarkSlice';

const BookmarkPage = () => {
  const dispatch = useDispatch();
  const bookmarks = useSelector((state) => state.bookmarks);
  const [filteredBookmarks, setFilteredBookmarks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
console.log(bookmarks)

useEffect(() => {
  dispatch(getBookmarks());
}, [dispatch]);

  useEffect(() => {

    const filtered = bookmarks.filter((item) =>
  item && item.title && item.title.toLowerCase().includes(searchTerm.toLowerCase())
);

    setFilteredBookmarks(filtered);
  }, [bookmarks, searchTerm]);

  
  const handleBookmarkClick = async (event, item) => {
    event.preventDefault();
    event.stopPropagation();

    try {
      if (bookmarks.includes(item)) {
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




  const bookmarkedMovies = filteredBookmarks.filter((item) => item.category === 'Movie');
  const bookmarkedTVSeries = filteredBookmarks.filter((item) => item.category === 'TV Series');

  return (
    <div className="bg-main h-[150vh]">
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
        <div className="mb-8">
          <h2 className="text-lg mb-2 text-white">Bookmarked Movies</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {bookmarkedMovies.map((item) => (
              <Link to={`/movies/${item._id}`} key={item._id}>
                <div className="relative bg-main p-2 shadow-md rounded-md">
                  <button
                    onClick={(event) => handleBookmarkClick(event, item)}
                    className={`bookmark-btn absolute top-2 right-2 p-4 bg-gray-400 rounded-full cursor-pointer hover:opacity-80 ${bookmarks.includes(item) ? 'bookmarked' : ''}`}
                  >
                    {bookmarks.includes(item) ? (
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
                    <p className="text-gray-400">{item.category === 'Movie' ? 'Movie' : 'TV Series'}</p>
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

        <div className="mb-8">
          <h2 className="text-lg mb-2 text-white">Bookmarked TV Series</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {bookmarkedTVSeries.map((item) => (
              <Link to={`/tvseries/${item._id}`} key={item._id}>
                <div className="relative bg-main p-2 shadow-md rounded-md">
                  <button
                    onClick={(event) => handleBookmarkClick(event, item)}
                    className={`bookmark-btn absolute top-2 right-2 p-4 bg-gray-400 rounded-full cursor-pointer hover:opacity-80 ${bookmarks.includes(item) ? 'bookmarked' : ''}`}
                  >
                    {bookmarks.includes(item) ? (
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
                    <p className="text-gray-400">{item.category === 'Movie' ? 'Movie' : 'TV Series'}</p>
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
      </div>
    </div>
  );
};

export default BookmarkPage;
