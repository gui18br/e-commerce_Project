import React, { useState } from "react";
import { setItem } from "../../services/LocalStorageFuncs";
import { Button } from "../../components/button/index.tsx";
import { useHistory } from "react-router-dom";
import { Input } from "../../components/input/index.tsx";
import { signInWithEmailAndPassword } from "firebase/auth";
import { FIREBASE_AUTH } from "../../FirebaseConfig.ts";
import { useAuth } from "../../context/AuthContext.tsx";
import authImage from "../../assets/designers-de-cenario-no-trabalho.jpg";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import * as yup from "yup";
import "./style.css";

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
  const [loading, setLoading] = useState(false);
  const auth = FIREBASE_AUTH;
  const history = useHistory();

  const { updateTokenData, updateUserEmail } = useAuth();

  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
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

  const login = async () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      const emailFirebase = response.user.email;
      const accessToken = response.user.accessToken;
      setItem("userEmail", emailFirebase);
      setItem("token", accessToken);
      updateUserEmail({ userEmail: emailFirebase });
      updateTokenData({ tokenData: accessToken });
      history.push("/");
    } catch (error) {
      alert("Falha ao logar", error);
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
        yupErrors.inner.forEach((error) => {
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
                  helperText={errors.email}
                  onChange={handleInputChange}
                  onKeyDown={handleInputChange}
                />
                <label htmlFor="">Senha</label>
                <Input
                  className="input"
                  id="password"
                  name="password"
                  type="password"
                  value={formValues.password}
                  error={!!errors.password}
                  helperText={errors.password}
                  onChange={handleInputChange}
                  onKeyDown={handleInputChange}
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
