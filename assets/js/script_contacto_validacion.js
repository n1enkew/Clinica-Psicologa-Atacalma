document.addEventListener('DOMContentLoaded', () => {
    // 1. Conectamos el script con el ID del formulario del HTML
    const form = document.getElementById('contactForm');

    if (form) {
        form.addEventListener('submit', (e) => {
            // Evitamos que la ventana se cierre o recargue automáticamente
            e.preventDefault(); 

            // 2. Capturamos los valores eliminando espacios vacíos intencionales (.trim())
            const nombreVal = document.getElementById('nombre').value.trim();
            const emailVal = document.getElementById('email').value.trim();
            const mensajeVal = document.getElementById('mensaje').value.trim();

            let formularioValido = true;

            // --- VALIDACIÓN DEL CAMPO: NOMBRE ---
            if (!nombreVal) {
                mostrarError('nombre', 'El nombre completo es obligatorio.');
                formularioValido = false;
            } else if (nombreVal.length < 3) {
                mostrarError('nombre', 'El nombre debe tener al menos 3 caracteres.');
                formularioValido = false;
            } else {
                limpiarError('nombre');
            }

            // --- VALIDACIÓN DEL CAMPO: EMAIL ---
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Expresión regular para formato de correo
            if (!emailVal) {
                mostrarError('email', 'El correo electrónico es obligatorio.');
                formularioValido = false;
            } else if (!emailRegex.test(emailVal)) {
                mostrarError('email', 'Ingresa un correo válido (ejemplo: nombre@correo.com).');
                formularioValido = false;
            } else {
                limpiarError('email');
            }

            // --- VALIDACIÓN DEL CAMPO: MENSAJE ---
            if (!mensajeVal) {
                mostrarError('mensaje', 'El mensaje o consulta no puede estar vacío.');
                formularioValido = false;
            } else if (mensajeVal.length < 10) {
                mostrarError('mensaje', 'Por favor, describe tu consulta con más detalle (mínimo 10 caracteres).');
                formularioValido = false;
            } else {
                limpiarError('mensaje');
            }

            // 3. SI TODO ESTÁ CORRECTO, PROCESAMOS DE FORMA SEGURA
            if (formularioValido) {
                // Sanitización básica de entradas (Prevención de XSS)
                const nombreSeguro = sanitizarEntrada(nombreVal);
                const emailSeguro = sanitizarEntrada(emailVal);
                const mensajeSeguro = sanitizarEntrada(mensajeVal);

                // Aquí simularías el envío a tu base de datos o sistema de correos
                console.log("Datos seguros listos:", { nombreSeguro, emailSeguro, mensajeSeguro });

                alert("¡Mensaje enviado con éxito! Nos pondremos en contacto a la brevedad.");
                
                // Limpia el formulario y cierra la ventana emergente automáticamente tras el éxito
                form.reset();
                // Cierra la modal automáticamente tras el éxito
                const modalElement = document.getElementById('contactoModal');
                const modalBootstrap = bootstrap.Modal.getInstance(modalElement);
                if (modalBootstrap) {
                    modalBootstrap.hide();
                }
            }
        });
    }
});

// FUNCIÓN AUXILIAR: Muestra el error visual usando clases de Bootstrap 5
function mostrarError(idCampo, mensajeError) {
    const campo = document.getElementById(idCampo);
    const contenedorError = document.getElementById(`error-${idCampo}`);
    
    campo.classList.remove('is-valid');
    campo.classList.add('is-invalid'); // Pone el borde del input en rojo
    contenedorError.textContent = mensajeError; // Inyecta el texto de alerta
}

// FUNCIÓN AUXILIAR: Limpia el error si el usuario corrige el dato
function limpiarError(idCampo) {
    const campo = document.getElementById(idCampo);
    campo.classList.remove('is-invalid');
    campo.classList.add('is-valid'); // Pone el borde del input en verde de aprobado
}

// FUNCIÓN AUXILIAR: Sanitización contra XSS (Inyección de código)
function sanitizarEntrada(str) {
    const mapaEntidades = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#x27;',
        '/': '&#x2F;'
    };
    return str.replace(/[&<>"'/]/g, (match) => mapaEntidades[match]);
}