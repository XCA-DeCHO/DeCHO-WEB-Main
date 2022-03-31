import { useDispatch, useSelector } from "react-redux";
import { myAlgoConnect } from "../utils";
import React, { useState } from "react";

import WalletConnectQRCodeModal from "algorand-walletconnect-qrcode-modal";
import WalletConnect from "@walletconnect/client";

const ConnectWalletModal = () => {
  const { openModal } = useSelector((state) => state.status.connectWalletModal);
  const dispatch = useDispatch();

  const [walletAddr, setWalletAddr] = useState(
    localStorage.getItem("walletAddr")
  );

  const onSelectMyAlgoWallet = async () => {
    if (!walletAddr) {
      const accounts = await myAlgoConnect.connect({
        shouldSelectOneAccount: true,
      });

      localStorage.setItem("walletAddr", accounts[0].address);
      localStorage.setItem("walletProvider", "myalgo");

      setWalletAddr(accounts[0].address);

      dispatch({
        type: "close_connect_wallet_modal",
      });
      window.location.reload();
    }
  };

  const onSelectPeraWallet = () => {
    const connector = new WalletConnect({
      bridge: "https://bridge.walletconnect.org",
      qrcodeModal: WalletConnectQRCodeModal,
    });

    if (!connector.connected) {
      console.log("Another one");
      connector.createSession();
    }

    connector.on("connect", (error, payload) => {
      if (error) {
        throw error;
      }

      console.log("Connected...");
      const { accounts } = payload.params[0];

      localStorage.setItem("walletAddr", accounts[0]);
      localStorage.setItem("walletProvider", "pera");

      dispatch({
        type: "close_connect_wallet_modal",
      });
      window.location.reload();
    });

    connector.on("session_update", (error, payload) => {
      if (error) {
        throw error;
      }

      console.log("Session updated...");
      const { accounts } = payload.params[0];

      localStorage.setItem("walletAddr", accounts[0]);
      localStorage.setItem("walletProvider", "pera");
    });

    connector.on("disconnect", (error, payload) => {
      if (error) {
        throw error;
      }

      console.log("Disconnected...");

      localStorage.removeItem("walletAddr");
      localStorage.removeItem("walletProvider");

      window.location.reload();
    });
  };

  return (
    <div
      className="app_modal"
      style={{ display: `${!!openModal ? "flex" : "none"}` }}
    >
      <div className="app_modal_inn">
        <div className="app_modal_main">
          <div className="prj_name">
            <p className="prj_title">Wallet Options</p>
            <hr
              style={{
                border: "2px solid black",
                width: "100%",
              }}
            />
          </div>
          <button
            style={{
              border: "1px solid black",
              borderRadius: "8px",
              padding: "12px 6px",
              width: "100%",
              marginTop: "90px",
              display: "block",
            }}
            onClick={onSelectMyAlgoWallet}
          >
            My Algo Wallet
          </button>
          <button
            style={{
              border: "1px solid black",
              borderRadius: "8px",
              padding: "12px 6px",
              width: "100%",
              marginTop: "20px",
              display: "block",
            }}
            onClick={onSelectPeraWallet}
          >
            Pera Wallet
          </button>
        </div>
        <button
          onClick={() => dispatch({ type: "close_connect_wallet_modal" })}
          className="close_modal"
        >
          Close Modal
        </button>
      </div>
    </div>
  );
};

export default ConnectWalletModal;
