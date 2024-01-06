import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import { useHistory } from "react-router-dom";

export function Cabecalho(props) {
  const history = useHistory();

  const handleClick = () => {
    history.push("/cart");
  };

  return (
    <header>
      <h1>Store</h1>
      {!props.cartDisable ? (
        <button className="carrinho" onClick={handleClick}>
          <p className="">{props.qtdItens}</p>
          <FaShoppingCart />
        </button>
      ) : null}
    </header>
  );
}
