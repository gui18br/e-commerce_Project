import React from "react";
import { Button } from "../../components/button/index.js";
import { useHistory } from "react-router-dom";
import pelaLoja from "../../assets/cliente-negra-irreconhecivel-escolhendo-moveis-no-shopping.jpg";

import "./style.css";

export const Login = () => {
  const history = useHistory();

  const handleClickSignup = () => {
    history.push("/cadastro");
  };

  const handleClickForgotPassword = () => {
    history.push("/esqueci-senha");
  };

  return (
    <div className="box-auth-login">
      <img className="imagem-login" src={pelaLoja} alt="" />

      <div className="login-auth-box">
        <div className="login-box">
          <h1>Login</h1>
          <div className="label-input">
            <label htmlFor="">Email</label>
            <input className="input" type="email" />
            <label htmlFor="">Senha</label>
            <input className="input" type="password" />
          </div>
          <div className="auth-button">
            <div>
              <Button smallButton={true}>Login</Button>
            </div>
            <div>
              <Button
                smallButton={true}
                onClick={() => handleClickForgotPassword()}
              >
                Esqueci minha senha
              </Button>
            </div>
          </div>
          <div className="login-signup">
            <p>Não possui conta? Cadastre-se</p>
            <Button onClick={() => handleClickSignup()}>Cadastrar</Button>
          </div>
        </div>
      </div>
    </div>
  );
};
