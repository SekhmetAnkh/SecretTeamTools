// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    const checkbox = document.querySelector('input[type="checkbox"]');
    
    // Set initial state of checkbox based on current theme
    if (localStorage.getItem('theme') === 'dark') {
        checkbox.checked = true;
        document.documentElement.setAttribute('data-theme', 'dark');
    }

    // Add change event listener
    checkbox.addEventListener('change', function() {
        if (this.checked) {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
        }
    });
});