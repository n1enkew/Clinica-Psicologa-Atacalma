document.addEventListener('DOMContentLoaded', () => {
    const botonContacto = document.getElementById('btnAbrirContacto');

    if (botonContacto) {
        botonContacto.addEventListener('click', () => {
            // Define el tamaño ideal para que el formulario se vea cómodo
            const ancho = 550;
            const alto = 700;
            
            // Centrar la nueva ventana en la pantalla del usuario
            const izquierda = (screen.width / 2) - (ancho / 2);
            const arriba = (screen.height / 2) - (alto / 2);

            // Abre el archivo 'contacto.html' con las dimensiones calculadas
            window.open(
                'contacto.html', 
                'ContactoAtacalma', 
                `width=${ancho},height=${alto},top=${arriba},left=${izquierda},scrollbars=yes,resizable=no`
            );
        });
    }
});