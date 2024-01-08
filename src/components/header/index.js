import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import { useHistory } from "react-router-dom";
import "./style.css";

export function Header(props) {
  const history = useHistory();

  const handleClick = () => {
    history.push("/cart");
  };

  return (
    <header>
      <h1 className="shopName">Store</h1>
      {!props.cartDisable ? (
        <button className="carrinho" onClick={handleClick}>
          {props.qtdItens > 0 ? (
            <p className="qtdItens">{props.qtdItens}</p>
          ) : null}
          <FaShoppingCart />
        </button>
      ) : null}
    </header>
  );
}
