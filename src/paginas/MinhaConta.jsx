import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/minhaconta.css"; 

const MinhaConta = () => {
  const [usuario, setUsuario] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("usuario"));
    if (!storedUser) {
      navigate("/login");
    } else {
      setUsuario(storedUser);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    navigate("/login");
  };
  const handleEditar = () => {
    // Aqui você pode abrir um modal ou redirecionar para uma página de edição
    alert("Funcionalidade de edição ainda não implementada 😄");
  };

  if (!usuario) return null;

  return (
    
    <div className="minha-conta-page">
    <div className="botaovoltar">
    <button onClick={() => navigate(-1)}>← Voltar</button>
    </div>
    
    <div className="minha-conta-container">
      <h1>Minha Conta</h1>

      <div className="usuario-info">
        <p><strong>Nome:</strong> {usuario.nome}</p>
        <p><strong>Email:</strong> {usuario.email}</p>
      </div>

      <div className="conta-actions">
        <button onClick={handleEditar}>Editar Dados</button>
        <button onClick={handleLogout}>Sair</button>
      </div>
    
      </div>
    </div>
  );
};

export default MinhaConta;