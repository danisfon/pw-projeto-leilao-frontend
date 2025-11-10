// services/AutenticacaoService.js
import axios from "axios";

export default class AutenticacaoService {
  async login(email, senha) {
    try {
      const response = await axios.post("http://localhost:8090/autenticacao/login", {
        email,
        senha,
      });
      return response.data; // Isso será o PessoaAutenticacaoDTO
    } catch (error) {
      console.error("Erro ao autenticar:", error);
      return null;
    }
  }

  async register(nome, email, senha) {
    try {
      const response = await axios.post("http://localhost:8090/pessoa", {
        nome,
        email,
        senha,
      });
      return response.data;
    } catch (error) {
      console.error("Erro ao registrar:", error);
      return null;
    }
  }
}

//import BaseService from "./BaseService";


// class AutenticacaoService extends BaseService{

//     constructor(){
//         super("/autenticacao");
//     }

//     async login(dados){
//         const resposta = await this.api.post(`${this.endPoint}/login`, dados);
//         return resposta;
//     }
// }
// export default AutenticacaoService;