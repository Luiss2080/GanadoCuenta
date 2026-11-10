# Especificación del MVP — GanadoCuenta

## 1. Resumen

Registro de ganado: animales, vacunas, pesajes, partos y ventas, sin internet en el campo.

**Usuario objetivo:** ganaderos y pequeños productores.

**Problema que resuelve:** hoy estas tareas se llevan en cuaderno o en el chat de WhatsApp, con errores y sin historial. GanadoCuenta las ordena en una app simple que funciona sin internet.

**Propuesta de valor:** registrar en segundos, consultar al instante y compartir el resultado, sin cuentas, sin servidores y sin costo.

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
- Servidor, nube o sincronización entre dispositivos.
- Pagos en línea o pasarelas de cobro.
- Publicación en App Store (iOS).
- Cualquier servicio de pago.

## 3. Historias de usuario y criterios de aceptación

### HU-01 — Animales identificados por arete, con especie, sexo y raza

**Como** usuario (ganaderos y pequeños productores), **quiero** animales identificados por arete, con especie, sexo y raza, **para** no depender de cuadernos ni mensajes sueltos.

Criterios de aceptación:

- [ ] Se puede hacer completo desde la app, sin conexión a internet.
- [ ] Los datos siguen ahí después de cerrar y volver a abrir la app.
- [ ] Los campos obligatorios se validan y muestran un mensaje claro en español.
- [ ] Hay un estado vacío que explica qué hacer cuando todavía no hay datos.

### HU-02 — Pesajes y ganancia de peso en el tiempo

**Como** usuario (ganaderos y pequeños productores), **quiero** pesajes y ganancia de peso en el tiempo, **para** no depender de cuadernos ni mensajes sueltos.

Criterios de aceptación:

- [ ] Se puede hacer completo desde la app, sin conexión a internet.
- [ ] Los datos siguen ahí después de cerrar y volver a abrir la app.
- [ ] Los campos obligatorios se validan y muestran un mensaje claro en español.
- [ ] Hay un estado vacío que explica qué hacer cuando todavía no hay datos.

### HU-03 — Sanidad: vacunas y desparasitaciones con próxima fecha

**Como** usuario (ganaderos y pequeños productores), **quiero** sanidad: vacunas y desparasitaciones con próxima fecha, **para** no depender de cuadernos ni mensajes sueltos.

Criterios de aceptación:

- [ ] Se puede hacer completo desde la app, sin conexión a internet.
- [ ] Los datos siguen ahí después de cerrar y volver a abrir la app.
- [ ] Los campos obligatorios se validan y muestran un mensaje claro en español.
- [ ] Hay un estado vacío que explica qué hacer cuando todavía no hay datos.

### HU-04 — Eventos: partos, traslados y bajas

**Como** usuario (ganaderos y pequeños productores), **quiero** eventos: partos, traslados y bajas, **para** no depender de cuadernos ni mensajes sueltos.

Criterios de aceptación:

- [ ] Se puede hacer completo desde la app, sin conexión a internet.
- [ ] Los datos siguen ahí después de cerrar y volver a abrir la app.
- [ ] Los campos obligatorios se validan y muestran un mensaje claro en español.
- [ ] Hay un estado vacío que explica qué hacer cuando todavía no hay datos.

### HU-05 — Ventas con comprador y monto

**Como** usuario (ganaderos y pequeños productores), **quiero** ventas con comprador y monto, **para** no depender de cuadernos ni mensajes sueltos.

Criterios de aceptación:

- [ ] Se puede hacer completo desde la app, sin conexión a internet.
- [ ] Los datos siguen ahí después de cerrar y volver a abrir la app.
- [ ] Los campos obligatorios se validan y muestran un mensaje claro en español.
- [ ] Hay un estado vacío que explica qué hacer cuando todavía no hay datos.

### HU-06 — Exportación CSV del hato

**Como** usuario (ganaderos y pequeños productores), **quiero** exportación CSV del hato, **para** no depender de cuadernos ni mensajes sueltos.

Criterios de aceptación:

- [ ] Se puede hacer completo desde la app, sin conexión a internet.
- [ ] Los datos siguen ahí después de cerrar y volver a abrir la app.
- [ ] Los campos obligatorios se validan y muestran un mensaje claro en español.
- [ ] Hay un estado vacío que explica qué hacer cuando todavía no hay datos.

## 4. Pantallas

| Pantalla | Propósito |
|---|---|
| Inicio | Resumen y accesos directos a lo más usado |
| Lista de animales | Ver, buscar y abrir cada registro |
| Formulario de animales | Crear y editar con validaciones |
| Lista de pesajes | Ver, buscar y abrir cada registro |
| Formulario de pesajes | Crear y editar con validaciones |
| Lista de sanidad | Ver, buscar y abrir cada registro |
| Formulario de sanidad | Crear y editar con validaciones |
| Lista de eventos | Ver, buscar y abrir cada registro |
| Formulario de eventos | Crear y editar con validaciones |
| Lista de ventas | Ver, buscar y abrir cada registro |
| Formulario de ventas | Crear y editar con validaciones |
| Ajustes | Datos del usuario, moneda y exportación |

## 5. Modelo de datos

- **animales**: id, arete, especie, sexo, raza, nacimiento, estado
- **pesajes**: id, animal_id, fecha, peso_kg
- **sanidad**: id, animal_id, tipo, producto, fecha, proxima
- **eventos**: id, animal_id, tipo, fecha, nota
- **ventas**: id, animal_id, fecha, comprador, monto

El SQL completo y la política de migraciones están en [ARQUITECTURA.md](ARQUITECTURA.md).

## 6. Requisitos no funcionales

- **Offline total:** ninguna función del MVP requiere internet.
- **Rendimiento:** la app abre en menos de 2 segundos y las listas responden de inmediato con cientos de registros.
- **Privacidad:** los datos nunca salen del teléfono, salvo lo que el usuario comparte a propósito.
- **Idioma y formato:** español de Bolivia, montos en bolivianos (Bs) con dos decimales, fechas día/mes/año.
- **Usabilidad:** botones grandes, formularios cortos y flujos de pocos toques; pensado para usarse de pie y con una mano.
- **Calidad:** `npm run lint`, `npx tsc --noEmit` y `npm test` pasan en cada commit (CI en GitHub Actions).

## 7. Riesgos y decisiones

| Riesgo | Mitigación |
|---|---|
| Perder el celular y los datos | Respaldo exportable (CSV o archivo de base) en la versión 1.1 |
| Cambios de esquema que rompan datos | Migraciones con `PRAGMA user_version`; nunca editar una migración publicada |
| Alcance que crece | Todo lo que no esté en la sección 2 va a «Después del MVP» |

## 8. Criterios para lanzar el MVP

- [ ] Todas las historias de la sección 3 cumplen sus criterios.
- [ ] Probado en un teléfono Android real, en modo avión.
- [ ] APK generado con `npm run build:apk`.
- [ ] README con capturas y CHANGELOG actualizado.
- [ ] Release v1.0.0 publicado.
