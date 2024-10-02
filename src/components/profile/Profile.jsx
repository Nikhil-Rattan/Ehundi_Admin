import React, { useState } from "react";

const Profile = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const handleToggleLogin = () => {
    if (isLoggedIn) {
      // Log out process
      setUser(null);
      setIsLoggedIn(false);
    } else {
      // Simulate a sign-in process (replace with actual auth logic)
      const fakeUser = {
        name: "John Doe",
        profilePicture: "https://via.placeholder.com/150",
      }; // Replace with actual user data
      setUser(fakeUser);
      setIsLoggedIn(true);
    }
  };

  return (
    <div
      style={{
        textAlign: "center",
        padding: "20px",
        display: "flex",
        flexDirection: "row",
      }}
    >
      {isLoggedIn ? (
        <div>
          {/* Display circular profile picture */}
          <img
            src={user?.profilePicture}
            alt="Profile"
            style={{
              width: "100px",
              height: "100px",
              borderRadius: "50%",
              objectFit: "cover",
              marginBottom: "10px",
            }}
          />
          <h3>Welcome, {user?.name}!</h3>
          <button
            onClick={handleToggleLogin}
            style={{
              padding: "10px 20px",
              backgroundColor: "#dc3545",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Log Out
          </button>
        </div>
      ) : (
        <div>
          <img
            src="https://via.placeholder.com/100"
            alt="Profile"
            style={{
              width: "100px",
              height: "100px",
              borderRadius: "50%",
              objectFit: "cover",
              marginBottom: "10px",
            }}
          />
          <h3>Please Sign In</h3>
          <button
            onClick={handleToggleLogin}
            style={{
              padding: "10px 20px",
              backgroundColor: "#28a745",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Sign In
          </button>
        </div>
      )}
    </div>
  );
};

export default Profile;
