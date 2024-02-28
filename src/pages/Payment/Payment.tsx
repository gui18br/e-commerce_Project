import React, { useState } from "react";
import { useAddress } from "../../context/AddressContext";
import { Button } from "../../components/button";
import { ModalPix } from "../../components/modal-pix";
import { ModalCartao } from "../../components/modal-cartao";
import "./style.css";

const pix = require("../../assets/logo-pix-icone-1024.png");
const boleto = require("../../assets/boleto-simbolo.png");
const cartao = require("../../assets/png-transparent-credit-card-icon-money-credit-card-finance-credit-card-icon-shopping-bank-buy.png");

export const Payment = () => {
  const { enderecoData } = useAddress();
  const [botaoSelecionado, setBotaoSelecionado] = useState(0);
  const [isModalOpenPix, setIsModalOpenPix] = useState(false);
  const [isModalOpenCartao, setIsModalOpenCartao] = useState(false);

  const handleOpenModalPix = () => {
    setIsModalOpenPix(true);
  };

  const handleCloseModalPix = () => {
    setIsModalOpenPix(false);
  };

  const handleOpenModalCartao = () => {
    setIsModalOpenCartao(true);
  };

  const handleCloseModalCartao = () => {
    setIsModalOpenCartao(false);
  };

  return (
    <div className="payment-screen">
      <h1>Pagamento</h1>

      <div className="payment-endereco">
        <h3>Endereço de entrega</h3>
        <div>
          <p>Cidade: {enderecoData?.endereco.cidade || ""}</p>
          <p>Bairro: {enderecoData?.endereco.bairro || ""}</p>
          <p>Endereço: {enderecoData?.endereco.endereco || ""}</p>
          <p>UF: {enderecoData?.endereco.uf || ""}</p>
        </div>
      </div>

      <div className="payment-method">
        <h3>Selecione um método de pagamento</h3>
        <button
          className="metodo"
          style={{
            backgroundColor: botaoSelecionado === 1 ? "#dfb07a" : "white",
            color: botaoSelecionado === 1 ? "white" : "black",
          }}
          onClick={() => {
            setBotaoSelecionado(1);
            handleOpenModalPix();
          }}
        >
          <h4>Pix</h4>
          <img className="method-img" src={pix} alt="" />
        </button>
        <button
          className="metodo"
          style={{
            backgroundColor: botaoSelecionado === 2 ? "#dfb07a" : "white",
            color: botaoSelecionado === 2 ? "white" : "black",
          }}
          onClick={() => {
            setBotaoSelecionado(2);
            handleOpenModalCartao();
          }}
        >
          <h4>Cartão de Crédito</h4>
          <img className="method-img" src={cartao} alt="" />
        </button>
        <button
          className="metodo"
          style={{
            backgroundColor: botaoSelecionado === 3 ? "#dfb07a" : "white",
            color: botaoSelecionado === 3 ? "white" : "black",
          }}
          onClick={() => setBotaoSelecionado(3)}
        >
          <h4>Boleto</h4>
          <img className="method-img" src={boleto} alt="" />
        </button>
      </div>
      {isModalOpenPix && (
        <div className="modal">
          <ModalPix closeModal={handleCloseModalPix} />
        </div>
      )}
      {isModalOpenCartao && (
        <div className="modal">
          <ModalCartao closeModal={handleCloseModalCartao} />
        </div>
      )}

      <div className="payment-button">
        <Button>Comprar</Button>
      </div>
    </div>
  );
};
