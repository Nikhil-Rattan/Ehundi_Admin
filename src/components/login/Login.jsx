import { useNavigate } from "react-router-dom";
import "./login.css";
import { useEffect } from "react";

const Login = () => {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent the default form submission

    // Retrieve the input values
    const username = event.target.username.value;
    const password = event.target.password.value;

    // Define hardcoded credentials (replace with actual authentication logic)
    const predefinedEmail = "test@e.com"; // Example email
    const predefinedPassword = "12345"; // Example password

    // Check if credentials match
    if (username === predefinedEmail && password === predefinedPassword) {
      // Redirect to the dashboard and pass user data as state
      navigate("/dashboard", { state: { username } }); // Sending username as state
      localStorage.setItem("user ", "loggedin");
      location.reload();
    } else {
      // Optionally, handle invalid credentials (e.g., show an error message)
      alert("Invalid email or password. Please try again.");
    }
  };

  return (
    <div className="main-container-page">
      <div className="login-container-page">
        <div style={{ paddingLeft: "1rem" }}>
          <div
            className="login-content"
            data-aos="fade-right"
            data-aos-duration="800"
          >
            <form autoComplete="off" onSubmit={handleSubmit}>
              <div className="login-header">
                <h2
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    paddingLeft: "13px",
                  }}
                >
                  Sign in to your account{""}
                  <span className="rocket-emoji">🚀</span>
                </h2>
              </div>
              <div
                style={{ display: "flex", justifyContent: "center" }}
                className="login-subheader"
              >
                <div>Sign in with your email or mobile</div>
              </div>
              <div className="input-group">
                <div className="input-field">
                  <label htmlFor="username">Enter Email/Mobile</label>
                  <input type="text" id="username" name="username" />
                </div>

                <div className="input-field password-custom">
                  <label htmlFor="password">Enter Your Password</label>
                  <input type="password" id="password" name="password" />
                </div>
              </div>
              <div className="submit-button-container">
                <button type="submit" className="submit-button">
                  Sign In
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
