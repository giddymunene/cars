// src/pages/AdminDashboard.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";


const AdminDashboard = () => {
  const [cars, setCars] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [activeTab, setActiveTab] = useState("cars");
  const [showAddCarModal, setShowAddCarModal] = useState(false);
  const [newCar, setNewCar] = useState({
    make: "",
    model: "",
    year: "",
    price: "",
    image: null,
    
  });

  useEffect(() => {
    fetchCars();
    fetchBookings();
  }, []);

  const fetchCars = () => {
    axios
      .get("http://localhost:5000/api/cars")
      .then((res) => setCars(res.data))
      .catch((err) => console.error("Error fetching cars:", err));
  };

  const fetchBookings = () => {
    axios
      .get("http://localhost:5000/api/bookings")
      .then((res) => setBookings(res.data))
      .catch((err) => console.error("Error fetching bookings:", err));
  };

  const handleDeleteCar = async (id) => {
    if (window.confirm("Delete this car?")) {
      try {
        await axios.delete(`http://localhost:5000/api/cars/${id}`);
        setCars(cars.filter((c) => c._id !== id));
        alert("Car deleted successfully!");
      } catch (err) {
        console.error("Error deleting car:", err);
      }
    }
  };

  const handleDeleteBooking = async (id) => {
    if (window.confirm("Delete this booking?")) {
      try {
        await axios.delete(`http://localhost:5000/api/bookings/${id}`);
        setBookings(bookings.filter((b) => b._id !== id));
        alert("Booking deleted successfully!");
      } catch (err) {
        console.error("Error deleting booking:", err);
      }
    }
  };

  const handleNewCarChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setNewCar({ ...newCar, image: files[0] });
    } else {
      setNewCar({ ...newCar, [name]: value });
    }
  };

  const handleAddCar = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("make", newCar.make);
    formData.append("model", newCar.model);
    formData.append("year", newCar.year);
    formData.append("price", newCar.price);
    formData.append("image", newCar.image);

    try {
      await axios.post("http://localhost:5000/api/cars", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Car added successfully!");
      setShowAddCarModal(false);
      setNewCar({ make: "", model: "", year: "", price: "", image: null });
      fetchCars();
    } catch (err) {
      console.error("Error adding car:", err);
      alert("Failed to add car.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* Header */}
      <h2 className="text-4xl font-bold text-center mb-8 text-gray-800 uppercase tracking-wide">
        Admin Dashboard
      </h2>

      {/* Tabs */}
      <div className="flex justify-center mb-10 space-x-6">
        <button
          onClick={() => setActiveTab("cars")}
          className={`px-6 py-2 rounded-lg font-medium ${
            activeTab === "cars"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-800 hover:bg-gray-300"
          }`}
        >
          Manage Cars
        </button>
        <button
          onClick={() => setActiveTab("bookings")}
          className={`px-6 py-2 rounded-lg font-medium ${
            activeTab === "bookings"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-800 hover:bg-gray-300"
          }`}
        >
          Manage Bookings
        </button>
      </div>

      {/* === Cars Section === */}
      {activeTab === "cars" && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-semibold text-gray-700">Uploaded Cars</h3>
            <button
              onClick={() => setShowAddCarModal(true)}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium shadow"
            >
              + Add New Car
            </button>
          </div>

          {cars.length === 0 ? (
            <p className="text-center text-gray-500 text-lg">
              No cars uploaded.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {cars.map((car) => (
                <div
                  key={car._id}
                  className="bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-300"
                >
                  <img
                    src={car.imageUrl}
                    alt={car.make}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {car.make}
                    </h3>
                    <p className="text-gray-600">{car.model}</p>
                    <p className="text-green-700 font-bold mt-2">
                      KES {car.price} / day
                    </p>
                    <button
                      onClick={() => handleDeleteCar(car._id)}
                      className="mt-4 w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-medium"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* === Bookings Section === */}
      {activeTab === "bookings" && (
        <div>
          {bookings.length === 0 ? (
            <p className="text-center text-gray-500 text-lg">
              No bookings available.
            </p>
          ) : (
            <div className="overflow-x-auto shadow-lg rounded-lg bg-white">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-blue-600 text-white">
                    <th className="py-3 px-4 text-left">Name</th>
                    <th className="py-3 px-4 text-left">Email</th>
                    <th className="py-3 px-4 text-left">Phone</th>
                    <th className="py-3 px-4 text-left">Car ID</th>
                    <th className="py-3 px-4 text-left">Start</th>
                    <th className="py-3 px-4 text-left">End</th>
                    <th className="py-3 px-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((b) => (
                    <tr
                      key={b._id}
                      className="border-t hover:bg-gray-50 transition"
                    >
                      <td className="py-3 px-4">{b.name}</td>
                      <td className="py-3 px-4">{b.email}</td>
                      <td className="py-3 px-4">{b.phone}</td>
                      <td className="py-3 px-4">{b.carId}</td>
                      <td className="py-3 px-4">{b.startDate}</td>
                      <td className="py-3 px-4">{b.endDate}</td>
                      <td className="py-3 px-4 text-center">
                        <button
                          onClick={() => handleDeleteBooking(b._id)}
                          className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* === Add Car Modal === */}
      {showAddCarModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 px-4">
          <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md relative">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-xl"
              onClick={() => setShowAddCarModal(false)}
            >
              ✕
            </button>

            <h3 className="text-2xl font-bold mb-5 text-center text-gray-800">
              Add New Car
            </h3>

            <form onSubmit={handleAddCar} className="space-y-4">
              <input
                type="text"
                name="make"
                placeholder="Make"
                value={newCar.make}
                onChange={handleNewCarChange}
                required
                className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="text"
                name="model"
                placeholder="Model"
                value={newCar.model}
                onChange={handleNewCarChange}
                required
                className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="number"
                name="year"
                placeholder="Year"
                value={newCar.year}
                onChange={handleNewCarChange}
                required
                className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="number"
                name="price"
                placeholder="Price (KES)"
                value={newCar.price}
                onChange={handleNewCarChange}
                required
                className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400"
              />

              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleNewCarChange}
                required
                className="w-full border border-gray-300 rounded-md p-2"
              />

              {newCar.image && (
                <img
                  src={URL.createObjectURL(newCar.image)}
                  alt="Preview"
                  className="w-full h-40 object-cover rounded-lg mt-2"
                />
              )}

              <button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-semibold transition duration-200"
              >
                Add Car
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
