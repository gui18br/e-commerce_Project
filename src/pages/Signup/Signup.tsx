import React, { useState } from "react";
import { Button } from "../../components/button/index";
import { Input } from "../../components/input/index";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { UserCredential, createUserWithEmailAndPassword } from "firebase/auth";
import { FIREBASE_AUTH } from "../../FirebaseConfig";
import { setItem } from "../../services/LocalStorageFuncs.js";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import * as yup from "yup";
import "./style.css";

interface FormValues {
  name: string;
  email: string;
  cpf: string;
  password: string;
  confirmPassword: string;
}

const authImage = require("../../assets/designers-de-cenario-no-trabalho.jpg");

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
  const [loading, setLoading] = useState<boolean>(false);
  const { updateTokenData, updateUserData } = useAuth();
  const auth = FIREBASE_AUTH;

  const history = useHistory();

  const [formValues, setFormValues] = useState<FormValues>({
    name: "",
    email: "",
    cpf: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<FormValues>({
    name: "",
    email: "",
    cpf: "",
    password: "",
    confirmPassword: "",
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

  const signUp = async () => {
    setLoading(true);
    const email = (document.getElementById("email") as HTMLInputElement).value;
    const name = (document.getElementById("name") as HTMLInputElement).value;
    const cpf = (document.getElementById("cpf") as HTMLInputElement).value;
    const password = (document.getElementById("password") as HTMLInputElement)
      .value;
    try {
      const response: UserCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const accessToken: string = response.user.refreshToken;
      updateTokenData({ tokenData: accessToken });
      setItem("token", accessToken);
      updateUserData({ userName: name, userEmail: email, userCPF: cpf });
      setItem("userData", {
        userName: name,
        userEmail: email,
        userCPF: cpf,
      });
      history.push("/");
    } catch (error) {
      alert("Signup failed" + error);
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
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                />
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
                <label htmlFor="">CPF</label>
                <Input
                  className="input"
                  id="cpf"
                  name="cpf"
                  type="cpf"
                  value={formValues.cpf}
                  error={!!errors.cpf}
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
                <label htmlFor="">Repetir Senha</label>
                <Input
                  className="input"
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formValues.confirmPassword}
                  error={!!errors.confirmPassword}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
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
