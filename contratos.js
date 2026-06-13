function initContratos() {
    // Array dinámico de contenidos del curso, escalable
    const contratosEstructura = [
        {
            id: 1,
            titulo: "Teoría General del Contrato",
            imagen: "assets/imagenes/contratos1.png",
            contenido: "El contrato es un acuerdo de voluntades entre dos o más partes que produce consecuencias jurídicas. En esta sección abordaremos los principios fundamentales, los elementos esenciales (consentimiento, objeto, causa) y la validez de los contratos. Se analizará la autonomía de la voluntad y sus límites estructurales, preparando la base teórica aplicable a todo tipo de contrato."
        },
        {
            id: 2,
            titulo: "Contrato de Compraventa",
            imagen: "https://images.unsplash.com/photo-1556155092-490a1ba16284?auto=format&fit=crop&q=80&w=800",
            contenido: "Análisis exhaustivo del contrato de compraventa, sus características, obligaciones del vendedor (entrega, saneamiento) y del comprador (pago del precio). Incluye casos prácticos y jurisprudencia relevante sobre compraventa de bienes muebles e inmuebles, garantías y pactos especiales."
        },
        {
            id: 3,
            titulo: "Contrato de Arrendamiento",
            imagen: "https://images.unsplash.com/photo-1560518846-95cb8f43eb33?auto=format&fit=crop&q=80&w=800",
            contenido: "Estudio detallado del arrendamiento. Derechos y obligaciones del arrendador y arrendatario, causales legales y convencionales de resolución del contrato, y análisis profundo de la normativa aplicable a predios urbanos, morosidad y desalojo."
        },
        {
            id: 4,
            titulo: "Prestación de Servicios",
            imagen: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=800",
            contenido: "Régimen legal aplicable a la locación de servicios, diferencias con el contrato de trabajo, y responsabilidades derivadas del ejercicio profesional. Se evalúan escenarios de independencia, subordinación encubierta y las particularidades de la remuneración por honorarios."
        },
        {
            id: 5,
            titulo: "Contrato de Obra",
            imagen: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=800",
            contenido: "Reglas principales sobre la ejecución de obras, la responsabilidad del contratista, sumisión a planos, plazos de cumplimiento, riesgos, garantía y supuestos de ruina total o parcial en la edificación o trabajo material."
        },
        {
            id: 6,
            titulo: "Contratos Modernos",
            imagen: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800",
            contenido: "Módulo sobre contratos atípicos o contemporáneos con alta aplicación empresarial: Leasing, Factoring, Franchising, Joint Venture y Know How. Naturaleza, características, cláusulas usuales y tratamiento normativo en el marco de la economía actual."
        }
    ];

    const gridContainer = document.getElementById('cursos-grid');
    const modal = document.getElementById('curso-modal');
    const modalBody = document.getElementById('curso-modal-body');
    const modalClose = document.getElementById('curso-modal-close');

    // Renderización de tarjetas
    contratosEstructura.forEach((curso, index) => {
        // Crear estructura principal de tarjeta
        const card = document.createElement('div');
        card.className = 'curso-card';
        // Delay en la animación de aparición para lograr un efecto 'cascada'
        card.style.animationDelay = `${index * 0.15}s`;

        // Asignar el HTML a la tarjeta
        card.innerHTML = `
            <img class="curso-cover" src="${curso.imagen}" alt="${curso.titulo}">
            <div class="curso-card-overlay">
                <h3 class="curso-card-title">${curso.titulo}</h3>
            </div>
        `;

        // Lógica para abrir modal con la información respectiva
        card.addEventListener('click', () => abrirModal(curso));

        // Añadir tarjeta al grid
        gridContainer.appendChild(card);
    });

    // Funciones de control de Modal
    function abrirModal(curso) {
        // Inyectar contenido en el modal
        modalBody.innerHTML = `
            <div class="curso-modal-header">
                <h2 class="curso-modal-title">${curso.titulo}</h2>
            </div>
            <p class="curso-modal-text">${curso.contenido}</p>
        `;

        // Mostrar el modal
        modal.classList.add('active');
        // Evitar que el fondo siga haciendo scroll
        document.body.style.overflow = 'hidden';
    }

    function cerrarModal() {
        modal.classList.remove('active');
        // Restaurar el scroll del fondo
        document.body.style.overflow = '';
    }

    // Cerrar desde botón X
    modalClose.addEventListener('click', cerrarModal);

    // Cerrar dando click al fondo oscuro
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            cerrarModal();
        }
    });

    // Cerrar usando tecla Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            cerrarModal();
        }
    });
}
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initContratos);
} else {
    initContratos();
}
