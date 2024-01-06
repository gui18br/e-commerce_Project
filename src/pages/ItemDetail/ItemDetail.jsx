import React, { useState, useEffect } from "react";
import { BsFillCartCheckFill, BsFillCartPlusFill } from "react-icons/bs";
import { useParams } from "react-router-dom";
import { getItem, setItem } from "../../services/LocalStorageFuncs";
import { css } from "@emotion/react";
import { PropagateLoader } from "react-spinners";
import { getAllProducts } from "../../services/produto.service";
import { Cabecalho } from "../../components/header/index.js";
import "./style.css";

export const ItemDetail = () => {
  const [cart, setCart] = useState(getItem("carrinhoYt") || []);
  const [data, setData] = useState([]);
  const [item, setItem1] = useState();
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const products = await getAllProducts();
        console.log(products);
        setData(products);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      }
    };

    fetchData();
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
        color={"#dfb07a"}
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
    <div>
      <Cabecalho qtdItens={`${cart.length}`} />

      <div className="container">
        <div className="item-venda" key={item.id}>
          <img className="image" src={item.thumbnail} alt="" />
          <div className="buy">
            <h1>{item.title}</h1>
            {item.original_price ? <p>R${item.original_price}</p> : null}
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
    </div>
  );
};
