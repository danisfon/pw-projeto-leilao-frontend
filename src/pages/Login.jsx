import React, { useState } from "react";
import { Input } from "../components/Input";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = login(email, password);
    if (user) {
      navigate("/dashboard");
    } else {
      setError("Usuário ou senha inválidos");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="login-title">Acesso ao Leilão</h1>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <Input
            label="Email"
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
          <button type="submit" className="login-button">
            Acessar
          </button>
        </form>
        <div className="login-links">
          <p>
            Não tem conta?{' '}
            <a href="/cadastro">Cadastrar-se</a>
          </p>
          <p>
            <a href="/recuperar">Recuperar senha</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;