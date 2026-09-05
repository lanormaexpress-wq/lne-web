(function () {
    const normas = [
        {
            id: 'constitucion',
            slug: 'constitucion',
            url: '/legislacion/constitucion',
            legacyPaths: ['/constitucion.html', '/constitucion'],
            title: 'Constitución Política del Perú 1993',
            documentHeading: 'Constitución Política<br>del Perú',
            menuLabel: 'Constitución Política',
            icon: 'fa-landmark',
            featured: true,
            featuredOrder: 1,
            status: 'ready',
            category: 'Otras normas',
            aliases: ['Constitución', 'Carta Magna', 'Constitución de 1993'],
            contentScript: '/constitucion.js?v=4',
            dataVariables: ['Constitucion'],
            introduction: `Nacida tras el autogolpe de 1992 liderado por Alberto Fujimori, la Constitución de 1993 fue
                    redactada por un Congreso Constituyente Democrático y ratificada vía referéndum. Este texto instauró
                    una economía social de mercado, reforzó el Poder Ejecutivo y creó la Defensoría del Pueblo,
                    reemplazando a la carta de 1979.

                    Su promulgación es el capítulo más reciente de una historia republicana marcada por la inestabilidad
                    jurídica. En dos siglos, el Perú ha sido regido por un total de 12 constituciones nacionales: 1823,
                    1826, 1828, 1834, 1839, 1856, 1860, 1867, 1920, 1933, 1979 y 1993. A este listado se suma una
                    experiencia excepcional: la Constitución de la Confederación Perú-Boliviana de 1837 (Pacto de
                    Tacna), un audaz proyecto de integración supranacional que unió brevemente a ambos países,
                    completando el complejo panorama constitucional peruano.`,
            image: {
                src: 'assets/imagenes/portada-consti.png',
                alt: 'Portada Constitución',
                className: 'intro-portada-consti'
            },
            homeCard: {
                title: 'Constitución',
                description: 'Base del Estado, garantía de derechos y expresión de la soberanía del pueblo.',
                image: 'assets/imagenes/icono-consti.png',
                imageAlt: 'Icono Constitución'
            },
            searchTerms: 'constitucion de 1993',
            searchBadge: { className: 'badge-const', label: 'Constitución' }
        },
        {
            id: 'civil',
            slug: 'codigo-civil',
            url: '/legislacion/codigo-civil',
            legacyPaths: ['/civil.html', '/civil'],
            title: 'Código Civil del Perú',
            documentHeading: 'Código Civil',
            menuLabel: 'Código Civil',
            icon: 'fa-book-open',
            featured: true,
            featuredOrder: 2,
            status: 'ready',
            category: 'Códigos',
            aliases: ['Código Civil', 'Civil', 'Decreto Legislativo 295'],
            contentScript: '/civil.js?v=4',
            dataVariables: ['CodigoCivil', 'Civil'],
            introduction: `El Código Civil peruano vigente, aprobado mediante Decreto Legislativo N.º 295, fue promulgado en
                    1984 y entró en vigencia el 14 de noviembre de ese mismo año,
                    reemplazando al Código Civil de 1936. Este cuerpo normativo regula las principales relaciones
                    jurídicas de la vida privada, desde la persona, la familia y las sucesiones,
                    hasta los derechos reales, las obligaciones, los contratos, la prescripción, los registros públicos
                    y el derecho internacional privado. Su importancia radica en que
                    organiza jurídicamente gran parte de la vida cotidiana de las personas, estableciendo reglas sobre
                    la capacidad, la propiedad, los vínculos familiares, la herencia,
                    los actos jurídicos y las relaciones patrimoniales. Aunque conserva una estructura clásica propia
                    del Derecho Civil, ha sido modificado progresivamente para responder a
                    nuevas realidades sociales y jurídicas, manteniéndose como una de las bases esenciales del
                    ordenamiento jurídico peruano y como punto de referencia para comprender cómo
                    el Derecho regula la convivencia entre particulares.`,
            image: {
                src: 'assets/imagenes/portada-civil.png',
                alt: 'Portada Código Civil',
                className: 'intro-portada-civil'
            },
            homeCard: {
                title: 'Derecho Civil',
                description: 'La ley regula la convivencia y protege la dignidad de la persona.',
                image: 'assets/imagenes/icono-civil.png',
                imageAlt: 'Icono Civil'
            },
            searchTerms: 'codigo civil de 1984',
            searchBadge: { className: 'badge-civil', label: 'Cód. Civil' }
        },
        {
            id: 'penal',
            slug: 'codigo-penal',
            url: '/legislacion/codigo-penal',
            legacyPaths: ['/penal.html', '/penal'],
            title: 'Código Penal del Perú',
            documentHeading: 'Código Penal',
            menuLabel: 'Código Penal',
            icon: 'fa-scale-balanced',
            featured: true,
            featuredOrder: 3,
            status: 'ready',
            category: 'Códigos',
            aliases: ['Código Penal', 'Penal', 'Decreto Legislativo 635'],
            contentScript: '/penal.js?v=4',
            dataVariables: ['CodigoPenal'],
            introduction: `El Código Penal peruano vigente, aprobado mediante Decreto Legislativo N.º
                    635 en 1991, constituye el principal instrumento normativo del Estado para
                    definir los delitos, establecer las penas y orientar la respuesta jurídica frente a
                    las conductas que afectan bienes jurídicos fundamentales como la vida, la
                    libertad, el patrimonio, la seguridad pública y la administración pública. Su
                    origen responde a la necesidad de modernizar la legislación penal peruana y
                    superar los límites del Código Penal de 1924, incorporando una estructura más
                    acorde con los principios de legalidad, culpabilidad, proporcionalidad y mínima
                    intervención del Derecho Penal. A lo largo de los años, este cuerpo normativo
                    ha sido objeto de múltiples reformas, reflejo de los cambios sociales, políticos y
                    criminales del país, especialmente frente a fenómenos como la corrupción, la
                    criminalidad organizada, la violencia y los delitos económicos. Por ello, el
                    Código Penal no solo representa un catálogo de sanciones, sino también una
                    expresión del poder punitivo del Estado y de los límites que este debe respetar
                    en una sociedad democrática.`,
            image: {
                src: 'assets/imagenes/portada-penal.png',
                alt: 'Portada Código Penal',
                className: 'intro-portada'
            },
            homeCard: {
                title: 'Derecho Penal',
                description: 'Sin justicia no hay orden, y sin ley no hay justicia.',
                image: 'assets/imagenes/icono-penal.png',
                imageAlt: 'Icono Penal'
            },
            searchTerms: 'codigo penal de 1991',
            searchBadge: { className: 'badge-penal', label: 'Cód. Penal' }
        },
        {
            id: 'procesal-civil',
            slug: 'codigo-procesal-civil',
            url: '/legislacion/codigo-procesal-civil',
            title: 'Código Procesal Civil',
            menuLabel: 'Código Procesal Civil',
            icon: 'fa-gavel',
            featured: true,
            featuredOrder: 4,
            status: 'preparing',
            category: 'Procesal',
            aliases: ['Procesal Civil', 'CPC']
        },
        {
            id: 'procesal-penal',
            slug: 'codigo-procesal-penal',
            url: '/legislacion/codigo-procesal-penal',
            title: 'Código Procesal Penal',
            menuLabel: 'Código Procesal Penal',
            icon: 'fa-gavel',
            featured: true,
            featuredOrder: 5,
            status: 'preparing',
            category: 'Procesal',
            aliases: ['Procesal Penal', 'CPP']
        },
        {
            id: 'procesal-constitucional',
            slug: 'codigo-procesal-constitucional',
            url: '/legislacion/codigo-procesal-constitucional',
            title: 'Código Procesal Constitucional',
            menuLabel: 'Código Procesal Constitucional',
            icon: 'fa-building-columns',
            featured: true,
            featuredOrder: 6,
            status: 'preparing',
            category: 'Procesal',
            aliases: ['Procesal Constitucional', 'CPConst']
        },
        {
            id: 'tributario',
            slug: 'codigo-tributario',
            url: '/legislacion/codigo-tributario',
            title: 'Código Tributario',
            menuLabel: 'Código Tributario',
            icon: 'fa-receipt',
            featured: false,
            status: 'preparing',
            category: 'Tributario y administrativo',
            aliases: ['Tributario']
        },
        {
            id: 'ley-27444',
            slug: 'ley-27444',
            url: '/legislacion/ley-27444',
            title: 'Ley N.º 27444 – Ley del Procedimiento Administrativo General',
            menuLabel: 'Ley N.º 27444',
            icon: 'fa-file-lines',
            featured: false,
            status: 'preparing',
            category: 'Tributario y administrativo',
            aliases: ['Ley 27444', 'Procedimiento Administrativo General', 'LPAG']
        },
        {
            id: 'decreto-legislativo-728',
            slug: 'decreto-legislativo-728',
            url: '/legislacion/decreto-legislativo-728',
            title: 'TUO del Decreto Legislativo N.º 728 – Ley de Productividad y Competitividad Laboral',
            menuLabel: 'D. Leg. N.º 728',
            icon: 'fa-briefcase',
            featured: false,
            status: 'preparing',
            category: 'Laboral',
            aliases: ['Decreto Legislativo 728', 'Productividad y Competitividad Laboral', 'LPCL']
        },
        {
            id: 'ley-29571',
            slug: 'ley-29571',
            url: '/legislacion/ley-29571',
            title: 'Ley N.º 29571 – Código de Protección y Defensa del Consumidor',
            menuLabel: 'Ley N.º 29571',
            icon: 'fa-cart-shopping',
            featured: false,
            status: 'preparing',
            category: 'Civil y comercial',
            aliases: ['Ley 29571', 'Código del Consumidor', 'Protección al Consumidor']
        },
        {
            id: 'decreto-legislativo-1034',
            slug: 'decreto-legislativo-1034',
            url: '/legislacion/decreto-legislativo-1034',
            title: 'Decreto Legislativo N.º 1034 – Ley de Represión de Conductas Anticompetitivas',
            menuLabel: 'D. Leg. N.º 1034',
            icon: 'fa-chart-line',
            featured: false,
            status: 'preparing',
            category: 'Civil y comercial',
            aliases: ['Decreto Legislativo 1034', 'Conductas Anticompetitivas']
        },
        {
            id: 'decreto-legislativo-1044',
            slug: 'decreto-legislativo-1044',
            url: '/legislacion/decreto-legislativo-1044',
            title: 'Decreto Legislativo N.º 1044 – Ley de Represión de la Competencia Desleal',
            menuLabel: 'D. Leg. N.º 1044',
            icon: 'fa-scale-balanced',
            featured: false,
            status: 'preparing',
            category: 'Civil y comercial',
            aliases: ['Decreto Legislativo 1044', 'Competencia Desleal']
        },
        {
            id: 'decreto-legislativo-1106',
            slug: 'decreto-legislativo-1106',
            url: '/legislacion/decreto-legislativo-1106',
            title: 'Decreto Legislativo N.º 1106 – Lucha Eficaz contra el Lavado de Activos y otros delitos relacionados',
            menuLabel: 'D. Leg. N.º 1106',
            icon: 'fa-shield-halved',
            featured: false,
            status: 'preparing',
            category: 'Penal',
            aliases: ['Decreto Legislativo 1106', 'Lavado de Activos']
        },
        {
            id: 'ley-29497',
            slug: 'ley-29497',
            url: '/legislacion/ley-29497',
            title: 'Ley N.º 29497 – Nueva Ley Procesal del Trabajo',
            menuLabel: 'Ley N.º 29497',
            icon: 'fa-scale-balanced',
            featured: false,
            status: 'preparing',
            category: 'Procesal',
            aliases: ['Ley 29497', 'Nueva Ley Procesal del Trabajo', 'NLPT']
        },
        {
            id: 'comercio',
            slug: 'codigo-de-comercio',
            url: '/legislacion/codigo-de-comercio',
            title: 'Código de Comercio',
            menuLabel: 'Código de Comercio',
            icon: 'fa-store',
            featured: false,
            status: 'preparing',
            category: 'Códigos',
            aliases: ['Comercio']
        },
        {
            id: 'ninos-adolescentes',
            slug: 'codigo-de-los-ninos-y-adolescentes',
            url: '/legislacion/codigo-de-los-ninos-y-adolescentes',
            title: 'Código de los Niños y Adolescentes',
            menuLabel: 'Código de los Niños y Adolescentes',
            icon: 'fa-children',
            featured: false,
            status: 'preparing',
            category: 'Niñez y familia',
            aliases: ['Niños y Adolescentes', 'Código de la Niñez']
        },
        {
            id: 'ejecucion-penal',
            slug: 'codigo-de-ejecucion-penal',
            url: '/legislacion/codigo-de-ejecucion-penal',
            title: 'Código de Ejecución Penal',
            menuLabel: 'Código de Ejecución Penal',
            icon: 'fa-lock',
            featured: false,
            status: 'preparing',
            category: 'Penal',
            aliases: ['Ejecución Penal']
        },
        {
            id: 'responsabilidad-penal-adolescentes',
            slug: 'codigo-de-responsabilidad-penal-de-adolescentes',
            url: '/legislacion/codigo-de-responsabilidad-penal-de-adolescentes',
            title: 'Código de Responsabilidad Penal de Adolescentes',
            menuLabel: 'Código de Responsabilidad Penal de Adolescentes',
            icon: 'fa-user-shield',
            featured: false,
            status: 'preparing',
            category: 'Penal',
            aliases: ['Responsabilidad Penal de Adolescentes']
        },
        {
            id: 'ley-26887',
            slug: 'ley-26887',
            url: '/legislacion/ley-26887',
            title: 'Ley N.º 26887 – Ley General de Sociedades',
            menuLabel: 'Ley N.º 26887',
            icon: 'fa-building',
            featured: false,
            status: 'preparing',
            category: 'Civil y comercial',
            aliases: ['Ley 26887', 'Ley General de Sociedades', 'LGS']
        },
        {
            id: 'ley-28611',
            slug: 'ley-28611',
            url: '/legislacion/ley-28611',
            title: 'Ley N.º 28611 – Ley General del Ambiente',
            menuLabel: 'Ley N.º 28611',
            icon: 'fa-leaf',
            featured: false,
            status: 'preparing',
            category: 'Otras normas',
            aliases: ['Ley 28611', 'Ley General del Ambiente']
        },
        {
            id: 'ley-29783',
            slug: 'ley-29783',
            url: '/legislacion/ley-29783',
            title: 'Ley N.º 29783 – Ley de Seguridad y Salud en el Trabajo',
            menuLabel: 'Ley N.º 29783',
            icon: 'fa-helmet-safety',
            featured: false,
            status: 'preparing',
            category: 'Laboral',
            aliases: ['Ley 29783', 'Seguridad y Salud en el Trabajo', 'SST']
        },
        {
            id: 'ley-27809',
            slug: 'ley-27809',
            url: '/legislacion/ley-27809',
            title: 'Ley N.º 27809 – Ley General del Sistema Concursal',
            menuLabel: 'Ley N.º 27809',
            icon: 'fa-building-columns',
            featured: false,
            status: 'preparing',
            category: 'Civil y comercial',
            aliases: ['Ley 27809', 'Ley General del Sistema Concursal']
        },
        {
            id: 'ley-27972',
            slug: 'ley-27972',
            url: '/legislacion/ley-27972',
            title: 'Ley N.º 27972 – Ley Orgánica de Municipalidades',
            menuLabel: 'Ley N.º 27972',
            icon: 'fa-city',
            featured: false,
            status: 'preparing',
            category: 'Otras normas',
            aliases: ['Ley 27972', 'Ley Orgánica de Municipalidades', 'Municipalidades']
        }
    ];

    if (typeof module !== 'undefined' && module.exports) {
        module.exports = normas;
        return;
    }

    const dataCache = Object.create(null);

    function normalizePath(pathName) {
        const cleanPath = String(pathName || '/')
            .split('?')[0]
            .split('#')[0]
            .replace(/\/+$/, '');
        return cleanPath || '/';
    }

    function getById(id) {
        return normas.find(norma => norma.id === id) || null;
    }

    function getByPath(pathName) {
        const normalizedPath = normalizePath(pathName).toLowerCase();
        return normas.find(norma => {
            if (norma.url.toLowerCase() === normalizedPath) return true;
            return (norma.legacyPaths || []).some(path => path.toLowerCase() === normalizedPath);
        }) || null;
    }

    function captureData(norma) {
        if (!norma) return undefined;
        if (dataCache[norma.id]) return dataCache[norma.id];

        for (const variableName of norma.dataVariables || []) {
            if (!/^[A-Za-z_$][A-Za-z0-9_$]*$/.test(variableName)) continue;

            const bridge = document.createElement('script');
            bridge.textContent = `window.__lneNormaDataBridge = typeof ${variableName} !== 'undefined' ? ${variableName} : undefined;`;
            document.head.appendChild(bridge);
            bridge.remove();

            if (window.__lneNormaDataBridge) {
                dataCache[norma.id] = window.__lneNormaDataBridge;
                delete window.__lneNormaDataBridge;
                return dataCache[norma.id];
            }

            delete window.__lneNormaDataBridge;
        }

        return undefined;
    }

    window.LNENormas = Object.freeze({
        all: normas,
        getById,
        getByPath,
        captureData,
        normalizePath
    });
})();
