import React, { useState } from "react";
import { getItem, setItem } from "../../services/LocalStorageFuncs";
import { BsFillCartDashFill } from "react-icons/bs";
import { ProductsArea } from "../../CSS/style";
import { Link } from "react-router-dom";

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
        <h1>Cart</h1>
      </header>
      <ProductsArea>
        {data.map((e) => (
          <div key={e.id}>
            <Link to={`/${e.id}`}>
              <h4>{e.title}</h4>
              <img src={e.thumbnail} alt="" />
              <h4>$ {e.price}</h4>
            </Link>
            <button
              className="transparent-button"
              onClick={() => removeItem(e)}
            >
              <BsFillCartDashFill />
            </button>
          </div>
        ))}
      </ProductsArea>
    </div>
  );
};
