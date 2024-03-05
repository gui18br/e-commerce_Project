import React, { useState } from "react";
import { getItem, setItem } from "../../services/LocalStorageFuncs";
import { Button } from "../../components/button";
import { useHistory } from "react-router-dom";
import { Input } from "../../components/input";
import { UserCredential, signInWithEmailAndPassword } from "firebase/auth";
import { FIREBASE_AUTH } from "../../FirebaseConfig";
import { useAuth } from "../../context/AuthContext";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import * as yup from "yup";
import "./style.css";

interface FormValues {
  email: string;
  password: string;
}

const authImage = require("../../assets/designers-de-cenario-no-trabalho.jpg");

const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Digite um endereço de email válido")
    .required("O email é obrigatório"),
  password: yup
    .string()
    .min(6, "A senha deve ter pelo menos 6 caracteres")
    .required("Digite a sua senha"),
});

export const Login = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const auth = FIREBASE_AUTH;
  const history = useHistory();

  const { updateTokenData, updateUserEmail } = useAuth();

  const [formValues, setFormValues] = useState<FormValues>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<FormValues>({
    email: "",
    password: "",
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

  const login = async () => {
    const email: string = (document.getElementById("email") as HTMLInputElement)
      .value;
    const password: string = (
      document.getElementById("password") as HTMLInputElement
    ).value;
    setLoading(true);
    try {
      const response: UserCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const emailFirebase: string = response.user.email ?? "";
      const accessToken: string = response.user.refreshToken;
      setItem("userEmail", emailFirebase);
      setItem("token", accessToken);
      updateUserEmail({ userEmail: emailFirebase });
      updateTokenData({ tokenData: accessToken });
      history.push("/");
    } catch (error) {
      alert("Falha ao logar: " + error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = () => {
    loginSchema
      .validate(formValues, { abortEarly: false })
      .then(() => {
        login();
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

  const handleClickSignup = () => {
    history.push("/cadastro");
  };

  const handleClickForgotPassword = () => {
    history.push("/esqueci-senha");
  };

  return (
    <div className="box-auth-login">
      <img className="imagem-login" src={authImage} alt="" />

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
            <>
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
                <label htmlFor="">Senha</label>
                <Input
                  className="input"
                  id="password"
                  name="password"
                  type="password"
                  value={formValues.password}
                  error={!!errors.password}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                />
              </div>
              {(errors.email || errors.password) && (
                <div className="error-message">
                  <p>&#9888; {errors.email || errors.password}</p>
                </div>
              )}
              <div className="auth-button">
                <div>
                  <Button smallButton={true} onClick={handleSubmit}>
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
            </>
          )}
        </div>
      </div>
    </div>
  );
};
