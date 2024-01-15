import React from "react";
import { Button } from "../../components/button/index.js";
import pelaLoja from "../../assets/cliente-negra-irreconhecivel-escolhendo-moveis-no-shopping.jpg";

import "./style.css";

export const ForgotPassword = () => {
  return (
    <div className="box-auth-login">
      <img className="imagem-login" src={pelaLoja} alt="" />

      <div className="forgot-auth-box">
        <div className="forgot-box">
          <h1>Esqueci minha senha</h1>
          <p>Insira seu email para alterar sua senha!</p>
          <div className="label-input">
            <label htmlFor="">Email</label>
            <input className="input" type="email" />
          </div>
          <div className="auth-button">
            <div>
              <Button>Enviar</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
