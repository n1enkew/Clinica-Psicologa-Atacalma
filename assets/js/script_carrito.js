document.addEventListener('DOMContentLoaded', () => {
    // Lista de servicios disponibles en Atacalma.
    // Cada servicio tiene título, descripción y precio.
    const servicios = [
        {
            titulo: "Evaluación de habilidades parentales",
            descripcion: "Se realiza evaluación de habilidades y competencias parentales con metodología clara y específica, utilizando herramientas necesarias para cada caso, incorporando elementos tanto de parentalidad positiva, observación del vínculo, indicadores de personalidad y realizando gestiones necesarias para obtener una evaluación integral. El promedio de sesiones para esta evaluación puede variar según cada caso.",
            precio: "Desde $20.000"
        },
        {
            titulo: "Evaluación y diagnóstico",
            descripcion: "Se realiza una evaluación y diagnóstico de personalidad, evaluación y diagnóstico de habilidades y/o competencias parentales.",
            precio: "Desde $35.000"
        },
        {
            titulo: "Psicoterapia",
            descripcion: "Se realiza acompañamiento psicoterapéutico centrado en la entrega de herramientas con las que los consultantes puedan comprender, internalizar y utilizar estrategias que le permitan sentirse mejor, avanzar y recuperar su bienestar.",
            precio: "Desde $28.000"
        },
        {
            titulo: "Consulta para Psicología",
            descripcion: "La duración de la consulta es de 45 minutos.",
            precio: "Desde $35.000"
        },
        {
            titulo: "Consulta Online",
            descripcion: "La duración de la consulta es de 45 minutos.",
            precio: "Desde $20.000"
        }
    ];

    // Clave para guardar el carrito temporal en sessionStorage.
    const carritoKey = 'atacalmaCarritoTemporal';

    // Cargar carrito desde la sesión o iniciar vacío.
    const carrito = cargarCarritoSession();
    const contenedorCarrito = document.getElementById('carrito-servicios');
    const mensajeCarrito = document.getElementById('carrito-mensaje');
    const botonVaciar = document.getElementById('vaciar-carrito');

    // Guarda el arreglo de servicios seleccionado en sessionStorage.
    function guardarCarritoSession() {
        sessionStorage.setItem(carritoKey, JSON.stringify(carrito));
    }

    // Recupera el carrito desde sessionStorage.
    function cargarCarritoSession() {
        const datos = sessionStorage.getItem(carritoKey);
        if (!datos) {
            return [];
        }

        try {
            const parsed = JSON.parse(datos);
            return Array.isArray(parsed) ? parsed : [];
        } catch (error) {
            // Si los datos no son JSON válido, se usa un carrito vacío.
            return [];
        }
    }

    // Renderiza los servicios guardados en el carrito dentro del HTML.
    function renderizarCarrito() {
        if (!contenedorCarrito) {
            return;
        }

        if (carrito.length === 0) {
            contenedorCarrito.innerHTML = `
                <p class="descripcion text-secondary mb-0">No hay servicios seleccionados. Agrega uno desde la lista de servicios.</p>
            `;
            return;
        }

        const elementos = carrito.map(servicio => `
            <div class="d-flex justify-content-between align-items-start border-bottom py-3">
                <div class="me-3">
                    <strong>${servicio.titulo}</strong>
                    <p class="mb-1 text-muted small">${servicio.descripcion}</p>
                    <span class="fw-semibold">${servicio.precio}</span>
                </div>
                <div class="text-end">
                    <button type="button" class="btn btn-sm btn-link text-danger btn-eliminar-servicio" data-titulo="${servicio.titulo}">
                        Eliminar
                    </button>
                </div>
            </div>
        `).join('');

        contenedorCarrito.innerHTML = `
            <div class="d-flex justify-content-between align-items-center mb-3">
                <span class="fw-bold">Servicios seleccionados: ${carrito.length}</span>
            </div>
            ${elementos}
        `;
    }

    // Muestra mensajes temporales al usuario.
    function actualizarMensaje(texto, tipo = 'success') {
        if (!mensajeCarrito) {
            return;
        }

        mensajeCarrito.textContent = texto;
        mensajeCarrito.className = `small mb-2 text-${tipo === 'error' ? 'danger' : tipo}`;
        setTimeout(() => {
            if (mensajeCarrito) {
                mensajeCarrito.textContent = '';
            }
        }, 2500);
    }

    // Agrega un servicio a la lista temporal si no existe ya.
    function agregarServicio(titulo) {
        const servicio = servicios.find(item => item.titulo === titulo);
        if (!servicio) {
            actualizarMensaje('No se encontró el servicio seleccionado.', 'error');
            return;
        }

        const yaExiste = carrito.some(item => item.titulo === titulo);
        if (yaExiste) {
            actualizarMensaje('El servicio ya está en tu lista temporal.', 'info');
            return;
        }

        carrito.push(servicio);
        guardarCarritoSession();
        renderizarCarrito();
        actualizarMensaje(`Servicio agregado: ${titulo}`);
    }

    // Elimina un servicio del carrito según su título.
    function eliminarServicio(titulo) {
        const indice = carrito.findIndex(item => item.titulo === titulo);
        if (indice < 0) {
            actualizarMensaje('No se pudo eliminar el servicio.', 'error');
            return;
        }

        carrito.splice(indice, 1);
        guardarCarritoSession();
        renderizarCarrito();
        actualizarMensaje(`Servicio eliminado: ${titulo}`, 'info');
    }

    // Limpia todos los servicios de la lista temporal.
    function vaciarCarrito() {
        if (carrito.length === 0) {
            actualizarMensaje('La lista ya está vacía.', 'info');
            return;
        }

        carrito.splice(0, carrito.length);
        guardarCarritoSession();
        renderizarCarrito();
        actualizarMensaje('Lista temporal vaciada.', 'info');
    }

    // Escucha clics en botones de la página para acciones del carrito.
    document.body.addEventListener('click', event => {
        const agregarBtn = event.target.closest('.btn-agregar-servicio');
        const eliminarBtn = event.target.closest('.btn-eliminar-servicio');
        const vaciarBtn = event.target.closest('#vaciar-carrito');

        if (agregarBtn) {
            const titulo = agregarBtn.dataset.titulo;
            agregarServicio(titulo);
            return;
        }

        if (eliminarBtn) {
            const titulo = eliminarBtn.dataset.titulo;
            eliminarServicio(titulo);
            return;
        }

        if (vaciarBtn) {
            vaciarCarrito();
            return;
        }
    });

    // Mostrar el carrito en pantalla al cargar la página.
    renderizarCarrito();
});