import React, { useState } from "react";
import estilos from "./UserRegister.module.scss";
import http from "../../http";
import ButtonRegister from "../ButtonRegister";
import { useNavigate } from "react-router-dom";

const UserRegister = () => {
  let navigate = useNavigate();
  
  const [nome, setNome] = useState("");
  const [login, setLogin] = useState("");
  const [senha, setSenha] = useState("");
  const [senhaConfirm, setSenhaConfirm] = useState("");

  const register = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault();

    const user = {
      nome,
      login,
      senha,
    };

    console.log(user);

    if(validatesenha()) {
      http
      .post("/usuario", user)
      .then(() => {
        alert("Usuário criado com sucesso")
        navigate("/login")
      })
      .catch((error: { response: { data: { message: any; }; }; }) => {
        if (error?.response?.data?.message) {
          alert(error.response.data.message);
        } else {
          alert("Erro ao realizar o cadastro!");
        }
      });
    }

  };

  const validatesenha = () => {
    if(senhaConfirm != senha) {
      alert("Senhas estão diferentes!");
      return false;
    } return true;
  }

  return (
    <div className={estilos.background}>
      <section className={estilos.container}>
        <form onSubmit={register}>

          <div className="form-item">
            <label htmlFor="name" className={estilos.label}>
              Nome completo
            </label>
            <input
              type="text"
              className={estilos.input}
              id="name"
              name="name"
              value={nome}
              onChange={(evento) => setNome(evento.target.value)}
              placeholder="Digite seu nome completo"
              required
            />
          </div>

          <div className="">
            <label htmlFor="login" className={estilos.label}>
              Login
            </label>
            <input
              type="login"
              className={estilos.input}
              id="login"
              name="login"
              value={login}
              onChange={(evento) => setLogin(evento.target.value)}
              placeholder="Digite seu login"
              required
            />
          </div>

          <div className="">
            <label htmlFor="senha" className={estilos.label}>
              Senha
            </label>
            <input
              type="password"
              className={estilos.inputPassword}
              id="senha"
              name="senha"
              value={senha}
              onChange={(evento) => setSenha(evento.target.value)}
              placeholder="Digite sua senha"
              required
            />
            <p className={estilos.p}>(Mínimo de 6 caractéres)</p>
          </div>

          <div className="">
            <label htmlFor="senha-confirm" className={estilos.label}>
              Confirmar senha
            </label>
            <input
              type="password"
              className={estilos.input}
              id="senha-confirm"
              name="senha-confirm"
              value={senhaConfirm}
              onChange={(evento) => setSenhaConfirm(evento.target.value)}
              placeholder="Digite sua senha novamente"
              required
            />
          </div>

          <div className={estilos.button}>
            <ButtonRegister type="submit">Cadastrar</ButtonRegister>
          </div>
        </form>
      </section>
    </div>
  );
};

export default UserRegister;
