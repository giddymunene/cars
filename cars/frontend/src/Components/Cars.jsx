import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import "./Cars.css";

const Cars = () => {
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 100000]); // adjustable
  const location = useLocation();
  const navigate = useNavigate();

  const query = new URLSearchParams(location.search);
  const searchQuery = query.get("search")?.toLowerCase() || "";

  // Fetch cars
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/cars")
      .then((res) => setCars(res.data))
      .catch((err) => console.error("Error fetching cars:", err));
  }, []);

  // Filter cars when cars, search, or price changes
  useEffect(() => {
    let filtered = cars;

    // ✅ Search filter (by make, model, or year)
    if (searchQuery) {
      filtered = filtered.filter(
        (car) =>
          car.make?.toLowerCase().includes(searchQuery) ||
          car.model?.toLowerCase().includes(searchQuery) ||
          car.year?.toString().includes(searchQuery)
      );
    }

    // ✅ Price range filter
    filtered = filtered.filter(
      (car) => car.price >= priceRange[0] && car.price <= priceRange[1]
    );

    setFilteredCars(filtered);
  }, [cars, searchQuery, priceRange]);

  // Handle price range changes
  const handlePriceChange = (e, index) => {
    const newRange = [...priceRange];
    newRange[index] = Number(e.target.value);
    setPriceRange(newRange);
  };

  return (
    <div className="cars-container">
      <h2 className="cars-title">Available Cars</h2>

      {/* ✅ Price Filter */}
      <div className="price-filter">
        <label>
          Min Price (KES):
          <input
            type="number"
            value={priceRange[0]}
            onChange={(e) => handlePriceChange(e, 0)}
          />
        </label>
        <label>
          Max Price (KES):
          <input
            type="number"
            value={priceRange[1]}
            onChange={(e) => handlePriceChange(e, 1)}
          />
        </label>
      </div>

      {/* ✅ Filtered Results */}
      {filteredCars.length === 0 ? (
        <p className="no-cars">No cars match your filters.</p>
      ) : (
        <div className="cars-grid">
          {filteredCars.map((car) => (
            <div key={car._id} className="car-card">
              <img
                src={car.imageUrl}
                alt={car.make}
                className="car-image"
              />
              <div className="car-details">
                <h3 className="car-name">{car.make}</h3>
                <p className="car-model">{car.model}</p>
                <p className="car-year">Year: {car.year || "N/A"}</p>
                {car.description && (
                  <p className="car-desc">{car.description}</p>
                )}
                <p className="car-price">KES {car.price} / day</p>
                <div className="car-buttons">
                  <button
                    className="btn book-btn"
                    onClick={() => navigate("/booking", { state: { car } })}
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Cars;
