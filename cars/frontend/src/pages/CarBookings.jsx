import React, { useEffect, useState } from "react";
import axios from "axios";
import "./CarBookings.css";

const CarBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/bookings").then((res) => setBookings(res.data));
  }, []);

  return (
    <div className="car-bookings">
      <h2>Car Booking Summary</h2>
      <table>
        <thead>
          <tr>
            <th>Car</th>
            <th>Model</th>
            <th>Total Days Booked</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((b) => (
            <tr key={b.carId}>
              <td>{b.make}</td>
              <td>{b.model}</td>
              <td>{b.totalDays}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CarBookings;
