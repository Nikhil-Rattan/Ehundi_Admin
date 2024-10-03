import { useEffect } from "react";
import "./dashboard.css";

const Dashboard = () => {
  useEffect(() => {
    localStorage.setItem("Caturl", "/dashboard");
  }, []);

  return (
    <div className="container bg">
      <h1 className="header">Welcome to eHundi</h1>
      <div className="seconContainer">
        <div className="profile-container">
          <div className="profile-box">
            <div className="text">
              Total
              <br /> Users
            </div>
            <div className="number">45</div>
          </div>
        </div>
        <div className="profile-container">
          <div className="profile-box">
            <div className="text">Total Donations</div>
            <div className="number">67</div>
          </div>
        </div>
        <div className="profile-container">
          <div className="profile-box">
            <div className="text">Total Categories</div>
            <div className="number">67</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
