import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import Recuperar from "./pages/Recuperar";
import AlterarSenha from "./pages/AlterarSenha";

import { fakeUsers } from "./data/fakeUsers";
if (!localStorage.getItem("fakeUsers")) {
  localStorage.setItem("fakeUsers", JSON.stringify(fakeUsers));
}

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/recuperar" element={<Recuperar />} />
        <Route path="/alterar-senha" element={<AlterarSenha />} />
        <Route path="/dashboard" element={<div className='dashboard'>Bem-vindo ao sistema de leilão!</div>} />
      </Routes>
    </Router>
  );
};

export default App;