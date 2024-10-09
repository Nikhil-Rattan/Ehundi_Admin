import { useNavigate } from "react-router-dom";
import "./login.css";
import $ from "jquery";
import secureLocalStorage from "react-secure-storage";
import { useState } from "react";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const looginLoading = () => (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <span>Please wait</span>
      <span className="dot-animation"></span>
      <style>
        {`
        @keyframes dots {
          0% {
            content: '...';
          }
          33% {
            content: '.';
          }
          66% {
            content: '..';
          }
          100% {
            content: '...';
          }
        }

        .dot-animation::after {
          content: '';
          animation: dots 1s steps(3, end) infinite;
          display: inline-block;
          width: 1rem;
          text-align: left;
        }
      `}
      </style>
    </div>
  );

  function togglePasswordVisibility() {
    const passwordInput = document.getElementById("password");
    const eyeIcon = document.getElementById("eyeIcon");

    if (passwordInput.type === "password") {
      passwordInput.type = "text";
      eyeIcon.classList.remove("fa-eye");
      eyeIcon.classList.add("fa-eye-slash");
    } else {
      passwordInput.type = "password";
      eyeIcon.classList.remove("fa-eye-slash");
      eyeIcon.classList.add("fa-eye");
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    const email = event.target.username.value;
    const password = event.target.password.value;

    const data = JSON.stringify({ email, password });

    $.ajax({
      url: "https://ehundi-api.onrender.com/auth/user-Signin",
      type: "POST",
      data: data,
      contentType: "application/json",
      success: (data) => {
        setLoading(false);
        console.log("data", data);

        if (data) {
          setLoading(false);
          if (data.user.role === "admin") {
            const userData = {
              email: data.user.email,
              fullName: data.user.fullName,
              role: data.user.role,
              phoneNumber: data.user.phoneNumber,
              token: data.token,
            };

            navigate("/dashboard", { state: { data } });
            localStorage.setItem("user", "loggedin");
            secureLocalStorage.setItem("adminData", userData);
            location.reload();
          } else {
            setLoading(false);
            alert("You are not Authorised");
          }
        } else {
          setLoading(false);
          alert("Login failed. Please check your credentials.");
        }
      },
      error: (xhr, status, error) => {
        console.error("Login request failed:", error);
        alert("Login failed. Please try again later.");
        setLoading(false);
      },
    });
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
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <input type="password" id="password" name="password" />
                    <span
                      className="toggle-password"
                      style={{ marginTop: "1.5rem" }}
                      onClick={togglePasswordVisibility}
                    >
                      <i id="eyeIcon" className="fa fa-eye"></i>
                    </span>
                  </div>
                </div>
              </div>
              <div className="submit-button-container">
                <button type="submit" className="submit-button">
                  {loading ? looginLoading() : "Sign In"}{" "}
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
