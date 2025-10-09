// src/pages/Booking.jsx
import { useLocation } from "react-router-dom";
import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // ✅ import calendar styles
import "./Booking.css"; 

function Booking() {
  const location = useLocation();
  const { car } = location.state || {};
  const formRef = useRef();

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const sendEmail = (e) => {
    e.preventDefault();

    // Convert dates to readable string
    const bookingPeriod = startDate && endDate 
      ? `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`
      : "Not selected";

    // append period to hidden input so EmailJS gets it
    const periodInput = document.createElement("input");
    periodInput.type = "hidden";
    periodInput.name = "period";
    periodInput.value = bookingPeriod;
    formRef.current.appendChild(periodInput);

    emailjs
      .sendForm(
        "service_5lw96mm",    // ✅ your EmailJS service ID
        "template_getgj87",   // ✅ your EmailJS template ID
        formRef.current,
        "FWAd3Z-6YUT3c-NhW"   // ✅ your EmailJS public key
      )
      .then(
        () => {
          alert("✅ Booking request sent successfully!");
          formRef.current.reset();
          setStartDate(null);
          setEndDate(null);
        },
        (error) => {
          alert("❌ Failed to send. Try again.");
          console.error(error.text);
        }
      );
  };

  return (
    <div className="booking-container">
      <h2 className="booking-title">📌 Book Your Car</h2>

      {car && (
        <div className="booking-car-details">
          <h3>{car.year} {car.make} {car.model}</h3>
          <p>💰 RATE/DAY: KES{car.price}</p>
          <p>📍 Location: Mombasa, Kenya</p>
        </div>
      )}

      <form ref={formRef} onSubmit={sendEmail} className="booking-form">
        <input 
          type="hidden" 
          name="car" 
          value={`${car?.year || ""} ${car?.make || ""} ${car?.model || ""}`} 
        />

        <div className="form-group">
          <label>Name</label>
          <input type="text" name="user_name" required />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input type="email" name="user_email" required />
        </div>

        <div className="form-group">
          <label>Phone Number</label>
          <input type="tel" name="phone" required />
        </div>

        <div className="form-group">
          <label>Booking Period</label>
          <div style={{ display: "flex", gap: "10px" }}>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              placeholderText="From"
              required
            />
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              placeholderText="To"
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label>ID / Driving Licence Number</label>
          <input type="text" name="id_number" required />
        </div>

        <button type="submit" className="auth-btn">Send Booking</button>
      </form>
    </div>
  );
}

export default Booking;
