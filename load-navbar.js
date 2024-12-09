function loadNavbar() {
    fetch('navbar.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('navbar-placeholder').innerHTML = data;
            const darkModeToggle = document.getElementById('darkModeToggle');
            if (darkModeToggle) {
                darkModeToggle.addEventListener('click', function() {
                    const isDarkMode = document.documentElement.getAttribute('data-theme') === 'dark';
                    if (isDarkMode) {
                        document.documentElement.removeAttribute('data-theme');
                        localStorage.setItem('theme', 'light');
                    } else {
                        document.documentElement.setAttribute('data-theme', 'dark');
                        localStorage.setItem('theme', 'dark');
                    }
                });

                // Set initial theme based on localStorage
                if (localStorage.getItem('theme') === 'dark') {
                    document.documentElement.setAttribute('data-theme', 'dark');
                }
            }
        })
        .catch(error => console.error('Error loading navbar:', error));
}
