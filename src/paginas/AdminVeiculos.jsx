
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/admin.css";
import Sidebar from "../components/SideBar/SideBar"; // ✅ Import correto do componente

const AdminVeiculos = () => {
  const [usuario, setUsuario] = useState(null);
  const navigate = useNavigate();

  return (
    <div className="admin-container">
      {/* Sidebar fixa no layout */}
      <Sidebar />

      {/* Conteúdo principal */}
      <div className="admin-content">
        <div className="botaovoltar">
          <button onClick={() => navigate(-1)}>← Voltar</button>
        </div>

        <p>Aqui você poderá cadastrar novos veículos em leilão 🚗</p>
      </div>
    </div>
  );
};

export default AdminVeiculos;s