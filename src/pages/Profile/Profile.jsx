import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext.js";
import { getItem } from "../../services/LocalStorageFuncs.js";
import "./style.css";

export const Profile = () => {
  const { userCpf } = useAuth();
  const [userData, setUserData] = useState(JSON.parse(getItem(userCpf)) || "");

  return (
    <div className="container-profile">
      <h1>Profile</h1>
      <p>Nome: {userData.userName}</p>
      <p>Email: {userData.userEmail}</p>
      <p>CPF: {userData.userCPF}</p>
    </div>
  );
};
