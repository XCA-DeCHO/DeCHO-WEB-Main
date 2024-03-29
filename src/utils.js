import MyAlgoConnect from "@randlabs/myalgo-connect";
import algosdk from "algosdk";
import WalletConnectQRCodeModal from "algorand-walletconnect-qrcode-modal";
import WalletConnect from "@walletconnect/client";

const ASA_ID = 722955559;
const myAlgoConnect = new MyAlgoConnect();
const algodClient = new algosdk.Algodv2(
  "",
  "https://node.algoexplorerapi.io",
  ""
);
const indexerClient = new algosdk.Indexer(
  "",
  "https://algoindexer.algoexplorerapi.io",
  ""
);
const connector = new WalletConnect({
  bridge: "https://bridge.walletconnect.org",
  qrcodeModal: WalletConnectQRCodeModal,
});

const humanizeAddr = (address) =>
  address.substring(0, 4) + "..." + address.substring(54, 58);

const createTransaction = (amount, recipientAddr, senderAddr, currency) => {
  const returnData = algodClient
    .getTransactionParams()
    .do()
    .then((suggestedParams) => {
      if (currency === "ALGO") {
        const transaction = algosdk.makePaymentTxnWithSuggestedParamsFromObject(
          {
            from: senderAddr,
            to: recipientAddr,
            amount: amount * 1000000,
            suggestedParams,
          }
        );
        return transaction;
      } else if (currency === "DeLTA") {
        const transaction =
          algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
            from: senderAddr,
            to: recipientAddr,
            amount: amount * 100,
            assetIndex: ASA_ID,
            suggestedParams,
          });
        return transaction;
      }
    })
    .catch((err) =>
      alert("An error occured while fetching transaction params!")
    );

  return returnData;
};

const canMakeApprovalTxn = true;

const canMakeDonationTxn = async (address, amountToSend) => {
  const myAccountInfo = await indexerClient.lookupAccountByID(address).do();
  const balance = await myAccountInfo.account.amount;

  if (amountToSend > balance) {
    alert("You do not have sufficient balance to make this transaction.");
    return;
  }
};

export {
  humanizeAddr,
  myAlgoConnect,
  algodClient,
  createTransaction,
  canMakeApprovalTxn,
  canMakeDonationTxn,
  connector,
  ASA_ID,
};
