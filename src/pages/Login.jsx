import React, { useState } from "react";
import { Input } from "../components/Input";
import AutenticacaoService from "../service/AutenticacaoService";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();  // Hook para navegação
  const autenticacao = new AutenticacaoService();
  const [usuario, setUsuario] = useState({ email: '', senha: '' });

  const handleChange = (e) => {
    setUsuario({ ...usuario, [e.target.name]: e.target.value })
  }

  // const login = async () => {
  //   try {
  //     const resposta = await autenticacao.login(usuario);
  //     if (resposta && resposta.data && resposta.status === 200 && resposta.data.token) {
  //       localStorage.setItem('usuario', JSON.stringify(resposta.data));
  //       navigate("/dashboard");  // Usando o hook para navegação
  //     } else {
  //       alert("erro ao fazer login")
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     alert(error.response ? error.response.data.mensagem : "Erro desconhecido");
  //   }
  // }

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="login-title">Acesso ao Leilão</h1>
          <Input
            label="Email"
            type="text"
            value={usuario.email}
            onChange={handleChange}
            name="email"
          />
          <Input
            label="Senha"
            type="password"
            value={usuario.senha}
            onChange={handleChange}
            name="senha"
          />
          <button type="submit" className="login-button" onClick={login}>
            Acessar
          </button>
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