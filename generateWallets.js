var bip39 = require("bip39");
const HDWallet = require("ethereum-hdwallet");
const Json2csvParser = require("json2csv").Parser;
const fs = require("fs-extra");
var QRCode = require("qrcode");

let wallets = [];
index = 0;
while (index++ < 600) {
  var mnemonic = bip39.generateMnemonic();
  const hdwallet = HDWallet.fromMnemonic(mnemonic);
  var publicAddress = `0x${hdwallet
    .derive(`m/44'/60'/0'/0/0`)
    .getAddress()
    .toString("hex")}`;
  var privateKey = hdwallet
    .derive(`m/44'/60'/0'/0/0`)
    .getPrivateKey()
    .toString("hex");

  publicAddressFormatted = `"${publicAddress}",`; // "0xabc123...", used for batch transactions
  publicAddressQRString = `ethereum:${publicAddress}`; // ethereum:0xabc123...
  wallets.push({
    index,
    mnemonic,
    privateKey,
    publicAddress,
    publicAddressFormatted,
    publicAddressQRString
  });
}

// Convert from json to csv
const fields = [
  "index",
  "mnemonic",
  "privateKey",
  "publicAddress",
  "publicAddressFormatted",
  "publicAddressQRString"
];
const opts = { fields };
try {
  const parser = new Json2csvParser(opts);
  const csv = parser.parse(wallets);
  fs.outputFile("./wallets.csv", csv, err => {
    if (err) throw err;
    console.log("The file has been saved!");
  });
  console.log(csv);
} catch (err) {
  console.error(err);
}
