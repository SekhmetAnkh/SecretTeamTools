const excludedWallets = [
    "0xE18F094DDd37f0eB2b651b65C4Aad080aFe90e51"
];

// Check for saved theme preference on load
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    document.body.classList.toggle('dark-mode', savedTheme === 'dark');
    document.getElementById('themeToggle').checked = savedTheme === 'dark';
}

// Toggle dark mode on switch
document.getElementById('themeToggle').onclick = () => {
    document.body.classList.toggle('dark-mode');
    const newTheme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
    localStorage.setItem('theme', newTheme); // Save user preference
};

document.getElementById('checkButton').onclick = async () => {
    const walletAddress = document.getElementById('walletAddress').value;
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';
    const redeemedTotal = document.getElementById('redeemedTotal');

    try {
        // Fetch PLU transaction data from Etherscan (using your API key)
        const response = await fetch(`https://api.etherscan.io/api?module=account&action=tokentx&contractaddress=0xD8912C10681D8B21Fd3742244f44658dBA12264E&address=${walletAddress}&apikey=USS41WYMMAIRJZ2EH8BDRV8G395CEU4GPH`);
        const data = await response.json();

        let totalPLU = 0;
        let redeemedPLU = 0;
        let outgoingPLU = 0;

        if (data.result.length > 0) {
            data.result.forEach(tx => {
                const value = parseFloat(tx.value) / 1e18; // Convert from wei to PLU
                if (excludedWallets.includes(tx.to)) {
                    redeemedPLU += value; // Count redeemed amounts
                } else if (tx.from === walletAddress) {
                    outgoingPLU += value; // Count outgoing amounts
                } else {
                    totalPLU += value; // Count total incoming amounts
                }
            });
        }

        // Calculate remaining PLU
        const remainingPLU = totalPLU - outgoingPLU;

        // Display results
        resultsDiv.innerHTML = `
            <p>Total PLU Incoming: ${totalPLU.toFixed(4)}</p>
            <p>Total PLU Outgoing: ${outgoingPLU.toFixed(4)}</p>
            <p>Remaining PLU: ${remainingPLU.toFixed(4)}</p>
        `;
        
        // Update redeemed total
        redeemedTotal.innerText = redeemedPLU.toFixed(4);

    } catch (error) {
        console.error('Error fetching transaction data:', error);
        resultsDiv.innerHTML = `<p>Error fetching data. Please try again.</p>`;
    }
};
