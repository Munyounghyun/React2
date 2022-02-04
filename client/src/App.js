import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";

import LandingPage from "./components/views/LandingPage/LandingPage";
import LoginPage from "./components/views/LoginPage/LoginPage";
import RegisterPage from "./components/views/RegisterPage/RegisterPage";
import Auth from "./hoc/auth";

function App() {
  const NewLandginPage = Auth(LandingPage, null);
  const NewLoginPage = Auth(LoginPage, false);
  const NewRegisterPage = Auth(RegisterPage, false);
  return (
    <Router>
      <div>
        <hr />
        <Routes>
          <Route exact={true} path={"/"} element={<NewLandginPage />} />
          <Route exact={true} path="/login" element={<NewLoginPage />} />
          <Route exact={true} path="/register" element={<NewRegisterPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
