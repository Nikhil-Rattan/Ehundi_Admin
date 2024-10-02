// import React from "react";
import { createRoot } from "react-dom/client"; // Import createRoot from react-dom/client
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import Navbar from "./components/navbar/Navbar";
import "primeicons/primeicons.css";
import "primereact/resources/themes/saga-blue/theme.css"; // Choose your theme
import "primereact/resources/primereact.min.css"; // Core CSS
import "primeicons/primeicons.css"; // Icons
import Footer from "./components/footer/Footer";

// Create a root and render the app
const rootElement = document.getElementById("root");
const root = createRoot(rootElement); // createRoot replaces ReactDOM.render

root.render(
  <BrowserRouter>
    <Navbar />
    <div style={{ margin: "4% 0 3% 0" }}>
      <App />
    </div>
    <Footer />
  </BrowserRouter>
);
