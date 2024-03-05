import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { getItem } from "../../services/LocalStorageFuncs.js";
import { Header } from "../../components/header/index";
import "./style.css";

export const Profile = () => {
  const { userData, tokenData } = useAuth();

  const userEmail = userData?.userEmail || "";

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
      <Header qtdItens={calcQuantity()} />
      <div className="profile">
        <h2>Profile</h2>
        <img src="" alt="" />
        <p>{userData.userName}</p>
        <p>{userEmail}</p>
        <h3>Dados pessoais</h3>
        <p>CPF: {userData.userCPF}</p>
      </div>
    </div>
  );
};
