document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    const body = document.body;

    // 1. Comprobar si hay una preferencia guardada en el navegador
    const temaGuardado = localStorage.getItem('theme');

    // Si el usuario ya había elegido el modo oscuro, lo aplicamos de inmediato
    if (temaGuardado === 'dark') {
        body.classList.add('dark-mode');
        themeIcon.textContent = '☀️'; // Cambiamos el icono a un sol
    } else {
        themeIcon.textContent = '🌙'; // Si no, se queda la luna
    }

    // 2. Escuchar el click en el botón del tema
    themeToggle.addEventListener('click', () => {
        // El interruptor: si tiene la clase la quita, si no la tiene la pone
        body.classList.toggle('dark-mode');

        // 3. Guardar el estado actual en localStorage para que persista
        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
            themeIcon.textContent = '☀️'; // Sol para volver al modo claro
        } else {
            localStorage.setItem('theme', 'light');
            themeIcon.themeIcon = '🌙'; // Luna para volver al modo oscuro
            // Opcional: puedes usar localStorage.removeItem('theme') si prefieres limpiar la memoria
        }
    });
});