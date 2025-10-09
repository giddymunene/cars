import React from "react";
import "./CarCard.css";

const CarCard = ({ image, title, description }) => {
  return (
    <div className="carcard">
      <div className="card-inner">
        {/* Front Side */}
        <div className="card-front">
          <div className="logo-container">
            <img src={image} alt={title} className="car-logo" />
          </div>
          <h3>{title}</h3>
        </div>

        {/* Back Side */}
        <div className="card-back">
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
};

export default CarCard;
