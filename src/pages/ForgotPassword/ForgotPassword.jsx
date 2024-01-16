import React, { useState } from "react";
import { Button } from "../../components/button/index.js";
import pelaLoja from "../../assets/cliente-negra-irreconhecivel-escolhendo-moveis-no-shopping.jpg";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { sendPasswordResetEmail } from "firebase/auth";
import { FIREBASE_AUTH } from "../../FirebaseConfig.js";
import "./style.css";

export const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const auth = FIREBASE_AUTH;

  const sendEmail = async () => {
    setLoading(true);
    const email = document.getElementById("email").value;
    try {
      const response = await sendPasswordResetEmail(auth, email);
    } catch (error) {
      alert("Send email failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="box-auth-login">
      <img className="imagem-login" src={pelaLoja} alt="" />

      <div className="forgot-auth-box">
        <div className="forgot-box">
          <h1>Esqueci minha senha</h1>
          {loading ? (
            <>
              <Box sx={{ display: "flex" }}>
                <CircularProgress color="inherit" />
              </Box>
            </>
          ) : (
            <>
              <p>Insira seu email para alterar sua senha!</p>
              <div className="label-input">
                <label htmlFor="">Email</label>
                <input className="input" id="email" type="email" />
              </div>
              <div className="auth-button">
                <div>
                  <Button onClick={() => sendEmail()}>Enviar</Button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
