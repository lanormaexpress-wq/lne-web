(function () {
    const areas = [
        {
            id: 'fundamentos',
            slug: 'fundamentos-y-teoria-del-derecho',
            name: 'Fundamentos y Teoría del Derecho',
            description: 'Comprende las bases filosóficas, históricas y políticas que estructuran el ordenamiento jurídico.',
            icon: 'area-fundamentos',
            route: '/formacion/fundamentos-y-teoria-del-derecho'
        },
        {
            id: 'civil-privado',
            slug: 'derecho-civil-y-privado',
            name: 'Derecho Civil y Privado',
            description: 'Explora cursos fundamentales del ámbito civil, patrimonial y privado.',
            icon: 'area-civil',
            route: '/formacion/derecho-civil-y-privado'
        },
        {
            id: 'constitucional-publico',
            slug: 'derecho-constitucional-y-publico',
            name: 'Derecho Constitucional y Público',
            description: 'Analiza la organización del Estado, la administración pública y la defensa de los derechos fundamentales.',
            icon: 'area-publico',
            route: '/formacion/derecho-constitucional-y-publico'
        },
        {
            id: 'penal',
            slug: 'derecho-penal',
            name: 'Derecho Penal',
            description: 'Profundiza en la teoría del delito, las consecuencias jurídicas y el marco normativo de la imputación.',
            icon: 'area-penal',
            route: '/formacion/derecho-penal'
        },
        {
            id: 'procesal-litigacion',
            slug: 'derecho-procesal-y-litigacion',
            name: 'Derecho Procesal y Litigación',
            description: 'Domina las reglas procesales, la estrategia de defensa y las técnicas de litigación en diversas materias.',
            icon: 'area-procesal',
            route: '/formacion/derecho-procesal-y-litigacion'
        },
        {
            id: 'laboral-tributario-empresarial',
            slug: 'derecho-laboral-tributario-y-empresarial',
            name: 'Derecho Laboral, Tributario y Empresarial',
            description: 'Estudia las relaciones de trabajo, el sistema tributario y el marco jurídico de la actividad empresarial.',
            icon: 'area-empresarial',
            route: '/formacion/derecho-laboral-tributario-y-empresarial'
        },
        {
            id: 'especialidades-practica',
            slug: 'especialidades-y-practica-juridica',
            name: 'Especialidades y Práctica Jurídica',
            description: 'Aplica tus conocimientos en áreas especializadas, mecanismos registrales y el ejercicio ético de la profesión.',
            icon: 'area-practica',
            route: '/formacion/especialidades-y-practica-juridica'
        }
    ];

    const courses = [
        course('argumentacion-juridica', 'argumentacion-juridica', 'Argumentación Jurídica', 'fundamentos', 'argumentacion-juridica', {
            legacyPaths: ['/argumentacion.html', '/argumentacion', '/cursos/argumentacion-juridica']
        }),
        course('introduccion-derecho', 'introduccion-al-derecho', 'Introducción al Derecho', 'fundamentos', 'introduccion-derecho'),
        course('historia-derecho-romano', 'historia-del-derecho-y-derecho-romano', 'Historia del Derecho y Derecho Romano', 'fundamentos', 'historia-derecho-romano'),
        course('filosofia-derecho', 'filosofia-del-derecho', 'Filosofía del Derecho', 'fundamentos', 'filosofia-derecho'),
        course('ciencia-politica', 'ciencia-politica', 'Ciencia Política', 'fundamentos', 'ciencia-politica'),

        course('derecho-personas', 'derecho-de-personas', 'Derecho de Personas', 'civil-privado', 'derecho-personas'),
        course('instituciones-derecho-civil', 'instituciones-del-derecho-civil', 'Instituciones del Derecho Civil', 'civil-privado', 'instituciones-civil'),
        course('acto-juridico', 'teoria-general-del-acto-juridico', 'Teoría General del Acto Jurídico', 'civil-privado', 'acto-juridico'),
        course('familia-sucesiones', 'derecho-de-familia-y-sucesiones', 'Derecho de Familia y Sucesiones', 'civil-privado', 'familia-sucesiones'),
        course('derechos-reales', 'derechos-reales', 'Derechos Reales', 'civil-privado', 'derechos-reales'),
        course('obligaciones', 'derecho-de-obligaciones', 'Derecho de Obligaciones', 'civil-privado', 'obligaciones'),
        course('contratos', 'contratos', 'Contratos', 'civil-privado', 'contratos', {
            status: 'ready',
            contentFile: '/data/contratos.json',
            shortDescription: 'Teoría y regulación contractual',
            legacyPaths: ['/contratos.html', '/contratos', '/cursos/contratos']
        }),
        course('responsabilidad-civil', 'responsabilidad-civil', 'Responsabilidad Civil', 'civil-privado', 'responsabilidad-civil'),
        course('internacional-privado', 'derecho-internacional-privado', 'Derecho Internacional Privado', 'civil-privado', 'internacional-privado'),

        course('derechos-humanos', 'derechos-humanos', 'Derechos Humanos', 'constitucional-publico', 'derechos-humanos'),
        course('derecho-constitucional', 'derecho-constitucional', 'Derecho Constitucional', 'constitucional-publico', 'derecho-constitucional'),
        course('derecho-administrativo', 'derecho-administrativo', 'Derecho Administrativo', 'constitucional-publico', 'derecho-administrativo'),
        course('internacional-publico', 'derecho-internacional-publico', 'Derecho Internacional Público', 'constitucional-publico', 'internacional-publico'),

        course('penal-general', 'derecho-penal-general', 'Derecho Penal General', 'penal', 'penal-general'),
        course('penal-especial', 'derecho-penal-especial', 'Derecho Penal Especial', 'penal', 'penal-especial'),
        course('penal-economico', 'derecho-penal-economico', 'Derecho Penal Económico', 'penal', 'penal-economico', {
            status: 'ready',
            contentFile: '/data/penal.json',
            legacyPaths: ['/penal-economico.html', '/penal-economico', '/cursos/derecho-penal-economico']
        }),
        course('ejecucion-penal', 'derecho-de-ejecucion-penal', 'Derecho de Ejecución Penal', 'penal', 'ejecucion-penal'),

        course('teoria-proceso', 'teoria-general-del-proceso', 'Teoría General del Proceso', 'procesal-litigacion', 'teoria-proceso'),
        course('procesal-constitucional', 'derecho-procesal-constitucional', 'Derecho Procesal Constitucional', 'procesal-litigacion', 'procesal-constitucional'),
        course('procesal-civil-i', 'derecho-procesal-civil-i', 'Derecho Procesal Civil I', 'procesal-litigacion', 'procesal-civil-i'),
        course('procesal-civil-ii', 'derecho-procesal-civil-y-litigacion-ii', 'Derecho Procesal Civil y Litigación II', 'procesal-litigacion', 'procesal-civil-ii'),
        course('procesal-administrativo', 'derecho-procesal-administrativo', 'Derecho Procesal Administrativo', 'procesal-litigacion', 'procesal-administrativo'),
        course('procesal-penal-i', 'derecho-procesal-penal-y-litigacion-i', 'Derecho Procesal Penal y Litigación I', 'procesal-litigacion', 'procesal-penal-i'),
        course('procesal-penal-ii', 'derecho-procesal-penal-y-litigacion-ii', 'Derecho Procesal Penal y Litigación II', 'procesal-litigacion', 'procesal-penal-ii'),
        course('procesal-laboral', 'derecho-procesal-laboral', 'Derecho Procesal Laboral', 'procesal-litigacion', 'procesal-laboral'),
        course('derecho-laboral', 'derecho-laboral', 'Derecho Laboral', 'laboral-tributario-empresarial', 'derecho-laboral', {
            status: 'ready',
            contentFile: '/data/laboral.json',
            legacyPaths: ['/laboral.html', '/laboral', '/cursos/derecho-laboral']
        }),
        course('tributario-general', 'derecho-tributario-general', 'Derecho Tributario General', 'laboral-tributario-empresarial', 'tributario-general'),
        course('tributario-especial', 'derecho-tributario-especial', 'Derecho Tributario Especial', 'laboral-tributario-empresarial', 'tributario-especial', {
            status: 'ready',
            contentFile: '/data/tributario.json',
            courseDescription: 'Selecciona una de las clases para revisar el contenido interactivo',
            legacyPaths: ['/tributario.html', '/tributario', '/cursos/derecho-tributario-especial']
        }),
        course('corporativo-i', 'derecho-corporativo-i', 'Derecho Corporativo I', 'laboral-tributario-empresarial', 'corporativo-i'),
        course('corporativo-ii', 'derecho-corporativo-ii', 'Derecho Corporativo II', 'laboral-tributario-empresarial', 'corporativo-ii'),

        course('notarial-registral', 'derecho-notarial-y-registral', 'Derecho Notarial y Registral', 'especialidades-practica', 'notarial-registral'),
        course('propiedad-consumidor', 'propiedad-intelectual-y-derecho-del-consumidor', 'Derecho de la Propiedad Intelectual y Derecho del Consumidor', 'especialidades-practica', 'propiedad-consumidor'),
        course('clinica-juridica', 'clinica-juridica', 'Clínica Jurídica', 'especialidades-practica', 'clinica-juridica'),
        course('etica-profesional', 'etica-profesional-derecho', 'Ética Profesional – Derecho', 'especialidades-practica', 'etica-profesional')
    ];

    function course(id, slug, name, area, icon, options = {}) {
        return {
            id,
            slug,
            name,
            area,
            icon,
            route: `/formacion/${slug}`,
            status: options.status || 'preparing',
            contentFile: options.contentFile || null,
            shortDescription: options.shortDescription || null,
            courseDescription: options.courseDescription || null,
            legacyPaths: options.legacyPaths || []
        };
    }

    function normalizePath(pathName) {
        const cleanPath = String(pathName || '/')
            .split('?')[0]
            .split('#')[0]
            .replace(/\/+$/, '');
        return cleanPath || '/';
    }

    function getAreaById(id) {
        return areas.find(area => area.id === id) || null;
    }

    function getAreaByPath(pathName) {
        const normalized = normalizePath(pathName).toLowerCase();
        return areas.find(area => area.route.toLowerCase() === normalized) || null;
    }

    function getCourseById(id) {
        return courses.find(item => item.id === id || item.slug === id) || null;
    }

    function getCourseByPath(pathName) {
        const normalized = normalizePath(pathName).toLowerCase();
        return courses.find(item => item.route.toLowerCase() === normalized
            || item.legacyPaths.some(path => path.toLowerCase() === normalized)) || null;
    }

    function getCoursesByArea(areaId) {
        return courses.filter(item => item.area === areaId);
    }

    const registry = { areas, courses };

    if (typeof module !== 'undefined' && module.exports) {
        module.exports = registry;
        return;
    }

    window.LNEFormacion = Object.freeze({
        areas,
        courses,
        getAreaById,
        getAreaByPath,
        getCourseById,
        getCourseByPath,
        getCoursesByArea,
        normalizePath
    });
})();
