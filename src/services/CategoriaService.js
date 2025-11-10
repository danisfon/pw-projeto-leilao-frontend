// import axios from "axios";

// const API_URL = "http://localhost:8090/categoria"; // ajuste a URL se necessário

// const CategoriaService = {
//   listar: (page = 0, size = 10) => axios.get(`${API_URL}?page=${page}&size=${size}`),
//   buscarPorId: (id) => axios.get(`${API_URL}/${id}`),
//   salvar: (categoria) => axios.post(API_URL, categoria),
//   // atualizar: (categoria) => axios.put(API_URL, categoria),
//   atualizar: (categoria) => axios.put(`${API_URL}/${categoria.id}`, categoria),
//   excluir: (id) => axios.delete(`${API_URL}/${id}`)
// };

// export default CategoriaService;import api from "../configs/axiosConfig";

import api from "../configs/axiosConfig";

const CategoriaService = {
  listar: async ({ page = 0, size = 10, search }) => {
    const params = { page, size };
    if (search) params.search = search;
    const { data } = await api.get("/categoria", { params });
    return data;
  },
  buscarPorId: async (id) => {
    const { data } = await api.get(`/categoria/${id}`);
    return data;
  },
  criar: async (payload) => {
    const { data } = await api.post("/categoria", payload);
    return data;
  },
  atualizar: async (id, payload) => {
    const { data } = await api.put(`/categoria/${id}`, payload);
    return data;
  },
  remover: async (id) => {
    await api.delete(`/categoria/${id}`);
  }
};

export default CategoriaService;