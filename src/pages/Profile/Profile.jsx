import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext.js";
import { getItem } from "../../services/LocalStorageFuncs.js";
import "./style.css";
import { Header } from "../../components/header/index.js";

export const Profile = () => {
  const { userCpf, userEmail, tokenData } = useAuth();
  const [userData, setUserData] = useState(JSON.parse(getItem(userCpf)) || "");
  const [cart, setCart] = useState(
    tokenData && getItem(userEmail)
      ? getItem(userEmail)
      : getItem("userNotLogged") || []
  );

  const calcQuantity = () => {
    let quantidade = 0;
    for (var i = 0; i < cart.length; i++) {
      quantidade += cart[i].quantity;
    }
    return quantidade;
  };

  return (
    <div className="container-profile">
      <Header qtdItens={`${calcQuantity()}`} />
      <div className="profile">
        <h2>Profile</h2>
        <img src="" alt="" />
        <p>{userData.userName}</p>
        <p>{userData.userEmail}</p>
        <h3>Dados pessoais</h3>
        <p>CPF: {userData.userCPF}</p>
      </div>
    </div>
  );
};
