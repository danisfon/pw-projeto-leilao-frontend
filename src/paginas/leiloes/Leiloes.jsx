// src/pages/leiloes/Leiloes.jsx
import whats from "../../assets/whatsapp.jpg"; // Ajuste o path conforme sua estrutura
import mockLeiloes from "../../mocks/mockLeiloes"; // Ajuste o path conforme sua estrutura
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./leiloes.css"; // Importando o CSS específico para esta página

const Leiloes = () => {
  const [leiloes, setLeiloes] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [busca, setBusca] = useState("");
  const [categoria, setCategoria] = useState("Todos");
  const [ordenacao, setOrdenacao] = useState("padrao");
  const navigate = useNavigate();

  useEffect(() => {
    // Buscar leilões
    axios.get("http://localhost:8090/leiloes")
      .then(response => setLeiloes(response.data.content))
      .catch(() => {
        setLeiloes(mockLeiloes);
      });

    // Buscar categorias da API
    axios.get("http://localhost:8090/categoria?size=100")
      .then(response => {
        const categoriasAPI = response.data.content || [];
        setCategorias(categoriasAPI);
      })
      .catch(error => {
        console.error("Erro ao buscar categorias:", error);
        setCategorias([]);
      });
  }, []);

  const handleMinhaConta = () => {
    const usuario = JSON.parse(localStorage.getItem("usuario"));
  
    if (!usuario) {
      navigate("/login");
      return;
    }
  
    switch (usuario.tipoPerfil) {
      case "ADMIN":
        navigate("/admin/veiculos");
        break;
      case "LEILOEIRO":
        navigate("/conta");
        break;
      default:
        navigate("/conta");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    navigate("/login");
  };

  // Categorias fixas + categorias da API
  const categoriasFixas = [
    { id: "Todos", nome: "Todas categorias" },
    { id: "Supercarro", nome: "Supercarro" },
    { id: "Hatch", nome: "Hatch" },
    { id: "Sedan", nome: "Sedan" }
  ];

  // Combinar categorias fixas com categorias da API, removendo duplicatas
  const todasCategorias = [
    ...categoriasFixas,
    ...categorias
      .filter(cat => !categoriasFixas.some(fixa => fixa.id === cat.id || fixa.nome === cat.nome))
      .map(cat => ({ id: cat.nome, nome: cat.nome }))
  ];

  // aplica filtros e ordenação
  const leiloesFiltrados = leiloes
    .filter(leilao =>
      leilao.veiculo?.nome.toLowerCase().includes(busca.toLowerCase())
    )
    .filter(leilao =>
      categoria === "Todos" ? true : leilao.veiculo?.categoria === categoria
    )
    .sort((a, b) => {
      if (ordenacao === "preco") return a.lanceInicial - b.lanceInicial;
      if (ordenacao === "data") return new Date(a.dataFim) - new Date(b.dataFim);
      return 0;
    });

  return (
    <div className="leiloes-container">
      <header className="leiloes-header">
        <h1>Chehade Leilões</h1>

        <div className="dropdown">
          <button className="logout-button">Minha Conta ⌄</button>
          <div className="dropdown-content">
            <button onClick={handleMinhaConta}>Acessar Conta</button>
            <button onClick={handleLogout}>Sair</button>
          </div>
        </div>
      </header>

      {/* filtros */}
      <div className="filtros">
        <input
          type="text"
          placeholder="Buscar veículo..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />
        <select value={categoria} onChange={(e) => setCategoria(e.target.value)}>
          {todasCategorias.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.nome}
            </option>
          ))}
        </select>
        <select value={ordenacao} onChange={(e) => setOrdenacao(e.target.value)}>
          <option value="padrao">Ordenar por</option>
          <option value="preco">Menor preço inicial</option>
          <option value="data">Termina antes</option>
        </select>
      </div>

      {/* lista */}
      <div className="leiloes-lista">
        {leiloesFiltrados.length === 0 ? (
          <p className="sem-resultados">Nenhum leilão encontrado 🚧</p>
        ) : (
          leiloesFiltrados.map((leilao) => (
            <div key={leilao.id} className="leilao-card">
              <img
                src={leilao.veiculo?.imagemUrl || "/placeholder.jpg"}
                alt={leilao.veiculo?.nome}
              />
              <h2>{leilao.veiculo?.nome}</h2>
              <p>Lance inicial: R$ {leilao.lanceInicial.toLocaleString()} </p>
              <p>Compra imediata: R$ {leilao.compraImediata.toLocaleString()}</p>
              <p>Termina em: {new Date(leilao.dataFim).toLocaleString()}</p>
              <button>Ver Detalhes</button>
            </div>
          ))
        )}
      </div>
      <a
        href="https://wa.me/5544991254785"
        className="whatsapp-button"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={whats} alt="WhatsApp" />
      </a>
    </div>
  );
};

export default Leiloes;