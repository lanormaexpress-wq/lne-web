const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Middleware de seguridad para evitar servir archivos sensibles
app.use((req, res, next) => {
    const blockedKeywords = ['.env', 'package.json', 'package-lock.json', '.git', 'node_modules', 'server.js'];
    const requestPath = req.path.toLowerCase();
    
    const isBlocked = blockedKeywords.some(keyword => {
        return requestPath === `/${keyword}` || requestPath.startsWith(`/${keyword}/`);
    });

    if (isBlocked) {
        return res.status(403).send('Acceso denegado: Archivo protegido.');
    }
    next();
});

// Redirigir peticiones de páginas HTML a la shell index.html de la SPA (YouTube Music style persistent chat)
app.get('*', (req, res, next) => {
    const requestPath = req.path.toLowerCase();
    
    // Si es para la API, un fragmento de página (/pages/...), o datos (/data/...), continuar normal
    if (requestPath.startsWith('/api/') || requestPath.startsWith('/pages/') || requestPath.startsWith('/data/')) {
        return next();
    }
    
    // Si es una petición de página HTML o no tiene extensión (deep linking), servir index.html
    if (requestPath.endsWith('.html') || requestPath === '/' || !requestPath.includes('.')) {
        return res.sendFile(path.join(__dirname, 'index.html'));
    }
    
    next();
});

// Servir archivos estáticos del sitio
app.use(express.static(__dirname));

// Endpoint del Backend Proxy de IA
app.post('/api/chat', async (req, res) => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        return res.status(500).json({ error: 'La clave de API de Gemini no está configurada en el servidor.' });
    }

    const modelName = 'gemini-3.1-flash-lite';
    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`;

    try {
        const response = await fetch(geminiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(req.body)
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Error desde la API de Gemini:', errorText);
            return res.status(response.status).send(errorText);
        }

        const data = await response.json();
        res.json(data);

    } catch (error) {
        console.error('Error en el Proxy de Gemini:', error);
        res.status(500).json({ error: 'Error interno del servidor al conectar con Gemini.' });
    }
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor de La Norma Express corriendo en http://localhost:${PORT}`);
});
