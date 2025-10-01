import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom"; 
import API from "../api";
import "./Cars.css"; // Import CSS for styling

function Cars() {
  const [cars, setCars] = useState([]);
  const [newCar, setNewCar] = useState({ make: "", model: "", year: "", price: "", image: "" });
  const [role, setRole] = useState(localStorage.getItem("role")); 
  const navigate = useNavigate();
  const location = useLocation();

  // 🔹 get search term from query string
  const queryParams = new URLSearchParams(location.search);
  const searchTerm = queryParams.get("search")?.toLowerCase() || "";

  const fetchCars = async () => {
    try {
      const res = await API.get("/cars");
      setCars(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  const addCar = async () => {
    try {
      await API.post("/cars", newCar);
      setNewCar({ make: "", model: "", year: "", price: "", image: "" });
      fetchCars();
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  const deleteCar = async (id) => {
    try {
      await API.delete(`/cars/${id}`);
      fetchCars();
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("role");
    localStorage.removeItem("token");
    setRole(null);
    navigate("/");
  };

  // 🔹 filter cars based on search
  const filteredCars = cars.filter((car) =>
    `${car.make} ${car.model} ${car.year}`.toLowerCase().includes(searchTerm)
  );

  return (
    <div className="cars-container">
      {/* Header */}
      <div className="cars-header">
        <h1 className="cars-title">Cars</h1>
        {role && (
          <button onClick={handleLogout} className="auth-btn logout">
            Logout
          </button>
        )}
      </div>

      {/* Search result info */}
      {searchTerm && (
        <p className="search-info">
          Showing results for: <strong>{searchTerm}</strong>
        </p>
      )}

      {/* Cars Grid */}
      <div className="cars-grid">
        {filteredCars.length > 0 ? (
          filteredCars.map((car) => (
            <div key={car._id} className="car-card">
              {role === "admin" ? (
                // 🔹 Admin view
                <div className="car-front">
                  {car.image && (
                    <img src={car.image} alt={`${car.make} ${car.model}`} className="car-img" />
                  )}
                  <div className="car-details">
                    <h3>{car.year} {car.make} {car.model}</h3>
                    <p className="car-price">${car.price}</p>
                  </div>
                  <button 
                    onClick={() => deleteCar(car._id)}
                    className="auth-btn danger"
                  >
                    Delete
                  </button>
                </div>
              ) : (
                // 🔹 User view (flip card)
                <div className="car-inner">
                  {/* Front */}
                  <div className="car-front">
                    {car.image && (
                      <img src={car.image} alt={`${car.make} ${car.model}`} className="car-img" />
                    )}
                    <div className="car-details">
                      <h3>{car.year} {car.make} {car.model}</h3>
                      <p className="car-price">${car.price}</p>
                    </div>
                  </div>

                  {/* Back */}
                  <div className="car-back">
                    <h4>🚗 {car.make} {car.model}</h4>
                    <p><strong>Year:</strong> {car.year}</p>
                    <p><strong>Price:</strong> ${car.price}</p>
                    <p><strong>Location:</strong> Mombasa, Kenya</p>
                    <p><em>Trusted CarHire Partner</em></p>

                    {/* ✅ Navigate to booking page with car info */}
                    <button
                      onClick={() => navigate("/booking", { state: { car } })}
                      className="auth-btn"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <p>No cars found.</p>
        )}
      </div>

      {/* Add car form for Admin */}
      {role === "admin" && (
        <div className="add-car-form">
          <h2 className="form-title">Add New Car</h2>
          <div className="form-row">
            <input 
              type="text" placeholder="Make"
              value={newCar.make}
              onChange={(e) => setNewCar({ ...newCar, make: e.target.value })}
            />
            <input 
              type="text" placeholder="Model"
              value={newCar.model}
              onChange={(e) => setNewCar({ ...newCar, model: e.target.value })}
            />
          </div>
          <div className="form-row">
            <input 
              type="number" placeholder="Year"
              value={newCar.year}
              onChange={(e) => setNewCar({ ...newCar, year: e.target.value })}
            />
            <input 
              type="number" placeholder="Price"
              value={newCar.price}
              onChange={(e) => setNewCar({ ...newCar, price: e.target.value })}
            />
          </div>
          <div className="form-row">
            <input 
              type="text" placeholder="Image URL"
              value={newCar.image}
              onChange={(e) => setNewCar({ ...newCar, image: e.target.value })}
            />
          </div>
          <button onClick={addCar} className="auth-btn">
            Add Car
          </button>
        </div>
      )}
    </div>
  );
}

export default Cars;
