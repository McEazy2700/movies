import React from "react";
import { getImageURL } from "../../utils/getURL";
import './MovieCard.css'
const MovieCard = ({ movie }) => {
  const imageURL = getImageURL(movie.poster_path, 'original')
  return (
    <div className="movie__card">
      <div className="movie__card-image">
        <img src={imageURL} alt={movie.title} />
      </div>
      <strong className="movie__card-text">
        <p>{movie.title}</p>
      </strong>
    </div>
  );
};

export default MovieCard;
