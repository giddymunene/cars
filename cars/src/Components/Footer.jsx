import React from "react";
import {
  FaFacebook,
  FaInstagram,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Quick Links */}
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/cars">Cars</a></li>
            <li><a href="/about">About Us</a></li>
            <li><a href="/contact">Contact Us</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="footer-section">
          <h3>Contact Us</h3>
          <p><FaPhoneAlt /> <a href="tel:+254714444937">+2547 1444 4937</a></p>
          <p><FaPhoneAlt /> <a href="tel:+254762288553">+2547 6228 8553</a></p>
          <p><FaEnvelope /> <a href="mailto:bmdr2025@gmail.com">bmdr2025@gmail.com</a></p>
        </div>

        {/* Location with Map */}
        <div className="footer-section">
          <h3>Our Location</h3>
          <p><FaMapMarkerAlt /> Mombasa, Kenya</p>
          <iframe
            title="Mombasa Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.817485567009!2d39.668206315252245!3d-4.043477646186781!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182aa1675c0db30f%3A0xe6cf3b8ff103b57c!2sMombasa!5e0!3m2!1sen!2ske!4v1695910688991!5m2!1sen!2ske"
            width="100%"
            height="150"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>

        {/* Social Media */}
        <div className="footer-section">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <a
              href="https://www.facebook.com/share/1BCSgryuFZ/"
              target="_blank"
              rel="noreferrer"
            >
              <FaFacebook />
            </a>
            <a href="https://www.instagram.com/bmd_ke?igsh=ZnAzc24wZmdnamd2" target="_blank" rel="noreferrer">
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} BMD RENTALS. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
