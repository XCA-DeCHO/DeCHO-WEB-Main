import React, { useState } from "react";
import { humanizeAddr, connector } from "../utils";
import { useDispatch, useSelector } from "react-redux";
import Toggle from "./Toggle";

const Navbar = () => {
  const dispatch = useDispatch();
  const [walletAddr, setWalletAddr] = useState(
    localStorage.getItem("walletAddr")
  );
  const [walletProvider, setWalletProvider] = useState(
    localStorage.getItem("walletProvider")
  );

  const onConnectWallet = async () => {
    if (!walletAddr || !walletProvider) {
      dispatch({
        type: "open_connect_wallet_modal",
        connectWalletModal: { openModal: true },
      });
    }
  };

  const onDisconnectWallet = () => {
    if (walletProvider === "pera") {
      connector.killSession();
    }

    localStorage.removeItem("walletAddr");
    localStorage.removeItem("walletProvider");

    setWalletAddr("");
    setWalletProvider("");
  };

  const darkTheme = useSelector((state) => state.status.darkTheme);

  return (
    <nav className="header">
      <div className="navbar_inn">
        <div className="nav_logo">
          <img
            src={`/assets/decho-logo-${darkTheme ? "w" : "bw"}.png`}
            alt=""
          />
        </div>

        <div className="settings">
          <div className="mode_switch">
            <Toggle />
          </div>

          <div className="connect_wallet">
            {walletAddr ? (
              <>
                <button
                  style={{
                    border: `1px solid ${darkTheme ? "#999" : "#000"}`,
                    borderRadius: "8px",
                    padding: "9px 8px 7px",
                  }}
                  onClick={onConnectWallet}
                >
                  {walletAddr ? humanizeAddr(walletAddr) : "Connect Wallet"}
                </button>

                <button
                  style={{
                    border: `1px solid ${darkTheme ? "#999" : "#000"}`,
                    marginLeft: "4px",
                    borderRadius: "8px",
                    padding: "9px 8px 7px",
                  }}
                  onClick={onDisconnectWallet}
                >
                  Disconnect
                </button>
              </>
            ) : (
              <button
                style={{
                  border: `1px solid ${darkTheme ? "#999" : "#000"}`,
                  borderRadius: "8px",
                  padding: "9px 8px 7px",
                }}
                onClick={onConnectWallet}
              >
                {walletAddr ? humanizeAddr(walletAddr) : "Connect Wallet"}
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
