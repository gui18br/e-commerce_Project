import React, { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.js";
import "./style.css";
import { FIREBASE_AUTH } from "../../FirebaseConfig.js";

export function Header(props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const auth = FIREBASE_AUTH;

  const history = useHistory();

  const { tokenData, updateTokenData } = useAuth();

  const handleCliclLogout = () => {
    auth
      .signOut()
      .then(() => {
        updateTokenData("");
        localStorage.removeItem("token");
        history.push("/login");
      })
      .catch((error) => {
        alert("Erro ao fazer o logout");
      });
  };

  const handleMouseEnter = () => {
    setIsMenuOpen(true);
  };

  const handleMouseLeave = () => {
    setIsMenuOpen(false);
  };

  const handleClickCart = () => {
    history.push("/cart");
  };

  const handleClickLogin = () => {
    history.push("/login");
  };

  const handleClickSignup = () => {
    history.push("/cadastro");
  };

  return (
    <header>
      <h1 className="shopName">Store</h1>
      {tokenData ? (
        <>
          <div className="menu">
            <div
              className={`dropdown-container ${isMenuOpen ? "menu-open" : ""}`}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <span className="trigger-word">Olá, fulano</span>
              {isMenuOpen && (
                <div className="overlay" onClick={handleMouseLeave}></div>
              )}
              {isMenuOpen && (
                <div
                  className="dropdown-menu"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <button>Perfil</button>
                  <button onClick={() => handleCliclLogout()}>Sair</button>
                </div>
              )}
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="auth-buttons">
            <div>
              <button
                className="auth-button"
                onClick={() => handleClickSignup()}
              >
                Cadastre-se
              </button>
            </div>
            <div>
              <button
                className="auth-button"
                onClick={() => handleClickLogin()}
              >
                Fazer Login
              </button>
            </div>
          </div>
        </>
      )}

      {!props.cartDisable ? (
        <button className="carrinho" onClick={handleClickCart}>
          {props.qtdItens > 0 ? (
            <p className="qtdItens">{props.qtdItens}</p>
          ) : null}
          <FaShoppingCart />
        </button>
      ) : null}
    </header>
  );
}
