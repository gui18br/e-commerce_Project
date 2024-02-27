import React, { useState } from "react";
import "./style.css";
import { Button } from "../button/";

interface ModalPixProps {
  closeModal: () => void;
}

const qrCodeImg = require("../../assets/qrcode.webp");

export function ModalPix(props: ModalPixProps) {
  const [qrCode, setQrCode] = useState(false);

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Pagamento via Pix</h2>
        {!qrCode ? (
          <p>Para prosseguir com o pagamento gere o QR Code</p>
        ) : (
          <p>Escaneie o QR Code</p>
        )}
        {qrCode && <img className="pix-img" src={qrCodeImg} alt="" />}

        <div className="pix-buttons">
          {!qrCode && (
            <Button onClick={() => setQrCode(true)}>Gerar QR Code</Button>
          )}
          <Button onClick={props.closeModal}>Cancelar</Button>
        </div>
      </div>
    </div>
  );
}
