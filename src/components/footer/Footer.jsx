import React from "react";
import { Link } from "react-router-dom";
import "primeicons/primeicons.css";

const Footer = () => {
  return (
    <div
      style={{
        backgroundColor: "#f8f9fa",
        color: "#343a40",
        padding: "10px 0",
        position: "fixed",
        bottom: "0",
        width: "100%",
        textAlign: "center",
        fontSize: "14px",
        borderTop: "1px solid #dee2e6",
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
