import React from "react";
import { Button } from "../../components/button/index.js";
import pelaLoja from "../../assets/cliente-negra-irreconhecivel-escolhendo-moveis-no-shopping.jpg";

import "./style.css";

export const Signup = () => {
  return (
    <div className="box-auth-login">
      <img className="imagem-login" src={pelaLoja} alt="" />

      <div className="signup-auth-box">
        <div className="signup-box">
          <h1>Cadastro</h1>
          <div className="label-input">
            <label htmlFor="">Nome</label>
            <input className="input" type="text" />
            <label htmlFor="">Email</label>
            <input className="input" type="email" />
            <label htmlFor="">CPF</label>
            <input className="input" type="text" />
            <label htmlFor="">Telefone</label>
            <input className="input" type="tel" />
            <label htmlFor="">Senha</label>
            <input className="input" type="password" />
            <label htmlFor="">Repetir senha</label>
            <input className="input" type="password" />
          </div>
          <div className="auth-button">
            <div>
              <Button>Cadastrar</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
