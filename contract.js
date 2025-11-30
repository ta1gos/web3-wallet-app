// Адрес вашего развернутого контракта
const contractAddress = '0xbe1110872822299dDfCfcbB178ECb78B2d75caf8';
// ABI вашего контракта (можно взять тот набор, который формирует Remix)
const contractAbi = [
{
"inputs": [
{
"internalType": "string",
"name": "_message",
"type": "string"
}
],
"name": "setMessage",
"outputs": [],
"stateMutability": "nonpayable",
"type": "function"
},
{
"inputs": [],
"name": "getMessage",
"outputs": [
{
"internalType": "string",
"name": "",
"type": "string"
}
],
"stateMutability": "view",
"type": "function"
}
];
// При подключении к Mmask
if (window.ethereum) {
const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();
const contract = new ethers.Contract(contractAddress, contractAbi, signer);
  document.getElementById('setMessageButton').onclick = async () => {
const message = document.getElementById('messageInput').value;
await contract.setMessage(message);
alert('Сообщение установлено!');
};
document.getElementById('getMessageButton').onclick = async () => {
const message = await contract.getMessage();
document.getElementById('messageDisplay').innerText = message;
};
} else {
alert('Установите MMask или другой кошелек.');
}
