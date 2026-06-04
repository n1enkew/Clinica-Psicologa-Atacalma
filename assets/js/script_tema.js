document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    const body = document.body;

    // 1. Comprobar si hay una preferencia guardada en el navegador
    const temaGuardado = localStorage.getItem('theme');

    // Si el usuario ya había elegido el modo oscuro, lo aplicamos de inmediato
    if (temaGuardado === 'dark') {
        body.classList.add('dark-mode');
    }

    // 2. Escuchar el click en el botón del tema
    themeToggle.addEventListener('click', () => {
        // El interruptor: si tiene la clase la quita, si no la tiene la pone
        body.classList.toggle('dark-mode');

        // 3. Guardar el estado actual en localStorage para que persista
        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');

        } else {
            localStorage.setItem('theme', 'light');

            // Opcional: puedes usar localStorage.removeItem('theme') si prefieres limpiar la memoria
        }
    });
});