import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import { useHistory } from "react-router-dom";
import "./style.css";

export function Header(props) {
  const history = useHistory();

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
      <div className="auth-buttons">
        <div>
          <button className="auth-button" onClick={() => handleClickSignup()}>
            Cadastre-se
          </button>
        </div>
        <div>
          <button className="auth-button" onClick={() => handleClickLogin()}>
            Fazer Login
          </button>
        </div>
      </div>
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
