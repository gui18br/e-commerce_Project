import { useState, useEffect } from "react";
import { getItem, setItem } from "../../services/LocalStorageFuncs";
import { BsFillCartDashFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.js";
import { Header } from "../../components/header/index.js";
import { Input } from "../../components/input/index.js";
import { useHistory } from "react-router-dom";
import { searchCep } from "../../services/cep.service.ts";
import { Button } from "../../components/button/index.js";
import { useAddress } from "../../context/AddressContext.js";
import cart from "../../assets/14182.jpg";
import * as yup from "yup";
import "./style.css";

const cepSchema = yup.object().shape({
  cep: yup
    .string()
    .min(8, "Digite um CEP válido.")
    .required("Digite o seu CEP."),
});

export const Cart = () => {
  const { updateAddressData } = useAddress();
  const { tokenData, userEmail } = useAuth();
  const [data, setData] = useState(
    tokenData && getItem(userEmail)
      ? getItem(userEmail)
      : getItem("userNotLogged") || []
  );
  const [endereco, setEndereco] = useState();

  const history = useHistory();

  const [formValues, setFormValues] = useState({
    cep: "",
  });

  const [errors, setErrors] = useState({
    cep: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  useEffect(() => {
    if (tokenData !== "" && getItem("userNotLogged")) {
      const combinedCart = [...getItem("userNotLogged"), ...getItem(userEmail)];
      setItem("userNotLogged", []);
      setData(combinedCart);
      setItem(userEmail, combinedCart);
    }
  }, [tokenData, userEmail]);

  let totalPrice = 0;
  data.forEach((obj) => {
    console.log((totalPrice += obj.price * obj.quantity));
  });

  const plusItem = (id) => {
    const updateCart = data.map((item) => {
      if (item.id === id) {
        return { ...item, quantity: item.quantity + 1 };
      }

      return item;
    });
    setData(updateCart);
    setItem(tokenData ? userEmail : "userNotLogged", updateCart);
  };

  const subtractItem = (id) => {
    const updateCart = data.map((item) => {
      if (item.id === id) {
        return { ...item, quantity: item.quantity - 1 };
      }

      return item;
    });
    setData(updateCart);
    setItem(tokenData ? userEmail : "userNotLogged", updateCart);
  };

  const removeItem = (obj) => {
    const arraFilter = data.filter((e) => e.id !== obj.id);
    setData(arraFilter);

    if (tokenData) {
      setItem(userEmail, arraFilter);
    }

    const notLoggedInCart = getItem("userNotLogged") || [];
    const notLoggedInFiltered = notLoggedInCart.filter((e) => e.id !== obj.id);
    setItem("userNotLogged", notLoggedInFiltered);
  };

  const handleClick = () => {
    history.push("/");
  };

  const handleClickPayment = () => {
    history.push("/payment");
  };

  const handleSearchCEP = async () => {
    try {
      const cepDigitado = document.getElementById("cep").value;
      const resultado = await searchCep(cepDigitado);
      if (resultado.cidade !== "") {
        setEndereco(resultado);
        updateAddressData(resultado);
      } else {
        alert("Informe um CEP correto!");
      }
    } catch (e) {
      console.error("Erro ao pesquisar CEP: ", e);
    }
  };

  const handleSubmit = () => {
    cepSchema
      .validate(formValues, { abortEarly: false })
      .then(() => {
        handleSearchCEP();
      })
      .catch((yupErrors) => {
        yupErrors.inner.forEach((error) => {
          setErrors((prevErrors) => ({
            ...prevErrors,
            [error.path]: error.message,
          }));
        });
      });
  };
  return (
    <div className="container">
      <Header cartDisable={true} />
      {totalPrice > 0 ? (
        <div className="itens">
          {data.map((e) => (
            <div key={e.id} className="item">
              <Link to={`/${e.id}`} className="linkSemDecoracao">
                <img src={e.thumbnail} alt="" />
                <h4 className="title-item">{e.title.slice(0, 50) + "..."}</h4>
              </Link>
              <h4 id="quantidade">Qtd: {e.quantity}</h4>
              <div className="price-button">
                <h4>
                  {e.price.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </h4>
                <div className="quantity">
                  <button id="plusItem" onClick={() => plusItem(e.id)}>
                    +
                  </button>
                  <button
                    id="subtractItem"
                    onClick={() => {
                      e.quantity === 1 ? removeItem(e) : subtractItem(e.id);
                    }}
                  >
                    -
                  </button>
                </div>
                <Button onClick={() => removeItem(e)}>
                  <BsFillCartDashFill />
                </Button>
              </div>
            </div>
          ))}
          <div className="bottom-cart">
            <div className="endereco">
              <div className="input-endereco">
                <h3>Entrega</h3>
                <label htmlFor="cep">CEP: </label>
                <Input
                  className="input"
                  id="cep"
                  name="cep"
                  type="text"
                  value={formValues.cep}
                  error={!!errors.cep}
                  helperText={errors.cep}
                  onChange={handleInputChange}
                  onKeyDown={handleInputChange}
                />
                {errors.cep && (
                  <div className="error-message">
                    <p>&#9888; {errors.cep}</p>
                  </div>
                )}
                <Button onClick={handleSubmit} smallButton={true}>
                  Pesquisar
                </Button>
              </div>
              <div className="dados-coluna">
                <div className="dados-endereco">
                  <p>Cidade: {endereco?.cidade || ""}</p>
                  <p>Bairro: {endereco?.bairro || ""}</p>
                  <p>Endereço: {endereco?.endereco || ""}</p>
                  <p>UF: {endereco?.uf || ""}</p>
                </div>
              </div>
            </div>
            <div className="total-pricing">
              <h1>
                Total:{" "}
                {totalPrice.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </h1>
              <p> - Frete: Grátis</p>
              <Button
                onClick={() =>
                  !errors.cep && endereco !== undefined
                    ? tokenData
                      ? handleClickPayment()
                      : history.push("/login")
                    : null
                }
              >
                Comprar
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="no-itens">
          <h1>Carrinho Vazio :/</h1>
          <p>
            Adicione itens ao seu carrinho para poder prosseguir com a compra!
          </p>
          <img className="cart-image" src={cart} alt="" />
          <Button onClick={() => handleClick()}>Ir</Button>
        </div>
      )}
    </div>
  );
};
