import { Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";
import Login from "./components/Login/Login";
import User from "./components/user/User";
import Donation from "./components/donation/Donation";
import Category from "./components/category/Category";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/users" element={<User />} />
      <Route path="/donation" element={<Donation />} />
      <Route path="/category" element={<Category />} />
      {/* Add other routes here */}
    </Routes>
  );
}

export default App;
