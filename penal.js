// penal.js
const CodigoPenal = [
    {
        nuevaHoja: false,
        titulo: "TÍTULO PRELIMINAR",
        capitulo: "PRINCIPIOS GENERALES",
        articulos: [
            {
                tipo: "Artículo",
                numero: "I",
                titulo: "Finalidad preventiva",
                texto: "Este Código tiene por objeto la prevención de delitos y faltas como medio protector de la persona humana y de la sociedad."
            },
            {
                tipo: "Artículo",
                numero: "II",
                titulo: "Principio de legalidad",
                texto: "Nadie será sancionado por un acto no previsto como delito o falta por la ley vigente al momento de su comisión, ni sometido a pena o medida de seguridad que no se encuentren establecidas en ella."
            },
            {
                tipo: "Artículo",
                numero: "III",
                titulo: "Prohibición de la Analogía",
                texto: "No es permitida la analogía para calificar el hecho como delito o falta, definir un estado de peligrosidad o determinar la pena o medida de seguridad que les corresponde."
            },
            {
                tipo: "Artículo",
                numero: "IV",
                titulo: "Principio de Lesividad",
                texto: "La pena, necesariamente, precisa de la lesión o puesta en peligro de bienes jurídicos tutelados por la ley."
            },
            {
                tipo: "Artículo",
                numero: "V",
                titulo: "Garantía Jurisdiccional",
                texto: "Sólo el Juez competente puede imponer penas o medidas de seguridad; y no puede hacerlo sino en la forma establecida en la ley."
            },
            {
                tipo: "Artículo",
                numero: "VI",
                titulo: "Principio de Garantía de Ejecución",
                texto: "No puede ejecutarse pena alguna en otra forma que la prescrita por la ley y reglamentos que la desarrollen. En todo caso, la ejecución de la pena será intervenida judicialmente."
            },
            {
                tipo: "Artículo",
                numero: "VII",
                titulo: "Responsabilidad Penal",
                texto: "La pena requiere de la responsabilidad penal del autor. Queda proscrita toda forma de responsabilidad objetiva."
            },
            {
                tipo: "Artículo",
                numero: "VIII",
                titulo: "Proporcionalidad de las sanciones",
                texto: "La pena no puede sobrepasar la responsabilidad por el hecho. Esta norma no rige en caso de reincidencia ni de habitualidad del agente al delito. La medida de seguridad sólo puede ser ordenada por intereses públicos predominantes."
            },
            {
                tipo: "Artículo",
                numero: "IX",
                titulo: "Fines de la Pena y Medidas de Seguridad",
                texto: "La pena tiene función preventiva, protectora y resocializadora. Las medidas de seguridad persiguen fines de curación, tutela y rehabilitación."
            },
            {
                tipo: "Artículo",
                numero: "X",
                titulo: "Aplicación supletoria de la ley penal",
                texto: "Las normas generales de este Código son aplicables a los hechos punibles previstos en leyes especiales."
            }
        ]
    },
    {
        nuevaHoja: true,
        titulo: `
                    <div style="text-align: center;">
                        <div style="margin-bottom: 10px;">LIBRO PRIMERO</div>
                        <div>PARTE GENERAL</div>
                    </div>
                    <div style="text-align: center; margin-top: 30px;">
                        <div style="margin-bottom: 5px;">TÍTULO I</div>
                        <div>DE LA LEY PENAL</div>
                    </div>`,
        capitulo: `
                    <div style="text-align: center; margin-top: 30px;">
                        <div style="margin-bottom: 15px;">CAPÍTULO I</div>
                        <div>APLICACIÓN ESPACIAL</div>
                    </div>`,
        articulos: [
            {
                tipo: "Artículo",
                numero: "1",
                titulo: "Principio de Territorialidad",
                texto: `
            <div style="margin-bottom: 10px; text-align: justify; line-height: 1.5;">
                La Ley Penal peruana se aplica a todo el que comete un hecho punible en el territorio de la República, salvo las excepciones contenidas en el Derecho Internacional. También se aplica a los hechos punibles cometidos en:
            </div>
            <div style="display: flex; margin-bottom: 10px; line-height: 1.5; text-align: justify;">
                <span style="min-width: 35px;">1.</span>
                <div>Las naves o aeronaves nacionales públicas, en donde se encuentren; y,</div>
            </div>
            <div style="display: flex; margin-bottom: 10px; line-height: 1.5; text-align: justify;">
                <span style="min-width: 35px;">2.</span>
                <div>Las naves o aeronaves nacionales privadas, que se encuentren en alta mar o en espacio aéreo donde ningún Estado ejerza soberanía.</div>
            </div>`
            },
            {
                tipo: "Artículo",
                numero: "2",
                titulo: "Principio Extraterritorial, Principio Real o de Defensa y Principio de Personalidad Activa y Pasiva",
                texto: `
            <div style="margin-bottom: 10px; text-align: justify; line-height: 1.5;">
                La Ley Penal peruana se aplica a todo delito cometido en el extranjero, cuando:
            </div>
            <div style="display: flex; margin-bottom: 10px; line-height: 1.5; text-align: justify;">
                <span style="min-width: 35px;">1.</span>
                <div>El agente es funcionario o servidor público en desempeño de su cargo.</div>
            </div>
            <div style="display: flex; margin-bottom: 10px; line-height: 1.5; text-align: justify;">
                <span style="min-width: 35px;">2.</span>
                <div>Atenta contra la seguridad o la tranquilidad pública o se traten de conductas tipificadas como lavado de activos, siempre que produzcan sus efectos en el territorio de la República.</div>
            </div>
            <div style="display: flex; margin-bottom: 10px; line-height: 1.5; text-align: justify;">
                <span style="min-width: 35px;">3.</span>
                <div>Agravia al Estado y la defensa nacional; a los Poderes del Estado y el orden constitucional o al sistema monetario.</div>
            </div>
            <div style="display: flex; margin-bottom: 10px; line-height: 1.5; text-align: justify;">
                <span style="min-width: 35px;">4.</span>
                <div>Es perpetrado contra peruano o por peruano y el delito esté previsto como susceptible de extradición según la Ley peruana, siempre que sea punible también en el Estado en que se cometió y el agente ingresa de cualquier manera al territorio de la República.</div>
            </div>
            <div style="display: flex; margin-bottom: 10px; line-height: 1.5; text-align: justify;">
                <span style="min-width: 35px;">5.</span>
                <div>El Perú está obligado a reprimir conforme a tratados internacionales.</div>
            </div>`
            },
            {
                tipo: "Artículo",
                numero: "3",
                titulo: "Principio de Representación",
                texto: "La Ley Penal peruana podrá aplicarse cuando, solicitada la extradición, no se entregue al agente a la autoridad competente de un Estado extranjero."
            },
            {
                tipo: "Artículo",
                numero: "4",
                titulo: "Excepciones al Principio de Extraterritorialidad",
                texto: `
            <div style="margin-bottom: 10px; text-align: justify; line-height: 1.5;">
                Las disposiciones contenidas en el Artículo 2, incisos 2, 3, 4 y 5, no se aplican:
            </div>
            <div style="display: flex; margin-bottom: 10px; line-height: 1.5; text-align: justify;">
                <span style="min-width: 35px;">1.</span>
                <div>Cuando se ha extinguido la acción penal conforme a una u otra legislación;</div>
            </div>
            <div style="display: flex; margin-bottom: 10px; line-height: 1.5; text-align: justify;">
                <span style="min-width: 35px;">2.</span>
                <div>Cuando se trata de delitos políticos o hechos conexos con ellos; y,</div>
            </div>
            <div style="display: flex; margin-bottom: 15px; line-height: 1.5; text-align: justify;">
                <span style="min-width: 35px;">3.</span>
                <div>Cuando el procesado ha sido absuelto en el extranjero o el condenado ha cumplido la pena o ésta se halla prescrita o remitida.</div>
            </div>
            <div style="text-align: justify; line-height: 1.5;">
                Si el agente no ha cumplido totalmente la pena impuesta, puede renovarse el proceso ante los tribunales de la República, pero se computará la parte de la pena cumplida.
            </div>`
            },
            {
                tipo: "Artículo",
                numero: "5",
                titulo: "Principio de Ubicuidad",
                texto: `
                            <div style="text-align: justify; line-height: 1.5;">
                                El lugar de comisión de un delito es aquél en el cual el autor o partícipe ha actuado u omitido la obligación de actuar o en el que se producen sus efectos.
                            </div>`
            }
        ]
    },
    {
        titulo: "CAPÍTULO II",
        capitulo: "APLICACIÓN TEMPORAL",
        articulos: [
            {
                tipo: "Artículo",
                numero: "6",
                titulo: "Principio de Combinación",
                texto: `
                            <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                                La Ley Penal aplicable es la vigente en el momento de la comisión del hecho punible. No obstante, se aplicará la más favorable al reo, en caso de conflicto en el tiempo de leyes penales.
                            </div>
                            <div style="text-align: justify; line-height: 1.5;">
                                Si durante la ejecución de la sanción se dictare una ley más favorable al condenado, el Juez sustituirá la sanción impuesta por la que corresponda, conforme a la nueva ley.
                            </div>`
            },
            {
                tipo: "Artículo",
                numero: "7",
                titulo: "Retroactividad y Cosa Juzgada",
                texto: `
                            <div style="text-align: justify; line-height: 1.5;">
                                Si, según la nueva ley, el hecho sancionado en una norma anterior deja de ser punible, la pena impuesta y sus efectos se extinguen de pleno derecho.
                            </div>`
            },
            {
                tipo: "Artículo",
                numero: "8",
                titulo: "Leyes Temporales",
                texto: `
                            <div style="text-align: justify; line-height: 1.5;">
                                Las leyes destinadas a regir sólo durante un tiempo determinado se aplican a todos los hechos cometidos durante su vigencia, aunque ya no estuvieren en vigor, salvo disposición en contrario.
                            </div>`
            },
            {
                tipo: "Artículo",
                numero: "9",
                titulo: "Momento de comisión del delito",
                texto: `
                            <div style="text-align: justify; line-height: 1.5;">
                                El momento de la comisión de un delito es aquél en el cual el autor o partícipe ha actuado u omitido la obligación de actuar, independientemente del momento en que el resultado se produzca.
                            </div>`
            }
        ]
    },
    {
        titulo: "CAPÍTULO III",
        capitulo: "APLICACIÓN PERSONAL",
        articulos: [
            {
                tipo: "Artículo",
                numero: "10",
                titulo: "Principio de Igualdad",
                texto: `
                            <div style="text-align: justify; line-height: 1.5;">
                                La Ley Penal se aplica con igualdad. Las prerrogativas que por razón de la función o cargo se reconocen a ciertas personas habrán de estar taxativamente previstas en las leyes o tratados internacionales.
                            </div>`
            }
        ]
    },
    {
        titulo: `
                    <div style="text-align: center; margin-top: 30px;">
                        <div style="margin-bottom: 15px;">TÍTULO II</div>
                        <div>DEL HECHO PUNIBLE</div>
                    </div>`,
        capitulo: `
                    <div style="text-align: center; margin-top: 30px;">
                        <div style="margin-bottom: 15px;">CAPÍTULO I</div>
                        <div>BASES DE LA PUNIBILIDAD</div>
                    </div>`,
        articulos: [
            {
                tipo: "Artículo",
                numero: "11",
                titulo: "Delitos y faltas",
                texto: `
                            <div style="text-align: justify; line-height: 1.5;">
                                Son delitos y faltas las acciones u omisiones dolosas o culposas penadas por la ley.
                            </div>`
            },
            {
                tipo: "Artículo",
                numero: "12",
                titulo: "Delito doloso y delito culposo",
                texto: `
                            <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                                Las penas establecidas por la ley se aplican siempre al autor de infracción dolosa.
                            </div>
                            <div style="text-align: justify; line-height: 1.5;">
                                El agente de infracción culposa es punible en los casos expresamente establecidos por la ley.
                            </div>`
            },
            {
                tipo: "Artículo",
                numero: "13",
                titulo: "Omisión impropia",
                texto: `
                            <div style="margin-bottom: 10px; text-align: justify; line-height: 1.5;">
                                El que omite impedir la realización del hecho punible será sancionado:
                            </div>
                            <div style="display: flex; margin-bottom: 10px; line-height: 1.5; text-align: justify;">
                                <span style="min-width: 35px;">1.</span>
                                <div>Si tiene el deber jurídico de impedirlo o si crea un peligro inminente que fuera propio para producirlo.</div>
                            </div>
                            <div style="display: flex; margin-bottom: 15px; line-height: 1.5; text-align: justify;">
                                <span style="min-width: 35px;">2.</span>
                                <div>Si la omisión corresponde a la realización del tipo penal mediante un hacer.</div>
                            </div>
                            <div style="text-align: justify; line-height: 1.5;">
                                La pena del omiso podrá ser atenuada.
                            </div>`
            },
            {
                tipo: "Artículo",
                numero: "14",
                titulo: "Error de tipo y error de prohibición",
                texto: `
                            <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                                El error sobre un elemento del tipo penal excluye la responsabilidad penal si es invencible. Si fuere vencible, la infracción será castigada como culposa cuando se hallare prevista como tal en la ley.
                            </div>
                            <div style="text-align: justify; line-height: 1.5;">
                                El error invencible sobre la ilicitud del hecho constitutivo de la infracción penal, excluye la responsabilidad. Si el error fuere vencible se atenuará la pena.
                            </div>`
            },
            {
                tipo: "Artículo",
                numero: "15",
                titulo: "Error de comprensión culturalmente condicionado",
                texto: `
                            <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                                El que por su cultura o costumbres comete un hecho punible sin poder comprender el carácter delictuoso de su acto o determinarse de acuerdo con esa comprensión, será eximido de responsabilidad. Cuando por igual razón, esa posibilidad se halla disminuida, se atenuará la pena.
                            </div>
                            <div style="text-align: justify; line-height: 1.5;">
                                 Lo dispuesto en el primer párrafo será aplicable siguiendo los lineamientos para procesos penales interculturales señalados por la judicatura para los casos de la comisión de los delitos previstos en los capítulos IX, X y XI del Título IV del Libro Segundo cometidos en perjuicio de menores de catorce años y de mayores de catorce años cuando estos no hayan prestado su libre consentimiento.
                            </div>`
            }
        ]
    },
    {
        titulo: ``,
        capitulo: `
                    <div style="text-align: center; margin-top: 30px;">
                        <div style="margin-bottom: 15px;">CAPÍTULO II</div>
                        <div>TENTATIVA</div>
                    </div>`,
        articulos: [
            {
                tipo: "Artículo",
                numero: "16",
                titulo: "Tentativa",
                texto: `
                            <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                                En la tentativa el agente comienza la ejecución de un delito, que decidió cometer, sin consumarlo.
                            </div>
                            <div style="text-align: justify; line-height: 1.5;">
                                El juez reprimirá la tentativa disminuyendo prudencialmente la pena, excepto en los casos de los delitos regulados en los artículos 108-B, 152, 189, 200, con excepción de los párrafos tercero y cuarto, y 317 o en los delitos comprendidos en el Título I-A y en el Capítulo IX del Título IV del Libro Segundo, donde la disminución no es mayor que un tercio del mínimo de la pena fijada por ley.
                            </div>`
            },
            {
                tipo: "Artículo",
                numero: "17",
                titulo: "Tentativa impune",
                texto: `
                            <div style="text-align: justify; line-height: 1.5;">
                                No es punible la tentativa cuando es imposible la consumación del delito, por la ineficacia absoluta del medio empleado o absoluta impropiedad del objeto.
                            </div>`
            },
            {
                tipo: "Artículo",
                numero: "18",
                titulo: "Desistimiento voluntario - Arrepentimiento activo",
                texto: `
                            <div style="text-align: justify; line-height: 1.5;">
                                Si el agente desiste voluntariamente de proseguir los actos de ejecución del delito o impide que se produzca el resultado, será penado sólo cuando los actos practicados constituyen por sí otros delitos.
                            </div>`
            },
            {
                tipo: "Artículo",
                numero: "19",
                titulo: "Participación de varias personas en la tentativa",
                texto: `
                            <div style="text-align: justify; line-height: 1.5;">
                                Si varios agentes participan en el hecho, no es punible la tentativa de aquél que voluntariamente impidiera el resultado, ni la de aquél que se esforzara seriamente por impedir la ejecución del delito aunque los otros partícipes prosigan en su ejecución o consumación.
                            </div>`
            }
        ]
    },
    {
        titulo: ``,
        capitulo: `
                    <div style="text-align: center; margin-top: 30px;">
                        <div style="margin-bottom: 15px;">CAPÍTULO III</div>
                        <div>CAUSAS QUE EXIMEN O ATENÚAN LA RESPONSABILIDAD PENAL</div>
                    </div>`,
        articulos: [
            {
                tipo: "Artículo",
                numero: "20",
                titulo: "Inimputabilidad",
                texto: `
                            <div style="margin-bottom: 10px; text-align: justify; line-height: 1.5;">
                                Está exento de responsabilidad penal:
                            </div>

                            <div style="display: flex; margin-bottom: 10px; line-height: 1.5; text-align: justify;">
                                <span style="min-width: 35px;">1.</span>
                                <div>El que por anomalía psíquica, grave alteración de la conciencia o por sufrir alteraciones en la percepción, que afectan gravemente su concepto de la realidad, no posea la facultad de comprender el carácter delictuoso de su acto o para determinarse según esta comprensión;</div>
                            </div>

                            <div style="display: flex; margin-bottom: 10px; line-height: 1.5; text-align: justify;">
                                <span style="min-width: 35px;">2.</span>
                                <div>El menor de dieciocho años, con excepción de los adolescentes de dieciséis y menos de dieciocho años, que cometen alguno de los delitos tipificados en los artículos 107, 108, 108- A, 108-B, 108-C, 108-D, 121, 121-B, 129-A, 129- B, 129-C, 129-D, 129-G, 129-H, 129-I, 129-K, 129-L, 129-M, 129-Ñ, 148-A, 152, 170, 171, 172, 173, 179, 180, 181, 189, 200, 279, 279-G, 280, 281, 296, 296-A, 296-B, y los numerales 4, 5 y 6 del artículo 297, así como los artículos 303- C, 317, 317-A, 317-B y 326 del Código Penal, o alguno de los delitos tipificados en el Decreto Ley 25475, que establecen la penalidad para los delitos de terrorismo y los procedimientos para la investigación, la instrucción y el juicio.</div>
                            </div>

                            <div style="display: flex; margin-bottom: 10px; line-height: 1.5; text-align: justify;">
                                <span style="min-width: 35px;">3.</span>
                                <div>
                                    <div style="margin-bottom: 10px;">El que obra en defensa de bienes jurídicos propios o de terceros, con uso de la fuerza, incluido el uso de la fuerza letal, siempre que concurran las circunstancias siguientes:</div>
                                    <div style="margin-bottom: 10px;">
                                        <div style="display: flex; margin-bottom: 5px;">
                                            <span style="min-width: 35px;">a)</span>
                                            <div>Agresión actual, ilegítima y real.</div>
                                        </div>
                                        <div style="display: flex; margin-bottom: 5px;">
                                            <span style="min-width: 35px;">b)</span>
                                            <div>Necesidad racional del medio empleado para impedirla o repelerla. Se excluye para la valoración de este requisito el criterio de proporcionalidad de medios, considerándose en su lugar, entre otras circunstancias, la intensidad y peligrosidad de la agresión, la forma de proceder del agresor y los medios de que se disponga para la defensa.</div>
                                        </div>
                                        <div style="display: flex; margin-bottom: 5px;">
                                            <span style="min-width: 35px;">c)</span>
                                            <div>Falta de provocación suficiente de quien hace la defensa.</div>
                                        </div>
                                    </div>
                                    <div>El numeral 3 también aplica al supuesto de situación de peligro inminente y necesidad de proteger la vida o la integridad propia o de terceros, en la que se repele razonablemente una agresión, irrupción, ingreso violento o subrepticio ilegítimo dentro del inmueble, vehículo u otro medio de transporte en el que se encuentre legítimamente; dentro de su negocio, empresa, asociación civil o lugar de trabajo o dentro de un inmueble sobre el cual ejerza la legítima propiedad o la legítima posesión con título él o sus parientes hasta el tercer grado de consanguinidad o tercer grado de afinidad.</div>
                                </div>
                            </div>

                            <div style="display: flex; margin-bottom: 10px; line-height: 1.5; text-align: justify;">
                                <span style="min-width: 35px;">4.</span>
                                <div>
                                    <div style="margin-bottom: 10px;">El que, ante un peligro actual e insuperable de otro modo, que amenace la vida, la integridad corporal, la libertad u otro bien jurídico, realiza un hecho destinado a conjurar dicho peligro de sí o de otro, siempre que concurran los siguientes requisitos:</div>
                                    <div style="margin-bottom: 5px;">
                                        <div style="display: flex; margin-bottom: 5px;">
                                            <span style="min-width: 35px;">a)</span>
                                            <div>Cuando de la apreciación de los bienes jurídicos en conflicto afectados y de la intensidad del peligro que amenaza, el bien protegido resulta predominante sobre el interés dañado; y</div>
                                        </div>
                                        <div style="display: flex; margin-bottom: 5px;">
                                            <span style="min-width: 35px;">b)</span>
                                            <div>Cuando se emplee un medio adecuado para vencer el peligro;</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div style="display: flex; margin-bottom: 10px; line-height: 1.5; text-align: justify;">
                                <span style="min-width: 35px;">5.</span>
                                <div>
                                    <div style="margin-bottom: 10px;">El que, ante un peligro actual y no evitable de otro modo, que signifique una amenaza para la vida, la integridad corporal o la libertad, realiza un hecho antijurídico para alejar el peligro de sí mismo o de una persona con quien tiene estrecha vinculación.</div>
                                    <div>No procede esta exención si al agente pudo exigírsele que aceptase o soportase el peligro en atención a las circunstancias; especialmente, si causó el peligro o estuviese obligado por una particular relación jurídica.</div>
                                </div>
                            </div>

                            <div style="display: flex; margin-bottom: 10px; line-height: 1.5; text-align: justify;">
                                <span style="min-width: 35px;">6.</span>
                                <div>El que obra por una fuerza física irresistible proveniente de un tercero o de la naturaleza;</div>
                            </div>

                            <div style="display: flex; margin-bottom: 10px; line-height: 1.5; text-align: justify;">
                                <span style="min-width: 35px;">7.</span>
                                <div>El que obra compelido por miedo insuperable de un mal igual o mayor;</div>
                            </div>

                            <div style="display: flex; margin-bottom: 10px; line-height: 1.5; text-align: justify;">
                                <span style="min-width: 35px;">8.</span>
                                <div>El que obra por disposición de la ley, en cumplimiento de un deber o en el ejercicio legítimo de un derecho, oficio o cargo;</div>
                            </div>

                            <div style="display: flex; margin-bottom: 10px; line-height: 1.5; text-align: justify;">
                                <span style="min-width: 35px;">9.</span>
                                <div>El que obra por orden obligatoria de autoridad competente, expedida en ejercicio de sus funciones;</div>
                            </div>

                            <div style="display: flex; margin-bottom: 10px; line-height: 1.5; text-align: justify;">
                                <span style="min-width: 35px;">10.</span>
                                <div>El que actúa con el consentimiento válido del titular de un bien jurídico de libre disposición;</div>
                            </div>

                            <div style="display: flex; margin-bottom: 10px; line-height: 1.5; text-align: justify;">
                                <span style="min-width: 35px;">11.</span>
                                <div>El personal de las Fuerzas Armadas y de la Policía Nacional del Perú que, en el cumplimiento de su función constitucional y en uso de sus armas u otro medio de defensa, en forma reglamentaria, cause lesiones o muerte.</div>
                            </div>`
            },
            {
                tipo: "Artículo",
                numero: "21",
                titulo: "Responsabilidad restringida",
                texto: `
                <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                    En los casos del artículo 20°, cuando no concurra alguno de los requisitos necesarios para hacer desaparecer totalmente la responsabilidad, el Juez podrá disminuir prudencialmente la pena hasta límites inferiores al mínimo legal.
                </div>
                <div style="text-align: justify; line-height: 1.5;">
                    Si la persona que repele la agresión ilegítima hubiera hecho uso de un arma de fuego inscrita legalmente a su nombre, esta será incautada dentro de las 48 horas que requiera la autoridad para las investigaciones preliminares bajo responsabilidad.
                </div>`
            },
            {
                tipo: "Artículo",
                numero: "22",
                titulo: "Responsabilidad restringida por la edad",
                texto: `
                <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                    Podrá reducirse prudencialmente la pena señalada para el hecho punible cometido, cuando el agente tenga entre dieciséis y menos de veintiún años, o más de sesenta y cinco años al momento de realizar la infracción, salvo que haya incurrido en forma reiterada en los delitos previstos en los artículos 111, tercer párrafo, y 124, cuarto párrafo.
                </div>
                <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                    Está excluido el agente integrante de una organización criminal o que haya incurrido en delito de violación de la libertad sexual, homicidio calificado, homicidio calificado por la condición oficial del agente, feminicidio, sicariato, conspiración para el delito de sicariato y ofrecimiento para el delito de sicariato, extorsión, secuestro, robo agravado, tráfico ilícito de drogas, terrorismo, terrorismo agravado, apología, genocidio, desaparición forzada, tortura, atentado contra la seguridad nacional, traición a la Patria u otro delito sancionado con pena privativa de libertad no menor de veinticinco años o cadena perpetua.
                </div>
                <div style="text-align: justify; line-height: 1.5;">
                    Los mayores de ochenta años, por razones humanitarias, afrontarán su condena conforme a los alcances del artículo 288 o del artículo 290 del Nuevo Código Procesal Penal, Decreto Legislativo 957.
                </div>`
            }
        ]
    },
    {
        titulo: ``,
        capitulo: `
        <div style="text-align: center; margin-top: 30px;">
            <div style="margin-bottom: 15px;">CAPÍTULO IV</div>
            <div>AUTORÍA Y PARTICIPACIÓN</div>
        </div>`,
        articulos: [
            {
                tipo: "Artículo",
                numero: "23",
                titulo: "Autoría, autoría mediata y coautoría",
                texto: `
                <div style="text-align: justify; line-height: 1.5;">
                    El que realiza por sí o por medio de otro el hecho punible y los que lo cometan conjuntamente serán reprimidos con la pena establecida para esta infracción.
                </div>`
            },
            {
                tipo: "Artículo",
                numero: "24",
                titulo: "Instigación",
                texto: `
                <div style="text-align: justify; line-height: 1.5;">
                    El que, dolosamente, determina a otro a cometer el hecho punible será reprimido con la pena que corresponde al autor.
                </div>`
            },
            {
                tipo: "Artículo",
                numero: "25",
                titulo: "Complicidad primaria y complicidad secundaria",
                texto: `
                <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                    El que, dolosamente, preste auxilio para la realización del hecho punible, sin el cual no se hubiere perpetrado, será reprimido con la pena prevista para el autor.
                </div>
                <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                    A los que, de cualquier otro modo, hubieran dolosamente prestado asistencia se les disminuirá prudencialmente la pena.
                </div>
                <div style="text-align: justify; line-height: 1.5;">
                    El cómplice siempre responde en referencia al hecho punible cometido por el autor, aunque los elementos especiales que fundamentan la penalidad del tipo legal no concurran en él.
                </div>`
            },
            {
                tipo: "Artículo",
                numero: "26",
                titulo: "Incomunicabilidad en las circunstancias de participación",
                texto: `
                <div style="text-align: justify; line-height: 1.5;">
                    Las circunstancias y cualidades que afecten la responsabilidad de algunos de los autores y partícipes no modifican las de los otros autores o partícipes del mismo hecho punible.
                </div>`
            },
            {
                tipo: "Artículo",
                numero: "27",
                titulo: "Actuación en nombre de otro",
                texto: `
                <div style="text-align: justify; line-height: 1.5;">
                    El que actúa como órgano de representación autorizado de una persona jurídica o como socio representante autorizado de una sociedad y realiza el tipo legal de un delito es responsable como autor, aunque los elementos especiales que fundamentan la penalidad de este tipo no concurran en él, pero sí en la representada.
                </div>`
            }
        ]
    },
    {
        titulo: `
            <div style="text-align: center; margin-top: 30px;">
                <div style="margin-bottom: 15px;">TÍTULO III</div>
                <div>DE LAS PENAS</div>
            </div>`,
        capitulo: `
            <div style="text-align: center; margin-top: 30px;">
                <div style="margin-bottom: 15px;">CAPÍTULO I</div>
                <div>CLASES DE PENA</div>
            </div>`,
        articulos: [
            {
                tipo: "Artículo",
                numero: "28",
                titulo: "Clases de Pena",
                texto: `
                    <div style="margin-bottom: 10px; text-align: justify; line-height: 1.5;">
                        Las penas aplicables de conformidad con este Código son:
                    </div>
                    <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                        <span style="min-width: 35px;">–</span>
                        <div>Privativa de libertad;</div>
                    </div>
                    <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                        <span style="min-width: 35px;">–</span>
                        <div>Restrictivas de libertad;</div>
                    </div>
                    <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                        <span style="min-width: 35px;">–</span>
                        <div>Limitativas de derechos; y</div>
                    </div>
                    <div style="display: flex; line-height: 1.5; text-align: justify;">
                        <span style="min-width: 35px;">–</span>
                        <div>Multa.</div>
                    </div>`
            },
            {
                tipo: "Artículo",
                numero: "29",
                titulo: "Duración de la pena privativa de libertad",
                texto: `
                    <div style="text-align: justify; line-height: 1.5;">
                        La pena privativa de libertad puede ser temporal o de cadena perpetua. En el primer caso, tendrá una duración mínima de dos días y una máxima de treinta y cinco años.
                    </div>`
            },
            {
                tipo: "Artículo",
                numero: "29-A",
                titulo: "Cumplimiento de la pena de vigilancia electrónica personal",
                texto: `
                    <div style="margin-bottom: 10px; text-align: justify; line-height: 1.5;">
                        La pena de vigilancia electrónica personal se cumple de la siguiente forma:
                    </div>
                    <div style="display: flex; margin-bottom: 10px; line-height: 1.5; text-align: justify;">
                        <span style="min-width: 35px;">1.</span>
                        <div>La ejecución se realiza en el domicilio o lugar que señale el condenado, a partir del cual se determina su radio de acción, itinerario de desplazamiento y tránsito, sujeto a aprobación del Juez.</div>
                    </div>
                    <div style="display: flex; margin-bottom: 10px; line-height: 1.5; text-align: justify;">
                        <span style="min-width: 35px;">2.</span>
                        <div>La persona condenada está sujeta a vigilancia electrónica personal, para lo cual el Juez fija las reglas de conducta previstas en la ley, así como todas aquellas que considere necesarias para asegurar la idoneidad del mecanismo de control.</div>
                    </div>
                    <div style="display: flex; margin-bottom: 10px; line-height: 1.5; text-align: justify;">
                        <span style="min-width: 35px;">3.</span>
                        <div>El cómputo de la aplicación de la vigilancia electrónica personal es a razón de un día de privación de libertad por un día de vigilancia electrónica personal.</div>
                    </div>
                    <div style="display: flex; margin-bottom: 10px; line-height: 1.5; text-align: justify;">
                        <span style="min-width: 35px;">4.</span>
                        <div>No procede imponer la pena de vigilancia electrónica personal a quien haya sido anteriormente condenado por delito doloso, siempre que sea considerado como reincidente o habitual, conforme a lo dispuesto por los artículos 46-B y 46-C del Código Penal.</div>
                    </div>
                    <div style="display: flex; margin-bottom: 10px; line-height: 1.5; text-align: justify;">
                        <span style="min-width: 35px;">5.</span>
                        <div>
                            <div style="margin-bottom: 10px;">Para imponer la pena de vigilancia electrónica personal, el Juez debe valorar las condiciones, previamente acreditadas, de vida personal, laboral, familiar o social, de la persona condenada; así como, de ser el caso, si estas se encuentran en alguno de los siguientes supuestos:</div>
                            <div style="display: flex; margin-bottom: 5px;">
                                <span style="min-width: 35px;">a)</span>
                                <div>Los mayores de 65 años.</div>
                            </div>
                            <div style="display: flex; margin-bottom: 5px;">
                                <span style="min-width: 35px;">b)</span>
                                <div>Los que sufran de enfermedad grave, acreditada con pericia médico legal.</div>
                            </div>
                            <div style="display: flex; margin-bottom: 5px;">
                                <span style="min-width: 35px;">c)</span>
                                <div>Los que adolezcan de discapacidad física permanente que afecte sensiblemente su capacidad de desplazamiento.</div>
                            </div>
                            <div style="display: flex; margin-bottom: 5px;">
                                <span style="min-width: 35px;">d)</span>
                                <div>Las mujeres gestantes dentro del tercer trimestre del proceso de gestación. Igual tratamiento tendrán durante los doce meses siguientes a la fecha del nacimiento.</div>
                            </div>
                            <div style="display: flex;">
                                <span style="min-width: 35px;">e)</span>
                                <div>La madre que sea cabeza de familia con hijo menor o con hijo o cónyuge que sufra de discapacidad permanente, siempre y cuando haya estado bajo su cuidado. En ausencia de ella, el padre que se encuentre en las mismas circunstancias tendrá el mismo tratamiento.</div>
                            </div> 
                        </div>
                    </div>`
            }
        ]
    },
    {
        titulo: ``,
        capitulo: `
                <div style="text-align: center; margin-top: 30px;">
                    <div style="margin-bottom: 15px;">SECCIÓN II</div>
                    <div>PENAS RESTRICTIVAS DE LIBERTAD</div>
                </div>`,
        articulos: [
            {
                tipo: "Artículo",
                numero: "30",
                titulo: "Pena restrictiva de la libertad",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            La pena restrictiva de libertad es la de expulsión del país y se aplica a extranjeros después de cumplida la pena privativa de libertad, por concesión de un beneficio penitenciario o por conversión de la pena privativa de libertad, quedando prohibido su reingreso al país.
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            En el caso de expulsión por concesión de beneficios penitenciarios o por conversión de la pena privativa de libertad, el Perú mantiene jurisdicción exclusiva sobre la condena impuesta.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "30-A",
                titulo: "Aplicación de la pena restrictiva de libertad como pena accesoria",
                texto: `
                        <div style="margin-bottom: 10px; text-align: justify; line-height: 1.5;">
                            La expulsión regulada en el artículo 30 se aplica como pena accesoria en los delitos tipificados en los siguientes artículos: 106, 107, 108, 108-A, 108-B, 108-C, 108-D, 111, 121, 122, 122-B, 129-A, 129-B, 129-C, 129-D, 129-F, 129-G, 129-H, 129-I, 129-J, 129-K, 129-L, 129-M, 129-N, 129-Ñ, 129-O, 148-A, 152, 170, 171, 172, 173, 174, 176-A, 176-B, 176-C, 177, 179, 180, 181, 181-B, 185, 186, 188, 189, 194, 195, 196, 196-A, 200, 204, 273, 275, 279, 279-A, 279-B, 279-D, 279-G, 280, 281, 283, 294-A, 294-B, 296, 296-A, 296-B, 297, 303-A, 303-B, 303-C, 307-A, 307-B, 315, 317, 317-A, 317-B, 428 y en los tipos penales agravados de la Ley 30096, Ley de Delitos Informáticos.
                        </div>
                        <div style="margin-bottom: 10px; text-align: justify; line-height: 1.5;">
                            Asimismo, esta expulsión conlleva lo siguiente:
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">a)</span>
                            <div>La imposibilidad de retornar al territorio nacional por un tiempo igual a la duración de la pena máxima del delito cometido.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">b)</span>
                            <div>El archivo de cualquier otro procedimiento administrativo con el mismo propósito.</div>
                        </div>
                        <div style="display: flex; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">c)</span>
                            <div>La reparación civil se obtiene de sus bienes mediante el decomiso o la extinción de dominio sobre los bienes del agente. La reparación civil no prescribe.</div>
                        </div>`
            }
        ]
    },
    {
        titulo: ``,
        capitulo: `
                <div style="text-align: center; margin-top: 30px;">
                    <div style="margin-bottom: 15px;">SECCIÓN III</div>
                    <div>PENAS LIMITATIVAS DE DERECHOS</div>
                </div>`,
        articulos: [
            {
                tipo: "Artículo",
                numero: "31",
                titulo: "Penas limitativas de derechos – Clases",
                texto: `
                        <div style="margin-bottom: 10px; text-align: justify; line-height: 1.5;">
                            Las penas limitativas de derechos son:
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">1.</span>
                            <div>Prestación de servicios a la comunidad;</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">2.</span>
                            <div>Limitación de días libres; e</div>
                        </div>
                        <div style="display: flex; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">3.</span>
                            <div>Inhabilitación.</div>
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "32",
                titulo: "Formas de aplicación",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            Las penas limitativas de derechos previstas en los dos primeros numerales del artículo 31 se aplican como autónomas cuando están específicamente señaladas para cada delito y también como sustitutivas o alternativas de la pena privativa de libertad, cuando la sanción sustituida a criterio del juez no sea superior a cinco años.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "33",
                titulo: "Duración de las penas limitativas de derechos como penas sustitutas",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            La duración de las penas de prestación de servicios a la comunidad y limitativa de días libres se fijará, cuando se apliquen como sustitutivas de la pena privativa de libertad, de acuerdo con las equivalencias establecidas en el artículo 52.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "34",
                titulo: "Prestación de servicios a la comunidad",
                texto: `
                        <div style="display: flex; margin-bottom: 10px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 45px;">34.1.</span>
                            <div>La pena de prestación de servicios a la comunidad obliga al condenado a trabajos gratuitos en entidades asistenciales, hospitalarias, escuelas, orfanatos, otras instituciones similares u obras, siempre que sean públicos.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 10px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 45px;">34.2.</span>
                            <div>La pena de prestación de servicios a la comunidad también puede ejecutarse en instituciones privadas con fines asistenciales o sociales.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 10px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 45px;">34.3.</span>
                            <div>Los servicios son asignados, en lo posible, conforme a las aptitudes del condenado, debiendo cumplirse en jornadas de diez horas semanales, entre los días sábados, domingos o feriados, de modo que no perjudiquen la jornada normal de su trabajo habitual.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 10px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 45px;">34.4.</span>
                            <div>El condenado puede ser autorizado para prestar estos servicios en los días hábiles semanales, computándose la jornada correspondiente.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 10px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 45px;">34.5.</span>
                            <div>Esta pena se extiende de diez a ciento cincuenta y seis jornadas de servicios semanales, salvo disposición distinta de la ley.</div>
                        </div>
                        <div style="display: flex; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 45px;">34.6.</span>
                            <div>La ley y las disposiciones reglamentarias correspondientes establecen los procedimientos para asignar los lugares y supervisar el desarrollo de la prestación de servicios.</div>
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "35",
                titulo: "Limitación de días libres",
                texto: `
                        <div style="display: flex; margin-bottom: 10px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 45px;">35.1.</span>
                            <div>La limitación de días libres consiste en la obligación de permanecer los días sábados, domingos y feriados, hasta por un máximo de diez horas semanales, a disposición de una institución pública para participar en programas educativos, psicológicos, de formación laboral o culturales.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 10px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 45px;">35.2.</span>
                            <div>La pena de limitación de días libres también puede ejecutarse en instituciones privadas con fines asistenciales o sociales.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 10px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 45px;">35.3.</span>
                            <div>Esta pena se extiende de diez a ciento cincuenta i seis jornadas de limitación semanales, salvo disposición distinta de la ley.</div>
                        </div><div style="display: flex; margin-bottom: 10px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 45px;">35.4.</span>
                            <div>Durante este tiempo, el condenado recibe orientaciones y realiza actividades e idóneas para su rehabilitación y formación.</div>
                        </div><div style="display: flex; margin-bottom: 10px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 45px;">35.5.</span>
                            <div>La ley y las disposiciones reglamentarias correspondientes establecen los procedimientos de supervisión y cumplimiento de la pena de limitación de días libres.</div>
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "36",
                titulo: "Inhabilitación",
                texto: `
                        <div style="margin-bottom: 10px; text-align: justify; line-height: 1.5;">
                            La inhabilitación produce, según disponga la sentencia:
                        </div>
                        <div style="display: flex; margin-bottom: 10px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">1.</span>
                            <div>Privación de la función, cargo o comisión que ejercía el condenado, aunque provenga de elección popular;</div>
                        </div>
                        <div style="display: flex; margin-bottom: 10px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">2.</span>
                            <div>Incapacidad o impedimento para obtener mandato, cargo, empleo o comisión de carácter público;</div>
                        </div>
                        <div style="display: flex; margin-bottom: 10px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">3.</span>
                            <div>Suspensión de los derechos políticos que señale la sentencia;</div>
                        </div>
                        <div style="display: flex; margin-bottom: 10px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">4.</span>
                            <div>Incapacidad para ejercer por cuenta propia o por intermedio de tercero profesión, comercio, arte o industria, que deben especificarse en la sentencia;</div>
                        </div>
                        <div style="display: flex; margin-bottom: 10px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">5.</span>
                            <div>Incapacidad para el ejercicio de la patria potestad, tutela o curatela;</div>
                        </div>
                        <div style="display: flex; margin-bottom: 10px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">6.</span>
                            <div>Suspensión o cancelación de la autorización para portar o hacer uso de armas de fuego. Incapacidad definitiva para renovar u obtener licencia o certificación de autoridad competente para portar o hacer uso de armas de fuego, en caso de sentencia por delito doloso o cometido bajo el influjo del alcohol o las drogas;</div>
                        </div>
                        <div style="display: flex; margin-bottom: 10px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">7.</span>
                            <div>Suspensión, cancelación o incapacidad definitiva para obtener autorización para conducir cualquier tipo de vehículo;</div>
                        </div>
                        <div style="display: flex; margin-bottom: 10px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">8.</span>
                            <div>Privación de grados militares o policiales, títulos honoríficos u otras distinciones que correspondan al cargo, profesión u oficio del que se hubiese servido el agente para cometer el delito;</div>
                        </div>
                        <div style="display: flex; margin-bottom: 10px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">9.</span>
                            <div>
                                <div style="margin-bottom: 10px;">Incapacidad definitiva para ingresar o reingresar al servicio docente o administrativo en instituciones de educación básica, centros de educación técnico-productiva, institutos o escuelas de educación superior, instituciones de educación superior artística, universidades, escuelas de las Fuerzas Armadas o de la Policía Nacional del Perú, Ministerio de Educación o sus organismos públicos adscritos, Direcciones o Gerencias Regionales de Educación, Unidades de Gestión Educativa Local y, en general, en toda institución u organismo educativo, incluyendo centros de resocialización o rehabilitación, que desarrollan actividades permanentes o temporales vinculadas a la educación, capacitación y formación sobre cualquier materia, incluyendo los ámbitos deportivo, artístico y cultural; así como, para ejercer actividad, profesión, ocupación u oficio que implique la enseñanza, el cuidado, vigilancia o atención de niñas, niños o adolescentes o del alumnado de educación superior tanto técnica como universitaria; respecto de las personas condenadas con sentencia consentida o ejecutoriada, incluido el grado de tentativa, por cualquiera de los siguientes delitos:</div>
                                <div style="display: flex; margin-bottom: 5px; margin-left: 20px;">
                                    <span style="min-width: 30px;">a)</span>
                                    <div>Delitos de terrorismo tipificados en el Decreto Ley Nº 25475 y delito de apología del terrorismo tipificado en el artículo 316-A del Código Penal.</div>
                                </div>
                                <div style="display: flex; margin-bottom: 5px; margin-left: 20px;">
                                    <span style="min-width: 30px;">b)</span>
                                    <div>Delitos de violación de la libertad sexual tipificados en el Capítulo IX del Título IV del Libro Segundo del Código Penal.</div>
                                </div>
                                <div style="display: flex; margin-bottom: 5px; margin-left: 20px;">
                                    <span style="min-width: 30px;">c)</span>
                                    <div>Delitos de proxenetismo tipificados en el Capítulo X del Título IV del Libro Segundo del Código Penal.</div>
                                </div>
                                <div style="display: flex; margin-bottom: 5px; margin-left: 20px;">
                                    <span style="min-width: 30px;">d)</span>
                                    <div>Delito de pornografía infantil tipificado en el artículo 183-A del Código Penal.</div>
                                </div>
                                <div style="display: flex; margin-bottom: 5px; margin-left: 20px;">
                                    <span style="min-width: 30px;">e)</span>
                                    <div>Delito de proposiciones a niños, niñas y adolescentes con fines sexuales por medios tecnológicos tipificado en el artículo 5 de la Ley Nº 30096.</div>
                                </div>
                                <div style="display: flex; margin-bottom: 5px; margin-left: 20px;">
                                    <span style="min-width: 30px;">f)</span>
                                    <div>Delito de trata de personas y sus formas agravadas, tipificados en los artículos 153 y 153-A del Código Penal.</div>
                                </div>
                                <div style="display: flex; margin-bottom: 5px; margin-left: 20px;">
                                    <span style="min-width: 30px;">g)</span>
                                    <div>Delito de explotación sexual y sus formas agravadas tipificados en el artículo 153-B del Código Penal.</div>
                                </div>
                                <div style="display: flex; margin-bottom: 5px; margin-left: 20px;">
                                    <span style="min-width: 30px;">h)</span>
                                    <div>Delito de esclavitud y otras formas de explotación y sus formas agravadas, tipificados en el artículo 153-C del Código Penal.</div>
                                </div>
                                <div style="display: flex; margin-bottom: 5px; margin-left: 20px;">
                                    <span style="min-width: 30px;">i)</span>
                                    <div>Delitos de tráfico ilícito de drogas de la Sección Segunda del Capítulo III del Título XII del Libro Segundo del Código Penal.</div>
                                </div>
                                <div style="display: flex; margin-bottom: 5px; margin-left: 20px;">
                                    <span style="min-width: 30px;">j)</span>
                                    <div>Delitos de homicidio simple y calificado tipificados en los artículos 106, 108 y 108-A del Código Penal.</div>
                                </div>
                                <div style="display: flex; margin-bottom: 5px; margin-left: 20px;">
                                    <span style="min-width: 30px;">k)</span>
                                    <div>Delito de parricidio tipificado en el artículo 107 del Código Penal.</div>
                                </div>
                                <div style="display: flex; margin-bottom: 5px; margin-left: 20px;">
                                    <span style="min-width: 30px;">l)</span>
                                    <div>Delito de feminicidio y sus formas agravadas tipificados en el artículo 108-B del Código Penal.</div>
                                </div>
                                <div style="display: flex; margin-bottom: 5px; margin-left: 20px;">
                                    <span style="min-width: 30px;">m)</span>
                                    <div>Delito de sicariato y sus formas agravadas tipificados en el artículo 108-C del Código Penal.</div>
                                </div>
                                <div style="display: flex; margin-bottom: 5px; margin-left: 20px;">
                                    <span style="min-width: 30px;">n)</span>
                                    <div>Delito de secuestro y sus formas agravadas tipificados en el artículo 152 del Código Penal.</div>
                                </div>
                                <div style="display: flex; margin-bottom: 5px; margin-left: 20px;">
                                    <span style="min-width: 30px;">o)</span>
                                    <div>Delito de secuestro extorsivo y sus formas agravadas tipificados en el artículo 200 del Código Penal.</div>
                                </div>
                                <div style="display: flex; margin-bottom: 5px; margin-left: 20px;">
                                    <span style="min-width: 30px;">p)</span>
                                    <div>Delitos contra la humanidad (genocidio, desaparición forzada y tortura) tipificados en los capítulos I, II y III del Título XIV-A del Libro Segundo del Código Penal.</div>
                                </div>
                                <div style="display: flex; margin-left: 20px;">
                                    <span style="min-width: 30px;">q)</span>
                                    <div>Delito de violación de la intimidad, por difusión de imágenes, materiales audiovisuales o audios con contenido sexual, y sus formas agravadas, tipificado en el artículo 154-B del Código Penal.</div>
                                </div>
                            </div>
                        </div>
                        <div style="display: flex; margin-bottom: 10px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">10.</span>
                            <div>Privación del derecho a residir en determinados lugares o acudir a ellos;</div>
                        </div>
                        <div style="display: flex; margin-bottom: 10px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">11.</span>
                            <div>Prohibición de aproximarse o comunicarse con la víctima, sus familiares u otras personas que determine el juez; o,</div>
                        </div>
                        <div style="display: flex; margin-bottom: 10px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">12.</span>
                            <div>Prohibición de comunicarse con internos o visitar establecimientos penitenciarios.</div>
                        </div>
                        <div style="display: flex; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">13.</span>
                            <div>Incapacidad definitiva o temporal para la tenencia de animales.</div>
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "37",
                titulo: "Inhabilitación principal o accesoria",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            La pena de inhabilitación puede ser impuesta como principal o accesoria.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "38",
                titulo: "Duración de la inhabilitación principal",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            La inhabilitación principal se extiende de seis meses a diez años, salvo los supuestos de incapacidad definitiva a que se refieren los numerales 6, 7 y 9 del artículo 36 y los supuestos del artículo 426 del Código Penal; en el artículo 4-A del Decreto Ley 25475 y en los artículos 1, 2, 3 y 4 del Decreto Legislativo 1106.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "39",
                titulo: "Inhabilitación accesoria",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            La inhabilitación se impondrá como pena accesoria cuando el hecho punible cometido por el condenado constituye abuso de autoridad, de cargo, de profesión, oficio, poder o violación de un deber inherente a la función pública, comercio, industria, patria potestad, tutela, curatela, o actividad regulada por ley. Se extiende por igual tiempo que la pena principal.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "40",
                titulo: "Inhabilitación accesoria en los delitos culposos de tránsito",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            La pena de inhabilitación prevista en el artículo 36 inciso 7, de este Código podrá aplicarse como accesoria en los delitos culposos de tránsito.
                        </div>`
            }
        ]
    },
    {
        titulo: ``,
        capitulo: `
        <div style="text-align: center; margin-top: 30px;">
            <div style="margin-bottom: 15px;">SECCIÓN IV</div>
            <div>PENA DE MULTA</div>
        </div>`,
        articulos: [
            {
                tipo: "Artículo",
                numero: "41",
                titulo: "Concepto",
                texto: `
                <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                    La pena de multa obliga al condenado a pagar al Estado una suma de dinero fijada en días-multa.
                </div>
                <div style="text-align: justify; line-height: 1.5;">
                    El importe del día-multa es equivalente al ingreso promedio diario del condenado y se determina atendiendo a su patrimonio, rentas, remuneraciones, nivel de gasto y demás signos exteriores de riqueza.
                </div>`
            },
            {
                tipo: "Artículo",
                numero: "42",
                titulo: "Extensión de la pena de multa",
                texto: `
                <div style="text-align: justify; line-height: 1.5;">
                    La pena de multa se extenderá de un mínimo de diez días-multa a un máximo de trescientos sesenticinco días-multa, salvo disposición distinta de la ley.
                </div>`
            },
            {
                tipo: "Artículo",
                numero: "43",
                titulo: "Importe del día-multa",
                texto: `
                <div style="text-align: justify; line-height: 1.5;">
                    El importe del día-multa no podrá ser menor del veinticinco por ciento ni mayor del cincuenta por ciento del ingreso diario del condenado cuando viva exclusivamente de su trabajo.
                </div>`
            },
            {
                tipo: "Artículo",
                numero: "44",
                titulo: "Plazo del pago de multa",
                texto: `
                <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                    La multa deberá ser pagada dentro de los diez días de pronunciada la sentencia. A pedido del condenado y de acuerdo a las circunstancias, el Juez podrá permitir que el pago se efectúe en cuotas mensuales.
                </div>
                <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                    El cobro de la multa se podrá efectuar mediante el descuento de la remuneración del condenado cuando se aplica aisladamente o cuando se aplica acumulativamente con pena limitativa de derechos o fuere concedida la suspensión condicional de la pena, conforme a los límites previstos en el artículo 42.
                </div>
                <div style="text-align: justify; line-height: 1.5;">
                    El descuento no debe incidir sobre los recursos indispensables para el sustento del condenado y su familia.
                </div>`
            }
        ]
    },
    {
        titulo: ``,
        capitulo: `
        <div style="text-align: center; margin-top: 30px;">
            <div style="margin-bottom: 15px;">CAPÍTULO II</div>
            <div>APLICACIÓN DE LA PENA</div>
        </div>`,
        articulos: [
            {
                tipo: "Artículo",
                numero: "45",
                titulo: "Presupuestos para fundamentar y determinar la pena",
                texto: `
                <div style="margin-bottom: 10px; text-align: justify; line-height: 1.5;">
                    El juez, al momento de fundamentar y determinar la pena, tiene en cuenta:
                </div>
                <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                    <span style="min-width: 35px;">a.</span>
                    <div>Las carencias sociales que hubiese sufrido el agente o el abuso de su cargo, posición económica, formación, poder, oficio, profesión o la función que ocupe en la sociedad.</div>
                </div>
                <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                    <span style="min-width: 35px;">b.</span>
                    <div>Su cultura y sus costumbres.</div>
                </div>
                <div style="display: flex; line-height: 1.5; text-align: justify;">
                    <span style="min-width: 35px;">c.</span>
                    <div>Los intereses de la víctima, de su familia o de las personas que de ella dependan, así como la afectación de sus derechos y considerando especialmente su situación de vulnerabilidad.</div>
                </div>`
            },
            {
                tipo: "Artículo",
                numero: "45-A",
                titulo: "Individualización de la pena",
                texto: `
                <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                    Toda condena contiene fundamentación explícita y suficiente sobre los motivos de la determinación cualitativa y quantitative de la pena.
                </div>
                <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                    Para determinar la pena dentro de los límites fijados por ley, el juez atiende la responsabilidad y gravedad del hecho punible cometido, en cuanto no sean específicamente constitutivas del delito o modificatorias de la responsabilidad.
                </div>
                <div style="margin-bottom: 10px; text-align: justify; line-height: 1.5;">
                    El juez determina la pena aplicable desarrollando las siguientes etapas:
                </div>
                <div style="display: flex; margin-bottom: 10px; line-height: 1.5; text-align: justify;">
                    <span style="min-width: 35px;">1.</span>
                    <div>Identifica el espacio punitivo de determinación a partir de la pena prevista en la ley para el delito y la divide en tres partes.</div>
                </div>
                <div style="display: flex; margin-bottom: 10px; line-height: 1.5; text-align: justify;">
                    <span style="min-width: 35px;">2.</span>
                    <div>
                        <div style="margin-bottom: 10px;">Determina la pena concreta aplicable al condenado evaluando la concurrencia de circunstancias agravantes o atenuantes observando las siguientes reglas:</div>
                        <div style="display: flex; margin-bottom: 5px;">
                            <span style="min-width: 35px;">a)</span>
                            <div>Cuando no existan atenuantes ni agravantes o concurran únicamente circunstancias atenuantes, la pena concreta se determina dentro del tercio inferior.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px;">
                            <span style="min-width: 35px;">b)</span>
                            <div>Cuando concurran circunstancias de agravación y de atenuación, la pena concreta se determina dentro del tercio intermedio.</div>
                        </div>
                        <div style="display: flex;">
                            <span style="min-width: 35px;">c)</span>
                            <div>Cuando concurran únicamente circunstancias agravantes, la pena concreta se determina dentro del tercio superior.</div>
                        </div>
                    </div>
                </div>
                <div style="display: flex; line-height: 1.5; text-align: justify;">
                    <span style="min-width: 35px;">3.</span>
                    <div>
                        <div style="margin-bottom: 10px;">Cuando concurran circunstancias atenuantes privilegiadas o agravantes cualificadas, la pena concreta se determina de la siguiente manera:</div>
                        <div style="display: flex; margin-bottom: 5px;">
                            <span style="min-width: 35px;">a)</span>
                            <div>Tratándose de circunstancias atenuantes, la pena concreta se determina por debajo del tercio inferior;</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px;">
                            <span style="min-width: 35px;">b)</span>
                            <div>Tratándose de circunstancias agravantes, la pena concreta se determina por encima del tercio superior; y</div>
                        </div>
                        <div style="display: flex;">
                            <span style="min-width: 35px;">c)</span>
                            <div>En los casos de concurrencia de circunstancias atenuantes y agravantes, la pena concreta se determina dentro de los límites de la pena básica correspondiente al delito.</div>
                        </div>
                    </div>
                </div>`
            },
            {
                tipo: "Artículo",
                numero: "46",
                titulo: "Circunstancias de atenuación y agravación",
                texto: `
                        <div style="display: flex; margin-bottom: 15px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">1.</span>
                            <div>
                                <div style="margin-bottom: 10px;">Constituyen circunstancias de atenuación, siempre que no estén previstas específicamente para sancionar el delito y no sean elementos constitutivos del hecho punible, las siguientes:</div>
                                <div style="display: flex; margin-bottom: 5px; margin-left: 20px;">
                                    <span style="min-width: 30px;">a)</span>
                                    <div>La carencia de antecedentes penales;</div>
                                </div>
                                <div style="display: flex; margin-bottom: 5px; margin-left: 20px;">
                                    <span style="min-width: 30px;">b)</span>
                                    <div>El obrar por móviles nobles o altruistas;</div>
                                </div>
                                <div style="display: flex; margin-bottom: 5px; margin-left: 20px;">
                                    <span style="min-width: 30px;">c)</span>
                                    <div>El obrar en estado de emoción o de temor excusables;</div>
                                </div>
                                <div style="display: flex; margin-bottom: 5px; margin-left: 20px;">
                                    <span style="min-width: 30px;">d)</span>
                                    <div>La influencia de apremiantes circunstancias personales o familiares en la ejecución de la conducta punible;</div>
                                </div>
                                <div style="display: flex; margin-bottom: 5px; margin-left: 20px;">
                                    <span style="min-width: 30px;">e)</span>
                                    <div>Procurar voluntariamente, después de consumado el delito, la disminución de sus consecuencias;</div>
                                </div>
                                <div style="display: flex; margin-bottom: 5px; margin-left: 20px;">
                                    <span style="min-width: 30px;">f)</span>
                                    <div>Reparar voluntariamente el daño ocasionado o las consecuencias derivadas del peligro generado;</div>
                                </div>
                                <div style="display: flex; margin-bottom: 5px; margin-left: 20px;">
                                    <span style="min-width: 30px;">g)</span>
                                    <div>Presentarse voluntariamente a las autoridades después de haber cometido la conducta punible, para admitir su responsabilidad;</div>
                                </div>
                                <div style="display: flex; margin-left: 20px;">
                                    <span style="min-width: 30px;">h)</span>
                                    <div>La edad del imputado en tanto que ella hubiere influido en la conducta punible.</div>
                                </div>
                            </div>
                        </div>
                        <div style="display: flex; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">2.</span>
                            <div>
                                <div style="margin-bottom: 10px;">Constituyen circunstancias agravantes, siempre que no estén previstas específicamente para sancionar el delito y no sean elementos constitutivos del hecho punible, las siguientes:</div>
                                <div style="display: flex; margin-bottom: 5px; margin-left: 20px;">
                                    <span style="min-width: 30px;">a)</span>
                                    <div>Ejecutar la conducta punible sobre bienes o recursos destinados a actividades de utilidad común o a la satisfacción de necesidades básicas de una colectividad;</div>
                                </div>
                                <div style="display: flex; margin-bottom: 5px; margin-left: 20px;">
                                    <span style="min-width: 30px;">b)</span>
                                    <div>Ejecutar la conducta punible sobre bienes o recursos públicos;</div>
                                </div>
                                <div style="display: flex; margin-bottom: 5px; margin-left: 20px;">
                                    <span style="min-width: 30px;">c)</span>
                                    <div>Ejecutar la conducta punible por motivo abyecto, fútil o mediante precio, recompensa o promesa remuneratoria;</div>
                                </div>
                                <div style="display: flex; margin-bottom: 5px; margin-left: 20px;">
                                    <span style="min-width: 30px;">d)</span>
                                    <div>Ejecutar el delito bajo móviles de intolerancia o discriminación, tales como el origen, raza, religión, sexo, orientación sexual, identidad de género, factor genético, filiación, edad, discapacidad, idioma, identidad étnica y cultural, indumentaria, opinión, condición económica, o de cualquier otra índole.</div>
                                </div>
                                <div style="display: flex; margin-bottom: 5px; margin-left: 20px;">
                                    <span style="min-width: 30px;">e)</span>
                                    <div>Emplear en la ejecución de la conducta punible medios de cuyo uso pueda resultar peligro común, así como el uso indebido de inteligencia artificial o de tecnologías similares o análogas;</div>
                                </div>
                                <div style="display: flex; margin-bottom: 5px; margin-left: 20px;">
                                    <span style="min-width: 30px;">f)</span>
                                    <div>Ejecutar la conducta punible mediante ocultamiento, con abuso de la condición de superioridad sobre la víctima o aprovechando circunstancias de tiempo, modo o lugar, que dificulten la defense del ofendido o la identificación del autor o partícipe;</div>
                                </div>
                                <div style="display: flex; margin-bottom: 5px; margin-left: 20px;">
                                    <span style="min-width: 30px;">g)</span>
                                    <div>Hacer más nocivas las consecuencias de la conducta punible, que las necesarias para consumar el delito;</div>
                                </div>
                                <div style="display: flex; margin-bottom: 5px; margin-left: 20px;">
                                    <span style="min-width: 30px;">h)</span>
                                    <div>Realizar la conducta punible abusando el agente de su cargo, posición económica, formación, poder, oficio, profesión o función;</div>
                                </div>
                                <div style="display: flex; margin-bottom: 5px; margin-left: 20px;">
                                    <span style="min-width: 30px;">i)</span>
                                    <div>La pluralidad de agentes que intervienen en la ejecución del delito;</div>
                                </div>
                                <div style="display: flex; margin-bottom: 5px; margin-left: 20px;">
                                    <span style="min-width: 30px;">j)</span>
                                    <div>Ejecutar la conducta punible valiéndose de un inimputable;</div>
                                </div>
                                <div style="display: flex; margin-bottom: 5px; margin-left: 20px;">
                                    <span style="min-width: 30px;">k)</span>
                                    <div>Cuando la conducta punible es dirigida o cometida total o parcialmente desde el interior de un lugar de reclusión por quien está privado de su libertad o se encuentra fuera del territorio nacional;</div>
                                </div>
                                <div style="display: flex; margin-bottom: 5px; margin-left: 20px;">
                                    <span style="min-width: 30px;">l)</span>
                                    <div>Cuando se produce un daño grave al equilibrio de los ecosistemas naturales;</div>
                                </div>
                                <div style="display: flex; margin-bottom: 5px; margin-left: 20px;">
                                    <span style="min-width: 30px;">m)</span>
                                    <div>Cuando para la realización de la conducta punible se han utilizado armas, explosivos o venenos, u otros instrumentos o procedimientos de similar eficacia destructiva.</div>
                                </div>
                                <div style="display: flex; margin-bottom: 5px; margin-left: 20px;">
                                    <span style="min-width: 30px;">n)</span>
                                    <div>Si la víctima es un niño o niña, adolescente, mujer en situación de especial vulnerabilidad, adulto mayor conforme al ordenamiento vigente en la materia o tuviere deficiencias físicas, sensoriales, mentales o intelectuales de carácter permanente o si padeciera de enfermedad en estado terminal, o persona perteneciente a un pueblo indígena en situación de aislamiento y contacto inicial.</div>
                                </div>
                                <div style="display: flex; margin-left: 20px;">
                                    <span style="min-width: 30px;">ñ)</span>
                                    <div>Cuando para la realización de la conducta punible se utilice la inteligencia artificial o tecnologías similares o análogas.</div>
                                </div>
                            </div>
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "46-A",
                titulo: "Circunstancia agravante por condición del sujeto activo",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            Constituye circunstancia agravante de la responsabilidad penal si el sujeto activo se aprovecha de su condición de miembro de las Fuerzas Armadas, Policía Nacional, autoridad, funcionario o servidor público, para cometer un hecho punible o utiliza para ello armas proporcionadas por el Estado o cuyo uso le sea autorizado por su condición de funcionario público.
                        </div>
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            En estos casos el Juez aumenta la pena hasta la mitad por encima del máximo legal fijado para el delito cometido, no pudiendo ésta exceder de treinta y cinco años de pena privativa de libertad.
                        </div>
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            La misma pena se aplicará al agente que haya desempeñado los cargos señalados en el primer párrafo y aprovecha los conocimientos adquiridos en el ejercicio de su función para cometer el hecho punible.
                        </div>
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            Constituye circunstancia agravante, cuando el sujeto activo, desde un establecimiento penitenciario donde se encuentre privado de su libertad, cometa en calidad de autor o partícipe el delito de tráfico ilícito de drogas, lavado de activos, trata de personas, terrorismo, extorsión o secuestro. De igual modo, constituye circunstancia agravante cuando el sujeto activo, en su desempeño como prestador de servicio de transporte público de personas, ya sea como conductor, copiloto, cobrador o ayudante, cualquiera sea su naturaleza o modalidad; o de servicio de transporte especial de usuarios en vehículos menores motorizados; o simulando ser conductor, copiloto, cobrador, ayudante o pasajero de dichos servicios, cometa delitos contra la libertad sexual, homicidio, asesinato, sicariato, secuestro, robo, marcaje o reglaje.
                        </div>
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            En tal caso, el Juez puede aumentar la pena hasta en un tercio por encima del máximo legal fijado para el delito cometido, no pudiendo exceder de treinta y cinco años de pena privativa de libertad.
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            No será aplicable lo dispuesto en el presente artículo cuando la circunstancia agravante esté prevista al sancionar el tipo penal o cuando ésta sea elemento constitutivo del hecho punible.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "46-B",
                titulo: "Reincidencia",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            El que, después de haber cumplido en todo o en parte una pena, incurre en nuevo delito doloso en un lapso que no excede de cinco años tiene la condición de reincidente. Tiene igual condición quien después de haber sido condenado por falta dolosa, incurre en nueva falta o delito doloso en un lapso no mayor de tres años.
                        </div>
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            La reincidencia constituye circunstancia agravante cualificada, en cuyo caso el juez aumenta la pena hasta en una mitad por encima del máximo legal fijado para el tipo penal.
                        </div>
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            El plazo fijado para la reincidencia no es aplicable a los delitos previstos en los capítulos IX, X y XI del Título IV del Libro Segundo y en los artículos 107, 108, 108-A, 108-B, 108-C, 108-D; 121, segundo párrafo, 121-B, 152, 153, 153-A, 153-B, 153-C; 173, 173-A, 186, 189, 195, 200, 297, 317-A, 319, 320, 321, 325, 326, 327, 328, 329, 330, 331, 332 y 346 del Código Penal, el cual se computa sin límite de tiempo. En estos casos, el juez aumenta la pena en no menos de dos tercios por encima del máximo legal fijado para el tipo penal, sin que sean aplicables los beneficios penitenciarios de semilibertad y liberación condicional. Tampoco se aplica el plazo fijado para la reincidencia si el agente previamente beneficiado por una gracia presidencial o por una norma especial de liberación, incurre en nuevo delito doloso; en estos casos el juez aumenta la pena hasta en una mitad por encima del máximo legal fijado para el tipo penal.
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            En los supuestos de reincidencia no se computan los antecedentes penales cancelados o que debieren ser cancelados, salvo en los delitos señalados en el tercer párrafo del presente artículo.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "46-C",
                titulo: "Habitualidad",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            Si el agente comete un nuevo delito doloso es considerado delincuente habitual, siempre que se trate por lo menos de tres hechos punibles que se hayan perpetrado en un lapso que no exceda de cinco años. El plazo fijado no es aplicable para los delitos previstos en los capítulos IX, X y XI del Título IV del Libro Segundo y en los artículos 107, 108, 108-A, 108-B, 108-C, 108-D; 121, segundo párrafo, 121-B, 152, 153, 153-A, 153-B, 153-C; 173, 173-A, 186, 189, 195, 200, 297, 317-A, 319, 320, 321, 322, 325, 326, 327, 328, 329, 330, 331, 332 y 346 del Código Penal, el cual se computa sin límite de tiempo. Asimismo, tiene condición de delincuente habitual quien comete de tres a más faltas dolosas contra la persona o el patrimonio, de conformidad con los artículos 441 y 444, en un lapso no mayor de tres años.
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            La habitualidad en el delito constituye circunstancia cualificada agravante. El juez aumenta la pena hasta en un tercio por encima del máximo legal fijado para el tipo penal, salvo en los delitos previstos en los párrafos anteriores, en cuyo caso se aumenta la pena en una mitad por encima del máximo legal fijado para el tipo penal, sin que sean aplicables los beneficios penitenciarios de semilibertad y liberación condicional. En los supuestos de habitualidad no se computan los antecedentes cancelados o que debieren estar cancelados, salvo en los delitos antes señalados.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "46-D",
                titulo: "Uso de menores en la comisión de delito",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            Constituye circunstancia agravante de la responsabilidad penal, si el sujeto activo utiliza, bajo cualquier modalidad, a un menor de dieciocho años o a una persona que, por anomalía psíquica, grave alteración de la conciencia o por sufrir alteraciones en la percepción, que afectan gravemente su concepto de la realidad, no posea la facultad de comprender el carácter delictuoso de su acto o para determinarse según esta comprensión para la comisión de un delito, en cuyo caso el juez puede aumentar la pena hasta en un tercio por encima del máximo legal fijado en el tipo penal.
                        </div>
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            En caso de que el agente tuviere cualquier posición, cargo o vínculo familiar que le otorgue particular autoridad sobre el menor o le impulse a depositar en él su confianza, el juez puede aumentar la pena hasta en una mitad por encima del máximo legal fijado para el tipo penal. Si el agente ejerce la patria potestad sobre el menor, el juez suspende su ejercicio, conforme a lo dispuesto en la ley de la materia.
                        </div>
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            Si durante la comisión del delito o como consecuencia de este el menor sufre lesiones graves, incapacidad permanente o muere, y el agente pudo prever el resultado, el juez puede imponer una pena de hasta el doble del máximo legal fijado para el tipo penal.
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            En ningún caso la pena concreta puede exceder de treinta i cinco años de pena privativa de la libertad. No es aplicable lo dispuesto en el presente artículo cuando la circunstancia agravante se encuentre prevista al sancionar el tipo penal.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "46-E",
                titulo: "Circunstancia agravante cualificada por abuso de parentesco",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            La pena es aumentada hasta en un tercio por encima del máximo legal fijado para el delito cuando el agente se haya aprovechado de su calidad de ascendiente o descendiente, natural o adoptivo, padrastro o madrastra, cónyuge o conviviente de la víctima. En este caso, la pena privativa de libertad no puede exceder los treinta i cinco años, salvo que el delito se encuentre reprimido con pena privativa de libertad indeterminada, en cuyo caso se aplica esta última.
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            La agravante prevista en el primer párrafo es inaplicable cuando esté establecida como tal en la ley penal.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "47",
                titulo: "Cómputo de la detención sufrida",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            El tiempo de detención que haya sufrido el procesado se abonará para el cómputo de la pena impuesta a razón de un día de pena privativa de libertad por cada día de detención.
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            Si la pena correspondiente al hecho punible es la de multa o limitativa de derechos, la detención se computará a razón de dos días de dichas penas por cada día de detención.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "48",
                titulo: "Concurso ideal de delitos",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            Cuando varias disposiciones son aplicables al mismo hecho se reprimirá hasta con el máximo de la pena más grave, pudiendo incrementarse ésta hasta en una cuarta parte, sin que en ningún caso pueda exceder de treinta i cinco años.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "49",
                titulo: "Delito continuado",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            Cuando varias violaciones de la misma ley penal o una de igual o semejante naturaleza hubieran sido cometidas en el momento de la acción o en momentos diversos, con actos ejecutivos de la misma resolución criminal, serán considerados como un sólo delito continuado i se sancionarán con la pena correspondiente al más grave. Si con dichas violaciones, el agente hubiera perjudicado a una pluralidad de personas, la pena será aumentada en un tercio de la máxima prevista para el delito más grave.
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            La aplicación de las anteriores disposiciones quedará excluída cuando resulten afectados bienes jurídicos de naturaleza eminentemente personal pertenecientes a sujetos distintos.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "50",
                titulo: "Concurso real de delitos",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            Cuando concurran varios hechos punibles que deban considerarse como otros tantos delitos independientes, se sumarán las penas privativas de libertad que fije el juez para cada uno de ellos hasta un máximo del doble de la pena del delito más grave, no pudiendo exceder de 35 años. Si alguno de estos delitos se encuentra reprimido con cadena perpetua se aplicará únicamente ésta.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "50-A",
                titulo: "Concurso real de faltas",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            Cuando se realiza una pluralidad de acciones que deban considerarse como faltas independientes que perjudican a varias personas e infringen el mismo precepto penal o preceptos de igual o semejante naturaleza, será sancionado como autor del delito correspondiente i se le impone la pena privativa de libertad prevista para este, teniendo en cuenta el perjuicio total causado.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "51",
                titulo: "Concurso real retrospectivo",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            Si después de la sentencia condenatoria se descubriere otro hecho punible cometido antes de ella por el mismo condenado, será sometido a proceso penal i la pena que fije el juez se sumará a la anterior hasta un máximo del doble de la pena del delito más grave, no pudiendo exceder de 35 años. Si alguno de estos delitos se encuentra reprimido con cadena perpetua, se aplicará únicamente ésta, sin perjuicio de fijarse la reparación civil para el nuevo delito.
                        </div>`
            }
        ]
    },
    {
        titulo: ``,
        capitulo: `
                <div style="text-align: center; margin-top: 30px;">
                    <div style="margin-bottom: 15px;">CAPÍTULO III</div>
                    <div style="margin-bottom: 25px;">DE LAS CONVERSIONES</div>
                    <div style="margin-bottom: 15px;">SECCIÓN I</div>
                    <div>CONVERSIONES DE LA PENA PRIVATIVA DE LIBERTAD</div>
                </div>`,
        articulos: [
            {
                tipo: "Artículo",
                numero: "52",
                titulo: "Conversión de la pena privativa de libertad",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            En los casos que no fuera procedente la condena condicional o la reserva del fallo condenatorio, el juez podrá convertir la pena privativa de libertad no mayor de dos años en otra de multa, o la pena privativa de libertad no mayor de cinco años en otra de prestación de servicios a la comunidad, o limitación de días libres, a razón de un día de privación de libertad por un día de multa, siete días de privación de libertad por una jornada de prestación de servicios a la comunidad o por una jornada de limitación de días libres.
                        </div>
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            El juez también podrá convertir la pena privativa de libertad no mayor de cinco años por expulsión inmediata del país conforme lo establecido en el artículo 30 del Código Penal, siempre que haya cumplido los dos tercios de la condena.
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            No se podrá convertir la pena privativa de libertad a la pena de expulsión a los sentenciados por los delitos tipificados en los artículos: 108-C, 129-A, 129-B, 129-C, 129-D, 129-F, 129-G, 129-H, 129-I, 129-J, 129-K, 129-L, 129-M, 129-N, 129-Ñ, 129-O, 152, 186, 188, 189, 200, 296, 297, 303-A, 303-C, 317 y 317-B.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "52-A",
                titulo: "Conversión de la pena privativa de libertad en ejecución",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            El juez competente puede convertir la pena privativa de libertad en ejecución de condena, por una pena limitativa de derechos, a razón de siete (7) días de privación de libertad por una jornada de prestación de servicios a la comunidad o por una jornada de limitación de días libres, según corresponda y siempre que se cumplan los supuestos de procedencia y requisitos establecidos en la ley de la materia.
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            El juez también puede convertir la pena privativa de libertad no mayor de diez años en ejecución de condena por la de expulsión inmediata del país, siempre que haya cumplido los dos tercios de la condena, con excepción de los delitos tipificados en los artículos: 108-C, 129-A, 129-B, 129-C, 129-D, 129-F, 129-G, 129-H, 129-I, 129-J, 129-K, 129-L, 129-M, 129-N, 129-Ñ, 129-O, 152, 186, 188, 189, 200, 296, 297, 303-A, 303-C, 317 y 317-B.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "52-B",
                titulo: "Conversión de la pena privativa de libertad por la de vigilancia electrónica personal",
                texto: `
                        <div style="display: flex; margin-bottom: 15px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">1.</span>
                            <div>
                                <div style="margin-bottom: 10px;">El juez, de oficio o a pedido de parte, puede convertir la pena privativa de libertad en pena de vigilancia electrónica personal en aquellos casos en que:</div>
                                <div style="display: flex; margin-bottom: 5px; margin-left: 20px;">
                                    <span style="min-width: 30px;">a.</span>
                                    <div>La pena impuesta es no mayor de diez (10) años.</div>
                                </div>
                                <div style="display: flex; margin-left: 20px;">
                                    <span style="min-width: 30px;">b.</span>
                                    <div>La pena impuesta es no menor de diez (10) años ni mayor a doce (12) años. En este supuesto, de manera conjunta a la pena de vigilancia electrónica personal, se impone la pena de prestación de servicios a la comunidad o limitación de días libres.</div>
                                </div>
                            </div>
                        </div>
                        <div style="display: flex; margin-bottom: 15px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">2.</span>
                            <div>
                                <div style="margin-bottom: 10px;">Cuando la pena privativa de la libertad se encuentra en ejecución, el juez, a pedido de parte, puede convertirla por la pena de vigilancia electrónica personal, si:</div>
                                <div style="display: flex; margin-bottom: 5px; margin-left: 20px;">
                                    <span style="min-width: 30px;">a.</span>
                                    <div>La pena en ejecución es no mayor de diez (10) años.</div>
                                </div>
                                <div style="display: flex; margin-left: 20px;">
                                    <span style="min-width: 30px;">b.</span>
                                    <div>La pena en ejecución es no menor de diez (10) años ni mayor de doce (12) años. En este supuesto, de manera conjunta a la pena de vigilancia electrónica personal, se impone la pena de prestación de servicios a la comunidad o limitación de días libres.</div>
                                </div>
                            </div>
                        </div>
                        <div style="display: flex; margin-bottom: 15px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">3.</span>
                            <div>
                                <div style="margin-bottom: 10px;">En todos los delitos culposos previstos en el Código Penal, el Juez impone preferentemente la pena de vigilancia electrónica personal por la de privación de libertad efectiva, cuando corresponda ésta última.</div>
                                <div style="text-align: justify;">
                                    Si la pena privativa de libertad impuesta para el delito culposo es no mayor a seis (6) años, el Juez, de oficio o a pedido de parte, convierte la pena privativa de libertad a una de vigilancia electrónica personal.
                                </div>
                            </div>
                        </div>
                        <div style="display: flex; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">4.</span>
                            <div>En todos los supuestos previstos, el cómputo de la conversión de pena privativa de libertad por la pena de vigilancia electrónica personal es a razón de un día de privación de libertad por un día de vigilancia electrónica personal, en concordancia con el inciso 3 del artículo 29-A del presente Código.</div>
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "53",
                titulo: "Revocación de la conversión",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            Si el condenado no cumple, injustificadamente, con el pago de la multa o la prestación del servicio asignado a la jornada de limitación de días libres, la conversión será revocada, previo apercibimiento judicial, debiendo ejecutarse la pena privativa de libertad fijada en la sentencia.
                        </div>
                        <div style="margin-bottom: 10px; text-align: justify; line-height: 1.5;">
                            Revocada la conversión, la pena cumplida con anterioridad será descontada de acuerdo con las equivalencias siguientes:
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">1.</span>
                            <div>Un día de multa por cada día de privación de libertad; o</div>
                        </div>
                        <div style="display: flex; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">2.</span>
                            <div>Una jornada de servicio a la comunidad o una de limitación de días libres por cada siete días de pena privativa de libertad.</div>
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "54",
                titulo: "Revocación de la conversión por la comisión de delito doloso",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            Cuando el condenado cometa, dentro del plazo de ejecución de la pena convertida según el artículo 52, un delito doloso sancionado en la ley con pena privativa de libertad no menor de tres años, la conversión quedará revocada automáticamente y así será declarada en la nueva sentencia condenatoria. Efectuando el descuento correspondiente a la parte de pena convertida que hubiese sido ejecutada antes de la revocatoria, conforme a las equivalencias indicadas en el artículo 53, el condenado cumplirá la pena privativa de libertad que resta de la primera sentencia y la que le fuere impuesta por el nuevo delito.
                        </div>`
            }
        ]
    },
    {
        titulo: ``,
        capitulo: `
                <div style="text-align: center; margin-top: 30px; font-weight: bold;">
                    <div style="margin-bottom: 5px; font-size: 0.95em;">SECCIÓN II</div>
                    <div style="margin-bottom: 15px; font-size: 0.95em;">CONVERSIÓN DE LA PENA DE PRESTACIÓN DE SERVICIOS A LA COMUNIDAD Y LIMITATIVA DE DÍAS LIBRES</div>
                </div>`,
        articulos: [
            {
                tipo: "Artículo",
                numero: "55",
                titulo: "Conversión de las penas limitativas de derechos a privativa de libertad",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            Si el condenado no cumple, injustificadamente, con la prestación de servicios o con la jornada de limitación de días-libres aplicadas como penas autónomas, impuestas en caso de delito o falta, dichas sanciones se convertirán en privativas de libertad, previo apercibimiento judicial, a razón de un día de pena privativa de libertad por cada jornada incumplida de prestación de servicios a la comunidad o jornada de limitación de días-libres.
                        </div>`
            }
        ]
    },
    {
        titulo: ``,
        capitulo: `
                <div style="text-align: center; margin-top: 30px; font-weight: bold;">
                    <div style="margin-bottom: 5px; font-size: 0.95em;">SECCIÓN III</div>
                    <div style="margin-bottom: 15px; font-size: 0.95em;">CONVERSIÓN DE LA PENA DE MULTA</div>
                </div>`,
        articulos: [
            {
                tipo: "Artículo",
                numero: "56",
                titulo: "Conversión de la pena de multa",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            Si el condenado solvente no paga la multa o frustra su cumplimiento, la pena podrá ser ejecutada en sus bienes o convertida, previo requerimiento judicial, con la equivalencia de un día de pena privativa de libertad por cada día-multa no pagado.
                        </div>
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            Si el condenado deviene insolvente por causas ajenas a su voluntad, la pena de multa se convierte en una limitativa de derechos o de prestación de servicios a la comunidad con la equivalencia de una jornada por cada siete días-multa impagos.
                        </div>
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            El condenado puede pagar la multa en cualquier momento descontándose el equivalente a la pena privativa de libertad o prestación de servicios comunitarios cumplidos a la fecha.
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            Cuando se impone conjuntamente pena privativa de libertad y multa, se adiciona a la primera la que corresponde a la multa convertida.
                        </div>`
            }
        ]
    },
    {
        titulo: ``,
        capitulo: `
                <div style="text-align: center; margin-top: 30px; font-weight: bold;">
                    <div style="margin-bottom: 10px;">CAPÍTULO IV</div>
                    <div style="margin-bottom: 15px;">SUSPENSIÓN DE LA EJECUCIÓN DE LA PENA</div>
                </div>`,
        articulos: [
            {
                tipo: "Artículo",
                numero: "57",
                titulo: "Requisitos para la suspensión de la ejecución de la pena",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            El juez puede suspender la ejecución de la pena siempre que se reúnan los requisitos siguientes:
                        </div>

                        <div style="display: flex; margin-bottom: 10px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">1.</span>
                            <div>Que la condena se refiera a pena privativa de libertad no mayor de cinco años.</div>
                        </div>

                        <div style="display: flex; margin-bottom: 10px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">2.</span>
                            <div>Que la naturaleza, modalidad del hecho punible, comportamiento procesal y la personalidad del agente, permitan inferir al juez que aquel no volverá a cometer un nuevo delito. El pronóstico favorable sobre la conducta futura del condenado que formule la autoridad judicial requiere de debida motivación.</div>
                        </div>

                        <div style="display: flex; margin-bottom: 15px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">3.</span>
                            <div>Que the agente no tenga la condición de reincidente o habitual.</div>
                        </div>

                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            Excepcionalmente, puede aplicarse lo establecido en el presente artículo cuando la condena se refiera a pena privativa de libertad no mayor de ocho (8) años y el autor o partícipe del delito carezca de antecedentes penales y sea menor de veinticinco (25) años al momento de cometer el delito. Para este supuesto es aplicable lo previsto en el numeral 2 del párrafo anterior, exigiéndose una motivación reforzada.
                        </div>
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            El plazo de suspensión es de uno (1) a cuatro (4) años. En caso de la excepción prevista en el párrafo anterior, el plazo de suspensión puede extenderse hasta siete (7) años.
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            La suspensión de la ejecución de la pena es inaplicable a los funcionarios o servidores públicos condenados por cualquiera de los delitos dolosos previstos en los artículos 384, 387, segundo párrafo del artículo 389, 395, 396, 399 y 401 del Código, así como para las personas condenadas por los delitos de agresiones en contra de las mujeres o integrantes del grupo familiar (artículo 122-B), por el delito de lesiones leves previstas en los literales c), d) y e) del numeral 3) del artículo 122, o por los delitos comprendidos en los artículos 108-B, 152, 189, 200 (excepto los párrafos tercero y cuarto), 317 y 367 o por cualquiera de los delitos comprendidos en el Título I-A y en el Capítulo IX del Título IV del Libro Segundo.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "58",
                titulo: "Reglas de conducta",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            Al suspender la ejecución de la pena, el juez impone las siguientes reglas de conducta que sean aplicables al caso:
                        </div>

                        <div style="display: flex; margin-bottom: 10px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">1.</span>
                            <div>Prohibición de frecuentar determinados lugares;</div>
                        </div>

                        <div style="display: flex; margin-bottom: 10px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">2.</span>
                            <div>Prohibición de ausentarse del lugar donde reside sin autorización del juez;</div>
                        </div>

                        <div style="display: flex; margin-bottom: 10px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">3.</span>
                            <div>Comparecer mensualmente al juzgado, personal y obligatoriamente, para informar y justificar sus actividades;</div>
                        </div>

                        <div style="display: flex; margin-bottom: 10px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">4.</span>
                            <div>Reparar los daños ocasionados por el delito o cumplir con su pago fraccionado, salvo cuando demuestre que está en imposibilidad de hacerlo;</div>
                        </div>

                        <div style="display: flex; margin-bottom: 10px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">5.</span>
                            <div>Prohibición de poseer objetos susceptibles de facilitar la realización de otro delito;</div>
                        </div>

                        <div style="display: flex; margin-bottom: 10px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">6.</span>
                            <div>Obligación de someterse a un tratamiento de desintoxicación de drogas o alcohol;</div>
                        </div>

                        <div style="display: flex; margin-bottom: 10px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">7.</span>
                            <div>Obligación de seguir tratamiento o programas laborales o educativos, organizados por la autoridad de ejecución penal o institución competente; o,</div>
                        </div>

                        <div style="display: flex; margin-bottom: 10px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">8.</span>
                            <div>Los demás deberes adecuados a la rehabilitación social del agente, siempre que no atenten contra la dignidad del condenado.</div>
                        </div>

                        <div style="display: flex; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">9.</span>
                            <div>Obligación de someterse a un tratamiento psicológico o psiquiátrico.</div>
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "59",
                titulo: "Efectos del incumplimiento",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            Si durante el período de suspensión el condenado no cumpliera con las reglas de conducta impuestas o fuera condenado por otro delito, el Juez podrá, según los casos:
                        </div>

                        <div style="display: flex; margin-bottom: 10px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">1.</span>
                            <div>Amonestar al infractor;</div>
                        </div>

                        <div style="display: flex; margin-bottom: 10px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">2.</span>
                            <div>Prorrogar el período de suspensión hasta la mitad del plazo inicialmente fijado. En ningún caso la prórroga acumulada excederá de tres años; o</div>
                        </div>

                        <div style="display: flex; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">3.</span>
                            <div>Revocar la suspensión de la pena.</div>
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "60",
                titulo: "Revocación de la suspensión de la pena",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            La suspensión será revocada si dentro del plazo de prueba el agente es condenado por la comisión de un nuevo delito doloso cuya pena privativa de libertad sea superior a tres años; en cuyo caso se ejecutará la pena suspendida condicionalmente y la que corresponda por el segundo hecho punible.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "61",
                titulo: "Condena no pronunciada",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            La condena se considera como no pronunciada si transcurre el plazo de prueba sin que elmathbf condenado cometa nuevo delito doloso, ni infrinja de manera persistente y obstinada las reglas de conducta establecidas en la sentencia.
                        </div>`
            }
        ]
    },
    {
        titulo: ``,
        capitulo: `
                <div style="text-align: center; margin-top: 30px;">
                    <div style="margin-bottom: 15px;">CAPÍTULO V</div>
                    <div>RESERVA DEL FALLO CONDENATORIO</div>
                </div>`,
        articulos: [
            {
                tipo: "Artículo",
                numero: "62",
                titulo: "Reserva del fallo condenatorio. Circunstancias y requisitos",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            El juez puede disponer la reserva del fallo condenatorio siempre que de las circunstancias individuales, verificables al momento de la expedición de la sentencia, pueda colegir que el agente no cometerá nuevo delito. Los pronósticos favorables sobre la conducta futura del sentenciado que formule la autoridad judicial requieren de debida motivación.
                        </div>
                        <div style="margin-bottom: 10px; text-align: justify; line-height: 1.5;">
                            La reserva está dispuesta en los siguientes casos:
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">1.</span>
                            <div>Cuando el delito está sancionado con pena privativa de libertad no mayor de cuatro años o con multa;</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">2.</span>
                            <div>Cuando la pena a imponerse no supere las noventa jornadas de prestación de servicios a la comunidad o de limitación de días libres;</div>
                        </div>
                        <div style="display: flex; margin-bottom: 15px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">3.</span>
                            <div>Cuando la pena a imponerse no supere los dos años de inhabilitación.</div>
                        </div>
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            Excepcionalmente, puede aplicarse lo establecido en el presente artículo cuando la condena se refiera a pena privativa de libertad no mayor de siete años y el autor o partícipe del delito carezca de antecedentes penales y sea menor de 25 años al momento de cometer el delito. Para este supuesto es aplicable lo previsto en el primer párrafo, exigiéndose una motivación reforzada.
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            El plazo de reserva del fallo condenatorio es de uno a tres años, contado desde que la decisión adquiere calidad de cosa juzgada. En caso de la excepción prevista en el párrafo anterior el plazo de suspensión puede extenderse hasta seis (6) años.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "63",
                titulo: "Efectos de la Reserva de Fallo Condenatorio",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            El Juez al disponer la reserva del fallo condenatorio, se abstendrá de dictar la parte resolutiva de la sentencia, sin perjuicio de fijar las responsabilidades civiles que procedan.
                        </div>
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            La reserva de fallo se inscribirá en un registro especial, a cargo del Poder Judicial. El Registro informa exclusivamente a pedido escrito de los jueces de la República, con fines de verificación de las reglas de conducta o de comisión de nuevo delito doloso. El Registro es de carácter especial, confidencial y provisional y no permite, por ningún motivo, la expedición de certificados para fines distintos.
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            Cumplido el período de prueba queda sin efecto la inscripción en forma automática y no podrá expedirse de él constancia alguna, bajo responsabilidad. El Juez de origen, a pedido de parte, verifica dicha cancelación.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "64",
                titulo: "Reglas de conducta",
                texto: `
                        <div style="margin-bottom: 10px; text-align: justify; line-height: 1.5;">
                            Al disponer la reserva del fallo, el juez impone de manera debidamente motivada las siguientes reglas de conducta que resulten aplicables al caso:
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">1.</span>
                            <div>Prohibición de frecuentar determinados lugares;</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">2.</span>
                            <div>Prohibición de ausentarse del lugar donde reside sin autorización del juez;</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">3.</span>
                            <div>Comparecer mensualmente al juzgado, personal i obligatoriamente, para informar i justificar sus actividades;</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">4.</span>
                            <div>Reparar los daños ocasionados por el delito o cumplir con su pago fraccionado, salvo cuando demuestre que está en imposibilidad de hacerlo;</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">5.</span>
                            <div>Prohibición de poseer objetos susceptibles de facilitar la realización de otro delito;</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">6.</span>
                            <div>Obligación de someterse a un tratamiento de desintoxicación de drogas o alcohol;</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">7.</span>
                            <div>Obligación de seguir tratamiento o programas laborales o educativos, organizados por la autoridad de ejecución penal o institución competente; o,</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">8.</span>
                            <div>Los demás deberes adecuados a la rehabilitación social del agente, siempre que no atenten contra la dignidad del condenado.</div>
                        </div>
                        <div style="display: flex; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">9.</span>
                            <div>Obligación de someterse a un tratamiento psicológico o psiquiátrico.</div>
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "65",
                titulo: "Efectos del incumplimiento",
                texto: `
                        <div style="margin-bottom: 10px; text-align: justify; line-height: 1.5;">
                            Cuando el agente incumpliera las reglas de conducta impuestas, por razones atribuibles a su responsabilidad, el Juez podrá:
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">1.</span>
                            <div>Hacerle una severa advertencia;</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">2.</span>
                            <div>Prorrogar el régimen de prueba sin exceder la mitad del plazo inicialmente fijado. En ningún caso la prórroga acumulada sobrepasará de tres años; o</div>
                        </div>
                        <div style="display: flex; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">3.</span>
                            <div>Revocar el régimen de prueba.</div>
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "66",
                titulo: "Revocación del régimen de prueba",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            El régimen de prueba podrá ser revocado cuando el agente cometa un nuevo delito doloso por el cual sea condenado a pena privativa de libertad superior a tres años.
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            La revocación será obligatoria cuando la pena señalada para el delito cometido exceda de este límite. La revocación determina la aplicación de la pena que corresponde al delito, si no hubiera tenido lugar el régimen de prueba.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "67",
                titulo: "Extinción del régimen de prueba",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            Si el régimen de prueba no fuera revocado será considerado extinguido al cumplirse el plazo fijado i el juzgamiento como no efectuado.
                        </div>`
            }
        ]
    },
    {
        titulo: ``,
        capitulo: `
                <div style="text-align: center; margin-top: 30px;">
                    <div style="margin-bottom: 15px;">CAPÍTULO VI</div>
                    <div>EXENCIÓN DE PENA</div>
                </div>`,
        articulos: [
            {
                tipo: "Artículo",
                numero: "68",
                titulo: "Exención de pena",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            El juez puede eximir de sanción en los casos en que el delito esté previsto en la ley con pena privativa de libertad no mayor de dos años o con pena limitativa de derechos o con multa si la responsabilidad del agente fuere mínima.
                        </div>`
            }
        ]
    },
    {
        titulo: ``,
        capitulo: `
                <div style="text-align: center; margin-top: 30px;">
                    <div style="margin-bottom: 15px;">CAPÍTULO VII</div>
                    <div>REHABILITACIÓN</div>
                </div>`,
        articulos: [
            {
                tipo: "Artículo",
                numero: "69",
                titulo: "Rehabilitación automática",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            El que ha cumplido la pena o medida de seguridad que le fue impuesta, o que de otro modo ha extinguido su responsabilidad, queda rehabilitado sin más trámite, cuando además haya cancelado el íntegro de la reparación civil.
                        </div>
                        <div style="margin-bottom: 10px; text-align: justify; line-height: 1.5;">
                            La rehabilitación produce los efectos siguientes:
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">1.</span>
                            <div>Restituye a la persona en los derechos suspendidos o restringidos por la sentencia. No produce el efecto de reponer en los cargos, comisiones o empleos de los que se le privó; y,</div>
                        </div>
                        <div style="display: flex; margin-bottom: 15px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">2.</span>
                            <div>La cancelación de los antecedentes penales, judiciales y policiales. Los certificados correspondientes no deben expresar la pena rehabilitada ni la rehabilitación.</div>
                        </div>
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            Tratándose de pena privativa de libertad impuesta por la comisión de delito doloso, la cancelación de antecedentes penales, judiciales y policiales será provisional hasta por cinco años. Vencido dicho plazo y sin que medie reincidencia o habitualidad, la cancelación será definitiva.
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            La rehabilitación automática no opera cuando se trate de inhabilitación perpetua impuesta por la comisión de los delitos previstos en los artículos 296, 296-A primer, segundo y cuarto párrafo; 296-B, 297; o por la comisión de cualquiera de los delitos contra la Administración Pública; o por los delitos previstos en los capítulos IX, X y XI del Título IV del Libro Segundo del Código Penal así como el artículo 4-A del Decreto Ley 25475 y los delitos previstos en los artículos 1, 2 y 3 del Decreto Legislativo 1106, en cuyos casos la rehabilitación puede ser declarada por el órgano jurisdiccional que dictó la condena luego de transcurridos veinte años, conforme al artículo 59-B del Código de Ejecución Penal.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "70",
                titulo: "Prohibición de comunicación de antecedentes",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            Producida la rehabilitación, los registros o anotaciones de cualquier clase relativas a la condena impuesta solo podrán ser comunicados a solicitud del Ministerio Público o del juez.
                        </div>`
            }
        ]
    },
    {
        titulo: `
                <div style="text-align: center; margin-top: 30px;">
                    <div style="margin-bottom: 15px;">TÍTULO IV</div>
                    <div>DE LAS MEDIDAS DE SEGURIDAD</div>
                </div>`,
        capitulo: ``,
        articulos: [
            {
                tipo: "Artículo",
                numero: "71",
                titulo: "Medidas de seguridad. Clases",
                texto: `
                        <div style="margin-bottom: 10px; text-align: justify; line-height: 1.5;">
                            Las medidas de seguridad que establece este Código son:
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">1.</span>
                            <div>Internación; y</div>
                        </div>
                        <div style="display: flex; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">2.</span>
                            <div>Tratamiento ambulatorio.</div>
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "72",
                titulo: "Requisitos para la aplicación",
                texto: `
                        <div style="margin-bottom: 10px; text-align: justify; line-height: 1.5;">
                            Las medidas de seguridad se aplicarán en concurrencia con las circunstancias siguientes:
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">1.</span>
                            <div>Que el agente haya realizado un hecho previsto como delito; y</div>
                        </div>
                        <div style="display: flex; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">2.</span>
                            <div>Que del hecho y de la personalidad del agente pueda deducirse un pronóstico de comportamiento futuro que revele una elevada probabilidad de comisión de nuevos delitos.</div>
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "73",
                titulo: "Principio de Proporcionalidad",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            Las medidas de seguridad deben ser proporcionales con la peligrosidad delictual del agente, la gravedad del hecho cometido y los que probablemente cometiera si no fuese tratado.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "74",
                titulo: "Internación",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            La internación consiste en el ingreso y tratamiento del inimputable en un centro hospitalario especializado u otro establecimiento adecuado, con fines terapéuticos o de custodia.
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            Sólo podrá disponerse la internación cuando concurra el peligro de que el agente cometa delitos considerablemente graves.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "75",
                titulo: "Duración de la internación",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            La duración de la medida de internación no podrá exceder el tiempo de duración de la pena privativa de libertad que hubiera correspondido aplicarse por el delito cometido.
                        </div>
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            Sin perjuicio de que el Juez lo solicite cada seis meses, la autoridad del centro de internación deberá remitir al Juez una pericia médica a fin de darle a conocer si las causas que hicieron necesaria la aplicación de la medida han desaparecido.
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            En este último caso, el Juez hará cesar la medida de internación impuesta.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "76",
                titulo: "Tratamiento ambulatorio",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            El tratamiento ambulatorio será establecido y se aplicará conjuntamente con la pena al imputable relativo que lo requiera con fines terapéuticos o de rehabilitación.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "77",
                titulo: "Aplicación de internación antes de la pena. Cómputo",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            Cuando se necesite aplicar una medida de internación a un imputable relativo, o a un toxicómano o alcohólico imputable, el Juez dispondrá que ella tenga lugar antes de la pena.
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            El período de internación se computará como tiempo de cumplimiento de la pena sin perjuicio que el Juez pueda dar por extinguida la condena o reducir su duración atendiendo al éxito del tratamiento.
                        </div>`
            }
        ]
    },
    {
        titulo: `
                <div style="text-align: center; margin-top: 30px;">
                    <div style="margin-bottom: 15px;">TÍTULO V</div>
                    <div>EXTINCIÓN DE LA ACCIÓN PENAL Y DE LA PENA</div>
                </div>`,
        capitulo: ``,
        articulos: [
            {
                tipo: "Artículo",
                numero: "78",
                titulo: "Causales de extinción",
                texto: `
                        <div style="margin-bottom: 10px; text-align: justify; line-height: 1.5;">
                            La acción penal se extingue:
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">1.</span>
                            <div>Por muerte del imputado, prescripción, amnistía y el derecho de gracia.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">2.</span>
                            <div>Por autoridad de cosa juzgada.</div>
                        </div>
                        <div style="display: flex; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">3.</span>
                            <div>En los casos que sólo proceda la acción privada, ésta se extingue, además de las establecidas en el numeral 1, por desistimiento o transacción.</div>
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "79",
                titulo: "Extinción de la acción penal por sentencia civil",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            Se extingue la acción penal si de la sentencia ejecutoriada dictada en la jurisdicción civil, resulte que el hecho imputado como delito es lícito.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "80",
                titulo: "Plazos de prescripción de la acción penal",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            La acción penal prescribe en un tiempo igual al máximo de la pena fijada por la ley para el delito, si es privativa de libertad.
                        </div>
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            En caso de concurso real de delitos, las acciones prescriben separadamente en el plazo señalado para cada uno.
                        </div>
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            En caso de concurso ideal de delitos, las acciones prescriben cuando haya transcurrido un plazo igual al máximo correspondiente al delito más grave.
                        </div>
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            La prescripción no será mayor a veinte años. Tratándose de delitos sancionados con pena de cadena perpetua se extingue la acción penal a los treinta años. En los casos de delito de omisión de asistencia familiar, el plazo de prescripción se duplica.
                        </div>
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            En los delitos que merezcan otras penas, la acción prescribe a los dos años.
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            En casos de delitos cometidos por funcionarios y servidores públicos contra el patrimonio del Estado o de organismos sostenidos por este, o cometidos como integrante de organizaciones criminales, el plazo de prescripción se duplica.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "81",
                titulo: "Reducción de los plazos de prescripción",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            Los plazos de prescripción se reducen a la mitad cuando el agente tenía menos de veintiún o más de sesenticinco años al tiempo de la comisión del hecho punible.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "82",
                titulo: "Inicio de los plazos de prescripción",
                texto: `
                        <div style="margin-bottom: 10px; text-align: justify; line-height: 1.5;">
                            Los plazos de prescripción de la acción penal comienzan:
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">1.</span>
                            <div>En la tentativa, desde el día en que cesó la actividad delictuosa;</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">2.</span>
                            <div>En el delito instantáneo, a partir del día en que se consumó;</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">3.</span>
                            <div>En el delito continuado, desde el día en que terminó la actividad delictuosa; y</div>
                        </div>
                        <div style="display: flex; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">4.</span>
                            <div>En el delito permanente, a partir del día en que cesó la permanencia.</div>
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "83",
                titulo: "Interrupción de la prescripción de la acción penal",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            La prescripción de la acción se interrumpe por las actuaciones del Ministerio Público o de las autoridades judiciales, quedando sin efecto el tiempo transcurrido.
                        </div>
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            Después de la interrupción comienza a correr un nuevo plazo de prescripción, a partir del día siguiente de la última diligencia.
                        </div>
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            Se interrumpe igualmente la prescripción de la acción por la comisión de un nuevo delito doloso.
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            Sin embargo, la acción penal prescribe, en todo caso, cuando el tiempo transcurrido sobrepasa en una mitad al plazo ordinario de prescripción.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "84",
                titulo: "Suspensión de la prescripción",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            Si el comienzo o la continuación del proceso penal depende de cualquier cuestión que deba resolverse en otro procedimiento, se considera en suspenso la prescripción.
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            La suspensión de la prescripción no podrá prolongarse más allá de los plazos que se disponen para las etapas del proceso penal u otros procedimientos. En ningún caso dicha suspensión será mayor a un año.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "85",
                titulo: "Extinción de la ejecución de la pena. Casos",
                texto: `
                        <div style="margin-bottom: 10px; text-align: justify; line-height: 1.5;">
                            La ejecución de la pena se extingue:
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">1.</span>
                            <div>Por muerte del condenado, amnistía, indulto y prescripción;</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">2.</span>
                            <div>Por cumplimiento de la pena;</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">3.</span>
                            <div>Por exención de pena; y</div>
                        </div>
                        <div style="display: flex; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">4.</span>
                            <div>Por perdón del ofendido en los delitos de acción privada.</div>
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "86",
                titulo: "Plazo de prescripción de la pena",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            El plazo de prescripción de la pena es el mismo que alude o fija la ley para la prescripción de la acción penal. El plazo se contará desde el día en que la sentencia condenatoria quedó firme.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "87",
                titulo: "Interrupción del plazo de prescripción de la pena",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            Se interrumpe el plazo de prescripción de la pena, quedando sin efecto el tiempo transcurrido, por el comienzo de ejecución de la misma o por haber sido aprehendido el condenado a causa de la comisión de un nuevo delito doloso.
                        </div>
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            Una vez interrumpida la prescripción, comenzará a correr de nuevo, si hay lugar a ello, como si antes no se hubiese iniciado.
                        </div>
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            En los casos de revocación de la condena condicional o de la reserva del fallo condenatorio, la prescripción comienza a correr desde el día de la revocación.
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            Sin embargo, la pena prescribe, en todo caso, en los mismos plazos de la acción penal.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "88",
                titulo: "Individualización de la prescripción",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            La prescripción corre, se suspende o se interrumpe separadamente para cada uno de los partícipes del hecho punible.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "88-A",
                titulo: "Imprescriptibilidad de la pena y de la acción penal",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            La pena y la acción penal son imprescriptibles en los delitos previstos en los artículos 153, 153-A, 153-B y 153-C y en los capítulos IX, X y XI del Título IV del Libro Segundo del Código Penal.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "89",
                titulo: "Amnistía e indulto. Efectos",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            La amnistía elimina legalmente el hecho punible a que se refiere e implica el perpetuo silencio respecto a él. El indulto suprime la pena impuesta.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "90",
                titulo: "Cosa Juzgada",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            Nadie puede ser perseguido por segunda vez en razón de un hecho punible sobre el cual se falló definitivamente.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "91",
                titulo: "Renuncia a la prescripción de la acción penal",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            El imputado tiene derecho a renunciar a la prescripción de la acción penal.
                        </div>`
            }
        ]
    },
    {
        titulo: `
                <div style="text-align: center; margin-top: 30px;">
                    <div style="margin-bottom: 15px;">TÍTULO VI</div>
                    <div>DE LA REPARACIÓN CIVIL Y CONSECUENCIAS ACCESORIAS</div>
                </div>`,
        capitulo: `
                <div style="text-align: center; margin-top: 30px;">
                    <div style="margin-bottom: 15px;">CAPÍTULO I</div>
                    <div>REPARACIÓN CIVIL</div>
                </div>`,
        articulos: [
            {
                tipo: "Artículo",
                numero: "92",
                titulo: "La reparación civil: Oportunidad de su determinación",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            La reparación civil se determina conjuntamente con la pena y es un derecho de la víctima que debe efectivizarse durante el tiempo que dure la condena. El juez garantiza su cumplimiento.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "93",
                titulo: "Contenido de la reparación civil",
                texto: `
                        <div style="margin-bottom: 10px; text-align: justify; line-height: 1.5;">
                            La reparación comprende:
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">1.</span>
                            <div>La restitución del bien o, si no es posible, el pago de su valor; y</div>
                        </div>
                        <div style="display: flex; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">2.</span>
                            <div>La indemnización de los daños y perjuicios.</div>
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "94",
                titulo: "Restitución del bien",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            La restitución se hace con el mismo bien aunque se halle en poder de terceros, sin perjuicio del derecho de éstos para reclamar su valor contra quien corresponda.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "95",
                titulo: "Responsabilidad solidaria",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            La reparación civil es solidaria entre los responsables del hecho punible y los terceros civilmente obligados.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "96",
                titulo: "Transmisión de la reparación civil a herederos",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            La obligación de la reparación civil fijada en la sentencia se transmite a los herederos del responsable hasta donde alcancen los bienes de la herencia. El derecho a exigir la reparación civil se transfiere a los herederos del agraviado.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "97",
                titulo: "Protección de la reparación civil",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            Los actos practicados o las obligaciones adquiridas con posterioridad al hecho punible son nulos en cuanto disminuyan el patrimonio del condenado y lo hagan insuficiente para la reparación, sin perjuicio de los actos jurídicos celebrados de buena fe por terceros.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "98",
                titulo: "Condenado insolvente",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            En caso que el condenado no tenga bienes realizables, el Juez señalará hasta un tercio de su remuneración para el pago de la reparación civil.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "99",
                titulo: "Reparación civil de terceros responsables",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            Procede la acción civil contra los terceros cuando la sentencia dictada en la jurisdicción penal no alcanza a éstos.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "100",
                titulo: "Inextinguibilidad de la acción civil",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            La acción civil derivada del hecho punible no se extingue mientras subsista la acción penal.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "101",
                titulo: "Aplicación suplementaria del Código Civil",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            La reparación civil se rige, además, por las disposiciones pertinentes del Código Civil.
                        </div>`
            }
        ]
    },
    {
        titulo: ``,
        capitulo: `
                <div style="text-align: center; margin-top: 30px;">
                    <div style="margin-bottom: 15px;">CAPÍTULO II</div>
                    <div>CONSECUENCIAS ACCESORIAS</div>
                </div>`,
        articulos: [
            {
                tipo: "Artículo",
                numero: "102",
                titulo: "Decomiso de bienes provenientes del delito",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            El juez, siempre que no proceda el proceso autónomo de extinción de dominio, resuelve el decomiso de los instrumentos con que se hubiere ejecutado el delito, aun cuando pertenezcan a terceros, salvo cuando estos no hayan prestado su consentimiento para su utilización. Los objetos del delito son decomisados cuando, atendiendo a su naturaleza, no corresponda su entrega o devolución. Asimismo, dispone el decomiso de los efectos o ganancias del delito, cualesquiera sean las transformaciones que estos hubieren podido experimentar. El decomiso determina el traslado de dichos bienes a la esfera de titularidad del Estado.
                        </div>
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            El juez también dispone el decomiso de los bienes intrínsecamente delictivos, los que serán destruidos.
                        </div>
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            Cuando los efectos o ganancias del delito se hayan mezclado con bienes de procedencia lícita, procede el decomiso hasta el valor estimado de los bienes ilícitos mezclados, salvo que los primeros hubiesen sido utilizados como medios o instrumentos para ocultar o convertir los bienes de ilícita procedencia, en cuyo caso procederá el decomiso de ambos tipos de bienes.
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            Si no fuera posible el decomiso de los efectos o ganancias del delito porque han sido ocultados, destruidos, consumidos, transferidos a tercero de buena fe y a título oneroso o por cualquier otra razón análoga, el juez dispone el decomiso de los bienes o activos de titularidad del responsable o eventual tercero por un monto equivalente al valor de dichos efectos y ganancias.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "103",
                titulo: "Proporcionalidad",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            Cuando los efectos o instrumentos referidos en el artículo 102°, no sean de ilícito comercio y su valor no guarde proporción con la naturaleza y gravedad de la infracción penal podrá el Juez no decretar el decomiso o, cuando sea posible, decretarlo sólo parcialmente.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "104",
                titulo: "Privación de beneficios obtenidos por infracción penal a personas jurídicas",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            El Juez decretará, asimismo, la privación de los beneficios obtenidos por las personas jurídicas como consecuencia de la infracción penal cometida en el ejercicio de su actividad por sus funcionarios o dependientes, en cuanto sea necesaria para cubrir la responsabilidad pecuniaria de naturaleza civil de aquéllos, si sus bienes fueran insuficientes.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "105",
                titulo: "Medidas aplicables a las personas jurídicas",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            Si el hecho punible fuere cometido en ejercicio de la actividad de cualquier persona jurídica o utilizando su organización para favorecerlo o encubrirlo, el Juez deberá aplicar todas o algunas de las medidas siguientes:
                        </div>
                        <div style="display: flex; margin-bottom: 10px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">1.</span>
                            <div>Clausura de sus locales o establecimientos, con carácter temporal o definitivo. La clausura temporal no excederá de cinco años.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 10px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">2.</span>
                            <div>Disolución y liquidación de la sociedad, asociación, fundación, cooperativa o comité.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 10px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">3.</span>
                            <div>Suspensión de las actividades de la sociedad, asociación, fundación, cooperativa o comité por un plazo no mayor de dos años.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 15px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">4.</span>
                            <div>
                                <div style="margin-bottom: 5px;">Prohibición a la sociedad, fundación, asociación, cooperativa o comité de realizar en el futuro actividades, de la clase de aquellas en cuyo ejercicio se haya cometido, favorecido o encubierto el delito.</div>
                                <div>La prohibición podrá tener carácter temporal o definitivo. La prohibición temporal no será mayor de cinco años.</div>
                            </div>
                        </div>
                        <div style="display: flex; margin-bottom: 15px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">5.</span>
                            <div>Multa no menor de cinco ni mayor de quinientas unidades impositivas tributarias.</div>
                        </div>
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            Cuando alguna de estas medidas fuera aplicada, el Juez ordenará a la autoridad competente que disponga la intervención de la persona jurídica para salvaguardar los derechos de los trabajadores y de los acreedores de la persona jurídica hasta por un período de dos años.
                        </div>
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            El cambio de la razón social, la personería jurídica o la reorganización societaria, no impedirá la aplicación de estas medidas.
                        </div>
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            Respecto de los partidos políticos no se aplica lo dispuesto en los numerales 1, 2 y 3 del primer párrafo. A dichas organizaciones solo se aplica el régimen sancionador en los supuestos previstos en la Ley 28094, Ley de Organizaciones Políticas.
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            La responsabilidad penal se aplica de manera individual a los sujetos implicados en el ilícito.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "105-A",
                titulo: "Criterios para la determinación de las consecuencias aplicables a las personas jurídicas",
                texto: `
                        <div style="margin-bottom: 10px; text-align: justify; line-height: 1.5;">
                            Las medidas contempladas en el artículo anterior son aplicadas de forma motivada por el juez, en atención a los siguientes criterios de fundamentación y determinación, según corresponda:
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">1.</span>
                            <div>Prevenir la continuidad de la utilización de la persona jurídica en actividades delictivas.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">2.</span>
                            <div>La modalidad y la motivación de la utilización de la persona jurídica en el hecho punible.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">3.</span>
                            <div>La gravedad del hecho punible realizado.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">4.</span>
                            <div>La extensión del daño o peligro causado.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">5.</span>
                            <div>El beneficio económico obtenido con el delito.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">6.</span>
                            <div>La reparación espontánea de las consecuencias dañosas del hecho punible.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 15px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">7.</span>
                            <div>La finalidad real de la organización, actividades, recursos o establecimientos de la persona jurídica.</div>
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            La disolución de la persona jurídica se aplica siempre que resulte evidente que ella fue constituida y operó habitualmente para favorecer, facilitar o encubrir actividades delictivas.
                        </div>`
            }
        ]
    },
    {
        titulo: `
                <div style="text-align: center; margin-top: 30px;">
                    <div style="margin-bottom: 10px; font-weight: bold;">LIBRO SEGUNDO</div>
                    <div style="margin-bottom: 10px; font-weight: bold;">PARTE ESPECIAL - DELITOS</div>
                    <div style="margin-bottom: 15px; margin-top: 20px;">TÍTULO I</div>
                    <div>DELITOS CONTRA LA VIDA, EL CUERPO Y LA SALUD</div>
                </div>`,
        capitulo: `
                <div style="text-align: center; margin-top: 30px;">
                    <div style="margin-bottom: 15px;">CAPÍTULO I</div>
                    <div>HOMICIDIO</div>
                </div>`,
        articulos: [
            {
                tipo: "Artículo",
                numero: "106",
                titulo: "Homicidio Simple",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            El que mata a otro será reprimido con pena privativa de libertad no menor de seis ni mayor de veinte años.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "107",
                titulo: "Parricidio",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            El que, a sabiendas, mata a su ascendiente, descendiente, natural o adoptivo, o a una persona con quien sostiene o haya sostenido una relación conyugal o de convivencia, será reprimido con pena privativa de libertad no menor de quince años.
                        </div>
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            La pena privativa de libertad será no menor de veinticinco años, cuando concurra cualquiera de las circunstancias agravantes previstas en los numerales 1, 2, 3 y 4 del artículo 108.
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            En caso de que el agente tenga hijos con la víctima, además será reprimido con la pena de inhabilitación prevista en el inciso 5 del artículo 36.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "108",
                titulo: "Homicidio calificado",
                texto: `
                        <div style="margin-bottom: 10px; text-align: justify; line-height: 1.5;">
                            Será reprimido con pena privativa de libertad no menor de quince años el que mate a otro concurriendo cualquiera de las circunstancias siguientes:
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">1.</span>
                            <div>Por ferocidad, codicia, lucro o por placer.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">2.</span>
                            <div>Para facilitar u ocultar otro delito.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">3.</span>
                            <div>Con gran crueldad o alevosía.</div>
                        </div>
                        <div style="display: flex; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">4.</span>
                            <div>Por fuego, explosión o cualquier otro medio capaz de poner en peligro la vida o salud de otras personas.</div>
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "108-A",
                titulo: "Homicidio Calificado por la Condición de la víctima",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            El que mata a uno de los altos funcionarios comprendidos en el artículo 39 de la Constitución Política del Perú, a un miembro de la Policía Nacional, de las Fuerzas Armadas, a un Magistrado del Poder Judicial o del Ministerio Público o a un Miembro del Tribunal Constitucional o a cualquier autoridad elegida por de mandato popular, en el ejercicio de sus funciones o como consecuencia de ellas, será reprimido con pena privativa de libertad no menor de 25 años ni mayor de 35 años.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "108-B",
                titulo: "Feminicidio",
                texto: `
                        <div style="margin-bottom: 10px; text-align: justify; line-height: 1.5;">
                            Será reprimido con pena privativa de libertad no menor de veinte años el que mata a una mujer por su condición de tal, en cualquiera de los siguientes contextos:
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">1.</span>
                            <div>Violencia familiar.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">2.</span>
                            <div>Coacción, hostigamiento o acoso sexual.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">3.</span>
                            <div>Abuso de poder, confianza o de cualquier otra posición o relación que le confiera autoridad al agente.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 15px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">4.</span>
                            <div>Cualquier forma de discriminación contra la mujer, independientemente de que exista o haya existido una relación conyugal o de convivencia con el agente.</div>
                        </div>
                        <div style="margin-bottom: 10px; text-align: justify; line-height: 1.5;">
                            La pena privativa de libertad será no menor de treinta años cuando concurra cualquiera de las siguientes circunstancias agravantes:
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">1.</span>
                            <div>Si la víctima era menor de edad o adulta mayor.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">2.</span>
                            <div>Si la víctima se encontraba en estado de gestación.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">3.</span>
                            <div>Si la víctima se encontraba bajo cuidado o responsabilidad del agente.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">4.</span>
                            <div>Si la víctima fue sometida previamente a violación sexual o actos de mutilación.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">5.</span>
                            <div>Si al momento de cometerse el delito, la víctima tiene cualquier tipo de discapacidad.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">6.</span>
                            <div>Si la víctima fue sometida para fines de trata de personas o cualquier tipo de explotación humana.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">7.</span>
                            <div>Cuando hubiera concurrido cualquiera de las circunstancias agravantes establecidas en el artículo 108.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">8.</span>
                            <div>Si, en el momento de cometerse el delito, estuviera presente cualquier niña, niño o adolescente.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 15px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">9.</span>
                            <div>Si el agente actúa en estado de ebriedad, con presencia de alcohol en la sangre en proporción mayor de 0.25 gramos-litro, o bajo efecto de drogas tóxicas, estupefacientes, sustancias psicotrópicas o sintéticas.</div>
                        </div>
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            La pena será de cadena perpetua cuando concurran dos o más circunstancias agravantes.
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            En todas las circunstancias previstas en el presente artículo, se impondrá la pena de inhabilitación conforme a los numerales 5 y 11 del artículo 36 del presente Código y los artículos 75 y 77 del Código de los Niños y Adolescentes, según corresponda.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "108-C",
                titulo: "Sicariato",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            El que mata a otro por orden, encargo o acuerdo, con el propósito de obtener para sí o para otro un beneficio económico o de cualquier otra índole, será reprimido con pena privativa de libertad no menor de treinta años y con inhabilitación establecida en el numeral 6 del artículo 36, según corresponda.
                        </div>
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            Las mismas penas se imponen a quien ordena, encarga, acuerda el sicariato o actúa como intermediario.
                        </div>
                        <div style="margin-bottom: 10px; text-align: justify; line-height: 1.5;">
                            Será reprimido con pena privativa de libertad de cadena perpetua si la conducta descrita en el primer párrafo se realiza:
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">1.</span>
                            <div>Valiéndose de un menor de edad o de otro inimputable para ejecutar la conducta.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">2.</span>
                            <div>Para dar cumplimiento a la orden de una banda criminal u organización criminal.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">3.</span>
                            <div>Cuando en la ejecución intervienen dos o más personas.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">4.</span>
                            <div>Cuando las víctimas sean dos o más personas.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">5.</span>
                            <div>Cuando las víctimas estén comprendidas en los artículos 107 primer párrafo, 108-A y 108-B primer párrafo.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">6.</span>
                            <div>Cuando se utilice armas de guerra.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">7.</span>
                            <div>Contra quien realiza o promueve cualquier tipo de servicio público, actividad comercial o actividad empresarial.</div>
                        </div>
                        <div style="display: flex; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">8.</span>
                            <div>Para dar cumplimiento a una orden proveniente del interior de un establecimiento penitenciario.</div>
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "108-D",
                titulo: "La conspiración y el ofrecimiento para el delito de sicariato",
                texto: `
                        <div style="margin-bottom: 10px; text-align: justify; line-height: 1.5;">
                            Será reprimido con pena privativa de libertad no menor de ocho ni mayor de diez años y con inhabilitación establecida en el numeral 6 del artículo 36, según corresponda:
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">1.</span>
                            <div>Quien participa en una conspiración para promover, favorecer o facilitar el delito de sicariato.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 15px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">2.</span>
                            <div>Quien solicita u ofrece a otros, cometer el delito de sicariato o actúa como intermediario.</div>
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            La pena privativa de libertad será no menor de diez ni mayor de quince años, si las conductas antes descritas se realizan con la intervención de un menor de edad u otro inimputable, o desde el interior de un establecimiento penitenciario.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "109",
                titulo: "Homicidio por emoción violenta",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            El que mata a otro bajo el imperio de una emoción violenta que las circunstancias hacen excusable, será reprimido con pena privativa de libertad, no menor de tres ni mayor de cinco años.
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            Si concurre algunas de las circunstancias previstas en el artículo 107, la pena será no menor de cinco ni mayor de diez años.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "110",
                titulo: "Infanticidio",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            La madre que mata a su hijo durante el parto o bajo la influencia del estado puerperal, será reprimida con pena privativa de libertad no menor de uno ni mayor de cuatro años, o con prestación de servicio comunitario de cincuentidós a ciento cuatro jornadas.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "111",
                titulo: "Homicidio Culposo",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            El que, por culpa, ocasiona la muerte de una persona, será reprimido con pena privativa de libertad no mayor de dos años o con prestación de servicios comunitarios de cincuenta y dos a ciento cuatro jornadas.
                        </div>
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            La pena privativa de la libertad será no menor de un año ni mayor de cuatro años si el delito resulta de la inobservancia de reglas de profesión, de ocupación o industria y no menor de un año ni mayor de seis años cuando sean varias las víctimas del mismo hecho.
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            La pena privativa de la libertad será no menor de cuatro años ni mayor de ocho años e inhabilitación, según corresponda, conforme al artículo 36° -incisos 4), 6) y 7)-, si la muerte se comete utilizando vehículo motorizado o arma de fuego, estando el agente bajo el efecto de drogas tóxicas, estupefacientes, sustancias psicotrópicas o sintéticas, o con presencia de alcohol en la sangre en proporción mayor de 0.5 gramos-litro, en el caso de transporte particular, o mayor de 0.25 gramos-litro en el caso de transporte público de pasajeros, mercancías o carga en general, o cuando el delito resulte de la inobservancia de reglas técnicas de tránsito.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "112",
                titulo: "Homicidio piadoso",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            El que, por piedad, mata a un enfermo incurable que le solicita de manera expresa y consciente para poner fin a sus intolerables dolores, será reprimido con pena privativa de libertad no mayor de tres años.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "113",
                titulo: "Instigación o ayuda al suicidio",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            El que instiga a otro al suicidio o lo ayuda a cometerlo, será reprimido, si el suicidio se ha consumado o intentado, con pena privativa de libertad no menor de uno ni mayor de cuatro años.
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            La pena será no menor de dos ni mayor de cinco años, si el agente actuó por un móvil egoísta.
                        </div>`
            }
        ]
    },
    {
        titulo: ``,
        capitulo: `
                <div style="text-align: center; margin-top: 30px;">
                    <div style="margin-bottom: 15px;">CAPÍTULO II</div>
                    <div>ABORTO</div>
                </div>`,
        articulos: [
            {
                tipo: "Artículo",
                numero: "114",
                titulo: "Autoaborto",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            La mujer que causa su aborto, o consiente que otro le practique, será reprimida con pena privativa de libertad no mayor de dos años o con prestación de servicio comunitario de cincuentidós a ciento cuatro jornadas.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "115",
                titulo: "Aborto consentido",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            El que causa el aborto con el consentimiento de la gestante, será reprimido con pena privativa de libertad no menor de uno ni mayor de cuatro años.
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            Si sobreviene la muerte de la mujer y el agente pudo prever este resultado, la pena será no menor de dos ni mayor de cinco años.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "116",
                titulo: "Aborto sin consentimiento",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            El que hace abortar a una mujer sin su consentimiento, será reprimido con pena privativa de libertad no menor de tres ni mayor de cinco años.
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            Si sobreviene la muerte de la mujer y el agente pudo prever este resultado, la pena será no menor de cinco ni mayor de diez años.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "117",
                titulo: "Agravación de la pena por la calidad del sujeto",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            El médico, obstetra, farmacéutico, o cualquier profesional sanitario, que abusa de su ciencia o arte para causar el aborto, será reprimido con la pena de los artículos 115° y 116° e inhabilitación conforme al artículo 36°, incisos 4 y 8.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "118",
                titulo: "Aborto preterintencional",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            El que, con violencia, ocasiona un aborto, sin haber tenido el propósito de causarlo, siendo notorio o constándole el embarazo, será reprimido con pena privativa de libertad no mayor de dos años, o con prestación de servicio comunitario de cincuentidós a ciento cuatro jornadas.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "119",
                titulo: "Aborto terapeútico",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            No es punible el aborto practicado por un médico con el consentimiento de la mujer embarazada o de su representante legal, si lo tuviere, cuando es el único medio para salvar la vida de la gestante o para evitar en su salud un mal grave y permanente.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "120",
                titulo: "Aborto sentimental y eugenésico",
                texto: `
                        <div style="margin-bottom: 10px; text-align: justify; line-height: 1.5;">
                            El aborto será reprimido con pena privativa de libertad no mayor de tres meses:
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">1.</span>
                            <div>Cuando el embarazo sea consecuencia de violación sexual fuera de matrimonio o inseminación artificial no consentida y ocurrida fuera de matrimonio, siempre que los hechos hubieren sido denunciados o investigados, cuando menos policialmente; o</div>
                        </div>
                        <div style="display: flex; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">2.</span>
                            <div>Cuando es probable que el ser en formación conlleve al nacimiento graves taras físicas o psíquicas, siempre que exista diagnóstico médico.</div>
                        </div>`
            }
        ]
    },
    {
        titulo: ``,
        capitulo: `
                <div style="text-align: center; margin-top: 30px;">
                    <div style="margin-bottom: 15px;">CAPÍTULO III</div>
                    <div>LESIONES</div>
                </div>`,
        articulos: [
            {
                tipo: "Artículo",
                numero: "121",
                titulo: "Lesiones graves",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            El que causa a otro daño grave en el cuerpo o en la salud física o mental, será reprimido con pena privativa de libertad no menor de cuatro ni mayor de ocho años.
                        </div>
                        <div style="margin-bottom: 10px; text-align: justify; line-height: 1.5;">
                            Se consideran lesiones graves:
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">1.</span>
                            <div>Las que ponen en peligro inminente la vida de la víctima.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">2.</span>
                            <div>Las que mutilan un miembro u órgano principal del cuerpo o lo hacen impropio para su función, causan a una persona incapacidad para el trabajo, invalidez o anomalía psíquica permanente o la desfiguran de manera grave y permanente.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">3.</span>
                            <div>Las que infieren cualquier otro daño a la integridad corporal, o a la salud física o mental de una persona que requiera veinte o más días de asistencia o descanso según prescripción facultativa, o se determina un nivel grave o muy grave de daño psíquico.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 15px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">4.</span>
                            <div>La afectación psicológica generada como consecuencia de que el agente obligue a otro a presenciar cualquier modalidad de homicidio doloso, lesión dolosa o violación sexual, o pudiendo evitar esta situación no lo hubiera hecho.</div>
                        </div>
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            Cuando la víctima muere a consecuencia de la lesión y el agente pudo prever este resultado, la pena será no menor de seis ni mayor de doce años.
                        </div>
                        <div style="margin-bottom: 10px; text-align: justify; line-height: 1.5;">
                            En los supuestos 1, 2 y 3 del primer párrafo, la pena privativa de libertad será no menor de seis años ni mayor de doce años cuando concurra cualquiera de las siguientes circunstancias agravantes:
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">1.</span>
                            <div>La víctima es miembro de la Policía Nacional del Perú o de las Fuerzas Armadas, magistrado del Poder Judicial o del Ministerio Público, magistrado del Tribunal Constitucional, autoridad elegida por mandato popular, servidor civil o autoridad administrativa relacionada con el transporte, tránsito terrestre o los servicios complementarios relacionados con dichas materias y es lesionada en ejercicio de sus funciones o como consecuencia de ellas.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">2.</span>
                            <div>La víctima es menor de edad, adulta mayor o tiene discapacidad y el agente se aprovecha de dicha condición.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">3.</span>
                            <div>Para cometer el delito se hubiera utilizado cualquier tipo de arma, objeto contundente o instrumento que ponga en riesgo la vida de la víctima.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">4.</span>
                            <div>El delito se hubiera realizado con ensañamiento o alevosía.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 15px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">5.</span>
                            <div>La víctima es un profesional o técnico o auxiliar asistencial de la salud que desarrolla actividad asistencial y es lesionada a causa del ejercicio de sus labores en el ámbito público o privado.</div>
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            En este caso, si la muerte se produce como consecuencia de cualquiera de las agravantes del segundo párrafo, se aplica pena privativa de libertad no menor de quince ni mayor de veinte años.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "121-A",
                titulo: "Derogado",
                texto: `
                        <div style="text-align: justify; line-height: 1.5; color: #777; font-style: italic;">
                            Artículo derogado conforme a las modificaciones del ordenamiento penal vigente.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "121-B",
                titulo: "Lesiones graves por violencia contra las mujeres e integrantes del grupo familiar",
                texto: `
                        <div style="margin-bottom: 10px; text-align: justify; line-height: 1.5;">
                            En los supuestos previstos en el primer párrafo del artículo 121 se aplica pena privativa de libertad no menor de seis ni mayor de doce años e inhabilitación conforme a los numerales 5 y 11 del artículo 36 del presente Código y los artículos 75 y 77 del Código de los Niños y Adolescentes, según corresponda, cuando:
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">1.</span>
                            <div>La víctima es mujer y es lesionada por su condición de tal en cualquiera de los contextos previstos en el primer párrafo del artículo 108-B.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">2.</span>
                            <div>La víctima se encuentra en estado de gestación.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">3.</span>
                            <div>La víctima es cónyuge; excónyuge; conviviente; exconviviente; padrastro; madrastra; ascendiente o descendiente por consanguinidad, adopción o afinidad; pariente colateral del cónyuge y conviviente hasta el cuarto grado de consanguinidad y segundo de afinidad; habita en el mismo hogar, siempre que no medien relaciones contractuales o laborales; o es con quien se ha procreado hijos en común, independientemente de que se conviva o no al momento de producirse los actos de violencia, o la violencia se da en cualquiera de los contextos de los numerales 1, 2 y 3 del primer párrafo del artículo 108-B.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">4.</span>
                            <div>La víctima mantiene cualquier tipo de relación de dependencia o subordinación sea de autoridad, económica, cuidado, laboral o contractual y el agente se hubiera aprovechado de esta situación.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">5.</span>
                            <div>Para cometer el delito se hubiera utilizado cualquier tipo de arma, objeto contundente o instrumento que ponga en riesgo la vida de la víctima.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">6.</span>
                            <div>El delito se hubiera realizado en cualquiera de las circunstancias del artículo 108.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">7.</span>
                            <div>La afectación psicológica a la que se hace referencia en el numeral 4 del primer párrafo del artículo 121, se causa a cualquier niña, niño o adolescente en contextos de violencia familiar o de violación sexual.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 15px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">8.</span>
                            <div>Si el agente actúa en estado de ebriedad, con presencia de alcohol en la sangre en proporción mayor de 0.25 gramos-litro, o bajo efecto de drogas tóxicas, estupefacientes, sustancias psicotrópicas o sintéticas.</div>
                        </div>
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            La pena será no menor de doce ni mayor de quince años cuando concurran dos o más circunstancias agravantes.
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            Cuando la víctima muere a consecuencia de cualquiera de las agravantes y el agente pudo prever ese resultado, la pena será no menor de quince ni mayor de veinte años.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "122",
                titulo: "Lesiones leves",
                texto: `
                        <div style="display: flex; margin-bottom: 10px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">1.</span>
                            <div>El que causa a otro lesiones en el cuerpo o en la salud física o mental que requiera más de diez y menos de veinte días de asistencia o descanso, según prescripción facultativa, o nivel moderado de daño psíquico, será reprimido con pena privativa de libertad no menor de dos ni mayor de cinco años.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 10px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">2.</span>
                            <div>La pena privativa de libertad será no menor de seis ni mayor de doce años si la víctima muere como consecuencia de la lesión prevista en el párrafo precedente y el agente pudo prever ese resultado.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 10px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">3.</span>
                            <div>
                                <div style="margin-bottom: 10px;">La pena privativa de libertad será no menor de tres ni mayor de seis años e inhabilitación conforme a los numerales 5 y 11 del artículo 36 del presente Código y los artículos 75 y 77 del Código de los Niños y Adolescentes, según corresponda, cuando:</div>
                                <div style="display: flex; margin-bottom: 5px; margin-left: 20px;">
                                    <span style="min-width: 30px;">a.</span>
                                    <div>La víctima es miembro de la Policía Nacional del Perú o de las Fuerzas Armadas, magistrado del Poder Judicial, del Ministerio Público o del Tribunal Constitucional o autoridad elegida por mandato popular o servidor civil y es lesionada en el ejercicio de sus funciones oficiales o como consecuencia de ellas.</div>
                                </div>
                                <div style="display: flex; margin-bottom: 5px; margin-left: 20px;">
                                    <span style="min-width: 30px;">b.</span>
                                    <div>La víctima es menor de edad, adulta mayor o tiene discapacidad y el agente se aprovecha de dicha condición.</div>
                                </div>
                                <div style="display: flex; margin-bottom: 5px; margin-left: 20px;">
                                    <span style="min-width: 30px;">c.</span>
                                    <div>La víctima es mujer y es lesionada por su condición de tal, en cualquiera de los contextos previstos en el primer párrafo del artículo 108-B.</div>
                                </div>
                                <div style="display: flex; margin-bottom: 5px; margin-left: 20px;">
                                    <span style="min-width: 30px;">d.</span>
                                    <div>La víctima se encontraba en estado de gestación.</div>
                                </div>
                                <div style="display: flex; margin-bottom: 5px; margin-left: 20px;">
                                    <span style="min-width: 30px;">e.</span>
                                    <div>La víctima es el cónyuge; excónyuge; conviviente; exconviviente; padrastro; madrastra; ascendiente o descendiente por consanguinidad, adopción o afinidad; pariente colateral del cónyuge y conviviente hasta el cuarto grado de consanguinidad y segundo de afinidad; habita en el mismo hogar, siempre que no medien relaciones contractuales o laborales; o es con quien se ha procreado hijos en común, independientemente de que se conviva o no al momento de producirse los actos de violencia, o la violencia se da en cualquiera de los contextos de los numerales 1, 2 y 3 del primer párrafo del artículo 108-B.</div>
                                </div>
                                <div style="display: flex; margin-bottom: 5px; margin-left: 20px;">
                                    <span style="min-width: 30px;">f.</span>
                                    <div>La víctima mantiene cualquier tipo de relación de dependencia o subordinación sea de autoridad, económica, cuidado, laboral o contractual y el agente se hubiera aprovechado de esta situación.</div>
                                </div>
                                <div style="display: flex; margin-bottom: 5px; margin-left: 20px;">
                                    <span style="min-width: 30px;">g.</span>
                                    <div>Para cometer el delito se hubiera utilizado cualquier tipo de arma, objeto contundente o instrumento que ponga en riesgo la vida de la víctima.</div>
                                </div>
                                <div style="display: flex; margin-bottom: 5px; margin-left: 20px;">
                                    <span style="min-width: 30px;">h.</span>
                                    <div>El delito se hubiera realizado con ensañamiento o alevosía.</div>
                                </div>
                                <div style="display: flex; margin-bottom: 5px; margin-left: 20px;">
                                    <span style="min-width: 30px;">i.</span>
                                    <div>Si el agente actúa en estado de ebriedad, con presencia de alcohol en la sangre en proporción mayor de 0.25 gramos-litro, o bajo efecto de drogas tóxicas, estupefacientes, sustancias psicotrópicas o sintéticas.</div>
                                </div>
                                <div style="display: flex; margin-left: 20px;">
                                    <span style="min-width: 30px;">j.</span>
                                    <div>La víctima es un profesional o técnico o auxiliar asistencial de la salud que desarrolla actividad asistencial y es lesionada a causa del ejercicio de sus labores en el ámbito público o privado.</div>
                                </div>
                            </div>
                        </div>
                        <div style="display: flex; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">4.</span>
                            <div>La pena privativa de libertad será no menor de ocho ni mayor de catorce años si la víctima muere como consecuencia de la lesión a que se refiere el párrafo 3 y el agente pudo prever ese resultado.</div>
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "122-A",
                titulo: "Derogado",
                texto: `
                        <div style="text-align: justify; line-height: 1.5; color: #777; font-style: italic;">
                            Artículo derogado conforme a las modificaciones del ordenamiento penal vigente.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "122-B",
                titulo: "Agresiones en contra de las mujeres o integrantes del grupo familiar",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            El que de cualquier modo cause lesiones corporales que requieran menos de diez días de asistencia o descanso según prescripción facultativa, o algún tipo de afectación psicológica, cognitiva o conductual que no califique como daño psíquico a una mujer por su condición de tal o a integrantes del grupo familiar en cualquiera de los contextos previstos en el primer párrafo del artículo 108-B, será reprimido con pena privativa de libertad no menor de uno ni mayor de tres años e inhabilitación conforme a los numerales 5 y 11 del artículo 36 del presente Código y los artículos 75 y 77 del Código de los Niños y Adolescentes, según corresponda.
                        </div>
                        <div style="margin-bottom: 10px; text-align: justify; line-height: 1.5;">
                            La pena será no menor de dos ni mayor de tres años, cuando en los supuestos del primer párrafo se presenten las siguientes agravantes:
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">1.</span>
                            <div>Se utiliza cualquier tipo de arma, objeto contundente o instrumento que ponga en riesgo la vida de la víctima.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">2.</span>
                            <div>El hecho se comete con ensañamiento o alevosía.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">3.</span>
                            <div>La víctima se encuentra en estado de gestación.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">4.</span>
                            <div>La víctima es menor de edad, adulta mayor o tiene discapacidad o si padeciera de enfermedad en estado terminal y el agente se aprovecha de dicha condición.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">5.</span>
                            <div>Si en la agresión participan dos o más personas.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">6.</span>
                            <div>Si se contraviene una medida de protección emitida por la autoridad competente.</div>
                        </div>
                        <div style="display: flex; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">7.</span>
                            <div>Si los actos se realizan en presencia de cualquier niña, niño o adolescente.</div>
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "123",
                titulo: "Lesiones preterintencionales con resultado fortuito",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            Cuando el agente produzca un resultado grave que no quiso causar, ni pudo prever, la pena será disminuida prudencialmente hasta la que corresponda a la lesión que quiso inferir.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "124",
                titulo: "Lesiones Culposas",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            El que por culpa causa a otro un daño en el cuerpo o en la salud, será reprimido, por acción privada, con pena privativa de libertad no mayor de un año y con sesenta a ciento veinte días-multa.
                        </div>
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            La pena será privativa de libertad no menor de uno ni mayor de dos años y de sesenta a ciento veinte días-multa, si la lesión es grave, de conformidad a los presupuestos establecidos en el artículo 121°.
                        </div>
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            La pena privativa de libertad será no menor de uno ni mayor de tres años si el delito resulta de la inobservancia de reglas de profesión, ocupación o industria y no menor de un año ni mayor de cuatro años cuando sean varias las víctimas del mismo hecho.
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            La pena privativa de la libertad será no menor de cuatro años ni mayor de seis años e inhabilitación, según corresponda, conforme al artículo 36° —incisos 4), 6) y 7)—, si la lesión se comete utilizando vehículo motorizado o arma de fuego, estando el agente bajo el efecto de drogas tóxicas, estupefacientes, sustancias psicotrópicas o sintéticas, o con presencia de alcohol en la sangre en proporción mayor de 0.5 gramos-litro, en el caso de transporte particular, o mayor de 0.25 gramos-litro en el caso de transporte público de pasajeros, mercancías o carga en general, o cuando el delito resulte de la inobservancia de reglas técnicas de tránsito.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "124-A",
                titulo: "Daños al Concebido",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            El que causa daño en el cuerpo o en la salud del concebido, será reprimido con pena privativa de la libertad no menor de un año ni mayor de tres.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "124-B",
                titulo: "Del daño psíquico y la afectación psicológica, cognitiva o conductual",
                texto: `
                        <div style="margin-bottom: 10px; text-align: justify; line-height: 1.5;">
                            El nivel del daño psíquico es determinado a través de un examen pericial o cualquier otro medio idóneo, con la siguiente equivalencia:
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">A.</span>
                            <div>Falta de lesiones leves: nivel leve de daño psíquico.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">B.</span>
                            <div>Lesiones leves: nivel moderado de daño psíquico.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 15px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">C.</span>
                            <div>Lesiones graves: nivel grave o muy grave de daño psíquico.</div>
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            La afectación psicológica, cognitiva o conductual, puede ser determinada a través de un examen pericial o cualquier otro elemento probatorio objetivo similar al que sea emitido por entidades públicas o privadas especializadas en la materia, sin someterse a la equivalencia del daño psíquico.
                        </div>`
            }
        ]
    },
    {
        titulo: ``,
        capitulo: `
                <div style="text-align: center; margin-top: 30px;">
                    <div style="margin-bottom: 15px;">CAPÍTULO IV</div>
                    <div>EXPOSICIÓN A PELIGRO O ABANDONO DE PERSONAS EN PELIGRO</div>
                </div>`,
        articulos: [
            {
                tipo: "Artículo",
                numero: "125",
                titulo: "Exposición o abandono peligrosos",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            El que expone a peligro de muerte o de grave e inminente daño a la salud o abandona en iguales circunstancias a un menor de edad o a una persona incapaz de valerse por sí misma que estén legalmente bajo su protección o que se hallen de hecho bajo su cuidado, será reprimido con pena privativa de libertad no menor de uno ni mayor de cuatro años.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "125-A",
                titulo: "Peligro por arrojo indebido de residuos sólidos en cauces naturales",
                texto: `
                        <div style="display: flex; margin-bottom: 10px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 65px;">125-A.1.</span>
                            <div>El que expone a otras personas a peligro de muerte o de grave e inminente daño a la salud, arrojando residuos sólidos en el cauce, lecho, ribera o faja marginal de un río o quebrada será reprimido con pena privativa de libertad no menor de dos ni mayor de cuatro años.</div>
                        </div>
                        <div style="display: flex; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 65px;">125-A.2.</span>
                            <div>La pena será no menor de cuatro ni mayor de seis años, si el agente utiliza camiones u otro tipo de maquinaria pesada para arrojar los residuos sólidos, o si, como consecuencia de la conducta, se causa daño a obras de infraestructura pública.</div>
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "126",
                titulo: "Omisión de socorro y exposición a peligro",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            El que omite prestar socorro a una persona que ha herido o incapacitado, poniendo en peligro su vida o su salud, será reprimido con pena privativa de libertad no mayor de tres años.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "127",
                titulo: "Omisión de auxilio o aviso a la autoridad",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            El que encuentra a un herido o a cualquier otra persona en estado de grave e inminente peligro y omite prestarle auxilio inmediato pudiendo hacerlo sin riesgo propio o de tercero o se abstiene de dar aviso a la autoridad, será reprimido con pena privativa de libertad no mayor de un año o con treinta a ciento veinte días-multa.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "128",
                titulo: "Exposición a peligro de persona dependiente",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            El que expone a peligro la vida o la salud de una persona colocada bajo su autoridad, dependencia, tutela, curatela o vigilancia, sea privándola de alimentos o cuidados indispensables, sea abusando de los medios de corrección o disciplina, o cualquier acto análogo, será reprimido con pena privativa de libertad no menor de uno ni mayor de cuatro años.
                        </div>
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            En los casos en que el agente tenga vínculo de parentesco consanguíneo o la víctima fuere menor de catorce años de edad, la pena será privativa de libertad no menor de dos ni mayor de cuatro años.
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            Si se produce lesión grave o muerte de la víctima, la pena será no menor de cuatro ni mayor de Structural ocho años.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "129",
                titulo: "Formas agravadas",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            En los casos de los Artículos 125° y 128°, si resulta lesión grave o muerte y éstas pudieron ser previstas, la pena será privativa de libertad no menor de tres ni mayor de seis años en caso de lesión grave y no menor de cuatro ni mayor de ocho en caso de muerte.
                        </div>`
            }
        ]
    },
    {
        titulo: ``,
        capitulo: `
                <div style="text-align: center; margin-top: 30px; color: #777; font-style: italic;">
                    <div style="margin-bottom: 15px;">CAPÍTULO V</div>
                    <div>GENOCIDIO Derogado</div>
                </div>`,
        articulos: []
    },
    {
        titulo: `
                <div style="text-align: center; margin-top: 30px;">
                    <div style="margin-bottom: 15px;">TÍTULO I-A</div>
                    <div>DELITOS CONTRA LA DIGNIDAD HUMANA</div>
                </div>`,
        capitulo: `
                <div style="text-align: center; margin-top: 30px;">
                    <div style="margin-bottom: 15px;">CAPÍTULO I</div>
                    <div>TRATA DE PERSONAS</div>
                </div>`,
        articulos: [
            {
                tipo: "Artículo",
                numero: "129-A",
                titulo: "Trata de personas",
                texto: `
                        <div style="display: flex; margin-bottom: 10px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">1.</span>
                            <div>El que mediante violencia, amenaza u otras formas de coacción, privación de la libertad, fraude, engaño, abuso de poder o de una situación de vulnerabilidad, concesión o recepción de pagos o de cualquier beneficio, capta, transporta, traslada, acoge, recibe o retiene a otro, en el territorio de la República o para su salida o entrada del país con fines de explotación, es reprimido con pena privativa de libertad no menor de ocho ni mayor de quince años.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 10px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">2.</span>
                            <div>Para efectos del inciso 1, los fines de explotación de la trata de personas comprende, entre otros, la venta de niños, niñas o adolescentes, la prostitución y cualquier forma de explotación sexual, la esclavitud o prácticas análogas a la esclavitud, cualquier forma de explotación laboral, la mendicidad, los trabajos o servicios forzados, la servidumbre, la extracción o tráfico de órganos o tejidos somáticos o sus componentes humanos, así como cualquier otra forma análoga de explotación.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 10px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">3.</span>
                            <div>La captación, transporte, traslado, acogida, recepción o retención de niño, niña o adolescente con fines de explotación se considera trata de personas incluso cuando no se recurra a ninguno de los medios previstos en el inciso 1.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 10px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">4.</span>
                            <div>El consentimiento dado por la víctima mayor de edad a cualquier forma de explotación carece de efectos jurídicos cuando el agente haya recurrido a cualquiera de los medios enunciados en el inciso 1.</div>
                        </div>
                        <div style="display: flex; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">5.</span>
                            <div>El agente que promueve, favorece, financia o facilita la comisión del delito de trata de personas, es reprimido con la misma pena prevista para el autor.</div>
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "129-B",
                titulo: "Formas agravadas de la Trata de Personas",
                texto: `
                        <div style="margin-bottom: 10px; text-align: justify; line-height: 1.5;">
                            La pena será no menor de doce ni mayor de veinte años de pena privativa de libertad e inhabilitación conforme al artículo 36, incisos 1, 2, 3, 4 y 5, del Código Penal, cuando:
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">1.</span>
                            <div>El agente comete el hecho abusando del ejercicio de la función pública.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">2.</span>
                            <div>El agente es promotor, integrante o representante de una organización social, tutelar o empresarial, que aprovecha esta condición y actividades para perpetrar este delito.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">3.</span>
                            <div>Existe pluralidad de víctimas.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">4.</span>
                            <div>La víctima tiene entre catorce y menos de dieciocho años de edad o es incapaz.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">5.</span>
                            <div>El agente es cónyuge, conviviente, adoptante, tutor, curador, pariente hasta el cuarto grado de consanguinidad o segundo de afinidad, o tiene a la víctima a su cuidado por cualquier motivo o habitan en el mismo hogar.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">6.</span>
                            <div>El hecho es cometido por dos o más personas.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 15px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">7.</span>
                            <div>La víctima se encuentra en estado de gestación.</div>
                        </div>
                        <div style="margin-bottom: 10px; text-align: justify; line-height: 1.5;">
                            La pena será privativa de libertad no menor de 25 años, cuando:
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">1.</span>
                            <div>Se produzca la muerte, lesión grave o se ponga en inminente peligro la vida y la seguridad de la víctima.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">2.</span>
                            <div>La víctima es menor de catorce años de edad o padece, temporal o permanentemente, de alguna discapacidad física o mental.</div>
                        </div>
                        <div style="display: flex; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">3.</span>
                            <div>El agente es parte de una organización criminal.</div>
                        </div>`
            }
        ]
    },
    {
        titulo: ``,
        capitulo: `
                <div style="text-align: center; margin-top: 30px;">
                    <div style="margin-bottom: 15px;">CAPÍTULO II</div>
                    <div>EXPLOTACIÓN</div>
                </div>`,
        articulos: [
            {
                tipo: "Artículo",
                numero: "129-C",
                titulo: "Exclusión sexual",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            El que, mediante violencia, amenaza u otro medio, obliga a una persona a ejercer actos de connotación sexual con la finalidad de obtener un aprovechamiento económico o de otra índole, será reprimido con pena privativa de libertad no menor de diez ni mayor de quince años.
                        </div>
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            Si el agente comete el delito mediante engaño, manipulación u otro condicionamiento, se aplicará la misma pena del primer párrafo.
                        </div>
                        <div style="margin-bottom: 10px; text-align: justify; line-height: 1.5;">
                            La pena privativa de libertad será no menor de quince ni mayor de veinte años, cuando:
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">1.</span>
                            <div>El agente tiene a la víctima bajo su cuidado o vigilancia por cualquier motivo, o mantiene con ella un vínculo de superioridad, autoridad, poder o cualquier otra circunstancia que la impulse a depositar su confianza en él.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 15px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">2.</span>
                            <div>El agente comete el delito en el ámbito del turismo, en el marco de la actividad de una persona jurídica o en el contexto de cualquier actividad económica.</div>
                        </div>
                        <div style="margin-bottom: 10px; text-align: justify; line-height: 1.5;">
                            La pena privativa de libertad será no menor de veinte ni mayor de veinticinco años, cuando:
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">1.</span>
                            <div>El agente es ascendiente o descendiente por consanguinidad, adopción o por afinidad; pariente colateral hasta el cuarto grado de consanguinidad o adopción, o segundo grado de afinidad; cónyuge, excónyuge, conviviente, exconviviente o tenga hijos en común con la víctima; o habite en el mismo domicilio de la víctima, siempre que no medien relaciones contractuales o laborales.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">2.</span>
                            <div>La explotación sexual es un medio de subsistencia del agente.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">3.</span>
                            <div>Existe pluralidad de víctimas.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">4.</span>
                            <div>La víctima tiene discapacidad, es adulta mayor, padece de una enfermedad grave, pertenece a un pueblo indígena u originario, o presenta cualquier situación de vulnerabilidad.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">5.</span>
                            <div>Se produzca una lesión grave o se ponga en peligro inminente la vida o la salud de la víctima.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">6.</span>
                            <div>Se derive de una situación de trata de personas.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">7.</span>
                            <div>El agente actúe como integrante de una banda o una organización criminal.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 15px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">8.</span>
                            <div>La víctima está en situación de abandono o de extrema necesidad económica.</div>
                        </div>
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            Si se produce la muerte de la víctima, la pena privativa de libertad será no menor de veinticinco ni mayor de treinta años.
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            En todos los casos se impondrá, además, la pena de inhabilitación conforme al artículo 36 incisos 1, 2, 3, 4, 5, 6, 8, 9, 10 y 11.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "129-D",
                titulo: "Promoción o favorecimiento de la explotación sexual",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            El que promueve, favorece o facilita la explotación sexual de otra persona, será reprimido con pena privativa de libertad no menor de diez ni mayor de quince años.
                        </div>
                        <div style="margin-bottom: 10px; text-align: justify; line-height: 1.5;">
                            La pena privativa de libertad será no menor de quince ni mayor de veinte años, cuando:
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">1.</span>
                            <div>El agente se aproveche de su calidad de curador o tenga a la víctima bajo su cuidado o vigilancia por cualquier motivo, o tenga con ella un vínculo de superioridad, autoridad, poder o cualquier otra circunstancia que la impulse a depositar su confianza en él.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 15px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">2.</span>
                            <div>El agente cometa el delito en el ámbito del turismo, en el marco de la actividad de una persona jurídica o en el contexto de cualquier actividad económica.</div>
                        </div>
                        <div style="margin-bottom: 10px; text-align: justify; line-height: 1.5;">
                            La pena privativa de libertad será no menor de veinte ni mayor de veinticinco años, cuando:
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">1.</span>
                            <div>El agente sea ascendiente o descendiente por consanguinidad, adopción o por afinidad; pariente colateral hasta el cuarto grado de consanguinidad o adopción, o segundo grado de afinidad; cónyuge, excónyuge, conviviente, exconviviente o tenga hijos en común con la víctima; o habite en el mismo domicilio de la víctima, siempre que no medien relaciones contractuales o laborales.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">2.</span>
                            <div>Es un medio de subsistencia del agente.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">3.</span>
                            <div>Exista pluralidad de víctimas.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">4.</span>
                            <div>La víctima tenga discapacidad, sea adulta mayor, padezca de una enfermedad grave, pertenezca a un pueblo indígena u originario, o presente cualquier situación de vulnerabilidad.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">5.</span>
                            <div>Cuando el agente, a sabiendas, favorezca o promueva actos de explotación sexual violentos que produzcan lesiones o ponga en peligro grave la integridad o la vida de quien realice la prostitución.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">6.</span>
                            <div>Se produzca una lesión grave o se ponga en peligro inminente la vida o la salud de la víctima.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">7.</span>
                            <div>Se derive de una situación de trata de personas.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">8.</span>
                            <div>El agente actúe como integrante de una banda o una organización criminal.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 15px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">9.</span>
                            <div>La víctima esté en situación de abandono o de extrema necesidad económica.</div>
                        </div>
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            Si se produce la muerte de la víctima, la pena privativa de libertad será no menor de veinticinco ni mayor de treinta años.
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            En todos los casos se impone, además, la pena de inhabilitación conforme al artículo 36, incisos 1, 2, 3, 4, 5, 6, 8, 9, 10 y 11.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "129-E",
                titulo: "Cliente de la explotación sexual",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            El que, mediante una prestación económica o ventaja de cualquier naturaleza, tiene acceso carnal por vía vaginal, anal o bucal o realiza otros actos análogos introduciendo objetos o partes del cuerpo por alguna de esas vías con una víctima de explotación sexual será reprimido con pena privativa de libertad no menor de nueve ni mayor de doce años.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "129-F",
                titulo: "Beneficio por explotación sexual",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            El que, sin participar de los actos de explotación sexual de una persona, recibe un beneficio económico o de otra índole derivado de dichos actos, será reprimido con pena privativa de libertad no menor de seis ni mayor de ocho años.
                        </div>
                        <div style="margin-bottom: 10px; text-align: justify; line-height: 1.5;">
                            La pena privativa de libertad será no menor de ocho ni mayor de Pipe catorce años cuando:
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">1.</span>
                            <div>El agente sea ascendiente o descendiente por consanguinidad, adopción o por afinidad, pariente colateral hasta el cuarto grado de consanguinidad o adopción, o segundo grado de afinidad; cónyuge, excónyuge, conviviente, exconviviente o tenga hijos en común con la víctima; o habite en el mismo domicilio de la víctima, siempre que no medien relaciones contractuales o laborales.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">2.</span>
                            <div>El agente se aproveche de su calidad de curador; o tenga a la víctima bajo su cuidado o vigilancia por cualquier motivo; o mantenga con la víctima un vínculo de superioridad, autoridad, poder u otro que le genere confianza en él.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">3.</span>
                            <div>Es un medio de subsistencia del agente.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">4.</span>
                            <div>Exista pluralidad de víctimas.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">6.</span>
                            <div>La víctima pertenezca a un pueblo indígena u originario.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">7.</span>
                            <div>El agente actúe como integrante de una banda u organización criminal.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 15px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">8.</span>
                            <div>La víctima está en situación de abandono o de extrema necesidad económica.</div>
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            En todos los casos se impone, además, la pena de inhabilitación conforme al artículo 36, incisos 1, 2, 3, 4, 5, 6, 8, 9, 10 y 11.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "129-G",
                titulo: "Gestión de la explotación sexual",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            El que dirige o gestiona la explotación sexual de otra persona con el objeto de tener acceso carnal será reprimido con pena privativa de libertad no menor de diez ni mayor de quince años.
                        </div>
                        <div style="margin-bottom: 10px; text-align: justify; line-height: 1.5;">
                            La pena privativa de libertad será no menor de quince ni mayor de veinte años, cuando:
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">1.</span>
                            <div>El agente tenga a la víctima bajo su cuidado o vigilancia por cualquier motivo, o tenga con ella un vínculo de superioridad, autoridad, poder o cualquier otra circunstancia que la impulse a depositar su confianza en él.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 15px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">2.</span>
                            <div>El agente cometa el delito en el ámbito del turismo, en el marco de la actividad de una persona jurídica o en el contexto de cualquier actividad económica.</div>
                        </div>
                        <div style="margin-bottom: 10px; text-align: justify; line-height: 1.5;">
                            La pena privativa de libertad será no menor de veinte ni mayor de veinticinco años, cuando:
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">1.</span>
                            <div>El agente sea ascendiente o descendiente por consanguinidad, adopción o por afinidad; pariente colateral hasta el cuarto grado de consanguinidad o adopción, o segundo grado de afinidad; cónyuge, excónyuge, conviviente, exconviviente o tenga hijos en común con la víctima; o habite en el mismo domicilio de la víctima, siempre que no medien relaciones contractuales o laborales.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">2.</span>
                            <div>Es un medio de subsistencia del agente.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">3.</span>
                            <div>Exista pluralidad de víctimas.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">4.</span>
                            <div>La víctima tenga discapacidad, sea adulta mayor, padezca de una enfermedad grave, pertenezca a un pueblo indígena u originario, o presente cualquier situación de vulnerabilidad.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">5.</span>
                            <div>Se produzca una lesión grave o se ponga en peligro inminente la vida o la salud de la víctima.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">6.</span>
                            <div>Se derive de una situación de trata de personas.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">7.</span>
                            <div>El agente actúe como integrante de una banda o una organización criminal.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 15px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">8.</span>
                            <div>La víctima esté en situación de abandono o de extrema necesidad económica.</div>
                        </div>
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            Si se produce la muerte de la víctima, la pena privativa de libertad será no menor de veinticinco ni mayor de treinta años.
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            En todos los casos se impone, además, la pena de inhabilitación conforme al artículo 36, incisos 1, 2, 3, 4, 5, 6, 8, 9, 10 y 11.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "129-H",
                titulo: "Explotación sexual de niñas, niños i adolescentes",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            El que hace ejercer a niña, niño o adolescente actos de connotación sexual con la finalidad de obtener un aprovechamiento económico o de otra índole será reprimido con pena privativa de libertad no menor de quince ni mayor de veinte años.
                        </div>
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            El consentimiento brindado por el adolescente carece de efectos jurídicos.
                        </div>
                        <div style="margin-bottom: 10px; text-align: justify; line-height: 1.5;">
                            La pena privativa de libertad será no menor de veinte ni mayor de treinta años si el agente:
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">1.</span>
                            <div>Es promotor, integrante o representante de una organización social, tutelar o empresarial que aprovecha esta condición y realiza actividades para perpetrar este delito.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 15px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">2.</span>
                            <div>Tiene a la víctima bajo su cuidado o vigilancia, por cualquier motivo, o mantiene con ella un vínculo de superioridad, autoridad, poder o cualquier otra circunstancia que impulse a depositar la confianza en él.</div>
                        </div>
                        <div style="margin-bottom: 10px; text-align: justify; line-height: 1.5;">
                            La pena privativa de libertad será no menor de treinta ni mayor de treinta i cinco años cuando:
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">1.</span>
                            <div>El agente sea ascendiente por consanguinidad, adopción o por afinidad, pariente colateral hasta el cuarto grado de consanguinidad o adopción, o segundo grado de afinidad, tutor, cónyuge, excónyuge, conviviente, exconviviente o tenga hijos en común con la víctima; o habite en el mismo domicilio de la víctima, siempre que no medien relaciones contractuales o laborales.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">2.</span>
                            <div>Es un medio de subsistencia del agente.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">3.</span>
                            <div>Exista pluralidad de víctimas.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">4.</span>
                            <div>La víctima tenga discapacidad, padezca de una enfermedad grave, o presente cualquier situación de vulnerabilidad.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">5.</span>
                            <div>La víctima pertenezca a un pueblo indígena u originario.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">6.</span>
                            <div>El agente ponga en inminente y grave peligro la vida o la salud física o mental de la víctima.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">7.</span>
                            <div>Se derive de una situación de trata de personas.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">8.</span>
                            <div>El agente actúe como integrante de una banda o una organización criminal.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">9.</span>
                            <div>La víctima esté en situación de abandono o de extrema necesidad económica.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 15px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">10.</span>
                            <div>La víctima sea menor de catorce años.</div>
                        </div>
                        <div style="margin-bottom: 10px; text-align: justify; line-height: 1.5;">
                            La pena será de cadena perpetua:
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">1.</span>
                            <div>Si se causa la muerte de la víctima.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">2.</span>
                            <div>Si se lesiona gravemente su salud física o mental.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 15px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">3.</span>
                            <div>Si, a consecuencia de la explotación sexual, la víctima menor de 14 años tiene acceso carnal por vía vaginal, anal o bucal o realiza cualquier otro acto análogo con la introducción de un objeto o parte del cuerpo por alguna de las dos primeras vías.</div>
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            En todos los casos se impone, además, la pena de inhabilitación conforme al artículo 36, incisos 1, 2, 3, 4, 5, 6, 8, 9, 10 y 11.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "129-I",
                titulo: "Promoción y favorecimiento de la explotación sexual de niñas, niños y adolescentes",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            El que promueve, favorece o facilita la explotación sexual de niña, niño o adolescente será reprimido con pena privativa de libertad no menor de quince ni mayor de veinte años.
                        </div>
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            El consentimiento brindado por el adolescente carece de efectos jurídicos.
                        </div>
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            Si quien favorece, directamente o a través de un tercero, utiliza como medio una retribución o promesa de retribución, económica o de otra índole, al menor de edad, será reprimido con pena privativa de libertad no menor de veinte ni mayor de veinticinco años.
                        </div>
                        <div style="margin-bottom: 10px; text-align: justify; line-height: 1.5;">
                            La pena privativa de libertad será no menor de veinte ni mayor de treinta años si el agente:
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">1.</span>
                            <div>Es promotor, integrante o representante de una organización social, tutelar o empresarial que aprovecha esta condición y realiza actividades para perpetrar este delito.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 15px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">2.</span>
                            <div>Tiene a la víctima bajo su cuidado o vigilancia, por cualquier motivo, o mantiene con ella un vínculo de superioridad, autoridad, poder o cualquier otra circunstancia que impulse a depositar la confianza en él.</div>
                        </div>
                        <div style="margin-bottom: 10px; text-align: justify; line-height: 1.5;">
                            La pena privativa de libertad será no menor de treinta ni mayor de treinta y cinco años cuando:
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">1.</span>
                            <div>El agente sea ascendiente por consanguinidad, adopción o por afinidad, pariente colateral hasta el cuarto grado de consanguinidad o adopción, o segundo grado de afinidad, tutor, cónyuge, excónyuge, conviviente, exconviviente o tenga hijos en común con la víctima; o habite en el mismo domicilio de la víctima, siempre que no medien relaciones contractuales o laborales.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">2.</span>
                            <div>Es un medio de subsistencia del agente.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">3.</span>
                            <div>Exista pluralidad de víctimas.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">4.</span>
                            <div>La víctima tenga discapacidad, padezca de una enfermedad grave, o presente cualquier situación de vulnerabilidad.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">5.</span>
                            <div>La víctima pertenezca a pueblo indígena u originario.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">6.</span>
                            <div>Cuando el agente, a sabiendas, favorezca o promueva actos de explotación sexual violentos que produzcan lesiones o ponga en peligro grave la integridad o la vida de quien realice la explotación sexual.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">7.</span>
                            <div>Se derive de una situación de trata de personas.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">8.</span>
                            <div>El agente actúe como integrante de una banda o una organización criminal.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">9.</span>
                            <div>La víctima esté en situación de abandono o de extrema necesidad económica.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 15px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">10.</span>
                            <div>La víctima tiene menos de catorce años.</div>
                        </div>
                        <div style="margin-bottom: 10px; text-align: justify; line-height: 1.5;">
                            La pena será de cadena perpetua:
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">1.</span>
                            <div>Si se causa la muerte de la víctima.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">2.</span>
                            <div>Si se lesiona gravemente su salud física o mental.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 15px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">3.</span>
                            <div>Si, a consecuencia de la explotación sexual, la víctima menor de 14 años tiene acceso carnal por vía vaginal, anal o bucal o realiza cualquier otro acto análogo con la introducción de un objeto o parte del cuerpo por alguna de las dos primeras vías.</div>
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            En todos los casos se impone, además, la pena de inhabilitación conforme al artículo 36, incisos 1, 2, 3, 4, 5, 6, 8, 9, 10 y 11.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "129-J",
                titulo: "Cliente del adolescente",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            El que, mediante una prestación económica o ventaja de cualquier naturaleza tiene acceso carnal por vía vaginal, anal o bucal o realiza otros actos análogos introduciendo objetos o partes del cuerpo por alguna de las dos primeras vías con una persona de catorce y menor de dieciocho años, será reprimido con pena privativa de libertad no menor de quince ni mayor de veinte años.
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            El consentimiento brindado por el adolescente carece de efectos jurídicos.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "129-K",
                titulo: "Beneficio de la explotación sexual de niñas, niños y adolescentes",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            El que, sin participar de los actos de explotación sexual de niña, niño o adolescente, recibe un beneficio económico o de otra índole derivado de dichos actos será reprimido con pena privativa de libertad no menor de diez ni mayor de quince años.
                        </div>
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            El consentimiento brindado por el adolescente carece de efectos jurídicos.
                        </div>
                        <div style="margin-bottom: 10px; text-align: justify; line-height: 1.5;">
                            La pena privativa de libertad será no menor de quince ni mayor de veinte años si el agente:
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">1.</span>
                            <div>Es promotor, integrante o representante de una organización social tutelar o empresarial que aprovecha esta condición y realiza actividades para perpetrar este delito.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 15px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">2.</span>
                            <div>Tiene a la víctima bajo su cuidado o vigilancia, por cualquier motivo, o mantiene con ella un vínculo de superioridad, autoridad, poder o cualquier otra circunstancia que impulse a depositar la confianza en él.</div>
                        </div>
                        <div style="margin-bottom: 10px; text-align: justify; line-height: 1.5;">
                            La pena privativa de libertad será no menor de veinte ni mayor de treinta años cuando:
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">1.</span>
                            <div>El agente sea ascendiente por consanguinidad, adopción o por afinidad, pariente colateral hasta el cuarto grado de consanguinidad o adopción, o segundo grado de afinidad, tutor, cónyuge, excónyuge, conviviente, exconviviente o tenga hijos en común con la víctima; o habite en el mismo domicilio de la víctima, siempre que no medien relaciones contractuales o laborales.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">2.</span>
                            <div>Es un medio de subsistencia del agente.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">3.</span>
                            <div>Exista pluralidad de víctimas.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">4.</span>
                            <div>La víctima tenga discapacidad, padezca de una enfermedad grave o presenta cualquier situación de vulnerabilidad.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">5.</span>
                            <div>La víctima pertenezca a un pueblo indígena u originario.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">6.</span>
                            <div>Se derive de una situación de trata de personas.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">7.</span>
                            <div>El agente actúe como integrante de una banda o una organización criminal.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">8.</span>
                            <div>La víctima esté en situación de abandono o de extrema necesidad económica.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 15px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">9.</span>
                            <div>La víctima sea menor de catorce años.</div>
                        </div>
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            La pena privativa de libertad será no menor de treinta y cinco años si se causa la muerte de la víctima o se lesiona gravemente su salud física o mental.
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            En todos los casos se impone, además, la pena de inhabilitación conforme al artículo 36, incisos 1, 2, 3, 4, 5, 6, 8, 9, 10 y 11.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "129-L",
                titulo: "Gestión de la explotación sexual de niñas, niños y adolescentes",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            El que dirige o gestiona la explotación sexual de niña, niño o adolescente con el objeto de tener acceso carnal será reprimido con pena privativa de libertad no menor de quince ni mayor de veinte años.
                        </div>
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            El consentimiento brindado por el adolescente carece de efectos jurídicos.
                        </div>
                        <div style="margin-bottom: 10px; text-align: justify; line-height: 1.5;">
                            La pena privativa de libertad será no menor de veinte ni mayor de treinta años si el agente:
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">1.</span>
                            <div>Es promotor, integrante o representante de una organización social, tutelar o empresarial que aprovecha esta condición y realiza actividades para perpetrar este delito.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 15px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">2.</span>
                            <div>Tiene a la víctima bajo su cuidado o vigilancia, por cualquier motivo, o mantiene con ella un vínculo de superioridad, autoridad, poder o cualquier otra circunstancia que impulse a depositar la confianza en él.</div>
                        </div>
                        <div style="margin-bottom: 10px; text-align: justify; line-height: 1.5;">
                            La pena privativa de libertad será no menor de treinta ni mayor de treinta y cinco años cuando:
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">1.</span>
                            <div>El agente sea ascendiente por consanguinidad, adopción o por afinidad, pariente colateral hasta el cuarto grado de consanguinidad o adopción, o segundo grado de afinidad, tutor, cónyuge, excónyuge, conviviente, exconviviente o tenga hijos en común con la víctima; o habite en el mismo domicilio de la víctima, siempre que no medien relaciones contractuales o laborales.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">2.</span>
                            <div>Es un medio de subsistencia del agente.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">3.</span>
                            <div>Exista pluralidad de víctimas.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">4.</span>
                            <div>La víctima tenga discapacidad, padezca de una enfermedad grave, o presente cualquier situación de vulnerabilidad.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">5.</span>
                            <div>La víctima pertenezca a un pueblo indígena u originario.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">6.</span>
                            <div>El agente ponga en inminente y grave peligro la vida o la salud física o mental de la víctima.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">7.</span>
                            <div>Se derive de una situación de trata de personas.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">8.</span>
                            <div>El agente actúe como integrante de una banda o una organización criminal.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">9.</span>
                            <div>La víctima esté en situación de abandono o de extrema necesidad económica.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 15px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">10.</span>
                            <div>La víctima sea menor de catorce años.</div>
                        </div>
                        <div style="margin-bottom: 10px; text-align: justify; line-height: 1.5;">
                            La pena será de cadena perpetua:
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">1.</span>
                            <div>Si se causa la muerte de la víctima.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">2.</span>
                            <div>Si se lesiona gravemente su salud física o mental.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 15px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">3.</span>
                            <div>Si, a consecuencia de la explotación sexual, la víctima menor de 14 años tiene acceso carnal por vía vaginal, anal o bucal o realiza cualquier otro acto análogo con la introducción de un objeto o parte del cuerpo por alguna de las dos primeras vías.</div>
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            En todos los casos se impone, además, la pena de inhabilitación conforme al artículo 36, incisos 1, 2, 3, 4, 5, 6, 8, 9, 10 y 11.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "129-M",
                titulo: "Pornografía infantil",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            El que posee, promueve, fabrica, distribuye, exhibe, ofrece, comercializa, publicita, publica, importa, exporta o manipula por cualquier medio objetos, libros, escritos, imágenes, videos o audios, o utiliza tecnologías basadas en inteligencia artificial, incluidas las falsificaciones profundas ('deepfakes') o cualquier contenido multimedia generado por inteligencia artificial, con fines relacionados con la pornografía infantil o realiza espectáculos en vivo de carácter sexual, en los cuales participen menores de dieciocho años de edad, será sancionado con pena privativa de libertad no menor de seis ni mayor de diez años y con ciento veinte a trescientos sesenta y cinco días multa.
                        </div>
                        <div style="margin-bottom: 10px; text-align: justify; line-height: 1.5;">
                            La pena privativa de libertad será no menor de diez ni mayor de quince años y de cincuenta a trescientos sesenta y cinco días-multa cuando:
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">1.</span>
                            <div>La víctima tenga menos de catorce años de edad.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">2.</span>
                            <div>El material se difunda a través de cualquier tecnología de la información o de la comunicación o cualquier otro medio que genere difusión masiva.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 15px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">3.</span>
                            <div>El agente actúe como miembro o integrante de una banda u organización criminal.</div>
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            En todos los casos se impone, además, la pena de inhabilitación conforme al artículo 36, incisos 1, 2, 3, 4, 5, 6, 8, 9, 10 y 11.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "129-N",
                titulo: "Publicación en los medios de comunicación sobre delitos de libertad sexual contra niñas, niños y adolescentes",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            El gerente o responsable u otro con poder de decisión sobre las publicaciones o ediciones que autorice o disponga que se difunda pornografía infantil o se publiciten actos que conlleven a la trata o la explotación sexual de niñas, niños y adolescentes será reprimido con pena privativa de libertad no menor de cuatro ni mayor de seis años, así como la pena de inhabilitación conforme al artículo 36, incisos 1, 2, 3, 4, 6, 8, 9, 10 y 11.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "129-Ñ",
                titulo: "Esclavitud y otras formas de explotación",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            El que obliga a una persona a trabajar en condiciones de esclavitud o servidumbre, o la reduce o mantiene en dichas condiciones, con excepción de los supuestos del delito de explotación sexual, será reprimido con pena privativa de libertad no menor de diez ni mayor de quince años.
                        </div>
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            Si el agente comete el delito mediante engaño, manipulación u otro condicionamiento, se aplicará la misma pena del primer párrafo.
                        </div>
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            El consentimiento brindado por el niño, niña o adolescente carece de efectos jurídicos.
                        </div>
                        <div style="margin-bottom: 10px; text-align: justify; line-height: 1.5;">
                            La pena privativa de libertad es no menor de quince años ni mayor de veinte años, cuando:
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">1.</span>
                            <div>La víctima tiene entre catorce y menos de dieciocho años de edad.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">2.</span>
                            <div>El agente comete el delito en el marco de las actividades de una persona jurídica o en el contexto de cualquier actividad económica.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 15px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">3.</span>
                            <div>Si el agente tiene a la víctima bajo su cuidado o vigilancia por cualquier motivo, o mantiene con ella un vínculo de superioridad, autoridad, poder u otro que la impulse a depositar su confianza en él.</div>
                        </div>
                        <div style="margin-bottom: 10px; text-align: justify; line-height: 1.5;">
                            La pena privativa de libertad es no menor de veinte ni mayor de veinticinco años, cuando:
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">1.</span>
                            <div>El agente es familiar de la víctima hasta el cuarto grado de consanguinidad o segundo de afinidad.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">2.</span>
                            <div>La explotación es un medio de subsistencia del agente.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">3.</span>
                            <div>Existe pluralidad de víctimas.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">4.</span>
                            <div>La víctima tiene discapacidad, es menor de catorce años de edad, adulta mayor, padece de enfermedad grave, pertenece a un pueblo indígena, es trabajador migrante o presenta cualquier situación de vulnerabilidad.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">5.</span>
                            <div>Se produzca lesión grave o se ponga en peligro inminente la vida o la salud de la víctima.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 15px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">6.</span>
                            <div>Se derive de una situación de trata de personas.</div>
                        </div>
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            Si se produce la muerte de la víctima, la pena privativa de libertad es no menor de veinticinco ni mayor de treinta años.
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            En todos los casos se impondrá además la pena de inhabilitación conforme al artículo 36, incisos 1, 2, 3, 4, 5, 6, 8, 10 y 11.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "129-O",
                titulo: "Trabajo forzoso",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            El que somete u obliga a otra persona, a través de cualquier medio o contra su voluntad, a realizar un trabajo o prestar un servicio, sea retribuido o no, será reprimido con pena privativa de libertad no menor de seis ni mayor de doce años y multa de cien a doscientos días-multa.
                        </div>
                        <div style="margin-bottom: 10px; text-align: justify; line-height: 1.5;">
                            La pena será privativa de libertad no menor de doce años ni mayor de quince años y multa de doscientos a trescientos días-multa si concurre alguna de las siguientes circunstancias:
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">1.</span>
                            <div>El agente tiene a la víctima bajo su cuidado o vigilancia por cualquier motivo, o mantiene con ella un vínculo de superioridad, autoridad, poder u otro que la impulse a depositar su confianza en él.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">2.</span>
                            <div>La víctima tiene entre catorce y menos de dieciocho años de edad, y la actividad que desarrolla está prohibida por la ley en razón a su edad.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 15px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">3.</span>
                            <div>El agente comete el delito en el marco de la actividad de una persona jurídica o en el contexto de cualquier actividad económica.</div>
                        </div>
                        <div style="margin-bottom: 10px; text-align: justify; line-height: 1.5;">
                            La pena será privativa de libertad no menor de quince ni mayor de veinte años y multa de trescientos a trescientos sesenta y cinco días-multa, en los siguientes casos:
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">1.</span>
                            <div>El agente es familiar de la víctima hasta el cuarto grado de consanguinidad o segundo de afinidad.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">2.</span>
                            <div>Existe pluralidad de víctimas.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">3.</span>
                            <div>La víctima tiene menos de catorce años de edad, es adulta mayor, tiene discapacidad, padece de enfermedad grave, pertenece a un pueblo indígena, es trabajador migrante o presenta cualquier situación de vulnerabilidad.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">4.</span>
                            <div>Se produzca lesión grave o se ponga en peligro inminente la vida o la salud de la víctima.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 15px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">5.</span>
                            <div>Se derive de una situación de trata de personas.</div>
                        </div>
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            Si se produce la muerte de la víctima, la pena privativa de libertad es no menor de veinte ni mayor de veinticinco años. Se aplica la misma multa si se dan los agravantes precedentes.
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            En todos los casos se impondrá además la pena de inhabilitación conforme al artículo 36, incisos 1, 2, 3, 4, 5, 6, 8, 10 y 11.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "129-P",
                titulo: "Delito de intermediación onerosa de órganos y tejidos",
                texto: `
                        <div style="margin-bottom: 10px; text-align: justify; line-height: 1.5;">
                            Será reprimido con pena privativa de libertad no menor de tres ni mayor de seis años el que, por lucro y sin observar la ley de la materia, compra, vende, importa, exporta, almacena o transporta órganos o tejidos humanos de personas vivas o de cadáveres, concurriendo las circunstancias siguientes:
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 30px;">a)</span>
                            <div>Utiliza los medios de prensa escritos o audiovisuales o base de datos o sistema o red de computadoras; o</div>
                        </div>
                        <div style="display: flex; margin-bottom: 15px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 30px;">b)</span>
                            <div>Constituye o integra una organización criminal para alcanzar dichos fines.</div>
                        </div>
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            Si el agente es un profesional médico o sanitario o funcionario del sector salud, será reprimido con pena privativa de libertad no menor de cuatro ni mayor de ocho años e inhabilitación conforme al artículo 36 incisos 1, 2, 4, 5 y 8.
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            Están exentos de pena el donatario o los que ejecutan los hechos previstos en el presente artículo si sus relaciones con la persona favorecida son tan estrechas como para excusar su conducta.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "129-Q",
                titulo: "Captación de menores de edad para la comisión de delitos",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            El que, mediante violencia, amenaza u otras formas de coacción, abuso de poder o de situación de vulnerabilidad capte e induzca o instigue persuadiendo a un menor de edad para la comisión de delitos será reprimido con pena privativa de libertad no menor de ocho ni mayor de doce años.
                        </div>
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            La pena será no menor de doce ni mayor de veinticinco años si el delito cometido o intentado tiene como objetivo actos de sicariato, robo agravado, tráfico ilícito de drogas o lo integra a una organización criminal.
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            Si el agente se vale de su posición, cargo o vínculo familiar que le otorgue particular autoridad sobre el menor de edad, la pena será de cadena perpetua.
                        </div>`
            }
        ]
    },
    {
        titulo: `
                <div style="text-align: center; margin-top: 30px;">
                    <div style="margin-bottom: 15px;">TÍTULO II</div>
                    <div>DELITOS CONTRA EL HONOR</div>
                </div>`,
        capitulo: `
                <div style="text-align: center; margin-top: 30px;">
                    <div style="margin-bottom: 15px;">CAPÍTULO ÚNICO</div>
                    <div>INJURIA, CALUMNIA Y DIFAMACIÓN</div>
                </div>`,
        articulos: [
            {
                tipo: "Artículo",
                numero: "130",
                titulo: "Injuria",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            El que ofende o ultraja a una persona con palabras, gestos o vías de hecho, será reprimido con prestación de servicio comunitario de diez a cuarenta jornadas o con sesenta a noventa días-multa.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "131",
                titulo: "Calumnia",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            El que atribuye falsamente a otro un delito, será reprimido con noventa a ciento veinte días-multa.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "132",
                titulo: "Difamación",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            El que, ante varias personas, reunidas o separadas, pero de manera que pueda difundirse la noticia, atribuye a una persona, un hecho, una cualidad o una conducta que pueda perjudicar su honor o reputación, será reprimido con pena privativa de libertad no mayor de dos años y con treinta a ciento veinte días-multa.
                        </div>
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            Si la difamación se refiere al hecho previsto en el artículo 131, la pena será privativa de libertad no menor de uno ni mayor de dos años y con noventa a ciento veinte días-multa.
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            Si el delito se comete por medio del libro, la prensa u otro medio de comunicación social, o mediante tecnologías de inteligencia artificial, falsificaciones profundas ('deepfakes') u otros contenidos generados mediante inteligencia artificial que difundan información falsa o denigrante que cause daño a la reputación o a la imagen, la pena será privativa de libertad no menor de uno ni mayor de tres años y de ciento veinte a trescientos sesenticinco días-multa.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "133",
                titulo: "Conductas atípicas",
                texto: `
                        <div style="margin-bottom: 10px; text-align: justify; line-height: 1.5;">
                            No se comete injuria ni difamación cuando se trata de:
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">1.</span>
                            <div>Ofensas proferidas con ánimo de defensa por los litigantes, apoderados o abogados en sus intervenciones orales o escritas ante el Juez.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">2.</span>
                            <div>Críticas literarias, artísticas o científicas.</div>
                        </div>
                        <div style="display: flex; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">3.</span>
                            <div>Apreciaciones o informaciones que contengan conceptos desfavorables cuando sean realizadas por un funcionario público en cumplimiento de sus obligaciones.</div>
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "134",
                titulo: "Prueba de la verdad de las imputaciones",
                texto: `
                        <div style="margin-bottom: 10px; text-align: justify; line-height: 1.5;">
                            El autor del delito previsto en el artículo 132 puede probar la veracidad de sus imputaciones sólo en los casos siguientes:
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">1.</span>
                            <div>Cuando la persona ofendida es un funcionario público y los hechos, cualidades o conductas que se le hubieran atribuido se refieren al ejercicio de sus funciones.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">2.</span>
                            <div>Cuando por los hechos imputados está aún abierto un proceso penal contra la persona ofendida.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">3.</span>
                            <div>Cuando es evidente que el autor del delito ha actuado en interés de causa pública o en defensa propia.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 15px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">4.</span>
                            <div>Cuando el querellante pide formalmente que el proceso se siga hasta establecer la verdad o falsedad de los hechos o de la cualidad o conducta que se le haya atribuido.</div>
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            Si la verdad de los hechos, cualidad o conducta resulta probada, el autor de la imputación estará exento de pena.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "135",
                titulo: "Inadmisibilidad de la prueba",
                texto: `
                        <div style="margin-bottom: 10px; text-align: justify; line-height: 1.5;">
                            No se admite en ningún caso la prueba:
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">1.</span>
                            <div>Sobre imputación de cualquier hecho punible que hubiese sido materia de absolución definitiva en el Perú o en el extranjero.</div>
                        </div>
                        <div style="display: flex; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">2.</span>
                            <div>Sobre cualquier imputación que se refiera a la intimidad personal y familiar, o a un delito de violación de la libertad sexual o proxenetismo comprendido en los Capítulos IX y X, del Título IV, Libro Segundo.</div>
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "136",
                titulo: "Difamación o injuria encubierta o equívoca",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            El acusado de difamación o injuria encubierta o equívoca que rehusa dar en juicio explicaciones satisfactorias, será considerado como agente de difamación o injuria manifiesta.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "137",
                titulo: "Injurias recíprocas",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            En el caso de injurias recíprocas proferidas en el calor de un altercado, el Juez podrá, según las circunstancias, declarar exentas de pena a las partes o a una de ellas.
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            No es punible la injuria verbal provocada por ofensas personales.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "138",
                titulo: "Ejercicio privado de la acción penal",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            En los delitos previstos en este Título sólo se procederá por acción privada.
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            Si la injuria, difamación o calumnia ofende a la memoria de una persona fallecida, presuntamente muerta, o declarada judicialmente ausente o desaparecida, la acción penal podrá ser promovida o continuada por su cónyuge, ascendientes, descendientes o hermanos.
                        </div>`
            }
        ]
    },
    {
        titulo: `
                <div style="text-align: center; margin-top: 30px;">
                    <div style="margin-bottom: 15px;">TÍTULO III</div>
                    <div>DELITOS CONTRA LA FAMILIA</div>
                </div>`,
        capitulo: `
                <div style="text-align: center; margin-top: 30px;">
                    <div style="margin-bottom: 15px;">CAPÍTULO I</div>
                    <div>MATRIMONIOS ILEGALES</div>
                </div>`,
        articulos: [
            {
                tipo: "Artículo",
                numero: "139",
                titulo: "Bigamia",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            El casado que contrae matrimonio será reprimido con pena privativa de libertad no menor de uno ni mayor de cuatro años.
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            Si, respecto a su estado civil, induce a error a la persona con quien contrae el nuevo matrimonio la pena será privativa de libertad no menor de dos ni mayor de cinco años.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "140",
                titulo: "Matrimonio con persona casada",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            El no casado que, a sabiendas, contrae matrimonio con persona casada será reprimido con pena privativa de libertad no menor de uno ni mayor de tres años.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "141",
                titulo: "Autorización ilegal de matrimonio",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            El funcionario público que, a sabiendas, celebra un matrimonio ilegal será reprimido con pena privativa de libertad no menor de dos ni mayor de cinco años e inhabilitación de dos a tres años conforme al artículo 36, incisos 1, 2 y 3.
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            Si el funcionario público obra por culpa, la pena será de inhabilitación no mayor de un año, conforme al artículo 36, incisos 1, 2 y 3.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "142",
                titulo: "Inobservancia de formalidades legales",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            El funcionario público, párroco u ordinario que procede a la celebración del matrimonio sin observar las formalidades exigidas por la ley, aunque el matrimonio no sea anulado, será reprimido con pena privativa de libertad no mayor de tres años e inhabilitación de uno a dos años, conforme al artículo 36, incisos 1, 2 y 3.
                        </div>`
            }
        ]
    },
    {
        titulo: ``,
        capitulo: `
                <div style="text-align: center; margin-top: 30px;">
                    <div style="margin-bottom: 15px;">CAPÍTULO II</div>
                    <div>DELITOS CONTRA EL ESTADO CIVIL</div>
                </div>`,
        articulos: [
            {
                tipo: "Artículo",
                numero: "143",
                titulo: "Alteración o supresión del estado civil",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            El que, con perjuicio ajeno, altera o suprime el estado civil de otra persona será reprimido con pena privativa de libertad no mayor de dos años o con prestación de servicio comunitario de veinte a cincuentidós jornadas.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "144",
                titulo: "Fingimiento de embarazo o parto",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            La mujer que finge embarazo o parto, para dar a un supuesto hijo derechos que no le corresponden, será reprimida con pena privativa de libertad no menor de uno ni mayor de cinco años.
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            La misma pena privativa de libertad y, además, inhabilitación de uno a tres años, conforme al Artículo 36 inciso 4, se aplicará al médico u obstetra que cooperen en la ejecución del delito.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "145",
                titulo: "Alteración o supresión de la filiación de menor",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            El que exponga u oculte a un menor, lo sustituya por otro, le atribuya falsa filiación o emplee cualquier otro medio para alterar o suprimir su filiación será reprimido con pena privativa de libertad no menor de uno ni mayor de cinco años.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "146",
                titulo: "Móvil de honor",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            Si el agente de alguno de los delitos previstos en este Capítulo comete el hecho por un móvil de honor la pena será de prestación de servicio comunitario de veinte a treinta jornadas.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "147",
                titulo: "Sustracción de menor",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            El que, mediando relación parental, sustrae a un menor de edad o rehúsa entregarlo a quien ejerce la patria potestad, será reprimido con pena privativa de libertad no mayor de dos años.
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            La misma pena se aplicará al padre o la madre u otros ascendientes, aún cuando aquellos no hayan sido excluidos judicialmente de la patria potestad.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "148",
                titulo: "Inducción a la fuga de menor",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            El que induce a un menor de edad a que se fugue de la casa de sus padres o de la de su tutor o persona encargada de su custodia será reprimido con pena privativa de libertad no mayor de dos años o con prestación de servicio comunitario de veinte a cincuentidós jornadas.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "148-A",
                titulo: "Participación en pandillaje pernicioso",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            El que participa en pandillas perniciosas, instiga o induce a menores de edad a participar en ellas, para atentar contra la vida, integridad física, el patrimonio o la libertad sexual de las personas, dañar bienes públicos o privados u ocasionar desmanes que alteren el orden público, será reprimido con pena privativa de libertad no menor de diez ni mayor de veinte años.
                        </div>
                        <div style="margin-bottom: 10px; text-align: justify; line-height: 1.5;">
                            La pena será no menor de veinte años cuando el agente:
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">1.</span>
                            <div>Actúa como cabecilla, líder, dirigente o jefe.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">2.</span>
                            <div>Es docente en un centro de educación privado o público.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">3.</span>
                            <div>Es funcionario o servidor público.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">4.</span>
                            <div>Instigue, induzca o utilice a menores de edad a actuar bajo los efectos de bebidas alcohólicas o drogas.</div>
                        </div>
                        <div style="display: flex; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">5.</span>
                            <div>Utilice armas de fuego, armas blancas, material inflamable, explosivos u objetos contundentes o los suministre a los menores.</div>
                        </div>`
            }
        ]
    },
    {
        titulo: ``,
        capitulo: `
                <div style="text-align: center; margin-top: 30px;">
                    <div style="margin-bottom: 15px;">CAPÍTULO IV</div>
                    <div>OMISIÓN DE ASISTENCIA FAMILIAR</div>
                </div>`,
        articulos: [
            {
                tipo: "Artículo",
                numero: "149",
                titulo: "Omisión de prestación de alimentos",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            El que omite cumplir su obligación de prestar los alimentos que establece una resolución judicial será reprimido con pena privativa de libertad no mayor de tres años, o con prestación de servicio comunitario de veinte a cincuentidós jornadas, sin perjuicio de cumplir el mandato judicial.
                        </div>
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            Si el agente ha simulado otra obligación de alimentos en connivencia con otra persona o renuncia o abandona maliciosamente su trabajo la pena será no menor de uno ni mayor de cuatro años.
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            Si resulta lesión grave o muerte y éstas pudieron ser previstas, la pena será no menor de dos ni mayor de cuatro años en caso de lesión grave, y no menor de tres ni mayor de seis años en caso de muerte.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "150",
                titulo: "Abandono de mujer gestante y en situación crítica",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            El que abandona a una mujer en gestación, a la que ha embarazado y que se halla en situación crítica, será reprimido con pena privativa de libertad no menor de seis meses ni mayor de cuatro años y con sesenta a noventa días- multa.
                        </div>`
            }
        ]
    },
    {
        titulo: `
                <div style="text-align: center; margin-top: 30px;">
                    <div style="margin-bottom: 15px;">TÍTULO IV</div>
                    <div>DELITOS CONTRA LA LIBERTAD</div>
                </div>`,
        capitulo: `
                <div style="text-align: center; margin-top: 30px;">
                    <div style="margin-bottom: 15px;">CAPÍTULO I</div>
                    <div>VIOLACIÓN DE LA LIBERTAD PERSONAL</div>
                </div>`,
        articulos: [
            {
                tipo: "Artículo",
                numero: "151",
                titulo: "Coacción",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            El que, mediante amenaza o violencia, obliga a otro a hacer lo que la ley no manda o le impide hacer lo que ella no prohíbe será reprimido con pena privativa de libertad no mayor de dos años.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "151-A",
                titulo: "Acoso",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            El que, de forma reiterada, continua o habitual, y por cualquier medio, vigila, persigue, hostiga, asedia o busca establecer contacto o cercanía con una persona sin su consentimiento, de modo que pueda alterar el normal desarrollo de su vida cotidiana, será reprimido con pena privativa de la libertad no menor de uno ni mayor de cuatro años, inhabilitación, según corresponda, conforme a los incisos 10 y 11 del artículo 36, y con sesenta a ciento ochenta días-multa.
                        </div>
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            La misma pena se aplica al que, por cualquier medio, vigila, persigue, hostiga, asedia o busca establecer contacto o cercanía con una persona sin su consentimiento, de modo que altere el normal desarrollo de su vida cotidiana, aun cuando la conducta no hubiera sido reiterada, continua o habitual.
                        </div>
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            Igual pena se aplica a quien realiza las mismas conductas valiéndose del uso de cualquier tecnología de la información o de la comunicación.
                        </div>
                        <div style="margin-bottom: 10px; text-align: justify; line-height: 1.5;">
                            La pena privativa de la libertad será no menor de cuatro ni mayor de siete años, inhabilitación, según corresponda, conforme a los incisos 10 y 11 del artículo 36, y de doscientos ochenta a trescientos sesenta i cinco días-multa, si concurre alguna de las circunstancias agravantes:
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">1.</span>
                            <div>La víctima es menor de edad, es persona adulta mayor, se encuentra en estado de gestación o es persona con discapacidad.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">2.</span>
                            <div>La víctima y el agente tienen o han tenido una relación de pareja, son o han sido convivientes o cónyuges, tienen vínculo parental consanguíneo o por afinidad.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">3.</span>
                            <div>La víctima habita en el mismo domicilio que el agente o comparten espacios comunes de una misma propiedad.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">4.</span>
                            <div>La víctima se encuentre en condición de dependencia o subordinación con respecto al agente.</div>
                        </div>
                        <div style="display: flex; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">5.</span>
                            <div>La conducta se lleva a cabo en el marco de una relación laboral, educativa o formativa de la víctima.</div>
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "152",
                titulo: "Secuestro",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            Será reprimido con pena privativa de la libertad no menor de veinte ni mayor de treinta años el que, sin derecho, motivo ni facultad justificada, priva a otro de su libertad personal, cualquiera sea el móvil, el propósito, la modalidad o circunstancia o tiempo que el agraviado sufra la privación o restricción de su libertad.
                        </div>
                        <div style="margin-bottom: 10px; text-align: justify; line-height: 1.5;">
                            La pena será no menor de treinta años cuando:
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">1.</span>
                            <div>Se abusa, corrompe, trata con crueldad o pone en peligro la vida o salud del agraviado.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">2.</span>
                            <div>Se pretexta enfermedad mental inexistente en el agraviado.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">3.</span>
                            <div>El agraviado o el agente es funcionario o servidor público.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">4.</span>
                            <div>El agraviado es representante diplomático de otro país.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">5.</span>
                            <div>El agraviado es secuestrado por sus actividades en el sector privado.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">6.</span>
                            <div>El agraviado es pariente, dentro del tercer grado de consanguinidad o segundo de afinidad con las personas referidas en los incisos 3, 4 y 5 precedentes.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">7.</span>
                            <div>Tiene por finalidad obligar a un funcionario o servidor público a poner en libertad a un detenido o a conceder exigencias ilegales.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">8.</span>
                            <div>Se comete para obligar al agraviado a incorporarse a una organización criminal.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">9.</span>
                            <div>Se comete para obtener tejidos somáticos del agraviado.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">10.</span>
                            <div>Se causa lesiones leves al agraviado.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">11.</span>
                            <div>Es cometido por dos o más personas o se utiliza para la comisión del delito a menores de edad u otra persona inimputable.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">12.</span>
                            <div>El agraviado adolece de enfermedad grave.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 15px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">13.</span>
                            <div>La víctima se encuentra en estado de gestación.</div>
                        </div>
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            La misma pena se aplicará al que con la finalidad de contribuir a la comisión del delito de secuestro, suministra información que haya conocido por razón o con ocasión de sus funciones, cargo u oficio, o proporciona deliberadamente los medios para la perpetración del delito.
                        </div>
                        <div style="margin-bottom: 10px; text-align: justify; line-height: 1.5;">
                            La pena será de cadena perpetua cuando:
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">1.</span>
                            <div>El agraviado es menor de edad o mayor de setenta años.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">2.</span>
                            <div>El agraviado sufre discapacidad y el agente se aprovecha de esta circunstancia.</div>
                        </div>
                        <div style="display: flex; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">3.</span>
                            <div>Si se causa lesiones graves o muerte al agraviado durante el secuestro o como consecuencia de dicho acto.</div>
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "153",
                titulo: "Trata de personas",
                texto: `
                        <div style="text-align: justify; line-height: 1.5; color: #777; font-style: italic;">
                            Trasladado al art. 129-A conforme a la Ley 31146 del 30/03/2021.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "153-A",
                titulo: "Formas agravadas de la trata de personas",
                texto: `
                        <div style="text-align: justify; line-height: 1.5; color: #777; font-style: italic;">
                            Trasladado al art. 129-B conforme a la Ley 31146 del 30/03/2021.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "153-B",
                titulo: "Explotación sexual",
                texto: `
                        <div style="text-align: justify; line-height: 1.5; color: #777; font-style: italic;">
                            Trasladado al art. 129-C conforme a la Ley 31146 del 30/03/2021.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "153-C",
                titulo: "Esclavitud y otras formas de explotación",
                texto: `
                        <div style="text-align: justify; line-height: 1.5; color: #777; font-style: italic;">
                            Trasladado al art. 129-Ñ conforme a la Ley 31146 del 30/03/2021.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "153-D",
                titulo: "Promoción o favorecimiento de la explotación sexual",
                texto: `
                        <div style="text-align: justify; line-height: 1.5; color: #777; font-style: italic;">
                            Trasladado al art. 129-D conforme a la Ley 31146 del 30/03/2021.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "153-E",
                titulo: "Cliente de la explotación sexual",
                texto: `
                        <div style="text-align: justify; line-height: 1.5; color: #777; font-style: italic;">
                            Trasladado al art. 129-E conforme a la Ley 31146 del 30/03/2021.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "153-F",
                titulo: "Beneficio por explotación sexual",
                texto: `
                        <div style="text-align: justify; line-height: 1.5; color: #777; font-style: italic;">
                            Trasladado al art. 129-F conforme a la Ley 31146 del 30/03/2021.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "153-G",
                titulo: "Gestión de la explotación sexual",
                texto: `
                        <div style="text-align: justify; line-height: 1.5; color: #777; font-style: italic;">
                            Trasladado al art. 129-G conforme a la Ley 31146 del 30/03/2021.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "153-H",
                titulo: "Explotación sexual de niñas, niños i adolescentes",
                texto: `
                        <div style="text-align: justify; line-height: 1.5; color: #777; font-style: italic;">
                            Trasladado al art. 129-H conforme a la Ley 31146 del 30/03/2021.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "153-I",
                titulo: "Beneficio de la explotación sexual de niñas, niños i adolescentes",
                texto: `
                        <div style="text-align: justify; line-height: 1.5; color: #777; font-style: italic;">
                            Trasladado al art. 129-K conforme a la Ley 31146 del 30/03/2021.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "153-J",
                titulo: "Gestión de la explotación sexual de niñas, niños i adolescentes",
                texto: `
                        <div style="text-align: justify; line-height: 1.5; color: #777; font-style: italic;">
                            Trasladado al art. 129-L conforme a la Ley 31146 del 30/03/2021.
                        </div>`
            }
        ]
    },
    {
        titulo: ``,
        capitulo: `
                <div style="text-align: center; margin-top: 30px;">
                    <div style="margin-bottom: 15px;">CAPÍTULO II</div>
                    <div>VIOLACIÓN DE LA INTIMIDAD</div>
                </div>`,
        articulos: [
            {
                tipo: "Artículo",
                numero: "154",
                titulo: "Violación de la intimidad",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            El que viola la intimidad de la vida personal o familiar ya sea observando, escuchando o registrando un hecho, palabra, escrito o imagen, valiéndose de instrumentos, procesos técnicos u otros medios, será reprimido con pena privativa de libertad no mayor de dos años.
                        </div>
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            La pena será no menor de uno ni mayor de tres años y de treinta a ciento veintidós días-multa, cuando el agente revela la intimidad conocida de la manera antes prevista.
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            Si utiliza algún medio de comunicación social, la pena privativa de libertad será no menor de dos ni mayor de cuatro años y de sesenta a ciento ochenta días-multa.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "154-A",
                titulo: "Tráfico ilegal de datos personales",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            El que ilegítimamente comercializa o vende información no pública relativa a cualquier ámbito de la esfera personal, familiar, patrimonial, laboral, financiera u otro de naturaleza análoga sobre una persona natural, será reprimido con pena privativa de libertad no menor de dos ni mayor de cinco años.
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            Si el agente comete el delito como integrante de una organización criminal, la pena se incrementa hasta en un tercio por encima del máximo legal previsto en el párrafo anterior.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "154-B",
                titulo: "Difusión de imágenes, materiales audiovisuales o audios con contenido sexual",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            El que, sin autorización, difunde, revela, publica, cede o comercializa imágenes, materiales audiovisuales, audios con contenido sexual reales, incluidos aquellos que hayan sido elaborados o modificados por medios digitales o tecnológicos, de cualquier persona, será reprimido con pena privativa de libertad no menor de dos ni mayor de dos cinco años y con treinta a ciento veinte días-multa.
                        </div>
                        <div style="margin-bottom: 10px; text-align: justify; line-height: 1.5;">
                            La pena privativa de libertad será no menor de tres ni mayor de seis años y de ciento ochenta a trescientos sesenta y cinco días-multa, cuando concurra cualquiera de las siguientes circunstancias:
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">1.</span>
                            <div>Cuando la víctima mantenga o haya mantenido una relación de pareja con el agente, son o han sido convivientes o cónyuges.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 15px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">2.</span>
                            <div>Cuando para materializar el hecho utilice redes sociales o cualquier otro medio que genere una difusión masiva.</div>
                        </div>
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            La pena privativa de libertad será no menor de seis ni mayor de diez años y con veinte a trescientos sesenta y cinco días-multa, cuando la víctima tenga menos de 18 años de edad.
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            La pena privativa de libertad será no menor de diez ni mayor de quince años y con cincuenta a trescientos sesenta y cinco días-multa, cuando la víctima tenga menos de 14 años de edad.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "155",
                titulo: "Agravante por razón de la función",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            Si el agente es funcionario o servidor público y, en ejercicio del cargo, comete el hecho previsto en los artículos 154 y 154-A, la pena será no menor de tres ni mayor de seis años e inhabilitación conforme al artículo 36 incisos 1, 2 y 4.
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            Si el agente es funcionario o servidor público y, en ejercicio del cargo, comete el hecho previsto en los artículos 154 y 154-A y la información tenga su origen a partir de la aplicación de la medida de la localización o geolocalización, la pena será no menor de seis ni mayor de ocho años e inhabilitación conforme al artículo 36 incisos 1, 2 y 4.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "156",
                titulo: "Revelación de la intimidad personal y familiar",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            El que revela aspectos de la intimidad personal o familiar que conociera con motivo del trabajo que prestó al agraviado o a la persona a quien éste se lo confió, será reprimido con pena privativa de libertad no mayor de un año.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "157",
                titulo: "Uso indebido de archivos computarizados",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            El que, indebidamente, organiza, proporciona o emplea cualquier archivo que tenga datos referentes a las convicciones políticas o religiosas y otros aspectos de la vida íntima de una o más personas, será reprimido con pena privativa de libertad no menor de uno ni mayor de cuatro años.
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            Si el agente es funcionario o servidor público y comete el delito en ejercicio del cargo, la pena será no menor de tres ni mayor de seis años e inhabilitación conforme al artículo 36, incisos 1, 2 y 4.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "158",
                titulo: "Ejercicio de la acción penal",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            Los delitos previstos en este Capítulo son perseguibles por acción privada, salvo en el caso del delito previsto en los artículos 154-A, 154-B y 155.
                        </div>`
            }
        ]
    },
    {
        titulo: ``,
        capitulo: `
                <div style="text-align: center; margin-top: 30px;">
                    <div style="margin-bottom: 15px;">CAPÍTULO III</div>
                    <div>VIOLACIÓN DE DOMICILIO</div>
                </div>`,
        articulos: [
            {
                tipo: "Artículo",
                numero: "159",
                titulo: "Violación de domicilio",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            El que, sin derecho, penetra en morada o casa de negocio ajena, en su dependencia o en el recinto habitado por otro o el que permanece allí rehusando la intimación que le haga quien tenga derecho a formularla, será reprimido con pena privativa de libertad no mayor de dos años y con treinta a noventa días-multa.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "160",
                titulo: "Allanamiento ilegal de domicilio",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            El funcionario o servidor público que allana un domicilio, sin las formalidades prescritas por la ley o fuera de los casos que ella determina, será reprimido con pena privativa de libertad no menor de uno ni mayor de tres años e inhabilitación de uno a dos años conforme al artículo 36, incisos 1, 2 y 3.
                        </div>`
            }
        ]
    },
    {
        titulo: ``,
        capitulo: `
                <div style="text-align: center; margin-top: 30px;">
                    <div style="margin-bottom: 15px;">CAPÍTULO IV</div>
                    <div>VIOLACIÓN DEL SECRETO DE LAS COMUNICACIONES</div>
                </div>`,
        articulos: [
            {
                tipo: "Artículo",
                numero: "161",
                titulo: "Violación de correspondencia",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            El que abre, indebidamente, una carta, un pliego, telegrama, radiograma, despacho telefónico u otro documento de naturaleza análoga, que no le esté dirigido, o se apodera indebidamente de alguno de estos documentos, aunque no esté cerrado, será reprimido con pena privativa de libertad no mayor de dos años y con sesenta a no noventa días-multa.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "162",
                titulo: "Interferencia telefónica",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            El que, indebidamente, interviene o interfiere o escucha una conversación telefónica o similar, será reprimido con pena privativa de libertad no menor de cinco ni mayor de diez años.
                        </div>
                        <div style="margin-bottom: 10px; text-align: justify; line-height: 1.5;">
                            La pena privativa de libertad será no menor de diez ni mayor de quince años:
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">1.</span>
                            <div>Cuando el agente tenga la condición de funcionario o servidor público, y se impondrá además la inhabilitación conforme al artículo 36, incisos 1, 2 y 4.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">2.</span>
                            <div>Cuando el delito recaiga sobre información clasificada como secreta, reservada o confidencial de conformidad con la Ley 27806, Ley de Transparencia y Acceso a la Información Pública.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 15px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">3.</span>
                            <div>Cuando el delito comprometa la defensa, seguridad o soberanía nacionales.</div>
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            Si el agente comete el delito como integrante de una organización criminal, la pena se incrementa hasta en un tercio por encima del máximo legal previsto en los supuestos anteriores.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "162-A",
                titulo: "Posesión o comercialización de equipos destinados a la interceptación telefónica o similar",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            El que fabrica, adquiere, introduce al territorio nacional, posee o comercializa equipos o softwares destinados a interceptar ilegalmente las comunicaciones o similares, será reprimido con pena privativa de la libertad no menor de diez ni mayor de quince años.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "162-B",
                titulo: "Interferencia de comunicaciones electrónicas, de mensajería instantánea y similares",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            El que, indebidamente, interviene o interfiere comunicaciones electrónicas o de mensajería instantánea o similares, será reprimido con pena privativa de libertad no menor de cinco ni mayor de diez años.
                        </div>
                        <div style="margin-bottom: 10px; text-align: justify; line-height: 1.5;">
                            La pena privativa de libertad será no menor de diez ni mayor de quince años, cuando:
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">1.</span>
                            <div>El agente tenga la condición de funcionario o servidor público, y se impondrá además la inhabilitación conforme al artículo 36, incisos 1, 2 y 4.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">2.</span>
                            <div>El delito recaiga sobre información clasificada como secreta, reservada o confidencial de conformidad con la Ley Nº 27806, Ley de Transparencia y Acceso a la Información Pública.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 15px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">3.</span>
                            <div>El delito comprometa la defensa, seguridad o soberanía nacionales.</div>
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            Si el agente comete el delito como integrante de una organización criminal, la pena se incrementa hasta en un tercio por encima del máximo legal previsto en los supuestos anteriores.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "163",
                titulo: "Supresión o extravío indebido de correspondencia",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            El que, indebidamente, suprime o extravía de su destino una correspondencia epistolar o telegráfica, aunque no la haya violado, será reprimido con prestación de servicio comunitario de veinte a cincuentidós jornadas.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "164",
                titulo: "Publicación indebida de correspondencia",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            El que publica, indebidamente, una correspondencia epistolar o telegráfica, no destinada a la publicidad, aunque le haya sido dirigida, será reprimido, si el hecho causa algún perjuicio a otro, con limitación de días libres de veinte a cincuentidós jornadas.
                        </div>`
            }
        ]
    },
    {
        titulo: ``,
        capitulo: `
                <div style="text-align: center; margin-top: 30px;">
                    <div style="margin-bottom: 15px;">CAPÍTULO V</div>
                    <div>VIOLACIÓN DEL SECRETO PROFESIONAL</div>
                </div>`,
        articulos: [
            {
                tipo: "Artículo",
                numero: "165",
                titulo: "Violación del secreto profesional",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            El que, teniendo información por razón de su estado, oficio, empleo, profesión o ministerio, de secretos cuya publicación pueda causar daño, los revela sin consentimiento del interesado, será reprimido con pena privativa de libertad no mayor de dos años y con sesenta a ciento veinte días-multa.
                        </div>`
            }
        ]
    },
    {
        titulo: ``,
        capitulo: `
                <div style="text-align: center; margin-top: 30px;">
                    <div style="margin-bottom: 15px;">CAPÍTULO VI</div>
                    <div>VIOLACIÓN DE LA LIBERTAD DE REUNIÓN</div>
                </div>`,
        articulos: [
            {
                tipo: "Artículo",
                numero: "166",
                titulo: "Perturbación de reunión pública",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            El que, con violencia o amenaza, impide o perturba una reunión pública lícita, será reprimido con pena privativa de libertad no mayor de un año y con sesenta a noventa días-multa.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "167",
                titulo: "Prohibición de reunión pública lícita por funcionario público",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            El funcionario público que abusando de su cargo no autoriza, no garantiza, prohíbe o impide una reunión pública, lícitamente convocada, será reprimido con pena privativa de libertad no menor de dos ni mayor de cuatro años e inhabilitación de uno a dos años conforme el artículo 36, incisos 1, 2 y 3.
                        </div>`
            }
        ]
    },
    {
        titulo: ``,
        capitulo: `
                <div style="text-align: center; margin-top: 30px;">
                    <div style="margin-bottom: 15px;">CAPÍTULO VII</div>
                    <div>VIOLACIÓN DE LA LIBERTAD DE TRABAJO</div>
                </div>`,
        articulos: [
            {
                tipo: "Artículo",
                numero: "168",
                titulo: "Atentado contra la libertad de trabajo y asociación",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            El que, mediante violencia o amenaza, obliga o impide a otro a integrar un sindicato, es reprimido con pena privativa de libertad no menor de dos ni mayor de dos cinco años.
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            La misma pena se aplicará al que incumple las resoluciones consentidas o ejecutoriadas dictadas por la autoridad competente; y al que disminuye o distorsiona la producción, simula causales para el cierre del centro de trabajo o abandona éste para extinguir las relaciones laborales.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "168-A",
                titulo: "Atentado contra las condiciones de seguridad y salud en el trabajo",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            El que, deliberadamente, infringiendo las normas de seguridad y salud en el trabajo y estando legalmente obligado, ponga en peligro inminente la vida, salud o integridad física de sus trabajadores de forma grave, será reprimido con pena privativa de libertad no menor de uno ni mayor de cuatro años.
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            Si, como consecuencia de la inobservancia deliberada de las normas de seguridad y salud en el trabajo, se causa la muerte del trabajador o terceros o le producen lesión grave, y el agente pudo prever este resultado, la pena privativa de libertad será no menor de cuatro ni mayor de ocho años en caso de muerte y, no menor de tres ni mayor de seis años en caso de lesión grave.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "168-B",
                titulo: "Trabajo forzoso",
                texto: `
                        <div style="text-align: justify; line-height: 1.5; color: #777; font-style: italic;">
                            Trasladado al art. 129-O conforme a la Ley 31146 del 30/03/2021.
                        </div>`
            }
        ]
    },
    {
        titulo: ``,
        capitulo: `
                <div style="text-align: center; margin-top: 30px;">
                    <div style="margin-bottom: 15px;">CAPÍTULO VIII</div>
                    <div>VIOLACIÓN DE LA LIBERTAD DE EXPRESIÓN</div>
                </div>`,
        articulos: [
            {
                tipo: "Artículo",
                numero: "169",
                titulo: "Violación de la libertad de expresión",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            El funcionario público que, abusando de su cargo, suspende o clausura algún medio de comunicación social o impide su circulación o difusión, será reprimido con pena privativa de libertad no menor de tres ni mayor de seis años e inhabilitación conforme al artículo 36, incisos 1 y 2.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "170",
                titulo: "Violación sexual",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            El que con violencia, física o psicológica, grave amenaza o aprovechándose de un entorno de coacción o de cualquier otro entorno que impida a la persona dar su libre consentimiento, obliga a esta a tener acceso carnal por vía vaginal, anal o bucal o realiza cualquier otro acto análogo con la introducción de un objeto o parte del cuerpo por alguna de las dos primeras vías, será reprimido con pena privativa de libertad no menor de catorce ni mayor de veinte años.
                        </div>
                        <div style="margin-bottom: 10px; text-align: justify; line-height: 1.5;">
                            La pena privativa de libertad será no menor de veinte ni mayor de veintiséis años, en cualquiera de los casos siguientes:
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">1.</span>
                            <div>Si la violación se realiza con el empleo de arma o por dos o más sujetos.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">2.</span>
                            <div>Si el agente abusa de su profesión, ciencia u oficio o se aprovecha de cualquier posición, cargo o responsabilidad legal que le confiera el deber de vigilancia, custodia o particular autoridad sobre la víctima o la impulsa a depositar su confianza en él.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">3.</span>
                            <div>Si el agente aprovecha su calidad de ascendiente o descendiente, por consanguinidad, adopción o afinidad; o de cónyuge, excónyuge, conviviente o exconviviente o con la víctima esté sosteniendo o haya sostenido una relación análoga; o tiene hijos en común con la víctima; o habita en el mismo hogar de la víctima siempre que no medien relaciones contractuales o laborales; o es pariente colateral hasta el cuarto grado, por consanguinidad o adopción o segundo grado de afinidad.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">4.</span>
                            <div>Si es cometido por pastor, sacerdote o líder de una organización religiosa o espiritual que tenga particular ascendencia sobre la víctima.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">5.</span>
                            <div>Si el agente tiene cargo directivo, es docente, auxiliar o personal administrativo en el centro educativo donde estudia la víctima.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">6.</span>
                            <div>Si mantiene una relación proveniente de un contrato de locación de servicios, o de una relación laboral con la víctima, o si esta le presta servicios como trabajador del hogar.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">7.</span>
                            <div>Si fuera cometido por personal perteneciente a las Fuerzas Armadas, Policía Nacional del Perú, Serenazgo, Policía Municipal o vigilancia privada, o cualquier funcionario o servidor público, valiéndose del ejercicio de sus funciones o como consecuencia de ellas.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">8.</span>
                            <div>Si el agente tiene conocimiento de ser portador de una enfermedad de transmisión sexual grave.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">9.</span>
                            <div>Si el agente, a sabiendas, comete la violación sexual en presencia de cualquier niña, niño o adolescente.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">10.</span>
                            <div>Si la víctima se encuentra en estado de gestación.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">11.</span>
                            <div>Si la víctima tiene entre catorce y menos de dieciocho años de edad, es adulto mayor o sufre de discapacidad, física o sensorial, y el agente se aprovecha de dicha condición.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">12.</span>
                            <div>Si la víctima es mujer y es agraviada por su condición de tal en cualquiera de los contextos previstos en el primer párrafo del artículo 108-B.</div>
                        </div>
                        <div style="display: flex; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">13.</span>
                            <div>Si el agente actúa en estado de ebriedad, con presencia de alcohol in la sangre en proporción mayor de 0.5 gramos-litro, o bajo el efecto de drogas tóxicas, estupefacientes, sustancias psicotrópicas o sintéticas que pudiera alterar su conciencia.</div>
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "171",
                titulo: "Violación de persona en estado de inconsciencia o en la imposibilidad de resistir",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            El que tiene acceso carnal con una persona por vía vaginal, anal o bucal, o realiza cualquier otro acto análogo con la introducción de un objeto o parte del cuerpo por alguna de las dos primeras vías, después de haberla puesto en estado de inconsciencia o en la imposibilidad de resistir, será reprimido con pena privativa de libertad no menor de veinte ni mayor de veinticinco años.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "172",
                titulo: "Violación de persona en incapacidad de dar su libre consentimiento",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            El que tiene acceso carnal con una persona por vía vaginal, anal o bucal o realiza cualquier otro acto análogo con la introducción de un objeto o parte del cuerpo por alguna de las dos primeras vías, conociendo que está impedida de dar su libre consentimiento por sufrir de anomalía psíquica, grave alteración de la conciencia, retardo mental o que se encuentra en incapacidad de resistir, será reprimido con pena privativa de libertad no menor de veinte ni mayor de veinticinco años.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "173",
                titulo: "Violación sexual de menor de edad",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            El que tiene acceso carnal por vía vaginal, anal o bucal o realiza cualquier otro acto análogo con la introducción de un objeto o parte del cuerpo por alguna de las dos primeras vías, con un menor de catorce años, será reprimido con pena de cadena perpetua.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "173-A",
                titulo: "Derogado",
                texto: `
                        <div style="text-align: justify; line-height: 1.5; color: #777; font-style: italic;">
                            Artículo derogado conforme a las modificaciones del ordenamiento penal vigente.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "174",
                titulo: "Violación de persona bajo autoridad o vigilancia",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            El que, aprovechando la situación de dependencia, autoridad o vigilancia tiene acceso carnal por vía vaginal, anal o bucal o introduce objetos o partes del cuerpo por alguna de las dos primeras vías a una persona colocada en un hospital, asilo u otro establecimiento similar o que se halle detenida o recluida o interna, será reprimido con pena privativa de libertad no menor de veinte ni mayor de veinticinco años.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "175",
                titulo: "Violación sexual mediante engaño",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            El que, mediante engaño tiene acceso carnal por vía vaginal, anal o bucal o realiza cualquier otro acto análogo con la introducción de un objeto o parte del cuerpo por alguna de las dos primeras vías, a una persona de catorce años y menos de dieciocho años será reprimido con pena privativa de libertad no menor de seis ni mayor de nueve años.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "176",
                titulo: "Tocamientos, actos de connotación sexual o actos libidinosos sin consentimiento",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            El que sin propósito de tener acceso carnal regulado por el artículo 170, realiza sobre una persona, sin su libre consentimiento, tocamientos, actos de connotación sexual o actos libidinosos, en sus partes íntimas o en cualquier parte de su cuerpo será reprimido con pena privativa de libertad no menor de tres ni mayor de seis años.
                        </div>
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            Si el agente realiza la conducta descrita en el primer párrafo, mediante amenaza, violencia, o aprovechándose de un entorno de coacción o de cualquier otro que impida a la víctima dar su libre consentimiento, o valiéndose de cualquiera de estos medios obliga a la víctima a realizarlos sobre el agente, sobre sí misma o sobre tercero, la pena privativa de libertad será no menor de seis ni mayor de nueve años.
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            En cualquiera de los casos previstos en el primer y segundo párrafos, la pena privativa de libertad se incrementa en cinco años en los extremos mínimo y máximo, si la víctima es mayor de catorce y menor de dieciocho años.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "176-A",
                titulo: "Tocamientos, actos de connotación sexual o actos libidinosos en agravio de menores",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            El que sin propósito de tener acceso carnal regulado en el artículo 170, realiza sobre un menor de catorce años u obliga a este a efectuar sobre sí mismo, sobre el agente o tercero, tocamientos indebidos en sus partes íntimas, actos de connotación sexual en cualquier parte de su cuerpo o actos libidinosos, será reprimido con pena privativa de libertad no menor de nueve ni mayor de quince años.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "176-B",
                titulo: "Acoso sexual",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            El que, de cualquier forma, vigila, persigue, hostiga, asedia o busca establecer contacto o cercanía con una persona, sin el consentimiento de esta, para llevar a cabo actos de connotación sexual, será reprimido con pena privativa de la libertad no menor de tres ni mayor de cinco años e inhabilitación, según corresponda, conforme a los incisos 5, 9, 10 y 11 del artículo 36.
                        </div>
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            Igual pena se aplica a quien realiza la misma conducta valiéndose del uso de cualquier tecnología de la información o de la comunicación o cualquier otro medio tecnológico.
                        </div>
                        <div style="margin-bottom: 10px; text-align: justify; line-height: 1.5;">
                            La pena privativa de la libertad será no menor de cuatro ni mayor de ocho años e inhabilitación, según corresponda, conforme a los incisos 5, 9, 10 y 11 del artículo 36, si concurre alguna de las circunstancias agravantes:
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">1.</span>
                            <div>La víctima es persona adulta mayor, se encuentra en estado de gestación o es persona con discapacidad.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">2.</span>
                            <div>La víctima y el agente tienen o han tenido una relación de pareja, son o han sido convivientes o cónyuges, tienen vínculo parental hasta el cuarto grado de consanguinidad o segundo de afinidad.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">3.</span>
                            <div>La víctima habita en el mismo domicilio que el agente o comparten espacios comunes de una misma propiedad.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">4.</span>
                            <div>La víctima se encuentra en condición de dependencia o subordinación con respecto al agente.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">5.</span>
                            <div>La conducta se lleva a cabo en el marco de una relación laboral, educativa o formativa de la víctima.</div>
                        </div>
                        <div style="display: flex; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">6.</span>
                            <div>La víctima tiene entre catorce y menos de dieciocho años.</div>
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "176-C",
                titulo: "Chantaje sexual",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            El que amenaza o intimida a una persona, por cualquier medio, including el uso de tecnologías de la información o comunicación, para obtener de ella una conducta o acto de connotación sexual, será reprimido con pena privativa de la libertad no menor de dos ni mayor de cuatro años e inhabilitación, según corresponda, conforme a los incisos 5, 9, 10 y 11 del artículo 36.
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            La pena privativa de libertad será no menor de tres ni mayor de cinco años e inhabilitación, según corresponda, conforme a los incisos 5, 9, 10 y 11 del artículo 36, si para la ejecución del delito el agente amenaza a la víctima con la difusión de imágenes, materiales audiovisuales o audios con contenido sexual en los que esta aparece o participa.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "176-D",
                titulo: "Acoso sexual a menores de catorce años de edad",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            El que de cualquier forma vigila, persigue, hostiga, asedia o busca establecer contacto o cercanía con un menor de hasta 14 años para llevar a cabo actos de connotación sexual es reprimido con pena privativa de la libertad no menor de seis ni mayor de nueve años y es inhabilitado, según corresponda, conforme a los numerales 5, 9, 10 y 11 del artículo 36.
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            Igual pena se aplica a quien realiza la misma conducta valiéndose del uso de cualquier tecnología de la información o de la comunicación o cualquier otro medio tecnológico.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "177",
                titulo: "Formas agravadas",
                texto: `
                        <div style="margin-bottom: 10px; text-align: justify; line-height: 1.5;">
                            En cualquiera de los casos de los artículos 170, 171, 172, 174, 175, 176 y 176-A:
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">1.</span>
                            <div>Si el agente procedió con crueldad, alevosía o para degradar a la víctima, la pena privativa de libertad se incrementa en cinco años en los extremos mínimo y máximo en el respectivo delito.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">2.</span>
                            <div>Si los actos producen lesión grave en la víctima y el agente pudo prever ese resultado, la pena privativa de libertad será no menor de treinta ni mayor de treinta y cinco años.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 15px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">3.</span>
                            <div>Si los actos causan la muerte de la víctima y el agente pudo prever ese resultado, la pena será de cadena perpetua.</div>
                        </div>
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            En los casos de los delitos previstos en los artículos 171, 172, 174, 176 y 176-A la pena se incrementa en cinco años en sus extremos mínimo y máximo si concurre cualquiera de las circunstancias establecidas en el artículo 170, segundo párrafo.
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            Si el agente registra cualquiera de las conductas previstas en los artículos 170, 171, 172, 174, 175, 176 y 176-A mediante cualquier medio visual, auditivo o audiovisual o la transmite mediante cualquier tecnología de la información o comunicación, la pena se incrementa en cinco años en los extremos mínimo y máximo aplicable al delito registrado o transmitido.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "178",
                titulo: "Responsabilidad especial",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            En los casos comprendidos en este capítulo, el juez penal debe resolver, de oficio o a petición de parte, sobre la obligación alimentaria a la prole que resulte, aplicando las normas respectivas.
                        </div>
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            La obligación alimentaria a que se hace referencia en el primer párrafo comprende lo necesario para el sustento, habitación, vestido, educación, instrucción y capacitación para el trabajo, asistencia médica y psicológica, y recreación del niño o del adolescente y, del mismo modo, los gastos del embarazo de la madre desde la concepción hasta la etapa de postparto.
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            La decisión del juez respecto de la obligación alimentaria comprende la asignación anticipada de alimentos durante la investigación fiscal, así como la fijación de la obligación de prestar alimentos inclusive antes de la sentencia atendiendo al material probatorio disponible.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "178-A",
                titulo: "Tratamiento terapéutico",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            El condenado a pena privativa de libertad efectiva por los delitos comprendidos en este capítulo, previo examen médico y psicológico que determine su aplicación, será sometido a un tratamiento terapéutico a fin de facilitar su readaptación social.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "179",
                titulo: "Favorecimiento a la prostitución",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            El que promueve o favorece la prostitución de otra persona, será reprimido con pena privativa de libertad no menor de cuatro ni mayor de seis años.
                        </div>
                        <div style="margin-bottom: 10px; text-align: justify; line-height: 1.5;">
                            La pena será no menor de seis ni mayor de doce años cuando:
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">1.</span>
                            <div>El agente comete el delito en el ámbito del turismo, en el marco de la actividad de una persona jurídica o en el contexto de cualquier actividad económica.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">2.</span>
                            <div>El agente es ascendiente o descendiente por consanguinidad, adopción o por afinidad, pariente colateral hasta el cuarto grado de consanguinidad o adopción o segundo grado de afinidad; cónyuge, excónyuge, conviviente, exconviviente o tenga hijos en común con la víctima; o habite en el mismo domicilio de la víctima, siempre que no medien relaciones contractuales o laborales.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">3.</span>
                            <div>Es un medio de subsistencia del agente.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">4.</span>
                            <div>La víctima esté en situación de abandono o extrema necesidad económica.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">5.</span>
                            <div>Se realice respecto a una pluralidad de personas.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">6.</span>
                            <div>La persona en prostitución tenga discapacidad, sea adulta mayor, padezca de una enfermedad grave, pertenezca a un pueblo indígena u originario o presente cualquier situación de vulnerabilidad.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">7.</span>
                            <div>Cuando el agente, a sabiendas, favorezca o promueva actos de prostitución violentos que produzcan lesiones o ponga en peligro grave la integridad o la vida de quien realice la prostitución.</div>
                        </div>
                        <div style="display: flex; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">8.</span>
                            <div>El agente actúe como integrante de una banda u organización criminal.</div>
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "179-A",
                titulo: "Cliente del adolescente",
                texto: `
                        <div style="text-align: justify; line-height: 1.5; color: #777; font-style: italic;">
                            Trasladado al art. 129-J conforme a la Ley 31146 del 30/03/2021.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "180",
                titulo: "Rufianismo",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            El que gestiona el beneficio económico o de otra índole de la prostitución de otra persona será reprimido con pena privativa de libertad no menor de cuatro ni mayor de ocho años.
                        </div>
                        <div style="margin-bottom: 10px; text-align: justify; line-height: 1.5;">
                            La pena privativa de libertad será no menor de seis ni mayor de doce años cuando:
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">1.</span>
                            <div>El agente comete el delito en el ámbito del turismo, en el marco de la actividad de una persona jurídica o en el contexto de cualquier actividad económica.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">2.</span>
                            <div>El agente es ascendiente o descendiente por consanguinidad, adopción o por afinidad, pariente colateral hasta el cuarto grado de consanguinidad, o adopción o segundo grado de afinidad; cónyuge, excónyuge, conviviente, exconviviente o tenga hijos en común con la víctima; o habite en el mismo domicilio de la víctima, siempre que no medien relaciones contractuales o laborales.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">3.</span>
                            <div>Es un medio de subsistencia del agente.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">4.</span>
                            <div>La víctima esté en situación de abandono o extrema necesidad económica.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">5.</span>
                            <div>Exista pluralidad de personas en prostitución.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">6.</span>
                            <div>La persona en prostitución tenga discapacidad, sea adulta mayor, padezca de una enfermedad grave, pertenezca a un pueblo indígena u originario o presente cualquier situación de vulnerabilidad.</div>
                        </div>
                        <div style="display: flex; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">7.</span>
                            <div>El agente actúe como integrante de una banda u organización criminal.</div>
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "181",
                titulo: "Proxenetismo",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            El que dirige o gestiona la prostitución de otra persona será reprimido con pena privativa de libertad no menor de cuatro ni mayor de seis años.
                        </div>
                        <div style="margin-bottom: 10px; text-align: justify; line-height: 1.5;">
                            La pena será no menor de seis ni mayor de doce años, cuando:
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">1.</span>
                            <div>El agente comete el delito en el ámbito del turismo, en el marco de la actividad de una persona jurídica o en el contexto de cualquier actividad económica.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">2.</span>
                            <div>El agente sea ascendiente o descendiente por consanguinidad, adopción o por afinidad, pariente colateral hasta el cuarto grado de consanguinidad o adopción o segundo grado de afinidad; cónyuge, excónyuge, conviviente, exconviviente o tenga hijos en común con la víctima o habite en el mismo domicilio de la víctima, siempre que no medien relaciones contractuales o laborales.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">3.</span>
                            <div>El proxenetismo sea un medio de subsistencia del agente.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">4.</span>
                            <div>La víctima esté en situación de abandono o extrema necesidad económica.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">5.</span>
                            <div>Exista pluralidad de personas en prostitución.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">6.</span>
                            <div>La persona en prostitución tenga discapacidad, sea adulta mayor, padezca de una enfermedad grave, pertenezca a un pueblo indígena u originario o presente cualquier situación de vulnerabilidad.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">7.</span>
                            <div>Se produzca una lesión grave o se ponga en peligro inminente la vida o la salud de la persona en prostitución.</div>
                        </div>
                        <div style="display: flex; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">8.</span>
                            <div>El agente actúe como integrante de una banda u organización criminal.</div>
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "181-A",
                titulo: "Promoción y favorecimiento de la explotación sexual de niñas, niños y adolescentes",
                texto: `
                        <div style="text-align: justify; line-height: 1.5; color: #777; font-style: italic;">
                            Trasladado al art. 129-I conforme a la Ley 31146 del 30/03/2021.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "181-B",
                titulo: "Formas agravadas",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            En los casos de los delitos previstos en los artículos 179, 181 y 181-A, cuando el agente sea el padre o la madre, el tutor o curador, en la sentencia se impondrá, además de la pena privativa de libertad que corresponda, la pena accesoria de inhabilitación a que se refiere el numeral 5) del artículo 36.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "182",
                titulo: "Derogado",
                texto: `
                        <div style="text-align: justify; line-height: 1.5; color: #777; font-style: italic;">
                            Derogado conforme a la Ley 28950 del 16/01/2007.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "182-A",
                titulo: "Publicación en los medios de comunicación sobre delitos de libertad sexual contra niñas, niños y adolescentes",
                texto: `
                        <div style="text-align: justify; line-height: 1.5; color: #777; font-style: italic;">
                            Trasladado al art. 129-N conforme a la Ley 31146 del 30/03/2021.
                        </div>`
            }
        ]
    },
    {
        titulo: ``,
        capitulo: `
                <div style="text-align: center; margin-top: 30px;">
                    <div style="margin-bottom: 15px;">CAPÍTULO XI</div>
                    <div>OFENSAS AL PUDOR PÚBLICO</div>
                </div>`,
        articulos: [
            {
                tipo: "Artículo",
                numero: "183",
                titulo: "Exhibiciones y publicaciones obscenas",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            Será reprimido con pena privativa de libertad no menor de dos ni mayor de cuatro años el que, en lugar público, realiza exhibiciones, gestos, tocamientos u otra conducta de índole obscena.
                        </div>
                        <div style="margin-bottom: 10px; text-align: justify; line-height: 1.5;">
                            Será reprimido con pena privativa de libertad no menor de cuatro ni mayor de seis años:
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">1.</span>
                            <div>El que muestra, vende o entrega a un menor de dieciocho años, por cualquier medio, objetos, libros, escritos, imágenes, visuales o auditivas, que por su carácter pueden afectar su desarrollo sexual.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">2.</span>
                            <div>El que incita a un menor de dieciocho años a la práctica de un acto de índole sexual o le facilita la entrada a lugares con dicho propósito.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">3.</span>
                            <div>El administrador, vigilante o persona autorizada para controlar un cine u otro espectáculo donde se exhiban representaciones de índole sexual que permita ingresar a un menor de dieciocho años.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">4.</span>
                            <div>El que comete la conducta en presencia de un menor de edad o de una persona con discapacidad intelectual.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">5.</span>
                            <div>Cuando la conducta es realizada por quien tiene una posición de garante y el deber de custodia, protección o cuidado sobre un menor de edad o una persona en situación de especial vulnerabilidad.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 15px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">6.</span>
                            <div>Cuando la conducta es realizada por un servidor o funcionario público, docente o personal administrativo de una institución educativa.</div>
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            En todos los casos se impone, además, la pena de inhabilitación conforme al artículo 36, incisos 1, 2, 3, 4, 6, 8, 9, 10 y 11.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "183-A",
                titulo: "Pornografía infantil",
                texto: `
                        <div style="text-align: justify; line-height: 1.5; color: #777; font-style: italic;">
                            Trasladado al art. 129-M conforme a la Ley 31146 del 30/03/2021.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "183-B",
                titulo: "Proposiciones a niños, niñas y adolescentes con fines sexuales",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            El que contacta con un menor de catorce años para solicitar u obtener de él material pornográfico, o para proponerle llevar a cabo cualquier acto de connotación sexual con él o con tercero, será reprimido con pena privativa de libertad no menor de seis ni mayor de nueve años.
                        </div>
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            Cuando la víctima tiene entre catorce y menos de dieciocho años, y medie engaño, la pena será no menor de tres ni mayor de seis años.
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            En todos los casos se impone, además, la pena de inhabilitación conforme al artículo 36, incisos 1, 2, 3, 4, 5, 6, 8, 9, 10 y 11.
                        </div>`
            }
        ]
    },
    {
        titulo: ``,
        capitulo: `
                <div style="text-align: center; margin-top: 30px;">
                    <div style="margin-bottom: 15px;">CAPÍTULO XII</div>
                    <div>DISPOSICIÓN COMÚN</div>
                </div>`,
        articulos: [
            {
                tipo: "Artículo",
                numero: "184",
                titulo: "Castigo a cómplices",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            Los ascendientes, descendientes, afines en línea recta, hermanos y cualquier persona que, con abuso de autoridad, encargo o confianza, cooperen a la perpetración de los delitos comprendidos en los Capítulos IX, X y XI de este Título actuando en la forma señalada por el artículo 25 primer párrafo, serán reprimidos con la pena de los autores.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "184-A",
                titulo: "Inhabilitación",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            El juez impone como pena principal la inhabilitación prevista en el artículo 36 del presente Código, según corresponda.
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            En los delitos comprendidos en los capítulos IX, X y XI del presente título, el juzgado penal aplica, de oficio o a pedido de parte, la suspensión y extinción de la patria potestad conforme con los artículos 75 y 77 del Código de los Niños y Adolescentes, según corresponda al momento procesal.
                        </div>`
            }
        ]
    },
    {
        titulo: `
                <div style="text-align: center; margin-top: 30px;">
                    <div style="margin-bottom: 15px;">TÍTULO V</div>
                    <div>DELITOS CONTRA EL PATRIMONIO</div>
                </div>`,
        capitulo: `
                <div style="text-align: center; margin-top: 30px;">
                    <div style="margin-bottom: 15px;">CAPÍTULO I</div>
                    <div>HURTO</div>
                </div>`,
        articulos: [
            {
                tipo: "Artículo",
                numero: "185",
                titulo: "Hurto simple",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            El que, para obtener provecho, se apodera ilegítimamente de un bien mueble, total o parcialmente ajeno, sustrayéndolo del lugar donde se encuentra, será reprimido con pena privativa de libertad no menor de uno ni mayor de tres años. Se equiparan a bien mueble la energía eléctrica, el gas, los hidrocarburos o sus productos derivados, el agua y cualquier otra energía o elemento que tenga valor económico, así como el espectro electromagnético y también los recursos pesqueros objeto de un mecanismo de asignación de Límites Máximos de Captura por Embarcación.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "186",
                titulo: "Hurto agravado",
                texto: `
                        <div style="margin-bottom: 10px; text-align: justify; line-height: 1.5;">
                            El agente será reprimido con pena privativa de libertad no menor de tres ni mayor de seis años si el hurto es cometido:
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">1.</span>
                            <div>Durante la noche.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">2.</span>
                            <div>Mediante destreza, escalamiento, destrucción o rotura de obstáculos.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">3.</span>
                            <div>Con ocasión de incendio, inundación, naufragio, calamidad pública o desgracia particular del agraviado.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">4.</span>
                            <div>Sobre los bienes muebles que forman el equipaje del viajero.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 15px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">5.</span>
                            <div>Mediante el concurso de dos o más personas.</div>
                        </div>
                        <div style="margin-bottom: 10px; text-align: justify; line-height: 1.5;">
                            La pena será no menor de cuatro ni mayor de ocho años si el hurto es cometido:
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">1.</span>
                            <div>En inmueble habitado.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">2.</span>
                            <div>Por un agente que actúa en calidad de integrante de una organización destinada a perpetrar estos delitos.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">3.</span>
                            <div>Sobre bienes de valor científico o que integren el patrimonio cultural de la Nación.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify; color: #777; font-style: italic;">
                            <span style="min-width: 35px;">4.</span>
                            <div>Derogado</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">5.</span>
                            <div>Colocando a la víctima o a su familia en grave situación económica.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">6.</span>
                            <div>Con empleo de materiales o artefactos explosivos para la destrucción o rotura de obstáculos.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">7.</span>
                            <div>Utilizando el espectro radioeléctrico para la transmisión de señales de telecomunicación ilegales.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">8.</span>
                            <div>Sobre bien que constituya único medio de subsistencia o herramienta de trabajo de la víctima.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">9.</span>
                            <div>Sobre vehículo automotor, sus autopartes o accesorios.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">10.</span>
                            <div>Sobre bienes que forman parte de la infraestructura o instalaciones de transportes de uso público, de sus equipos o elementos de seguridad, o de prestación de servicios públicos de saneamiento, electricidad o telecomunicaciones.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">11.</span>
                            <div>En agravio de menores de edad, personas con discapacidad, mujeres en estado de gravidez o adulto mayor.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">12.</span>
                            <div>Sobre bienes que forman parte de la infraestructura o instalaciones públicas o privadas para la exploración, explotación, procesamiento, refinación, almacenamiento, transporte, distribución, comercialización o abastecimiento de gas, de hidrocarburos o de sus productos derivados, conforme a la legislación de la materia.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 15px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">13.</span>
                            <div>Sobre bienes que integren o formen parte de la infraestructura o instalaciones públicas o privadas de centros educativos o de salud independientemente de su categoría o nivel, así como del Cuerpo General de Bomberos Voluntarios del Perú.</div>
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            La pena será no menor de ocho ni mayor de quince años cuando el agente actúa en calidad de jefe, cabecilla o dirigente de una organización criminal destinada a perpetrar estos delitos.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "186-A",
                titulo: "Dispositivos para asistir a la decodificación de señales de satélite portadoras de programas",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            El que fabrique, ensamble, modifique, importe, exporte, venda, alquile o distribuya por otro medio un dispositivo o sistema tangible o intangible, cuya función principal sea asistir en la decodificación de una señal de satélite codificada portadora de programas, sin la autorización del distribuidor legal de dicha señal, será reprimido con pena privativa de la libertad no menor de cuatro años ni mayor de ocho años y con noventa a ciento ochenta días multa.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "187",
                titulo: "Hurto de uso",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            El que sustrae un bien mueble ajeno con el fin de hacer uso momentáneo y lo devuelve será reprimido con pena privativa de libertad no mayor de un año.
                        </div>`
            }
        ]
    },
    {
        titulo: ``,
        capitulo: `
                <div style="text-align: center; margin-top: 30px;">
                    <div style="margin-bottom: 15px;">CAPÍTULO II</div>
                    <div>ROBO</div>
                </div>`,
        articulos: [
            {
                tipo: "Artículo",
                numero: "188",
                titulo: "Robo",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            El que se apodera ilegítimamente de un bien mueble total o parcialmente ajeno, para aprovecharse de él, sustrayéndolo del lugar en que se encuentra, empleando violencia contra la persona o amenazándola con un peligro inminente para su vida o integridad física será reprimido con pena privativa de libertad no menor de tres ni mayor de ocho años.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "189",
                titulo: "Robo agravado",
                texto: `
                        <div style="margin-bottom: 10px; text-align: justify; line-height: 1.5;">
                            La pena será no menor de doce ni mayor de veinte años si el robo se comete:
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">1.</span>
                            <div>En inmueble habitado.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">2.</span>
                            <div>Durante la noche o en lugar desolado.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">3.</span>
                            <div>A mano armada.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">4.</span>
                            <div>Con el concurso de dos o más personas.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">5.</span>
                            <div>En cualquier medio de locomoción de transporte público o privado de pasajeros o de carga, terminales terrestres, ferroviarios, lacustres y fluviales, puertos, aeropuertos, restaurantes y afines, establecimientos de hospedaje y lugares de alojamiento, áreas naturales protegidas, fuentes de agua minero-medicinales con fines turísticos, bienes inmuebles integrantes del patrimonio cultural de la Nación y museos.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">6.</span>
                            <div>Fingiendo ser autoridad o servidor público o trabajador del sector privado o mostrando mandamiento falso de autoridad.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify; color: #777; font-style: italic;">
                            <span style="min-width: 35px;">7.</span>
                            <div>Derogado</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">8.</span>
                            <div>Sobre vehículo automotor, sus autopartes o accesorios.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 15px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">9.</span>
                            <div>Sobre equipo terminal móvil, teléfono celular, equipo o aparato de telecomunicaciones, red o sistemas de telecomunicaciones u otro bien de naturaleza similar.</div>
                        </div>
                        <div style="margin-bottom: 10px; text-align: justify; line-height: 1.5;">
                            La pena será no menor de veinte ni mayor de treinta años si el robo es cometido:
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">1.</span>
                            <div>Cuando se cause lesiones a la integridad física o mental de la víctima.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">2.</span>
                            <div>Con abuso de la incapacidad física o mental de la víctima o mediante el empleo de drogas, insumos químicos o fármacos contra la víctima.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">3.</span>
                            <div>Colocando a la víctima o a su familia en grave situación económica.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">4.</span>
                            <div>Sobre bienes de valor científico o que integren el patrimonio cultural de la Nación.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">5.</span>
                            <div>Si la agravante descrita en el numeral 9 del primer párrafo se realiza mediante el empleo de material o artefacto explosivo.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">6.</span>
                            <div>Si la agravante descrita en el numeral 9 del primer párrafo se realiza mediante el uso de vehículos motorizados.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">7.</span>
                            <div>Sobre bienes que integren o formen parte de la infraestructura o instalaciones públicas o privadas de centros educativos o de salud, independientemente de su categoría o nivel, así como del Cuerpo General de Bomberos Voluntarios del Perú.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 15px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">8.</span>
                            <div>En agravio de menores de edad, personas con discapacidad, mujeres o adulto mayor.</div>
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            La pena será de cadena perpetua cuando el agente actúe en calidad de integrante de una organización criminal, o si, como consecuencia del hecho, se produce la muerte de la víctima o se le causa lesiones graves a su integridad física o mental.
                        </div>`
            }
        ]
    },
    {
        titulo: ``,
        capitulo: `
                <div style="text-align: center; margin-top: 30px;">
                    <div style="margin-bottom: 15px;">CAPÍTULO II-A</div>
                    <div>ABIGEATO</div>
                </div>`,
        articulos: [
            {
                tipo: "Artículo",
                numero: "189-A",
                titulo: "Hurto de ganado",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            El que, para obtener provecho, se apodera ilegítimamente de ganado vacuno, ovino, equino, caprino, porcino o auquénido, total o parcialmente ajeno, aunque se trate de un solo animal, sustrayéndolo del lugar donde se encuentra, será reprimido con pena privativa de libertad no menor de uno ni mayor de tres años.
                        </div>
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            Si concurre alguna de las circunstancias previstas en los incisos 1, 2, 3, 4 y 5 del primer párrafo del Artículo 186, la pena será privativa de libertad no menor de tres ni mayor de seis años.
                        </div>
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            Si el delito es cometido conforme a los incisos 2, 4 y 5 del segundo párrafo del Artículo 186, la pena será no menor de cuatro ni mayor de diez años.
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            La pena será no menor de 8 ni mayor de 15 años cuando el agente actúa en calidad de jefe, cabecilla o dirigente de una organización destinada a perpetrar estos delitos.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "189-B",
                titulo: "Hurto de uso de ganado",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            El que sustrae ganado ajeno, con el fin de hacer uso momentáneo y lo devuelve, directa o indirectamente en un plazo no superior a setentidós horas, será reprimido con pena privativa de libertad no mayor de un año o de prestación de servicios a la comunidad no mayor de cincuenta jornadas. Si la devolución del animal se produce luego de transcurrido dicho plazo, será aplicable el artículo anterior.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "189-C",
                titulo: "Robo de ganado",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            El que se apodera ilegítimamente de ganado vacuno, ovino, equino, caprino, porcino o auquénido, total o parcialmente ajeno, aunque se trate de un solo animal, sustrayéndolo del lugar donde se encuentra, empleando violencia contra la persona o amenazándola con un peligro inminente para su vida o integridad física, será reprimido con pena privativa de libertad no menor de tres ni mayor de ocho años.
                        </div>
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            La pena será privativa de libertad no menor de cinco ni mayor de quince años si el delito se comete con el concurso de dos o más personas, o el agente hubiere inferido lesión grave a otro o portando cualquier clase de arma o de instrumento que pudiere servir como tal.
                        </div>
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            Si la violencia o amenaza fuesen insignificantes, la pena será disminuida en un tercio.
                        </div>
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            La pena será no menor de diez ni mayor de veinte años si el delito cometido conforme a los incisos 1, 2, 3, 4 y 5 del segundo párrafo del artículo 189.
                        </div>
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            La pena será no menor de quince ni mayor de venticinco años si el agente actúa en calidad de jefe, cabecilla o dirigente de una organización destinada a perpetrar estos delitos.
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            En los casos de concurso con delitos contra la vida, el cuerpo y la salud, la pena se aplica sin perjuicio de otra más grave que pudiera corresponder en cada caso.
                        </div>`
            }
        ]
    },
    {
        titulo: ``,
        capitulo: `
                <div style="text-align: center; margin-top: 30px;">
                    <div style="margin-bottom: 15px;">CAPÍTULO III</div>
                    <div>APROPIACIÓN ILÍCITA</div>
                </div>`,
        articulos: [
            {
                tipo: "Artículo",
                numero: "190",
                titulo: "Apropiación ilícita común",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            El que, en su provecho o de un tercero, se apropia indebidamente de un bien mueble, una suma de dinero o un valor que ha recibido en depósito, comisión, administración u otro título semejante que produzca obligación de entregar, devolver, o hacer un uso determinado, será reprimido con pena privativa de libertad no menor de dos ni mayor de cuatro años.
                        </div>
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            Si el agente obra en calidad de curador, tutor, albacea, síndico, depositario judicial o en el ejercicio de una profesión o industria para la cual tenga título o autorización oficial, la pena será privativa de libertad no menor de tres ni mayor de seis años.
                        </div>
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            Cuando el agente se apropia de bienes destinados al auxilio de poblaciones que sufren las consecuencias de desastres naturales u otros similares la pena será privativa de libertad no menor de cuatro ni mayor de diez años.
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            Cuando el agente se apropia, desvía o dispone indebidamente en todo o en parte, con fines propios o de terceros, los aportes destinados a la constitución, formación, consolidación o desarrollo de un fondo pensionario o del seguro social de salud, la pena será privativa de libertad no menor de dos ni mayor de cuatro años; si el agente tiene la calidad de servidor público, la pena será no menor de tres ni mayor de seis años y la inhabilitación a que se refieren los incisos 1, 2 y 8 del artículo 36.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "191",
                titulo: "Sustracción de bien propio",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            El propietario de un bien mueble que lo sustrae de quien lo tenga legítimamente en su poder, con perjuicio de éste o de un tercero, será reprimido con pena privativa de libertad no mayor de cuatro años.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "192",
                titulo: "Apropiación irregular",
                texto: `
                        <div style="margin-bottom: 10px; text-align: justify; line-height: 1.5;">
                            Será reprimido con pena privativa de libertad no mayor de dos años o con limitación de días libres de diez a veinte jornadas, quien realiza cualquiera de las acciones siguientes:
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">1.</span>
                            <div>Se apropia de un bien que encuentra perdido o de un tesoro, o de la parte del tesoro correspondiente al propietario del suelo, sin observar las normas del Código Civil.</div>
                        </div>
                        <div style="display: flex; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">2.</span>
                            <div>Se apropia de un bien ajeno en cuya tenencia haya entrado a consecuencia de un error, caso fortuito o por cualquier otro motivo independiente de su voluntad.</div>
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "193",
                titulo: "Apropiación de prenda",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            El que vende la prenda constituída en su favor o se apropia o dispone de ella sin observar las formalidades legales, será reprimido con pena privativa de libertad no menor de uno ni mayor de cuatro años.
                        </div>`
            }
        ]
    },
    {
        titulo: ``,
        capitulo: `
                <div style="text-align: center; margin-top: 30px;">
                    <div style="margin-bottom: 15px;">CAPÍTULO IV</div>
                    <div>RECEPTACIÓN</div>
                </div>`,
        articulos: [
            {
                tipo: "Artículo",
                numero: "194",
                titulo: "Receptación",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            El que adquiere, recibe en donación, en prenda, guarda, esconde, expone para la venta, ayuda a negociar, comercializa, desensambla o utiliza, un bien o sus partes de cuya procedencia delictuosa tenía conocimiento o debía presumir que provenía de un delito, será reprimido con pena privativa de libertad no menor de dos ni mayor de cuatro años y con treinta a noventa días-multa e inhabilitación, conforme al numeral 4 del artículo 36 del Código Penal.
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            La misma pena se aplica al que provea documentos para ocultar, encubrir o disimular el origen ilícito de un bien o sus partes, contribuyendo con las conductas descritas en el párrafo precedente.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "194-A",
                titulo: "Distribución de señales de satélite portadoras de programas",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            El que distribuya una señal de satélite portadora de programas, originariamente codificada, a sabiendas que fue decodificada sin la autorización del distribuidor legal de dicha señal, será reprimido con pena privativa de la libertad no menor de dos años ni mayor de seis años y con treinta a noventa días multa.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "195",
                titulo: "Formas agravadas",
                texto: `
                        <div style="margin-bottom: 10px; text-align: justify; line-height: 1.5;">
                            La pena privativa de libertad será no menor de cuatro ni mayor de seis años y de sesenta a ciento cincuenta días-multa:
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">1.</span>
                            <div>Si se trata de vehículos automotores, sus autopartes o accesorios.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">2.</span>
                            <div>Si se trata de equipos de informática, equipos de telecomunicación, sus componentes y periféricos.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">3.</span>
                            <div>Si la conducta recae sobre bienes que forman parte de la infraestructura o instalaciones de transporte de uso público, de sus equipos o elementos de seguridad, o de prestación de servicios públicos de saneamiento, electricidad o telecomunicaciones.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">4.</span>
                            <div>Si se trata de bienes de propiedad del Estado destinado al uso público, fines asistenciales o a programas de apoyo social.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">5.</span>
                            <div>Si se realiza en el comercio de bienes muebles al público.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">6.</span>
                            <div>Si se trata de gas, de hidrocarburos o de sus productos derivados.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 15px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">7.</span>
                            <div>Si la conducta recae sobre bienes que forman parte de la infraestructura o instalaciones públicas o privadas para la exploración, explotación, procesamiento, refinación, almacenamiento, transporte, distribución, comercialización o abastecimiento de gas, de hidrocarburos o de sus productos derivados, conforme a la legislación de la materia.</div>
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            La pena será privativa de libertad no menor de seis ni mayor de doce años si se trata de bienes provenientes de la comisión de los delitos de robo agravado, secuestro, extorsión, trata de personas y trabajo forzoso.
                        </div>`
            }
        ]
    },
    {
        titulo: ``,
        capitulo: `
                <div style="text-align: center; margin-top: 30px;">
                    <div style="margin-bottom: 15px;">CAPÍTULO V</div>
                    <div>ESTAFA Y OTRAS DEFRAUDACIONES</div>
                </div>`,
        articulos: [
            {
                tipo: "Artículo",
                numero: "196",
                titulo: "Estafa",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            El que procura para sí o para otro un provecho ilícito en perjuicio de tercero, induciendo o manteniendo en error al agraviado mediante engaño, astucia, ardid u otra forma fraudulenta, será reprimido con pena privativa de libertad no menor de uno ni mayor de seis años.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "196-A",
                titulo: "Estafa agravada",
                texto: `
                        <div style="margin-bottom: 10px; text-align: justify; line-height: 1.5;">
                            La pena será privativa de libertad no menor de cuatro ni mayor de ocho años y con noventa a doscientos días-multa, cuando la estafa:
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">1.</span>
                            <div>Se cometa en agravio de menores de edad, personas con discapacidad, mujeres en estado de gravidez o adulto mayor.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">2.</span>
                            <div>Se realice con la participación de dos o más personas.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">3.</span>
                            <div>Se cometa en agravio de pluralidad de víctimas.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">4.</span>
                            <div>Se realice con ocasión de compra-venta de vehículos motorizados o bienes inmuebles.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">5.</span>
                            <div>Se realice para sustraer o acceder a los datos de tarjetas de ahorro o de crédito, emitidos por el sistema financiero o bancario.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">6.</span>
                            <div>Se realice con aprovechamiento de la situación de vulnerabilidad de la víctima.</div>
                        </div>
                        <div style="display: flex; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">7.</span>
                            <div>Se realice mediante la manipulación de la voz, imagen, audio o movimiento corporal de terceros, utilizando inteligencia artificial o tecnologías análogas de forma que cause un perjuicio económico a la víctima.</div>
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "197",
                titulo: "Casos de defraudación",
                texto: `
                        <div style="margin-bottom: 10px; text-align: justify; line-height: 1.5;">
                            La defraudación será reprimida con pena privativa de libertad no menor de uno ni mayor de cuatro años y con sesenta a ciento veinte días-multa cuando:
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">1.</span>
                            <div>Se realiza con simulación de juicio o empleo de otro fraude procesal.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">2.</span>
                            <div>Se abusa de firma en blanco, extendiendo algún documento en perjuicio del firmante o de tercero.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">3.</span>
                            <div>Si el comisionista o cualquier otro mandatario, altera en sus cuentas los precios o condiciones de los contratos, suponiendo gastos o exagerando los que hubiera hecho.</div>
                        </div>
                        <div style="display: flex; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">4.</span>
                            <div>Se vende o grava, como bienes libres, los que son litigiosos o están embargados o gravados y cuando se vende, grava o arrienda como propios los bienes ajenos.</div>
                        </div>`
            }
        ]
    },
    {
        titulo: ``,
        capitulo: `
                <div style="text-align: center; margin-top: 30px;">
                    <div style="margin-bottom: 15px;">CAPÍTULO VI</div>
                    <div>FRAUDE EN LA ADMINISTRACIÓN DE PERSONAS JURÍDICAS</div>
                </div>`,
        articulos: [
            {
                tipo: "Artículo",
                numero: "198",
                titulo: "Administración fraudulenta",
                texto: `
                        <div style="margin-bottom: 10px; text-align: justify; line-height: 1.5;">
                            Será reprimido con pena privativa de libertad no menor de dos ni mayor de cinco años y con ciento ochenta a trescientos sesenta y cinco días-multa, el que, ejerciendo funciones de administración o representación de una persona jurídica, realiza, en perjuicio de ella o de terceros, cualquiera de los actos siguientes:
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">1.</span>
                            <div>Ocultar a los accionistas, socios, asociados, auditor interno, auditor externo, según sea el caso o a terceros interesados, la verdadera situación de la persona jurídica, falseando los balances, reflejando u omitiendo en los mismos beneficios o pérdidas o usando cualquier artificio que suponga aumento o disminución de las partidas contables.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">2.</span>
                            <div>Proporcionar datos falsos relativos a la situación de una persona jurídica.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">3.</span>
                            <div>Promover, por cualquier medio fraudulento, falsas cotizaciones de acciones, títulos o participaciones.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">4.</span>
                            <div>Aceptar, estando prohibido hacerlo, acciones o títulos de la misma persona jurídica como garantía de crédito.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">5.</span>
                            <div>Fraguar balances para reflejar y distribuir utilidades inexistentes.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">6.</span>
                            <div>Omitir comunicar al directorio, consejo de administración, consejo directivo u otro órgano similar o al auditor interno o externo, acerca de la existencia de intereses propios que son incompatibles con los de la persona jurídica.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">7.</span>
                            <div>Asumir indebidamente préstamos para la persona jurídica.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">8.</span>
                            <div>Usar en provecho propio, o de otro, el patrimonio de la persona jurídica.</div>
                        </div>
                        <div style="display: flex; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">9.</span>
                            <div>Utilizar cualquier documento contable que sustente operaciones inexistentes o simuladas para encubrir pagos a favor de terceras personas naturales o jurídicas, nacionales o extranjeras.</div>
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "198-A",
                titulo: "Informes de auditoría distorsionados",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            Será reprimido con la pena señalada en el artículo anterior el auditor interno o externo que a sabiendas de la existencia de distorsiones o tergiversaciones significativas en la información contable-financiera de la persona jurídica no las revele en su informe o dictamen.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "199",
                titulo: "Contabilidad paralela",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            El que, con la finalidad de obtener ventaja indebida, mantiene contabilidad paralela distinta a la exigida por la ley, será reprimido con pena privativa de libertad no menor de dos ni mayor de cinco años y con ciento ochenta a trescientos sesenta y cinco días-multa.
                        </div>`
            }
        ]
    },
    {
        titulo: ``,
        capitulo: `
                <div style="text-align: center; margin-top: 30px;">
                    <div style="margin-bottom: 15px;">CAPÍTULO VII</div>
                    <div>EXTORSIÓN</div>
                </div>`,
        articulos: [
            {
                tipo: "Artículo",
                numero: "200",
                titulo: "Extorsión",
                texto: `
                        <div style="display: flex; margin-bottom: 10px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 50px;">200.1.</span>
                            <div>El que mediante violencia o amenaza obliga a una persona o a una institución pública o privada a otorgar al agente o a un tercero una ventaja económica indebida u otra ventaja de cualquier otra índole será reprimido con pena privativa de libertad no menor de diez ni mayor de quince años.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 10px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 50px;">200.2.</span>
                            <div>La misma pena se aplicará a quien, por sí mismo o por terceros, induce u obliga mediante amenaza, intimidación, engaño, ardid o violencia a aceptar dinero o bienes que simulan un contrato de mutuo o cualquier otro, con el fin de obtener una ventaja indebida.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 10px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 50px;">200.3.</span>
                            <div>La pena establecida en el párrafo 200.1 se aplicará al que, con la finalidad de contribuir a la comisión del delito de extorsión, suministra información que haya conocido por razón o con ocasión de sus funciones, cargo u oficio o proporciona deliberadamente los medios para la perpetración del delito.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 10px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 50px;">200.4.</span>
                            <div>El que, mediante violencia o amenaza, toma locales, obstaculiza vías de comunicación o impide el libre tránsito de la ciudadanía o perturba el normal funcionamiento de los servicios públicos o la ejecución de obras legalmente autorizadas, con el objeto de obtener de las autoridades cualquier beneficio o ventaja económica indebida u otra ventaja de cualquier otra índole, será sancionado con pena privativa de libertad no menor de cinco ni mayor de diez años.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 10px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 50px;">200.5.</span>
                            <div>El funcionario público con poder de decisión o el que desempeña cargo de confianza o de dirección que, contraviniendo lo establecido en el artículo 42 de la Constitución Política del Perú, participe en una huelga con el objeto de obtener para sí o para terceros cualquier beneficio o ventaja económica indebida u otra ventaja de cualquier otra índole, será sancionado con inhabilitación conforme a los numerales 1 y 2 del artículo 36 del Código Penal.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 10px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 50px;">200.6.</span>
                            <div>La pena será no menor de quince ni mayor de veinticinco años e inhabilitación conforme a los numerales 4 y 6 del artículo 36, si la violencia o amenaza es cometida:</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; margin-left: 50px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 25px;">a)</span>
                            <div>A mano armada, o utilizando artefactos explosivos o incendiarios.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; margin-left: 50px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 25px;">b)</span>
                            <div>Participando dos o más personas; o,</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; margin-left: 50px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 25px;">c)</span>
                            <div>Contra el propietario, responsable o contratista de la ejecución de una obra de construcción civil pública o privada, o de cualquier modo, impidiendo, perturbando, atentando o afectando la ejecución de la misma.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; margin-left: 50px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 25px;">d)</span>
                            <div>Aprovechando su condición de integrante de un sindicato de construcción civil.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; margin-left: 50px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 25px;">e)</span>
                            <div>Simulando ser trabajador de construcción civil.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; margin-left: 50px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 25px;">f)</span>
                            <div>Mediante el empleo de imágenes del entorno familiar, empresarial, laboral o social, u objetos perturbadores de peligrosidad, entregados, exhibidos, difundidos directa o indirectamente por cualquier medio a la víctima.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; margin-left: 50px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 25px;">g)</span>
                            <div>Contra la persona que realiza cualquier tipo de actividad comercial o empresarial, o en abuso de la condición económica de la víctima.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 10px; margin-left: 50px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 25px;">h)</span>
                            <div>Contra instituciones educativas, universidades, complejos habitacionales o condominios.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 10px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 50px;">200.7.</span>
                            <div>Si el agente con la finalidad de obtener una ventaja económica indebida o de cualquier otra índole, mantiene en rehén a una persona, la pena será no menor de veinte ni mayor de treinta años.</div>
                        </div>
                        <div style="margin-bottom: 10px; margin-left: 50px; text-align: justify; line-height: 1.5;">
                            La pena será privativa de libertad no menor de treinta años, cuando en el supuesto previsto en el párrafo anterior:
                        </div>
                        <div style="display: flex; margin-bottom: 5px; margin-left: 50px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 25px;">a)</span>
                            <div>Dura más de veinticuatro horas.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; margin-left: 50px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 25px;">b)</span>
                            <div>Se emplea crueldad contra el rehén.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; margin-left: 50px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 25px;">c)</span>
                            <div>El agraviado ejerce función pública o privada o es representante diplomático.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; margin-left: 50px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 25px;">d)</span>
                            <div>El rehén adolece de enfermedad grave.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; margin-left: 50px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 25px;">e)</span>
                            <div>Es cometido por dos o más personas.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 10px; margin-left: 50px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 25px;">f)</span>
                            <div>Se causa lesiones leves a la víctima.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 10px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 50px;">200.8.</span>
                            <div>La pena prevista en el párrafo anterior se impone al agente que, para perpetrar cualquiera de los supuestos extorsivos, usa armas de fuego o artefactos explosivos, o cuando el agente siendo miembro policial en actividad o retiro actúa como jefe o miembro de una organización dedicada a la perpetración de cualquiera de los supuestos previstos en los párrafos anteriores.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 10px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 50px;">200.9.</span>
                            <div>La pena será de cadena perpetua cuando:</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; margin-left: 50px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 25px;">a)</span>
                            <div>El rehén es menor de edad o mayor de setenta años.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; margin-left: 50px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 25px;">b)</span>
                            <div>El rehén es persona con discapacidad y el agente se aprovecha de esta circunstancia.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; margin-left: 50px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 25px;">c)</span>
                            <div>Si la víctima resulta con lesiones graves o muere durante o como consecuencia de dicho acto.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; margin-left: 50px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 25px;">d)</span>
                            <div>El agente se vale de menores de edad.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 10px; margin-left: 50px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 25px;">e)</span>
                            <div>La comisión del hecho punible es de carácter transnacional, de acuerdo al numeral 2 del artículo 3 de la Convención de las Naciones Unidas Contra la Delincuencia Organizada Transnacional – Convención de Palermo.</div>
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "200-A",
                titulo: "Exigencia o requerimiento extorsivo",
                texto: `
                        <div style="display: flex; margin-bottom: 10px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 75px;">200-A.1.</span>
                            <div>El que, directa o indirectamente, sin derecho, exige o requiere con violencia, o amenaza explícita o implícita, a una persona o a una institución pública o privada, para sí o para un tercero una ventaja económica indebida u otra ventaja de cualquier índole, es reprimido con pena privativa de libertad no menor de nueve (09) ni mayor de doce (12) años.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 10px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 75px;">200-A.2.</span>
                            <div>La pena privativa de libertad es no menor de doce (12) ni mayor de quince (15) años, cuando ocurra alguno de los siguientes supuestos:</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; margin-left: 75px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 25px;">1.</span>
                            <div>El agente invoque pertenencia o vinculación a organizaciones criminales, bandas criminales o grupos armados;</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; margin-left: 75px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 25px;">2.</span>
                            <div>Se utilice información personal, laboral o empresarial de la víctima o de su entorno familiar;</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; margin-left: 75px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 25px;">3.</span>
                            <div>Se utilice objetos perturbadores de peligrosidad, entregados, exhibidos, difundidos directa o indirectamente por cualquier medio a la víctima;</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; margin-left: 75px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 25px;">4.</span>
                            <div>La víctima sea funcionario o servidor público por razón de su cargo;</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; margin-left: 75px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 25px;">5.</span>
                            <div>El agente utilice a menores de edad para la comisión del delito o cualquier otra persona inimputable;</div>
                        </div>
                        <div style="display: flex; margin-bottom: 10px; margin-left: 75px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 25px;">6.</span>
                            <div>Se cometa utilizando artefactos explosivos, incendiarios o armas.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 10px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 75px;">200-A.3.</span>
                            <div>Si como consecuencia de la exigencia o requerimiento extorsivo se obtiene la ventaja o se produce el desplazamiento patrimonial, se aplica el artículo 200 del Código Penal.</div>
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "201",
                titulo: "Chantaje",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            El que, haciendo saber a otro que se dispone a publicar, denunciar o revelar un hecho o conducta cuya divulgación puede perjudicarlo personalmente o a un tercero con quien esté estrechamente vinculado, trata de determinarlo o lo determina a comprar su silencio, será reprimido con pena privativa de libertad no menor de tres ni mayor de seis años y con ciento ochenta a trescientos sesenticinco días-multa.
                        </div>`
            }
        ]
    },
    {
        titulo: ``,
        capitulo: `
                <div style="text-align: center; margin-top: 30px;">
                    <div style="margin-bottom: 15px;">CAPÍTULO VII</div>
                    <div>EXTORSIÓN</div>
                </div>`,
        articulos: [
            {
                tipo: "Artículo",
                numero: "200",
                titulo: "Extorsión",
                texto: `
                        <div style="display: flex; margin-bottom: 10px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 50px;">200.1.</span>
                            <div>El que mediante violencia o amenaza obliga a una persona o a una institución pública o privada a otorgar al agente o a un tercero una ventaja económica indebida u otra ventaja de cualquier otra índole será reprimido con pena privativa de libertad no menor de diez ni mayor de quince años.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 10px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 50px;">200.2.</span>
                            <div>La misma pena se aplicará a quien, por sí mismo o por terceros, induce u obliga mediante amenaza, intimidación, engaño, ardid o violencia a aceptar dinero o bienes que simulan un contrato de mutuo o cualquier otro, con el fin de obtener una ventaja indebida.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 10px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 50px;">200.3.</span>
                            <div>La pena establecida en el párrafo 200.1 se aplicará al que, con la finalidad de contribuir a la comisión del delito de extorsión, suministra información que haya conocido por razón o con ocasión de sus funciones, cargo u oficio o proporciona deliberadamente los medios para la perpetración del delito.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 10px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 50px;">200.4.</span>
                            <div>El que, mediante violencia o amenaza, toma locales, obstaculiza vías de comunicación o impide el libre tránsito de la ciudadanía o perturba el normal funcionamiento de los servicios públicos o la ejecución de obras legalmente autorizadas, con el objeto de obtener de las autoridades cualquier beneficio o ventaja económica indebida u otra ventaja de cualquier otra índole, será sancionado con pena privativa de libertad no menor de cinco ni mayor de diez años.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 10px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 50px;">200.5.</span>
                            <div>El funcionario público con poder de decisión o el que desempeña cargo de confianza o de dirección que, contraviniendo lo establecido en el artículo 42 de la Constitución Política del Perú, participe en una huelga con el objeto de obtener para sí o para terceros cualquier beneficio o ventaja económica indebida u otra ventaja de cualquier otra índole, será sancionado con inhabilitación conforme a los numerales 1 y 2 del artículo 36 del Código Penal.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 10px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 50px;">200.6.</span>
                            <div>La pena será no menor de quince ni mayor de veinticinco años e inhabilitación conforme a los numerales 4 y 6 del artículo 36, si la violencia o amenaza es cometida:</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; margin-left: 50px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 25px;">a)</span>
                            <div>A mano armada, o utilizando artefactos explosivos o incendiarios.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; margin-left: 50px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 25px;">b)</span>
                            <div>Participando dos o más personas; o,</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; margin-left: 50px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 25px;">c)</span>
                            <div>Contra el propietario, responsable o contratista de la ejecución de una obra de construcción civil pública o privada, o de cualquier modo, impidiendo, perturbando, atentando o afectando la ejecución de la misma.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; margin-left: 50px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 25px;">d)</span>
                            <div>Aprovechando su condición de integrante de un sindicato de construcción civil.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; margin-left: 50px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 25px;">e)</span>
                            <div>Simulando ser trabajador de construcción civil.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; margin-left: 50px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 25px;">f)</span>
                            <div>Mediante el empleo de imágenes del entorno familiar, empresarial, laboral o social, u objetos perturbadores de peligrosidad, entregados, exhibidos, difundidos directa o indirectamente por cualquier medio a la víctima.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; margin-left: 50px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 25px;">g)</span>
                            <div>Contra la persona que realiza cualquier tipo de actividad comercial o empresarial, o en abuso de la condición económica de la víctima.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 10px; margin-left: 50px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 25px;">h)</span>
                            <div>Contra instituciones educativas, universidades, complejos habitacionales o condominios.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 10px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 50px;">200.7.</span>
                            <div>Si el agente con la finalidad de obtener una ventaja económica indebida o de cualquier otra índole, mantiene en rehén a una persona, la pena será no menor de veinte ni mayor de treinta años.</div>
                        </div>
                        <div style="margin-bottom: 10px; margin-left: 50px; text-align: justify; line-height: 1.5;">
                            La pena será privativa de libertad no menor de treinta años, cuando en el supuesto previsto en el párrafo anterior:
                        </div>
                        <div style="display: flex; margin-bottom: 5px; margin-left: 50px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 25px;">a)</span>
                            <div>Dura más de veinticuatro horas.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; margin-left: 50px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 25px;">b)</span>
                            <div>Se emplea crueldad contra el rehén.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; margin-left: 50px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 25px;">c)</span>
                            <div>El agraviado ejerce función pública o privada o es representante diplomático.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; margin-left: 50px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 25px;">d)</span>
                            <div>El rehén adolece de enfermedad grave.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; margin-left: 50px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 25px;">e)</span>
                            <div>Es cometido por dos o más personas.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 10px; margin-left: 50px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 25px;">f)</span>
                            <div>Se causa lesiones leves a la víctima.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 10px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 50px;">200.8.</span>
                            <div>La pena prevista en el párrafo anterior se impone al agente que, para perpetrar cualquiera de los supuestos extorsivos, usa armas de fuego o artefactos explosivos, o cuando el agente siendo miembro policial en actividad o retiro actúa como jefe o miembro de una organización dedicada a la perpetración de cualquiera de los supuestos previstos en los párrafos anteriores.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 10px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 50px;">200.9.</span>
                            <div>La pena será de cadena perpetua cuando:</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; margin-left: 50px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 25px;">a)</span>
                            <div>El rehén es menor de edad o mayor de setenta años.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; margin-left: 50px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 25px;">b)</span>
                            <div>El rehén es persona con discapacidad y el agente se aprovecha de esta circunstancia.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; margin-left: 50px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 25px;">c)</span>
                            <div>Si la víctima resulta con lesiones graves o muere durante o como consecuencia de dicho acto.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; margin-left: 50px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 25px;">d)</span>
                            <div>El agente se vale de menores de edad.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 10px; margin-left: 50px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 25px;">e)</span>
                            <div>La comisión del hecho punible es de carácter transnacional, de acuerdo al numeral 2 del artículo 3 de la Convención de las Naciones Unidas Contra la Delincuencia Organizada Transnacional – Convención de Palermo.</div>
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "200-A",
                titulo: "Exigencia o requerimiento extorsivo",
                texto: `
                        <div style="display: flex; margin-bottom: 10px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 75px;">200-A.1.</span>
                            <div>El que, directa o indirectamente, sin derecho, exige o requiere con violencia, o amenaza explícita o implícita, a una persona o a una institución pública o privada, para sí o para un tercero una ventaja económica indebida u otra ventaja de cualquier índole, es reprimido con pena privativa de libertad no menor de nueve (09) ni mayor de doce (12) años.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 10px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 75px;">200-A.2.</span>
                            <div>La pena privativa de libertad es no menor de doce (12) ni mayor de quince (15) años, cuando ocurra alguno de los siguientes supuestos:</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; margin-left: 75px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 25px;">1.</span>
                            <div>El agente invoque pertenencia o vinculación a organizaciones criminales, bandas criminales o grupos armados;</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; margin-left: 75px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 25px;">2.</span>
                            <div>Se utilice información personal, laboral o empresarial de la víctima o de su entorno familiar;</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; margin-left: 75px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 25px;">3.</span>
                            <div>Se utilice objetos perturbadores de peligrosidad, entregados, exhibidos, difundidos directa o indirectamente por cualquier medio a la víctima;</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; margin-left: 75px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 25px;">4.</span>
                            <div>La víctima sea funcionario o servidor público por razón de su cargo;</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; margin-left: 75px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 25px;">5.</span>
                            <div>El agente utilice a menores de edad para la comisión del delito o cualquier otra persona inimputable;</div>
                        </div>
                        <div style="display: flex; margin-bottom: 10px; margin-left: 75px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 25px;">6.</span>
                            <div>Se cometa utilizando artefactos explosivos, incendiarios o armas.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 10px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 75px;">200-A.3.</span>
                            <div>Si como consecuencia de la exigencia o requerimiento extorsivo se obtiene la ventaja o se produce el desplazamiento patrimonial, se aplica el artículo 200 del Código Penal.</div>
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "201",
                titulo: "Chantaje",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            El que, haciendo saber a otro que se dispone a publicar, denunciar o revelar un hecho o conducta cuya divulgación puede perjudicarlo personalmente o a un tercero con quien esté estrechamente vinculado, trata de determinarlo o lo determina a comprar su silencio, será reprimido con pena privativa de libertad no menor de tres ni mayor de seis años y con ciento ochenta a trescientos sesenticinco días-multa.
                        </div>`
            }
        ]
    },
    {
        titulo: ``,
        capitulo: `
                <div style="text-align: center; margin-top: 30px;">
                    <div style="margin-bottom: 15px;">CAPÍTULO VIII</div>
                    <div>USURPACIÓN</div>
                </div>`,
        articulos: [
            {
                tipo: "Artículo",
                numero: "202",
                titulo: "Usurpación",
                texto: `
                        <div style="margin-bottom: 10px; text-align: justify; line-height: 1.5;">
                            Será reprimido con pena privativa de libertad no menor de dos ni mayor de cinco años:
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">1.</span>
                            <div>El que, para apropiarse de todo o en parte de un inmueble, destruye o altera los linderos del mismo.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">2.</span>
                            <div>El que, con violencia, amenaza, engaño o abuso de confianza, despoja a otro, total o parcialmente, de la posesión o tenencia de un inmueble o del ejercicio de un derecho real.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">3.</span>
                            <div>El que, con violencia o amenaza, turba la posesión de un inmueble.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 15px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">4.</span>
                            <div>El que, ilegítimamente, ingresa a un inmueble, mediante actos ocultos, en ausencia del poseedor o con precauciones para asegurarse el desconocimiento de quienes tengan derecho a oponerse.</div>
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            La violencia a la que se hace referencia en los numerales 2 y 3 se ejerce tanto sobre las personas como sobre los bienes.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "203",
                titulo: "Desvío ilegal del curso de las aguas",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            El que, con el fin de obtener para sí o para otro un provecho ilícito con perjuicio de tercero, desvía el curso de las aguas públicas o privadas, impide que corran por su cauce o las utiliza en una cantidad mayor de la debida, será reprimido con pena privativa de libertad no menor de uno ni mayor de tres años.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "204",
                titulo: "Formas agravadas de usurpación",
                texto: `
                        <div style="margin-bottom: 10px; text-align: justify; line-height: 1.5;">
                            La pena privativa de libertad será no menor de cinco ni mayor de doce años e inhabilitación según corresponda, cuando la usurpación se comete:
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">1.</span>
                            <div>Usando armas de fuego, explosivos o cualquier otro instrumento o sustancia peligrosos.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">2.</span>
                            <div>Con la intervención de dos o más personas.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">3.</span>
                            <div>Sobre inmueble reservado para fines habitacionales.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">4.</span>
                            <div>Sobre bienes del Estado o de comunidades campesinas o nativas, o sobre bienes destinados a servicios públicos o inmuebles, que integran el patrimonio cultural de la nación declarados por la entidad competente, o sobre las áreas naturales protegidas por el Estado.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">5.</span>
                            <div>Afectando la libre circulación en vías de comunicación.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">6.</span>
                            <div>Colocando hitos, cercos perimétricos, cercos vivos, paneles o anuncios, demarcaciones para lotizado, instalación de esteras, plásticos u otros materiales.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">7.</span>
                            <div>Abusando de su condición o cargo de funcionario, servidor público, de la función notarial o arbitral.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">8.</span>
                            <div>Sobre derechos de vía o localización de área otorgados para proyectos de inversión.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">9.</span>
                            <div>Utilizando documentos privados falsos o adulterados.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">10.</span>
                            <div>En su condición de representante de una asociación u otro tipo de organización, representante de persona jurídica o cualquier persona natural, que entregue o acredite indebidamente documentos o valide actos de posesión de terrenos del Estado o de particulares.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">11.</span>
                            <div>Sobre inmuebles en zonas declaradas de riesgo no mitigable.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 15px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">12.</span>
                            <div>Sobre inmueble, zona o área declarada intangible, inalienable o imprescriptible alrededor del perímetro de los establecimientos penitenciarios.</div>
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            Será reprimido con la misma pena el que organice, financie, facilite, fomente, dirija, provoque o promueva la realización de usurpaciones de inmuebles de propiedad pública o privada.
                        </div>`
            }
        ]
    },
    {
        titulo: ``,
        capitulo: `
                <div style="text-align: center; margin-top: 30px;">
                    <div style="margin-bottom: 15px;">CAPÍTULO IX</div>
                    <div>DAÑOS</div>
                </div>`,
        articulos: [
            {
                tipo: "Artículo",
                numero: "205",
                titulo: "Daño simple",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            El que daña, destruye o inutiliza un bien, mueble o inmueble, total o parcialmente ajeno, será reprimido con pena privativa de libertad no mayor de tres años y con treinta a sesenta días-multa.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "206",
                titulo: "Formas agravadas",
                texto: `
                        <div style="margin-bottom: 10px; text-align: justify; line-height: 1.5;">
                            La pena para el delito previsto en el artículo 205 será privativa de libertad no menor de uno ni mayor de seis años cuando:
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">1.</span>
                            <div>Es ejecutado en bienes de valor científico, artístico, histórico o cultural, siempre que por el lugar en que se encuentren estén librados a la confianza pública o destinados al servicio, a la utilidad o a la reverencia de un número indeterminado de personas.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">2.</span>
                            <div>Recae sobre medios o vías de comunicación, diques o canales o instalaciones destinadas al servicio público.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">3.</span>
                            <div>La acción es ejecutada empleando violencia o amenaza contra las personas.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">4.</span>
                            <div>Causa destrucción de plantaciones o muerte de animales.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">5.</span>
                            <div>Es efectuado en bienes cuya entrega haya sido ordenada judicialmente.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">6.</span>
                            <div>Recae sobre infraestructura o instalaciones de transporte de uso público, de sus equipos o elementos de seguridad, o de prestación de servicios públicos de saneamiento, electricidad o telecomunicaciones.</div>
                        </div>
                        <div style="display: flex; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">7.</span>
                            <div>Si la conducta recae sobre la infraestructura o instalaciones públicas o privadas para la exploración, explotación, procesamiento, refinación, almacenamiento, transporte, distribución, comercialización o abastecimiento de gas, de hidrocarburos o de sus productos derivados conforme a la legislación de la materia.</div>
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "206-A",
                titulo: "Abandono y actos de crueldad contra animales domésticos y silvestres",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            El que comete actos de crueldad contra un animal doméstico o un animal silvestre, o los abandona, es reprimido con pena privativa de libertad no mayor de tres años, con cien a ciento ochenta días-multa y con inhabilitación de conformidad con el numeral 13 del artículo 36.
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            Si como consecuencia de estos actos de crueldad o del abandono el animal doméstico o silvestre muere, la pena es privativa de libertad no menor de tres ni mayor de cinco años, con ciento cincuenta a trescientos sesenta días-multa y con inhabilitación de conformidad con el numeral 13 del artículo 36.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "207",
                titulo: "Producción o venta de alimentos en mal estado para los animales",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            El que produce o vende alimentos, preservantes, aditivos y mezclas para consumo animal, falsificados, corrompidos o dañados, cuyo consumo genere peligro para la vida, la salud o la integridad física de los animales, será reprimido con pena privativa de libertad no mayor de un año y con treinta a cien días-multa.
                        </div>`
            }
        ]
    },
    {
        titulo: ``,
        capitulo: `
                <div style="text-align: center; margin-top: 30px;">
                    <div style="margin-bottom: 5px;">CAPÍTULO X</div>
                    <div>DELITOS INFORMÁTICOS</div>
                </div>`,
        articulos: [
            {
                tipo: "Artículo",
                numero: "207-A",
                titulo: "Derogado",
                texto: `
                        <div style="text-align: justify; line-height: 1.5; color: #777; font-style: italic;">
                            Derogado conforme a la Ley 30096 del 22/10/2013.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "207-B",
                titulo: "Derogado",
                texto: `
                        <div style="text-align: justify; line-height: 1.5; color: #777; font-style: italic;">
                            Derogado conforme a la Ley 30096 del 22/10/2013.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "207-C",
                titulo: "Derogado",
                texto: `
                        <div style="text-align: justify; line-height: 1.5; color: #777; font-style: italic;">
                            Derogado conforme a la Ley 30096 del 22/10/2013.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "207-D",
                titulo: "Derogado",
                texto: `
                        <div style="text-align: justify; line-height: 1.5; color: #777; font-style: italic;">
                            Derogado conforme a la Ley 30096 del 22/10/2013.
                        </div>`
            }
        ]
    },
    {
        titulo: ``,
        capitulo: `
                <div style="text-align: center; margin-top: 30px;">
                    <div style="margin-bottom: 15px;">CAPÍTULO XI</div>
                    <div>DISPOSICIÓN COMÚN</div>
                </div>`,
        articulos: [
            {
                tipo: "Artículo",
                numero: "208",
                titulo: "Excusa absolutoria. Exención de Pena",
                texto: `
                        <div style="margin-bottom: 10px; text-align: justify; line-height: 1.5;">
                            No son reprimibles, sin perjuicio de la reparación civil, los hurtos, apropiaciones, defraudaciones o daños que se causen:
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">1.</span>
                            <div>Los cónyuges, concubinos, ascendientes, descendientes y afines en línea recta.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">2.</span>
                            <div>El consorte viudo, respecto de los bienes de su difunto cónyuge, mientras no hayan pasado a poder de tercero.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 15px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">3.</span>
                            <div>Los hermanos y cuñados, si viviesen juntos.</div>
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            La excusa absolutoria no se aplica cuando el delito se comete en contextos de violencia contra las mujeres o integrantes del grupo familiar.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "208-A",
                titulo: "Formas atenuadas",
                texto: `
                        <div style="margin-bottom: 10px; text-align: justify; line-height: 1.5;">
                            En cualquiera de los delitos contra el patrimonio, a excepción de los previstos en los artículos 189 tercer párrafo, 200 noveno párrafo, y 204 numeral 10 del primer párrafo, siempre y cuando el agente no sea reincidente o habitual:
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">1.</span>
                            <div>Si el valor del bien no sobrepasa el cinco por ciento de una unidad impositiva tributaria (UIT), o la violencia o amenaza infringida por el agente resultan mínimas o insignificantes, o para la ejecución del delito se emplea armas simuladas o inservibles, se disminuye a la pena concreta, por única vez, un sexto de la pena mínima establecida para el delito.</div>
                        </div>
                        <div style="display: flex; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">2.</span>
                            <div>Si el autor o partícipe hubiere reparado espontáneamente el daño ocasionado o haya devuelto el bien, en igual estado de conservación, al agraviado, se disminuye a la pena concreta, por única vez, un séptimo de la pena mínima establecida para el delito.</div>
                        </div>`
            }
        ]
    },
    {
        titulo: `
                <div style="text-align: center; margin-top: 30px;">
                    <div style="margin-bottom: 15px;">TÍTULO VI</div>
                    <div>DELITOS CONTRA LA CONFIANZA Y LA BUENA FE EN LOS NEGOCIOS</div>
                </div>`,
        capitulo: `
                <div style="text-align: center; margin-top: 30px;">
                    <div style="margin-bottom: 15px;">CAPÍTULO I</div>
                    <div>ATENTADOS CONTRA EL SISTEMA CREDITICIO</div>
                </div>`,
        articulos: [
            {
                tipo: "Artículo",
                numero: "209",
                titulo: "Actos Ilícitos",
                texto: `
                        <div style="margin-bottom: 10px; text-align: justify; line-height: 1.5;">
                            Será reprimido con pena privativa de libertad no menor de tres ni mayor de seis años e inhabilitación de tres a cinco años conforme al Artículo 36 incisos 2) y 4), el deudor, la persona que actúa en su nombre, el administrador o el liquidador, que en un procedimiento de insolvencia, procedimiento simplificado, concurso preventivo, procedimiento transitorio u otro procedimiento de reprogramación de obligaciones cualesquiera fuera su denominación, realizara, en perjuicio de los acreedores, alguna de las siguientes conductas:
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">1.</span>
                            <div>Ocultamiento de bienes;</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">2.</span>
                            <div>Simulación, adquisición o realización de deudas, enajenaciones, gastos o pérdidas; y,</div>
                        </div>
                        <div style="display: flex; margin-bottom: 15px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">3.</span>
                            <div>Realización de actos de disposición patrimonial o generador de obligaciones, destinados a pagar a uno o varios acreedores, preferentes o no, posponiendo el pago del resto de acreedores. Si ha existido connivencia con el acreedor beneficiado, éste o la persona que haya actuado en su nombre, será reprimido con la misma pena.</div>
                        </div>
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            Si la Junta de Acreedores hubiere aprobado la reprogramación de obligaciones en un procedimiento de insolvencia, procedimiento simplificado, concurso preventivo, procedimiento transitorio u otro procedimiento de reprogramación de obligaciones cualesquiera fuera su denominación, según el caso o, el convenio de liquidación o convenio concursal, las conductas tipificadas en el inciso 3) sólo serán sancionadas si contravienen dicha reprogramación o convenio. Asimismo, si fuera el caos de una liquidación declarada por la Comisión, conforme a lo señalado en la ley de la materia, las conductas tipificadas en el inciso 3) sólo serán sancionadas si contravienen el desarrollo de dicha liquidación.
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            Si el agente realiza alguna de las conductas descritas en los incisos 1), 2) ó 3) cuando se encontrare suspendida la exigibilidad de obligaciones del deudor, como consecuencia de un procedimiento de insolvencia, procedimiento simplificado, concurso preventivo, procedimiento transitorio u otro procedimiento de reprogramación de obligaciones cualesquiera fuera su denominación, será reprimido con pena privativa de libertad no menor de cuatro ni mayor de ocho años e inhabilitación de cuatro a cinco años, conforme al Artículo 36 incisos 2) y 4).
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "210",
                titulo: "Comisión de delito por culpa del agente",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            Si el agente realiza por culpa alguna de las conductas descritas en el Artículo 209, los límites máximo y mínimo de las penas privativas de libertad e inhabilitación se reducirán en una mitad.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "211",
                titulo: "Suspensión ilícita de la exigibilidad de las obligaciones del deudor",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            El que en un procedimiento de insolvencia, procedimiento simplificado, concurso preventivo, procedimiento transitorio u otro procedimiento de reprogramación de obligaciones cualesquiera fuera su denominación, lograre la suspensión de la exigibilidad de las obligaciones del deudor, mediante el uso de información, documentación o contabilidad falsas o la simulación de obligaciones o pasivos, será reprimido con pena privativa de libertad no menor de cuatro ni mayor de seis años e inhabilitación de cuatro a cinco años, conforme al Artículo 36 incisos 2) y 4).
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "212",
                titulo: "Beneficios por colaboración",
                texto: `
                        <div style="margin-bottom: 10px; text-align: justify; line-height: 1.5;">
                            Podrá reducirse la pena hasta por debajo del mínimo legal en el caso de autores y eximirse de pena al partícipe que, encontrándose incurso en una investigación a cargo del Ministerio Público o en el desarrollo de un proceso penal por cualquiera de los delitos sancionados en este Capítulo, proporcione información eficaz que permita:
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">1.</span>
                            <div>Evitar la continuidad o consumación del delito.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">2.</span>
                            <div>Conocer las circunstancias en las que se cometió el delito e identificar a los autores y partícipes.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 15px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">3.</span>
                            <div>Conocer el paradero o destino de los bienes objeto material del delito y su restitución al patrimonio del deudor. En tales casos los bienes serán destinados al pago de las obligaciones del deudor según la ley de la materia.</div>
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            La pena del autor se reducirá en dos tercios respecto del máximo legal y el partícipe quedará exento de pena si, durante la investigación a cargo del Ministerio Público o en el desarrollo del proceso penal en el que estuvieran incursos, restituye voluntariamente los bienes o entrega una suma equivalente a su valor, los mismos que serán destinados al pago de sus obligaciones según la ley de la materia. La reducción o exención de pena sólo se aplicará a quien o quienes realicen la restitución o entrega del valor señalado.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "213",
                titulo: "Ejercicio de la acción penal e intervención del INDECOPI",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            En los delitos previstos en este Capitulo sólo se procederá por acción privada ante el Ministerio Público. El Instituto Nacional de Defensa de la Competencia y Protección de la Propiedad Intelectual (INDECOPI), a través de sus órganos correspondientes, podrá denunciar el hecho en defecto del ejercicio de la acción privada y en todo caso podrá intervenir como parte interesada en el proceso penal que se instaure.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "213-A",
                titulo: "Manejo ilegal de patrimonio de propósito exclusivo",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            El factor fiduciario o quien ejerza el dominio fiduciario sobre un patrimonio fideicometido, o el director, gerente o quien ejerza la administración de una sociedad de propósito especial que, en beneficio propio o de terceros, efectúe actos de enajenación, gravamen, adquisición u otros en contravención del fin para el que fue constituido el patrimonio de propósito exclusivo, será reprimido con pena privativa de libertad no menor de dos (2), ni mayor de cuatro (4) años e inhabilitación de uno a dos (2) años conforme al Artículo 36, incisos 2) y 4).
                        </div>`
            }
        ]
    },
    {
        titulo: ``,
        capitulo: `
                <div style="text-align: center; margin-top: 30px;">
                    <div style="margin-bottom: 15px;">CAPÍTULO II</div>
                    <div>USURA</div>
                </div>`,
        articulos: [
            {
                tipo: "Artículo",
                numero: "214",
                titulo: "Usura",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            El que, con el fin de obtener una ventaja patrimonial, para sí o para otro, en la concesión de un crédito o en su otorgamiento, renovación, descuento o prórroga del plazo de pago, obliga o hace prometer pagar un interés superior al límite fijado por la ley, será reprimido con pena privativa de libertad no menor de uno ni mayor de tres años y con veinte a treinta días-multa.
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            Si el agraviado es persona incapaz o se halla en estado de necesidad, la pena privativa de libertad será no menor de dos ni mayor de cuatro años.
                        </div>`
            }
        ]
    },
    {
        titulo: ``,
        capitulo: `
                <div style="text-align: center; margin-top: 30px;">
                    <div style="margin-bottom: 15px;">CAPÍTULO III</div>
                    <div>LIBRAMIENTO Y COBRO INDEBIDO</div>
                </div>`,
        articulos: [
            {
                tipo: "Artículo",
                numero: "215",
                titulo: "Modalidades de libramientos indebidos",
                texto: `
                        <div style="margin-bottom: 10px; text-align: justify; line-height: 1.5;">
                            Será reprimido con pena privativa de la libertad no menor de uno ni mayor de cinco años, el que gire, transfiera o cobre un Cheque, en los siguientes casos:
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">1)</span>
                            <div>Cuando gire sin tener provisión de fondos suficientes o autorización para sobregirar la cuenta corriente;</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">2)</span>
                            <div>Cuando frustre maliciosamente por cualquier medio su pago;</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">3)</span>
                            <div>Cuando gire a sabiendas que al tiempo de su presentación no podrá ser pagado legalmente;</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">4)</span>
                            <div>Cuando revoque el cheque durante su plazo legal de presentación a cobro, por causa falsa;</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">5)</span>
                            <div>Cuando utilice cualquier medio para suplantar al beneficiario o al endosatario, sea en su identidad o firmas; o modifique sus cláusulas, líneas de cruzamiento, o cualquier otro requisito formal del Cheque;</div>
                        </div>
                        <div style="display: flex; margin-bottom: 15px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">6)</span>
                            <div>Cuando lo endose a sabiendas que no tiene provisión de fondos.</div>
                        </div>
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            En los casos de los incisos 1) y 6) se requiere del protesto o de la constancia expresa puesta por el banco girado en el mismo documento, señalando el motivo de la falta de pago.
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            Con excepción del incisos 4) y 5), no procederá la acción penal, si el agente abona el monto total del Cheque dentro del tercer día hábil de la fecha de requerimiento escrito y fehaciente, sea en forma directa, notarial, judicial o por cualquier otro medio con entrega fehaciente que se curse al girador.
                        </div>`
            }
        ]
    },
    {
        titulo: `
                <div style="text-align: center; margin-top: 30px;">
                    <div style="margin-bottom: 15px;">TÍTULO VII</div>
                    <div>DELITOS CONTRA LOS DERECHOS INTELECTUALES</div>
                </div>`,
        capitulo: `
                <div style="text-align: center; margin-top: 30px;">
                    <div style="margin-bottom: 15px;">CAPÍTULO I</div>
                    <div>DELITOS CONTRA LOS DERECHOS DE AUTOR Y CONEXOS</div>
                </div>`,
        articulos: [
            {
                tipo: "Artículo",
                numero: "216",
                titulo: "Copia o reproducción no autorizada",
                texto: `
                        <div style="margin-bottom: 10px; text-align: justify; line-height: 1.5;">
                            Será reprimido con pena privativa de la libertad no menor de dos ni mayor de cuatro años y de diez a sesenta días-multa, a quien estando autorizado para publicar una obra, lo hiciere en una de las formas siguientes:
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 30px;">a.</span>
                            <div>Sin mencionar en los ejemplares el nombre del autor, traductor, adaptador, compilador o arreglador.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 30px;">b.</span>
                            <div>Estampe el nombre con adiciones o supresiones que afecte la reputación del autor como tal, o en su caso, del traductor, adaptador, compilador o arreglador.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 30px;">c.</span>
                            <div>Publique la obra con abreviaturas, adiciones, supresiones, o cualquier otra modificación, sin el consentimiento del titular del derecho.</div>
                        </div>
                        <div style="display: flex; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 30px;">d.</span>
                            <div>Publique separadamente varias obras, cuando la autorización se haya conferido para publicarlas en conjunto; o las publique en conjunto, cuando solamente se le haya autorizado la publicación de ellas en forma separada.</div>
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "217",
                titulo: "Reproducción, difusión, distribución y circulación de la obra sin la autorización del autor",
                texto: `
                        <div style="margin-bottom: 10px; text-align: justify; line-height: 1.5;">
                            Será reprimido con pena privativa de libertad no menor de dos ni mayor de seis años y con treinta a noventa días-multa, el que, con respecto a una obra, una interpretación o ejecución artística, un fonograma o una emisión o transmisión de radiodifusión, o una grabación audiovisual o una imagen fotográfica, de autoría humana, expresada en cualquier forma, realiza alguno de los siguientes actos sin la autorización previa y escrita del autor o titular de los derechos:
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 30px;">a.</span>
                            <div>La modifique total o parcialmente.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 30px;">b.</span>
                            <div>La distribuya, mediante venta, alquiler o préstamo público.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 30px;">c.</span>
                            <div>La comunique o difunda públicamente, transmita o retransmita por cualquiera de los medios o procedimientos reservados al titular del respectivo derecho.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 30px;">d.</span>
                            <div>Reproduzca total o parcialmente una película, por cualquier medio o procedimiento, dentro de las salas de cine o análogos.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 15px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 30px;">e.</span>
                            <div>La reproduzca, distribuya o comunique, en mayor número que el autorizado por escrito.</div>
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            La pena será no menor de cuatro años ni mayor de ocho y con sesenta a ciento veinte días multa, cuando el agente la reproduzca total o parcialmente, por cualquier medio o procedimiento y si la distribución se realiza mediante venta, alquiler o préstamo al público u otra forma de transferencia de la posesión del soporte que contiene la obra o producción que supere las dos (2) Unidades Impositivas Tributarias, en forma fraccionada, en un solo acto o en diferentes actos de inferior importe cada uno.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "218",
                titulo: "Formas agravadas",
                texto: `
                        <div style="margin-bottom: 10px; text-align: justify; line-height: 1.5;">
                            La pena será privativa de libertad no menor de cuatro ni mayor de ocho años y con noventa a ciento ochenta días multa cuando:
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 30px;">a.</span>
                            <div>Se dé a conocer al público una obra de autoría humana, inédita o no divulgada, que haya recibido en confianza del titular del derecho de autor o de alguien en su nombre, sin el consentimiento del titular.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 30px;">b.</span>
                            <div>La reproducción, distribución o comunicación pública se realiza con fines comerciales u otro tipo de ventaja económica, o alterando o suprimiendo el nombre o seudónimo del autor, productor o titular de los derechos.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 30px;">c.</span>
                            <div>Conociendo el origen ilícito de la copia o reproducción, la distribuya al público, por cualquier medio, la almacene, oculte, introduzca en el país o la saque de éste.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 30px;">d.</span>
                            <div>Se fabrique, ensamble, importe, exporte, modifique, venda, alquile, ofrezca para la venta o alquiler, o ponga de cualquier otra manera en circulación dispositivos, sistemas tangibles o intangibles, esquemas o equipos capaces de soslayar otro dispositivo destinado a impedir o restringir la realización de copias de obras de autoría humana, o a menoscabar la calidad de las copias realizadas, o capaces de permitir o fomentar la recepción de un programa codificado, radiodifundido o comunicado en otra forma al público, por aquellos que no están autorizados para ello.</div>
                        </div>
                        <div style="display: flex; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 30px;">e.</span>
                            <div>Se inscriba en el Registro del Derecho de Autor la obra, interpretación, producción o emisión ajenas, o cualquier otro tipo de bienes intelectuales, como si fueran propios, o como de persona distinta del verdadero titular de los derechos.</div>
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "219",
                titulo: "Plagio",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            Será reprimido con pena privativa de libertad no menor de tres ni mayor de seis años y noventa a ciento ochenta días multa, el que, con respecto a una obra de autoría humana, la difunda como propia, en todo o en parte, copiándola o reproduciéndola textualmente, o tratando de disimular la copia mediante ciertas alteraciones, atribuyéndose o atribuyendo a otro, la autoría o titularidad ajena.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "220",
                titulo: "Formas agravadas",
                texto: `
                        <div style="margin-bottom: 10px; text-align: justify; line-height: 1.5;">
                            Será reprimido con pena privativa de libertad no menor de cuatro ni mayor de ocho años y noventa a trescientos sesenticinco días-multa:
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 30px;">a.</span>
                            <div>Quien se atribuya falsamente la calidad de titular originario o derivado, de cualquiera de los derechos protegidos en la legislación del derecho de autor y derechos conexos y, con esa indebida atribución, obtenga que la autoridad competente suspenda el acto de comunicación, reproducción o distribución de la obra, interpretación, producción, emisión o de cualquier otro de los bienes intelectuales protegidos.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 30px;">b.</span>
                            <div>Quien realice actividades propias de una entidad de gestión colectiva de derecho de autor o derechos conexos, sin contar con la autorización debida de la autoridad administrativa competente.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 30px;">c.</span>
                            <div>El que presente declaraciones falsas en cuanto certificaciones de ingresos; asistencia de público; repertorio utilizado; identificación de los autores; autorización supuestamente obtenida; número de ejemplares producidos, vendidos o distribuidos gratuitamente o toda otra adulteración de datos susceptible de causar perjuicio a cualquiera de lo titulares del derecho de autor o conexos.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 30px;">d.</span>
                            <div>Si el agente que comete el delito integra una organización destinada a perpetrar los ilícitos previstos en el presente capítulo.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 30px;">e.</span>
                            <div>Si el agente que comete cualquiera de los delitos previstos en el presente capítulo, posee la calidad de funcionario o servidor público.</div>
                        </div>
                        <div style="display: flex; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 30px;">f.</span>
                            <div>Si el agente obtiene una ventaja patrimonial derivada de la explotación de la obra objeto del comportamiento descrito en el artículo 219.</div>
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "220-A",
                titulo: "Elusión de medida tecnológica efectiva",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            El que, con fines de comercialización u otro tipo de ventaja económica, eluda sin autorización cualquier medida tecnológica efectiva que utilicen los productores de fonogramas, artistas, intérpretes o ejecutantes, así como los autores de cualquier obra protegida por derechos de propiedad intelectual, será reprimido con pena privativa de libertad no menor de dos ni mayor de cuatro años y de sesenta a ciento veinte días- multa.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "220-B",
                titulo: "Productos destinados a la elusión de medidas tecnológicas",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            El que, con fines de comercialización u otro tipo de ventaja económica, fabrique, importe, distribuya, ofrezca al público, proporcione o de cualquier manera comercialice dispositivos, productos o componentes destinados principalmente a eludir una medida tecnológica que utilicen los productores de fonogramas, artistas intérpretes o ejecutantes, así como los autores de cualquier obra protegida por derechos de propiedad intelectual, será reprimido con pena privativa de libertad no menor de dos ni mayor de cuatro años y de sesenta a ciento veinte días- multa.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "220-C",
                titulo: "Servicios destinados a la elusión de medidas tecnológicas",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            El que, con fines de comercialización u otro tipo de ventaja económica, brinde u ofrezca servicios al público destinados principalmente a eludir una medida tecnológica efectiva que utilicen los productores de fonogramas, artistas intérpretes o ejecutantes, así como los autores de cualquier obra protegida por derechos de propiedad intelectual, será reprimido con pena privativa de libertad no menor de dos ni mayor de cuatro y de sesenta a ciento veinte días – multa.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "220-D",
                titulo: "Delitos contra la información sobre gestión de derechos",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            El que, sin autorización y con fines de comercialización u otro tipo de ventaja económica, suprima o altere, por sí o por medio de otro, cualquier información sobre gestión de derechos, será reprimido con pena privativa de libertad no mayor de dos años y de diez a sesenta días-multa.
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            La misma pena será impuesta al que distribuya o importe para su distribución información sobre gestión de derechos, a sabiendas que esta ha sido suprimida o alterada sin autorización; o distribuya, importe para su distribución, transmita, comunique o ponga a disposición del público copias de las obras, interpretaciones o ejecuciones o fonogramas, a sabiendas que la información sobre gestión de derechos ha sido suprimida o alterada sin autorización.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "220-E",
                titulo: "Etiquetas, carátulas o empaques",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            El que fabrique, comercialice, distribuya, almacene, transporte, transfiera o de otra manera disponga con fines comerciales u otro tipo de ventaja económica etiquetas o carátulas no auténticas adheridas o diseñadas para ser adheridas a un fonograma, copia de un programa de ordenador, documentación o empaque de un programa de ordenador o a la copia de una obra cinematográfica o cualquier otra obra audiovisual, será reprimido con pena privativa de libertad no menor de tres años ni mayor de seis años y de y de sesenta a ciento veinte días multa.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "220-F",
                titulo: "Manuales, licencias u otra documentación, o empaques no auténticos relacionados a programas de ordenador",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            El que elabore, comercialice, distribuya, almacene, transporte, transfiera o de otra manera disponga con fines comerciales u otro tipo de ventaja económica manuales, licencias u otro tipo de documentación, o empaques no auténticos para un programa de ordenador, será reprimido con pena privativa de libertad no menor de cuatro años ni mayor de seis años y de sesenta a ciento veinte días multa.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "221",
                titulo: "Incautación preventiva y comiso definitivo",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            En los delitos previstos en este capítulo se procederá a la incautación preventiva de los ejemplares y materiales, de los aparatos o medios utilizados para la comisión del ilícito y, de ser el caso, de los activos y cualquier evidencia documental, relacionados al ilícito penal.
                        </div>
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            De ser necesario, el Fiscal pedirá autorización al Juez para leer la documentación que se halle en el lugar de la intervención, en ejecución de cuya autorización se incautará la documentación vinculada con el hecho materia de investigación.
                        </div>
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            Para la incautación no se requerirá identificar individualmente la totalidad de los materiales, siempre que se tomen las medidas necesarias para que durante el proceso judicial se identifiquen la totalidad de los mismos. En este acto participará el representante del Ministerio Público.
                        </div>
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            Asimismo, el Juez, a solicitud del Ministerio Público, ordenará el allanamiento o descerraje del local donde se estuviere cometiendo el ilícito penal.
                        </div>
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            En caso de emitirse sentencia condenatoria, los ejemplares, materiales ilícitos, aparatos y medios utilizados para la comisión del ilícito serán comisados y destruidos, salvo casos excepcionales debidamente calificados por la autoridad judicial.
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            En ningún caso procederá la devolución de los ejemplares ilícitos al encausado.
                        </div>`
            }
        ]
    },
    {
        titulo: ``,
        capitulo: `
                <div style="text-align: center; margin-top: 30px;">
                    <div style="margin-bottom: 15px;">CAPÍTULO II</div>
                    <div>DELITOS CONTRA LA PROPIEDAD INDUSTRIAL</div>
                </div>`,
        articulos: [
            {
                tipo: "Artículo",
                numero: "222",
                titulo: "Fabricación o uso no autorizado de patente",
                texto: `
                        <div style="margin-bottom: 10px; text-align: justify; line-height: 1.5;">
                            Será reprimido con pena privativa de libertad no menor de dos ni mayor de cinco años, con sesenta a trescientos sesenta y cinco días multa e inhabilitación conforme al Artículo 36 inciso 4) tomando en consideración la gravedad del delito y el valor de los perjuicios ocasionados, quien en violación de las normas y derechos de propiedad industrial, almacene, fabrique, utilice con fines comerciales, oferte, distribuya, venda, importe o exporte, en todo o en parte:
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 30px;">a.</span>
                            <div>Un producto amparado por una patente de invención o un producto fabricado mediante la utilización de un procedimiento amparado por una patente de invención obtenidos en el país;</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 30px;">b.</span>
                            <div>Un producto amparado por un modelo de utilidad obtenido en el país;</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 30px;">c.</span>
                            <div>Un producto amparado por un diseño industrial registrado en el país;</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 30px;">d.</span>
                            <div>Una obtención vegetal registrada en el país, así como su material de reproducción, propagación o multiplicación;</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 30px;">e.</span>
                            <div>Un esquema de trazado (tipografía) registrado en el país, un circuito semiconductor que incorpore dicho esquema de trazado (topografía) o un artículo que incorpore tal circuito semiconductor;</div>
                        </div>
                        <div style="display: flex; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 30px;">f.</span>
                            <div>Un producto o servicio que utilice una marca no registrada idéntica o similar a una marca registrada en el país.</div>
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "222-A",
                titulo: "Penalización de la clonación o adulteración de terminales de telecomunicaciones",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            Será reprimido con pena privativa de libertad no menor de cuatro ni mayor de seis años, con sesenta (60) a trescientos sesenta y cinco (365) días multa, el que altere, reemplace, duplique, clone, o de cualquier modo modifique un número de línea, o identificador de la tarjeta SIM, o identificador de la Identidad Internacional del Abonado Móvil o del IMEI o MAC lógico o físico o de cualquier otro dispositivo similar.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "222-B",
                titulo: "Posesión ilegítima de una SIM card u otro medio activado que esté asociado a una línea de servicio móvil",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            El que provea, comercialice o facilite la adquisición de una SIM card u otro medio activado ilegalmente que esté asociado a una línea de servicio móvil será reprimido con pena privativa de libertad no menor de cinco ni mayor de nueve años y con inhabilitación conforme al numeral 4 del artículo 36 del Código Penal.
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            Si el agente adquiere o posee el SIM card u otro medio activado ilegalmente que esté asociado a una línea de servicio móvil, será reprimido con pena privativa de libertad no menor de cuatro ni mayor de ocho años.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "222-C",
                titulo: "Comercialización de Equipos Terminales Móviles con IMEI lógico o físico alterado, reemplazado, duplicado",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            El que tenga bajo su disposición, en exhibición para su distribución, o para la venta o comercialización, equipos terminales móviles, número de línea, o de serie electrónico, o de serie mecánico, o de IMEI lógico o físico, alterado, reemplazado, duplicado o de cualquier modo modificados, será reprimido con pena privativa de libertad no menor de dos ni mayor de cuatro años, e inhabilitación conforme al numeral 4 del artículo 36 del Código Penal.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "222-D",
                titulo: "Posesión ilegítima de dispositivos para adulterar, reemplazar, duplicar o modificar IMEI",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            El que posea dispositivos, aparatos, herramientas, instrumentos o programas informáticos con la finalidad de ser utilizados en la adulteración, reemplazo, duplicación o modificación de IMEI lógico o físico de terminales móviles de comunicación, será reprimido con pena privativa de libertad no menor de cuatro años ni mayor de seis años e inhabilitación conforme al inciso 4 del artículo 36.
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            La misma pena se aplica al que, promueva, facilite o financie la obtención de los aparatos, herramientas, instrumentos o programas informáticos para la finalidad señalada en el primer párrafo.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "223",
                titulo: "Uso o venta no autorizada de diseño o modelo industrial",
                texto: `
                        <div style="margin-bottom: 10px; text-align: justify; line-height: 1.5;">
                            Serán reprimidos con pena privativa de la libertad no menor de dos ni mayor de cinco años, con sesenta a trescientos sesenta y cinco días-multa e inhabilitación conforme al Artículo 36 inciso 4) tomando en consideración la gravedad del delito y el valor de los perjuicios ocasionados, quienes en violación de las normas y derechos de propiedad industrial:
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 30px;">a.</span>
                            <div>Fabriquen, comercialicen, distribuyan o almacenen etiquetas, sellos o envases que contengan marcas registradas;</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 30px;">b.</span>
                            <div>Retiren o utilicen etiquetas, sellos o envases que contengan marcas originales para utilizarlos en productos de distinto origen; y</div>
                        </div>
                        <div style="display: flex; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 30px;">c.</span>
                            <div>Envasen y/o comercialicen productos empleando envases identificados con marcas cuya titularidad corresponde a terceros.</div>
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "224",
                titulo: "Incautación preventiva y comiso definitivo",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            En los delitos previstos en este capítulo se procederá a la incautación preventiva de los ejemplares y materiales, de los aparatos o medios utilizados para la comisión del ilícito y, de ser el caso, de los activos y cualquier evidencia documental, relacionados al ilícito penal.
                        </div>
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            De ser necesario, el Fiscal pedirá autorización al Juez para leer la documentación que se halle en el lugar de la intervención, en ejecución de cuya autorización se incautará la documentación vinculada con el hecho materia de investigación.
                        </div>
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            Para la incautación no se requerirá identificar individualmente la totalidad de los materiales, siempre que se tomen las medidas necesarias para que durante el proceso judicial se identifiquen la totalidad de los mismos. En este acto participará el representante del Ministerio Público.
                        </div>
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            Asimismo, el Juez, a solicitud del Ministerio Público, ordenará el allanamiento o descerraje del local donde se estuviere cometiendo el ilícito penal.
                        </div>
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            En caso de emitirse sentencia condenatoria, los ejemplares, materiales ilícitos, aparatos y medios utilizados para la comisión del ilícito serán comisados y destruidos, salvo casos excepcionales debidamente calificados por la autoridad judicial.
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            En ningún caso procederá la devolución de los ejemplares ilícitos al encausado.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "225",
                titulo: "Condición y grado de participación del agente",
                texto: `
                        <div style="margin-bottom: 10px; text-align: justify; line-height: 1.5;">
                            Será reprimido con pena privativa de libertad no menor de dos ni mayor de cinco años y con noventa a trescientos sesenta y cinco días-multa e inhabilitación conforme al artículo 36, inciso 4:
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 30px;">a)</span>
                            <div>Si el agente que comete el delito integra una organización criminal destinada a perpetrar los ilícitos previstos en el presente capítulo.</div>
                        </div>
                        <div style="display: flex; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 30px;">b)</span>
                            <div>Si el agente que comete cualquiera de los delitos previstos en el presente capítulo, posee la calidad de funcionario o servidor público.</div>
                        </div>`
            }
        ]
    },
    {
        titulo: `
                <div style="text-align: center; margin-top: 30px;">
                    <div style="margin-bottom: 15px;">TÍTULO VIII</div>
                    <div>DELITOS CONTRA EL PATRIMONIO CULTURAL Y PATRIMONIO PALEONTOLÓGICO DEL PERÚ </div>
                </div>`,
        capitulo: `
                <div style="text-align: center; margin-top: 30px;">
                    <div style="margin-bottom: 15px;">CAPÍTULO ÚNICO</div>
                    <div>DELITOS CONTRA LOS BIENES CULTURALES Y PATRIMONIO PALEONTOLÓGICO DEL PERÚ </div>
                </div>`,
        articulos: [
            {
                tipo: "Artículo",
                numero: "226",
                titulo: "Atentados contra monumentos arqueológicos, así como zonas paleontológicas declaradas como patrimonio paleontológico del Perú",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            El que se asienta, depreda o el que, sin autorización, explora, excava o remueve monumentos arqueológicos prehispánicos o zonas paleontológicas declaradas como patrimonio paleontológico del Perú, sin importar la relación de derecho real que ostente sobre el terreno donde aquel se ubique, siempre que se conozca el carácter de patrimonio cultural o de patrimonio paleontológico del Perú, será reprimido con pena privativa de libertad no menor de tres ni mayor de seis años y con ciento veinte a trescientos sesenta y cinco días-multa.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "227",
                titulo: "Inducción a la comisión de atentados contra sitios arqueológicos, así como zonas paleontológicas declaradas como patrimonio paleontológico del Perú",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            El que promueve, organiza, financia o dirige grupos de personas para la comisión de los delitos previstos en el artículo 226 será reprimido con pena privativa de libertad no menor de tres ni mayor de ocho años y con ciento ochenta a trescientos sesenta y cinco días-multa.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "228",
                titulo: "Extracción ilegal de bienes culturales y del patrimonio paleontológico del Perú",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            El que destruye, altera, extrae del país o comercializa bienes del patrimonio cultural prehispánico o del patrimonio paleontológico del Perú, o no los retorna de conformidad con la autorización que le fue concedida, será reprimido con pena privativa de libertad no menor de tres ni mayor de ocho años y con ciento ochenta a trescientos sesenta y cinco días-multa.
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            En el caso de que el agente sea un funcionario o servidor público con deberes de custodia de los bienes, la pena será no menor de cinco ni mayor de diez años.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "229",
                titulo: "Omisión de deberes de funcionarios públicos",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            Las autoridades políticas, administrativas, aduaneras, municipales y miembros de la Fuerzas Armadas o de la Policía Nacional que, omitiendo los deberes de sus cargos, intervengan o faciliten la comisión de los delitos mencionados en este Capítulo, serán reprimidos con pena privativa de libertad no menor de tres ni mayor de seis años, con treinta a noventa días-multa e inhabilitación no menor de un año, conforme al artículo 36, incisos 1, 2 y 3.
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            Si el agente obró por culpa, la pena será privativa de libertad no mayor de dos años.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "230",
                titulo: "Destrucción, alteración o extracción de patrimonio cultural de la nación y del patrimonio paleontológico del Perú",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            El que destruye, altera, extrae del país o comercializa, sin autorización, bienes culturales previamente declarados como tales, distintos a los de la época prehispánica, así como fósiles previamente declarados como patrimonio paleontológico del Perú, o no los retorna al país de conformidad con la autorización que le fue concedida, será reprimido con pena privativa de libertad no menor de dos ni mayor de cinco años y con noventa a ciento ochenta días-multa.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "231",
                titulo: "Decomiso",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            Las penas previstas en este capítulo, se imponen sin perjuicio del decomiso en favor del Estado, de los materiales, equipos y vehículos empleados en la comisión de los delitos contra el patrimonio cultural, así como de los bienes culturales obtenidos indebidamente, sin perjuicio de la reparación civil a que hubiere lugar.
                        </div>`
            }
        ]
    },
    {
        titulo: `
                <div style="text-align: center; margin-top: 30px;">
                    <div style="margin-bottom: 15px;">TÍTULO IX</div>
                    <div>DELITOS CONTRA EL ORDEN ECONÓMICO</div>
                </div>`,
        capitulo: `
                <div style="text-align: center; margin-top: 30px;">
                    <div style="margin-bottom: 15px;">CAPÍTULO I</div>
                    <div>ABUSO DEL PODER ECONÓMICO</div>
                </div>`,
        articulos: [
            {
                tipo: "Artículo",
                numero: "232",
                titulo: "Abuso del poder económico",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            El que participa en acuerdo o práctica anticompetitiva sujeto a una prohibición absoluta establecida en el Decreto Legislativo 1034, Decreto Legislativo que aprueba la Ley de Represión de Conductas Anticompetitivas, o norma que lo sustituya, con el objeto de impedir, restringir o distorsionar la libre competencia, será reprimido con una pena privativa de libertad no menor de dos ni mayor de seis años, con ciento ochenta a trescientos sesenta y cinco días-multa e inhabilitación conforme al artículo 36, incisos 2 y 4.
                        </div>`
            }
        ]
    },
    {
        titulo: ``,
        capitulo: `
                <div style="text-align: center; margin-top: 30px;">
                    <div style="margin-bottom: 15px;">CAPÍTULO II</div>
                    <div>ACAPARAMIENTO, ESPECULACIÓN, ADULTERACIÓN</div>
                </div>`,
        articulos: [
            {
                tipo: "Artículo",
                numero: "233",
                titulo: "Acaparamiento",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            El que provoca escasez o desabastecimiento de bienes y servicios esenciales para la vida y la salud de las personas, mediante la sustracción o acaparamiento, con la finalidad de alterar los precios habituales en su beneficio, y con perjuicio de los consumidores, será reprimido con pena privativa de libertad no menor de cuatro ni mayor de seis años y con ciento ochenta a trescientos sesenta y cinco días-multa.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "234",
                titulo: "Especulación y alteración de pesos y medidas",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            El productor, fabricante, proveedor o comerciante que incrementa los precios de bienes y servicios habituales, que son esenciales para la vida o salud de la persona, utilizando prácticas ilícitas que no se sustente en una real estructura de costos y el correcto funcionamiento del mercado, aprovechando una situación de mayor demanda por causas de emergencia, conmoción o calamidad pública será reprimido con pena privativa de libertad no menor de dos ni mayor de seis años y con ciento ochenta a trescientos sesenta y cinco días-multa.
                        </div>
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            Si la especulación se comete durante un estado de emergencia, declarado por el Presidente de la República, la pena privativa de la libertad será no menor de cuatro ni mayor de ocho años y con ciento ochenta a trescientos sesenta y cinco días-multa.
                        </div>
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            El que, injustificadamente vende bienes, o presta servicios a precio superior al que consta en las etiquetas, rótulos, letreros o listas elaboradas por el propio vendedor o prestador de servicios, será reprimido con pena privativa de libertad no mayor de un año y con noventa a ciento ochenta días-multa.
                        </div>
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            El que vende bienes que, por unidades tiene cierto peso o medida, cuando dichos bienes sean inferiores a estos pesos o medidas, será reprimido con pena privativa de libertad no mayor de un año y con noventa a ciento ochenta días-multa.
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            El que vende bienes contenidos en embalajes o recipientes cuyas cantidades sean inferiores a los mencionados en ellos, será reprimido con pena privativa de libertad no mayor de un año y con noventa a ciento ochenta días-multa.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "235",
                titulo: "Adulteración",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            El que altera o modifica la calidad, cantidad, peso o medida de algún bien, en perjuicio del consumidor, será reprimido con pena privativa de la libertad no menor de uno ni mayor de tres años y con noventa a ciento ochenta días-multa.
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            Si la adulteración se comete durante situación de conmoción, calamidad pública o estado de emergencia oficialmente declarado, la pena privativa de la libertad será no menor de cuatro ni mayor de seis años y con ciento ochenta a trescientos sesenta y cinco días-multa.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "236",
                titulo: "Derogado",
                texto: `
                        <div style="text-align: justify; line-height: 1.5; color: #777; font-style: italic;">
                            Derogado conforme a la Ley 31040 del 29/08/2020.
                        </div>`
            }
        ]
    },
    {
        titulo: ``,
        capitulo: `
                <div style="text-align: center; margin-top: 30px;">
                    <div style="margin-bottom: 15px;">CAPÍTULO III</div>
                    <div>VENTA ILÍCITA DE MERCADERÍAS</div>
                </div>`,
        articulos: [
            {
                tipo: "Artículo",
                numero: "237",
                titulo: "Venta ilegal de mercaderías",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            El que pone en venta o negocia de cualquier manera bienes recibidos para su distribución gratuita, será reprimido con pena privativa de libertad no menor de dos ni mayor de seis años.
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            La pena será no menor de tres años ni mayor de seis años e inhabilitación conforme a los incisos 1), 2) y 3) del Artículo 36°, cuando el agente transporta o comercializa sin autorización bienes fuera del territorio en el que goza de beneficios provenientes de tratamiento tributario especial. Si el delito se comete en época de conmoción o calamidad pública, o es realizado por funcionario o servidor público, la pena será no menor de tres ni mayor de ocho años.
                        </div>`
            }
        ]
    },
    {
        titulo: ``,
        capitulo: `
                <div style="text-align: center; margin-top: 30px;">
                    <div style="margin-bottom: 15px;">CAPÍTULO IV</div>
                    <div>DE OTROS DELITOS ECONÓMICOS</div>
                </div>`,
        articulos: [
            {
                tipo: "Artículo",
                numero: "238",
                titulo: "Derogado",
                texto: `
                        <div style="text-align: justify; line-height: 1.5; color: #777; font-style: italic;">
                            Derogado conforme al DL 1044 del 26/06/2008.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "239",
                titulo: "Derogado",
                texto: `
                        <div style="text-align: justify; line-height: 1.5; color: #777; font-style: italic;">
                            Derogado conforme al DL 1044 del 26/06/2008.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "240",
                titulo: "Derogado",
                texto: `
                        <div style="text-align: justify; line-height: 1.5; color: #777; font-style: italic;">
                            Derogado conforme al DL 1044 del 26/06/2008.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "241",
                titulo: "Fraude en remates, licitaciones y concursos públicos",
                texto: `
                        <div style="margin-bottom: 10px; text-align: justify; line-height: 1.5;">
                            Serán reprimidos con pena privativa de libertad no mayor de tres años o con ciento ochenta a trescientos sesenticinco días-multa quienes practiquen las siguientes acciones:
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">1.-</span>
                            <div>Solicitan o aceptan dádivas o promesas para no tomar parte en un remate público, en una licitación pública o en un concurso público de precios.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 15px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">2.-</span>
                            <div>Intentan alejar a los postores por medio de amenazas, dádivas, promesas o cualquier otro artificio.</div>
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            Si se tratare de concurso público de precios o de licitación pública, se impondrá además al agente o a la empresa o persona por él representada, la suspensión del derecho a contratar con el Estado por un período no menor de tres ni mayor de cinco años.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "241-A",
                titulo: "Corrupción en el ámbito privado",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            El socio, accionista, gerente, director, administrador, representante legal, apoderado, empleado o asesor de una persona jurídica de derecho privado, organización no gubernamental, asociación, fundación, comité, incluidos los entes no inscritos o sociedades irregulares, que directa o indirectamente acepta, reciba o solicita donativo, promesa o cualquier otra ventaja o beneficio indebido de cualquier naturaleza, para sí o para un tercero para realizar u omitir un acto que permita favorecer a otro en la adquisición o comercialización de bienes o mercancías, en la contratación de servicios comerciales o en las relaciones comerciales, será reprimido con pena privativa de libertad no mayor de cuatro años e inhabilitación conforme al inciso 4 del artículo 36 del Código Penal y con ciento ochenta a trescientos sesenta y cinco días-multa.
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            Será reprimido con las mismas penas previstas en el párrafo anterior quien, directa o indirectamente, prometa, ofrezca o conceda a accionistas, gerentes, directores, administradores, representantes legales, apoderados, empleados o asesores de una persona jurídica de derecho privado, organización no gubernamental, asociación, fundación, comité, incluidos los entes no inscritos o sociedades irregulares, una ventaja o beneficio indebido de cualquier naturaleza, para ellos o para un tercero, como contraprestación para realizar u omitir un acto que permita favorecer a éste u otro en la adquisición o comercialización de bienes o mercancías, en la contratación de servicios comerciales o en las relaciones comerciales.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "241-B",
                titulo: "Corrupción al interior de entes privados",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            El socio, accionista, gerente, director, administrador, representante legal, apoderado, empleado o asesor de una persona jurídica de derecho privado, organización no gubernamental, asociación, fundación, comité, incluidos los entes no inscritos o sociedades irregulares, que directa o indirectamente acepta, recibe o solicita donativo, promesa o cualquier otra ventaja o beneficio indebido de cualquier naturaleza para sí o para un tercero para realizar u omitir un acto en perjuicio de la persona jurídica, será reprimido con pena privativa de libertad no mayor de cuatro años e inhabilitación conforme al inciso 4 del artículo 36 del Código Penal y con ciento ochenta a trescientos sesenta y cinco días-multa.
                        </div>
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            Será reprimido con las mismas penas previstas en el párrafo anterior quien, directa o indirectamente, promete, ofrece o concede a accionistas, gerentes, directores, administradores, representantes legales, apoderados, empleados o asesores de una persona jurídica de derecho privado, organización no gubernamental, asociación, fundación, comité, incluidos los entes no inscritos o sociedades irregulares, una ventaja o beneficio indebido de cualquier naturaleza, para ellos o para un tercero, como contraprestación para realizar u omitir un acto en perjuicio de la persona jurídica.
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            En los supuestos previstos en este artículo solo se procederá mediante ejercicio privado de la acción penal.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "242",
                titulo: "Rehusamiento a prestar información económica, industrial o comercial",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            El director, administrador o gerente de una empresa que, indebidamente, rehúsa suministrar a la autoridad competente la información económica, industrial o mercantil que se le requiera, o deliberamente presta la información de modo inexacto, será reprimido con pena privativa de libertad no mayor de dos años o con noventa a ciento ochenta días-multa.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "243",
                titulo: "Subvaluación de mercaderías adquiridas con tipo de cambio preferencial",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            El que recibe moneda extranjera con tipo de cambio preferencial para realizar importaciones de mercaderías y vende éstas a precios superiores a los autorizados, será reprimido con pena privativa de libertad no menor de dos ni mayor de cuatro años, con ciento veinte a trescientos sesenticinco días-multa e inhabilitación conforme al artículo 36, incisos 1, 2 y 4.
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            El que da a las mercaderías finalidad distinta a la que establece la norma que fija el tipo de cambio o el régimen especial tributario, será reprimido con la pena señalada en el párrafo anterior.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "243-A",
                titulo: "Derogado",
                texto: `
                        <div style="text-align: justify; line-height: 1.5; color: #777; font-style: italic;">
                            Será reprimido con pena privativa de la libertad no menor de uno ni mayor de seis años y con trescientos sesenticinco días multa, el que organiza o conduce Casinos de Juego sujetos a autorización sin haber cumplido los requisitos que exijan las leyes o reglamentos para su funcionamiento; sin perjuicio del decomiso de los efectos, dinero y bienes utilizados en la comisión del delito.
                        </div>`
            }
        ]
    },
    {
        titulo: ``,
        capitulo: `
                <div style="text-align: center; margin-top: 30px;">
                    <div style="margin-bottom: 15px;">CAPÍTULO V</div>
                    <div>DESEMPEÑO DE ACTIVIDADES NO AUTORIZADAS</div>
                </div>`,
        articulos: [
            {
                tipo: "Artículo",
                numero: "243-B",
                titulo: "Intermediación transaccional fraudulenta",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            El que por cuenta propia o ajena realiza o desempeña actividades propias de los agentes de intermediación, sin contar con la autorización para ello, efectuando transacciones o induciendo a la compra o venta de valores, por medio de cualquier acto, práctica o mecanismo engañoso o fraudulento y siempre que los valores involucrados en tales actuaciones tengan en conjunto un valor de mercado superior a cuatro (4) UIT, será reprimido con pena privativa de libertad no menor de uno (1) ni mayor de cinco (5) años.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "243-C",
                titulo: "Funcionamiento ilegal de juegos de casino y máquinas tragamonedas o juegos o apuestas deportivas a distancia",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            El que organiza, conduce o explota juegos de casino y máquinas tragamonedas, o juegos o apuestas deportivas a distancia sin haber cumplido con los requisitos que exigen las leyes y sus reglamentos para su organización, conducción o explotación, será reprimido con pena privativa de la libertad no menor de uno ni mayor de cuatro años, con trescientos sesenta y cinco días multa e inhabilitación para ejercer dicha actividad, de conformidad con el inciso 4) del artículo 36 del Código Penal.
                        </div>`
            }
        ]
    },
    {
        titulo: `
                <div style="text-align: center; margin-top: 30px;">
                    <div style="margin-bottom: 15px;">TÍTULO X</div>
                    <div>DELITOS CONTRA EL ORDEN FINANCIERO Y MONETARIO</div>
                </div>`,
        capitulo: `
                <div style="text-align: center; margin-top: 30px;">
                    <div style="margin-bottom: 15px;">CAPÍTULO I</div>
                    <div>DELITOS FINANCIEROS</div>
                </div>`,
        articulos: [
            {
                tipo: "Artículo",
                numero: "244",
                titulo: "Concentración crediticia",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            El director, gerente, administrador, representante legal, miembro del consejo de administración, miembro de comité de crédito o funcionario de una institución bancaria, financiera u otra que opere con fondos del público que, directa o indirectamente, a sabiendas, apruebe créditos, descuentos u otros financiamientos por encima de los límites operativos establecidos en la ley de la materia, será reprimido con pena privativa de libertad no menor de cuatro ni mayor de diez años y con trescientos sesenta y cinco a setecientos treinta días-multa.
                        </div>
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            En caso de que los créditos, descuentos u otros financiamientos a que se refiere el párrafo anterior sean otorgados a favor de directores o trabajadores de la institución, o de personas vinculadas a accionistas de la propia institución conforme a los criterios de vinculación normados por la Superintendencia de Banca, Seguros y Administradoras Privadas de Fondos de Pensiones, el autor será reprimido con pena privativa de libertad no menor de seis ni mayor de diez años y con trescientos sesenta y cinco a setecientos treinta días-multa.
                        </div>
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            Si como consecuencia de la aprobación de las operaciones señaladas en los párrafos anteriores, la Superintendencia de Banca, Seguros y Administradoras Privadas de Fondos de Pensiones resuelve la intervención o liquidación de la institución, el autor será reprimido con pena privativa de libertad no menor de ocho ni mayor de doce años y trescientos sesenta y cinco a setecientos treinta días-multa.
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            Los beneficiarios de las operaciones señaladas en el presente artículo, que hayan participado en el delito, serán reprimidos con la misma pena que corresponde al autor.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "245",
                titulo: "Ocultamiento, omisión o falsedad de información",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            El que ejerce funciones de administración o representación de una institución bancaria, financiera u otra que opere con fondos del público, que con el propósito de ocultar situaciones de liquidez o insolvencia de la institución, omita o niegue proporcionar información o proporcione datos falsos a las autoridades de control y regulación, será reprimido con pena privativa de libertad no menor de cuatro ni mayor de ocho años y con ciento ochenta a trescientos sesenta y cinco días-multa.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "245-A",
                titulo: "Falsedad de información presentada por un emisor en el mercado de valores",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            El que ejerce funciones de administración, de un emisor con valores inscritos en el Registro Público del Mercado de Valores, que deliberadamente proporcione o consigne información o documentación falsas de carácter económico-financiera, contable o societaria referida al emisor, a los valores que emita, a la oferta que se haga de estos, y que el emisor se encuentre obligado a presentar o revelar conforme a la normatividad del mercado de valores, para obtener un beneficio o evitar un perjuicio propio o de un tercero, será reprimido con pena privativa de libertad no menor de dos ni mayor de cuatro años y con ciento ochenta a trescientos sesenta y cinco días-multa.
                        </div>
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            Si como consecuencia de la conducta descrita en el párrafo anterior se produce un perjuicio económico para algún inversionista o adquirente de los valores o instrumentos financieros, el agente será reprimido con pena privativa de libertad no menor de tres ni mayor de seis años y con ciento ochenta a trescientos sesenta y cinco días-multa.
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            Previamente a la formalización de la denuncia respectiva, el Ministerio Público deberá requerir un informe técnico a la Superintendencia del Mercado de Valores (SMV), que será emitido dentro del plazo de quince (15) días de solicitado, vencido el cual resolverá.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "246",
                titulo: "Instituciones financieras ilegales",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            El que, por cuenta propia o ajena, se dedica directa o indirectamente a la captación habitual de recursos del público, bajo la forma de depósito, mutuo o cualquier modalidad, sin contar con permiso de la autoridad competente, será reprimido con pena privativa de libertad no menor de tres ni mayor de seis años y con ciento ochenta a trescientos sesenticinco días-multa.
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            Si para dichos fines el agente hace uso de los medios de comunicación social, será reprimido con pena privativa de libertad no menor de cuatro ni mayor de ocho años y con ciento ochenta a trescientos sesenticinco días-multa.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "247",
                titulo: "Financiamiento por medio de información fraudulenta",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            El usuario de una institución bancaria, financiera u otra que opera con fondos del público, o de una cooperativa de ahorro y crédito que solo opera con sus socios y que no está autorizada a captar recursos del público u operar con terceros, inscrita en el Registro Nacional de Cooperativas de Ahorro y Crédito No Autorizadas a Captar Recursos del Público, que, proporcionando información o documentación falsas o mediante engaños obtiene créditos directos o indirectos u otro tipo de financiación, será reprimido con pena privativa de libertad no menor de uno ni mayor de cuatro años y con ciento ochenta a trescientos sesenticinco días-multa.
                        </div>
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            Si como consecuencia del crédito así obtenido, la Superintendencia de Banca, Seguros y AFP resuelve la intervención o liquidación de la institución bancaria, financiera o de la cooperativa de ahorro y crédito que solo opera con sus socios y que no está autorizada a captar recursos del público u operar con terceros, inscrita en el Registro Nacional de Cooperativas de Ahorro y Crédito No Autorizadas a Captar Recursos del Público, es reprimido con pena privativa de libertad no menor de cuatro ni mayor de diez años y con trescientos sesenticinco a setecientos treinta días-multa.
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            Los accionistas, asociados, directores, gerentes y funcionarios de la institución que cooperen en la ejecución del delito, serán reprimidos con la misma pena señalada en el párrafo anterior y, además, con inhabilitación conforme al artículo 36, incisos 1, 2 y 4.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "248",
                titulo: "Condicionamiento de créditos",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            Los directores, gerentes, administradores o funcionarios de las instituciones bancarias, financieras y demás que operan con fondos del público que condicionan, en forma directa o indirecta, el otorgamiento de créditos a la entrega por parte del usuario de contraprestaciones indebidas, serán reprimidos con pena privativa de libertad no menor de uno ni mayor de tres años y con noventa a ciento ochenta días-multa.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "249",
                titulo: "Pánico Financiero",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            El que a sabiendas produce alarma en la población propalando noticias falsas atribuyendo a una empresa del sistema financiero, a una empresa del sistema de seguros, a una sociedad administradora de fondos mutuos de inversión en valores o de fondos de inversión, a una administradora privada de fondos de pensiones u otra que opere con fondos del público, o a una cooperativa de ahorro y crédito que solo opera con sus socios y que no está autorizada a captar recursos del público u operar con terceros, inscrita en el Registro Nacional de Cooperativas de Ahorro y Crédito No Autorizadas a Captar Recursos del Público, cualidades o situaciones de riesgo que generen el peligro de retiros masivos de depósitos o el traslado o la redención de instrumentos financieros de ahorro o de inversión, es reprimido con pena privativa de la libertad no menor de tres ni mayor de seis años y con ciento ochenta a trescientos sesenta y cinco días-multa.
                        </div>
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            La pena es no menor de cuatro ni mayor de ocho años y de trescientos sesenta a setecientos veinte días-multa si el agente es miembro del directorio o consejo de administración, gerente o funcionario de una empresa del sistema financiero, de una empresa del sistema de seguros, de una sociedad administradora de fondos mutuos de inversión en valores o de fondos de inversión, de una administradora privada de fondos de pensiones u otra que opere con fondos del público, o de una cooperativa de ahorro y crédito que solo opera con sus socios y que no está autorizada a captar recursos del público u operar con terceros, inscrita en el Registro Nacional de Cooperativas de Ahorro y Crédito No Autorizadas a Captar Recursos del Público; o si es miembro del directorio o gerente de una empresa auditora, de una clasificadora de riesgo u otra que preste servicios a alguna de las empresas antes señaladas, o si es funcionario del Ministerio de Economía y Finanzas, el Banco Central de Reserva del Perú, la Superintendencia de Banca, Seguros y AFP o la Superintendencia del Mercado de Valores.
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            La pena prevista en el párrafo anterior se aplica también a los ex funcionarios del Ministerio de Economía y Finanzas, el Banco Central de Reserva del Perú, la Superintendencia de Banca, Seguros y AFP o la Superintendencia del Mercado de Valores, siempre que hayan cometido delito dentro de los seis años posteriores a la fecha de su cese.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "250",
                titulo: "Omisión de las provisiones específicas",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            Los directores, administradores, gerentes y funcionarios, accionistas o asociados de las instituciones bancarias, financieras y demás que operan con fondos del público supervisada por la Superintendencia de Banca y Seguros u otra entidad de regulación y control que hayan omitido efectuar las provisiones específicas para créditos calificados como dudosos o pérdida u otros activos sujetos igualmente a provisión, inducen a la aprobación del órgano social pertinente, a repartir dividendos o distribuir utilidades bajo cualquier modalidad o capitalizar utilidades, serán reprimidos con pena privativa de libertad no menor de uno ni mayor de tres años y con ciento ochenta a trescientos sesenticinco días-multa.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "251",
                titulo: "Desvío fraudulento de crédito promocional",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            El que aplica o desvía fraudulentamente un crédito promocional hacia una finalidad distinta a la que motivó su otorgamiento, será reprimido con pena privativa de libertad no mayor de dos años.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "251-A",
                titulo: "Uso indebido de información privilegiada. Formas agravadas",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            El que obtiene un beneficio o se evita un perjuicio de carácter económico en forma directa o a través de terceros, mediante el uso de información privilegiada, será reprimido con pena privativa de la libertad no menor de uno (1) ni mayor de cinco (5) años.
                        </div>
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            Si el delito a que se refiere el párrafo anterior es cometido por un director, funcionario o empleado de una Bolsa de Valores, de un agente de intermediación, de las entidades supervisoras de los emisores, de las clasificadoras de riesgo, de las administradoras de fondos mutuos de inversión en valores, de las administradoras de fondos de inversión, de las administradoras de fondos de pensiones, así como de las empresas bancarias, financieras o de seguros, la pena no será menor de cinco (5) ni mayor de siete (7) años.
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            Previamente a la formalización de la denuncia respectiva, el Ministerio Público deberá requerir un informe técnico a la Superintendencia del Mercado de Valores (SMV), que será emitido dentro del plazo de quince (15) días de solicitado, vencido del cual resolverá.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "251-B",
                titulo: "Manipulación de precios en el mercado de valores",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            El que proporcione señales falsas o engañosas respecto de la oferta o demanda de un valor o instrumento financiero, en beneficio propio o ajeno, mediante transacciones que suban o bajen el precio, incrementen o reduzcan su liquidez, será reprimido con pena privativa de la libertad no menor de uno (1) ni mayor de cinco (5) años, siempre que el monto de dichas transacciones superen las trescientas (300) Unidades Impositivas Tributarias (UIT) vigentes al momento de la comisión del delito, o el beneficio, pérdida evitada o perjuicio causado supere dicho monto.
                        </div>
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            La misma pena se aplicará a directores, gerentes, miembros del comité de inversiones, funcionarios y personas vinculadas al proceso de inversión de un inversionista institucional que, en beneficio propio o ajeno, manipulen el precio de su cartera de valores o instrumentos financieros o la administrada por otro inversionista institucional, mediante transacciones, suban o bajen el precio, incrementen o reduzcan la liquidez de los valores o instrumentos financieros que integren dicha cartera.
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            Previamente a que el Ministerio Público formalice la denuncia respectiva, se deberá contar con un informe técnico emitido por la Comisión Nacional Supervisora de Empresas y Valores (Conasev).
                        </div>`
            }
        ]
    },
    {
        titulo: ``,
        capitulo: `
                <div style="text-align: center; margin-top: 30px;">
                    <div style="margin-bottom: 15px;">CAPÍTULO II</div>
                    <div>DELITOS MONETARIOS</div>
                </div>`,
        articulos: [
            {
                tipo: "Artículo",
                numero: "252",
                titulo: "Fabricación y falsificación de moneda de curso legal",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            El que falsifica billetes o monedas será reprimido con pena privativa de libertad no menor de cinco ni mayor de doce años y con ciento veinte a trescientos días-multa.
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            El que falsifica billetes o monedas separando el anverso y el reverso de los auténticos, superponiendo sus fragmentos, recurriendo al empleo de disolventes químicos, usando los fabricados por otros países, recurriendo a aleaciones distintas o valiéndose de cualquier otro medio que no fuere de producción masiva, será reprimido con pena privativa de libertad no menor de cuatro ni mayor de diez años y con ciento veinte a trescientos días-multa.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "253",
                titulo: "Alteración de la moneda de curso legal",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            El que altera los billetes o monedas con el propósito de atribuirles un valor superior, o realiza tal alteración con billetes o monedas que se hallan fuera de circulación o corresponden a otros países, para darles la apariencia de los que tienen poder cancelatorio, será reprimido con pena privativa de libertad no menor de cuatro ni mayor de diez años y con ciento veinte a trescientos días-multa.
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            El que altera la moneda, aminorando su valor intrínseco, será reprimido con pena privativa de libertad no menor de seis meses ni mayor de dos años y con treinta a noventa días-multa.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "254",
                titulo: "Tráfico de moneda falsa",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            El que a sabiendas, introduce, transporta o retira del territorio de la República; comercializa, distribuye o pone en circulación monedas o billetes falsificados o alterados por terceros, cuyo valor nominal supere una remuneración mínima vital, será reprimido con pena privativa de libertad no menor de cinco ni mayor de diez años y con ciento ochenta a trescientos sesenta y cinco días-multa. La pena será de ciento ochenta a trescientos sesenta y cinco días-multa, si el valor nominal es menor a una remuneración mínima vital.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "255",
                titulo: "Fabricación o introducción en el territorio de la República de instrumentos destinados a la falsificación de billetes o monedas",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            El que fabrica, introduce en el territorio de la República o retira de él, máquinas, matrices, cuños o cualquier otra clase de instrumentos o insumos destinados a la falsificación de billetes o monedas o se encuentra en posesión de uno o más pliegos de billetes falsificados, o extrae de un billete auténtico medidas de seguridad, con el objeto de insertarlas en uno falso o alterado, o que, a sabiendas, los conserva en su poder será reprimido con pena privativa de libertad no menor de cinco ni mayor de doce años y con ciento ochenta a trescientos sesenta y cinco días multa.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "256",
                titulo: "Alteración de billetes o monedas",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            Será reprimido con pena de multa no menor de treinta ni mayor de ciento veinte días-multa:
                        </div>

                        <div style="display: flex; margin-bottom: 10px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 50px;">1.-</span>
                            <div>El que escribe sobre billetes, imprime sellos en ellos o de cualquier manera daña intencionalmente billetes o monedas.</div>
                        </div>

                        <div style="display: flex; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 50px;">2.-</span>
                            <div>El que, con fines publicitarios o análogos, reproduce o distribuye billetes o monedas, o el anverso o reverso de ellos, de modo que pueda generar confusión o propiciar que las reproducciones sean utilizadas por terceros como si se tratase de billetes auténticos.</div>
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "257",
                titulo: "Aplicación extensiva",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            Las disposiciones de los artículos de este Capítulo se hacen extensivas a los billetes, monedas, valores y títulos valores de otros países.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "257-A",
                titulo: "Formas agravadas",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            Será reprimido con pena privativa de libertad no menor de seis ni mayor de catorce años y con ciento ochenta a trescientos sesenta y cinco días-multa el que comete los delitos establecidos en los artículos 252, 253, 254, 255 y 257, si concurriera cualquiera de las siguientes circunstancias agravantes:
                        </div>

                        <div style="display: flex; margin-bottom: 10px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 50px;">1.</span>
                            <div>Si el agente actúa como integrante de una organización criminal.</div>
                        </div>

                        <div style="display: flex; margin-bottom: 10px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 50px;">2.</span>
                            <div>Si el agente labora o ha laborado en imprentas o talleres gráficos o en la industria metalmecánica y se ha valido de su conocimiento para perpetrar el delito.</div>
                        </div>

                        <div style="display: flex; margin-bottom: 10px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 50px;">3.</span>
                            <div>Si el agente labora o ha laborado en el Banco Central de Reserva del Perú y se ha valido de esa circunstancia para obtener información privilegiada, sobre los procesos de fabricación y las medidas de seguridad, claves o marcas secretas de las monedas o billetes.</div>
                        </div>

                        <div style="display: flex; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 50px;">4.</span>
                            <div>Si para facilitar la circulación de monedas o billetes falsificados, el agente los mezcla con monedas o billetes genuinos.</div>
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "258",
                titulo: "Emisión ilegal de billetes y otros",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            El funcionario del Banco Central de Reserva del Perú que emita numerario en exceso de las cantidades autorizadas, será reprimido con pena privativa de libertad no menor de dos ni mayor de seis años e inhabilitación de uno a cuatro años conforme al Artículo 36°, incisos 1) y 2).
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "259",
                titulo: "Uso ilegal de divisas",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            El que destina las divisas asignadas por el Banco Central de Reserva, a fin distinto del señalado y autorizado, será reprimido con pena privativa de libertad no menor de dos ni mayor de diez años, con ciento veinte a trescientos sesenticinco días-multa e inhabilitación conforme al artículo 36°, incisos 1, 2 y 4.
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            Los directores, gerentes y funcionarios del Banco Central de Reserva o funcionarios públicos que faciliten la comisión del delito, serán reprimidos con la misma pena.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "260",
                titulo: "Retención indebida de divisas",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            El que, teniendo obligación de hacerlo, no entrega, indebidamente, al Banco Central de Reserva las divisas generadas por exportaciones o las retiene, injustificadamente, luego de vencido el plazo establecido, será reprimido con pena privativa de libertad no menor de dos ni mayor de cuatro años, con ciento ochenta a trescientos sesenticinco días-multa e inhabilitación conforme al artículo 36°, incisos 1, 2 y 4.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "261",
                titulo: "Valores equiparados a moneda",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            Para los efectos de este Capítulo quedan equiparados a los billetes y monedas, los títulos de la deuda pública, bonos, cupones, cédulas, libramientos, acciones y otros valores o títulos-valores emitidos por el Estado o por personas de derecho público.
                        </div>`
            }
        ]
    },
    {
        titulo: `
                <div style="text-align: center; margin-top: 30px;">
                    <div style="margin-bottom: 15px;">TÍTULO XI</div>
                    <div>DELITOS TRIBUTARIOS</div>
                </div>`,
        capitulo: `
                <div style="text-align: center; margin-top: 30px;">
                    <div style="margin-bottom: 15px;">CAPÍTULO I</div>
                    <div>CONTRABANDO</div>
                </div>`,
        articulos: [
            {
                tipo: "Artículo",
                numero: "262",
                titulo: "[Derogado]",
                texto: `
                        <div style="text-align: justify; line-height: 1.5; color: #777; font-style: italic;">
                            Derogado conforme a la Ley 26461 del 08/06/1995.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "263",
                titulo: "[Derogado]",
                texto: `
                        <div style="text-align: justify; line-height: 1.5; color: #777; font-style: italic;">
                            Derogado conforme a la Ley 26461 del 08/06/1995.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "264",
                titulo: "[Derogado]",
                texto: `
                        <div style="text-align: justify; line-height: 1.5; color: #777; font-style: italic;">
                            Derogado conforme a la Ley 26461 del 08/06/1995.
                        </div>`
            }
        ]
    },
    {
        titulo: ``,
        capitulo: `
                <div style="text-align: center; margin-top: 30px;">
                    <div style="margin-bottom: 15px;">CAPÍTULO II</div>
                    <div>DEFRAUDACIÓN FISCAL</div>
                    <div style="margin-top: 20px; margin-bottom: 10px; font-weight: bold;">SECCIÓN I</div>
                    <div>DEFRAUDACIÓN DE RENTAS DE ADUANAS</div>
                </div>`,
        articulos: [
            {
                tipo: "Artículo",
                numero: "265",
                titulo: "[Derogado]",
                texto: `
                        <div style="text-align: justify; line-height: 1.5; color: #777; font-style: italic;">
                            Derogado conforme a la Ley 26461 del 08/06/1995.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "266",
                titulo: "[Derogado]",
                texto: `
                        <div style="text-align: justify; line-height: 1.5; color: #777; font-style: italic;">
                            Derogado conforme a la Ley 26461 del 08/06/1995.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "267",
                titulo: "[Derogado]",
                texto: `
                        <div style="text-align: justify; line-height: 1.5; color: #777; font-style: italic;">
                            Derogado conforme a la Ley 26461 del 08/06/1995.
                        </div>`
            }
        ]
    },
    {
        titulo: ``,
        capitulo: `
                <div style="text-align: center; margin-top: 30px;">
                    <div style="margin-bottom: 10px; font-weight: bold;">SECCIÓN II</div>
                    <div>DEFRAUDACIÓN TRIBUTARIA</div>
                </div>`,
        articulos: [
            {
                tipo: "Artículo",
                numero: "268",
                titulo: "[Derogado]",
                texto: `
                        <div style="text-align: justify; line-height: 1.5; color: #777; font-style: italic;">
                            Derogado conforme al DL 813 del 20/04/1996.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "269",
                titulo: "[Derogado]",
                texto: `
                        <div style="text-align: justify; line-height: 1.5; color: #777; font-style: italic;">
                            Derogado conforme al DL 813 del 20/04/1996.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "270",
                titulo: "[Derogado]",
                texto: `
                        <div style="text-align: justify; line-height: 1.5; color: #777; font-style: italic;">
                            Derogado conforme al D-L 25495 del 14/05/1992.
                        </div>`
            }
        ]
    },
    {
        titulo: ``,
        capitulo: `
                <div style="text-align: center; margin-top: 30px;">
                    <div style="margin-bottom: 15px;">CAPÍTULO III</div>
                    <div>ELABORACIÓN Y COMERCIO CLANDESTINO DE PRODUCTOS</div>
                </div>`,
        articulos: [
            {
                tipo: "Artículo",
                numero: "271",
                titulo: "Elaboración clandestina de productos",
                texto: `
                        <div style="margin-bottom: 10px; text-align: justify; line-height: 1.5;">
                            Será reprimido con pena privativa de libertad no menor de uno ni mayor de cuatro años, sin perjuicio del decomiso cuando ello proceda, el que:
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">1.</span>
                            <div>Elabora mercaderías gravadas cuya producción, sin autorización, esté prohibida.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">2.</span>
                            <div>Habiendo cumplido los requisitos establecidos, realiza la elaboración de dichas mercaderías con maquinarias, equipos o instalaciones ignoradas por la autoridad o modificados sin conocimiento de ésta.</div>
                        </div>
                        <div style="display: flex; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">3.</span>
                            <div>Ocultar la producción o existencia de estas mercaderías.</div>
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "271-A",
                titulo: "Fabricación clandestina de uniformes de la Policía Nacional del Perú o de las Fuerzas Armadas",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            Será reprimido con pena privativa de libertad no menor de cuatro ni mayor de seis años, con el decomiso total, el que confecciona sin autorización uniformes de la Policía Nacional del Perú o de las Fuerzas Armadas.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "272",
                titulo: "Comercio Clandestino",
                texto: `
                        <div style="margin-bottom: 10px; text-align: justify; line-height: 1.5;">
                            Será reprimido con pena privativa de libertad no menor de 1 (un) año ni mayor de 3 (tres) años y con 170 (ciento setenta) a 340 (trescientos cuarenta) días-multa, el que:
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">1.</span>
                            <div>Se dedique a una actividad comercial sujeta a autorización sin haber cumplido los requisitos que exijan las leyes o reglamentos.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">2.</span>
                            <div>Emplee, expenda o haga circular mercaderías y productos sin el timbre o precinto correspondiente, cuando deban llevarlo o sin acreditar el pago del tributo.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">3.</span>
                            <div>Utilice mercaderías exoneradas de tributos en fines distintos de los previstos en la ley exonerativa respectiva.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">4.</span>
                            <div>Evada el control fiscal en la comercialización, transporte o traslado de bienes sujetos a control y fiscalización dispuesto por normas especiales.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 15px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">5.</span>
                            <div>Utilice rutas distintas a las rutas fiscales en el transporte o traslado de bienes, insumos o productos sujetos a control y fiscalización.</div>
                        </div>
                        <div style="margin-bottom: 10px; text-align: justify; line-height: 1.5;">
                            En los supuestos previstos en los incisos 3), 4) y 5) constituyen circunstancias agravantes sancionadas con pena privativa de libertad no menor de cinco ni mayor de ocho años y con trescientos sesenta y cinco a setecientos treinta días-multa, cuando cualquiera de las conductas descritas se realice:
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 30px;">a)</span>
                            <div>Por el Consumidor Directo de acuerdo con lo dispuesto en las normas tributarias;</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 30px;">b)</span>
                            <div>Utilizando documento falso o falsificado; o</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 30px;">c)</span>
                            <div>Por una organización criminal;</div>
                        </div>
                        <div style="display: flex; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 30px;">d)</span>
                            <div>En los supuestos 4) y 5), si la conducta se realiza en dos o más oportunidades dentro de un plazo de 10 años.</div>
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "272-A",
                titulo: "Comercio clandestino de uniformes de la Policía Nacional del Perú o de las Fuerzas Armadas",
                texto: `
                        <div style="margin-bottom: 10px; text-align: justify; line-height: 1.5;">
                            Será reprimido con pena privativa de libertad no menor de cuatro ni mayor de seis años, con el decomiso total, el que:
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 30px;">a)</span>
                            <div>Distribuye o comercializa, sin autorización, uniformes de la Policía Nacional del Perú o de las Fuerzas Armadas.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 30px;">b)</span>
                            <div>Comercializa uniformes de la Policía Nacional del Perú o de las Fuerzas Armadas a personal policial o de la fuerza armada que no se encuentre debidamente identificado con el carné de identidad personal y la placa insignia correspondiente.</div>
                        </div>
                        <div style="display: flex; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 30px;">c)</span>
                            <div>Vende el uniforme de la Policía Nacional del Perú o de las Fuerzas Armadas a personas ajenas a dichas instituciones.</div>
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "272-B",
                titulo: "Comercialización ilegal de servicios públicos móviles",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            El que ofrezca, promocione, comercialice o realice contrataciones de servicios públicos móviles de forma ambulatoria o en la vía pública, salvo aquellos casos que la norma lo autorice, será reprimido con pena privativa de libertad no menor de uno ni mayor de cuatro años y con una multa de trescientos sesenta y cinco a setecientos treinta días-multa.
                        </div>`
            }
        ]
    },
    {
        titulo: `
                <div style="text-align: center; margin-top: 30px;">
                    <div style="margin-bottom: 15px;">TÍTULO XII</div>
                    <div>DELITOS CONTRA LA SEGURIDAD PÚBLICA</div>
                </div>`,
        capitulo: `
                <div style="text-align: center; margin-top: 30px;">
                    <div style="margin-bottom: 15px;">CAPÍTULO I</div>
                    <div>DELITOS DE PELIGRO COMÚN</div>
                </div>`,
        articulos: [
            {
                tipo: "Artículo",
                numero: "273",
                titulo: "Peligro por medio de incendio o explosión",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            El que crea un peligro común para las personas o los bienes mediante incendio, explosión o liberando cualquier clase de energía, será reprimido con pena privativa de libertad no menor de tres ni mayor de diez años.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "273-A",
                titulo: "Producción de peligro en el servicio público de transporte de pasajeros",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            El que presta el servicio público de transportes de pasajeros y/o el que conduce vehículos de dicho servicio, con o sin habilitación otorgada por la autoridad competente, que pueda generar un peligro para la vida, la salud o la integridad física de las personas al no cumplir con los requisitos de ley para circular y que, además, dicho vehículo no cuente con el correspondiente Seguro Obligatorio de Accidentes de Tránsito vigente o no haya pasado la última inspección técnica vehicular, será reprimido con pena privativa de libertad no menor de uno (1) ni mayor de tres (3) años e inhabilitación conforme al artículo 36, inciso 7.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "274",
                titulo: "Conducción en estado de ebriedad o drogadicción",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            El que encontrándose en estado de ebriedad, con presencia de alcohol en la sangre en proporción mayor de 0.5 gramos-litro, o bajo el efecto de drogas tóxicas, estupefacientes, sustancias psicotrópicas o sintéticas, conduce, opera o maniobra vehículo motorizado, será reprimido con pena privativa de la libertad no menor de seis meses ni mayor de dos años o con prestación de servicios comunitarios de cincuenta y dos a ciento cuatro jornadas e inhabilitación, conforme al artículo 36° inciso 7).
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            Cuando el agente presta servicios de transporte público de pasajeros, mercancías o carga en general, encontrándose en estado de ebriedad, con presencia de alcohol en la sangre en proporción superior de 0.25 gramos-litro, o bajo el efecto de drogas tóxicas, estupefacientes, sustancias psicotrópicas o sintéticas, la pena privativa de libertad será no menor de uno ni mayor de tres años o con prestación de servicios comunitarios de setenta a ciento cuarenta jornadas e inhabilitación conforme al artículo 36, inciso 7).
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "274-A",
                titulo: "Manipulación en estado de ebriedad o drogadicción",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            El que encontrándose en estado de ebriedad, con presencia de alcohol en la sangre en proporción mayor de 0.5 gramos-litro, o bajo el efecto de estupefacientes, drogas tóxicas, sustancias psicotrópicas o sintéticas, opera o maniobra instrumento, herramienta, máquina u otro análogo que represente riesgo o peligro, será reprimido con pena privativa de la libertad no menor de seis meses ni mayor de un año o treinta días-multa como mínimo a cincuenta días-multa como máximo e inhabilitación, conforme al artículo 36, inciso 4).
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "275",
                titulo: "Formas agravadas",
                texto: `
                        <div style="margin-bottom: 10px; text-align: justify; line-height: 1.5;">
                            La pena será privativa de libertad no menor de seis ni mayor de quince años cuando en la comisión del delito previsto en el artículo 273 concurre cualquiera de las siguientes circunstancias:
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">1.</span>
                            <div>Si hay peligro de muerte para las personas.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">2.</span>
                            <div>Si el incendio provoca explosión o destruye bienes de valor científico, histórico, artístico, cultural, religioso, asistencial, militar o de importancia económica.</div>
                        </div>
                        <div style="display: flex; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">3.</span>
                            <div>Si resultan lesiones graves o muerte y el agente pudo prever estos resultados.</div>
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "276",
                titulo: "Estragos especiales",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            El que causa estragos por medio de inundación, desmoronamiento, derrumbe o por cualquier otro medio análogo, será reprimido conforme a la pena señalada en los artículos 273° y 275°, según el caso.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "277",
                titulo: "Daños de obras para la defensa común",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            El que daña o inutiliza diques u obras destinadas a la defensa común contra desastres, perjudicando su función preventiva, o el que, para impedir o dificultar las tareas de defensa, sustrae, oculta, destruye o inutiliza materiales, instrumentos u otros medios destinados a la defensa común, será reprimido con pena privativa de libertad no menor de tres ni mayor de ocho años.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "278",
                titulo: "Formas culposas",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            El que, por culpa, ocasiona un desastre de los previstos en los artículos 273°, 275° y 276°, será reprimido con pena privativa de libertad no menor de uno ni mayor de tres años.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "279",
                titulo: "Fabricación, suministro o tenencia de materiales peligrosos y residuos peligrosos",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            El que, sin estar debidamente autorizado, fabrica, ensambla, modifica, almacena, suministra, comercializa, ofrece o tiene en su poder bombas, artefactos o materiales explosivos, inflamables, asfixiantes o tóxicos o sustancias o materiales destinados para su preparación, será reprimido con pena privativa de libertad no menor de seis ni mayor de quince años, e inhabilitación conforme al inciso 6 del artículo 36 del Código Penal.
                        </div>
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            Será sancionado con la misma pena el que presta o alquila, los bienes a los que se hacen referencia en el primer párrafo.
                        </div>
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            El que trafica con bombas, artefactos o materiales explosivos, inflamables, asfixiantes o tóxicos o sustancias o materiales destinados para su preparación, será reprimido con pena privativa de libertad no menor de seis ni mayor de quince años, e inhabilitación conforme al inciso 6 del artículo 36 del Código Penal.
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            El que, sin estar debidamente autorizado, transforma o transporta materiales y residuos peligrosos sólidos, líquidos, gaseosos u otros, que ponga en peligro la vida, salud, patrimonio público o privado y el medio ambiente, será sancionado con la misma pena que el párrafo anterior.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "279-A",
                titulo: "Producción, desarrollo y comercialización ilegal de armas químicas",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            El que produce, desarrolla, comercializa, almacena, vende, adquiere, usa o posee armas químicas, -contraviniendo las prohibiciones establecidas en la Convención sobre Armas Químicas adoptada por las Naciones Unidas en 1992- o las que transfiere a otro, o el que promueve, favorece o facilita que se realicen dichos actos será reprimido con pena privativa de libertad no menor de cinco ni mayor de veinte años.
                        </div>
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            El que ilegítimamente se dedique a la fabricación, importación, exportación, trasferencia, comercialización, intermediación, transporte, tenencia, ocultamiento, usurpación, porte y use ilícitamente armas, municiones, explosivos de guerra y otros materiales relacionados, será reprimido con pena privativa de libertad no menor de diez ni mayor de veinte años.
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            La pena será no menor de veinte ni mayor de treinta y cinco años si a consecuencia del empleo de las armas descritas en el párrafo precedente se causare la muerte o lesiones graves de la víctima o de terceras personas.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "279-B",
                titulo: "Sustracción o arrebato de armas de fuego",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            El que sustrae o arrebate armas de fuego en general, o municiones y granadas de guerra o explosivos a miembros de las Fuerzas Armadas o de la Policía Nacional o de Servicios de Seguridad, será reprimido con pena privativa de libertad no menor de diez ni mayor de veinte años.
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            La pena será de cadena perpetua si a consecuencia del arrebato o sustracción del arma o municiones a que se refiere el párrafo precedente, se causare la muerte o lesiones graves de la víctima o de terceras personas.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "279-C",
                titulo: "Tráfico de productos pirotécnicos",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            El que, sin estar debidamente autorizado, fabrica, importa, exporta, deposita, transporta, comercializa o usa productos pirotécnicos de cualquier tipo, o los que vendan estos productos a menores de edad, serán reprimidos con pena privativa de libertad no menor de cuatro ni mayor de ocho años, trescientos sesenta y cinco días-multa e inhabilitación conforme al inciso 4 del artículo 36 del Código Penal.
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            La pena será no menor de cinco ni mayor de diez años, si a causa de la fabricación, importación, depósito, transporte, comercialización y uso de productos pirotécnicos, se produjesen lesiones graves o muerte de personas.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "279-D",
                titulo: "Empleo, producción y transferencia de minas antipersonales",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            El que emplee, desarrolle, produzca, adquiera, almacene, conserve o transfiera a una persona natural o jurídica, minas antipersonales, será reprimido con pena privativa de libertad no menor de cinco ni mayor de ocho años.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "279-E",
                titulo: "Ensamblado, comercialización y utilización, en el servicio público, de transporte de ómnibus sobre chasis de camión",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            El que sin cumplir con la normatividad vigente y/o sin contar con la autorización expresa, que para el efecto expida la autoridad competente, realice u ordene realizar a sus subordinados la actividad de ensamblado de ómnibus sobre chasis originalmente diseñado y fabricado para el transporte de mercancías con corte o alargamiento del chasis, será reprimido con pena privativa de la libertad no menor de cinco (5) ni mayor de diez (10) años.
                        </div>
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            Si el agente comercializa los vehículos referidos en el primer párrafo o utiliza éstos en el servicio público de transporte de pasajeros, como transportista o conductor, la pena privativa de la libertad será no menor de cuatro (4) ni mayor de ocho (8) años y, según corresponda, inhabilitación para prestar el servicio de transporte o conducir vehículos del servicio de transporte por el mismo tiempo de la pena principal.
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            Si como consecuencia de las conductas a que se refieren el primer y segundo párrafos, se produce un accidente de tránsito con consecuencias de muerte o lesiones graves para los pasajeros o tripulantes del vehículo, la pena privativa de la libertad será no menor de diez (10) ni mayor de veinte (20) años, además de las penas accesorias que correspondan.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "279-F",
                titulo: "Uso de armas en estado de ebriedad o drogadicción",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            El que, en lugar público o poniendo en riesgo bienes jurídicos de terceros y teniendo licencia para portar arma de fuego, hace uso, maniobra o de cualquier forma manipula la misma en estado de ebriedad, con presencia de alcohol en la sangre en proporción mayor de 0.5 gramos-litro o bajo el efecto de estupefacientes, drogas tóxicas, sustancias psicotrópicas o sintéticas será sancionado con pena privativa de libertad no menor de un año ni mayor de tres años e inhabilitación conforme al artículo 36, inciso 6.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "279-G",
                titulo: "Fabricación, comercialización, uso o porte de armas",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            El que, sin estar debidamente autorizado, fabrica, ensambla, modifica, almacena, suministra, comercializa, trafica, usa, porta o tiene en su poder, de manera individual o compartida, armas de fuego de cualquier tipo, municiones, accesorios o materiales destinados para su fabricación o modificación, será reprimido con pena privativa de libertad no menor de ocho ni mayor de doce años.
                        </div>
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            Será sancionado con la misma pena el que presta, alquila o facilita, siempre que se evidencie la posibilidad de su uso para fines ilícitos, las armas o bienes a los que se hacen referencia en el primer párrafo. La pena privativa de libertad será no menor de diez ni mayor de quince años cuando las armas o bienes, dados en préstamo o alquiler, sean de propiedad del Estado.
                        </div>
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            En cualquier supuesto, si el agente es miembro de las Fuerzas Armadas, Policía Nacional del Perú, en actividad o en retiro, o del Instituto Nacional Penitenciario la pena será no menor de doce ni mayor de veinte años.
                        </div>
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            El que trafica armas de fuego artesanales o materiales destinados para su fabricación, será reprimido con pena privativa de libertad no menor de seis ni mayor de quince años.
                        </div>
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            Si el agente actúa en calidad de integrante de una organización criminal o banda criminal será reprimido con una pena privativa de libertad no menor de quince ni mayor a veinte años y con setecientos treinta y cinco a mil días-multa.
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            Para todos los supuestos se impondrá la inhabilitación conforme a los incisos 1), 2), 4) y 6) del artículo 36 del Código Penal, y adicionalmente el inciso 8) si es miembro de las Fuerzas Armadas o Policía Nacional del Perú, y con ciento ochenta a trescientos sesenta y cinco días-multa.
                        </div>`
            }
        ]
    },
    {
        titulo: ``,
        capitulo: `
                <div style="text-align: center; margin-top: 30px;">
                    <div style="margin-bottom: 15px;">CAPÍTULO II</div>
                    <div>DELITOS CONTRA LOS MEDIOS DE TRANSPORTE, COMUNICACIÓN Y OTROS SERVICIOS PÚBLICOS</div>
                </div>`,
        articulos: [
            {
                tipo: "Artículo",
                numero: "280",
                titulo: "Atentado contra los medios de transporte colectivo o de comunicación",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            El que, a sabiendas, ejecuta cualquier acto que pone en peligro la seguridad de naves, aeronaves, construcciones flotantes o de cualquier otro medio de transporte colectivo o de comunicación destinado al uso público, será reprimido con pena privativa de libertad no menor de tres ni mayor de seis años.
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            Si el hecho produce naufragio, varamiento, desastre, muerte o lesiones graves y el agente pudo prever estos resultados, la pena será no menor de ocho ni mayor de veinte años.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "280-A",
                titulo: "Suministro ilegal de servicios de telecomunicaciones en establecimientos penitenciarios y centros juveniles",
                texto: `
                        <div style="display: flex; margin-bottom: 15px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 65px;">280-A.1.</span>
                            <div>El que, con la finalidad de obtener un beneficio para sí o para tercero, organice, financie, instale, opere, mantenga, preste o comercialice servicios de telecomunicaciones que empleen medios alámbricos y/o inalámbricos, y/o, infraestructura necesaria para la prestación de dichos servicios, a sabiendas de que están dirigidos a permitir o facilitar comunicaciones ilegales de personas privadas de libertad en establecimientos penitenciarios o adolescentes internados en centros juveniles, es sancionado con pena privativa de libertad no menor de seis ni mayor de ocho años.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 10px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 65px;">280-A.2.</span>
                            <div>Es reprimido con pena privativa de libertad no menor de ocho ni mayor de diez años, e inhabilitación conforme a los numerales 1, 2, 4 y 12 del artículo 36 del Código Penal, cuando concurra cualquiera de las siguientes circunstancias agravantes:</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; margin-left: 65px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 30px;">a)</span>
                            <div>El agente actúa en condición de servidor o funcionario público bajo cualquier modalidad laboral o contractual.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; margin-left: 65px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 30px;">b)</span>
                            <div>El agente abusa de conocimientos técnicos especializados o de una relación laboral, contractual o funcional con empresas operadoras o contratistas vinculadas al sector de telecomunicaciones.</div>
                        </div>
                        <div style="display: flex; margin-left: 65px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 30px;">c)</span>
                            <div>Si el agente actúa en calidad de integrante de una banda criminal o de una organización criminal.</div>
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "281",
                titulo: "Atentado contra la seguridad común",
                texto: `
                        <div style="margin-bottom: 10px; text-align: justify; line-height: 1.5;">
                            Será reprimido con pena privativa de libertad no menor de seis ni mayor de diez años, el que crea un peligro para la seguridad común, realizando cualquiera de las conductas siguientes:
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 30px;">1.</span>
                            <div>Atenta contra fábricas, obras, infraestructura, instalaciones destinadas a la producción, transmisión, transporte, almacenamiento o provisión de saneamiento, electricidad, gas, hidrocarburos o sus productos derivados o telecomunicaciones.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 30px;">2.</span>
                            <div>Atenta contra la seguridad de los medios de telecomunicación pública o puestos al servicio de la seguridad de transportes destinados al uso público.</div>
                        </div>
                        <div style="display: flex; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 30px;">3.</span>
                            <div>Dificulta la reparación de los desperfectos en las fábricas, obras, infraestructura, instalaciones o equipos a que se refieren los incisos 1 y 2.</div>
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "282",
                titulo: "Forma culposa",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            El que, por culpa, ocasiona alguno de los hechos de peligro previstos en los artículos 280 y 281 será reprimido con pena privativa de libertad no mayor de dos años.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "283",
                titulo: "Entorpecimiento al funcionamiento de servicios públicos",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            El que, sin crear una situación de peligro común, impide, estorba o entorpece el normal funcionamiento del transporte o de los servicios públicos de telecomunicaciones, de saneamiento, de electricidad, de gas, de hidrocarburos o de sus productos derivados será reprimido con pena privativa de libertad no menor de cuatro ni mayor de seis años y con cien a ciento ochenta días-multa.
                        </div>
                        <div style="margin-bottom: 10px; text-align: justify; line-height: 1.5;">
                            Constituyen circunstancias agravantes los siguientes supuestos:
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 30px;">1.</span>
                            <div>Si en la ejecución de las conductas previstas en el primer párrafo el agente atenta contra la integridad física de las personas o causa grave daño a la propiedad pública o privada, será reprimido con pena privativa de la libertad no menor de seis ni mayor de ocho años y con ciento ochenta a trescientos sesenta y cinco días-multa.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 15px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 30px;">2.</span>
                            <div>Si las conductas recaen, causando grave daño, sobre recursos, infraestructuras y sistemas que son esenciales para desarrollar y mantener las capacidades nacionales vinculadas a servicios públicos conforme a la ley de la materia, será reprimido con pena privativa de la libertad no menor de ocho años ni mayor de diez años y con ciento ochenta a trescientos sesenta y cinco días-multa.</div>
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            Se aplica la pena de inhabilitación conforme a lo señalado en los numerales 1, 2 y 3 del artículo 36 del Código Penal para los supuestos agravantes.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "283-A",
                titulo: "Colaboración al delito de entorpecimiento del funcionamiento de servicios públicos",
                texto: `
                        <div style="margin-bottom: 10px; text-align: justify; line-height: 1.5;">
                            Será reprimido con pena privativa de libertad no menor de tres ni mayor a cinco años, el que de manera voluntaria realiza los siguientes actos de colaboración favoreciendo la comisión del delito de Entorpecimiento al funcionamiento de servicios públicos:
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 30px;">a)</span>
                            <div>Provee cualquier bien mueble, objeto o instrumento que, coadyuve o facilite las actividades ejecutivas de los agentes del delito de Entorpecimiento al funcionamiento de servicios públicos.</div>
                        </div>
                        <div style="display: flex; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 30px;">b)</span>
                            <div>Aporta recursos financieros o económicos para la adquisición de bienes muebles que coadyuven o faciliten las actividades de los agentes del delito de Entorpecimiento al funcionamiento de servicios públicos.</div>
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "284",
                titulo: "Abandono de servicio de transporte",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            El conductor, capitán, comandante, piloto, técnico, maquinista o mecánico de cualquier medio de transporte, que abandona su respectivo servicio antes del término del viaje, será reprimido con pena privativa de libertad no menor de uno ni mayor de cuatro años.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "285",
                titulo: "Sustitución o impedimento de funciones en medio de transporte",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            El que, mediante violencia, intimidación o fraude, sustituye o impide el cumplimiento de sus funciones al capitán, comandante o piloto de un medio de transporte, será reprimido con pena privativa de libertad no menor de uno ni mayor de cinco años.
                        </div>`
            }
        ]
    },
    {
        titulo: ``,
        capitulo: `
                <div style="text-align: center; margin-top: 30px;">
                    <div style="margin-bottom: 15px;">CAPÍTULO III</div>
                    <div>DELITOS CONTRA LA SALUD PÚBLICA</div>
                    <div style="margin-top: 20px; margin-bottom: 10px; font-weight: bold;">SECCIÓN I</div>
                    <div>CONTAMINACIÓN Y PROPAGACIÓN</div>
                </div>`,
        articulos: [
            {
                tipo: "Artículo",
                numero: "286",
                titulo: "Contaminación o adulteración de bienes o insumos destinados al uso o consumo humano y alteración de la fecha de vencimiento",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            El que contamina o adultera bienes o insumos destinados al uso o consumo humano, o altera la fecha de vencimiento de los mismos, será reprimido con pena privativa de libertad no menor de tres ni mayor de seis años.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "287",
                titulo: "Contaminación o adulteración de alimentos o bebidas y alteración de la fecha de vencimiento",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            El que contamina o adultera alimentos, bebidas o aguas destinadas al consumo humano, o altera la fecha de vencimiento de los mismos, será reprimido con pena privativa de libertad no menor de cuatro ni mayor de diez años.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "288",
                titulo: "Producción, comercialización o tráfico ilícito de alimentos y otros productos destinados al uso o consumo humano",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            El que produce, vende, pone en circulación, importa o toma en depósito alimentos, aguas, bebidas o bienes destinados al uso o consumo humano, a sabiendas de que son contaminados, falsificados o adulterados, será reprimido con pena privativa de libertad no menor de cuatro ni mayor de ocho años.
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            Cuando el agente actúa por culpa, la pena privativa de libertad será no mayor de dos años.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "288-A",
                titulo: "Comercialización ilegal de alcohol metílico",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            El que comercializa alcohol metílico, conociendo o presumiendo su uso para fines de consumo humano, será reprimido con pena privativa de libertad no menor de cuatro ni mayor de ocho años.
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            No es punible la comercialización de alcohol metílico para fines comprobadamente industriales o científicos.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "288-B",
                titulo: "Uso de productos tóxicos o peligrosos",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            El que fabrica, importa, distribuye o comercializa productos, pinturas con presencia y concentración de plomo y otros materiales de revestimiento o materiales tóxicos o peligrosos para la salud destinados al uso de menores de edad y otros consumidores, será reprimido con pena privativa de la libertad no menor de cuatro años ni mayor de ocho años.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "288-C",
                titulo: "Producción o comercialización de bebidas alcohólicas ilegales",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            El que produce o comercializa bebidas alcohólicas informales, adulteradas o no aptas para el consumo humano, según las definiciones señaladas en la Ley para Erradicar la Elaboración y Comercialización de Bebidas Alcohólicas Informales, Adulteradas o no Aptas para el Consumo Humano, será reprimido con pena privativa de libertad no menor de cuatro ni mayor de ocho años.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "289",
                titulo: "Propagación de enfermedad peligrosa o contagiosa",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            El que, a sabiendas, propaga una enfermedad peligrosa o contagiosa para la salud de las personas, será reprimido con pena privativa de libertad no menor de tres ni mayor de diez años.
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            Si resultan lesiones graves o muerte y el agente pudo prever estos resultados, la pena será no menor de diez ni mayor de veinte años.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "290",
                titulo: "Ejercicio ilegal de la medicina",
                texto: `
                        <div style="margin-bottom: 10px; text-align: justify; line-height: 1.5;">
                            Será reprimido con pena privativa de libertad no menor de un año ni mayor de cuatro años, el que simulando calidad de médico u otra profesión de las ciencias médicas, que sin tener título profesional, realiza cualquiera de las acciones siguientes:
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">1.</span>
                            <div>Anuncia, emite diagnósticos, prescribe, administra o aplica cualquier medio supuestamente destinado al cuidado de la salud, aunque obre de modo gratuito.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 15px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">2.</span>
                            <div>Expide dictámenes o informes destinados a sustentar el diagnóstico, la prescripción o la administración a que se refiere el inciso 1.</div>
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            La pena será no menor de dos ni mayor de cuatro años, si como consecuencia de las conductas referidas en los incisos 1 y 2 se produjera alguna lesión leve; y no menor de cuatro ni mayor de ocho años, si la lesión fuera grave en la víctima. En caso de muerte de la víctima, la pena privativa de la libertad será no menor de seis ni mayor de diez años.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "291",
                titulo: "Ejercicio malicioso y desleal de la medicina",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            El que, teniendo título, anuncia o promete la curación de enfermedades a término fijo o por medios secretos o infalibles, será reprimido con pena privativa de libertad no mayor de dos años o con prestación de servicio comunitario de veinte a cincuentidós jornadas.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "292",
                titulo: "Violación de medidas sanitarias",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            El que viola las medidas impuestas por la ley o por la autoridad para la introducción al país o la propagación de una enfermedad o epidemia o de una epizootía o plaga, será reprimido con pena privativa de libertad no menor de seis meses ni mayor de tres años y con noventa a ciento ochenta días-multa.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "293",
                titulo: "Venta de animales de consumo peligroso",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            El que, en lugares públicos, vende, preparados o no, animales alimentados con desechos sólidos, contraviniendo leyes, reglamentos o disposiciones establecidas, será reprimido con pena privativa de libertad no menor de uno ni mayor de cuatro años y ciento ochenta a trescientos sesenticinco días-multa.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "294",
                titulo: "Suministro infiel de productos farmacéuticos, dispositivos médicos o productos sanitarios",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            El que teniendo o no autorización para la venta de productos farmacéuticos, dispositivos médicos o productos sanitarios, a sabiendas, los entrega en especie, calidad o cantidad no correspondiente a la receta médica o distinta de la declarada o convenida, será reprimido con pena privativa de libertad no menor de dos ni mayor de cuatro años.
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            Lo dispuesto en el párrafo precedente no será aplicable cuando el químico farmacéutico proceda conforme a lo dispuesto en el segundo párrafo del artículo 32 de la Ley 29459, Ley de los Productos Farmacéuticos, Dispositivos Médicos y Productos Sanitarios.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "294-A",
                titulo: "Falsificación, contaminación o adulteración de productos farmacéuticos, dispositivos médicos o productos sanitarios",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            El que falsifica, contamina o adultera productos farmacéuticos, dispositivos médicos o productos sanitarios, o altera su fecha de vencimiento, será reprimido con pena privativa de libertad no menor de cuatro ni mayor de diez años y con ciento ochenta a trescientos sesenta y cinco días multa.
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            El que, a sabiendas, importa, comercializa, almacena, transporta o distribuye en las condiciones antes mencionadas productos farmacéuticos, dispositivos médicos o productos sanitarios, será reprimido con la misma pena.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "294-B",
                titulo: "Comercialización de productos farmacéuticos, dispositivos médicos o productos sanitarios sin garantía de buen estado",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            El que vende, importa o comercializa productos farmacéuticos, dispositivos médicos o productos sanitarios luego de producida su fecha de vencimiento, o el que para su comercialización los almacena, transporta o distribuye en esa condición, será reprimido con pena privativa de libertad no menor de cuatro ni mayor de ocho años y con ciento ochenta a trescientos sesenta y cinco días multa.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "294-C",
                titulo: "Agravantes",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            Cuando alguno de los delitos previstos en los artículos 286, 287, 288, 294, 294-A y 294-B ocasiona lesiones graves o la muerte y el agente pudo prever, la pena privativa de libertad será no menor de ocho ni mayor de quince años.
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            Si el agente en los delitos previstos en los artículos 294-A y 294-B tiene la condición de director técnico, o quien haga sus veces, de un establecimiento farmacéutico o establecimiento de salud, será también reprimido con inhabilitación conforme a los numerales 1, 2 y 4 del artículo 36.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "295",
                titulo: "Formas culposas",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            Cuando alguno de los delitos previstos en los artículos 286 a 289 se comete por culpa, la pena será privativa de libertad no mayor de dos años o de prestación de servicio comunitario de diez a treinta jornadas.
                        </div>`
            }
        ]
    },
    {
        titulo: ``,
        capitulo: `
                <div style="text-align: center; margin-top: 30px;">
                    <div style="margin-bottom: 10px; font-weight: bold;">SECCIÓN II</div>
                    <div>TRÁFICO ILÍCITO DE DROGAS</div>
                </div>`,
        articulos: [
            {
                tipo: "Artículo",
                numero: "296",
                titulo: "Promoción, favorecimiento o facilitamiento del consumo ilegal de drogas tóxicas",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            El que promueve, favorece o facilita el consumo ilegal de drogas tóxicas, sean estupefacientes, sustancias psicotrópicas o nuevas sustancias psicoactivas, mediante actos de fabricación o tráfico será reprimido con pena privativa de libertad no menor de ocho ni mayor de quince años y con ciento ochenta a trescientos sesenta y cinco días-multa, e inhabilitación conforme al artículo 36, incisos 1), 2) y 4).
                        </div>
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            El que posea drogas tóxicas, sean estupefacientes, sustancias psicotrópicas o nuevas sustancias psicoactivas, para usos ilegales, será reprimido con pena privativa de libertad no menor de seis ni mayor de doce años y con ciento veinte a ciento ochenta días-multa, e inhabilitación conforme al artículo 36, incisos 1) y 2).
                        </div>
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            El que introduce al país, produce, acopie, provee, comercialice o transporte materias primas o sustancias químicas controladas o no controladas, para ser destinadas a la elaboración ilegal de drogas tóxicas, sean estupefacientes, sustancias psicotrópicas o nuevas sustancias psicoactivas, en la maceración o en cualquiera de sus etapas de procesamiento, y/o promueva, facilite o financie dichos actos, será reprimido con pena privativa de libertad no menor de cinco ni mayor de diez años y con sesenta a ciento veinte días-multa, e inhabilitación conforme al artículo 36, incisos 1) y 2).
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            El que toma parte en una conspiración de dos o más personas para promover, favorecer o facilitar el tráfico ilícito de drogas, será reprimido con pena privativa de libertad no menor de cinco ni mayor de diez años y con sesenta a ciento veinte días-multa, e inhabilitación conforme al artículo 36, incisos 1) y 2).
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "296-A",
                titulo: "Comercialización y cultivo de amapola y marihuana y su siembra compulsiva",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            El que promueve, favorece, financia, facilita o ejecuta actos de siembra o cultivo de plantas de amapola o adormidera de la especie papaver somníferum o marihuana de la especie cannabis sativa será reprimido con pena privativa de libertad no menor de ocho años ni mayor de quince años y con ciento ochenta a trescientos sesenta y cinco días-multa e inhabilitación conforme al artículo 36, incisos 1), 2) y 4).
                        </div>
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            El que comercializa o transfiere semillas de las especies a que alude el párrafo anterior será reprimido con pena privativa de libertad no menor de cinco ni mayor de diez años y con ciento veinte a ciento ochenta días-multa, e inhabilitación conforme al artículo 36, incisos 1) y 2).
                        </div>
                        <div style="margin-bottom: 10px; text-align: justify; line-height: 1.5;">
                            La pena será privativa de libertad no menor de dos ni mayor de seis años y de noventa a ciento veinte días-multa cuando:
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">1.</span>
                            <div>La cantidad de plantas sembradas o cultivadas no exceda de cien.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 15px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">2.</span>
                            <div>La cantidad de semillas no exceda de la requerida para sembrar el número de plantas que señala el inciso precedente.</div>
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            Será reprimido con pena privativa de libertad no menor de veinticinco ni mayor de treinta y cinco años, e inhabilitación conforme al artículo 36, incisos 1) y 2), el que, mediante amenaza o violencia, obliga a otro a la siembra o cultivo o al procesamiento ilícito de plantas de coca, amapola o adormidera de la especie papaver somníferum, o marihuana de la especie cannabis sativa. Se excluye de los alcances de lo establecido en el presente artículo, la siembra o cultivo cuando se haya otorgado licencia para la investigación del cannabis y sus derivados, o para la comercialización o producción farmacológica o artesanal de los derivados del cannabis con fines medicinales y terapéuticos. De incumplirse con la finalidad de la licencia señalada, se deja sin efecto la presente exclusión. Será reprimido con la pena máxima más el cincuenta por ciento de la misma al funcionario público que otorga irregularmente la licencia o autorización referida.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "296-B",
                titulo: "Tráfico Ilícito de Insumos Químicos y Productos Fiscalizados",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            El que importa, exporta, fabrica, produce, prepara, elabora, transforma, almacena, posee, transporta, adquiere, vende o de cualquier modo transfiere insumos químicos o productos fiscalizados, contando con las autorizaciones o certificaciones respectivas, hace uso indebido de las mismas, para ser destinadas a la elaboración ilegal de drogas tóxicas, estupefacientes o sustancias psicotrópicas, en cualquier etapa de su procesamiento, será reprimido con pena privativa de libertad no menor de siete ni mayor de doce años y con ciento veinte a ciento ochenta días multa e inhabilitación conforme al artículo 36, incisos 1, 2 y 4.
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            El que, contando con las autorizaciones o certificaciones respectivas para realizar actividades con Insumos Químicos y Productos Fiscalizados en zona de producción cocalera, emite reportes, declaraciones, informes de obligatorio cumplimiento u otros similares, conteniendo datos de identidad falsos o simulados del destinatario, será reprimido con pena privativa de libertad no menor de cuatro ni mayor de ocho años y con ciento veinte a ciento ochenta días-multa e inhabilitación conforme al artículo 36, incisos 1, 2 y 4.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "296-C",
                titulo: "Penalización de la resiembra",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            El propietario, posesionario o tercero, que haciendo uso de cualquier técnica de cultivo, resiembre parcial o totalmente con arbusto de coca, semillas y/o almácigos, aquellos predios de coca erradicados por el Estado, será reprimidos con pena privativa de libertad no menor de 3 ni mayor de 8 años.
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            Serán decomisados a favor del Estado, los predios que total o parcialmente estuvieran cultivados ilegalmente con plantas de coca, semillas y/o almácigos en áreas del territorio nacional, cualquiera sea la técnica utilizada para su cultivo, y no procedieran sus propietarios o posesionarios a sustituirlos o erradicarlos.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "296-D",
                titulo: "Derogado",
                texto: `
                        <div style="text-align: justify; line-height: 1.5; color: #777; font-style: italic;">
                            Derogado conforme a la Ley 28002 del 17/06/2003.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "297",
                titulo: "Formas agravadas",
                texto: `
                        <div style="margin-bottom: 10px; text-align: justify; line-height: 1.5;">
                            La pena será privativa de libertad no menor de quince ni mayor de veinticinco años, de ciento ochenta a trescientos sesenta y cinco días-multa e inhabilitación conforme al artículo 36, incisos 1) , 2) , 4) , 5) y 8) cuando:
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">1.</span>
                            <div>El agente comete el hecho abusando del ejercicio de la función pública.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">2.</span>
                            <div>El agente tiene la profesión de educador o se desempeña como tal en cualquiera de los niveles de enseñanza.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">3.</span>
                            <div>El agente es médico, farmacéutico, químico, odontólogo o ejerce otra profesión sanitaria.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">4.</span>
                            <div>El hecho es cometido en el interior o en inmediaciones de un establecimiento de enseñanza, centro asistencial, de salud, recinto deportivo, lugar de detención o reclusión.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">5.</span>
                            <div>El agente vende drogas a menores de edad, o los utiliza para la venta o emplea a una persona inimputable.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">6.</span>
                            <div>El hecho es cometido por tres o más personas, o en calidad de integrante de una organización criminal dedicada al tráfico ilícito de drogas, o al desvío de sustancias químicas controladas o no controladas o de materias primas a que se refieren los Artículos 296 y 296-B.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 15px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">7.</span>
                            <div>La droga a comercializarse o comercializada excede las siguientes cantidades: veinte kilogramos de pasta básica de cocaína o sus derivados ilícitos, diez kilogramos de clorhidrato de cocaína, cinco kilogramos de látex de opio o quinientos gramos de sus derivados, y cien kilogramos de marihuana o dos kilogramos de sus derivados o quince gramos de éxtasis, conteniendo Metilendioxianfetamina – MDA, Metilendioximetanfetamina – MDMA, Metanfetamina o sustancias análogas, o tres miligramos de fentanilo o sus análogos.</div>
                        </div>
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            La pena será privativa de libertad no menor de veinticinco ni mayor de treinta y cinco años cuando el agente actúa como jefe, dirigente o cabecilla de una organización dedicada al tráfico ilícito de drogas o insumos para su elaboración.
                        </div>
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            Igual pena se aplicará al agente que se vale del tráfico ilícito de drogas para financiar actividades terroristas.
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            El agente será reprimido con pena privativa de libertad no menor de veinticinco ni mayor de treinta y cinco años si, como resultado de la comisión de actividades delictivas relacionadas al tráfico ilícito de drogas, vulnera o pretende vulnerar la vida, la integridad física o psíquica, la libertad personal o colectiva y la propiedad de una o más personas.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "298",
                titulo: "Formas atenuadas de elaboración, comercialización y posesión",
                texto: `
                        <div style="margin-bottom: 10px; text-align: justify; line-height: 1.5;">
                            La pena será privativa de libertad no menor de tres ni mayor de siete años y de ciento ochenta a trescientos sesenta días-multa cuando:
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">1.</span>
                            <div>La cantidad de droga tóxica elaborada, fabricada, extractada, preparada, comercializada, entregada a terceros o poseída para usos ilegales por el agente no sobrepase los cincuenta gramos de pasta básica de cocaína y derivados ilícitos, veinticinco gramos de clorhidrato de cocaína, cinco gramos de látex de opio o un gramo de sus derivados, cien gramos de marihuana o diez gramos de sus derivados o dos gramos de éxtasis, conteniendo Metilendioxianfetamina – MDA, Metilendioximetanfetamina – MDMA, Metanfetamina o sustancias análogas o hasta un miligramo de fentanilo.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">2.</span>
                            <div>Las materias primas o los insumos comercializados por el agente que no excedan de lo requerido para la elaboración de las cantidades de drogas señaladas en el inciso anterior.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 15px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">3.</span>
                            <div>Se comercialice o distribuya pegamentos sintéticos que expelen gases con propiedades psicoactivas, acondicionados para ser destinados al consumo humano por inhalación.</div>
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            La pena será privativa de libertad no menor de seis años ni mayor de diez años y de trescientos sesenta a setecientos días-multa cuando el agente ejecute el delito en las circunstancias previstas en los incisos 2, 3, 4, 5 o 6 del artículo 297 del Código Penal.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "299",
                titulo: "Posesión no punible",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            La posesión de droga tóxica no es punible, siempre que se encuentre destinada al propio e inmediato consumo, en cantidad que no exceda de cinco gramos de pasta básica de cocaína, dos gramos de clorhidrato de cocaína, ocho gramos de marihuana o dos gramos de sus derivados, un gramo de látex de opio o doscientos miligramos de sus derivados o doscientos cincuenta miligramos de éxtasis, conteniendo Metilendioxianfetamina – MDA, Metilendioximetanfetamina – MDMA, Metanfetamina o sustancias análogas.
                        </div>
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            Se excluye de los alcances de lo establecido en el párrafo precedente la posesión de dos o más tipos de drogas tóxicas, sean estupefacientes, sustancias psicotrópicas o nuevas sustancias psicoactivas.
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            Tampoco será punible la posesión del cannabis y sus derivados con fines medicinales y terapéuticos, siempre que la cantidad sea la necesaria para el tratamiento del paciente registrado en el Ministerio de Salud, supervisado por el Instituto Nacional de Salud y la DIGEMID, o de un tercero que se encuentre bajo su cuidado o tutela, o para investigación según las leyes sobre la materia y las disposiciones que establezca el ente rector.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "300",
                titulo: "Suministro indebido de droga",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            El médico, farmacéutico, químico, odontólogo u otro profesional sanitario que indebidamente receta, prescribe, administra o expende medicamento que contenga droga tóxica, estupefaciente o psicotrópica, será reprimido con pena privativa de libertad no menor de dos ni mayor de cinco años e inhabilitación conforme al artículo 36, incisos 1, 2 y 4; a excepción del cannabis y sus derivados, con fines medicinales o terapéuticos, que no es punible, siempre que se suministre a pacientes que se registren en el registro a cargo del Ministerio de Salud, constituido para tal fin.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "301",
                titulo: "Coacción al consumo de droga",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            El que, subrepticiamente, o con violencia o intimidación, hace consumir a otro una droga, será reprimido con pena privativa de libertad no menor de cinco ni mayor de ocho años y con noventa a ciento ochenta días-multa.
                        </div>
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            Si el delito se comete en agravio de menores de edad, personas con discapacidad, mujeres en estado de gravidez o adulto mayor, la pena será no menor de ocho ni mayor de doce años y de ciento ochenta a trescientos sesenticinco días-multa.
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            Si se produce afectación grave a la salud física o mental de la víctima, la pena será no menor de doce ni mayor de quince años.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "302",
                titulo: "Inducción o instigación al consumo de droga",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            El que instiga o induce a persona determinada para el consumo indebido de drogas, será reprimido con pena privativa de libertad, no menor de dos ni mayor de cinco años y noventa a ciento ochenta días-multa.
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            Si el agente actúa con propósito de lucro o si la víctima es persona manifiestamente inimputable, la pena será no menor de cinco ni mayor de ocho años y de ciento ochenta a trescientos sesenticinco días-multa.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "302-A",
                titulo: "Inhabilitación",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            La inhabilitación principal será de cinco a veinte años cuando se trate de los artículos 296; 296-A, primer, segundo y cuarto párrafos; 296B y 297 del Código Penal.
                        </div>
                        <div style="margin-bottom: 10px; text-align: justify; line-height: 1.5;">
                            En estos casos será perpetua cuando ocurra cualquiera de los siguientes supuestos:
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">1.</span>
                            <div>El agente actúe como integrante de una organización criminal, como persona vinculada o actúe por encargo de ella.</div>
                        </div>
                        <div style="display: flex; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">2.</span>
                            <div>El valor del dinero, bienes, efectos o ganancias involucrados supere las quinientas unidades impositivas tributarias.</div>
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "303",
                titulo: "Pena de expulsión",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            El extranjero que haya cumplido la pena privativa de libertad impuesta o se le haya concedido un beneficio penitenciario será expulsado del país, quedando prohibido su reingreso.
                        </div>`
            }
        ]
    },
    {
        titulo: ``,
        capitulo: `
                <div style="text-align: center; margin-top: 30px;">
                    <div style="margin-bottom: 15px;">CAPÍTULO IV</div>
                    <div>DELITOS CONTRA EL ORDEN MIGRATORIO</div>
                </div>`,
        articulos: [
            {
                tipo: "Artículo",
                numero: "303-A",
                titulo: "Tráfico ilícito de migrantes",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            El que promueve, favorece, financia o facilita el ingreso o reingreso ilegal o el tránsito irregular en el país de otra persona, con el fin de obtener directa o indirectamente, cualquier beneficio para sí o para tercero; será reprimido con pena privativa de la libertad no menor de 4 ni mayor de 6 años.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "303-B",
                titulo: "Formas agravadas del tráfico ilícito de migrantes",
                texto: `
                        <div style="margin-bottom: 10px; text-align: justify; line-height: 1.5;">
                            La pena será no menor de cinco ni mayor de ocho años de pena privativa de libertad e inhabilitación conforme al artículo 36° incisos 1, 2, 3, 4 y 5 del Código Penal, cuando:
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">1.</span>
                            <div>El agente comete el hecho abusando del ejercicio de la función pública.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">2.</span>
                            <div>El agente es promotor, integrante o representante de una organización social, tutelar o empresarial, que aprovecha de esta condición y actividades para perpetrar este delito.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">3.</span>
                            <div>Exista pluralidad de víctimas.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">4.</span>
                            <div>La víctima tiene entre catorce y menos de dieciocho años de edad, o es incapaz.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">5.</span>
                            <div>El hecho es cometido por dos o más personas.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 15px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">6.</span>
                            <div>El agente es cónyuge, conviviente, adoptante, tutor, curador, pariente hasta el cuarto grado de consanguinidad o segundo de afinidad, o tiene a la víctima a su cuidado por cualquier motivo o habitan en el mismo hogar.</div>
                        </div>
                        <div style="margin-bottom: 10px; text-align: justify; line-height: 1.5;">
                            La pena será privativa de libertad no menor de 25 años, cuando:
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">1.</span>
                            <div>Se produzca la muerte de la víctima, lesión grave que ponga en peligro la vida o la seguridad de los migrantes afectados;</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">2.</span>
                            <div>Las condiciones de transporte ponen en grave peligro su integridad física o psíquica.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">3.</span>
                            <div>La víctima es menor de catorce años o padece, temporal o permanentemente, de alguna discapacidad física o mental.</div>
                        </div>
                        <div style="display: flex; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">4.</span>
                            <div>El agente es parte de una organización criminal.</div>
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "303-C",
                titulo: "Reingreso Clandestino o Ilegal",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            El que, contando con sentencia condenatoria consentida o ejecutoriada o sanción administrativa firme, hiciere reingreso al territorio nacional de manera ilegal o eludiendo el control migratorio, será sancionado con pena privativa de la libertad no menor de 2 ni mayor de 4 años.
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            Cuando los extranjeros reingresen al territorio nacional, mediante alguna de las conductas señaladas en el párrafo anterior existiendo causales de impedimento o prohibición de ingreso será sancionado con pena privativa de la libertad no menor de 3 ni mayor de 6 años. El que reingresa al territorio peruano utilizando un documento de identidad o de viaje falso o faltando a la verdad en la información requerida por la autoridad para autorizar el ingreso o la salida, será sancionado con pena privativa de libertad no menor de 3 ni mayor de 7 años.
                        </div>`
            }
        ]
    },
    {
        titulo: `
                <div style="text-align: center; margin-top: 30px;">
                    <div style="margin-bottom: 15px;">TÍTULO XIII</div>
                    <div>DELITOS AMBIENTALES</div>
                </div>`,
        capitulo: `
                <div style="text-align: center; margin-top: 30px;">
                    <div style="margin-bottom: 15px;">CAPÍTULO I</div>
                    <div>DELITOS DE CONTAMINACIÓN</div>
                </div>`,
        articulos: [
            {
                tipo: "Artículo",
                numero: "304",
                titulo: "Contaminación del ambiente",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            El que, infringiendo leyes, reglamentos o límites máximos permisibles, provoque o realice descargas, emisiones, emisiones de gases tóxicos, emisiones de ruido, filtraciones, vertimientos o radiaciones contaminantes en la atmósfera, el suelo, el subsuelo, las aguas terrestres, marítimas o subterráneas, que cause o pueda causar perjuicio, alteración o daño grave al ambiente o sus componentes, la calidad ambiental o la salud ambiental, será reprimido con pena privativa de libertad no menor de cuatro años ni mayor de seis años y con cien a seiscientos días-multa.
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            Si el agente actuó por culpa, la pena será privativa de libertad no mayor de tres años o prestación de servicios comunitarios de cuarenta a ochenta jornadas.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "305",
                titulo: "Formas agravadas",
                texto: `
                        <div style="margin-bottom: 10px; text-align: justify; line-height: 1.5;">
                            La pena privativa de libertad será no menor de cuatro años ni mayor de siete años y con trescientos a mil días-multa si el agente incurre en cualquiera de los siguientes supuestos:
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">1.</span>
                            <div>Falsea u oculta información sobre el hecho contaminante, la cantidad o calidad de las descargas, emisiones, filtraciones, vertimientos o radiaciones contaminantes referidos en el artículo 304, a la autoridad competente o a la institución autorizada para realizar labores de fiscalización o auditoría ambiental.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">2.</span>
                            <div>Obstaculiza o impide la actividad fiscalizadora de auditoría ordenada por la autoridad administrativa competente.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">3.</span>
                            <div>Actúa clandestinamente en el ejercicio de su actividad.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 15px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">4.</span>
                            <div>Desactiva o deja inactivas las áreas, labores, e instalaciones de una unidad minera sin contar o sin cumplir el respectivo Plan de Cierre de Minas aprobado.</div>
                        </div>
                        <div style="margin-bottom: 10px; text-align: justify; line-height: 1.5;">
                            Si por efecto de la actividad contaminante se producen lesiones graves o muerte, la pena será:
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">1.</span>
                            <div>Privativa de libertad no menor de cinco años ni mayor de ocho años y con seiscientos a mil días-multa, en caso de lesiones graves.</div>
                        </div>
                        <div style="display: flex; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">2.</span>
                            <div>Privativa de libertad no menor de seis años ni mayor de diez años y con setecientos cincuenta a tres mil quinientos días-multa, en caso de muerte.</div>
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "306",
                titulo: "Incumplimiento de las normas relativas al manejo de residuos sólidos",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            El que, sin autorización o aprobación de la autoridad competente, establece un vertedero o botadero de residuos sólidos que pueda perjudicar gravemente la calidad del ambiente, la salud humana o la integridad de los procesos ecológicos, será reprimido con pena privativa de libertad no mayor de cuatro años.
                        </div>
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            Si el agente actuó por culpa, la pena será privativa de libertad no mayor de dos años.
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            Cuando el agente, contraviniendo leyes, reglamentos o disposiciones establecidas, utiliza desechos sólidos para la alimentación de animales destinados al consumo humano, la pena será no menor de tres años ni mayor de seis años y con doscientos sesenta a cuatrocientos cincuenta días-multa.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "307",
                titulo: "Tráfico ilegal de residuos peligrosos",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            El que ingrese ilegalmente al territorio nacional, use, emplee, coloque, traslade o disponga sin la debida autorización, residuos o desechos tóxicos o peligrosos para el ambiente, resultantes de un proceso de producción, extracción, transformación, utilización o consumo, será reprimido con pena privativa de libertad no menor de cuatro años ni mayor de seis años y con trescientos a cuatrocientos días-multa.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "307-A",
                titulo: "Delito de minería ilegal",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            El que realice actividad de exploración, extracción, explotación, beneficio u otra actividad minera según la ley de la materia, de recursos minerales metálicos o no metálicos, sin contar con la autorización de la entidad administrativa competente que cause o pueda causar perjuicio, alteración o daño al ambiente y sus componentes, la calidad ambiental o la salud ambiental, es reprimido con pena privativa de libertad no menor de cinco ni mayor de ocho años y con cien a seiscientos días-multa.
                        </div>
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            La misma pena será aplicada al que realice actividad de exploración, extracción, explotación, beneficio u otra actividad minera según la ley de la materia, de recursos minerales metálicos o no metálicos que se encuentre fuera del proceso de formalización, que cause o pueda causar perjuicio, alteración o daño al ambiente y sus componentes, la calidad ambiental o la salud ambiental.
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            Si el agente actuó por culpa, la pena será privativa de libertad, no mayor de tres o con prestación de servicios comunitarios de cuarenta a ochenta jornadas.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "307-B",
                titulo: "Formas agravadas",
                texto: `
                        <div style="margin-bottom: 10px; text-align: justify; line-height: 1.5;">
                            La pena será no menor de ocho años ni mayor de diez años y con trescientos a mil días-multa, cuando el delito previsto en el anterior artículo se comete en cualquiera de los siguientes supuestos:
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">1.</span>
                            <div>En zonas no permitidas para el desarrollo de actividad minera.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">2.</span>
                            <div>En áreas naturales protegidas, o en tierras de comunidades nativas, campesinas o indígenas.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">3.</span>
                            <div>Utilizando dragas, artefactos u otros instrumentos similares.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">4.</span>
                            <div>Si el agente emplea instrumentos u objetos capaces de poner en peligro la vida, la salud o el patrimonio de las personas.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">5.</span>
                            <div>Si se afecta sistemas de irrigación o aguas destinados al consumo humano.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">6.</span>
                            <div>Si el agente se aprovecha de su condición de funcionario o servidor público.</div>
                        </div>
                        <div style="display: flex; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">7.</span>
                            <div>Si el agente emplea para la comisión del delito a menores de edad u otra persona inimputable.</div>
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "307-C",
                titulo: "Delito de financiamiento de la minería ilegal",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            El que financia la comisión de los delitos previstos en los artículos 307°-A o sus formas agravadas, será reprimido con pena privativa de libertad no menor de cuatro años ni mayor de doce años y con cien a seiscientos días-multa.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "307-D",
                titulo: "Delito de obstaculización de la fiscalización administrativa",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            El que obstaculiza o impide la actividad de evaluación, control y fiscalización de la autoridad administrativa relacionada con la minería ilegal, será reprimido con pena privativa de la libertad no menor de cuatro años ni mayor de ocho años.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "307-E",
                titulo: "Tráfico ilícito de insumos químicos y maquinarias destinados a minería ilegal",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            El que, infringiendo las leyes y reglamentos, adquiere, vende, distribuye, comercializa, transporta, importa, posee o almacene insumos químicos, con el propósito de destinar dichos bienes a la comisión de los delitos de minería ilegal, es reprimido con pena privativa de la libertad no menor de seis años ni mayor de nueve años y con cien a seiscientos días-multa.
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            El que adquiere, vende, arrienda, transfiere o cede en uso bajo cualquier título, distribuye, comercializa, transporta, importa, posee o almacena maquinarias, a sabiendas de que serán destinadas a la comisión de los delitos de minería ilegal, es reprimido con pena privativa no menor de seis años ni mayor de nueve años y con cien a seiscientos días-multa.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "307-F",
                titulo: "Tráfico ilícito de recursos minerales provenientes de la minería ilegal",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            El que traslada, acopia, almacena, transporta, custodia, oculta, comercializa, adquiere, embarca, desembarca o exporta o tiene en su poder recursos minerales metálicos o no metálicos, provenientes de actividades mineras que se encuentren fuera del proceso de formalización minera integral o que no cuente con las autorizaciones administrativas correspondientes, cuyo origen ilícito, conoce o debía presumir, es reprimido con pena privativa de libertad no menor de seis años ni mayor de nueve años y con cien a seiscientos días-multa.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "307-G",
                titulo: "Inhabilitación",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            El agente de los delitos previstos en los artículos 307-A, 307-B, 307-C, 307-D, 307-E y 307-F, será además sancionado, de conformidad con el artículo 36, inciso 4, con la pena de inhabilitación para obtener, a nombre propio o a través de terceros, concesiones mineras, de labor general, de beneficio o transporte de minerales metálicos o no metálicos, así como para su comercialización, por un periodo igual al de la pena principal.
                        </div>`
            }
        ]
    },
    {
        titulo: ``,
        capitulo: `
                <div style="text-align: center; margin-top: 30px;">
                    <div style="margin-bottom: 15px;">CAPÍTULO II</div>
                    <div>DELITOS CONTRA LOS RECURSOS NATURALES</div>
                </div>`,
        articulos: [
            {
                tipo: "Artículo",
                numero: "308",
                titulo: "Tráfico ilegal de especies de flora y fauna silvestre",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            El que adquiere, vende, transporta, almacena, importa, exporta o reexporta productos o especímenes de especies de flora silvestre no maderable y/o fauna silvestre, sin un permiso o certificado válido, cuyo origen no autorizado conoce o puede presumir, será reprimido con pena privativa de libertad no menor de tres años ni mayor de cinco años y con ciento ochenta a cuatrocientos días-multa.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "308-A",
                titulo: "Tráfico ilegal de especies acuáticas de la flora y fauna silvestre",
                texto: `
                        <div style="margin-bottom: 10px; text-align: justify; line-height: 1.5;">
                            Será reprimido con pena privativa de libertad no menor de tres años ni mayor de cinco años y con ciento ochenta a cuatrocientos días-multa, el que adquiere, vende, transporta, almacena, importa, exporta o reexporta productos o especímenes de especies acuáticas de la flora y/o fauna silvestre bajo cualquiera de los siguientes supuestos:
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">1.</span>
                            <div>Sin un permiso, licencia o certificado válido.</div>
                        </div>
                        <div style="display: flex; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">2.</span>
                            <div>En épocas, cantidades, talla o zonas que son prohibidas o vedadas.</div>
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "308-B",
                titulo: "Extracción y procesamiento ilegal de especies acuáticas",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            El que extrae especies de flora o fauna acuática en épocas, cantidades, talla y zonas que son prohibidas o vedadas, o captura especies o las procesa sin contar con el respectivo permiso o licencia o exceda el límite de captura por embarcación, asignado por la autoridad administrativa competente y la ley de la materia, o lo hace excediendo el mismo o utiliza embarcaciones construidas sin autorización o sin licencia, métodos prohibidos o declarados ilícitos, será reprimido con pena privativa de libertad no menor de tres años ni mayor de cinco años y con ciento ochenta a cuatrocientos días-multa.
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            Se exceptúan de la aplicación de este artículo las capturas incidentales de especies y/o tamaños distintos a las autorizadas, en cualquier tipo de pesca y las que se encuentran en procesos de formalización, siempre que estas se realicen durante actividades y zonas permitidas, cumpliendo con las normas regulatorias pesqueras correspondientes.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "308-C",
                titulo: "Depredación de flora y fauna silvestre",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            El que caza, captura, colecta, extrae o posee productos, raíces o especímenes de especies de flora y/o fauna silvestre, sin contar con la concesión, permiso, licencia o autorización u otra modalidad de aprovechamiento o extracción, otorgada por la autoridad competente, será reprimido con pena privativa de libertad no menor de tres años ni mayor de cinco años y con cincuenta a cuatrocientos días-multa.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "308-D",
                titulo: "Tráfico ilegal de recursos genéticos",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            El que adquiere, vende, transporta, almacena, importa, exporta o reexporta, de forma no autorizada, recursos genéticos de especies de flora y/o fauna silvestre, incluyendo las acuáticas, será reprimido con pena privativa de libertad no menor de tres años ni mayor de cinco años y con ciento ochenta a cuatrocientos días-multa.
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            La misma pena será aplicable para el que a sabiendas financia, de modo que sin su cooperación no se hubiera podido cometer las actividades señaladas en el primer párrafo.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "308-E",
                titulo: "Construcción o modificación ilegal de embarcación pesquera",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            El que, infringiendo las leyes o los reglamentos, construye o hace construir una embarcación pesquera o modifica su capacidad de bodega, durante periodos de prohibición o sin contar con la autorización respectiva de la autoridad competente, será reprimido con pena privativa de libertad no menor de tres años ni mayor de cinco años y con ciento ochenta a cuatrocientos días-multa.
                        </div>
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            La misma pena será aplicable para el que, infringiendo las leyes o los reglamentos, adquiere, custodia, o transporta una embarcación pesquera, conociendo o pudiendo conocer que no cuenta con certificado válido o que ha sido construida o su capacidad de bodega ha sido modificada, durante periodos de prohibición o sin contar con la autorización respectiva.
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            La misma pena será aplicable para el que promueve o facilita la comisión de este delito mediante el financiamiento o la provisión de materiales, equipos o maquinaria para la modificación de la capacidad de bodega o para la construcción de una embarcación pesquera durante periodos de prohibición o a sabiendas de que no cuenta con la autorización respectiva de la autoridad competente.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "309",
                titulo: "Formas agravadas",
                texto: `
                        <div style="margin-bottom: 10px; text-align: justify; line-height: 1.5;">
                            En los casos previstos en los artículos 308, 308-A, 308-B, 308-C y 308-D, la pena privativa de libertad será no menor de cuatro años ni mayor de siete años cuando el delito se cometa bajo cualquiera de los siguientes supuestos:
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">1.</span>
                            <div>Cuando las especies, especímenes, productos o recursos genéticos, materia del ilícito penal, provienen de áreas naturales protegidas o de zonas vedadas para la extracción de flora y/o fauna silvestre, o territorios en posesión o propiedad de comunidades nativas o campesinas; o, de las reservas territoriales o reservas indígenas para pueblos indígenas en situación de aislamiento o de contacto inicial, según corresponda.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">2.</span>
                            <div>Mediante el uso de armas, explosivos o sustancias tóxicas.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">3.</span>
                            <div>Si el agente se aprovecha de su condición de funcionario o servidor público.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 15px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">4.</span>
                            <div>Cuando se trate de especies de flora y fauna silvestre o recursos genéticos protegidos por la legislación nacional.</div>
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            La pena privativa de libertad será no menor de once ni mayor de veinte años cuando el agente actúa como integrante de una organización criminal.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "310",
                titulo: "Delitos contra los bosques o formaciones boscosas",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            Será reprimido con pena privativa de libertad no menor de cuatro años ni mayor de seis años y con prestación de servicios comunitarios de cuarenta a ochenta jornadas el que, sin contar con permiso, licencia, autorización o concesión otorgada por autoridad competente, destruye, quema, daña o tala, en todo o en parte, bosques u otras formaciones boscosas, sean naturales o plantaciones.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "310-A",
                titulo: "Tráfico ilegal de productos forestales maderables",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            El que adquiere, acopia, almacena, transforma, transporta, oculta, custodia, comercializa, embarca, desembarca, importa, exporta o reexporta productos o especímenes forestales maderables, cuyo origen ilícito, conoce o puede presumir, será reprimido con pena privativa de libertad no menor de cuatro años ni mayor de siete años y con cien a seiscientos días-multa.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "310-B",
                titulo: "Obstrucción de procedimiento",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            El que obstruye, impide o traba una investigación, verificación, supervisión o auditoría, en relación con la extracción, transporte, transformación, venta, exportación, reexportación o importación de especímenes de flora y/o de fauna silvestre, será reprimido con pena privativa de libertad no menor de cuatro años ni mayor de siete años.
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            La pena será privativa de libertad no menor de cinco años ni mayor de ocho años para el que emplea intimidación o violencia contra un funcionario público o contra la persona que le presta asistencia, en el ejercicio de sus funciones.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "310-C",
                titulo: "Formas agravadas",
                texto: `
                        <div style="margin-bottom: 10px; text-align: justify; line-height: 1.5;">
                            En los casos previstos en los artículos 310, 310-A y 310-B, la pena privativa de libertad será no menor de ocho años ni mayor de diez años, bajo cualquiera de los siguientes supuestos:
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">1.</span>
                            <div>Si se comete el delito al interior de tierras en propiedad o posesión de comunidades nativas, comunidades campesinas, pueblos indígenas, reservas indígenas; o en reservas territoriales o reservas indígenas a favor de pueblos indígenas en contacto inicial o aislamiento voluntario, áreas naturales protegidas, zonas vedadas, concesiones forestales o áreas de conservación privadas debidamente reconocidas por la autoridad competente.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">2.</span>
                            <div>Si como consecuencia de la conducta prevista en los artículos correspondientes se afecten vertientes que abastecen de agua a centros poblados, sistemas de irrigación o se erosione el suelo haciendo peligrar las actividades económicas del lugar.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">3.</span>
                            <div>Si el autor o partícipe es funcionario o servidor público.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">4.</span>
                            <div>Si el delito se comete respecto de especímenes que han sido marcados para realizar estudios o han sido reservados como semilleros.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">5.</span>
                            <div>Si el delito se comete con el uso de armas, explosivo o similar.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">6.</span>
                            <div>Si el delito se comete con el concurso de dos o más personas.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">7.</span>
                            <div>Si el delito es cometido por los titulares de concesiones forestales.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 15px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">8.</span>
                            <div>Si se trata de productos o especímenes forestales maderables protegidos por la legislación nacional.</div>
                        </div>
                        <div style="margin-bottom: 10px; text-align: justify; line-height: 1.5;">
                            La pena privativa de libertad será no menor de diez años ni mayor de doce años cuando:
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">1.</span>
                            <div>El agente actúa como integrante de una organización criminal.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">2.</span>
                            <div>El autor causa lesiones graves o muerte durante la comisión del hecho delictivo o a consecuencia de dicho acto.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">3.</span>
                            <div>Si el hecho delictivo se realiza para cometer delitos tributarios, aduaneros y de lavados de activos.</div>
                        </div>
                        <div style="display: flex; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">4.</span>
                            <div>Financie o facilite la comisión de estos delitos.</div>
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "311",
                titulo: "Utilización indebida de tierras agrícolas",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            El que, sin la autorización de cambio de uso, utiliza tierras destinadas por autoridad competente al uso agrícola con fines de expansión urbana, de extracción o elaboración de materiales de construcción u otros usos específicos, será reprimido con pena privativa de libertad no menor de dos años ni mayor de cuatro años.
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            La misma pena será para el que vende u ofrece en venta, para fines urbanos u otro cualquiera, tierras zonificadas como uso agrícola.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "312",
                titulo: "Autorización de actividad contraria a los planes o usos previstos por la ley",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            El funcionario o servidor público que autoriza o se pronuncia favorablemente sobre un proyecto de urbanización para otra actividad no conforme con los planes o usos previstos por los dispositivos legales o el profesional que informa favorablemente, será reprimido con pena privativa de libertad no menor de dos años ni mayor de cuatro años e inhabilitación de un año a tres años conforme al artículo 36° incisos 1, 2 y 4.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "313",
                titulo: "Alteración del ambiente o paisaje",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            El que, contraviniendo las disposiciones de la autoridad competente, altera el ambiente natural o el paisaje urbano o rural, o modifica la flora o fauna, mediante la construcción de obras o tala de árboles, será reprimido con pena privativa de libertad no mayor de cuatro años y con sesenta a noventa días-multa.
                        </div>`
            }
        ]
    },
    {
        titulo: ``,
        capitulo: `
                <div style="text-align: center; margin-top: 30px;">
                    <div style="margin-bottom: 15px;">CAPÍTULO III</div>
                    <div>RESPONSABILIDAD FUNCIONAL E INFORMACIÓN FALSA</div>
                </div>`,
        articulos: [
            {
                tipo: "Artículo",
                numero: "314",
                titulo: "Responsabilidad de funcionario público por otorgamiento ilegal de derechos",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            El funcionario público que sin observar leyes, reglamentos, estándares ambientales vigentes, por haber faltado gravemente a sus obligaciones funcionales, autoriza el otorgamiento, renovación o cancelación de autorización, licencia, concesión, permiso u otro derecho habilitante en favor de la obra o actividad a que se refiere el presente Título, será reprimido con pena privativa de libertad no menor de cuatro años ni mayor de siete años, e inhabilitación de un año a siete años conforme al artículo 36 incisos 1, 2 y 4.
                        </div>
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            El servidor público que sin observar leyes, reglamentos, estándares ambientales vigentes se pronuncia favorablemente en informes u otro documento de gestión sobre el otorgamiento, renovación o cancelación de autorización, licencia, concesión, permiso u otro derecho habilitante en favor de la obra o actividad a que se refiere el presente Título, será reprimido con pena privativa de libertad no menor de cuatro años ni mayor de siete años, e inhabilitación de un año a siete años conforme al artículo 36 incisos 1, 2 y 4.
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            La misma pena será para el funcionario público competente para combatir las conductas descritas en el presente Título y que, por negligencia inexcusable o por haber faltado gravemente a sus obligaciones funcionales, facilite la comisión de los delitos previstos en el presente Título.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "314-A",
                titulo: "Responsabilidad de los representantes legales de las personas jurídicas",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            Los representantes legales de las personas jurídicas dentro de cuya actividad se cometan los delitos previstos en este Título serán responsables penalmente de acuerdo con las reglas establecidas en los artículos 23° y 27° de este Código.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "314-B",
                titulo: "Responsabilidad por información falsa contenida en informes",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            El que, conociendo o pudiendo presumir la falsedad o la inexactitud, suscriba, realice, inserte o hace insertar al procedimiento administrativo, estudios, evaluaciones, auditorías ambientales, planes de manejo forestal, solicitudes u otro documento de gestión forestal, exigido conforme a ley, en los que se incorpore o avale información falsa o inexacta, será reprimido con pena privativa de libertad no menor de cuatro años ni mayor de seis años, e inhabilitación de uno a seis años, conforme al inciso 2 y 4 del artículo 36.
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            Será reprimido con la misma pena todo aquel que, hace uso de un documento privado falso o falsificado o conteniendo información falsa como si fuese legítimo, con fines de evadir los procedimientos de control y fiscalización en materia forestal y de fauna silvestre relativos al presente Título, incluyendo los controles tributarios, aduaneros y otros.
                        </div>`
            }
        ]
    },
    {
        titulo: ``,
        capitulo: `
                <div style="text-align: center; margin-top: 30px;">
                    <div style="margin-bottom: 15px;">CAPÍTULO IV</div>
                    <div>MEDIDAS CAUTELARES Y EXCLUSIÓN O REDUCCIÓN DE PENAS</div>
                </div>`,
        articulos: [
            {
                tipo: "Artículo",
                numero: "314-C",
                titulo: "Medidas cautelares",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            Sin perjuicio de lo ordenado por la autoridad administrativa, el Juez dispondrá la suspensión inmediata de la actividad contaminante, extractiva o depredatoria, así como las otras medidas cautelares que correspondan.
                        </div>
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            En los delitos previstos en este Título, el Juez procederá a la incautación previa de los especímenes presuntamente ilícitos y de los aparatos o medios utilizados para la comisión del presunto ilícito. Asimismo, el Juez, a solicitud del Ministerio Público, ordenará el allanamiento o descerraje del lugar donde presuntamente se estuviere cometiendo el ilícito penal.
                        </div>
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            En caso de emitirse sentencia condenatoria, los especímenes ilícitos podrán ser entregados a una institución adecuada, según recomendación de la autoridad competente, y en caso de no corresponder, serán destruidos.
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            En ningún caso procederá la devolución de los ejemplares ilícitos al encausado.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "314-D",
                titulo: "Exclusión o reducción de penas",
                texto: `
                        <div style="margin-bottom: 10px; text-align: justify; line-height: 1.5;">
                            El que, encontrándose en una investigación fiscal o en el desarrollo de un proceso penal, proporcione información veraz, oportuna y significativa sobre la realización de un delito ambiental, podrá ser beneficiado en la sentencia con reducción de pena, tratándose de autores, y con exclusión de la misma para los partícipes, siempre y cuando la información proporcionada haga posible alguna de las siguientes situaciones:
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">1.</span>
                            <div>Evitar la comisión del delito ambiental en el que interviene.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">2.</span>
                            <div>Promover el esclarecimiento del delito ambiental en el que intervino.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">3.</span>
                            <div>La captura del autor o autores del delito ambiental, así como de los partícipes.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 15px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">4.</span>
                            <div>La desarticulación de organizaciones criminales vinculadas a la minería ilegal.</div>
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            El beneficio establecido en el presente artículo deberá ser concedido por los Jueces con criterio de objetividad y previa opinión del Ministerio Público.
                        </div>`
            }
        ]
    },
    {
        titulo: `
                <div style="text-align: center; margin-top: 30px;">
                    <div style="margin-bottom: 15px;">TÍTULO XIV</div>
                    <div>DELITOS CONTRA LA TRANQUILIDAD PÚBLICA</div>
                </div>`,
        capitulo: `
                <div style="text-align: center; margin-top: 30px;">
                    <div style="margin-bottom: 15px;">CAPÍTULO I</div>
                    <div>DELITOS CONTRA LA PAZ PÚBLICA</div>
                </div>`,
        articulos: [
            {
                tipo: "Artículo",
                numero: "315",
                titulo: "Disturbios",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            El que, en una reunión tumultuaria, atenta contra la integridad física de las personas y/o mediante violencia causa grave daño a la propiedad pública o privada será reprimido con pena privativa de libertad no menor de seis ni mayor de ocho años y con ciento ochenta a trescientos sesenta y cinco días-multa.
                        </div>
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            Será sancionado con la misma pena cuando los actos descritos en el primer párrafo se produzcan con ocasión de un espectáculo deportivo, o en el área de influencia deportiva.
                        </div>
                        <div style="margin-bottom: 10px; text-align: justify; line-height: 1.5;">
                            Constituyen circunstancias agravantes los siguientes supuestos:
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">1.</span>
                            <div>Si en estos actos el agente utiliza indebidamente prendas o símbolos distintivos de las Fuerzas Armadas o de la Policía Nacional del Perú, la pena privativa de la libertad será no menor de ocho ni mayor de diez años y con trecientos sesenta y cinco a quinientos días-multa.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">2.</span>
                            <div>Si el atentado contra la integridad física de las personas causa lesiones graves, será reprimido con la pena privativa de la libertad no menor de ocho ni mayor de doce años y con trecientos sesenta y cinco a seiscientos días-multa.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">3.</span>
                            <div>Si se afecta vías terrestres nacionales, departamentales, locales y fluviales; infraestructura portuaria; infraestructura, para la generación, transmisión y distribución de energía; infraestructura para la extracción, procesamiento, transporte, almacenamiento y distribución de hidrocarburos líquidos, gas natural, otros derivados de petróleo y recursos mineros; infraestructura ferroviaria, aeroportuaria; y, las destinadas para el servicio de navegación aérea, para los servicios de agua, saneamiento, salud pública, telecomunicaciones, sanidad agropecuaria e inocuidad agroalimentaria, infraestructura física y de tecnologías de la información del sistema satelital, registro civil, migratorio, registral, cartográfico, policial, militar, penitenciario, meteorológico, defensa civil, financiero y tributario; bienes culturales muebles e inmuebles integrantes del Patrimonio Cultural de la Nación, será reprimido con pena privativa de la libertad no menor de diez ni mayor de quince años y con trecientos sesenta y cinco a mil días-multa.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 15px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">4.</span>
                            <div>Si el atentado contra la integridad física de las personas causa la muerte, será reprimido con pena privativa de la libertad no menor de quince años y con trecientos sesenta y cinco a mil días-multa.</div>
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            En todos los casos, se impondrá, además, la pena de inhabilitación conforme a lo señalado en los incisos 1, 2 y 3 del artículo 36.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "315-A",
                titulo: "Delito de grave perturbación de la tranquilidad pública",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            El que perturbe gravemente la paz pública usando cualquier medio razonable capaz de producir alarma, será sancionado con pena privativa de libertad no menor de tres ni mayor de seis años.
                        </div>
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            Se considera perturbación grave a todo acto por el cual se difunda o ponga en conocimiento de la autoridad pública, medios de comunicación social o de cualquier otro por el cual pueda difundirse masivamente la noticia, la inminente realización de un hecho o situación falsa o inexistente, relacionado con un daño o potencial daño a la vida e integridad de las personas o de bienes públicos o privados.
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            Si el agente actúa en calidad de integrante de una organización criminal que, para lograr sus fines, cualesquiera que sean, utiliza como medio la amenaza de la comisión del delito de terrorismo, será sancionado con pena privativa de libertad no menor de seis ni mayor de diez años.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "315-B",
                titulo: "Colaboración al delito de disturbios",
                texto: `
                        <div style="margin-bottom: 10px; text-align: justify; line-height: 1.5;">
                            Será reprimido con pena privativa de libertad no menor de cuatro ni mayor a seis años, el que de manera voluntaria realiza los siguientes actos de colaboración favoreciendo la comisión del delito de disturbios:
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 30px;">a)</span>
                            <div>Provee cualquier bien mueble, objeto o instrumento que, específicamente coadyuve o facilite las actividades de los agentes del delito de disturbios.</div>
                        </div>
                        <div style="display: flex; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 30px;">b)</span>
                            <div>Aporta recursos financieros o económicos para la adquisición de bienes muebles que coadyuven o faciliten las actividades de los agentes del delito de disturbios.</div>
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "316",
                titulo: "Apología",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            El que públicamente exalta, justifica o enaltece un delito o a la persona condenada por sentencia firme como autor o partícipe, será reprimido con pena privativa de libertad no menor de un año ni mayor de cuatro años.
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            Si la exaltación, justificación o enaltecimiento se hace de delito previsto en los artículos 152 al 153-A, 200, 273 al 279-D, 296 al 298, 315, 317, 318-A, 325 al 333, 346 al 350 o de los delitos de lavado de activos, o de la persona que haya sido condenada por sentencia firme como autor o partícipe, la pena será no menor de cuatro años ni mayor de seis años, doscientos cincuenta días multa, e inhabilitación conforme a los incisos 2, 4 y 8 del artículo 36 del Código Penal.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "316-A",
                titulo: "Apología del delito de terrorismo",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            Si la exaltación, justificación o enaltecimiento se hace del delito de terrorismo o de cualquiera de sus tipos, o de la persona que haya sido condenada por sentencia firme como autor o partícipe, la pena será no menor de cuatro años ni mayor de ocho años, trescientos días multa e inhabilitación conforme a los incisos 2, 4, 6 y 8 del artículo 36 del Código Penal.
                        </div>
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            Si la exaltación, justificación o enaltecimiento del delito de terrorismo se realiza: a) en ejercicio de la condición de autoridad, docente o personal administrativo de una institución educativa, o b) utilizando o facilitando la presencia de menores de edad, la pena será no menor de seis años ni mayor de diez años e inhabilitación, conforme a los incisos 1, 2, 4 y 9 del artículo 36 del Código Penal.
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            Si la exaltación, justificación o enaltecimiento se propaga mediante objetos, libros, escritos, imágenes visuales o audios, o se realiza a través de imprenta, radiodifusión u otros medios de comunicación social o mediante el uso de tecnologías de la información o de la comunicación, del delito de terrorismo o de la persona que haya sido condenada por sentencia firme como autor o partícipe de actos de terrorismo, la pena será no menor de ocho años ni mayor de quince años e inhabilitación, conforme a los incisos 1, 2, 4 y 9 del artículo 36 del Código Penal.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "317",
                titulo: "Organización criminal",
                texto: `
                        <div style="display: flex; margin-bottom: 15px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 50px;">317.1.</span>
                            <div>El que organice, constituya o integre una organización criminal será reprimido con pena privativa de libertad no menor de ocho ni mayor de quince años y con ciento ochenta a trescientos sesenta y cinco días-multa, e inhabilitación conforme al artículo 36, numerales 1), 2), 4) y 8).</div>
                        </div>
                        <div style="display: flex; margin-bottom: 15px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 50px;">317.2.</span>
                            <div>Se considera organización criminal a todo grupo con compleja estructura desarrollada y mayor capacidad operativa compuesto por tres o más personas con carácter permanente o por tiempo indefinido que, de manera concertada y coordinada, se reparten roles correlacionados entre sí, para la comisión de delitos de extorsión, secuestro, sicariato y otros delitos sancionados con pena privativa de libertad igual o mayor de cinco años en su extremo mínimo, con el fin de obtener, directa o indirectamente, un beneficio económico u otro de orden material.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 10px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 50px;">317.3.</span>
                            <div>La pena será no menor de quince ni mayor de veinte años y con ciento ochenta a trescientos sesenta y cinco días-multa, e inhabilitación conforme al artículo 36, numerales 1), 2), 4) y 8) en los siguientes supuestos:</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; margin-left: 50px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 30px;">a)</span>
                            <div>Cuando el agente tiene la condición de líder, jefe, financista o dirigente de la organización criminal. Cuando producto del accionar delictivo de la organización criminal, cualquiera de sus miembros causa la muerte de una persona o le causa lesiones graves a su integridad física o mental.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; margin-left: 50px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 30px;">b)</span>
                            <div>Cuando el agente se identifique, haga uso o se valga de marcas, señales, objetos, códigos, nombre o seudónimo de una organización criminal nacional, internacional o trasnacional, con fines de intimidación, prevalencia o hegemonía de la actividad criminal a la que se dedica.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; margin-left: 50px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 30px;">c)</span>
                            <div>Cuando los integrantes o la comisión de los delitos graves o los beneficios obtenidos por la organización criminal tienen carácter trasnacional.</div>
                        </div>
                        <div style="display: flex; margin-left: 50px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 30px;">d)</span>
                            <div>Cuando el agente ha desarrollado la actividad criminal de la organización criminal desde un establecimiento penitenciario y/o a través de cualquier tecnología de la información o de la comunicación o cualquier otro medio análogo.</div>
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "317-A",
                titulo: "Marcaje o reglaje",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            Será reprimido con pena privativa de libertad no menor de tres ni mayor de seis años el que para cometer o facilitar la comisión de cualquiera de los delitos previstos en los artículos 106, 107, 108, 108-A, 121, 152, 153, 170, 171, 172, 173, 173-A, 175, 176, 176-A, 177, 185, 186, 188, 189 o 200 del Código Penal, acopia o entrega información, realiza vigilancia o seguimiento, o colabora en la ejecución de tales conductas mediante el uso de armas, vehículos, teléfonos u otros instrumentos idóneos.
                        </div>
                        <div style="margin-bottom: 10px; text-align: justify; line-height: 1.5;">
                            La pena privativa de libertad será no menor de seis ni mayor de diez años cuando el agente:
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">1.</span>
                            <div>Es funcionario o servidor público y aprovecha su cargo para la comisión del delito.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">2.</span>
                            <div>Mantiene o mantuvo vínculo laboral con la víctima u otro vínculo que la impulse a esta última a depositar su confianza en el agente.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">3.</span>
                            <div>Utilice a un menor de edad.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">4.</span>
                            <div>Labora, pertenece o está vinculado a una empresa del sistema financiero y, por razón de su cargo u oficio, tiene conocimiento de los ingresos económicos, operaciones bancarias u otros datos sobre el patrimonio de la víctima.</div>
                        </div>
                        <div style="display: flex; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">5.</span>
                            <div>Actúa en condición de integrante de una organización criminal.</div>
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "317-B",
                titulo: "Banda Criminal",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            El que constituya o integre una unión de dos a más personas; que sin reunir alguna o algunas de las características de la organización criminal dispuestas en el artículo 317, tenga por finalidad o por objeto la comisión de delitos concertadamente; será reprimido con una pena privativa de libertad de no menor de cuatro ni mayor de ocho años y con ciento ochenta a trescientos sesenta y cinco días-multa.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "318",
                titulo: "Ofensas a la memoria de los muertos",
                texto: `
                        <div style="margin-bottom: 10px; text-align: justify; line-height: 1.5;">
                            Será reprimido con pena privativa de libertad no mayor de dos años:
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">1.</span>
                            <div>El que profana el lugar en que reposa un muerto o públicamente lo ultraja.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">2.</span>
                            <div>El que turba un cortejo fúnebre.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 15px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">3.</span>
                            <div>El que sustrae un cadáver o una parte del mismo o sus cenizas o lo exhuma sin la correspondiente autorización.</div>
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            En el supuesto previsto en el inciso 3 del presente artículo, cuando el acto se comete con fines de lucro, la pena será privativa de libertad no menor de dos años ni mayor de cuatro años e inhabilitación conforme a los incisos 1, 2 y 4 del artículo 36 del Código Penal.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "318-A",
                titulo: "Delito de intermediación onerosa de órganos y tejidos",
                texto: `
                        <div style="text-align: justify; line-height: 1.5; color: #777; font-style: italic;">
                           Trasladado al art. 129-P (Ley 31146 del 30/03/2021).
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "318-B",
                titulo: "Delito de criminalidad sistemática",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            El que mediante el uso de municiones, armamento de fuego militar o civil, artefactos explosivos u otros de similar características, provoque o realice conductas tipificadas como delitos de secuestro, extorsión, sicariato, homicidio calificado y robo agravado, creando zozobra o terror en la población o una parte de ella; será reprimido con cadena perpetua.
                        </div>`
            }
        ]
    },
    {
        titulo: ``,
        capitulo: `
                <div style="text-align: center; margin-top: 30px;">
                    <div style="margin-bottom: 5px;">CAPÍTULO II</div>
                    <div>TERRORISMO</div>
                    <div style="font-size: 0.9em; color: #777; font-style: italic; margin-top: 5px;">Derogado conforme al D-L 25475 del 06/05/1992</div>
                </div>`,
    },
    {
        titulo: `
                <div style="text-align: center; margin-top: 30px;">
                    <div style="margin-bottom: 15px;">TÍTULO XIV-A</div>
                    <div>DELITOS CONTRA LA HUMANIDAD</div>
                </div>`,
        capitulo: `
                <div style="text-align: center; margin-top: 30px;">
                    <div style="margin-bottom: 15px;">CAPÍTULO I</div>
                    <div>GENOCIDIO</div>
                </div>`,
        articulos: [
            {
                tipo: "Artículo",
                numero: "319",
                titulo: "Genocidio-Modalidades",
                texto: `
                        <div style="margin-bottom: 10px; text-align: justify; line-height: 1.5;">
                            Será reprimido con pena privativa de libertad no menor de veinte años el que, con la intención de destruir, total o parcialmente, a un grupo nacional, étnico, social o religioso, realiza cualquiera de los actos siguientes:
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">1.</span>
                            <div>Matanza de miembros del grupo.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">2.</span>
                            <div>Lesión grave a la integridad física o mental a los miembros del grupo.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">3.</span>
                            <div>Sometimiento del grupo a condiciones de existencia que hayan de acarrear su destrucción física de manera total o parcial.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">4.</span>
                            <div>Medidas destinadas a impedir los nacimientos en el seno del grupo.</div>
                        </div>
                        <div style="display: flex; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">5.</span>
                            <div>Transferencia forzada de niños a otro grupo.</div>
                        </div>`
            }
        ]
    },
    {
        titulo: ``,
        capitulo: `
                <div style="text-align: center; margin-top: 30px;">
                    <div style="margin-bottom: 15px;">CAPÍTULO II</div>
                    <div>DESAPARICIÓN FORZADA</div>
                </div>`,
        articulos: [
            {
                tipo: "Artículo",
                numero: "320",
                titulo: "Desaparición forzada de personas",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            El funcionario o servidor público, o cualquier persona con el consentimiento o aquiescencia de aquel, que de cualquier forma priva a otro de su libertad y se haya negado a reconocer dicha privación de libertad o a dar información cierta sobre el destino o el paradero de la víctima, es reprimido con pena privativa de libertad no menor de quince ni mayor de treinta años e inhabilitación conforme al artículo 36 incisos 1) y 2).
                        </div>
                        <div style="margin-bottom: 10px; text-align: justify; line-height: 1.5;">
                            La pena privativa de libertad es no menor de treinta ni mayor de treinta y cinco años, e inhabilitación conforme al artículo 36 incisos 1) y 2), cuando la víctima:
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">a)</span>
                            <div>Tiene menos de dieciocho años o es mayor de sesenta años de edad.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">b)</span>
                            <div>Padece de cualquier tipo de discapacidad.</div>
                        </div>
                        <div style="display: flex; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">c)</span>
                            <div>Se encuentra en estado de gestación.</div>
                        </div>`
            }
        ]
    },
    {
        titulo: ``,
        capitulo: `
                <div style="text-align: center; margin-top: 30px;">
                    <div style="margin-bottom: 15px;">CAPÍTULO III</div>
                    <div>TORTURA</div>
                </div>`,
        articulos: [
            {
                tipo: "Artículo",
                numero: "321",
                titulo: "Tortura",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            El funcionario o servidor público, o cualquier persona con el consentimiento o aquiescencia de aquel, que inflige dolores o sufrimientos graves, sean físicos o mentales, a otra persona o la somete a cualquier método tendente a menoscabar su personalidad o disminuir su capacidad mental o física, es reprimido con pena privativa de libertad no menor de ocho ni mayor de catorce años.
                        </div>
                        <div style="margin-bottom: 10px; text-align: justify; line-height: 1.5;">
                            La pena privativa de libertad es no menor de quince ni mayor de veinte años, cuando la víctima:
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 30px;">a.</span>
                            <div>Resulte con lesión grave.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 30px;">b.</span>
                            <div>Tiene menos de dieciocho años o es mayor de sesenta años de edad.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 30px;">c.</span>
                            <div>Padece de cualquier tipo de discapacidad.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 30px;">d.</span>
                            <div>Se encuentra en estado de gestación.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 15px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 30px;">e.</span>
                            <div>Se encuentra detenida o recluida, y el agente abusa de su condición de autoridad para cometer el delito.</div>
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            Si se produce la muerte de la víctima y el agente pudo prever ese resultado, la pena privativa de libertad es no menor de veinte ni mayor de veinticinco años.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "322",
                titulo: "Cooperación de profesional",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            El médico o cualquier profesional sanitario que cooperara en la perpetración del delito señalado en el artículo anterior, será reprimido con la misma pena de los autores.
                        </div>`
            }
        ]
    },
    {
        titulo: ``,
        capitulo: `
                <div style="text-align: center; margin-top: 30px;">
                    <div style="margin-bottom: 15px;">CAPÍTULO IV</div>
                    <div>DISCRIMINACIÓN</div>
                </div>`,
        articulos: [
            {
                tipo: "Artículo",
                numero: "323",
                titulo: "Discriminación e incitación a la discriminación",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            El que, por sí o mediante terceros, realiza actos de distinción, exclusión, restricción o preferencia que anulan o menoscaban el reconocimiento, goce o ejercicio de cualquier derecho de una persona o grupo de personas reconocido en la ley, la Constitución o en los tratados de derechos humanos de los cuales el Perú es parte, basados en motivos raciales, religiosos, nacionalidad, edad, sexo, orientación sexual, identidad de género, idioma, identidad étnica o cultural, opinión, nivel socio económico, condición migratoria, discapacidad, condición de salud, factor genético, filiación, o cualquier otro motivo, será reprimido con pena privativa de libertad no menor de dos ni mayor de tres años, o con prestación de servicios a la comunidad de sesenta a ciento veinte jornadas.
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            Si el agente actúa en su calidad de servidor civil, o se realiza el hecho mediante actos de violencia física o mental, a través de internet u otro medio análogo, la pena privativa de libertad será no menor de dos ni mayor de cuatro años e inhabilitación conforme a los numerales 1 y 2 del artículo 36.
                        </div>`
            }
        ]
    },
    {
        titulo: ``,
        capitulo: `
                <div style="text-align: center; margin-top: 30px;">
                    <div style="margin-bottom: 15px;">CAPÍTULO V</div>
                    <div>MANIPULACIÓN GENÉTICA</div>
                </div>`,
        articulos: [
            {
                tipo: "Artículo",
                numero: "324",
                titulo: "Manipulación Genética",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            Toda persona que haga uso de cualquier técnica de manipulación genética con la finalidad de clonar seres humanos, será reprimido con pena privativa de la libertad no menor de seis ni mayor de ocho años e inhabilitación conforme al Artículo 36°, incisos 4 y 8.
                        </div>`
            }
        ]
    },
    {
        titulo: `
                <div style="text-align: center; margin-top: 30px;">
                    <div style="margin-bottom: 15px;">TÍTULO XV</div>
                    <div>DELITOS CONTRA EL ESTADO Y LA DEFENSA NACIONAL</div>
                </div>`,
        capitulo: `
                <div style="text-align: center; margin-top: 30px;">
                    <div style="margin-bottom: 15px;">CAPÍTULO I</div>
                    <div>ATENTADOS CONTRA LA SEGURIDAD NACIONAL Y TRAICIÓN A LA PATRIA</div>
                </div>`,
        articulos: [
            {
                tipo: "Artículo",
                numero: "325",
                titulo: "Atentado contra la integridad nacional",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            El que practica un acto dirigido a someter a la República, en todo o en parte, a la dominación extranjera o a hacer independiente una parte de la misma, será reprimido con pena privativa de libertad no menor de quince años.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "326",
                titulo: "Participación en grupo armado dirigido por extranjero",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            El que forma parte de un grupo armado dirigido o asesorado por extranjero, organizado dentro o fuera del país, para actuar en el territorio nacional, será reprimido con pena privativa de libertad no menor de seis ni mayor de diez años.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "327",
                titulo: "Destrucción o alteración de hitos fronterizos",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            El que destruye o altera las señales que marcan los límites del territorio de la República o hace que éstos se confundan, será reprimido con pena privativa de libertad no menor de cinco ni mayor de diez años.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "328",
                titulo: "Formas agravadas",
                texto: `
                        <div style="margin-bottom: 10px; text-align: justify; line-height: 1.5;">
                            Será reprimido con pena privativa de libertad no menor de cinco años el que realiza cualquiera de las acciones siguientes:
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">1.</span>
                            <div>Acepta del invasor un empleo, cargo o comisión o dicta providencias encaminadas a afirmar al gobierno del invasor.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">2.</span>
                            <div>Celebra o ejecuta con algún Estado, sin cumplir las disposiciones constitucionales, tratados o actos de los que deriven o puedan derivar una guerra con el Perú.</div>
                        </div>
                        <div style="display: flex; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">3.</span>
                            <div>Admite tropas o unidades de guerra extranjeras en el país.</div>
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "329",
                titulo: "Inteligencia desleal con Estado extranjero",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            El que entra en inteligencia con los representantes o agentes de un Estado extranjero, con el propósito de provocar una guerra contra la República, será reprimido con pena privativa de libertad no menor de veinte años.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "330",
                titulo: "Revelación de secretos nacionales",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            El que revela o hace accesible a un Estado extranjero o a sus agentes o al público, secretos que el interés de la República exige guardarlos, será reprimido con pena privativa de libertad no menor de cinco ni mayor de quince años.
                        </div>
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            Si el agente obra por lucro o por cualquier otro móvil innoble, la pena será no menor de diez años.
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            Cuando el agente actúa por culpa, la pena será no mayor de cuatro años.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "331",
                titulo: "Espionaje",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            El que espía para comunicar o comunica o hace accesibles a un Estado extranjero o al público, hechos, disposiciones u objetos mantenidos en secreto por interesar a la defensa nacional, será reprimido con pena privativa de libertad no menor de quince años.
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            Si el agente obró por culpa la pena será no mayor de cinco años.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "331-A",
                titulo: "Derogado",
                texto: `
                        <div style="text-align: justify; line-height: 1.5; color: #777; font-style: italic;">
                            Derogado conforme a la Ley 25399 del 10/02/1992.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "332",
                titulo: "Favorecimiento bélico a Estado extranjero-Favorecimiento agravado",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            El que entrega a un Estado extranjero bienes destinados a la defensa nacional o le favorece mediante servicios o socorros que pueda debilitarla, será reprimido con pena privativa de libertad no menor de quince años.
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            Si el agente actúa por lucro o por cualquier otro móvil innoble la pena será no menor de veinte años.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "333",
                titulo: "Provocación pública a la desobediencia militar",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            El que provoca públicamente a la desobediencia de una orden militar o a la violación de los deberes propios del servicio o al rehusamiento o deserción, será reprimido con pena privativa de libertad no mayor de cuatro años.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "334",
                titulo: "Derogado",
                texto: `
                        <div style="text-align: justify; line-height: 1.5; color: #777; font-style: italic;">
                            Derogado conforme a la Ley 29460 del 27/11/2009.
                        </div>`
            }
        ]
    },
    {
        titulo: ``,
        capitulo: `
                <div style="text-align: center; margin-top: 30px;">
                    <div style="margin-bottom: 15px;">CAPÍTULO II</div>
                    <div>DELITOS QUE COMPROMETEN LAS RELACIONES EXTERIORES DEL ESTADO</div>
                </div>`,
        articulos: [
            {
                tipo: "Artículo",
                numero: "335",
                titulo: "Violación de inmunidad de Jefe de Estado o de Agente Diplomático",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            El que viola las inmunidades del Jefe de un Estado o de algún agente diplomático, o ultraja en la persona de éstos a un Estado extranjero, o arrebata o degrada los emblemas de la soberanía de una Nación amiga en acto de menosprecio, será reprimido con pena privativa de libertad no menor de dos ni mayor de cinco años.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "336",
                titulo: "Atentado contra persona que goza de protección internacional",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            El que atenta, en territorio de la República, contra la vida, la salud o la libertad de una persona que goza de protección internacional, será reprimido, en caso de atentado contra la vida, con pena privativa de libertad no menor de diez ni mayor de quince años y, en los demás casos, con pena privativa de libertad no menor de cinco ni mayor de diez años.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "337",
                titulo: "Violación de la soberanía extranjera",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            El que viola la soberanía de un Estado extranjero, practicando en su territorio actos indebidos o penetra en el mismo contraviniendo las normas del Derecho Internacional, será reprimido con pena privativa de libertad no mayor de cinco años.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "338",
                titulo: "Conjuración contra un Estado extranjero",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            El que, en territorio de la República, practica actos destinados a alterar por la violencia la organización política de un Estado extranjero, será reprimido con pena privativa de libertad no mayor de cinco años.
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            Si el agente obra por lucro o por cualquier móvil innoble, la pena será no menor de cinco ni mayor de diez años.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "339",
                titulo: "Actos hostiles contra Estado extranjero",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            El que practica, sin aprobación del gobierno, actos hostiles contra un Estado extranjero, dando motivo al peligro de una declaración de guerra contra la República o expone a sus habitantes a vejaciones o represalias contra sus personas o bienes o altera las relaciones amistosas del Estado Peruano con otro, será reprimido con pena privativa de libertad no menor de dos ni mayor de ocho años.
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            Si el agente obra por cualquier otro móvil o cuando de los actos hostiles resulta la guerra, la pena será no menor de ocho años y de ciento ochenta a trescientos sesenticinco días-multa.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "340",
                titulo: "Violación de Tratados o Convenciones de Paz",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            El que viola los tratados o convenciones de paz vigentes entre el Perú y otros Estados o las treguas o los armisticios, será reprimido con pena privativa de libertad no menor de uno ni mayor de cuatro años.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "341",
                titulo: "Espionaje militar en perjuicio de Estado extranjero",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            El que, en territorio peruano, recoge informaciones militares para un Estado extranjero, en perjuicio de otro Estado, será reprimido con pena privativa de libertad no menor de dos ni mayor de cuatro años.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "342",
                titulo: "Ejecución de actos de autoridad extranjera en el territorio nacional",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            El que, prescindiendo de la intervención de la autoridad competente, ejecuta o manda ejecutar actos de autoridad de un país extranjero o de un organismo internacional en el territorio de la República, será reprimido con pena privativa de libertad no menor de dos ni mayor de cinco años e inhabilitación de uno a tres años conforme al artículo 36, incisos 1 y 2.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "343",
                titulo: "Actos de hostilidad ordenados por beligerantes",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            El que, con ocasión de guerra en que la República haya declarado su neutralidad, practica actos destinados a realizar en el país las medidas de hostilidad ordenadas por los beligerantes, será reprimido con pena privativa de libertad no mayor de dos años.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "344",
                titulo: "Ofensa, ultraje, vilipendio o menosprecio",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            El que, públicamente o por cualquier medio de difusión, ofende, ultraja, vilipendia o menosprecia, por obra o por expresión verbal, los símbolos de la Patria o la memoria de los próceres o héroes que nuestra historia consagra, será reprimido con pena privativa de libertad no mayor de cuatro años y con sesenta a ciento ochenta días-multa.
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            El que publica o difunde, por cualquier medio el mapa del Perú con alteración de sus límites, será reprimido con la misma pena.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "345",
                titulo: "Actos de menosprecio",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            El que, por acto de menosprecio, usa como marca de fábrica o en artículos comerciales, en estampados de vestimentas o de cualquier otra manera, algún símbolo de la Patria o símbolo del Estado o emblema nacional o la imagen de algún precursor, prócer, héroe, libertador o mártir, establecido o reconocido por ley, será reprimido con pena privativa de libertad no mayor de un año, o con prestación de servicio comunitario de veinte a treinta jornadas.
                        </div>`
            }
        ]
    },
    {
        titulo: `
                <div style="text-align: center; margin-top: 30px;">
                    <div style="margin-bottom: 15px;">TÍTULO XVI</div>
                    <div>DELITOS CONTRA LOS PODERES DEL ESTADO Y EL ORDEN CONSTITUCIONAL</div>
                </div>`,
        capitulo: `
                <div style="text-align: center; margin-top: 30px;">
                    <div style="margin-bottom: 15px;">CAPÍTULO I</div>
                    <div>REBELIÓN, SEDICIÓN Y MOTÍN</div>
                </div>`,
        articulos: [
            {
                tipo: "Artículo",
                numero: "346",
                titulo: "Rebelión",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            El que se alza en armas para variar la forma de gobierno, deponer al gobierno legalmente constituido o suprimir o modificar el régimen constitucional, será reprimido con pena privativa de libertad no menor de diez ni mayor de veinte años.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "347",
                titulo: "Sedición",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            El que, sin desconocer al gobierno legalmente constituído, se alza en armas para impedir que la autoridad ejerza libremente sus funciones o para evitar el cumplimiento de las leyes o resoluciones o impedir las elecciones generales, parlamentarias, regionales o locales, será reprimido con pena privativa de libertad no menor de cinco ni mayor de diez años.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "348",
                titulo: "Motín",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            El que, en forma tumultuaria, empleando violencia contra las personas o fuerza en las cosas, se atribuye los derechos del pueblo y peticiona en nombre de éste para exigir de la autoridad la ejecución u omisión de un acto propio de sus funciones, será reprimido con pena privativa de libertad no menor de uno ni mayor de seis años.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "349",
                titulo: "Conspiración para una rebelión, sedición o motín",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            El que toma parte en una conspiración de dos o más personas para cometer delitos de rebelión, sedición o motín, será reprimido con pena privativa de libertad no mayor de la mitad del máximo de la señalada para el delito que se trataba de perpetrar.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "350",
                titulo: "Seducción, usurpación y retención ilegal de mando",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            El que seduce a tropas, usurpa el mando de las mismas, el mando de un buque o aeronave de guerra o de una plaza fuerte o puesto de guardia, o retiene ilegalmente un mando político o militar con el fin de cometer rebelión, sedición o motín, será reprimido con pena privativa de libertad no mayor a los dos tercios del máximo de la señalada para el delito que se trataba de perpetrar.
                        </div>`
            }
        ]
    },
    {
        titulo: ``,
        capitulo: `
                <div style="text-align: center; margin-top: 30px;">
                    <div style="margin-bottom: 15px;">CAPÍTULO II</div>
                    <div>DISPOSICIONES COMUNES</div>
                </div>`,
        articulos: [
            {
                tipo: "Artículo",
                numero: "351",
                titulo: "Exención de la pena y responsabilidad de promotores",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            Los rebeldes, sediciosos o amotinados que se someten a la autoridad legítima o se disuelven antes de que ésta les haga intimaciones, o lo hacen a consecuencia de ellas, sin haber causado otro mal que la perturbación momentánea del orden, están exentos de pena. Se exceptúan a los promotores o directores, quienes serán reprimidos con pena privativa de libertad no mayor de la mitad del máximo de la señalada para el delito que se trataba de perpetrar.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "352",
                titulo: "Omisión de resistencia a rebelión, sedición o motín",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            El funcionario o servidor público que, pudiendo hacerlo, no oponga resistencia a una rebelión, sedición o motín, será reprimido con pena privativa de libertad no mayor de cuatro años.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "353",
                titulo: "Inhabilitación",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            Los funcionarios, servidores públicos o miembros de las Fuerzas Armadas o de la Policía Nacional, que sean culpables de los delitos previstos en este Título, serán reprimidos, además, con inhabilitación de uno a cuatro años conforme al artículo 36, incisos 1, 2 y 8.
                        </div>`
            }
        ]
    },
    {
        titulo: `
                <div style="text-align: center; margin-top: 30px;">
                    <div style="margin-bottom: 15px;">TÍTULO XVII</div>
                    <div>DELITOS CONTRA LA VOLUNTAD POPULAR</div>
                </div>`,
        capitulo: `
                <div style="text-align: center; margin-top: 30px;">
                    <div style="margin-bottom: 15px;">CAPÍTULO I</div>
                    <div>DELITOS CONTRA EL DERECHO DE SUFRAGIO</div>
                </div>`,
        articulos: [
            {
                tipo: "Artículo",
                numero: "354",
                titulo: "Perturbación o impedimento de proceso electoral",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            El que, con violencia o amenaza, perturba o impide que se desarrolle un proceso electoral general, parlamentario, regional o municipal, o los procesos de revocatoria o referéndum será reprimido con pena privativa de libertad no menor de tres ni mayor de diez años.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "355",
                titulo: "Impedimento del ejercicio de derecho de sufragio",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            El que, mediante violencia o amenaza, impide a un elector ejercer su derecho de sufragio o le obliga a hacerlo en un sentido determinado, será reprimido con pena privativa de libertad no menor de uno ni mayor de cuatro años.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "356",
                titulo: "Inducción a no votar o hacerlo en sentido determinado",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            El que, mediante dádivas, ventajas o promesas trata de inducir a un elector a no votar o a votar en un sentido determinado, será reprimido con pena privativa de libertad no menor de uno ni mayor de cuatro años.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "357",
                titulo: "Suplantación de votante",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            El que suplanta a otro votante o vota más de una vez en la misma elección o sufraga sin tener derecho, será reprimido con pena privativa de libertad no menor de uno ni mayor de cuatro años.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "358",
                titulo: "Publicidad ilegal del sentido del voto",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            El elector que da a publicidad el sentido de su voto en el acto electoral, será reprimido con pena privativa de libertad no mayor de un año o con prestación de servicio comunitario de veinte a treinta jornadas.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "359",
                titulo: "Atentados contra el derecho de sufragio",
                texto: `
                        <div style="margin-bottom: 10px; text-align: justify; line-height: 1.5;">
                            Será reprimido con pena privativa de libertad no menor de dos ni mayor de ocho años el que, con propósito de impedir o alterar el resultado de un proceso o favorecer o perjudicar a un candidato u organización política, realiza cualquiera de las acciones siguientes:
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">1.</span>
                            <div>Inserta o hace insertar o suprime o hace suprimir, indebidamente, nombres en la formación de un registro electoral.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">2.</span>
                            <div>Falsifica o destruye, de cualquier modo, en todo o en parte un registro electoral, libretas electorales o actas de escrutinio u oculta, retiene o hace desaparecer los documentos mencionados, de manera que el hecho pueda dificultar la elección o falsear su resultado.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">3.</span>
                            <div>Sustrae, destruye o sustituye ánforas utilizadas en una elección antes de realizarse el escrutinio.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">4.</span>
                            <div>Sustrae, destruye o sustituye cédulas de sufragio que fueron depositadas por los electores.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">5.</span>
                            <div>Altera, de cualquier manera, el resultado de una elección o torna imposible la realización del escrutinio.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">6.</span>
                            <div>Recibe, siendo miembro de una mesa de sufragio, el voto de un ciudadano no incluído en la lista de electores de esa mesa o rechaza injustificadamente el voto de un elector incluído en dicha lista.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">7.</span>
                            <div>Despoja a un ciudadano, indebidamente, de su libreta electoral o la retiene con el propósito de impedirle que sufrague.</div>
                        </div>
                        <div style="display: flex; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">8.</span>
                            <div>Realiza cambio de domicilio o induce a realizarlo a una circunscripción distinta al de su residencia habitual, induciendo a error en la formación del Registro Electoral.</div>
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "359-A",
                titulo: "Financiamiento prohibido de organizaciones políticas",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            El que, de manera directa o indirecta, solicita, acepta, entrega o recibe aportes, donaciones, contribuciones o cualquier otro tipo de beneficio proveniente de fuente de financiamiento legalmente prohibida, conociendo o debiendo conocer su origen, en beneficio de una organización política o alianza electoral, registrada o en proceso de registro, será reprimido con pena privativa de libertad no menor de dos ni mayor de cinco años y con sesenta a ciento ochenta días multa, e inhabilitación conforme al artículo 36, incisos 1, 2, 3 y 4, del Código Penal. La pena privativa de libertad será no menor de cuatro ni mayor de seis años y con cien a trescientos días multa, e inhabilitación conforme al artículo 36, incisos 1, 2, 3 y 4, del Código Penal, si el delito es cometido por el candidato, tesorero, responsable de campaña o administrador de hecho o derecho de los recursos de una organización política, siempre que conozca o deba conocer la fuente de financiamiento legalmente prohibida.
                        </div>
                        <div style="margin-bottom: 10px; text-align: justify; line-height: 1.5;">
                            La pena privativa de libertad será no menor de cinco ni mayor de ocho años y con ciento veinte a trescientos cincuenta días multa, e inhabilitación conforme al artículo 36, incisos 1, 2, 3 y 4, del Código Penal, si:
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 30px;">a)</span>
                            <div>El valor del aporte, donación o financiamiento involucrado es superior a cincuenta (50) unidades impositivas tributarias (UIT).</div>
                        </div>
                        <div style="display: flex; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 30px;">b)</span>
                            <div>El agente comete el delito como integrante de una organización criminal o persona vinculada a ella o actúe por encargo de la misma.</div>
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "359-B",
                titulo: "Falseamiento de la información sobre aportaciones, ingresos y gastos de organizaciones políticas",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            El tesorero, el responsable de campaña, el representante legal, el administrador de hecho o de derecho, o el miembro de la organización política que, con pleno conocimiento, proporciona información falsa en los informes sobre aportaciones e ingresos recibidos o en aquellos referidos a los gastos efectivos de campaña electoral o en la información financiera anual que se entrega a la entidad supervisora será reprimido con pena privativa de libertad no menor de dos ni mayor de seis años e inhabilitación conforme al artículo 36, incisos 1, 2, 3 y 4, del Código Penal.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "359-C",
                titulo: "Fuentes de financiamiento legalmente prohibidas",
                texto: `
                        <div style="margin-bottom: 10px; text-align: justify; line-height: 1.5;">
                            Son fuentes de financiamiento legalmente prohibidas aquellas que provengan de:
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">1.</span>
                            <div>Cualquier entidad de derecho público o empresa de propiedad del Estado o con participación de este, distintas del financiamiento público directo o indirecto a las organizaciones políticas.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">2.</span>
                            <div>Los aportes anónimos dinerarios superiores a dos (2) unidades impositivas tributarias.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">3.</span>
                            <div>Personas naturales condenadas con sentencia consentida o ejecutoriada, o con mandato de prisión preventiva vigente por delitos contra la administración pública, tráfico ilícito de drogas, minería ilegal, tala ilegal, trata de personas, lavado de activos o terrorismo, según información obtenida a través del procedimiento de la ley sobre la Ventanilla Única de Antecedentes para Uso Electoral, en lo que resulte aplicable. La prohibición se extiende hasta diez (10) años después de cumplida la condena.</div>
                        </div>
                        <div style="display: flex; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">4.</span>
                            <div>Los que provengan de personas jurídicas nacionales o extranjeras sancionadas penal o administrativamente en el país o en el extranjero por la comisión de un delito, o que se les haya sancionado conforme a lo señalado en la Ley 30424, Ley que regula la responsabilidad administrativa de las personas jurídicas, o se les haya aplicado las consecuencias accesorias previstas en el presente código.</div>
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "360",
                titulo: "Inhabilitación",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            El funcionario o servidor público o miembro de las Fuerzas Armadas o de la Policía Nacional que incurra en uno de los delitos previstos en este Título sufrirá, además, inhabilitación de uno a tres años conforme al artículo 36, incisos 1 y 2.
                        </div>`
            }
        ]
    },
    {
        titulo: `
                <div style="text-align: center; margin-top: 30px;">
                    <div style="margin-bottom: 15px;">TÍTULO XVIII</div>
                    <div>DELITOS CONTRA LA ADMINISTRACIÓN PÚBLICA</div>
                </div>`,
        capitulo: `
                <div style="text-align: center; margin-top: 30px;">
                    <div style="margin-bottom: 15px;">CAPÍTULO I</div>
                    <div>DELITOS COMETIDOS POR PARTICULARES</div>
                    <div style="margin-top: 20px; margin-bottom: 10px; font-weight: bold;">SECCIÓN I</div>
                    <div>USURPACIÓN DE AUTORIDAD, TÍTULOS Y HONORES</div>
                </div>`,
        articulos: [
            {
                tipo: "Artículo",
                numero: "361",
                titulo: "Usurpación de función pública",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            El que, sin título o nombramiento, usurpa una función pública, o la facultad de dar órdenes militares o policiales, o el que hallándose destituido, cesado, suspendido o subrogado de su cargo continúa ejerciéndolo, o el que ejerce funciones correspondientes a cargo diferente del que tiene, será reprimido con pena privativa de libertad no menor de cuatro ni mayor de siete años, e inhabilitación de uno a dos años conforme al Artículo 36°, incisos 1° y 2°.
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            Si para perpetrar la comisión del delito, el agente presta resistencia o se enfrenta a las Fuerzas del Orden, la pena será privativa de libertad no menor de cinco ni mayor de ocho años.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "362",
                titulo: "Ostentación de distintivos de función o cargos que no ejerce",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            El que, públicamente, ostenta insignias o distintivos de una función o cargo que no ejerce o se arroga grado académico, título profesional u honores que no le corresponden, será reprimido con pena privativa de libertad no mayor de un año o con prestación de servicio comunitario de diez a veinte jornadas.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "363",
                titulo: "Ejercicio ilegal de profesión",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            El que ejerce profesión sin reunir los requisitos legales requeridos, será reprimido con pena privativa de libertad no menor de dos ni mayor de cuatro años.
                        </div>
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            El que ejerce profesión con falso título, será reprimido con pena privativa de libertad no menor de cuatro ni mayor de seis años.
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            La pena será no menor de cuatro ni mayor de ocho años, si el ejercicio de la profesión se da en el ámbito de la función pública o prestando servicios al Estado bajo cualquier modalidad contractual.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "364",
                titulo: "Participación en ejercicio ilegal de la profesión",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            El profesional que ampara con su firma el trabajo de quien no tiene título para ejercerlo, será reprimido con pena privativa de libertad no mayor de cuatro años e inhabilitación de uno a tres años conforme al artículo 36º, incisos 1 y 2.
                        </div>`
            }
        ]
    },
    {
        titulo: ``,
        capitulo: `
                <div style="text-align: center; margin-top: 30px;">
                    <div style="margin-bottom: 10px; font-weight: bold;">SECCIÓN II</div>
                    <div>VIOLENCIA Y RESISTENCIA A LA AUTORIDAD</div>
                </div>`,
        articulos: [
            {
                tipo: "Artículo",
                numero: "365",
                titulo: "Violencia contra la autoridad para obligarle a algo",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            El que, sin alzamiento público, mediante violencia o amenaza, impide a una autoridad o a un funcionario o servidor público ejercer sus funciones o le obliga a practicar un determinado acto de sus funciones o le estorba en el ejercicio de éstas, será reprimido con pena privativa de libertad no mayor de dos años.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "366",
                titulo: "Violencia contra la autoridad para impedir el ejercicio de sus funciones",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            El que emplea intimidación o violencia contra un funcionario público o contra la persona que le presta asistencia en virtud de un deber legal o ante requerimiento de aquél, para impedir o trabar la ejecución de un acto propio de legítimo ejercicio de sus funciones, será reprimido con pena privativa de libertad no menor de dos ni mayor de cuatro años o con prestación de servicio comunitario de ochenta a ciento cuarenta jornadas.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "367",
                titulo: "Formas agravadas",
                texto: `
                        <div style="margin-bottom: 10px; text-align: justify; line-height: 1.5;">
                            En los casos de los artículos 365° y 366°, la pena privativa de libertad será no menor de cuatro ni mayor de ocho años cuando:
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">1.</span>
                            <div>El hecho se realiza por dos o más personas.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 15px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">2.</span>
                            <div>El autor es funcionario o servidor público.</div>
                        </div>
                        <div style="margin-bottom: 10px; text-align: justify; line-height: 1.5;">
                            La pena privativa de libertad será no menor de ocho ni mayor de doce años cuando:
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">1.</span>
                            <div>El hecho se comete a mano armada.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">2.</span>
                            <div>El autor causa una lesión grave que haya podido prever.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">3.</span>
                            <div>El hecho se realiza en contra de un miembro de la Policía Nacional o de las Fuerzas Armadas, magistrado del Poder Judicial o del Ministerio Público, miembro del Tribunal Constitucional o autoridad elegida por mandato popular, en el ejercicio de sus funciones.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">4.</span>
                            <div>El hecho se realiza para impedir la erradicación o destrucción de cultivos ilegales, o de cualquier medio o instrumento destinado a la fabricación o transporte ilegal de drogas tóxicas, estupefacientes o sustancias psicotrópicas.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 15px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">5.</span>
                            <div>El hecho se comete respecto a investigaciones o juzgamiento por los delitos de terrorismo, tráfico ilícito de drogas, lavado de activos, secuestro, extorsión y trata de personas.</div>
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            Si como consecuencia del hecho se produce la muerte de una persona y el agente pudo prever este resultado, la pena será privativa de libertad no menor de doce ni mayor de quince años.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "368",
                titulo: "Resistencia o desobediencia a la autoridad",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            El que desobedece o resiste la orden legalmente impartida por un funcionario público en el ejercicio de sus atribuciones, salvo que se trate de la propia detención, será reprimido con pena privativa de libertad no menor de cinco (5) ni mayor de ocho (8) años.
                        </div>
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            Cuando se desobedezca la orden de realizarse un análisis de sangre o de otros fluidos corporales que tenga por finalidad determinar el nivel, porcentaje o ingesta de alcohol, drogas tóxicas estupefacientes, sustancias psicotrópicas o sintéticas, la pena privativa de libertad será no menor de cuatro ni mayor de siete años o prestación de servicios comunitarios de setenta a ciento cuarenta jornadas.
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            Cuando se desobedece o resiste una medida de protección dictada en un proceso originado por hechos que configuran violencia contra las mujeres o contra integrantes del grupo familiar será reprimido con pena privativa de libertad no menor de cinco ni mayor de ocho años.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "368-A",
                titulo: "Ingreso indebido de equipos o sistema de comunicación, fotografía y/o filmación en centros de detención o reclusión",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            El que ingresa indebidamente, intenta ingresar o permite el ingreso a un centro de detención o reclusión, equipos o sistema de comunicación, fotografía y/o filmación o sus componentes que permiten la comunicación telefónica celular o fija, radial, vía internet u otro análogo del interno, así como el registro de tomas fotográficas o de video, será reprimido con pena privativa de libertad no menor de cuatro ni mayor de seis años.
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            Si el agente se vale de su condición de autoridad, abogado defensor, servidor o funcionario público para cometer o permitir que se cometa el hecho punible descrito, la pena privativa será no menor de seis ni mayor de ocho años e inhabilitación, conforme al artículo 36, incisos 1 y 2, del presente Código.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "368-B",
                titulo: "Ingreso indebido de materiales o componentes con fines de elaboración de equipos de comunicación en centros de detención o reclusión",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            El que indebidamente ingresa, intenta ingresar o permite el ingreso a un centro de detención o reclusión, materiales o componentes que puedan utilizarse en la elaboración de antenas, receptores u otros equipos que posibiliten o faciliten la comunicación telefónica celular o fija, radial, vía internet u otra análoga del interno, será reprimido con pena privativa de libertad no menor de dos ni mayor de cuatro años.
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            Si el agente se vale de un menor de edad o de su condición de autoridad, abogado defensor, servidor o funcionario público para cometer o permitir que se cometa el hecho punible descrito, la pena privativa será no menor de tres ni mayor de seis años e inhabilitación, conforme al artículo 36, incisos 1 y 2, del presente Código.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "368-C",
                titulo: "Sabotaje de los equipos de seguridad y de comunicación en establecimientos penitenciarios",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            El que dentro de un centro de detención o reclusión vulnera, impide, dificulta, inhabilita o de cualquier otra forma imposibilite el funcionamiento de los equipos de seguridad y/o de comunicación en los establecimientos penitenciarios, será reprimido con pena privativa de libertad no menor de cinco ni mayor de ocho años.
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            Si el agente se vale de un menor de edad o de su condición de autoridad, abogado defensor, servidor o funcionario público para cometer o permitir que se cometa el hecho punible descrito, la pena privativa será no menor de ocho ni mayor de diez años e inhabilitación, conforme al artículo 36, incisos 1 y 2, del presente Código.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "368-D",
                titulo: "Posesión indebida de teléfonos celulares o, armas, municiones o materiales explosivos, inflamables, asfixiantes o tóxicos en establecimientos penitenciarios",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            La persona privada de libertad en un centro de detención o reclusión, que posea o porte un arma de fuego o arma blanca, municiones o materiales explosivos, inflamables, asfixiantes o tóxicos, será reprimida con pena privativa de libertad no menor de ocho ni mayor de quince años.
                        </div>
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            Si el agente posee, porta, usa o trafica con un teléfono celular o fijo o cualquiera de sus accesorios que no esté expresamente autorizado, la pena privativa de libertad será no menor de tres ni mayor de ocho años.
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            Si se demuestra que del uso de estos aparatos se cometió o intentó cometer un ilícito penal, la pena será no menor de diez ni mayor de quince años.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "368-E",
                titulo: "Ingreso indebido de armas, municiones o materiales explosivos, inflamables, asfixiantes o tóxicos en establecimientos penitenciarios",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            El que indebidamente ingresa, intenta ingresar o permite el ingreso a un centro de detención o reclusión, un arma de fuego o arma blanca, municiones o materiales explosivos, inflamables, asfixiantes o tóxicos para uso del interno, será reprimido con pena privativa de libertad no menor de ocho ni mayor de quince años.
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            Si el agente se vale de un menor de edad o de su condición de autoridad, abogado defensor, servidor o funcionario público para cometer o permitir que se cometa el hecho punible descrito, la pena privativa será no menor de diez ni mayor de veinte años e inhabilitación, conforme al artículo 36, incisos 1 y 2, del presente Código.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "368-F",
                titulo: "Vulneración del inmueble, zona o área declarada intangible alrededor del perímetro de los establecimientos penitenciarios",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            El que indebidamente, edifica, construye, fabrica o establece vivienda, morada, habitación u otro tipo de asentamiento en un bien, zona o área declarada intangible alrededor del perímetro de los establecimientos penitenciarios, será reprimido con pena privativa de libertad no menor de cuatro ni mayor de ocho años.
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            La pena privativa de libertad será no menor de cinco ni menor de nueve años cuando el agente coloque o instale ilegalmente antenas transmisoras de internet, telefonía móvil o satelital en la zona, área o bien antes referida.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "369",
                titulo: "Violencia contra autoridades elegidas",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            El que, mediante violencia o threat, impide a una autoridad elegida en un proceso electoral general, parlamentario, regional o municipal juramentar, asumir o ejercer sus funciones será reprimido con pena privativa de libertad no menor de dos ni mayor de cuatro años.
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            Si el agente es funcionario o servidor público sufrirá, además, inhabilitación de uno a tres años conforme al artículo 36°, incisos 1, 2 y 8.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "370",
                titulo: "Atentado contra la conservación e identidad de objeto",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            El que destruye o arranca envolturas, sellos o marcas puestos por la autoridad para conservar o identificar un objeto, será reprimido con pena privativa de libertad no mayor de dos años o con prestación de servicio comunitario de veinte a treinta jornadas.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "371",
                titulo: "Negativa a colaborar con la administración de justicia",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            El testigo, perito, traductor o intérprete que, siendo legalmente requerido, se abstiene de comparecer o prestar la declaración, informe o servicio respectivo, será reprimido con pena privativa de libertad no mayor de dos años o con prestación de servicio comunitario de veinte a treinta jornadas.
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            El perito, traductor o intérprete será sancionado, además, con inhabilitación de seis meses a dos años conforme al artículo 36, incisos 1, 2 y 4.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "372",
                titulo: "Atentado contra documentos que sirven de prueba en el proceso",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            El que sustrae, oculta, cambia, destruye o inutiliza objetos, registros o documentos destinados a servir de prueba ante la autoridad competente que sustancia un proceso, confiados a la custodia de un funcionario o de otra persona, será reprimido con pena privativa de libertad no menor de uno ni mayor de cuatro años.
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            Si la destrucción o inutilización es por culpa, la pena será privativa de libertad no mayor de un año o prestación de servicio comunitario de veinte a cuarenta jornadas.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "373",
                titulo: "Sustracción de objetos requisados por autoridad",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            El que sustrae objetos requisados por la autoridad, será reprimido con pena privativa de libertad no menor de dos ni mayor de cuatro años.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "374",
                titulo: "Derogado",
                texto: `
                        <div style="text-align: justify; line-height: 1.5; color: #777; font-style: italic;">
                            Derogado conforme a la Ley 27975 del 29/05/2003.
                        </div>`
            }
        ]
    },
    {
        titulo: ``,
        capitulo: `
                <div style="text-align: center; margin-top: 30px;">
                    <div style="margin-bottom: 10px; font-weight: bold;">SECCIÓN III</div>
                    <div>DESACATO</div>
                </div>`,
        articulos: [
            {
                tipo: "Artículo",
                numero: "375",
                titulo: "Perturbación del orden en el lugar donde la autoridad ejerce su función",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            El que causa desorden en la sala de sesiones del Congreso o de las Cámaras Legislativas, de las Asambleas Regionales, de los Consejos Municipales o de los Tribunales de Justicia u otro lugar donde las autoridades públicas ejercen sus funciones o el que entra armado en dichos lugares, será reprimido con pena privativa de libertad no mayor de un año o con prestación de servicio comunitario de veinte a treinta jornadas.
                        </div>`
            }
        ]
    },
    {
        titulo: ``,
        capitulo: `
                <div style="text-align: center; margin-top: 30px;">
                    <div style="margin-bottom: 15px;">CAPÍTULO II</div>
                    <div>DELITOS COMETIDOS POR FUNCIONARIOS PÚBLICOS</div>
                    <div style="margin-top: 20px; margin-bottom: 10px; font-weight: bold;">SECCIÓN I</div>
                    <div>ABUSO DE AUTORIDAD</div>
                </div>`,
        articulos: [
            {
                tipo: "Artículo",
                numero: "376",
                titulo: "Abuso de autoridad",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            El funcionario público que, abusando de sus atribuciones, comete u ordena un acto arbitrario que cause perjuicio a alguien será reprimido con pena privativa de libertad no mayor de tres años.
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            Si los hechos derivan de un procedimiento de cobranza coactiva, la pena privativa de libertad será no menor de dos ni mayor de cuatro años.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "376-A",
                titulo: "Abuso de autoridad condicionando ilegalmente la entrega de bienes y servicios",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            El que, valiéndose de su condición de funcionario o servidor público, condiciona la distribución de bienes o la prestación de servicios correspondientes a programas públicos de apoyo o desarrollo social, con la finalidad de obtener ventaja política y/o electoral de cualquier tipo en favor propio o de terceros, será reprimido con pena privativa de libertad no menor de tres ni mayor de seis años e inhabilitación conforme a los incisos 1 y 2 del artículo 36° del Código Penal.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "376-B",
                titulo: "Otorgamiento ilegítimo de derechos sobre inmuebles",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            El funcionario público que, en violación de sus atribuciones u obligaciones, otorga ilegítimamente derechos de posesión o emite títulos de propiedad sobre bienes de dominio público o bienes de dominio privado estatal, o bienes inmuebles de propiedad privada, sin cumplir con los requisitos establecidos por la normatividad vigente, será reprimido con pena privativa de libertad, no menor de cuatro ni mayor de Constitutional seis años.
                        </div>
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            Si el derecho de posesión o título de propiedad se otorga a personas que ilegalmente ocupan o usurpan los bienes inmuebles referidos en el primer párrafo, la pena privativa de libertad será no menor de cinco ni mayor de ocho años.
                        </div>
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            Si se otorgan sobre bienes, zonas o áreas consideradas o declaradas como intangibles, inalienables o imprescriptibles, alrededor del perímetro de los establecimientos penitenciarios, la pena privativa de libertad será no menor de cinco ni mayor de ocho años.
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            La pena privativa de libertad será no menor de seis ni mayor de diez años, si se otorgan a personas que ilegalmente ocupan o usurpan los bienes o zonas referidas en el tercer párrafo.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "377",
                titulo: "Omisión, rehusamiento o demora de actos funcionales",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            El funcionario público que, ilegalmente, omite, rehúsa o retarda algún acto de su cargo será reprimido con pena privativa de libertad no mayor de dos años y con treinta a sesenta días-multa.
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            Cuando la omisión, rehusamiento o demora de actos funcionales esté referido a una solicitud de garantías personales o caso de violencia familiar, la pena será privativa de libertad no menor de dos ni mayor de cinco años.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "378",
                titulo: "Denegación o deficiente apoyo policial",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            El policía que rehúsa, omite o retarda, sin causa justificada, la prestación de un auxilio legalmente requerido por la autoridad civil competente, será reprimido con pena privativa de libertad no mayor de dos años.
                        </div>
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            Si la prestación de auxilio es requerida por un particular en situación de peligro, la pena será no menor de dos ni mayor de cuatro años.
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            La pena prevista en el párrafo segundo se impondrá, si la prestación de auxilio está referida a una solicitud de garantías personales o un caso de violencia familiar.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "379",
                titulo: "Requerimiento indebido de la fuerza pública",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            El funcionario público que requiere la asistencia de la fuerza pública para oponerse a la ejecución de disposiciones u órdenes legales de la autoridad o contra la ejecución de sentencia o mandato judicial, será reprimido con pena privativa de libertad no mayor de tres años.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "380",
                titulo: "Abandono de cargo",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            El funcionario o servidor público que, con daño del servicio, abandona su cargo sin haber cesado legalmente en el desempeño del mismo, será reprimido con pena privativa de libertad no mayor de dos años.
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            Si el agente incita al abandono colectivo del trabajo a los funcionarios o servidores públicos la pena será privativa de libertad no mayor de tres años.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "381",
                titulo: "Nombramiento, designación, contratación, encargatura o aceptación ilegal de cargo",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            El funcionario público que nombra, designa, contrata o encarga a persona en quien no concurren los requisitos legales para un cargo público, será reprimido con pena privativa de libertad no menor de dos ni mayor de cuatro años y con sesenta a ciento veinte días-multa.
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            El que acepta el cargo sin contar con los requisitos legales será reprimido con las mismas penas.
                        </div>`
            }
        ]
    },
    {
        titulo: ``,
        capitulo: `
                <div style="text-align: center; margin-top: 30px;">
                    <div style="margin-bottom: 10px; font-weight: bold;">SECCIÓN II</div>
                    <div>CONCUSIÓN</div>
                </div>`,
        articulos: [
            {
                tipo: "Artículo",
                numero: "382",
                titulo: "Concusión",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            El funcionario o servidor público que, abusando de su cargo, obliga o induce a una persona a dar o prometer indebidamente, para sí o para otro, un bien o un beneficio patrimonial, será reprimido con pena privativa de libertad no menor de dos ni mayor de ocho años; inhabilitación, según corresponda, conforme a los incisos 1, 2 y 8 del artículo 36; y, con ciento ochenta a trescientos sesenta y cinco días-multa.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "383",
                titulo: "Cobro indebido",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            El funcionario o servidor público que, abusando de su cargo, exige o hace pagar o entregar contribuciones o emolumentos no debidos o en cantidad que excede a la tarifa legal, será reprimido con pena privativa de libertad no menor de uno ni mayor de cuatro años e inhabilitación, según corresponda, conforme a los incisos 1, 2 y 8 del artículo 36.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "384",
                titulo: "Colusión simple y agravada",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            El funcionario o servidor público que, interviniendo directa o indirectamente, por razón de su cargo, en cualquier etapa de las modalidades de adquisición o contratación pública de bienes, obras o servicios, concesiones o cualquier operación a cargo del Estado concierta con los interesados para defraudar al Estado o entidad u organismo del Estado, según ley, será reprimido con pena privativa de libertad no menor de tres ni mayor de seis años; inhabilitación a que se refieren los incisos 1, 2 y 8 del artículo 36, de cinco a veinte años; y, con ciento ochenta a trescientos sesenta y cinco días-multa.
                        </div>
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            El funcionario o servidor público que, interviniendo directa o indirectamente, por razón de su cargo, en las contrataciones y adquisiciones de bienes, obras o servicios, concesiones o cualquier operación a cargo del Estado mediante concertación con los interesados, defraudare patrimonialmente al Estado o entidad u organismo del Estado, según ley, será reprimido con pena privativa de libertad no menor de seis ni mayor de quince años; inhabilitación a que se refieren los incisos 1, 2 y 8 del artículo 36, de cinco a veinte años; y, con trescientos sesenta y cinco a setecientos treinta días-multa.
                        </div>
                        <div style="margin-bottom: 10px; text-align: justify; line-height: 1.5;">
                            La pena será privativa de libertad no menor de quince ni mayor de veinte años; inhabilitación a que se refieren los incisos 1, 2 y 8 del artículo 36, de naturaleza perpetua, y, con trescientos sesenta y cinco a setecientos treinta días-multa, cuando ocurra cualquiera de los siguientes supuestos:
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">1.</span>
                            <div>El agente actúe como integrante de una organización criminal, como persona vinculada o actúe por encargo de ella.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">2.</span>
                            <div>La conducta recaiga sobre programas con fines asistenciales, de apoyo o inclusión social o de desarrollo, siempre que el valor del dinero, bienes, efectos o ganancias involucrados supere las diez unidades impositivas tributarias.</div>
                        </div>
                        <div style="display: flex; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">3.</span>
                            <div>El agente se aproveche de una situación de calamidad pública o emergencia sanitaria, o la comisión del delito comprometa la defense, seguridad o soberanía nacional.</div>
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "385",
                titulo: "Patrocinio ilegal",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            El que, valiéndose de su calidad de funcionario o servidor público, patrocina intereses de particulares ante la administración pública, será reprimido con pena privativa de libertad no mayor de dos años o con prestación de servicio comunitario de veinte a cuarenta jornadas.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "386",
                titulo: "Responsabilidad de peritos, árbitros y contadores particulares",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            Las disposiciones de los Artículos 384° y 385° son aplicables a los Peritos, Arbitros y Contadores Particulares, respecto de los bienes en cuya tasación, adjudicación o partición intervienen; y, a los tutores, curadores y albaceas, respecto de los pertenecientes a incapaces o testamentarías.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "387",
                titulo: "Peculado doloso y culposo",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            El funcionario o servidor público que se apropia o utiliza, en cualquier forma, para sí o para otro, caudales o efectos cuya percepción, administración o custodia le estén confiados por razón de su cargo, será reprimido con pena privativa de libertad no menor de cuatro ni mayor de ocho años; inhabilitación a que se refieren los incisos 1, 2 y 8 del artículo 36, de cinco a veinte años, y, con ciento ochenta a trescientos sesenta y cinco días-multa.
                        </div>
                        <div style="margin-bottom: 10px; text-align: justify; line-height: 1.5;">
                            La pena será privativa de libertad no menor de ocho ni mayor de quince años; inhabilitación a que se refieren los incisos 1, 2 y 8 del artículo 36, de naturaleza perpetua, y, con trescientos sesenta y cinco a setecientos treinta días-multa, cuando ocurra cualquiera de los siguientes supuestos:
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">1.</span>
                            <div>El agente actúe como integrante de una organización criminal, como persona vinculada o actúe por encargo de ella.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">2.</span>
                            <div>Los caudales o efectos estuvieran destinados a fines asistenciales o a programas de apoyo o inclusión social o de desarrollo.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">3.</span>
                            <div>El agente se aproveche de una situación de calamidad pública o emergencia sanitaria, o la comisión del delito comprometa la defensa, seguridad o soberanía nacional.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 15px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">4.</span>
                            <div>El valor de lo apropiado o utilizado sobrepase diez unidades impositivas tributarias.</div>
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            Si el agente, por culpa, da ocasión a que se efectúe por otra persona la sustracción de caudales o efectos, será reprimido con pena privativa de libertad no mayor de dos años y con prestación de servicios comunitarios de veinte a cuarenta jornadas. Constituye circunstancia agravante si los caudales o efectos estuvieran destinados a fines asistenciales o a programas de apoyo o inclusión social. En estos casos, la pena privativa de libertad será no menor de tres ni mayor de cinco años y con ciento ochenta a doscientos treinta días-multa.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "388",
                titulo: "Peculado de uso",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            El funcionario o servidor público que, para fines ajenos al servicio, usa o permite que otro use vehículos, máquinas o cualquier otro instrumento de trabajo pertenecientes a la administración pública o que se hallan bajo su guarda, será reprimido con pena privativa de libertad no menor de dos ni mayor de cuatro años; inhabilitación, según corresponda, conforme a los incisos 1, 2 y 8 del artículo 36; y, con ciento ochenta a trescientos sesenta y cinco días-multa.
                        </div>
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            Esta disposición es aplicable al contratista de una obra pública o a sus empleados cuando los efectos indicados pertenecen al Estado o a cualquier dependencia pública.
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            No están comprendidos en este artículo los vehículos motorizados destinados al servicio personal por razón del cargo.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "389",
                titulo: "Malversación",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            El funcionario o servidor público que da al dinero o bienes que administra una aplicación definitiva diferente de aquella a los que están destinados, afectando el servicio o la función encomendada, será reprimido con pena privativa de libertad no menor de uno ni mayor de cuatro años; inhabilitación a que se refieren los incisos 1, 2 y 8 del artículo 36, de cinco a veinte años, y ciento ochenta a trescientos sesenta y cinco días-multa.
                        </div>
                        <div style="margin-bottom: 10px; text-align: justify; line-height: 1.5;">
                            La pena será privativa de libertad no menor de cuatro ni mayor de ocho años; inhabilitación a que se refieren los incisos 1, 2 y 8 del artículo 36, de naturaleza perpetua, y, con trescientos sesenta y cinco a setecientos treinta días-multa, cuando ocurra cualquiera de los siguientes supuestos:
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">1.</span>
                            <div>El agente actúe como integrante de una organización criminal, como persona vinculada o actúe por encargo de ella.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">2.</span>
                            <div>La conducta recaiga sobre programas con fines asistenciales, de apoyo o inclusión social o de desarrollo, siempre que el valor del dinero, bienes, efectos o ganancias involucrados supere las diez unidades impositivas tributarias.</div>
                        </div>
                        <div style="display: flex; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">3.</span>
                            <div>El agente se aproveche de una situación de calamidad pública o emergencia sanitaria, o la comisión del delito comprometa la defensa, seguridad o soberanía nacional.</div>
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "390",
                titulo: "Retardo injustificado de pago",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            El funcionario o servidor público que, teniendo fondos expeditos, demora injustificadamente un pago ordinario o decretado por la autoridad competente, será reprimido con pena privativa de libertad no mayor de dos años.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "391",
                titulo: "Rehusamiento a entrega de bienes depositados o puestos en custodia",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            El funcionario o servidor público que, requerido con las formalidades de ley por la autoridad competente, rehusa entregar dinero, cosas o efectos depositados o puestos bajo su custodia o administración, será reprimido con pena privativa de libertad no mayor de dos años.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "392",
                titulo: "Extensión del tipo",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            Están sujetos a lo prescrito en los artículos 387° a 389°, los que administran o custodian dinero perteneciente a las entidades de beneficencia o similares, los ejecutores coactivos, administradores o depositarios de dinero o bienes embargados o depositados por orden de autoridad competente, aunque pertenezcan a particulares, así como todas las personas o representantes legales de personas jurídicas que administren o custodien dinero o bienes destinados a fines asistenciales o a programas de apoyo social.
                        </div>`
            }
        ]
    },
    {
        titulo: ``,
        capitulo: `
                <div style="text-align: center; margin-top: 30px;">
                    <div style="margin-bottom: 10px; font-weight: bold;">SECCIÓN IV</div>
                    <div>CORRUPCIÓN DE FUNCIONARIOS</div>
                </div>`,
        articulos: [
            {
                tipo: "Artículo",
                numero: "393",
                titulo: "Cohecho pasivo propio",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            El funcionario o servidor público que acepte o reciba donativo, promesa o cualquier otra ventaja o beneficio, para realizar u omitir un acto en violación de sus obligaciones o el que las acepta a consecuencia de haber faltado a ellas, será reprimido con pena privativa de libertad no menor de cinco ni mayor de ocho años e inhabilitación conforme a los incisos 1 y 2 del artículo 36 del Código Penal y con ciento ochenta a trescientos sesenta y cinco días-multa.
                        </div>
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            El funcionario o servidor público que solicita, directa o indirectamente, donativo, promesa o cualquier otra ventaja o beneficio, para realizar u omitir un acto en violación de sus obligaciones o a consecuencia de haber faltado a ellas, será reprimido con pena privativa de libertad no menor de seis ni mayor de ocho años e inhabilitación conforme a los incisos 1 y 2 del artículo 36 del Código Penal y con trescientos sesenta y cinco a setecientos treinta días-multa.
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            El funcionario o servidor público que condiciona su conducta funcional derivada del cargo o empleo a la entrega o promesa de donativo o ventaja, será reprimido con pena privativa de libertad no menor de ocho ni mayor de diez años e inhabilitación conforme a los incisos 1 y 2 del artículo 36 del Código Penal y con trescientos sesenta y cinco a setecientos treinta días-multa.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "393-A",
                titulo: "Soborno internacional pasivo",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            El funcionario o servidor público extranjero que acepta, recibe o solicita, directa o indirectamente, donativo, promesa o cualquier otra ventaja o beneficio, para realizar u omitir un acto en el ejercicio de sus funciones oficiales, en violación de sus obligaciones, o las acepta como consecuencia de haber faltado a ellas, para obtener o retener un negocio u otra ventaja indebida, en la realización de actividades económicas internacionales, será reprimido con pena privativa de libertad no menor de cinco ni mayor de ocho años; inhabilitación, según corresponda, conforme a los incisos 1, 2 y 8 del artículo 36; y, con trescientos sesenta y cinco a setecientos treinta días-multa.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "394",
                titulo: "Cohecho pasivo impropio",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            El funcionario o servidor público que acepte o reciba donativo, promesa o cualquier otra ventaja o beneficio indebido para realizar un acto propio de su cargo o empleo, sin faltar a su obligación, o como consecuencia del ya realizado, será reprimido con pena privativa de libertad no menor de cuatro ni mayor de seis años e inhabilitación conforme a los incisos 1 y 2 del artículo 36 del Código Penal y con ciento ochenta a trescientos sesenta y cinco días-multa.
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            El funcionario o servidor público que solicita, directa o indirectamente, donativo, promesa o cualquier otra ventaja indebida para realizar un acto propio de su cargo o empleo, sin faltar a su obligación, o como consecuencia del ya realizado, será reprimido con pena privativa de libertad no menor de cinco ni mayor de ocho años e inhabilitación conforme a los incisos 1 y 2 del artículo 36 del Código Penal y con trescientos sesenta y cinco a setecientos trauma días-multa.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "394-A",
                titulo: "Trasladado",
                texto: `
                        <div style="text-align: justify; line-height: 1.5; color: #777; font-style: italic;">
                            Trasladado al artículo 376-A conforme a la Ley 28355 del 06/10/2004.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "395",
                titulo: "Cohecho pasivo específico",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            El Magistrado, Árbitro, Fiscal, Perito, Miembro de Tribunal Administrativo o cualquier otro análogo a los anteriores que bajo cualquier modalidad acepte o reciba donativo, promesa o cualquier otra ventaja o beneficio, a sabiendas que es hecho con el fin de influir o decidir en asunto sometido a su conocimiento o competencia, será reprimido con pena privativa de libertad no menor de seis ni mayor de quince años e inhabilitación conforme a los incisos 1 y 2 del artículo 36° del Código Penal y con ciento ochenta a trescientos sesenta y cinco días-multa.
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            El Magistrado, Árbitro, Fiscal, Perito, Miembro de Tribunal Administrativo o cualquier otro análogo a los anteriores que bajo cualquier modalidad solicite, directa o indirectamente, donativo, promesa o cualquier otra ventaja o beneficio, con el fin de influir en la decisión de un asunto que esté sometido a su conocimiento, será reprimido con pena privativa de libertad no menor de ocho ni mayor de quince años e inhabilitación conforme a los incisos 1 y 2 del artículo 36° del Código Penal y con trescientos sesenta y cinco a setecientos días-multa.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "395-A",
                titulo: "Cohecho pasivo propio en el ejercicio de la función policial o penitenciaria",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            El miembro de la Policía Nacional o del Sistema Penitenciario que acepta o recibe donativo, promesa o cualquier otra ventaja o beneficio, para sí o para otro, para realizar u omitir un acto en violación de sus obligaciones derivadas de la función policial o penitenciaria, o el que las acepta a consecuencia de haber faltado a ellas, será sancionado con pena privativa de libertad no menor de seis ni mayor de doce años e inhabilitación conforme a los incisos 1, 2 y 8 del artículo 36.
                        </div>
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            El miembro de la Policía Nacional o del Sistema Penitenciario que solicita, directa o indirectamente, donativo, promesa o cualquier otra ventaja o beneficio, para realizar u omitir un acto en violación de sus obligaciones derivadas de la función policial o penitenciaria, o a consecuencia de haber faltado a ellas, será reprimido con pena privativa de libertad no menor de seis ni mayor de diez años e inhabilitación conforme a los incisos 1, 2 y 8 del artículo 36 del Código Penal.
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            El miembro de la Policía Nacional o del Sistema Penitenciario que condiciona su conducta funcional a la entrega o promesa de donativo o cualquier otra ventaja o beneficio, será reprimido con pena privativa de libertad no menor de ocho ni mayor de doce años e inhabilitación conforme a los incisos 1, 2 y 8 del artículo 36 del Código Penal.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "395-B",
                titulo: "Cohecho pasivo impropio en el ejercicio de la función policial y penitenciaria",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            El miembro de la Policía Nacional o del Sistema Penitenciario que acepte o recibe donativo, promesa o cualquier otra ventaja o beneficio indebido para realizar u omitir un acto propio de su función, sin faltar a su obligación, o como consecuencia del acto ya realizado u omitido, será reprimido con pena privativa de la libertad no menor de cuatro ni mayor de siete años e inhabilitación conforme a los incisos 1, 2 y 8 del artículo 36.
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            El miembro de la Policía Nacional o del Sistema Penitenciario que solicita, directa o indirectamente, donativo, promesa o cualquier otra ventaja indebida para realizar u omitir un acto propio de su función, sin faltar a su obligación, o como consecuencia del acto ya realizado u omitido, será reprimido con pena privativa de libertad no menor de cinco ni mayor de ocho años e inhabilitación conforme a los incisos 1, 2 y 8 del artículo 36.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "396",
                titulo: "Corrupción pasiva de auxiliares jurisdiccionales",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            Si en el caso del artículo 395, el agente es secretario judicial, relator, especialista, auxiliar jurisdiccional o cualquier otro análogo a los anteriores, será reprimido con pena privativa de libertad no menor de cinco ni mayor de ocho años e inhabilitación conforme a los incisos 1 y 2 del artículo 36 del Código Penal y con ciento ochenta a trescientos sesenta y cinco días-multa.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "397",
                titulo: "Cohecho activo genérico",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            El que, bajo cualquier modalidad, ofrece, da o promete a un funcionario o servidor público donativo, promesa, ventaja o beneficio para que realice u omita actos en violación de sus obligaciones, será reprimido con pena privativa de libertad no menor de cuatro ni mayor de seis años; inhabilitación, según corresponda, conforme a los incisos 1, 2 y 8 del artículo 36; y, con trescientos sesenta y cinco a setecientos treinta días-multa.
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            El que, bajo cualquier modalidad, offers, da o promete donativo, ventaja o beneficio para que el funcionario o servidor público realice u omita actos propios del cargo o empleo, sin faltar a su obligación, será reprimido con pena privativa de libertad no menor de tres ni mayor de cinco años; inhabilitación, según corresponda, conforme a los incisos 1, 2 y 8 del artículo 36; y, con trescientos sesenta y cinco a setecientos treinta días-multa.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "397-A",
                titulo: "Cohecho activo transnacional",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            El que, teniendo la nacionalidad peruana o la representación de una persona jurídica domiciliada en el Perú, bajo cualquier modalidad, ofrezca, otorgue o prometa directa o indirectamente a un funcionario o servidor público extranjero donativo, promesa, ventaja o beneficio indebido que redunde en su propio provecho o en el de otra persona, para que dicho servidor o funcionario público realice u omita actos propios de su cargo o empleo, en violación de sus obligaciones o sin faltar a su obligación para obtener o retener un negocio u otra ventaja indebida en la realización de actividades económicas o comerciales internacionales, será reprimido con pena privativa de la libertad no menor de cinco años ni mayor de ocho años; inhabilitación, según corresponda, conforme a los incisos 1, 2 y 8 del artículo 36; y, con trescientos sesenta y cinco a setecientos treinta días-multa.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "398",
                titulo: "Cohecho activo específico",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            El que, bajo cualquier modalidad, ofrece, da o promete donativo, ventaja o beneficio a un Magistrado, Fiscal, Perito, Árbitro, Miembro de Tribunal administrativo o análogo con el objeto de influir en la decisión de un asunto sometido a su conocimiento o competencia, será reprimido con pena privativa de libertad no menor de cinco ni mayor de ocho años; inhabilitación, según corresponda, conforme a los incisos 1, 2 y 8 del artículo 36; y, con trescientos sesenta y cinco a setecientos treinta días-multa.
                        </div>
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            Cuando el donativo, promesa, ventaja o beneficio se ofrece o entrega a un secretario, relator, especialista, auxiliar jurisdiccional, testigo, traductor o intérprete o análogo, la pena privativa de libertad será no menor de cuatro ni mayor de ocho años; inhabilitación, según corresponda, conforme a los incisos 1, 2, 3 y 4 del artículo 36; y, con trescientos sesenta y cinco a setecientos treinta días-multa.
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            Si el que ofrece, da o corrompe es abogado o forma parte de un estudio de abogados, la pena privativa de libertad será no menor de cinco ni mayor de ocho años; inhabilitación, según corresponda, conforme a los incisos 2, 3, 4 y 8 del artículo 36; y, con trescientos sesenta y cinco a setecientos treinta días-multa.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "398-A",
                titulo: "Cohecho activo en el ámbito de la función policial",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            El que, bajo cualquier modalidad, ofrece, da o promete a un miembro de la Policía Nacional donativo o cualquier ventaja o beneficio para que realice u omita actos en violación de sus obligaciones derivadas de la función policial, será reprimido con pena privativa de libertad no menor de cuatro ni mayor de ocho años.
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            El que, bajo cualquier modalidad, ofrece, da o promete a un miembro de la Policía Nacional donativo o cualquier ventaja o beneficio para que realice u omita actos propios de la función policial, sin faltar a las obligaciones que se derivan de ella, será reprimido con pena privativa de libertad no menor de tres ni mayor de seis años.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "398-B",
                titulo: "Inhabilitación",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            En los supuestos del artículo 398-A, cuando el agente corrompa a un miembro de la Policía Nacional en el ejercicio sus funciones, siempre que éstas correspondan al tránsito o seguridad vial, se le impondrá además inhabilitación consistente en la cancelación o incapacidad definitiva, según sea el caso, para obtener autorización para conducir, de conformidad con el inciso 7 del artículo 36.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "399",
                titulo: "Negociación incompatible o aprovechamiento indebido de cargo",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            El funcionario o servidor público que indebidamente en forma directa o indirecta o por acto simulado se interesa, en provecho propio o de tercero, por cualquier contrato u operación en que interviene por razón de su cargo, será reprimido con pena privativa de libertad no menor de cuatro ni mayor de seis años e inhabilitación conforme a los incisos 1 y 2 del artículo 36 del Código Penal y con ciento ochenta a trescientos sesenta y cinco días-multa.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "400",
                titulo: "Tráfico de influencias",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            El que, invocando o teniendo influencias reales o simuladas, recibe, hace dar o prometer para sí o para un tercero, donativo o promesa o cualquier otra ventaja o beneficio con el ofrecimiento de interceder ante un funcionario o servidor público que ha de conocer, esté conociendo o haya conocido un caso judicial o administrativo, será reprimido con pena privativa de libertad no menor de cuatro ni mayor de seis años; inhabilitación, según corresponda, conforme a los incisos 2, 3, 4 y 8 del artículo 36; y con ciento ochenta a trescientos sesenta y cinco días-multa.
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            Si el agente es un funcionario o servidor público, será reprimido con pena privativa de libertad no menor de cuatro ni mayor de ocho años; inhabilitación, según corresponda, conforme a los incisos 1, 2 y 8 del artículo 36; y, con trescientos sesenta y cinco a setecientos treinta días-multa.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "401",
                titulo: "Enriquecimiento ilícito",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            El funcionario o servidor público que, abusando de su cargo, incrementa ilícitamente su patrimonio respecto de sus ingresos legítimos será reprimido con pena privativa de libertad no menor de cinco ni mayor de diez años; inhabilitación, según corresponda, conforme a los incisos 1, 2 y 8 del artículo 36; y, con trescientos sesenta y cinco a setecientos treinta días-multa.
                        </div>
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            Si el agente es un funcionario público que ha ocupado cargos de alta dirección en las entidades, organismos o empresas del Estado, o está sometido a la prerrogativa del antejuicio y la acusación constitucional, será reprimido con pena privativa de libertad no menor de diez ni mayor de quince años; inhabilitación, según corresponda, conforme a los incisos 1, 2 y 8 del artículo 36; y, con trescientos sesenta y cinco a setecientos treinta días-multa.
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            Se considera que existe indicio de enriquecimiento ilícito cuando el aumento del patrimonio o del gasto económico personal del funcionario o servidor público, en consideración a su declaración jurada de bienes y rentas, es notoriamente superior al que normalmente haya podido tener en virtud de sus sueldos o emolumentos percibidos o de los incrementos de su capital o de sus ingresos por cualquier otra causa lícita.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "401-A",
                titulo: "Decomiso",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            En todo caso, los donativos, dádivas o presentes serán decomisados.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "401-B",
                titulo: "Enriquecimiento ilícito",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                        Los bienes decomisados e incautados durante la investigación policial y proceso judicial, serán puestos a disposición del Ministerio de Justicia; el que los asignará para su uso en servicio oficial o del Poder Judicial y el Ministerio Público, en su caso, bajo responsabilidad.    
                        </div>
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            De dictarse sentencia judicial absolutoria se dispondrá la devolución del bien a su propietario.
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                        Los bienes decomisados o incautados definitivamente serán adjudicados al Estado y afectados en uso a los mencionados organismos públicos. Aquellos bienes que no sirvan para este fin serán vendidos en pública subasta y su producto constituirá ingresos del Tesoro Público.    
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "401-C",
                titulo: "Derogado",
                texto: `
                        <div style="text-align: justify; line-height: 1.5; color: #777; font-style: italic;">
                            Derogado conforme al Decreto Legislativo 1352 del 07/01/2017. 
                        </div>`
            }
        ]
    },
    {
        titulo: ``,
        capitulo: `
                <div style="text-align: center; margin-top: 30px;">
                    <div style="margin-bottom: 15px;">CAPÍTULO III</div>
                    <div>DELITOS CONTRA LA ADMINISTRACIÓN DE JUSTICIA</div>
                    <div style="margin-top: 20px; margin-bottom: 10px; font-weight: bold;">SECCIÓN I</div>
                    <div>DELITOS CONTRA LA FUNCIÓN JURISDICCIONAL</div>
                </div>`,
        articulos: [
            {
                tipo: "Artículo",
                numero: "402",
                titulo: "Denuncia calumniosa",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            El que denuncia a la autoridad un hecho punible, a sabiendas de que no se ha cometido o que ha sido cometido por persona distinta a la denunciada, o el que simula o adultera pruebas o indicios de su comisión que puedan servir de motivo para un proceso penal o el que falsamente se atribuye delito no cometido o que ha sido cometido por otro, será reprimido con pena privativa de libertad no mayor de tres años y con ciento ochenta a trescientos sesenta y cinco días-multa.
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            Cuando la simulación o adulteración directa o indirecta de pruebas o indicios sea efectuada por miembros de la Policía Nacional u otro funcionario o servidor público encargado de la prevención del delito, y que puedan servir de sustento para un proceso penal por tráfico ilícito de drogas, la pena será privativa de libertad no menor de tres ni mayor de seis años y trescientos sesenta y cinco a setecientos treinta días-multa.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "403",
                titulo: "Ocultamiento de menor a las investigaciones",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            El que oculta a un menor de edad a las investigaciones de la justicia o de la que realiza la autoridad competente, será reprimido con pena privativa de libertad no menor de uno ni mayor de tres años.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "404",
                titulo: "Encubrimiento personal",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            El que sustrae a una persona de la persecución penal o a la ejecución de una pena o de otra medida ordenada por la justicia, será reprimido con pena privativa de libertad no menor de tres ni mayor de seis años.
                        </div>
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            Si el Agente sustrae al autor de los delitos previstos en los artículos 152 al 153-A, 200, 273 al 279-D, 296 al 298, 315, 317, 318-A, 325 al 333; 346 al 350, en la Ley Nº 27765 (Ley Penal contra el Lavado de Activos) o en el Decreto Ley Nº 25475 (Establecen la penalidad para los delitos de terrorismo y los procedimientos para la investigación, la instrucción y el juicio), la pena privativa de libertad será no menor de siete ni mayor de de diez años y de ciento ochenta a trescientos sesenta y cinco días-multa.
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            Si el autor del encubrimiento personal es funcionario o servidor público encargado de la investigación del delito o de la custodia del delincuente, la pena será privativa de libertad no menor de diez ni mayor de quince años.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "405",
                titulo: "Encubrimiento real",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            El que dificulta la acción de la justicia procurando la desaparición de las huellas o prueba del delito u ocultando los efectos del mismo, será reprimido con pena privativa de libertad no menor de dos ni mayor de cuatro años.
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            Si el hecho se comete respecto a los delitos previstos en los artículos 152 al 153-A, 200, 273 al 279-D, 296 al 298, 315, 317, 318-A, 325 al 333; 346 al 350 o en el Decreto Ley Nº 25475 (Establecen la penalidad para los delitos de terrorismo o los procedimientos para la investigación, la instrucción y el juicio), la pena privativa de libertad será no menor de siete ni mayor de diez años y de ciento ochenta a trescientos sesenta y cinco días multa.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "406",
                titulo: "Excusa absolutoria",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            Están exentos de pena los que ejecutan cualquiera de los hechos previstos en los artículos 404º y 405º si sus relaciones con la persona favorecida son tan estrechas como para excusar su conducta.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "407",
                titulo: "Omisión de denuncia",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            El que omite comunicar a la autoridad las noticias que tenga acerca de la comisión de algún delito, cuando esté obligado a hacerlo por su profesión o empleo, será reprimido con pena privativa de libertad no mayor de dos años.
                        </div>
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            Si el hecho punible no denunciado tiene señalado en la ley pena privativa de libertad superior a cinco años, la pena será no menor de dos ni mayor de cuatro años.
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            Si la omisión está referida a los delitos de genocidio, tortura o desaparición forzada, la pena será no menor de dos ni mayor de seis años.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "408",
                titulo: "Fuga del lugar del accidente de tránsito",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            El que, después de un accidente automovilístico o de otro similar en el que ha tenido parte y del que han resultado lesiones o muerte, se aleja del lugar para sustraerse a su identificación o para eludir las comprobaciones necesarias o se aleja por razones atendibles, pero omite dar cuenta inmediata a la autoridad, será reprimido con pena privativa de libertad no menor de seis meses ni mayor de cuatro años y con noventa a ciento veinte días-multa.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "409",
                titulo: "Falsedad en juicio",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            El testigo, perito, traductor o intérprete que, en un procedimiento judicial, hace falsa declaración sobre los hechos de la causa o emite dictamen, traducción o interpretación falsos, será reprimido con pena privativa de libertad, no menor de dos ni mayor de cuatro años.
                        </div>
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            Si el testigo, en su declaración, atribuye a una persona haber cometido un delito, a sabiendas que es inocente, la pena será no menor de dos ni mayor de seis años.
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            El Juez puede atenuar la pena hasta límites inferiores al mínimo legal o eximir de sanción, si el agente rectifica espontáneamente su falsa declaración antes de ocasionar perjuicio.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "409-A",
                titulo: "Obstrucción de la justicia",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            El que mediante el uso de fuerza física, amenaza, ofrecimiento o concesión de un beneficio indebido, impide u obstaculiza se preste un testimonio o la aportación de pruebas o induce a que se preste un falso testimonio o pruebas falsas, será sancionado con pena privativa de libertad no menor de tres ni mayor de cinco años.
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            Si el hecho se comete respecto en la investigación preliminar o proceso penal por delito previsto en los artículos 152 al 153-A, 200, 296 al 298 o en la Ley Nº 27765 (Ley Penal contra el Lavado de Activos), la pena privativa de libertad será no menor de cinco ni mayor de ocho años y de ciento ochenta a trescientos sesenta y cinco días multa.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "409-B",
                titulo: "Revelación indebida de identidad",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            El que indebidamente revela la identidad de un colaborador eficaz, testigo, agraviado o perito protegido, Agente Encubierto o especial, o información que permita su identificación, será reprimido con pena privativa de libertad no menor de cuatro ni mayor de seis años.
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            Cuando el Agente es funcionario o servidor público y por el ejercicio de su cargo tiene acceso a la información, la pena será no menor de cinco ni mayor de siete años, e inhabilitación conforme al artículo 36, incisos 1, 2 y 4.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "409-C",
                titulo: "Revelación de información reservada por servidor o funcionario público",
                texto: `
                        <div style="display: flex; margin-bottom: 15px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 65px;">409-C.1.</span>
                            <div>El funcionario o servidor público que, indebidamente, exhiba, filtre, entregue, capture mediante cualquier medio técnico, permita el acceso indebido u omita dolosamente la protección debida de la información de carácter reservado, a la que haya tenido acceso o tomado conocimiento en razón de su cargo, sobre el contenido de la(s) denuncia(s), identidad del denunciante que goce de reserva conforme a ley, diligencias policiales o fiscales reservadas antes de su ejecución, en la investigación o proceso por los delitos de extorsión, secuestro o sicariato, será reprimido con pena privativa de libertad no menor de cinco (05) ni mayor de siete (07) años, inhabilitación conforme al artículo 36, incisos 1, 2 y 8, y con ciento ochenta a trescientos sesenta y cinco días-multa.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 10px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 65px;">409-C.2.</span>
                            <div>La pena será no menor de siete (07) ni mayor de diez (10) años, inhabilitación conforme al artículo 36, incisos 1, 2 y 8, y con trescientos sesenta y cinco a setecientos treinta días-multa, en cualquiera de los siguientes supuestos:</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; margin-left: 65px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 30px;">a)</span>
                            <div>Como consecuencia se frustre o genere un riesgo concreto para la ejecución de diligencia(s) fiscal(es) o policial(es) reservadas, o se comprometa gravemente la continuidad o resultado de la investigación o proceso penal.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; margin-left: 65px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 30px;">b)</span>
                            <div>Se ponga en peligro concreto la vida, integridad o seguridad del denunciante al vulnerar los sistemas de protección de reserva de identidad establecidos por Ley.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; margin-left: 65px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 30px;">c)</span>
                            <div>Cuando el agente, aprovechando su posición funcional, mercantilice la información reservada, obteniendo o pretendiendo obtener un beneficio económico, ventaja o promesa para sí o para un tercero.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; margin-left: 65px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 30px;">d)</span>
                            <div>La información reservada sea transmitida a una organización criminal o utilizada para amenazar al denunciante.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 15px; margin-left: 65px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 30px;">e)</span>
                            <div>Cuando la conducta recaiga sobre información reservada que, conforme al artículo 324 del Código Procesal Penal, haya sido formalmente declarada secreta en el proceso penal.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 15px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 65px;">409-C.3.</span>
                            <div>No constituye delito, la conducta efectuada por el servidor o funcionario público, cuando tenga por finalidad poner en conocimiento público hechos que razonablemente puedan constituir un delito de persecución pública.</div>
                        </div>
                        <div style="display: flex; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 65px;">409-C.4.</span>
                            <div>No constituye delito, ni participación delictiva, la publicación de información por parte de periodistas y medios de comunicación en el ejercicio de las libertades de información y de prensa.</div>
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "410",
                titulo: "Avocamiento ilegal de proceso en trámite",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            La autoridad que, a sabiendas, se avoque a procesos en trámite ante el órgano jurisdiccional, será reprimida con pena privativa de libertad no mayor de dos años e inhabilitación conforme al artículo 36, incisos 1, 2 y 4.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "411",
                titulo: "Falsa declaración en procedimiento administrativo",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            El que, en un procedimiento administrativo, hace una falsa declaración en relación a hechos o circunstancias que le corresponde probar, violando la presunción de veracidad establecida por ley, será reprimido con pena privativa de libertad no menor de uno ni mayor de cuatro años.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "412",
                titulo: "Expedición de prueba o informe falso en proceso judicial",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            El que, legalmente requerido en causa judicial en la que no es parte, expide una prueba o un informe falsos, niega o calla la verdad, en todo o en parte, será reprimido con pena privativa de libertad no mayor de tres años.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "413",
                titulo: "Evasión mediante violencia o amenaza",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            El que, estando legalmente privado de su libertad, se evade por medio de violencia o amenaza, será reprimido con pena privativa de libertad no mayor de tres años.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "413-A",
                titulo: "Afectación al sistema de vigilancia electrónica personal",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            El que, estando legalmente procesado o condenado bajo la aplicación de vigilancia electrónica personal, daña, destruye, inutiliza el dispositivo electrónico que porta, o bloquea o altera su funcionamiento, para dificultar su ubicación, sustraerse de la persecución penal o a la ejecución de una pena o de otra medida ordenada por la justicia, será reprimido con pena privativa de la libertad no menor de dos ni mayor de cuatro años.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "413-B",
                titulo: "Evasión del régimen semi-abierto",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            El interno sentenciado que, habiendo accedido al régimen semi-abierto, se evade o no retorna injustificadamente al establecimiento penitenciario, es reprimido con pena privativa de libertad no menor de dos ni mayor de cuatro años.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "414",
                titulo: "Favorecimiento a la fuga",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            El que, por violencia, amenaza o astucia, hace evadir a un preso, detenido o interno o le presta asistencia en cualquier forma para evadirse, será reprimido con pena privativa de libertad no menor de dos ni mayor de cuatro años.
                        </div>
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            Si el agente que hace evadir, o presta asistencia para tal efecto, es funcionario o servidor público, la pena será privativa de libertad no menor de tres ni mayor de ocho años.
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            Si el agente actuó por culpa, la pena será no mayor de un año.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "415",
                titulo: "Amotinamiento de detenido o interno",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            El detenido o interno que se amotina atacando a un funcionario del establecimiento o a cualquier persona encargada de su custodia, u obligando por la violencia o amenaza a un funcionario del establecimiento o a cualquier persona encargada de su custodia a practicar o abstenerse de un acto, con el fin de evadirse, será reprimido con pena privativa de libertad no menor de cuatro ni mayor de seis años.
                        </div>
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            Si el agente provoca un motín, disturbio o cualquier violación contra la integridad física de cualquier persona o de la seguridad interna o externa del recinto, será reprimido con pena privativa de libertad no menor de seis ni mayor de ocho años.
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            Los cabecillas o dirigentes del motín serán sancionados con la pena señalada, aumentada en una tercera parte.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "416",
                titulo: "Fraude procesal",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            El que, por cualquier medio fraudulento, induce a error a un funcionario o servidor público para obtener resolución contraria a la ley, será reprimido con pena privativa de libertad no menor de dos ni mayor de cuatro años.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "417",
                titulo: "Ejercicio arbitrario de derecho. Justicia por propia mano",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            El que, con el fin de ejercer un derecho, en lugar de recurrir a la autoridad, se hace justicia arbitrariamente por si mismo, será reprimido con prestación de servicio comunitario de veinte a cuarenta jornadas.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "417-A",
                titulo: "Insolvencia provocada",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            El responsable civil por un hecho delictivo que, con posterioridad a la realización del mismo y con la finalidad de eludir total o parcialmente el cumplimiento de la reparación civil correspondiente, realiza actos de disposición o contrae obligaciones que disminuyan su patrimonio, haciéndose total o parcialmente insolvente, será reprimido con pena privativa de libertad no menor de dos años ni mayor de cuatro.
                        </div>
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            La misma pena se aplicará a quien como representante de una persona jurídica, con posterioridad a la realización de un hecho delictivo, dispone de los bienes de su representada, con la finalidad de eludir total o parcialmente la imposición de una consecuencia accesoria en el proceso penal respectivo.
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            Si el hecho se comete respecto a proceso por delito previsto en los artículos 152 al 153-A, 200, 296 al 298, en la Ley Nº 27765, Ley Penal contra el Lavado de Activos o en el Decreto Ley Nº 25475 (Establecen la penalidad para los delitos de terrorismo y los procedimientos para la investigación, la instrucción y el juicio), será sancionado con pena privativa de libertad no menor de tres ni mayor de seis años.
                        </div>`
            }
        ]
    },
    {
        titulo: ``,
        capitulo: `
                <div style="text-align: center; margin-top: 30px;">
                    <div style="margin-bottom: 10px; font-weight: bold;">SECCIÓN II</div>
                    <div>PREVARICATO</div>
                </div>`,
        articulos: [
            {
                tipo: "Artículo",
                numero: "418",
                titulo: "Prevaricato",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            El Juez o el Fiscal que dicta resolución o emite dictamen, manifiestamente contrarios al texto expreso y claro de la ley, o cita pruebas inexistentes o hechos falsos, o se apoya en leyes supuestas o derogadas, será reprimido con pena privativa de libertad no menor de tres ni mayor de cinco años.
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            Asimismo, el Juez o el Fiscal que, incumpliendo dolosamente sus deberes funcionales, ordena o dispone la libertad de una persona detenida en flagrancia por la Policía Nacional del Perú o detenida por arresto ciudadano por la comisión de delitos cuya pena privativa de libertad es mayor de cinco años, será reprimido con pena privativa de libertad no menor de ocho ni mayor de doce años.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "419",
                titulo: "Detención ilegal",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            El Juez que, maliciosamente o sin motivo legal, ordena la detención de una persona o no otorga la libertad de un detenido o preso, que debió decretar, será reprimido con pena privativa de libertad no menor de dos ni mayor de cuatro años.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "420",
                titulo: "Prohibición de conocer un proceso que patrocinó",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            El Juez o Fiscal que conoce en un proceso que anteriormente patrocinó como abogado, será reprimido con pena privativa de libertad no mayor de dos años.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "421",
                titulo: "Patrocinio indebido de abogado o mandatario judicial",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            El Abogado o mandatario judicial que, después de haber patrocinado o representado a una parte en un proceso judicial o administrativo, asume la defense o representación de la parte contraria en el mismo proceso, será reprimido con pena privativa de libertad no mayor de dos años.
                        </div>`
            }
        ]
    },
    {
        titulo: ``,
        capitulo: `
                <div style="text-align: center; margin-top: 30px;">
                    <div style="margin-bottom: 10px; font-weight: bold;">SECCIÓN III</div>
                    <div>DENEGACIÓN Y RETARDO DE JUSTICIA</div>
                </div>`,
        articulos: [
            {
                tipo: "Artículo",
                numero: "422",
                titulo: "Negativa a administrar justicia",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            El Juez que se niega a administrar justicia o que elude juzgar bajo pretexto de defecto o deficiencia de la ley, será reprimido con pena privativa de libertad no menor de uno ni mayor de cuatro años.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "423",
                titulo: "Negativa al cumplimiento de obligaciones de notario y auxiliares jurisdiccionales",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            El notario o secretario de juzgado o fiscalía o cualquier otro auxiliar de justicia que se niega a cumplir las obligaciones que legalmente le corresponde, será reprimido con pena privativa de libertad no mayor de un año, o con treinta a sesenta días-multa.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "424",
                titulo: "Omisión de ejercicio de la acción penal",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            El Fiscal que omite ejercitar la acción penal será reprimido con pena privativa de libertad no menor de uno ni mayor de cuatro años.
                        </div>`
            }
        ]
    },
    {
        titulo: ``,
        capitulo: `
                <div style="text-align: center; margin-top: 30px;">
                    <div style="margin-bottom: 15px;">CAPÍTULO IV</div>
                    <div>DISPOSICIONES COMUNES</div>
                </div>`,
        articulos: [
            {
                tipo: "Artículo",
                numero: "425",
                titulo: "Funcionario o servidor público",
                texto: `
                        <div style="margin-bottom: 10px; text-align: justify; line-height: 1.5;">
                            Son funcionarios o servidores públicos:
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">1.</span>
                            <div>Los que están comprendidos en la carrera administrativa.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">2.</span>
                            <div>Los que desempeñan cargos políticos o de confianza, incluso si emanan de elección popular.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">3.</span>
                            <div>Todo aquel que, independientemente del régimen laboral en que se encuentre, mantiene vínculo laboral o contractual de cualquier naturaleza con entidades u organismos del Estado, incluidas las empresas del Estado o sociedades de economía mixta comprendidas en la actividad empresarial del Estado, y que en virtud de ello ejerce funciones en dichas entidades u organismos.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">4.</span>
                            <div>Los administradores y depositarios de caudales embargados o depositados por autoridad competente, aunque pertenezcan a particulares.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">5.</span>
                            <div>Los miembros de las Fuerzas Armadas y Policía Nacional.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">6.</span>
                            <div>Los designados, elegidos o proclamados, por autoridad competente, para desempeñar actividades o funciones en nombre o al servicio del Estado o sus entidades.</div>
                        </div>
                        <div style="display: flex; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">7.</span>
                            <div>Los demás indicados por la Constitución Política y la ley.</div>
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "425-A",
                titulo: "Funcionario o servidor público extranjero",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            Es funcionario o servidor público extranjero todo aquel que, independientemente de la naturaleza del vínculo que mantenga con las entidades u organismos de un Estado extranjero, cuerpos castrenses, policiales o cualquier agencia de seguridad nacional extranjera, empresas o sociedades que estén comprendidas en la actividad empresarial de un Estado extranjero y que en virtud de ello actúan como miembro, funcionario, designado, nombrado o representante de estos, incluso si su cargo emana de elección popular. Se incluye dentro de estos alcances a quienes ejercen estas funciones o roles en los organismos internacionales.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "426",
                titulo: "Inhabilitación",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            Los delitos previstos en los capítulos II y III de este título, que no contemplan la pena de inhabilitación, son sancionados, además, conforme a los incisos 1, 2, 4 y 8 del artículo 36. La inhabilitación en este caso es de uno a cinco años.
                        </div>
                        <div style="margin-bottom: 10px; text-align: justify; line-height: 1.5;">
                            En el caso de los artículos 382, 383, 384, 387, 388, 389, 393, 393-A, 394, 395, 396, 397, 397-A, 398, 399, 400 y 401 la pena de inhabilitación principal será de cinco a veinte años. En estos casos, será perpetua cuando ocurra cualquiera de los siguientes supuestos:
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">1.</span>
                            <div>El agente actúe como integrante de una organización criminal, como persona vinculada o por encargo de ella.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">2.</span>
                            <div>La conducta recaiga sobre programas con fines asistenciales, de apoyo o inclusión social o de desarrollo.</div>
                        </div>
                        <div style="display: flex; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">3.</span>
                            <div>El agente se aproveche de una situación de calamidad pública o emergencia sanitaria, o la comisión del delito comprometa la defensa, seguridad o soberanía nacional.</div>
                        </div>`
            }
        ]
    },
    {
        titulo: `
                <div style="text-align: center; margin-top: 30px;">
                    <div style="margin-bottom: 15px;">TÍTULO XIX</div>
                    <div>DELITOS CONTRA LA FE PÚBLICA</div>
                </div>`,
        capitulo: `
                <div style="text-align: center; margin-top: 30px;">
                    <div style="margin-bottom: 15px;">CAPÍTULO I</div>
                    <div>FALSIFICACIÓN DE DOCUMENTOS EN GENERAL</div>
                </div>`,
        articulos: [
            {
                tipo: "Artículo",
                numero: "427",
                titulo: "Falsificación de documentos",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            El que hace, en todo o en parte, un documento falso o adultera uno verdadero que pueda dar origen a derecho u obligación o servir para probar un hecho, con el propósito de utilizar el documento, será reprimido, si de su uso puede resultar algún perjuicio, con pena privativa de libertad no menor de dos ni mayor de diez años y con treinta a no venta días-multa si se trata de un documento público, registro público, título auténtico o cualquier otro trasmisible por endoso o al portador y con pena privativa de libertad no menor de dos ni mayor de cuatro años, y con ciento ochenta a trescientos sesenticinco días-multa, si se trata de un documento privado.
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            El que hace uso de un documento falso o falsificado, como si fuese legítimo, siempre que de su uso pueda resultar algún perjuicio, será reprimido, en su caso, con las mismas penas.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "428",
                titulo: "Falsedad ideológica",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            El que inserta o hace insertar, en instrumento público, declaraciones falsas concernientes a hechos que deban probarse con el documento, con el objeto de emplearlo como si la declaración fuera conforme a la verdad, será reprimido, si de su uso puede resultar algún perjuicio, con pena privativa de libertad no menor de tres ni mayor de seis años y con ciento ochenta a trescientos sesenticinco días-multa.
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            El que hace uso del documento como si el contenido fuera exacto, siempre que de su uso pueda resultar algún perjuicio, será reprimido, en su caso, con las mismas penas.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "428-B",
                titulo: "Falsedad en el reporte de los volúmenes de pesca capturados",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            El que, estando incluido dentro del régimen de Límites Máximos de Captura por Embarcación establecido por Ley, inserta o hace insertar en cualquier documento donde se consigne la información referente a los volúmenes de captura, información falsa o distinta respecto al volumen realmente capturado, será reprimido con pena privativa de libertad no menor de tres ni mayor de seis años y con ciento ochenta a trescientos sesenta y cinco días-multa.
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            Con igual pena será reprimido quien altera o ayuda a la alteración de los instrumentos de pesaje con los que se calcula los volúmenes de pesca capturados, si dicha alteración tiene la finalidad de consignar un volumen distinto al realmente capturado.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "429",
                titulo: "Omisión de consignar declaraciones en documentos",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            El que omite en un documento público o privado declaraciones que deberían constar o expide duplicados con igual omisión, al tiempo de ejercer una función y con el fin de dar origen a un hecho u obligación, será reprimido con pena privativa de libertad no menor de uno ni mayor de seis años.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "430",
                titulo: "Supresión, destrucción u ocultamiento de documentos",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            El que suprime, destruye u oculta un documento, en todo o en parte de modo que pueda resultar perjuicio para otro, será reprimido con la pena señalada en los artículos 427 y 428, según sea el caso.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "431",
                titulo: "Expedición de certificado médico falso",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            El médico que, maliciosamente, expide un certificado falso respecto a la existencia o no existencia, presente o pasada, de enfermedades físicas o mentales, será reprimido con pena privativa de libertad no mayor de tres años e inhabilitación de uno a dos años conforme al artículo 36, incisos 1 y 2.
                        </div>
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            Cuando se haya dado la falsa certificación con el objeto que se admita o interne a una persona en un hospital para enfermos mentales, la pena será privativa de libertad no menor de tres ni mayor de seis años e inhabilitación de dos a cuatro años conforme al artículo 36, incisos 1 y 2.
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            El que haga uso malicioso de la certificación, según el caso de que se trate, será reprimido con las mismas penas privativas de libertad.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "431-A",
                titulo: "Simulación de accidente de tránsito",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            El que, con el propósito de gozar de los beneficios o coberturas del Seguro Obligatorio de Accidentes de Tránsito, incita a la simulación o simula la ocurrencia de accidentes de tránsito o la intervención en éstos de personas que no tienen la condición de ocupantes o terceros no ocupantes del vehículo automotor interviniente en dichos accidentes o simula lesiones corporales que no se han producido o que se han producido en grado manifiestamente menor al indicado en la documentación policial o médica correspondiente, será reprimido con pena privativa de la libertad no menor de tres (3) ni mayor de seis (6) años.
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            Si el agente es efectivo de la Policía Nacional del Perú o del Cuerpo General de Bomberos Voluntarios del Perú, agente o intermediario de seguros, profesional médico o funcionario de un establecimiento de salud público o privado, la pena privativa de la libertad será no menor de tres (3) ni mayor de seis (6) años, imponiéndosele además la pena accesoria de inhabilitación para el ejercicio del cargo por un periodo similar a la pena principal.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "432",
                titulo: "Inhabilitación",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            Cuando algunos de los delitos previstos en este Capítulo sea cometido por un funcionario o servidor público o notario, con abuso de sus funciones, se le impondrá, además, la pena de inhabilitación de uno a tres años conforme al artículo 36, incisos 1 y 2.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "433",
                titulo: "Equiparación a documento público",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            Para los efectos de este Capítulo se equiparan a documento público, los testamentos ológrafo y cerrado, los títulos-valores y los títulos de crédito transmisibles por endoso o al portador.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "434",
                titulo: "Fabricación o falsificación de sellos o timbres oficiales",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            El que fabrica, fraudulentamente, o falsifica sellos o timbres oficiales de valor, especialmente estampillas de correos, con el objeto de emplearlos o hacer que los empleen otras personas o el que da a dichos sellos o timbres oficiales ya usados la apariencia de validez para emplearlos nuevamente, será reprimido con pena privativa de libertad no menor de dos ni mayor de cinco años y con noventa a ciento ochenta días-multa.
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            Cuando el agente emplea como auténticos o todavía válidos los sellos o timbres oficiales de valor que son falsos, falsificados o ya usados, la pena será privativa de libertad no menor de uno ni mayor de tres años y de sesenta a no venta días-multa.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "435",
                titulo: "Fabricación fraudulenta o falsificación de marcas o contraseñas oficiales",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            El que fabrica, fraudulentamente, o falsifica marcas o contraseñas oficiales destinadas a hacer constar el resultado de un examen de la autoridad o la concesión de un permiso o la identidad de un objeto o el que a sabiendas de su procedencia ilícita hace uso de tales marcas, será reprimido con pena privativa de libertad no mayor de tres años.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "436",
                titulo: "Inhabilitación",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            Cuando el agente de alguno de los delitos comprendidos en este Capítulo es funcionario o servidor público, será reprimido, además, con pena de inhabilitación de uno a tres años conforme al artículo 36 incisos 1 y 2.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "437",
                titulo: "Marcas y sellos extranjeros equiparados a los nacionales",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            Las disposiciones de este Capítulo son aplicables a los sellos, marcas oficiales y timbres de procedencia extranjera.
                        </div>`
            }
        ]
    },
    {
        titulo: ``,
        capitulo: `
                <div style="text-align: center; margin-top: 30px;">
                    <div style="margin-bottom: 15px;">CAPÍTULO II-A</div>
                    <div>DELITOS QUE ATENTAN CONTRA LA IDENTIFICACIÓN GENÉTICA DE PERSONAS</div>
                </div>`,
        articulos: [
            {
                tipo: "Artículo",
                numero: "437-A",
                titulo: "Delitos que atentan contra la identificación genética de personas",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            El que falsifica, sustituye, oculta o altera material genético humano, resultado de la toma de muestras biológicas, de las evidencias o de la escena del crimen, o de los perfiles genéticos incorporados en el Banco Nacional de Datos de Perfiles Genéticos (BNDPG), será reprimido con pena privativa de libertad no menor de cinco ni mayor de siete años.
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            Si la conducta típica descrita en el párrafo anterior permite la condena o absolución de un imputado o causa perjuicio en los derechos de cualquier sujeto materia de investigación policial o proceso judicial, será reprimido con pena privativa de libertad no menor de quince ni mayor de veinte años.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "437-B",
                titulo: "Delitos que atentan contra la reserva de los perfiles genéticos",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            El que obtiene de manera ilegítima o divulga o comercializa información genética obtenida de muestras o perfiles genéticos incorporados en el Banco Nacional de Datos de Perfiles Genéticos (BNDPG) será reprimido con pena privativa de libertad no menor de diez ni mayor de quince años.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "437-C",
                titulo: "Inhabilitación",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            Cuando algunos de los delitos establecidos en este capítulo sean cometidos por funcionario o servidor público, se impone, además de la pena privativa de libertad prevista en los artículos 437-A o 437-B, la pena de inhabilitación dispuesta en los numerales 1 y 2 del artículo 36, por el mismo periodo de la condena.
                        </div>`
            }
        ]
    },
    {
        titulo: ``,
        capitulo: `
                <div style="text-align: center; margin-top: 30px;">
                    <div style="margin-bottom: 15px;">CAPÍTULO III</div>
                    <div>DISPOSICIONES COMUNES</div>
                </div>`,
        articulos: [
            {
                tipo: "Artículo",
                numero: "438",
                titulo: "Falsedad genérica",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            El que de cualquier otro modo que no esté especificado en los Capítulos precedentes, comete falsedad simulando, suponiendo, alterando la verdad intencionalmente y con perjuicio de terceros, por palabras, hechos o usurpando nombre, calidad o empleo que no le corresponde, suponiendo viva a una persona fallecida o que no ha existido o viceversa, será reprimido con pena privativa de libertad no menor de dos ni mayor de cuatro años.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "438-A",
                titulo: "Falsedad genérica agravada",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            El que otorgue, expida u oferte certificados, diplomas u otras constancias que atribuyan grado académico, título profesional, título de segunda especialidad profesional, nivel de especialización u otra capacidad análoga, sin que el beneficiario haya llevado efectivamente los estudios correspondientes, será reprimido con pena privativa de libertad no menor de tres ni mayor de cinco años y sesenta a ciento cincuenta días-multa.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "439",
                titulo: "Fabricación o tenencia de instrumentos para falsificar",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            El que, a sabedoras, fabrica o introduce en el territorio de la República o conserva en su poder máquinas, cuños, marcas o cualquier otra clase de útiles o instrumentos, destinados a la falsificación de timbres, estampillas, marcas oficiales o cualquier especie valorada, será reprimido con pena privativa de libertad no menor de tres ni mayor de seis años.
                        </div>`
            }
        ]
    },
    {
        titulo: `
                <div style="text-align: center;">
                    <div style="margin-bottom: 10px;">LIBRO TERCERO</div>
                    <div>FALTAS</div>
                </div>
                <div style="text-align: center; margin-top: 30px;">
                    <div style="margin-bottom: 5px;">TÍTULO I</div>
                    <div>DISPOSICIONES FUNDAMENTALES</div>
                </div>`,
        capitulo: ``,
        articulos: [
            {
                tipo: "Artículo",
                numero: "440",
                titulo: "Disposiciones comunes",
                texto: `
                        <div style="margin-bottom: 10px; text-align: justify; line-height: 1.5;">
                            Son aplicables a las faltas las disposiciones contenidas en el Libro Primero, con las modificaciones siguientes:
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">1.</span>
                            <div>No es punible la tentativa, salvo en el caso de las faltas previstas en el primer y segundo párrafos de los artículos 441 y 444.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">2.</span>
                            <div>Solo responde el autor.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">3.</span>
                            <div>Las penas que pueden imponerse son las limitativas de derechos y multa, salvo los casos de reincidencia o habitualidad en faltas dolosas reguladas en los artículos 441 y 444, en cuyos casos se reprime con pena privativa de libertad del delito aplicable.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">4.</span>
                            <div>Los días-multa no serán menos de diez ni más de ciento ochenta.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">5.</span>
                            <div>La acción penal y la pena prescriben al año. En caso de reincidencia y habitualidad, prescriben a los dos años. Las faltas previstas en los artículos 441 y 444 prescriben a los tres años, salvo en los supuestos de reincidencia o habitualidad, en cuyo caso es de aplicación el artículo 80.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">6.</span>
                            <div>La investigación está a cargo de la autoridad policial y el juzgamiento corresponde a los jueces de paz letrados o a los jueces de paz.</div>
                        </div>
                        <div style="display: flex; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">7.</span>
                            <div>Constituye circunstancia agravante la reincidencia. El juez puede aumentar la pena hasta el doble del máximo legal fijado, salvo en el caso de reincidencia en las faltas dolosas previstas en los artículos 441 y 444, según lo dispuesto en el numeral 3 del presente artículo.</div>
                        </div>`
            }
        ]
    },
    {
        titulo: `
                <div style="text-align: center; margin-top: 30px;">
                    <div style="margin-bottom: 15px;">TÍTULO II</div>
                    <div>FALTAS CONTRA LA PERSONA</div>
                </div>`,
        capitulo: ``,
        articulos: [
            {
                tipo: "Artículo",
                numero: "441",
                titulo: "Lesión dolosa y lesión culposa",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            El que, de cualquier manera, causa a otro una lesión dolosa en el cuerpo o en la salud física o mental que requiera hasta diez días de asistencia o descanso, o nivel leve de daño psíquico, según prescripción facultativa, será reprimido con prestación de servicio comunitario de cuarenta a sesenta jornadas, siempre que no concurran circunstancias o medios que den gravedad al hecho, en cuyo caso es considerado como delito. Se considera circunstancia agravante y se incrementará la prestación de servicios comunitarios a ochenta jornadas cuando la víctima sea menor de catorce años o el agente sea el tutor, guardador o responsable de aquella.
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            Cuando la lesión se causa por culpa y ocasiona hasta cinco días de incapacidad, la pena será de sesenta a ciento veinte días-multa.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "442",
                titulo: "Maltrato",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            El que maltrata a otro física o psicológicamente, o lo humilla, denigra o menosprecia de modo reiterado, sin causarle lesión o daño psicológico, será reprimido con prestación de servicio comunitario de cincuenta a ochenta jornadas.
                        </div>
                        <div style="margin-bottom: 10px; text-align: justify; line-height: 1.5;">
                            La pena será de prestación de servicio comunitario de ochenta a cien jornadas o de cien a doscientos días-multa, cuando:
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 30px;">a.</span>
                            <div>La víctima es menor de edad o adulta mayor, tiene una discapacidad o se encuentra en estado de gestación.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 30px;">b.</span>
                            <div>La víctima es cónyuge; excónyuge; conviviente; exconviviente; padrastro; madrastra; ascendiente o descendiente por consanguinidad, adopción o afinidad; pariente colateral del cónyuge y conviviente hasta el cuarto grado de consanguinidad y segundo de afinidad; habita en el mismo hogar, siempre que no medien relaciones contractuales o laborales; o es con quien se ha procreado hijos en común, independientemente de que se conviva o no al momento de producirse los actos de violencia, o la violencia se da en cualquiera de los contextos de los numerales 1, 2 y 3 del primer párrafo del artículo 108-B.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 30px;">c.</span>
                            <div>Si la víctima tiene un contrato de locación de servicios, una relación laboral o presta servicios como trabajador del hogar, o tiene un vínculo con el agente de dependencia, de autoridad o vigilancia en un hospital, asilo u otro establecimiento similar donde la víctima se halle detenida o recluida o interna, asimismo si es dependiente o está subordinada de cualquier forma al agente o, por su condición, el agente abusa de su profesión, ciencia u oficio, o se aprovecha de cualquier posición, cargo o responsabilidad que le confiera el deber de vigilancia, custodia o particular autoridad sobre la víctima o la impulsa a depositar en él su confianza o si la víctima se encontraba bajo el cuidado o responsabilidad del agente.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 30px;">d.</span>
                            <div>Si la víctima es integrante de la Policía Nacional del Perú o de las Fuerzas Armadas, magistrado del Poder Judicial o del Ministerio Público, magistrado del Tribunal Constitucional, autoridad elegida por mandato popular o servidor civil, y es lesionada en ejercicio de sus funciones o a consecuencia de ellas.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 30px;">e.</span>
                            <div>Si la víctima es mujer y es lesionada por su condición de tal en cualquiera de los contextos previstos en el primer párrafo del artículo 108-B.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 30px;">f.</span>
                            <div>Si, en el momento de cometerse el delito, estuviera presente cualquier niña, niño o adolescente.</div>
                        </div>
                        <div style="display: flex; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 30px;">g.</span>
                            <div>Si el agente actúa en estado de ebriedad, con presencia de alcohol en la sangre en proporción mayor de 0.25 gramos-litro, o bajo efecto de drogas tóxicas, estupefacientes, sustancias psicotrópicas o sintéticas.</div>
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "443",
                titulo: "Derogado",
                texto: `
                        <div style="text-align: justify; line-height: 1.5; color: #777; font-style: italic;">
                            Derogado conforme a la Ley 30819 del 13/07/2018.
                        </div>`
            }
        ]
    },
    {
        titulo: `
                <div style="text-align: center; margin-top: 30px;">
                    <div style="margin-bottom: 15px;">TÍTULO III</div>
                    <div>FALTAS CONTRA EL PATRIMONIO</div>
                </div>`,
        capitulo: ``,
        articulos: [
            {
                tipo: "Artículo",
                numero: "444",
                titulo: "Hurto simple y daño",
                texto: `
                        <div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;">
                            El que realiza cualquiera de las conductas previstas en los artículos 185 y 205, cuando la acción recae sobre un bien cuyo valor no sobrepase el diez por ciento de una unidad impositiva tributaria (UIT), será reprimido con prestación de servicios comunitarios de cuarenta a ciento veinte jornadas o con sesenta a ciento ochenta días multa, sin perjuicio de la obligación de restituir el bien sustraído o dañado.
                        </div>
                        <div style="text-align: justify; line-height: 1.5;">
                            La misma pena se impone si el agente realiza la conducta prevista en el primer párrafo del artículo 189-A, cuando la acción recae sobre ganado cuyo valor no sobrepasa el diez por ciento de una unidad impositiva tributaria (UIT).
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "444-A",
                titulo: "Protección de señales satelitales encriptadas",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            El que reciba una señal de satélite portadora de un programa originariamente codificada, a sabiendas que fue decodificada sin la autorización del distribuidor legal de la señal, será reprimido con cuarenta a ochenta jornadas de prestación de servicios a la comunidad o de diez a sesenta días-multa.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "445",
                titulo: "Hurto famélico",
                texto: `
                        <div style="margin-bottom: 10px; text-align: justify; line-height: 1.5;">
                            Será reprimido con prestación de servicio comunitario de diez a veinte jornadas:
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">1.</span>
                            <div>El que se apodera, para su consumo inmediato, de comestibles o bebidas de escaso valor o en pequeña cantidad.</div>
                        </div>
                        <div style="display: flex; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">2.</span>
                            <div>El que se hace servir alimentos o bebidas en un restaurante, con el designio de no pagar o sabiendo que no podía hacerlo.</div>
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "446",
                titulo: "Usurpación breve",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            El que penetra, por breve término, en terreno cercado, sin permiso del dueño, será reprimido con veinte a sesenta días-multa.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "447",
                titulo: "Ingreso de animales en inmueble ajeno",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            El encargado de la custodia de ganado o de animal doméstico que lo introduce o lo deja entrar en inmueble ajeno sin causar daño, no teniendo derecho o permiso para ello, será reprimido hasta con veinte días-multa.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "448",
                titulo: "Organización o participación en juegos prohibidos",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            El que organiza o participa en juegos prohibidos por la ley, será reprimido hasta con sesenta días-multa.
                        </div>`
            }
        ]
    },
    {
        titulo: `
                <div style="text-align: center; margin-top: 30px;">
                    <div style="margin-bottom: 15px;">TÍTULO IV</div>
                    <div>FALTAS CONTRA LAS BUENAS COSTUMBRES</div>
                </div>`,
        capitulo: ``,
        articulos: [
            {
                tipo: "Artículo",
                numero: "449",
                titulo: "Perturbación de la tranquilidad",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            El que, en lugar público, perturba la tranquilidad de las personas o pone en peligro la seguridad propia o ajena, en estado de ebriedad o drogadicción, será reprimido hasta con sesenta días-multa.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "450",
                titulo: "Otras faltas",
                texto: `
                        <div style="margin-bottom: 10px; text-align: justify; line-height: 1.5;">
                            Será reprimido con prestación de servicio comunitario de diez a treinta jornadas:
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">1.</span>
                            <div>El que, en lugar público, hace a un tercero proposiciones inmorales o deshonestas.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">2.</span>
                            <div>El que, en establecimientos públicos o en lugares abiertos al público, suministra bebidas alcohólicas o tabaco a menores de edad.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">3.</span>
                            <div>El que, en establecimientos públicos o en lugares abiertos al público, obsequia, vende o consume bebidas alcohólicas en los días u horas prohibidos, salvo disposición legal distinta.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">4.</span>
                            <div>[Derogado]</div>
                        </div>
                        <div style="display: flex; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">5.</span>
                            <div>El que destruye las plantas que adornan jardines, alamedas, parques y avenidas.</div>
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "450-A",
                titulo: "Derogado",
                texto: `
                        <div style="text-align: justify; line-height: 1.5; color: #777; font-style: italic;">
                            Derogado conforme a la Ley 30407 del 08/01/2016.
                        </div>`
            },
            {
                tipo: "Artículo",
                numero: "451",
                titulo: "Faltas contra la seguridad pública",
                texto: `
                        <div style="margin-bottom: 10px; text-align: justify; line-height: 1.5;">
                            Será reprimido con prestación de servicio comunitario de quince a treinta jornadas o hasta con ciento ochenta días-multa:
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">1.</span>
                            <div>El que descuida la vigilancia que le corresponde sobre un insano mental, si la omisión constituye un peligro para el enfermo o para los demás; o no da aviso a la autoridad cuando se sustraiga de su custodia.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">2.</span>
                            <div>El que, habiendo dejado escombros materiales u otros objetos o habiendo hecho pozos o excavaciones, en un lugar de tránsito público, omite las precauciones necesarias para prevenir a los transeúntes respecto a la existencia de un posible peligro.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">3.</span>
                            <div>El que, no obstante el requerimiento de la autoridad, descuida hacer la demolición o reparación de una construcción que amenaza ruina y constituye peligro para la seguridad.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">4.</span>
                            <div>El que, arbitrariamente, inutiliza el sistema de un grifo de agua contra incendio.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">5.</span>
                            <div>El que conduce vehículo o animal a excesiva velocidad, de modo que importe peligro para la seguridad pública o confía su conducción a un menor de edad o persona inexperta.</div>
                        </div>
                        <div style="display: flex; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">6.</span>
                            <div>El que arroja basura a la calle o a un predio de propiedad ajena o la quema de manera que el humo ocasione molestias a las personas.</div>
                        </div>`
            }
        ]
    },
    {
        titulo: `
                <div style="text-align: center; margin-top: 30px;">
                    <div style="margin-bottom: 15px;">TÍTULO VI</div>
                    <div>FALTAS CONTRA LA TRANQUILIDAD PÚBLICA</div>
                </div>`,
        capitulo: ``,
        articulos: [
            {
                tipo: "Artículo",
                numero: "452",
                titulo: "Faltas contra la tranquilidad pública",
                texto: `
                        <div style="margin-bottom: 10px; text-align: justify; line-height: 1.5;">
                            Será reprimido con prestación de servicio comunitario de veinte a cuarenta jornadas o con sesenta a noventa días-multa:
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">1.</span>
                            <div>El que perturba levemente el orden en los actos, espectáculos, solemnidades o reuniones públicas.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">2.</span>
                            <div>El que perturba levemente la paz pública usando medios que puedan producir alarma.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">3.</span>
                            <div>El que, de palabra, falta el respeto y consideración debidos a una autoridad sin ofenderla gravemente o el que desobedezca las órdenes que le dicte, siempre que no revista mayor importancia.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">4.</span>
                            <div>El que niega a la autoridad el auxilio que reclama para socorrer a un tercero en peligro, siempre que el omitente no corra riesgo personal.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">5.</span>
                            <div>El que oculta su nombre, estado civil o domicilio a la autoridad o funcionario público que lo interrogue por razón de su cargo.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">6.</span>
                            <div>El que perturba a sus vecinos con discusiones, ruidos o molestias análogas.</div>
                        </div>
                        <div style="display: flex; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">7.</span>
                            <div>El que infringe disposiciones sanitarias dictadas por la autoridad para la conducción de cadáveres y entierros.</div>
                        </div>`
            }
        ]
    },
    {
        nuevaHoja: true,
        titulo: `
                <div style="text-align: center; margin-top: 30px;">
                    <div style="margin-bottom: 15px;">DISPOSICIONES FINALES Y TRANSITORIAS</div>
                </div>`,
        capitulo: ``,
        articulos: [
            {
                tipo: "Disposición",
                numero: "Primera",
                titulo: "Vigencia de la Ley N° 25103 y del D.S. N° 296-90-EF",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            Mantiene su vigencia la Ley Nº 25103, en cuanto no se oponga a este Código, así como el Decreto Supremo Nº 296-90-EF, del 4 de Noviembre de 1990.
                        </div>`
            },
            {
                tipo: "Disposición",
                numero: "Segunda",
                titulo: "Tráfico Ilícito de Drogas y Terrorismo-Vigencia de beneficios",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            Continúan vigentes las disposiciones legales que restringen los beneficios procesales y de ejecución penal, respecto de los agentes de delitos de tráfico ilícito de drogas y terrorismo, en cuanto no se opongan a este Código.
                        </div>`
            },
            {
                tipo: "Disposición",
                numero: "Tercera",
                titulo: "Consejo local de patronato-Entrega de bienes bajo inventario",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            El Consejo Local de Patronato, regulado por los artículos 402º al 407º del Código Penal de 1924, entregará, bajo inventario, los bienes que administra a la respectiva Corte Superior. Los fondos en dinero se entregarán al Instituto Nacional Penitenciario para su administración.
                        </div>`
            },
            {
                tipo: "Disposición",
                numero: "Cuarta",
                titulo: "Conversión de condenas. Reglas",
                texto: `
                        <div style="margin-bottom: 10px; text-align: justify; line-height: 1.5;">
                            Las condenas impuestas por sentencias firmes, durante la vigencia del anterior Código Penal, se sujetan a las siguientes reglas:
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">1.</span>
                            <div>Las sentencias a pena de internamiento con mínimo de veinticinco años, se convierten en pena privativa de libertad de veinticinco años.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">2.</span>
                            <div>Las sentencias a penas de prisión o penitenciaría se convierten en penas privativas de libertad con los mismos límites señalados en las respectivas condenas.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">3.</span>
                            <div>Las sentencias a penas de relegación relativamente indeterminada y absolutamente indeterminada, se convierten en pena privativa de libertad cuya duración queda limitada al extremo mínimo de las penas impuestas.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">4.</span>
                            <div>Las sentencias a penas de inhabilitación de duración indeterminada o perpetua, se convierten en inhabilitación de cinco años; y las de inhabilitación a tiempo fijo que exceden de cinco años se reducen a ese límite.</div>
                        </div>
                        <div style="display: flex; margin-bottom: 5px; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">5.</span>
                            <div>Las sentencias a pena de multa, fijada conforme a leyes especiales, conservan sus efectos.</div>
                        </div>
                        <div style="display: flex; line-height: 1.5; text-align: justify;">
                            <span style="min-width: 35px;">6.</span>
                            <div>Los condenados como reincidentes o habituales, conforme a los artículos 111 al 116 del Código Penal de 1924, serán liberados al cumplir la mitad de la pena de prisión o penitenciaría; o la mitad del mínimo de la pena de relegación.</div>
                        </div>`
            },
            {
                tipo: "Disposición",
                numero: "Quinta",
                titulo: "Delitos de terrorismo-Leyes especiales",
                texto: `
                        <div style="text-align: justify; line-height: 1.5;">
                            Los delitos de terrorismo se regirán por sus leyes especiales.
                        </div>`
            }
        ]
    }
];