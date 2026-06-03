document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menuToggle');
    const menuNav = document.getElementById('navbarNav');

    menuToggle.addEventListener('click', () => {
        menuNav.classList.toggle('show');
    });
});