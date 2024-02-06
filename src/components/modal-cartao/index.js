import React, { useState } from "react";
import "./style.css";
import qrCodeImg from "../../assets/qrcode.webp";
import { Button } from "../button";

export function ModalCartao(props) {
  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Pagamento via Cartão de Crédito</h2>
        <p>Preencha os campos com os dados do cartão</p>

        <div className="cartao-input">
          <label>Número do cartão</label>
          <input
            className="input"
            id="numero"
            type="text"
            placeholder="0000 0000 0000 0000"
          />
        </div>

        <div className="cartao-input">
          <label>Nome no cartão</label>
          <input
            className="input"
            id="nome"
            type="text"
            placeholder="José Maria"
          />
        </div>

        <div className="cartao-input">
          <label>Data de venc.</label>
          <input className="input" id="data" type="text" placeholder="01/24" />
        </div>

        <div className="cartao-input">
          <label>Código de segurança</label>
          <input className="input" id="cvv" type="text" placeholder="CVV" />
        </div>

        <div className="pix-buttons">
          <Button>Salvar</Button>
          <Button onClick={props.closeModal}>Cancelar</Button>
        </div>
      </div>
    </div>
  );
}
