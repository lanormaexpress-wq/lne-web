document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('penal-grid');
    const modal = document.getElementById('penal-modal');
    const modalBody = document.getElementById('penal-modal-body');
    const btnClose = document.getElementById('penal-modal-close');

    // Cargar datos desde JSON externo
    fetch('data/penal.json')
        .then(response => {
            if (!response.ok) throw new Error('Error de red al cargar el JSON');
            return response.json();
        })
        .then(data => {
            renderCards(data);
        })
        .catch(error => console.error("Error cargando los datos de penal económico:", error));

    function renderCards(penalDatos) {
        penalDatos.forEach((curso, idx) => {
            const card = document.createElement('div');
            // Usamos las clases genéricas de curso presentes en style.css
            card.className = 'curso-card';
            card.style.animationDelay = `${idx * 0.1}s`;
            
            card.innerHTML = `
                <img class="curso-cover" src="${curso.imagen}" alt="${curso.titulo}">
                <div class="curso-card-overlay">
                    <h3 class="curso-card-title">${curso.titulo}</h3>
                </div>
            `;

            card.addEventListener('click', () => abrirModal(curso));
            grid.appendChild(card);
        });
    }

    function abrirModal(curso) {
        modalBody.innerHTML = `
            <div class="curso-modal-header">
                <h2 class="curso-modal-title">${curso.titulo}</h2>
            </div>
            <p class="curso-modal-text">${curso.contenido}</p>
        `;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function cerrarModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    btnClose.addEventListener('click', cerrarModal);
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) cerrarModal();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) cerrarModal();
    });
});
