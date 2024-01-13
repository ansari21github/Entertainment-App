// src/components/StarRating.js

import React from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';


const StarRating = ({ rating }) => {
  const MAX_STARS = 5;
  const stars = [];

  // Calculate the number of full stars
  const fullStars = Math.floor(rating);

  // Check if there's a half star
  const hasHalfStar = rating % 1 !== 0;

  // Generate full stars
  for (let i = 0; i < fullStars; i++) {
    stars.push(<FaStar key={i} />);
  }

  // Generate half star if needed
  if (hasHalfStar) {
    stars.push(<FaStarHalfAlt key={fullStars} />);
  }

  // Generate empty stars to fill up to 5
  for (let i = stars.length; i < MAX_STARS; i++) {
    stars.push(<FaRegStar key={i} />);
  }

  return (
    <div className="star-rating-container">
      <p className="numeric-rating">{rating}</p>
      <div className="star-rating">{stars}</div>   
    </div>
  );
};

export default StarRating;

