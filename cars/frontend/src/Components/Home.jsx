import React from "react";
import { useNavigate } from "react-router-dom";
import CarCard from "./CarCard"; 
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();

  const carData = [
    {
      image: "https://www.carlogos.org/car-logos/mercedes-benz-logo.png",
      title: "MERCEDES-BENZ",
      description: "Luxury Redefined."
    },
    {
      image: "https://www.carlogos.org/car-logos/bmw-logo.png",
      title: "BMW",
      description: "Ultimate Driving Machines."
    },
    {
      image: "https://www.carlogos.org/car-logos/mazda-logo.png",
      title: "MAZDA",
      description: "Driving Dynamics."
    },
    {
      image: "https://www.carlogos.org/car-logos/toyota-logo.png",
      title: "TOYOTA",
      description: "Dominating the Market."
    },
    {
      image: "https://www.carlogos.org/car-logos/porsche-logo.png",
      title: "PORSCHE",
      description: "Known for its speed, performance, engineering, and iconic design."
    },
    {
      image: "https://www.carlogos.org/car-logos/honda-logo.png",
      title: "HONDA",
      description: "Engineering Excellence."
    },
    {
      image: "https://www.carlogos.org/car-logos/subaru-logo.png",
      title: "SUBARU",
      description: "Iconic sports car with thrilling performance and style."
    },
    {
      image: "https://www.carlogos.org/car-logos/ford-logo.png",
      title: "FORD",
      description: "Versatility and Performance."
    },
    {
      image: "https://www.carlogos.org/car-logos/audi-logo.png",
      title: "AUDI",
      description: "Versatility and Performance."
    },
    {
      image: "https://www.carlogos.org/car-logos/lexus-logo.png",
      title: "LEXUS",
      description: "Versatility and Performance."
    },
    {
      image: "https://www.carlogos.org/car-logos/nissan-logo.png",
      title: "NISSAN",
      description: "Versatility and Performance."
    },
    {
      image: "https://www.carlogos.org/car-logos/volkswagen-logo.png",
      title: "VOLKSWAGEN",
      description: "Versatility and Performance."
    },
    {
      image: "https://www.carlogos.org/car-logos/volvo-logo.png",
      title: "VOLVO",
      description: "Versatility and Performance."
    },
    {
      image: "https://www.carlogos.org/car-logos/suzuki-logo.png",
      title: "SUZUKI",
      description: "Versatility and Performance."
    },

  ];

  return (
    <div className="home-container">
      {/* ✅ Our Brands Header */}
      <h1 className="brands-header">Our Brands</h1>

      {/* Car Cards */}
      <div className="cards-row">
        {carData.map((car, index) => (
          <CarCard
            key={index}
            image={car.image}
            title={car.title}
            description={car.description}
          />
        ))}
      </div>

      {/* Call to Action */}
      <div className="home-text">
        <h2>Let Your Arrival Announce Your Personality</h2>
        <h3>HIRE A CAR FROM US TODAY!</h3>
        <button
          className="book-btn"
          onClick={() => navigate("/cars")}
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

export default Home;
