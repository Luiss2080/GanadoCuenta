# Plan de pruebas — GanadoCuenta

> Qué probar, cuándo y cómo. Cada historia y cada regla de negocio tiene casos concretos. Complementa a [SPEC.md](SPEC.md).

## 1. Estrategia

| Nivel | Herramienta | Qué cubre | Cuándo |
|---|---|---|---|
| Unitarias | jest-expo (`npm test`) | Lógica pura de `src/lib/` (cálculos, validaciones, formatos) | En cada commit (CI) |
| Manuales por historia | Teléfono con Expo Go | Criterios de aceptación de SPEC (casos CP-) | Al cerrar cada tarea de pantalla |
| Regresión por fase | Teléfono real | Lo ya terminado sigue andando | Al cerrar cada fase |
| Aceptación final | APK en teléfono limpio, modo avión | Criterios de lanzamiento | Antes de v1.0.0 |

Meta de cobertura: **100 % de las reglas de negocio** con prueba automática o caso manual, y **100 % de los criterios de aceptación** ejecutados al menos una vez en un teléfono real.

## 2. Pruebas unitarias por regla de negocio

Crear un archivo `src/lib/<tema>.test.ts` por tema. Una prueba por regla como mínimo; agregar los bordes de la sección 4.

| ID | Regla | Tipo de prueba | Casos mínimos |
|---|---|---|---|
| RN-01 | El arete es único por animal dentro del hato. | Unitaria o manual | Caso válido, caso inválido, límite |
| RN-02 | La ganancia diaria de peso = (último peso − peso anterior) ÷ días entre pesajes. | Unitaria (fechas) | Hoy, mañana, fin de mes, año bisiesto |
| RN-03 | Un animal vendido o dado de baja pasa a estado inactivo y deja de aparecer en el hato activo. | Unitaria o manual | Caso válido, caso inválido, límite |
| RN-04 | Una vacuna o desparasitación se considera por vencer a 10 días de la próxima fecha. | Unitaria (fechas) | Hoy, mañana, fin de mes, año bisiesto |
| RN-05 | Un parto registra la cría como un animal nuevo vinculado a la madre. | Unitaria o manual | Caso válido, caso inválido, límite |
| RN-06 | Una venta cambia el estado del animal a «vendido» y guarda comprador y monto. | Unitaria (cálculo) | Valor típico, cero, redondeo a 2 decimales, valor grande |

## 3. Casos manuales por historia

Formato: ejecutar en el teléfono, marcar ✔ o ✘ y anotar la fecha. Si falla, abrir un issue con el ID del caso.

### HU-01 — Registrar animales con arete (fase 2)

| ID | Dado | Cuando | Entonces | Resultado |
|---|---|---|---|---|
| CP-01-1 | el formulario de animal | ingreso un arete que ya existe | la app rechaza el duplicado y muestra el animal existente | ☐ |
| CP-01-2 | el hato vacío | abro la app | veo el estado vacío con «Agregar animal» | ☐ |

Casos transversales: **CP-01-T1** modo avión · **CP-01-T2** cerrar y reabrir la app (persistencia) · **CP-01-T3** texto del sistema en tamaño grande.

### HU-02 — Registrar pesajes (fase 3)

| ID | Dado | Cuando | Entonces | Resultado |
|---|---|---|---|---|
| CP-02-1 | un animal con 2 pesajes | abro su ficha | veo la ganancia diaria de peso y la curva simple | ☐ |
| CP-02-2 | un peso menor o igual a 0 | intento guardar | la app lo rechaza | ☐ |

Casos transversales: **CP-02-T1** modo avión · **CP-02-T2** cerrar y reabrir la app (persistencia) · **CP-02-T3** texto del sistema en tamaño grande.

### HU-03 — Control sanitario (fase 3)

| ID | Dado | Cuando | Entonces | Resultado |
|---|---|---|---|---|
| CP-03-1 | una vacuna aplicada hoy con próxima en 6 meses | la registro | queda en el historial y en la lista de próximos | ☐ |

Casos transversales: **CP-03-T1** modo avión · **CP-03-T2** cerrar y reabrir la app (persistencia) · **CP-03-T3** texto del sistema en tamaño grande.

### HU-04 — Registrar eventos (fase 4)

| ID | Dado | Cuando | Entonces | Resultado |
|---|---|---|---|---|
| CP-04-1 | una vaca | registro un parto con cría hembra | se crea la cría vinculada a la madre y el evento queda en el historial | ☐ |

Casos transversales: **CP-04-T1** modo avión · **CP-04-T2** cerrar y reabrir la app (persistencia) · **CP-04-T3** texto del sistema en tamaño grande.

### HU-05 — Registrar ventas (fase 4)

| ID | Dado | Cuando | Entonces | Resultado |
|---|---|---|---|---|
| CP-05-1 | un animal activo | registro su venta por 3.500 Bs | pasa a «vendido» y suma al total de ventas del período | ☐ |

Casos transversales: **CP-05-T1** modo avión · **CP-05-T2** cerrar y reabrir la app (persistencia) · **CP-05-T3** texto del sistema en tamaño grande.

### HU-06 — Alertas y exportación (fase 5)

| ID | Dado | Cuando | Entonces | Resultado |
|---|---|---|---|---|
| CP-06-1 | sanidad que vence en 10 días | llega la fecha del aviso | recibo una notificación local con arete y tratamiento | ☐ |
| CP-06-2 | el hato con 100 animales | toco «Exportar CSV» | se genera un archivo con una fila por animal | ☐ |

Casos transversales: **CP-06-T1** modo avión · **CP-06-T2** cerrar y reabrir la app (persistencia) · **CP-06-T3** texto del sistema en tamaño grande.

## 4. Casos borde

| ID | Caso | Resultado esperado | Resultado |
|---|---|---|---|
| CB-01 | Arete perdido o repuesto: permitir cambiar arete conservando el historial. | La app no se rompe; el mensaje o comportamiento es claro y no se pierden datos | ☐ |
| CB-02 | Animal sin sexo definido (cría): permitir «sin definir». | La app no se rompe; el mensaje o comportamiento es claro y no se pierden datos | ☐ |
| CB-03 | Pesaje estimado a ojo: marcar como «estimado». | La app no se rompe; el mensaje o comportamiento es claro y no se pierden datos | ☐ |
| CB-04 | Venta de varios animales juntos: registrar una venta por animal con el mismo comprador. | La app no se rompe; el mensaje o comportamiento es claro y no se pierden datos | ☐ |

## 5. Pruebas de datos y migraciones

| ID | Prueba | Esperado |
|---|---|---|
| CD-01 | Primer arranque en teléfono limpio | La base se crea con todas las tablas y `user_version` queda en 1 |
| CD-02 | Actualizar de una versión anterior con datos cargados | Las migraciones nuevas se aplican y no se pierde ningún registro |
| CD-03 | Borrar un registro padre | Los hijos se borran o se bloquea con mensaje, según el esquema |
| CD-04 | Intentar guardar con campos obligatorios vacíos | No se inserta nada y se marcan los campos |
| CD-05 | Cargar 1.000 registros de prueba | Las listas siguen fluidas (scroll sin trabas) y abren en menos de 2 s |

## 6. Regresión al cerrar cada fase

**Fase 1 — Estructura base y navegación**

- [ ] La app abre y navega sin errores

**Fase 2 — Animales y aretes**

- [ ] El arete duplicado se rechaza.
- [ ] Los criterios de las fases anteriores siguen funcionando

**Fase 3 — Pesajes y sanidad**

- [ ] La ganancia diaria coincide con los casos de prueba.
- [ ] Los criterios de las fases anteriores siguen funcionando

**Fase 4 — Eventos y ventas**

- [ ] Un parto crea la cría y la vincula correctamente.
- [ ] Los criterios de las fases anteriores siguen funcionando

**Fase 5 — Alertas y exportación CSV**

- [ ] El CSV abre bien en Excel y las alertas llegan en el teléfono.
- [ ] Los criterios de las fases anteriores siguen funcionando

## 7. Matriz de dispositivos

| Dispositivo | Android | Qué se verifica |
|---|---|---|
| Gama baja (2–3 GB de RAM) | 8–10 | Fluidez de listas, tiempo de arranque |
| Gama media | 11–13 | Flujo completo y APK |
| Pantalla pequeña (5") | cualquiera | Que nada quede cortado ni oculto por el teclado |
| Texto del sistema grande | cualquiera | Que los formularios sigan siendo usables |

## 8. Lista de verificación para el lanzamiento (v1.0.0)

- [ ] Todas las historias ejecutadas en teléfono real (casos CP-)
- [ ] Todos los casos borde (CB-) ejecutados
- [ ] Pruebas de datos (CD-) ejecutadas
- [ ] APK instalado en un teléfono limpio sin Expo Go
- [ ] Probado en modo avión durante todo el flujo principal
- [ ] Rotación de pantalla no pierde datos del formulario
- [ ] Permisos solicitados solo cuando se necesitan y con explicación
- [ ] Sin errores en la consola durante un recorrido completo
- [ ] README con capturas y CHANGELOG al día

## 9. Informe de errores

```
Título: [Bug] <qué pasó>
ID de caso: CP-XX-X
Pasos: 1... 2... 3...
Esperado: ...
Obtenido: ...
Dispositivo / Android: ...
Captura o video: ...
```
