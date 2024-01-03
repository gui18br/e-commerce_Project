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

  // Verificar se o item está definido antes de renderizar
  if (!item) {
    return <div>Item não encontrado</div>;
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
      <h1>{item.title}</h1>
      <div className="conteudo" key={item.id}>
        <img src={item.thumbnail} alt="" />
        <div>
          <h2>${item.price}</h2>
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
      <Link to={"/cart"}>
        <BsCart />
      </Link>
    </div>
  );
};
