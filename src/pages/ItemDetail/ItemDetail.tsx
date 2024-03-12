import React, { useState, useEffect } from "react";
import { BsFillCartCheckFill, BsFillCartPlusFill } from "react-icons/bs";
import { useParams } from "react-router-dom";
import { getItem, setItem } from "../../services/LocalStorageFuncs";
import { getAllProducts } from "../../services/produto.service";
import { Header } from "../../components/header/index";
import { Button } from "../../components/button/index";
import { useAuth } from "../../context/AuthContext";
import { useProduct } from "../../context/ProductContext";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import "./style.css";

interface ItemData {
  id: string;
  title: string;
  thumbnail: string;
  original_price?: number;
  price: number;
  quantity: number;
}

interface useParamsInterface {
  id: string;
}

export const ItemDetail: React.FC = () => {
  const { userData, tokenData } = useAuth();
  const { product } = useProduct();

  const userEmail = userData?.userEmail || "";

  const [cart, setCart] = useState<ItemData[]>(
    tokenData && getItem(userEmail)
      ? getItem(userEmail)
      : getItem("userNotLogged") || []
  );
  const [data, setData] = useState<ItemData[]>([]);
  const [itemData, setItemData] = useState<ItemData | undefined>();

  const { id } = useParams<useParamsInterface>();

  useEffect(() => {
    const fetchData = async () => {
      if (tokenData !== null && getItem("userNotLogged")) {
        const combinedCart: ItemData[] = [
          ...getItem("userNotLogged"),
          ...getItem(userEmail),
        ];
        setCart(combinedCart);
      }
    };

    fetchData(); // Chama a função fetchData
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
    setItemData(selectedItem);
  }, [data, id]);

  if (!itemData) {
    return (
      <Box
        sx={{ display: "flex", justifyContent: "center", marginTop: "18rem" }}
      >
        <CircularProgress color="inherit" />
      </Box>
    );
  }

  const handleClick = (obj: ItemData) => {
    const element: ItemData | undefined = cart.find((e) => e.id === obj.id);
    if (element) {
      const arrFilter = cart.filter((e) => e.id !== obj.id);
      setCart(arrFilter);
      setItem(tokenData ? userEmail : "userNotLogged", arrFilter);
    } else {
      const newItem: ItemData = { ...obj, quantity: 1 };
      setCart([...cart, newItem]);
      setItem(tokenData ? userEmail : "userNotLogged", [...cart, newItem]);
    }
  };

  return (
    <div className="container">
      <Header />
      <div className="item-details">
        <div className="item-image">
          <img className="image" src={itemData.thumbnail} alt="" />
        </div>
        <div className="item-buy">
          <h1 className="productTitle">{itemData.title.slice(0, 108) + "."}</h1>
          <div className="prices">
            {itemData.original_price ? (
              <p className="original-price">
                {itemData.original_price.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </p>
            ) : null}
            <h2 className="price">
              {itemData.price.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </h2>
          </div>

          <Button onClick={() => handleClick(itemData)}>
            {cart.some((itemCart) => itemCart.id === itemData.id) ? (
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
