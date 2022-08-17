import React from "react";

const Rating = ({img, rating, text}) => {
  return (
    <div className="imbd_rating">
      <div className="imdb_rating-img">
        <img src={img} alt="" />
      </div>
      <div className="imdb_rating-rating">
        <h5>{text}</h5>
        <h4>
          <strong>{rating}</strong> / 10
        </h4>
      </div>
    </div>
  );
};

export default Rating;
