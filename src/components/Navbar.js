import React, { useState, useEffect } from "react";
import { humanizeAddr, connector } from "../utils";
import { useDispatch, useSelector } from "react-redux";
import Toggle from "./Toggle";
import { PeraWalletConnect } from "@perawallet/connect";

const peraWallet = new PeraWalletConnect();

const Navbar = () => {
  const dispatch = useDispatch();
  const [walletAddr, setWalletAddr] = useState(
    localStorage.getItem("walletAddr")
  );
  const [walletProvider, setWalletProvider] = useState(
    localStorage.getItem("walletProvider")
  );

  const [accountAddress, setAccountAddress] = useState(null);
  const isConnectedToPeraWallet = !!accountAddress;

  useEffect(() => {
    // Reconnect to the session when the component is mounted
    peraWallet
      .reconnectSession()
      .then((accounts) => {
        peraWallet.connector.on("disconnect", handleDisconnectWalletClick);

        if (accounts.length) {
          setAccountAddress(accounts[0]);
        }
      })
      .catch((e) => console.log(e));
  }, []);

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
    window.location.reload();
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
            ) : (<>
              <button
                style={{
                  border: `1px solid ${darkTheme ? "#999" : "#000"}`,
                  borderRadius: "8px",
                  padding: "9px 8px 7px",
                  marginRight: "10px",
                }}
                onClick={
                  isConnectedToPeraWallet
                    ? handleDisconnectWalletClick
                    : handleConnectWalletClick
                }
              >
                {walletAddr ? humanizeAddr(walletAddr) : "Pera Wallet"}
              </button>
              <button
              style={{
                border: `1px solid ${darkTheme ? "#999" : "#000"}`,
                borderRadius: "8px",
                padding: "9px 8px 7px",
              }}
              onClick={onConnectWallet}
            >
              {walletAddr ? humanizeAddr(walletAddr) : "Other Wallets"}
            </button>
            </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );

  function handleConnectWalletClick() {
    peraWallet
      .connect()
      .then((newAccounts) => {
        peraWallet.connector.on("disconnect", handleDisconnectWalletClick);

        setAccountAddress(newAccounts[0]);
        

        localStorage.setItem("walletAddr", newAccounts[0]);
        localStorage.setItem("walletProvider", "pera");
        window.location.reload();
      })
      .catch((error) => {
        if (error?.data?.type !== "CONNECT_MODAL_CLOSED") {
          console.log(error);
        }
      });
  }

  function handleDisconnectWalletClick() {
    peraWallet.disconnect();

    setAccountAddress(null);
  }
};

export default Navbar;
