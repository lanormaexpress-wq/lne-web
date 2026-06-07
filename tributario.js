document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('tributario-grid');
    const modal = document.getElementById('tributario-modal');
    const modalBody = document.getElementById('tributario-modal-body');
    const btnClose = document.getElementById('tributario-modal-close');

    let cleanupCarousel = null;

    // Cargar datos desde JSON externo
    fetch('data/tributario.json')
        .then(response => {
            if (!response.ok) throw new Error('Error de red al cargar el JSON');
            return response.json();
        })
        .then(data => {
            renderCards(data);
        })
        .catch(error => console.error("Error cargando los datos de tributario:", error));

    function renderCards(tributarioDatos) {
        tributarioDatos.forEach((curso, idx) => {
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
        if (curso.imagenes && curso.imagenes.length > 0) {
            modalBody.innerHTML = `
                <div class="carrusel-presentacion">
                    <button class="btn-expand-pdf" id="btn-expand-carrusel">
                        <i class="fa-solid fa-expand"></i> Expandir
                    </button>
                    <button class="btn-carrusel-nav" id="btn-prev">
                        <i class="fa-solid fa-chevron-left"></i>
                    </button>
                    <img id="diapositiva-actual" src="${curso.imagenes[0]}" alt="Diapositiva 1">
                    <button class="btn-carrusel-nav" id="btn-next">
                        <i class="fa-solid fa-chevron-right"></i>
                    </button>
                </div>
            `;

            const imgEl = document.getElementById('diapositiva-actual');
            const btnPrev = document.getElementById('btn-prev');
            const btnNext = document.getElementById('btn-next');
            const btnExpand = document.getElementById('btn-expand-carrusel');
            const container = document.querySelector('.carrusel-presentacion');

            let index = 0;
            const total = curso.imagenes.length;

            const actualizarCarrusel = () => {
                imgEl.src = curso.imagenes[index];
                imgEl.alt = `Diapositiva ${index + 1}`;
                btnPrev.disabled = (index === 0);
                btnNext.disabled = (index === total - 1);
            };

            actualizarCarrusel();

            btnPrev.addEventListener('click', () => {
                if (index > 0) {
                    index--;
                    actualizarCarrusel();
                }
            });

            btnNext.addEventListener('click', () => {
                if (index < total - 1) {
                    index++;
                    actualizarCarrusel();
                }
            });

            if (btnExpand && container) {
                btnExpand.addEventListener('click', () => {
                    if (!document.fullscreenElement) {
                        if (container.requestFullscreen) {
                            container.requestFullscreen();
                        } else if (container.webkitRequestFullscreen) {
                            container.webkitRequestFullscreen();
                        } else if (container.msRequestFullscreen) {
                            container.msRequestFullscreen();
                        }
                    } else {
                        if (document.exitFullscreen) {
                            document.exitFullscreen();
                        }
                    }
                });

                const onFullscreenChange = () => {
                    if (document.fullscreenElement === container) {
                        btnExpand.innerHTML = '<i class="fa-solid fa-compress"></i> Contraer';
                    } else {
                        btnExpand.innerHTML = '<i class="fa-solid fa-expand"></i> Expandir';
                    }
                };

                container.addEventListener('fullscreenchange', onFullscreenChange);
                container.addEventListener('webkitfullscreenchange', onFullscreenChange);
                container.addEventListener('msfullscreenchange', onFullscreenChange);
            }

            const handleKeydown = (e) => {
                if (modal.classList.contains('active')) {
                    if (e.key === 'ArrowRight' || e.key === 'Right') {
                        if (index < total - 1) {
                            index++;
                            actualizarCarrusel();
                        }
                    } else if (e.key === 'ArrowLeft' || e.key === 'Left') {
                        if (index > 0) {
                            index--;
                            actualizarCarrusel();
                        }
                    }
                }
            };

            document.addEventListener('keydown', handleKeydown);

            cleanupCarousel = () => {
                document.removeEventListener('keydown', handleKeydown);
            };
        } else if (curso.pdf) {
            modalBody.innerHTML = `
                <div class="pdf-container">
                    <button class="btn-expand-pdf" id="btn-expand-pdf">
                        <i class="fa-solid fa-expand"></i> Expandir
                    </button>
                    <iframe src="${curso.pdf}#toolbar=0&navpanes=0&scrollbar=0&view=Fit"></iframe>
                </div>
            `;

            const btnExpand = document.getElementById('btn-expand-pdf');
            if (btnExpand) {
                const container = btnExpand.parentElement;

                btnExpand.addEventListener('click', () => {
                    if (!document.fullscreenElement) {
                        if (container.requestFullscreen) {
                            container.requestFullscreen();
                        } else if (container.webkitRequestFullscreen) {
                            container.webkitRequestFullscreen();
                        } else if (container.msRequestFullscreen) {
                            container.msRequestFullscreen();
                        }
                    } else {
                        if (document.exitFullscreen) {
                            document.exitFullscreen();
                        }
                    }
                });

                const onFullscreenChange = () => {
                    if (document.fullscreenElement === container) {
                        btnExpand.innerHTML = '<i class="fa-solid fa-compress"></i> Contraer';
                    } else {
                        btnExpand.innerHTML = '<i class="fa-solid fa-expand"></i> Expandir';
                    }
                };

                container.addEventListener('fullscreenchange', onFullscreenChange);
                container.addEventListener('webkitfullscreenchange', onFullscreenChange);
                container.addEventListener('msfullscreenchange', onFullscreenChange);
            }
        } else {
            modalBody.innerHTML = `
                <div class="curso-modal-header">
                    <h2 class="curso-modal-title">${curso.titulo}</h2>
                </div>
                <p class="curso-modal-text">${curso.contenido}</p>
            `;
        }
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function cerrarModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        if (cleanupCarousel) {
            cleanupCarousel();
            cleanupCarousel = null;
        }
    }

    btnClose.addEventListener('click', cerrarModal);
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) cerrarModal();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) cerrarModal();
    });
});
