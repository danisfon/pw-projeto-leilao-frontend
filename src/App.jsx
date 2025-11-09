import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./paginas/login/Login";
import Cadastro from "./paginas/cadastro/Cadastro";
import Recuperar from "./paginas/recuperar/Recuperar";
import Leiloes from "./paginas/leiloes/Leiloes";
import RotaPrivadaLayout from "./components/layout/RotaPrivadaLayout";
import { fakeUsers } from "./data/usuarios";
import MinhaConta from "./paginas/minha-conta/MinhaConta";
import AdminVeiculos from "./paginas/admin-veiculos/AdminVeiculos";
import GenericRegisterLeilao from "./GenericRegister/GenericRegister";
import CategoriaList from "./paginas/categoria-list/CategoriaList";
import CategoriaForm from "./paginas/categoria-form/CategoriaForm";

if (!localStorage.getItem("fakeUsers")) {
  localStorage.setItem("fakeUsers", JSON.stringify(fakeUsers));
}

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Rotas públicas */}
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/recuperar" element={<Recuperar />} />

        {/* Rotas privadas */}
        <Route element={<RotaPrivadaLayout />}>
          <Route path="/dashboard" element={<Leiloes />} />
          <Route path="/conta" element={<MinhaConta />} />
          <Route path="/admin/veiculos" element={<AdminVeiculos />} />
          <Route path="/admin/genericRegister" element={<GenericRegisterLeilao />} />

          {/* 🆕 Rotas de Categoria */}
          <Route path="/admin/categoria" element={<CategoriaList />} />
          <Route path="/admin/categoria/form" element={<CategoriaForm />} />
        </Route>

        {/* Redirecionamento padrão */}
        <Route path="*" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;
 