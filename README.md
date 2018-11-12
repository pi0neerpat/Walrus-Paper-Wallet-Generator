<img alt="walrus" src="readme-resources/walrus.png" align="left" width="150">

<h1 align="center"> Walrus Paper Wallet Generator <img alt="wallet" src="readme-resources/wallet.png" align="middle" width="60"></h1>
</p>

<p align="center"><img alt="single-card" src="readme-resources/single-card.png" align="middle" width='400' >
</p>

Generate and fund hundreds of paper wallets, for a workshop or in-person giveaway :globe_with_meridians: :loudspeaker: :moneybag: :gift:  :chart_with_upwards_trend:

> :warning: Warning! Do not use for high-security needs. You should not assume cryptographic security.

## About

Paper wallets are an **easy way to drive adoption** :rocket: since they introduce cryptography, while still _feeling like_ physical, fiat currency. These resources are designed to create and print hundreds of paper wallets on standard business cards.

## Features
:white_check_mark: Quickly generate a **.csv**  file with the mnemonic seed, public and private keys for many wallets.:zap:

:white_check_mark: Business-card templates  :clipboard:

:white_check_mark: Auto-populate labels with mnemonic phrase using Word mail merge  :mailbox_with_mail:  :arrow_right:

:white_check_mark: QR addresses :camera:

:white_check_mark: Suggested directions for setting up a mobile wallet

## Instructions

Here is the general flow.

<p align="center"><img style="border:4px solid grey;" alt="process" src="readme-resources/process.png" align="middle" width='900' >
</p>

### Step 1. Generate wallets

Install
```
npm install
```
Generate the wallets.csv file
```
node generateWallets.js
```
#### Here's what's in wallets.csv

| index | mnemonic | privateKey | publicAddress | publicAddressFormatted |  publicAddressQRString |
| ----- | --------------------------- | -------------- | ----------- | ------| ------|
| 1     | push loan... | a6de7...    | 0x952d81...  | "0xa88...32c7c8", | ethereum:0xa88ed... |

- **publicAddressFormatted** takes care of our `batch.sol` function argument syntax.
- **publicAddressQRString** is the seed text to generate a QR code in Word mail-merge.

This is a good time to mention that many new cryptography users and developers struggle with the concept that a blockchain wallet does not "contain" any tokens or funds. Its merely a text file that is used to sign messages. Consider using an icon like this <img alt="wallet" src="readme-resources/wallet.png" align="middle" width="35"> to describe the concept visually.

### Step 2. Create cards in Word using Mail-Merge

I've included an example of my mail-merge fields in `wallets.docx`. Feel free to create your own template.

Note: I highly recommend you include the **index** on each card, to help during printing, funding, and distribution.

<p align="center"><img alt="merge-fields" src="readme-resources/merge-fields.png" align="middle" width='800' >
</p>

#### QR :camera: Codes

I've spared you from installing spamware plugins to help you generate QR codes in Word. Use the following mail-merge code.
```js
{DSPLAYBARCODE "{MERGEFIELD publicAddressQRString}" QR \* MERGEFORMAT \s 55}
```
Change the size by editing the number at the end.

#### Directions  for Users  :clipboard:  

XXXXXXXXXXXXXXXXXXXX

#### Printing can be a nightmare  :see_no_evil: :anger:

Here's what I learned:

- Your **neighborhood printers are too lazy** :zzz: to do anything besides cookie-cutter job. They are **highly unlikely to accept** your business card prints, even if you do a good job explaining the details.
- Online business-card services **don't allow you to configure unique cards**. If you find one, let me know!

The only option is to print it yourself.
- Buy some plain cardstock and print at home or local mail-service center.
- Invest or borrow a good paper-trimmer if you have 200+ cards, otherwise you can cut by hand.
- If you decide to print double-sided, be sure that the data on the **front and backs are mirrored horizontally**. Test on a small batch to ensure that the publicAddress on the front matches the mnemonic on the back.

### Step 3. Fund your Wallets


#### Here's a snippet of what you'll be using in `batch.sol`

(batch.sol is adapted from my [Eth-Splitter tool](https://github.com/blockchainbuddha/Eth-Splitter-Tool))

```solidity
function multisendETH(address[] _to) public payable returns (bool _success) {
  uint splitAmount = msg.value / _to.length;
  for (uint i = 0; i < _to.length; i++) {
    _to[i].transfer(splitAmount);
  }
  return true;
}

function multisendToken(address _tokenAddr, address[] _to, uint _value, uint limit) public payable
returns (bool _success) {
  require(_to.length <= limit);
  for (uint i = 0; i < _to.length; i++) {
    require((Token(_tokenAddr).transferFrom(msg.sender, _to[i], _value)) == true);
  }
  return true;
}
```
Open `wallets.csv` and copy/paste the column **publicAddressFormatted** into a blank text document.

Add square brackets and remove the last comma. It should look like this:

```js
["0xa88ede6e85a2a983e56d26127aed64713362c7c8",
"0x554fa034b8de09da43e19b98e8705d842f3d7b91",
"0x10f7343ce9ed56bd7e9910446ecea6a0484bf726",
"0x9956363ee036640f78fd4a21e468f34278e21227"]
```

Now you have a properly formatted argument to call the `multiSendETH` function in the `batch.sol` contract.

Deploy `batch.sol` contract on the appropriate network using [Remix IDE](http://remix.ethereum.org). Next, call the `multiSendETH` function using the arguments you just created.

I'll leave the `multiSendToken` function as a challenge for you to solve. Good luck!


### Step 4. Hand them out and have fun!

 :globe_with_meridians: :loudspeaker: :moneybag: :gift:  :chart_with_upwards_trend:

 ## Did you find this useful?  <iframe src="https://ghbtns.com/github-btn.html?user=blockchainbuddha&type=follow&count=true&size=large" frameborder="0" scrolling="0" width="220px" height="30px"></iframe>
Contact me on twitter: [Pi0neerPat](https://twitter.com/pi0neerpat)
