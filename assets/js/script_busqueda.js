document.getElementById('buscadorSecciones').addEventListener('input', function(e) {
    const inputValue = e.target.value;
    const options = document.getElementById('opcionesSecciones').options;
    
    // Recorremos las opciones del datalist para ver si coincide con lo escrito
    for (let i = 0; i < options.length; i++) {
        if (options[i].value === inputValue) {
            const url = options[i].getAttribute('data-url');
            
            if (url) {
                // Si el enlace es externo (empieza con http), lo abre en pestaña nueva
                if (url.startsWith('http')) {
                    window.open(url, '_blank');
                } else {
                    // Si es un id interno (#), se desplaza en la misma página
                    window.location.href = url;
                }
                
                // Limpia el buscador después de redirigir
                e.target.value = ''; 
            }
            break;
        }
    }
});