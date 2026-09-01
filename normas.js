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
            searchBadge: { className: 'badge-const', label: 'Constitución' },
            category: 'constitucion'
        },
        {
            id: 'civil',
            slug: 'codigo-civil',
            url: '/legislacion/codigo-civil',
            legacyPaths: ['/civil.html', '/civil'],
            title: 'Código Civil del Perú',
            documentHeading: 'Código Civil',
            menuLabel: 'Código Civil',
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
            searchBadge: { className: 'badge-civil', label: 'Cód. Civil' },
            category: 'codigo'
        },
        {
            id: 'penal',
            slug: 'codigo-penal',
            url: '/legislacion/codigo-penal',
            legacyPaths: ['/penal.html', '/penal'],
            title: 'Código Penal del Perú',
            documentHeading: 'Código Penal',
            menuLabel: 'Código Penal',
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
            searchBadge: { className: 'badge-penal', label: 'Cód. Penal' },
            category: 'codigo'
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

        for (const variableName of norma.dataVariables) {
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
