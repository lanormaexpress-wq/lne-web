/**
 * Asistente de Chat Flotante con Inteligencia Artificial - La Norma Express
 * Desarrollado por: Desarrollador Frontend Senior
 * Conexión Directa a la API de Google Gemini (gemini-2.5-flash)
 */

document.addEventListener('DOMContentLoaded', () => {
    // Configuración del Endpoint del Chat (Servido por nuestro Backend Proxy)
    const CHAT_API_URL = '/api/chat';

    // Capturar elementos de la interfaz del chat
    const chatInputForm = document.querySelector('.legal-chat-input-area');
    const chatInputField = document.querySelector('.legal-chat-input');
    const chatMessagesContainer = document.querySelector('.legal-chat-messages');

    if (!chatInputForm || !chatInputField || !chatMessagesContainer) {
        console.warn("No se encontraron todos los elementos del chat flotante en el DOM.");
        return;
    }

    // Inyectar micro-animación premium para el indicador de escritura ("Escribiendo...")
    const style = document.createElement('style');
    style.textContent = `
        @keyframes dot-blink {
            0% { opacity: .2; }
            20% { opacity: 1; }
            100% { opacity: .2; }
        }
        .dot-typing {
            animation: dot-blink 1.4s infinite both;
            font-weight: bold;
            font-size: 1.2rem;
            line-height: 1;
        }
        .legal-chat-msg .msg-bubble {
            word-break: break-word;
            line-height: 1.5;
        }
    `;
    document.head.appendChild(style);

    // Estado del chat
    let typingIndicator = null;

    /**
     * Obtiene la hora actual formateada en HH:MM
     */
    function obtenerHoraActual() {
        const ahora = new Date();
        const horas = ahora.getHours().toString().padStart(2, '0');
        const minutos = ahora.getMinutes().toString().padStart(2, '0');
        return `${horas}:${minutos}`;
    }

    /**
     * Agrega un globo de mensaje a la ventana del chat
     */
    function agregarMensaje(texto, esUsuario = false) {
        const msgDiv = document.createElement('div');
        msgDiv.className = `legal-chat-msg ${esUsuario ? 'user-msg' : 'bot-msg'}`;
        
        // Convertir saltos de línea y formatear un marcado básico para negritas
        const textoFormateado = formatearTexto(texto);

        msgDiv.innerHTML = `
            <div class="msg-bubble">${textoFormateado}</div>
            <span class="msg-time">${obtenerHoraActual()}</span>
        `;
        
        chatMessagesContainer.appendChild(msgDiv);
        chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight;
    }

    /**
     * Formatea texto plano a HTML básico (negritas y saltos de línea)
     */
    function formatearTexto(texto) {
        let html = texto
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
            .replace(/\*(.*?)\*/g, "<em>$1</em>")
            .replace(/\n/g, "<br>");
        return html;
    }

    /**
     * Muestra el indicador de "Escribiendo..." con animación
     */
    function mostrarCargando() {
        if (typingIndicator) return;
        
        typingIndicator = document.createElement('div');
        typingIndicator.className = 'legal-chat-msg bot-msg';
        typingIndicator.innerHTML = `
            <div class="msg-bubble" style="display: flex; align-items: center; gap: 4px; padding: 10px 16px;">
                <span>Pensando</span>
                <span class="dot-typing">.</span>
                <span class="dot-typing" style="animation-delay: 0.2s;">.</span>
                <span class="dot-typing" style="animation-delay: 0.4s;">.</span>
            </div>
            <span class="msg-time">Ahora</span>
        `;
        chatMessagesContainer.appendChild(typingIndicator);
        chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight;
    }

    /**
     * Elimina el indicador de carga
     */
    function ocultarCargando() {
        if (typingIndicator) {
            typingIndicator.remove();
            typingIndicator = null;
        }
    }

    /**
     * Captura el contenido legal de la página actual de forma inteligente y dinámica
     * utilizando el mensaje del usuario para filtrar el contexto si es una ley muy grande.
     */
    async function obtenerContextoLey(mensajeUsuario = "") {
        // 1. Identificar si tenemos bases de datos cargadas en memoria globalmente
        const activeCivil = (typeof CodigoCivil !== 'undefined') ? CodigoCivil : ((typeof Civil !== 'undefined') ? Civil : undefined);
        const activePenal = (typeof CodigoPenal !== 'undefined') ? CodigoPenal : undefined;
        const activeConstitucion = (typeof Constitucion !== 'undefined') ? Constitucion : undefined;

        // Si es una página con gran volumen de datos estructurados
        if (activeCivil || activePenal || activeConstitucion) {
            const leyEstructurada = activeCivil || activePenal || activeConstitucion;
            
            // Si la consulta del usuario es vacía o es corta, devolvemos un resumen inicial
            if (!mensajeUsuario.trim()) {
                return "Esta página contiene una ley. Por favor, realiza una consulta específica sobre un artículo o tema.";
            }

            // Intentar buscar números de artículos (ej. "artículo 202", "art 202", "202", etc.)
            // Detecta números solos o números con guiones y letras (ej. "45-A", "45-B")
            const regexArticulo = /(?:art[ií]culo\s+|art\.?\s+)?(\d+(?:-[A-Za-z]+)?)\b/gi;
            const matches = [...mensajeUsuario.matchAll(regexArticulo)];
            
            let articulosEncontrados = [];
            
            if (matches.length > 0) {
                // El usuario mencionó uno o más números de artículos
                const numerosBuscados = matches.map(m => m[1].toLowerCase());
                
                // Buscar en la ley
                leyEstructurada.forEach(seccion => {
                    if (seccion.articulos) {
                        seccion.articulos.forEach(art => {
                            if (numerosBuscados.includes(art.numero.toLowerCase())) {
                                articulosEncontrados.push(art);
                            }
                        });
                    }
                });
            }

            // Si se encontraron artículos específicos por número, devolvemos esos artículos detallados
            if (articulosEncontrados.length > 0) {
                let contextoContextual = "Artículos encontrados directamente relacionados con tu consulta:\n\n";
                articulosEncontrados.forEach(art => {
                    // Limpiar tags HTML antes de enviar
                    const textoLimpio = (art.texto || "").replace(/<[^>]*>/g, '').trim();
                    contextoContextual += `${art.tipo || 'Artículo'} ${art.numero}: ${art.titulo || ''}\n${textoLimpio}\n\n`;
                });
                return contextoContextual;
            }

            // Si no se encontró por número, realizar búsqueda por palabras clave en los artículos
            // Convertir a minúsculas y limpiar caracteres especiales, luego filtrar stopwords de menos de 4 letras
            const palabrasClave = mensajeUsuario.toLowerCase()
                .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()¿?¡!]/g, " ")
                .split(/\s+/)
                .filter(w => w.length > 3 && !["como", "para", "este", "esta", "sobre", "tiene", "donde", "cuando", "quien", "desde", "hasta", "sobre", "entre"].includes(w));

            if (palabrasClave.length > 0) {
                let articulosCandidatos = [];
                leyEstructurada.forEach(seccion => {
                    if (seccion.articulos) {
                        seccion.articulos.forEach(art => {
                            let matchesCount = 0;
                            const tituloText = (art.titulo || "").toLowerCase();
                            const textoText = (art.texto || "").replace(/<[^>]*>/g, '').toLowerCase();
                            
                            palabrasClave.forEach(palabra => {
                                if (tituloText.includes(palabra)) matchesCount += 3; // mayor relevancia si coincide en el título
                                if (textoText.includes(palabra)) matchesCount += 1;
                            });

                            if (matchesCount > 0) {
                                articulosCandidatos.push({ articulo: art, peso: matchesCount });
                            }
                        });
                    }
                });

                // Ordenar por relevancia (peso de coincidencias)
                articulosCandidatos.sort((a, b) => b.peso - a.peso);
                // Tomar los 5 más relevantes
                const mejoresArticulos = articulosCandidatos.slice(0, 5);

                if (mejoresArticulos.length > 0) {
                    let contextoContextual = "Artículos relevantes de la ley encontrados para tu consulta:\n\n";
                    mejoresArticulos.forEach(item => {
                        const art = item.articulo;
                        const textoLimpio = (art.texto || "").replace(/<[^>]*>/g, '').trim();
                        contextoContextual += `${art.tipo || 'Artículo'} ${art.numero}: ${art.titulo || ''}\n${textoLimpio}\n\n`;
                    });
                    return contextoContextual;
                }
            }

            // Si no coincide con palabras específicas de los artículos, mandamos los primeros 12 artículos como fallback
            let contextoCortesia = "No se encontraron artículos específicos. Aquí están los primeros artículos del código para tu referencia:\n\n";
            let contador = 0;
            for (let seccion of leyEstructurada) {
                if (seccion.articulos) {
                    for (let art of seccion.articulos) {
                        const textoLimpio = (art.texto || "").replace(/<[^>]*>/g, '').trim();
                        contextoCortesia += `${art.tipo || 'Artículo'} ${art.numero}: ${art.titulo || ''}\n${textoLimpio}\n\n`;
                        contador++;
                        if (contador >= 12) break;
                    }
                }
                if (contador >= 12) break;
            }
            return contextoCortesia;
        }

        // Si no es una ley estructurada gigante (index, argumentación, contratos, etc.), devolvemos el innerText recortado
        const mainContainer = document.querySelector('.container') || 
                              document.querySelector('main') || 
                              document.querySelector('.index-container') || 
                              document.querySelector('.curso-grid') || 
                              document.body;
        
        let textoCompleto = mainContainer.innerText || document.body.innerText || "";
        if (textoCompleto.length > 40000) {
            textoCompleto = textoCompleto.substring(0, 40000);
        }
        return textoCompleto;
    }

    /**
     * Envía la consulta a la API de Google Gemini e inyecta la instrucción de sistema
     */
    async function enviarPreguntaAGemini(mensajeUsuario) {
        mostrarCargando();
        
        try {
            const contextoDeLey = await obtenerContextoLey(mensajeUsuario);
            
            const promptFinal = `CONTENIDO Y CONTEXTO LEGAL CARGADO EN ESTA PÁGINA:\n${contextoDeLey}\n\nPREGUNTA DEL USUARIO:\n${mensajeUsuario}`;
            
            const requestBody = {
                contents: [
                    {
                        parts: [
                            {
                                text: promptFinal
                            }
                        ]
                    }
                ],
                systemInstruction: {
                    parts: [
                        {
                            text: 'Eres un asistente legal inteligente de la plataforma La Norma Express. Tu objetivo es explicar de forma muy sencilla, didáctica y con ejemplos cotidianos los artículos legales que te consulte el usuario. Debes basarte ÚNICAMENTE en el contenido de la ley o página actual que está cargado en esta página. Si te preguntan algo fuera de esa norma o temas no relacionados, responde amablemente que como asistente de La Norma Express solo tienes autorización para explicar la ley actual.'
                        }
                    ]
                }
            };

            const response = await fetch(CHAT_API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(requestBody)
            });

            if (!response.ok) {
                throw new Error(`HTTP Error: ${response.status}`);
            }

            const data = await response.json();
            ocultarCargando();

            // Extraer respuesta del JSON devuelto por Gemini
            if (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts[0]) {
                const respuestaIA = data.candidates[0].content.parts[0].text;
                agregarMensaje(respuestaIA, false);
            } else {
                agregarMensaje("Lo siento, no pude procesar la respuesta de la inteligencia artificial. Intenta nuevamente.", false);
            }

        } catch (error) {
            console.error("Error en la conexión con Gemini:", error);
            ocultarCargando();
            agregarMensaje("Lo siento, ha ocurrido un error al intentar conectarme con mi cerebro de IA. Por favor, verifica tu conexión de red o intenta más tarde.", false);
        }
    }

    // Función para procesar y enviar el mensaje
    function procesarYEnviar() {
        const mensaje = chatInputField.value.trim();
        if (!mensaje) return;

        // Pintar el mensaje del usuario
        agregarMensaje(mensaje, true);
        
        // Limpiar la caja de texto
        chatInputField.value = '';

        // Realizar llamada a la API de Gemini
        enviarPreguntaAGemini(mensaje);
    }

    // Escuchar el evento de envío del formulario de chat
    chatInputForm.addEventListener('submit', (e) => {
        e.preventDefault();
        procesarYEnviar();
    });

    // Controlar el teclado en el textarea (Enter envía, Shift+Enter hace salto de línea)
    chatInputField.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            procesarYEnviar();
        }
    });
});
