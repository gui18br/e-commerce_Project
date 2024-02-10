import React, { useState } from "react";
import { Button } from "../../components/button/index.js";
import { useHistory } from "react-router-dom";
import pelaLoja from "../../assets/cliente-negra-irreconhecivel-escolhendo-moveis-no-shopping.jpg";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { FIREBASE_AUTH } from "../../FirebaseConfig.js";
import * as yup from "yup";
import "./style.css";

const signUpSchema = yup.object().shape({
  name: yup.string().required("O nome é obrigatório"),
  email: yup
    .string()
    .email("Digite um endereço de email válido")
    .required("O email é obrigatório"),
  cpf: yup.string().required("O CPF é obrigatório"),
  password: yup
    .string()
    .required("Digite a sua senha")
    .min(6, "A senha deve ter pelo menos 6 caracteres"),
  confirmPassword: yup
    .string()
    .min(6, "A senha deve ter pelo menos 6 caracteres")
    .oneOf([yup.ref("password")], "Sua senha deve ser a mesma")
    .required("Por favor complete todos os campos"),
});

export const Signup = () => {
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState();
  const auth = FIREBASE_AUTH;

  const history = useHistory();

  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    cpf: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    cpf: "",
    password: "",
    confirmPassword: "",
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

  const signUp = async () => {
    setLoading(true);
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      setToken(response.user.accessToken);
      history.push("/");
    } catch (error) {
      alert("Signup failed", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = () => {
    signUpSchema
      .validate(formValues, { abortEarly: false })
      .then(() => {
        signUp();
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
                  <Button onClick={handleSubmit}>Cadastrar</Button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
