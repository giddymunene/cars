import React from "react";
import { useNavigate } from "react-router-dom";
import "./About.css";

const About = () => {
  const navigate = useNavigate();

  // Services data for flip cards
  const services = [
    {
      title: "Fleet Management",
      description: "Comprehensive vehicle management solutions for businesses.",
      icon: "🚛",
    },
    {
      title: "Chauffeur Services",
      description: "Professional drivers for a safe, reliable, and luxurious ride.",
      icon: "🧑‍✈️",
    },
    {
      title: "Corporate Leasing",
      description: "Affordable leasing packages tailored for companies and NGOs.",
      icon: "🏢",
    },
    {
      title: "Luxury Car Rentals",
      description: "Premium cars for weddings, VIP events, and special occasions.",
      icon: "✨",
    },
    {
      title: "Car Sales",
      description: "Buy high-quality cars at competitive prices in Mombasa.",
      icon: "🚗",
    },
  ];

  return (
    <div className="about-container">
      {/* Header */}
      <div className="about-header text-center">
        <h1 className="about-title">ℹ️ About Us</h1>
        <p className="about-subtitle">Driven by passion, powered by trust.</p>
      </div>

      {/* About Content */}
      <div className="about-content">
        <div className="about-card shadow-sm">
          <p>
            <strong>BMD RENTALS</strong> is a trusted automotive platform
            based in <strong>Mombasa, Kenya</strong>. We specialize in helping
            customers explore, hire, buy, and sell cars with ease. Our mission
            is to make your car ownership and rental journey simple,
            transparent, and enjoyable.
          </p>

          <p>
            Being located in <strong>Mombasa</strong>, the gateway to East
            Africa, gives us a unique advantage in sourcing and delivering
            quality vehicles. Whether you’re looking for a family car, a luxury
            ride, or a reliable business vehicle, <strong>BMD RENTALS</strong>{" "}
            is here to connect you with the right choice.
          </p>

          <p>
            We pride ourselves on offering <strong>excellent customer service</strong>,{" "}
            <strong>fair pricing</strong>, and a <strong>wide variety of vehicles</strong>. 
            Every car listed goes through strict quality checks by our
            automotive experts to ensure it meets the highest standards.
          </p>

          <p>
            Beyond rentals and sales, we also provide{" "}
            <strong>fleet management</strong>, <strong>chauffeur services</strong>,
            and <strong>corporate leasing</strong> for businesses in and around
            Kenya. We aim to become the go-to partner for all your automotive
            needs.
          </p>

          <p className="about-highlight">
            BMD RENTALS– Your trusted car partner in Mombasa and beyond!
          </p>

          {/* Why Choose Us */}
          <div className="about-extra">
            <h3>🌍 Why Choose Us?</h3>
            <ul>
              <li>✅ Convenient booking and rental process</li>
              <li>✅ Affordable and transparent pricing</li>
              <li>✅ Wide selection of vehicles from economy to luxury</li>
              <li>✅ Trusted by individuals and businesses across Kenya</li>
            </ul>
          </div>

          {/* CTA */}
          <div className="about-cta">
            <button
              className="book-btn"
              onClick={() => navigate("/cars")}
            >
               Explore Our Cars
            </button>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="services-section">
        <h2 className="services-title">🌟 Our Services</h2>
        <div className="services-grid">
          {services.map((service, index) => (
            <div key={index} className="flip-card">
              <div className="flip-card-inner">
                <div className="flip-card-front">
                  <h3 className="service-icon">{service.icon}</h3>
                  <h4 className="service-title">{service.title}</h4>
                </div>
                <div className="flip-card-back">
                  <p>{service.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
