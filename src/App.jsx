import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<div className='dashboard'>Bem-vindo ao sistema de leilão!</div>} />
      </Routes>
    </Router>
  );
};

export default App;