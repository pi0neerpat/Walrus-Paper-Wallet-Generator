var bip39 = require("bip39");
const HDWallet = require("ethereum-hdwallet");
const Json2csvParser = require("json2csv").Parser;
const fs = require("fs-extra");

let wallets = [];
index = 0;
while (index++ < 1100) {
  var mnemonic = bip39.generateMnemonic();
  const hdwallet = HDWallet.fromMnemonic(mnemonic);
  var publicKey = `0x${hdwallet
    .derive(`m/44'/60'/0'/0/0`)
    .getAddress()
    .toString("hex")}`;
  var privateKey = hdwallet
    .derive(`m/44'/60'/0'/0/0`)
    .getPrivateKey()
    .toString("hex");
  wallets.push({ index, mnemonic, publicKey, privateKey });
}

// Convert from json to csv
const fields = ["index", "mnemonic", "publicKey", "privateKey"];
const opts = { fields };
try {
  const parser = new Json2csvParser(opts);
  const csv = parser.parse(wallets);
  fs.outputFile("./message.csv", csv, err => {
    if (err) throw err;
    console.log("The file has been saved!");
  });
  console.log(csv);
} catch (err) {
  console.error(err);
}
