import { useDispatch, useSelector } from "react-redux";
import { myAlgoConnect } from "../utils";
import React, { useState, useEffect } from "react";

import { PeraWalletConnect } from "@perawallet/connect";

const peraWallet = new PeraWalletConnect();

const ConnectWalletModal = () => {
  const { openModal } = useSelector((state) => state.status.connectWalletModal);
  const dispatch = useDispatch();

  const [accountAddress, setAccountAddress] = useState(null);
  const isConnectedToPeraWallet = !!accountAddress;

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
