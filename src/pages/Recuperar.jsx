// import React, { useState } from "react";
// import { Input } from "../components/Input";
// import { useNavigate } from "react-router-dom";
// import ButtonGroup from "../components/ButtonGroup";

// const Recuperar = () => {
//   const [email, setEmail] = useState("");
//   const [mensagem, setMensagem] = useState(null);
//   const navigate = useNavigate();

//   const gerarCodigo = () => Math.floor(100000 + Math.random() * 900000).toString();

//   const handleRecuperar = (e) => {
//     e.preventDefault();
//     const usuarios = JSON.parse(localStorage.getItem("fakeUsers")) || [];
//     const usuario = usuarios.find((u) => u.email === email);
//     if (usuario) {
//       const codigo = gerarCodigo();
//       localStorage.setItem("codigoRecuperacao", JSON.stringify({ email, codigo }));
//       setMensagem(`Um código de recuperação foi enviado: ${codigo}`);
//     } else {
//       setMensagem("E-mail não encontrado.");
//     }
//   };

//   return (
//     <div className="login-container">
//       <div className="login-box">
//         <h1 className="login-title">Recuperar Senha</h1>
//         {mensagem && <p className="error">{mensagem}</p>}
//         <form onSubmit={handleRecuperar}>
//           <Input
//             label="E-mail"
//             type="text"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//           <ButtonGroup>
//             <button type="button" className="login-button" onClick={() => navigate("/")}>Cancelar</button>
//             <button type="submit" className="login-button">Recuperar</button>
//           </ButtonGroup>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Recuperar;