import React, { useState, useEffect } from "react";
import API from "../api";
import "./Contact.css";  // import new styles

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [feedback, setFeedback] = useState("");
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await API.get("/messages/reviews");
        setReviews(res.data);
      } catch (err) {
        console.error("Failed to fetch reviews:", err);
      }
    };
    fetchReviews();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/messages", form);
      setFeedback("✅ Your message has been sent!");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      setFeedback("❌ Failed to send message. Try again.");
    }
  };

  return (
    <div className="container contact-container">
      {/* Page Title */}
      <div className="text-center mb-5 contact-header">
        <h1>📞 Contact Us</h1>
        <p>
          We’d love to hear from you! Reach out via email, phone, or leave us a
          message below.
        </p>
      </div>

      <div className="row">
        {/* Contact Info */}
        <div className="col-md-6 mb-4">
          <div className="card contact-card p-4">
            <h3 className="text-secondary">Get in Touch</h3>
            <p><strong>Email:</strong> bmdr2025@gmail.com</p>
            <p><strong>Phone:</strong> +2547 6228 8553</p>
            <p><strong>Address:</strong>Mombasa, Kenya</p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="col-md-6 mb-4">
          <div className="card contact-card p-4">
            <h3 className="text-secondary">Send us a Message</h3>
            {feedback && (
              <p className={feedback.startsWith("✅") ? "text-success" : "text-danger"}>
                {feedback}
              </p>
            )}
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Your Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Your Email</label>
                <input
                  type="email"
                  className="form-control"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Message</label>
                <textarea
                  className="form-control"
                  rows="4"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  required
                ></textarea>
              </div>

              <button type="submit" className="btn btn-primary w-100">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="reviews-section">
        <h2>⭐ Customer Reviews</h2>
        <div className="row mt-4">
          {reviews.length === 0 ? (
            <p className="text-center text-muted">No reviews yet.</p>
          ) : (
            reviews.map((review) => (
              <div key={review._id} className="col-md-4 mb-3">
                <div className="review-card">
                  <p>"{review.message}"</p>
                  <h6>- {review.name}</h6>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;
