document.addEventListener('DOMContentLoaded', function() {
    const navbarPlaceholder = document.getElementById('navbar-placeholder');
    navbarPlaceholder.innerHTML = `
        <div class="navbar">
            <a href="index.html">Home</a>
                <a href="perk-checker.html">Perk Checker</a>
            <a href="reward-checker.html">Reward Checker</a>
        </div>
    `;
});
