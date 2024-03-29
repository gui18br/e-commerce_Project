import React, { useState } from "react";
import { Button } from "../../components/button/index";
import { Input } from "../../components/input/index";
import { sendPasswordResetEmail } from "firebase/auth";
import { FIREBASE_AUTH } from "../../FirebaseConfig";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import * as yup from "yup";
import "./style.css";

interface FormValues {
  email: string;
}

const authImage = require("../../assets/designers-de-cenario-no-trabalho.jpg");

const forgotSchema = yup.object().shape({
  email: yup
    .string()
    .email("Digite um endereço de email válido")
    .required("O email é obrigatório"),
});

export const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const auth = FIREBASE_AUTH;

  const [formValues, setFormValues] = useState<FormValues>({
    email: "",
  });

  const [errors, setErrors] = useState<FormValues>({
    email: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  const sendEmail = async () => {
    setLoading(true);
    const email: string = (document.getElementById("email") as HTMLInputElement)
      .value;
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      alert("Send email failed");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = () => {
    forgotSchema
      .validate(formValues, { abortEarly: false })
      .then(() => {
        sendEmail();
      })
      .catch((yupErrors) => {
        yupErrors.inner.forEach((error: any) => {
          setErrors((prevErrors) => ({
            ...prevErrors,
            [error.path]: error.message,
          }));
        });
      });
  };

  return (
    <div className="box-auth-login">
      <img className="imagem-login" src={authImage} alt="" />

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
              <p id="p-title">Insira seu email para alterar sua senha!</p>
              <div className="label-input">
                <label htmlFor="">Email</label>
                <Input
                  className="input"
                  id="email"
                  name="email"
                  type="email"
                  value={formValues.email}
                  error={!!errors.email}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                />
              </div>
              {errors.email && (
                <div className="error-message">
                  <p>&#9888; {errors.email}</p>
                </div>
              )}
              <div className="auth-button">
                <div>
                  <Button onClick={handleSubmit}>Enviar</Button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
