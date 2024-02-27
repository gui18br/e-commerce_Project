import React, { useState, useEffect } from "react";
import { BsFillCartCheckFill, BsFillCartPlusFill } from "react-icons/bs";
import { useParams } from "react-router-dom";
import { getItem, setItem } from "../../services/LocalStorageFuncs";
import { getAllProducts } from "../../services/produto.service";
import { Header } from "../../components/header/index.js";
import { Button } from "../../components/button/index.tsx";
import { useAuth } from "../../context/AuthContext.tsx";
import CircularProgress from "@mui/material/CircularProgress";
import { useProduct } from "../../context/ProductContext.tsx";
import Box from "@mui/material/Box";
import "./style.css";

export const ItemDetail = () => {
  const { userEmail, tokenData } = useAuth();
  const { product } = useProduct();

  const [cart, setCart] = useState(
    tokenData && getItem(userEmail)
      ? getItem(userEmail)
      : getItem("userNotLogged") || []
  );
  const [data, setData] = useState([]);
  const [item, setItem1] = useState();
  const { id } = useParams();

  useEffect(() => {
    if (tokenData !== "" && getItem("userNotLogged")) {
      const combinedCart = [...getItem("userNotLogged"), ...getItem(userEmail)];
      setCart(combinedCart);
    }
  }, [tokenData, userEmail]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const products = await getAllProducts(product);
        setData(products);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      }
    };

    fetchData();
  }, [product]);

  useEffect(() => {
    const selectedItem = data.find((item) => item.id === id);
    setItem1(selectedItem);
  }, [data, id]);

  if (!item) {
    return (
      <Box
        sx={{ display: "flex", justifyContent: "center", marginTop: "18rem" }}
      >
        <CircularProgress color="inherit" />
      </Box>
    );
  }

  const handleClick = (obj) => {
    const element = cart.find((e) => e.id === obj.id);
    if (element) {
      const arrFilter = cart.filter((e) => e.id !== obj.id);
      setCart(arrFilter);
      setItem(tokenData ? userEmail : "userNotLogged", arrFilter);
    } else {
      const newItem = { ...obj, quantity: 1 };
      setCart([...cart, newItem]);
      setItem(tokenData ? userEmail : "userNotLogged", [...cart, newItem]);
    }
  };

  const calcQuantity = () => {
    let quantidade = 0;
    for (var i = 0; i < cart.length; i++) {
      quantidade += cart[i].quantity;
    }
    return quantidade;
  };

  return (
    <div className="container">
      <Header qtdItens={`${calcQuantity()}`} />
      <div className="item-details">
        <div className="item-image">
          <img className="image" src={item.thumbnail} alt="" />
        </div>
        <div className="item-buy">
          <h1 className="productTitle">{item.title.slice(0, 108) + "."}</h1>
          <div className="prices">
            {item.original_price ? (
              <p className="original-price">
                {item.original_price.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </p>
            ) : null}
            <h2 className="price">
              {item.price.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </h2>
          </div>

          <Button onClick={() => handleClick(item)}>
            {cart.some((itemCart) => itemCart.id === item.id) ? (
              <BsFillCartCheckFill />
            ) : (
              <BsFillCartPlusFill />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};
