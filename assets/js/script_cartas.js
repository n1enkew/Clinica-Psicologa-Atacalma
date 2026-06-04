document.addEventListener('DOMContentLoaded', () => {
    // 1. El arreglo de objetos con toda la información de Atacalma
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

    // 2. Apuntar al contenedor del HTML
    const contenedorServicios = document.getElementById('contenedor-servicios');

    // Control de seguridad: solo ejecuta si encuentra el contenedor en la página actual
    if (contenedorServicios) {
        let estructuraHtml = "";

        // 3. Recorrer el arreglo para estructurar las tarjetas
        servicios.forEach(servicio => {
            estructuraHtml += `
                <article class="col-12 col-md-6 col-lg-4">
                    <div class="card h-100 shadow-sm border-0 rounded-4">
                        <div class="card-body d-flex flex-column">
                            <h5 class="card-title text-white descripcion">${servicio.titulo}</h5>
                            <p class="fw-bold subtitulo1">${servicio.descripcion}</p>
                            <div class="mt-auto d-flex flex-column gap-2">
                                <span class="fw-bold descripcion preciofondo">${servicio.precio}</span>
                                <button type="button" class="btn btn-primary btn-sm btn-agregar-servicio" data-titulo="${servicio.titulo}">
                                    Agregar a mi lista
                                </button>
                            </div>
                        </div>
                    </div>
                </article>
            `;
        });

        // 4. Renderizar (dibujar) todo el HTML acumulado dentro del contenedor
        contenedorServicios.innerHTML = estructuraHtml;
    }
});