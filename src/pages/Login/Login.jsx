import React, { useState } from "react";
import { Button } from "../../components/button/index.js";
import { useHistory } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { FIREBASE_AUTH } from "../../FirebaseConfig.js";
import pelaLoja from "../../assets/cliente-negra-irreconhecivel-escolhendo-moveis-no-shopping.jpg";
import { Spinner } from "flowbite-react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { css } from "@emotion/react";
import "./style.css";

export const Login = () => {
  const [loading, setLoading] = useState(false);
  const auth = FIREBASE_AUTH;
  const history = useHistory();

  const login = async (data) => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      console.log(response);
    } catch (error) {
      alert("Falha ao logar", error);
    } finally {
      setLoading(false);
    }
  };

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
          {loading ? (
            <>
              <Box sx={{ display: "flex" }}>
                <CircularProgress color="inherit" />
              </Box>
            </>
          ) : (
            <div>
              <div className="label-input">
                <label htmlFor="">Email</label>
                <input className="input" id="email" type="email" />
                <label htmlFor="">Senha</label>
                <input className="input" id="password" type="password" />
              </div>
              <div className="auth-button">
                <div>
                  <Button smallButton={true} onClick={() => login()}>
                    Login
                  </Button>
                </div>
                <div>
                  <Button
                    smallButton={true}
                    onClick={() => handleClickForgotPassword()}
                  >
                    Recuperar Senha
                  </Button>
                </div>
              </div>
              <div className="login-signup">
                <p>Não possui conta? Cadastre-se</p>
                <Button onClick={() => handleClickSignup()}>Cadastrar</Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
