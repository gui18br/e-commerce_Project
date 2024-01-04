import React, { useState } from "react";
import { getItem, setItem } from "../../services/LocalStorageFuncs";
import { BsFillCartDashFill } from "react-icons/bs";
import { ProductsArea } from "../../CSS/style";
import { Link } from "react-router-dom";
import "./style.css";

export const Cart = () => {
  const [data, setData] = useState(getItem("carrinhoYt") || []);

  const removeItem = (obj) => {
    const arraFilter = data.filter((e) => e.id !== obj.id);
    setData(arraFilter);
    setItem("carrinhoYt", arraFilter);
  };
  return (
    <div>
      <header>
        <h1>Store</h1>
        <h5>Carrinho</h5>
      </header>
      <div className="itens">
        {data.map((e) => (
          <div key={e.id} className="item">
            <Link to={`/${e.id}`} className="linkSemDecoracao">
              <img src={e.thumbnail} alt="" />
              <h4>{e.title}</h4>
            </Link>
            <div>
              <h4>R${e.price}</h4>
              <button
                className="transparent-button"
                onClick={() => removeItem(e)}
              >
                <BsFillCartDashFill />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
