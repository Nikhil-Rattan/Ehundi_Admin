import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const location = useLocation(); // Get the current location to determine the active link

  useEffect(() => {
    const userLoggedIn = localStorage.getItem("user ");
    if (userLoggedIn) {
      setUser(userLoggedIn);
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    location.reload();
  };

  return (
    <>
      <div
        style={{
          position: "fixed",
          top: 0,
          zIndex: 20,
          width: "100%",
          backgroundColor: "#ffffff",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)", // Subtle shadow for depth
        }}
      >
        <div
          style={{
            padding: "1rem",
            maxWidth: "1200px",
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* Left Section - Logo */}
          <div style={{ height: "50px" }}>
            <img
              src={"https://i.imgur.com/EvBysQ0.png"}
              style={{
                height: "100%",
                width: "auto",
                objectFit: "contain",
              }}
              alt="Logo"
            />
          </div>

          {/* Center Section - Navigation Links */}
          {user ? (
            <ul
              style={{
                display: "flex",
                listStyleType: "none",
                padding: 0,
                margin: 0,
                gap: "20px", // Consistent gap between links
              }}
            >
              {["/dashboard", "/users", "/donation", "/category"].map(
                (path) => (
                  <li key={path}>
                    <Link
                      to={path}
                      style={{
                        textDecoration: "none",
                        color: "#333",
                        fontWeight: "bold",
                        padding: "10px 15px",
                        borderRadius: "5px",
                        transition:
                          "background-color 0.3s ease, color 0.3s ease",
                        backgroundColor:
                          location.pathname === path
                            ? "#f0f0f0"
                            : "transparent", // Change background if active
                      }}
                      onMouseOver={(e) => {
                        if (location.pathname !== path) {
                          // Only change background if not active
                          e.currentTarget.style.backgroundColor = "#f0f0f0";
                        }
                      }}
                      onMouseOut={(e) => {
                        if (location.pathname !== path) {
                          // Only reset background if not active
                          e.currentTarget.style.backgroundColor = "transparent";
                        }
                      }}
                    >
                      {path === "/dashboard"
                        ? "Dashboard"
                        : path === "/users"
                        ? "Users"
                        : path === "/donation"
                        ? "Donations"
                        : "Category"}
                    </Link>
                  </li>
                )
              )}
            </ul>
          ) : null}

          {/* Right Section - Profile / Log Out */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "15px",
            }}
          >
            {/* Example: Profile Info */}
            {user ? (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  backgroundColor: "#f7f7f7",
                  padding: "10px 15px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  transition: "background-color 0.3s ease",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = "#e0e0e0";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = "#f7f7f7";
                }}
              >
                <img
                  src="https://via.placeholder.com/30"
                  alt="Profile"
                  style={{
                    borderRadius: "50%",
                    width: "30px",
                    height: "30px",
                    objectFit: "cover",
                  }}
                />
                <span style={{ color: "#333", fontWeight: "bold" }}>
                  John Doe
                </span>
              </div>
            ) : null}

            {/* Log Out Button */}
            {user ? (
              <Link
                to={"/"}
                style={{
                  textDecoration: "none",
                  color: "#ffffff",
                  backgroundColor: "#f44336",
                  padding: "10px 20px",
                  borderRadius: "5px",
                  fontWeight: "bold",
                  transition: "background-color 0.3s ease",
                }}
                onClick={handleLogout}
                onMouseOver={(e) =>
                  (e.currentTarget.style.backgroundColor = "#d32f2f")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.backgroundColor = "#f44336")
                }
              >
                Log Out
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
