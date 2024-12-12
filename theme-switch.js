document.addEventListener('DOMContentLoaded', (event) => {
    const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
    
    if (!toggleSwitch) return; // Exit if no theme switch on page

    function switchTheme(e) {
        if (e.target.checked) {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
        }    
    }

    toggleSwitch.addEventListener('change', switchTheme, false);

    // Set initial theme
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        toggleSwitch.checked = true;
    }
});

// Add this to handle theme on page load for all pages
const theme = localStorage.getItem('theme');
if (theme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
}