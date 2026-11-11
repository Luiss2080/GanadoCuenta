# Especificación del MVP — GanadoCuenta

> Documento vivo. Si una decisión cambia, se actualiza acá primero y después en el código.

## 1. Resumen

**Propuesta de valor:** Que el ganadero sepa qué animal tiene, cuánto pesa, cuándo vacunarlo y cuánto ganó con cada venta, sin señal en el campo.

**Problema:** El control del hato se lleva en libretas o de memoria; se pierden pesajes, vacunas y ventas, y en el campo casi no hay internet.

**Cómo se resuelve hoy:** Libreta de campo, memoria y marcas en el animal.

**Usuario objetivo:** Ganadero o pequeño productor con 20 a 300 cabezas que trabaja en zonas sin cobertura.

**Métricas de éxito del MVP:**

- Registrar un pesaje en menos de 15 segundos.
- Ver qué animales necesitan vacuna o desparasitación esta semana.
- Exportar el hato completo a CSV.

## 2. Alcance del MVP

### Incluido

- Animales identificados por arete, con especie, sexo y raza.
- Pesajes y ganancia de peso en el tiempo.
- Sanidad: vacunas y desparasitaciones con próxima fecha.
- Eventos: partos, traslados y bajas.
- Ventas con comprador y monto.
- Exportación CSV del hato.

### Fuera del MVP

- Cuentas de usuario, inicio de sesión y multiusuario.
- Servidor propio, nube o sincronización entre dispositivos.
- Pagos en línea o pasarelas de cobro.
- Publicación en App Store (iOS).
- Cualquier servicio de pago o con costo recurrente.

## 3. Reglas de negocio

Reglas que el código **debe** cumplir. Cada una se cubre con pruebas automáticas cuando es lógica pura.

- **RN-01** El arete es único por animal dentro del hato.
- **RN-02** La ganancia diaria de peso = (último peso − peso anterior) ÷ días entre pesajes.
- **RN-03** Un animal vendido o dado de baja pasa a estado inactivo y deja de aparecer en el hato activo.
- **RN-04** Una vacuna o desparasitación se considera por vencer a 10 días de la próxima fecha.
- **RN-05** Un parto registra la cría como un animal nuevo vinculado a la madre.
- **RN-06** Una venta cambia el estado del animal a «vendido» y guarda comprador y monto.

## 4. Historias de usuario y criterios de aceptación

Formato: **Dado** un contexto, **Cuando** el usuario hace algo, **Entonces** pasa algo verificable.

### HU-01 — Registrar animales con arete

**Como** ganadero **quiero** cargar mis animales con arete, especie, sexo y raza **para** tener el hato identificado.

**Fase:** 2 — Animales y aretes

**Criterios de aceptación:**

1. **Dado:** el formulario de animal. **Cuando:** ingreso un arete que ya existe. **Entonces:** la app rechaza el duplicado y muestra el animal existente.
2. **Dado:** el hato vacío. **Cuando:** abro la app. **Entonces:** veo el estado vacío con «Agregar animal».

Criterios comunes a toda historia:

- [ ] Funciona sin conexión a internet.
- [ ] Los datos persisten al cerrar y reabrir la app.
- [ ] Los errores de validación se muestran en español y junto al campo.
- [ ] Hay un estado vacío claro cuando todavía no hay datos.

### HU-02 — Registrar pesajes

**Como** ganadero **quiero** anotar el peso de un animal en una fecha **para** ver su ganancia de peso.

**Fase:** 3 — Pesajes y sanidad

**Criterios de aceptación:**

1. **Dado:** un animal con 2 pesajes. **Cuando:** abro su ficha. **Entonces:** veo la ganancia diaria de peso y la curva simple.
2. **Dado:** un peso menor o igual a 0. **Cuando:** intento guardar. **Entonces:** la app lo rechaza.

Criterios comunes a toda historia:

- [ ] Funciona sin conexión a internet.
- [ ] Los datos persisten al cerrar y reabrir la app.
- [ ] Los errores de validación se muestran en español y junto al campo.
- [ ] Hay un estado vacío claro cuando todavía no hay datos.

### HU-03 — Control sanitario

**Como** ganadero **quiero** registrar vacunas y desparasitaciones con próxima fecha **para** no olvidar ningún tratamiento.

**Fase:** 3 — Pesajes y sanidad

**Criterios de aceptación:**

1. **Dado:** una vacuna aplicada hoy con próxima en 6 meses. **Cuando:** la registro. **Entonces:** queda en el historial y en la lista de próximos.

Criterios comunes a toda historia:

- [ ] Funciona sin conexión a internet.
- [ ] Los datos persisten al cerrar y reabrir la app.
- [ ] Los errores de validación se muestran en español y junto al campo.
- [ ] Hay un estado vacío claro cuando todavía no hay datos.

### HU-04 — Registrar eventos

**Como** ganadero **quiero** anotar partos, traslados y bajas **para** tener la historia del animal.

**Fase:** 4 — Eventos y ventas

**Criterios de aceptación:**

1. **Dado:** una vaca. **Cuando:** registro un parto con cría hembra. **Entonces:** se crea la cría vinculada a la madre y el evento queda en el historial.

Criterios comunes a toda historia:

- [ ] Funciona sin conexión a internet.
- [ ] Los datos persisten al cerrar y reabrir la app.
- [ ] Los errores de validación se muestran en español y junto al campo.
- [ ] Hay un estado vacío claro cuando todavía no hay datos.

### HU-05 — Registrar ventas

**Como** ganadero **quiero** anotar la venta con comprador y monto **para** saber lo que gané.

**Fase:** 4 — Eventos y ventas

**Criterios de aceptación:**

1. **Dado:** un animal activo. **Cuando:** registro su venta por 3.500 Bs. **Entonces:** pasa a «vendido» y suma al total de ventas del período.

Criterios comunes a toda historia:

- [ ] Funciona sin conexión a internet.
- [ ] Los datos persisten al cerrar y reabrir la app.
- [ ] Los errores de validación se muestran en español y junto al campo.
- [ ] Hay un estado vacío claro cuando todavía no hay datos.

### HU-06 — Alertas y exportación

**Como** ganadero **quiero** recibir alertas y exportar el hato en CSV **para** trabajar sin papel.

**Fase:** 5 — Alertas y exportación CSV

**Criterios de aceptación:**

1. **Dado:** sanidad que vence en 10 días. **Cuando:** llega la fecha del aviso. **Entonces:** recibo una notificación local con arete y tratamiento.
2. **Dado:** el hato con 100 animales. **Cuando:** toco «Exportar CSV». **Entonces:** se genera un archivo con una fila por animal.

Criterios comunes a toda historia:

- [ ] Funciona sin conexión a internet.
- [ ] Los datos persisten al cerrar y reabrir la app.
- [ ] Los errores de validación se muestran en español y junto al campo.
- [ ] Hay un estado vacío claro cuando todavía no hay datos.

## 5. Pantallas y navegación

| Pantalla | Qué muestra | Acciones principales |
|---|---|---|
| Inicio | Cantidad de animales activos, próximos tratamientos y últimas ventas | Registrar pesaje rápido |
| Hato | Lista con filtros por especie, sexo y estado | Crear animal, buscar por arete |
| Ficha de animal | Datos, peso actual, ganancia, pestañas Sanidad y Eventos | Pesar, tratar, vender |
| Formulario de pesaje | Peso y fecha | Guardar |
| Formulario de sanidad | Tipo, producto, fecha, próxima fecha | Guardar |
| Ventas | Lista y total por período | Registrar venta |
| Exportar | Opciones de CSV | Exportar y compartir |

**Navegación:** la pantalla de inicio es el punto de partida; desde ahí se llega a cada sección con un toque y se vuelve con el botón atrás. Las acciones frecuentes (nuevo registro) están siempre a la vista. La navegación se implementa con Expo Router (rutas por archivo en `app/`).

## 6. Modelo de datos

Base SQLite local versionada con `PRAGMA user_version`. Las fechas se guardan como texto ISO 8601 y los montos como números reales (en bolivianos).

### `animales`

Cada animal con su arete, especie, sexo y raza.

| Campo | Tipo | Reglas |
|---|---|---|
| `id` | INTEGER | Clave primaria autoincremental |
| `arete` | TEXT | Obligatorio; Único |
| `especie` | TEXT | Obligatorio; Por defecto “bovino” |
| `sexo` | TEXT | Obligatorio |
| `raza` | TEXT | Opcional |
| `nacimiento` | TEXT | Opcional |
| `estado` | TEXT | Obligatorio; Por defecto “activo” |

### `pesajes`

Pesos registrados en el tiempo.

| Campo | Tipo | Reglas |
|---|---|---|
| `id` | INTEGER | Clave primaria autoincremental |
| `animal_id` | INTEGER | Obligatorio; Referencia a animales (se borra en cascada) |
| `fecha` | TEXT | Obligatorio |
| `peso_kg` | REAL | Obligatorio |

### `sanidad`

Vacunas y desparasitaciones con próxima fecha.

| Campo | Tipo | Reglas |
|---|---|---|
| `id` | INTEGER | Clave primaria autoincremental |
| `animal_id` | INTEGER | Obligatorio; Referencia a animales (se borra en cascada) |
| `tipo` | TEXT | Obligatorio |
| `producto` | TEXT | Opcional |
| `fecha` | TEXT | Obligatorio |
| `proxima` | TEXT | Opcional |

### `eventos`

Partos, traslados y bajas.

| Campo | Tipo | Reglas |
|---|---|---|
| `id` | INTEGER | Clave primaria autoincremental |
| `animal_id` | INTEGER | Obligatorio; Referencia a animales (se borra en cascada) |
| `tipo` | TEXT | Obligatorio |
| `fecha` | TEXT | Obligatorio |
| `nota` | TEXT | Opcional |

### `ventas`

Ventas con comprador y monto.

| Campo | Tipo | Reglas |
|---|---|---|
| `id` | INTEGER | Clave primaria autoincremental |
| `animal_id` | INTEGER | Obligatorio; Referencia a animales (se borra en cascada) |
| `fecha` | TEXT | Obligatorio |
| `comprador` | TEXT | Opcional |
| `monto` | REAL | Obligatorio |

Detalle de la política de migraciones: nunca editar una migración publicada; agregar una nueva al final de la lista en `src/db/schema.ts`.

## 7. Casos borde a contemplar

- Arete perdido o repuesto: permitir cambiar arete conservando el historial.
- Animal sin sexo definido (cría): permitir «sin definir».
- Pesaje estimado a ojo: marcar como «estimado».
- Venta de varios animales juntos: registrar una venta por animal con el mismo comprador.

## 8. Requisitos no funcionales

- **Offline total:** ninguna función del MVP requiere internet.
- **Rendimiento:** la app abre en menos de 2 segundos; las listas responden de inmediato con cientos de registros (consultas con índices y listas virtualizadas).
- **Privacidad:** los datos nunca salen del teléfono, salvo lo que el usuario comparte a propósito.
- **Idioma y formato:** español de Bolivia, montos en bolivianos (Bs) con dos decimales, fechas día/mes/año.
- **Usabilidad:** botones grandes, formularios cortos y flujos de pocos toques; pensado para usarse de pie y con una mano.
- **Accesibilidad básica:** contraste suficiente, etiquetas de accesibilidad en botones y tamaño de texto que respeta el ajuste del sistema.
- **Calidad:** `npm run lint`, `npx tsc --noEmit` y `npm test` pasan en cada commit (CI en GitHub Actions).
- **Compatibilidad:** Android 8 o superior (probado con Expo Go y con el APK).

### Capacidades de Expo que usa

| Paquete | Para qué | Permiso |
|---|---|---|
| `expo-notifications` | Recordatorios locales (programados en el teléfono, sin servidor) | Notificaciones |
| `expo-sharing` | Compartir PDF, CSV o respaldos con otras apps | — |
| `expo-file-system` | Guardar y leer archivos locales (CSV, respaldos) | — |

## 9. Riesgos y mitigaciones

| Riesgo | Mitigación |
|---|---|
| Sin señal para cualquier servicio externo | Todo funciona offline; nada depende de internet. |
| Pérdida de datos del hato | Exportación CSV periódica y respaldo en v1.1. |
| Cambios de esquema que rompan datos | Migraciones con `PRAGMA user_version`; nunca editar una migración publicada |
| El alcance crece | Todo lo que no esté en la sección 2 va a «Después del MVP» en el [ROADMAP](ROADMAP.md) |

## 10. Criterios para lanzar el MVP (v1.0.0)

- [ ] Todas las historias de la sección 4 cumplen sus criterios de aceptación.
- [ ] Todas las reglas de negocio de la sección 3 tienen pruebas o verificación manual.
- [ ] Probado en un teléfono Android real, en modo avión.
- [ ] APK generado con `npm run build:apk` e instalado en un teléfono limpio.
- [ ] README con capturas de pantalla y CHANGELOG actualizado.
- [ ] Release v1.0.0 publicado con el APK adjunto.

## 11. Glosario

| Término | Significado en GanadoCuenta |
|---|---|
| `animales` | Cada animal con su arete, especie, sexo y raza. |
| `pesajes` | Pesos registrados en el tiempo. |
| `sanidad` | Vacunas y desparasitaciones con próxima fecha. |
| `eventos` | Partos, traslados y bajas. |
| `ventas` | Ventas con comprador y monto. |
| `animales.especie` | Valores: bovino, ovino, porcino, caprino, otro |
| `animales.sexo` | Valores: macho, hembra, sin_definir |
| `animales.estado` | Valores: activo, vendido, baja |
| `sanidad.tipo` | Valores: vacuna, desparasitacion, tratamiento |
| `eventos.tipo` | Valores: parto, traslado, baja |

## 12. Mensajes estándar

| Situación | Mensaje |
|---|---|
| Campo obligatorio vacío | Completá este campo |
| Número inválido | Ingresá un número válido |
| Monto cero o negativo | El monto debe ser mayor a 0 |
| Fecha inválida | Fecha no válida |
| Guardado correcto | Guardado |
| Error al guardar | No se pudo guardar. Intentá de nuevo |
| Confirmar borrado | ¿Borrar «{nombre}»? No se puede deshacer |
| Lista vacía | Todavía no hay nada acá. Tocá «+» para empezar |

## 13. Trazabilidad

| Historia | Fase | Casos de prueba |
|---|---|---|
| HU-01 Registrar animales con arete | 2 | CP-01-1, CP-01-2 |
| HU-02 Registrar pesajes | 3 | CP-02-1, CP-02-2 |
| HU-03 Control sanitario | 3 | CP-03-1 |
| HU-04 Registrar eventos | 4 | CP-04-1 |
| HU-05 Registrar ventas | 4 | CP-05-1 |
| HU-06 Alertas y exportación | 5 | CP-06-1, CP-06-2 |

## 14. Documentos relacionados

- [DATOS.md](DATOS.md) · [PANTALLAS.md](PANTALLAS.md) · [PRUEBAS.md](PRUEBAS.md) · [BACKLOG.md](BACKLOG.md) · [ROADMAP.md](ROADMAP.md) · [PLANNING.md](PLANNING.md)
