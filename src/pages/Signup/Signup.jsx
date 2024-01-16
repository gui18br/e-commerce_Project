import React, { useState } from "react";
import { Button } from "../../components/button/index.js";
import pelaLoja from "../../assets/cliente-negra-irreconhecivel-escolhendo-moveis-no-shopping.jpg";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { FIREBASE_AUTH } from "../../FirebaseConfig.js";
import "./style.css";

export const Signup = () => {
  const [loading, setLoading] = useState(false);
  const auth = FIREBASE_AUTH;

  const signUp = async (data) => {
    setLoading(true);
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
    } catch (error) {
      alert("Signup failed", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="box-auth-login">
      <img className="imagem-login" src={pelaLoja} alt="" />

      <div className="signup-auth-box">
        <div className="signup-box">
          <h1>Cadastro</h1>
          {loading ? (
            <>
              <Box sx={{ display: "flex" }}>
                <CircularProgress color="inherit" />
              </Box>
            </>
          ) : (
            <>
              <div className="label-input">
                <label htmlFor="">Nome</label>
                <input className="input" type="text" />
                <label htmlFor="">Email</label>
                <input className="input" id="email" type="email" />
                <label htmlFor="">CPF</label>
                <input className="input" type="text" />
                <label htmlFor="">Telefone</label>
                <input className="input" type="tel" />
                <label htmlFor="">Senha</label>
                <input className="input" id="password" type="password" />
                <label htmlFor="">Repetir senha</label>
                <input className="input" type="password" />
              </div>
              <div className="auth-button">
                <div>
                  <Button onClick={() => signUp()}>Cadastrar</Button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
