import React from "react";
import { Link } from "react-router-dom";
import "primeicons/primeicons.css"; // Import PrimeIcons CSS

const Footer = () => {
  return (
    <div
      style={{
        backgroundColor: "#f8f9fa", // Light gray background
        color: "#343a40", // Dark text color
        padding: "10px 0", // Padding top and bottom
        position: "fixed", // Position relative
        bottom: "0", // Position at the bottom
        width: "100%", // Full width
        textAlign: "center", // Center text
        fontSize: "14px", // Font size
        borderTop: "1px solid #dee2e6", // Top border
        // display: "flex",
      }}
    >
      <div
        style={{
          margin: "0 auto",
          maxWidth: "1200px",
          padding: "0 20px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div style={{ marginBottom: "10px" }}>
          <Link to="/" style={{ color: "#343a40", textDecoration: "none" }}>
            Privacy Policy
          </Link>
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: "15px" }}>
          <Link
            to="/"
            style={{
              color: "#343a40",
              textDecoration: "none",
              fontSize: "20px",
            }}
          >
            <i className="pi pi-facebook"></i>
          </Link>
          <Link
            to="/"
            style={{
              color: "#343a40",
              textDecoration: "none",
              fontSize: "20px",
            }}
          >
            <i className="pi pi-twitter"></i>
          </Link>
          <Link
            to="/"
            style={{
              color: "#343a40",
              textDecoration: "none",
              fontSize: "20px",
            }}
          >
            <i className="pi pi-instagram"></i>
          </Link>
        </div>
        <div style={{ marginTop: "10px" }}>
          <p style={{ margin: 0 }}>
            © {new Date().getFullYear()} eHundi. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
