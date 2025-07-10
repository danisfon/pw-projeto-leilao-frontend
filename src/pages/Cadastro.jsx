import React, { useState } from "react";
import { Input } from "../components/Input";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import ButtonGroup from "../components/ButtonGroup";


const Cadastro = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { register } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleRegister = (e) => {
    e.preventDefault();
    const result = register(name, email, password);
    if (result) {
      setSuccess("Cadastro realizado com sucesso!");
      setTimeout(() => navigate("/"), 1500);
    } else {
      setError("E-mail já cadastrado.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="login-title">Cadastrar-se</h1>
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
        <form onSubmit={handleRegister}>
          <Input
            label="Nome"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
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
          <ButtonGroup>
          <button type="button" className="login-button" onClick={() => navigate("/")}>Cancelar</button>
          <button type="submit" className="login-button">Cadastrar</button>
        </ButtonGroup>
        </form>
      </div>
    </div>
  );
};

export default Cadastro;