import React, { useState } from "react";
import { setItem } from "../../services/LocalStorageFuncs";
import { Button } from "../../components/button/index.js";
import { useHistory } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { FIREBASE_AUTH } from "../../FirebaseConfig.js";
import { useAuth } from "../../context/AuthContext.js";
import pelaLoja from "../../assets/cliente-negra-irreconhecivel-escolhendo-moveis-no-shopping.jpg";
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
    .required("Digite a sua senha")
    .min(6, "A senha deve ter pelo menos 6 caracteres"),
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
      updateUserEmail(emailFirebase);
      updateTokenData(accessToken);
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
      .then((data) => {
        login(data.email, data.password);
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
            <>
              <div className="label-input">
                <label htmlFor="">Email</label>
                <input
                  className="input"
                  id="email"
                  name="email"
                  type="email"
                  value={formValues.email} // Use value e onChange para controlar o input
                  onChange={handleInputChange}
                  onKeyDown={handleInputChange}
                />
                <label htmlFor="">Senha</label>
                <input
                  className="input"
                  id="password"
                  name="password"
                  type="password"
                  value={formValues.password} // Use value e onChange para controlar o input
                  onChange={handleInputChange}
                  onKeyDown={handleInputChange}
                />
              </div>
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
