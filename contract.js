
const contractAddress = '0xbe1110872822299dDfCfcbB178ECb78B2d75caf8'; // ваш полный адрес
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

console.log('=== DEBUG: Script started ===');

// Ждем полной загрузки DOM
document.addEventListener('DOMContentLoaded', function() {
    console.log('=== DEBUG: DOM loaded ===');
    
    if (typeof window.ethereum !== 'undefined') {
        console.log('=== DEBUG: MetaMask detected ===');
        
        initializeApp();
    } else {
        console.log('=== DEBUG: MetaMask not found ===');
        alert('Установите MetaMask!');
    }
});

async function initializeApp() {
    try {
        console.log('=== DEBUG: Initializing app ===');
        
        // Запрашиваем подключение аккаунтов
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        console.log('=== DEBUG: Accounts requested ===');
        
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        
        console.log('=== DEBUG: Connected address:', address);
        
        const contract = new ethers.Contract(contractAddress, contractAbi, signer);
        console.log('=== DEBUG: Contract created ===');

        // Назначаем обработчики
        document.getElementById('setMessageButton').addEventListener('click', async () => {
            console.log('=== DEBUG: Set message button clicked ===');
            const message = document.getElementById('messageInput').value;
            console.log('Message:', message);
            
            if (!message) {
                alert('Введите сообщение!');
                return;
            }
            
            try {
                console.log('=== DEBUG: Sending transaction... ===');
                const tx = await contract.setMessage(message);
                console.log('Transaction hash:', tx.hash);
                alert('Транзакция отправлена! Hash: ' + tx.hash);
                
                // Ждем подтверждения
                await tx.wait();
                alert('Сообщение установлено!');
                
            } catch (error) {
                console.error('Transaction error:', error);
                alert('Ошибка: ' + error.message);
            }
        });

        document.getElementById('getMessageButton').addEventListener('click', async () => {
            console.log('=== DEBUG: Get message button clicked ===');
            try {
                const message = await contract.getMessage();
                console.log('Received message:', message);
                document.getElementById('messageDisplay').innerText = message;
            } catch (error) {
                console.error('Read error:', error);
                alert('Ошибка чтения: ' + error.message);
            }
        });
        
        console.log('=== DEBUG: Event listeners assigned ===');
        
    } catch (error) {
        console.error('=== DEBUG: Initialization failed:', error);
        alert('Ошибка инициализации: ' + error.message);
    }
}
