import { useEffect, useState } from "react";
import "./dashboard.css";
import $ from "jquery";
import LoadingCount from "../loading/LoadingCount";

const Dashboard = () => {
  const [userCount, setUserCount] = useState(<LoadingCount />);
  const [donationsCount, setDonationsCount] = useState(<LoadingCount />);
  const [donationsLastMonth, setDonationsLastMonth] = useState(
    <LoadingCount />
  );
  const [donatedAmount, setDonatedAmount] = useState(<LoadingCount />);
  const [donatedAmountLastMonth, setDonatedAmountLastMonth] = useState(
    <LoadingCount />
  );

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    localStorage.setItem("Caturl", "/dashboard");
    fetchDashoardStatus();
  }, []);
  const fetchDashoardStatus = () => {
    setLoading(true);
    $.ajax({
      url: "https://ehundi-api.onrender.com/api/dasboardStats",
      method: "GET",
      dataType: "json",
      success: (data) => {
        data = data.data;

        setDonatedAmount(data.totalDonatedAmount);
        setDonatedAmountLastMonth(data.totalDonatedAmountLastMonth);
        setUserCount(data.totalUsers);
        setDonationsCount(data.totalDonations);
        setDonationsLastMonth(data.totalDonationsLastMonth);
        setLoading(false);
      },
      error: (error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      },
    });
  };

  return (
    <div className="container bg">
      <h1 className="header">Welcome to eHundi</h1>
      <div className="seconContainer">
        <div className="profile-container">
          <div className="profile-box">
            <div className="text">
              Total Users <br />
              Count
            </div>
            <div className="number">{userCount}</div>
          </div>
        </div>
        <div className="profile-container">
          <div className="profile-box">
            <div className="text">
              Total Donations <br /> Count
            </div>
            <div className="number">{donationsCount}</div>
          </div>
        </div>
        <div className="profile-container">
          <div className="profile-box">
            <div className="text">
              Total Donated <br />
              Amount
            </div>
            <div className="number">
              {loading ? donatedAmount : `₹ ${donatedAmount}`}
            </div>{" "}
          </div>
        </div>
        <div className="profile-container">
          <div className="profile-box">
            <div className="text">
              Last Month <br /> Donations Count
            </div>
            <div className="number">{donationsLastMonth}</div>
          </div>
        </div>

        <div className="profile-container">
          <div className="profile-box">
            <div className="text">
              Last Month <br />
              Donated Amount
            </div>
            <div className="number">
              {loading ? donatedAmountLastMonth : `₹ ${donatedAmountLastMonth}`}
            </div>{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
