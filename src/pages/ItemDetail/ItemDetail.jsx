import React, { useState, useEffect } from "react";
import {
  BsFillCartCheckFill,
  BsFillCartPlusFill,
  BsCart,
} from "react-icons/bs";
import { useParams } from "react-router-dom";
import { getItem, setItem } from "../../services/LocalStorageFuncs";
import { Link } from "react-router-dom";
import "./style.css";
import { css } from "@emotion/react";
import { PropagateLoader } from "react-spinners";
import { FaShoppingCart } from "react-icons/fa";

export const ItemDetail = () => {
  const [cart, setCart] = useState(getItem("carrinhoYt") || []);
  const [data, setData] = useState([]);
  const [item, setItem1] = useState();
  const { id } = useParams();

  useEffect(() => {
    const fetchApi = async () => {
      const url = "https://api.mercadolibre.com/sites/MLB/search?q=moveis";
      const response = await fetch(url);
      const objJson = await response.json();
      setData(objJson.results);
    };
    fetchApi();
  }, []);

  useEffect(() => {
    const selectedItem = data.find((item) => item.id === id);
    setItem1(selectedItem);
  }, [data, id]);

  const override = css`
    display: block;
    margin: 0 auto;
  `;

  if (!item) {
    return (
      <PropagateLoader
        css={override}
        size={15}
        color={"crimson"}
        loading={true}
      />
    );
  }

  const handleClick = (obj) => {
    const element = cart.find((e) => e.id === obj.id);
    if (element) {
      const arrFilter = cart.filter((e) => e.id !== obj.id);
      setCart(arrFilter);
      setItem("carrinhoYt", arrFilter);
    } else {
      setCart([...cart, obj]);
      setItem("carrinhoYt", [...cart, obj]);
    }
  };

  return (
    <div className="container">
      <header>
        <h1>Store</h1>
        <Link to={"/cart"} className="linkSemDecoracao">
          <div className="carrinho">
            <FaShoppingCart color="crimson" />
          </div>
        </Link>
      </header>
      <div className="item-venda" key={item.id}>
        <img src={item.thumbnail} alt="" />
        <div className="buy">
          <h1>{item.title}</h1>
          <p>R${item.original_price}</p>
          <h2>R${item.price}</h2>
          <button
            className="transparent-button"
            onClick={() => handleClick(item)}
          >
            {cart.some((itemCart) => itemCart.id === item.id) ? (
              <BsFillCartCheckFill />
            ) : (
              <BsFillCartPlusFill />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
