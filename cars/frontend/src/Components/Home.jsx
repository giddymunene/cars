import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CarCard from "./CarCard";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();

  const [currentSlide, setCurrentSlide] = useState(0);

  // Background images for slideshow
  const backgroundImages = [
    "https://images.unsplash.com/photo-1502877338535-766e1452684a",
    "https://images.unsplash.com/photo-1503376780353-7e6692767b70",
    "https://images.unsplash.com/photo-1511910849309-0f35a5c9f33b",
    "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7",
    "https://cdn.pixabay.com/photo/2017/03/27/14/56/auto-2179220_1280.jpg",
    "https://cdn.pixabay.com/photo/2018/02/21/03/15/bmw-m4-3169357_1280.jpg",
    
  ];

  // Change background every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % backgroundImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [backgroundImages.length]);

  const carData = [
    { image: "https://www.carlogos.org/car-logos/mercedes-benz-logo.png", title: "MERCEDES-BENZ", description: "Luxury Redefined." },
    { image: "https://www.carlogos.org/car-logos/bmw-logo.png", title: "BMW", description: "Ultimate Driving Machines." },
    { image: "https://www.carlogos.org/car-logos/mazda-logo.png", title: "MAZDA", description: "Driving Dynamics." },
    { image: "https://www.carlogos.org/car-logos/toyota-logo.png", title: "TOYOTA", description: "Dominating the Market." },
    { image: "https://www.carlogos.org/car-logos/porsche-logo.png", title: "PORSCHE", description: "Known for its speed, performance, and design." },
    { image: "https://www.carlogos.org/car-logos/honda-logo.png", title: "HONDA", description: "Engineering Excellence." },
    { image: "https://www.carlogos.org/car-logos/subaru-logo.png", title: "SUBARU", description: "Thrilling performance and style." },
    { image: "https://www.carlogos.org/car-logos/ford-logo.png", title: "FORD", description: "Versatility and Performance." },
    { image: "https://www.carlogos.org/car-logos/audi-logo.png", title: "AUDI", description: "Innovative and Premium." },
    { image: "https://www.carlogos.org/car-logos/lexus-logo.png", title: "LEXUS", description: "Luxury Meets Performance." },
    { image: "https://www.carlogos.org/car-logos/nissan-logo.png", title: "NISSAN", description: "Innovation That Excites." },
    { image: "https://www.carlogos.org/car-logos/volkswagen-logo.png", title: "VOLKSWAGEN", description: "The People’s Car." },
    { image: "https://www.carlogos.org/car-logos/volvo-logo.png", title: "VOLVO", description: "Safety and Strength." },
    { image: "https://www.carlogos.org/car-logos/suzuki-logo.png", title: "SUZUKI", description: "Compact Power." },
  ];

  const quotes = [
    "“Your journey deserves comfort, style, and reliability.”",
    "“Drive your dreams — rent, ride, repeat.”",
    "“Life’s too short for bad rides.”",
    "“Luxury, performance, and convenience — all in one ride.”",
  ];

  return (
    <div
      className="home-container"
      style={{
        backgroundImage: `url(${backgroundImages[currentSlide]})`,
      }}
    >
      <div className="overlay"></div>

      {/* Quotes Section */}
      <div className="quotes-section">
        {quotes.map((quote, index) => (
          <p key={index} className="quote-text">{quote}</p>
        ))}
      </div>

      {/* Our Brands Header */}
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
        <button className="book-btn" onClick={() => navigate("/cars")}>
          EXPLORE VEHICLES
        </button>
      </div>
    </div>
  );
};

export default Home;
