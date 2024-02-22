import React, { useState } from "react";
import { Button } from "../../components/button/index.js";
import { Input } from "../../components/input/index.js";
import { useHistory } from "react-router-dom";
import authImage from "../../assets/designers-de-cenario-no-trabalho.jpg";
import CircularProgress from "@mui/material/CircularProgress";
import { useAuth } from "../../context/AuthContext.js";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { FIREBASE_AUTH } from "../../FirebaseConfig.js";
import * as yup from "yup";
import Box from "@mui/material/Box";
import "./style.css";
import { setItem } from "../../services/LocalStorageFuncs.js";

const signUpSchema = yup.object().shape({
  name: yup.string().required("O nome é obrigatório"),
  email: yup
    .string()
    .email("Digite um endereço de email válido")
    .required("O email é obrigatório"),
  cpf: yup.string().required("O CPF é obrigatório"),
  password: yup
    .string()
    .min(6, "A senha deve ter pelo menos 6 caracteres")
    .required("Digite a sua senha"),
  confirmPassword: yup
    .string()
    .min(6, "A senha deve ter pelo menos 6 caracteres")
    .oneOf([yup.ref("password")], "Sua senha deve ser a mesma")
    .required("Por favor complete todos os campos"),
});

export const Signup = () => {
  const [loading, setLoading] = useState(false);
  const { updateTokenData, updateUserCpf } = useAuth();
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
    const name = document.getElementById("name").value;
    const cpf = document.getElementById("cpf").value;
    const password = document.getElementById("password").value;
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      updateTokenData(response.user.accessToken);
      updateUserCpf(cpf);
      const userData = {
        userName: name,
        userEmail: email,
        userCPF: cpf,
      };
      setItem("userCpf", cpf);
      setItem(cpf, JSON.stringify(userData));
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
      <img className="imagem-login" src={authImage} alt="" />

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
                <Input
                  className="input"
                  id="name"
                  name="name"
                  type="name"
                  value={formValues.name}
                  error={!!errors.name}
                  helperText={errors.name}
                  onChange={handleInputChange}
                  onKeyDown={handleInputChange}
                />
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
                <label htmlFor="">CPF</label>
                <Input
                  className="input"
                  id="cpf"
                  name="cpf"
                  type="cpf"
                  value={formValues.cpf}
                  error={!!errors.cpf}
                  helperText={errors.cpf}
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
                <label htmlFor="">Repetir Senha</label>
                <Input
                  className="input"
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formValues.confirmPassword}
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword}
                  onChange={handleInputChange}
                  onKeyDown={handleInputChange}
                />
              </div>
              {(errors.name ||
                errors.email ||
                errors.cpf ||
                errors.password ||
                errors.confirmPassword) && (
                <div className="error-message">
                  <p>
                    &#9888;{" "}
                    {errors.name ||
                      errors.email ||
                      errors.cpf ||
                      errors.password ||
                      errors.confirmPassword}
                  </p>
                </div>
              )}
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
