// src/pages/login/Login.jsx
import React, { useState } from "react";
import { Input } from "../../components/Input"; // Ajuste o path conforme sua estrutura
import { useNavigate } from "react-router-dom";
import joiaPrata from "../../assets/joia_prata.jpg"; // Ajuste o path conforme sua estrutura
import AutenticacaoService from "../../services/AutenticacaoService"; // Ajuste o path conforme sua estrutura
import "./login.css"; // Importando o CSS específico para esta página

const Login = () => {
  const autenticacaoService = new AutenticacaoService();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userData = await autenticacaoService.login(email, password);

      if (userData) {
        // Se o backend retornar token, salvar no localStorage
        if (userData.token) {
          localStorage.setItem("token", userData.token);
        }

        // Você pode salvar os dados do usuário também, se precisar
        localStorage.setItem("usuario", JSON.stringify(userData));

        navigate("/dashboard");
      } else {
        setError("Usuário ou senha inválidos");
      }
    } catch (err) {
      setError("Erro ao conectar ao servidor");
    }
  };

  return (
    <div className="login-container">
      <div className="login-image-wrapper">
        <img src={joiaPrata} alt="Joia prata com fundo azul" className="login-image" />
      </div>
      <div className="login-box">
        <h1 className="login-title">Leilão de Jóias</h1>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <Input
            label="E-mail"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            label="Senha"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="button-group">
            <button type="submit" className="login-button">
              Acessar
            </button>
          </div>
        </form>

        <div className="login-links-ntc">
          
            Não tem conta? <a href="/cadastro">Cadastre-se aqui</a>
          
        </div>
        <div className="login-links">
          
            <a href="/recuperar">Recuperar senha</a>
          
        </div>
      </div>
    </div>
  );
};

export default Login;