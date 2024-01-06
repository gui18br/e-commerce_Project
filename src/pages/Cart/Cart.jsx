import React, { useState } from "react";
import { getItem, setItem } from "../../services/LocalStorageFuncs";
import { BsFillCartDashFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { Cabecalho } from "../../components/header/index.js";

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
      <Cabecalho cartDisable={true} />

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
