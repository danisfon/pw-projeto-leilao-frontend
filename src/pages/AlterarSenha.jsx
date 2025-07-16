import React, { useState, useEffect } from "react";
import { Input } from "../components/Input";
import { useNavigate } from "react-router-dom";
import ButtonGroup from "../components/ButtonGroup";

const AlterarSenha = () => {
  const [codigo, setCodigo] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [mensagem, setMensagem] = useState(null);
  const [verificado, setVerificado] = useState(false);
  const [erros, setErros] = useState([]);
  const navigate = useNavigate();

  const validarSenha = (senha) => {
    const errosTemp = [];
    if (senha.length < 6) errosTemp.push("Mínimo 6 caracteres");
    if (!/[A-Z]/.test(senha)) errosTemp.push("1 letra maiúscula");
    if (!/[a-z]/.test(senha)) errosTemp.push("1 letra minúscula");
    if (!/[0-9]/.test(senha)) errosTemp.push("1 número");
    if (!/[!@#$%^&*(),.?\":{}|<>]/.test(senha)) errosTemp.push("1 caractere especial");
    return errosTemp;
  };

  useEffect(() => {
    if (novaSenha) {
      setErros(validarSenha(novaSenha));
    } else {
      setErros([]);
    }
  }, [novaSenha]);

  const handleVerificarCodigo = (e) => {
    e.preventDefault();
    const dados = JSON.parse(localStorage.getItem("codigoRecuperacao"));
    if (dados && codigo === dados.codigo) {
      setVerificado(true);
      setMensagem(null);
    } else {
      setMensagem("Código inválido");
    }
  };

  const handleAlterarSenha = (e) => {
    e.preventDefault();
    if (erros.length > 0) {
      setMensagem("A senha não atende aos requisitos.");
      return;
    }
    if (novaSenha !== confirmarSenha) {
      setMensagem("As senhas não coincidem");
      return;
    }
    const dados = JSON.parse(localStorage.getItem("codigoRecuperacao"));
    const usuarios = JSON.parse(localStorage.getItem("fakeUsers")) || [];
    const index = usuarios.findIndex((u) => u.email === dados.email);
    if (index !== -1) {
      usuarios[index].password = novaSenha;
      localStorage.setItem("fakeUsers", JSON.stringify(usuarios));
      localStorage.removeItem("codigoRecuperacao");
      navigate("/");
    } else {
      setMensagem("Erro ao atualizar senha");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="login-title">Alterar Senha</h1>
        {mensagem && <p className="error">{mensagem}</p>}
        {!verificado ? (
          <form onSubmit={handleVerificarCodigo}>
            <Input
              label="Código de Recuperação"
              type="text"
              value={codigo}
              onChange={(e) => setCodigo(e.target.value)}
            />
            <ButtonGroup>
              <button type="button" className="login-button" onClick={() => navigate("/")}>Cancelar</button>
              <button type="submit" className="login-button">Confirmar</button>
            </ButtonGroup>
          </form>
        ) : (
          <form onSubmit={handleAlterarSenha}>
            <Input
              label="Nova Senha"
              type="password"
              value={novaSenha}
              onChange={(e) => setNovaSenha(e.target.value)}
            />
            {erros.length > 0 && (
              <ul className="error" style={{ fontSize: "0.85rem", marginTop: "0.5rem", marginBottom: "0.5rem" }}>
                {erros.map((erro, idx) => (
                  <li key={idx}>{erro}</li>
                ))}
              </ul>
            )}
            <Input
              label="Confirmar Senha"
              type="password"
              value={confirmarSenha}
              onChange={(e) => setConfirmarSenha(e.target.value)}
            />
            <ButtonGroup>
              <button type="button" className="login-button" onClick={() => navigate("/")}>Cancelar</button>
              <button type="submit" className="login-button">Alterar Senha</button>
            </ButtonGroup>
          </form>
        )}
      </div>
    </div>
  );
};

export default AlterarSenha;