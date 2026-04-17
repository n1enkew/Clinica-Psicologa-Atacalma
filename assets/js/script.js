window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
          
          // Si bajamos más de 50px, añadimos la clase de la sombra
    if (window.scrollY > 50) {
        navbar.classList.add('shadow-scroll');
    } else {
            // Si volvemos arriba, se la quitamos
        navbar.classList.remove('shadow-scroll');
}
});