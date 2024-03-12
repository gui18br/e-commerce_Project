import { Link } from "react-router-dom";
import { Button } from "../button";
import { useEffect, useState } from "react";
import { getItem, setItem } from "../../services/LocalStorageFuncs";
import { useAuth } from "../../context/AuthContext";
import { BsFillCartCheckFill, BsFillCartPlusFill } from "react-icons/bs";
import { getLimitProducts } from "../../services/produto.service";
import { useProduct } from "../../context/ProductContext";
import Pagination from "../../Paginations";
import { useCart } from "../../context/CartContext";

interface ItemData {
  id: string;
  title: string;
  thumbnail: string;
  original_price?: number;
  price: number;
  quantity: number;
}

const LIMIT = 12;

export default function StoreItens(props: any) {
  const { userData, tokenData } = useAuth();
  const userEmail = userData?.userEmail || "";

  const { product } = useProduct();
  const { updateCartQuantity } = useCart();

  const [data, setData] = useState<ItemData[]>([]);
  const [cart, setCart] = useState<ItemData[]>(
    tokenData && getItem(userEmail)
      ? getItem(userEmail)
      : getItem("userNotLogged") || []
  );
  const [offset, setOffSet] = useState<number>(0);

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
        const products = await getLimitProducts(LIMIT, offset, product);
        setData(products);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      }
    };

    fetchData();
  }, [offset, product]);

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

  const calcQuantity = () => {
    let quantidade: number = 0;
    for (var i = 0; i < cart.length; i++) {
      quantidade += cart[i].quantity;
    }
    return quantidade;
  };

  updateCartQuantity(calcQuantity());

  return (
    <div>
      <div className="carousel-itens">
        {data.map((e) => [
          <div className="card-item" key={e.id}>
            <Link className="link" to={`/${e.id}`}>
              <h4>{e.title.slice(0, 50) + "..."}</h4>
              <img src={e.thumbnail} alt="" className="image-store" />
            </Link>
            <h4>
              {e.price.toLocaleString("pt-br", {
                style: "currency",
                currency: "BRL",
              })}
            </h4>
            <Button onClick={() => handleClick(e)}>
              {cart.some((itemCart) => itemCart.id === e.id) ? (
                <BsFillCartCheckFill />
              ) : (
                <BsFillCartPlusFill />
              )}
            </Button>
          </div>,
        ])}
      </div>
      <div className="pagination">
        <Pagination
          limit={LIMIT}
          total={1200}
          offset={offset}
          setOffset={setOffSet}
        />
      </div>
    </div>
  );
}
