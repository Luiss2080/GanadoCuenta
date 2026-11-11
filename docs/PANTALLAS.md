# Pantallas y flujos — GanadoCuenta

> Guía de interfaz para construir cada pantalla: ruta, contenido, estados y bosquejo. Complementa la sección 5 de [SPEC.md](SPEC.md).

## 1. Mapa de rutas

| Pantalla | Archivo (Expo Router) | Tipo |
|---|---|---|
| Inicio | `app/index.tsx` | Inicio |
| Hato | `app/hato.tsx` | Lista / vista |
| Ficha de animal | `app/ficha-de-animal.tsx` | Detalle |
| Formulario de pesaje | `app/formulario-de-pesaje.tsx` | Formulario |
| Formulario de sanidad | `app/formulario-de-sanidad.tsx` | Formulario |
| Ventas | `app/ventas.tsx` | Lista / vista |
| Exportar | `app/exportar.tsx` | Lista / vista |

**Convenciones de interfaz**

- Una acción principal por pantalla, en un botón grande abajo o en un botón flotante.
- Los formularios se abren como pantalla completa, validan al enviar y muestran el error junto al campo.
- Toda lista tiene estado vacío con una frase y un botón que lleva a la acción.
- Las acciones que borran piden confirmación explícita con el nombre del registro.
- El botón atrás nunca pierde datos sin avisar: si el formulario tiene cambios, se pregunta antes de salir.
- Textos en español de Bolivia (voseo opcional, siempre claros); montos como `Bs 1.250,00`.

## 2. Detalle por pantalla

### 2.1 Inicio

- **Archivo:** `app/index.tsx`
- **Qué muestra:** Cantidad de animales activos, próximos tratamientos y últimas ventas
- **Acciones:** Registrar pesaje rápido

**Bosquejo**

```
┌──────────────────────────────┐
│ GanadoCuenta                 │
├──────────────────────────────┤
│ [ Resumen y alertas ]        │
│                              │
│  ▸ Hato                     │
│  ▸ Ficha de animal          │
│  ▸ Ventas                   │
│  ▸ Exportar                 │
│                              │
└──────────────────────────────┘
```

**Estados**

| Estado | Qué ve el usuario |
|---|---|
| Cargando | Indicador breve; la base es local, rara vez se nota |
| Vacío | Todavía no hay información para mostrar. |
| Con datos | Cantidad de animales activos, próximos tratamientos y últimas ventas |
| Error | Mensaje «No se pudo guardar/cargar. Intentá de nuevo» con botón de reintento; el error técnico va a la consola |
| Sin cambios (formularios) | El botón guardar queda deshabilitado hasta que haya cambios válidos |

**Accesibilidad:** cada botón con `accessibilityLabel`, áreas táctiles de 48 px o más, no depender solo del color para indicar estado.

### 2.2 Hato

- **Archivo:** `app/hato.tsx`
- **Qué muestra:** Lista con filtros por especie, sexo y estado
- **Acciones:** Crear animal, buscar por arete
- **Historias relacionadas:** HU-01, HU-02, HU-06 (sugerido por coincidencia de temas; confirmar al construir).

**Bosquejo**

```
┌──────────────────────────────┐
│ ←  Hato                        │
├──────────────────────────────┤
│ nombre · fecha               │
│ nombre · fecha               │
│ nombre · fecha               │
│                              │
│                         (+)  │
└──────────────────────────────┘
```

**Estados**

| Estado | Qué ve el usuario |
|---|---|
| Cargando | Indicador breve; la base es local, rara vez se nota |
| Vacío | Todavía no hay información para mostrar. |
| Con datos | Lista con filtros por especie, sexo y estado |
| Error | Mensaje «No se pudo guardar/cargar. Intentá de nuevo» con botón de reintento; el error técnico va a la consola |
| Sin cambios (formularios) | El botón guardar queda deshabilitado hasta que haya cambios válidos |

**Accesibilidad:** cada botón con `accessibilityLabel`, áreas táctiles de 48 px o más, no depender solo del color para indicar estado.

### 2.3 Ficha de animal

- **Archivo:** `app/ficha-de-animal.tsx`
- **Qué muestra:** Datos, peso actual, ganancia, pestañas Sanidad y Eventos
- **Acciones:** Pesar, tratar, vender
- **Historias relacionadas:** HU-01, HU-02, HU-04 (sugerido por coincidencia de temas; confirmar al construir).

**Bosquejo**

```
┌──────────────────────────────┐
│ ←  Ficha de animal             │
├──────────────────────────────┤
│ arete                        │
│ Resumen / totales            │
├──────────────────────────────┤
│ • registro 1                 │
│ • registro 2                 │
│ • registro 3                 │
│                         (+)  │
└──────────────────────────────┘
```

**Estados**

| Estado | Qué ve el usuario |
|---|---|
| Cargando | Indicador breve; la base es local, rara vez se nota |
| Vacío | Todavía no hay animales. Tocá «Pesar» para empezar. |
| Con datos | Datos, peso actual, ganancia, pestañas Sanidad y Eventos |
| Error | Mensaje «No se pudo guardar/cargar. Intentá de nuevo» con botón de reintento; el error técnico va a la consola |
| Sin cambios (formularios) | El botón guardar queda deshabilitado hasta que haya cambios válidos |

**Accesibilidad:** cada botón con `accessibilityLabel`, áreas táctiles de 48 px o más, no depender solo del color para indicar estado.

### 2.4 Formulario de pesaje

- **Archivo:** `app/formulario-de-pesaje.tsx`
- **Qué muestra:** Peso y fecha
- **Acciones:** Guardar
- **Historias relacionadas:** HU-02, HU-03 (sugerido por coincidencia de temas; confirmar al construir).

**Campos del formulario**

| Campo | Control | Obligatorio | Validación |
|---|---|---|---|
| animal id | Selector de animales | Sí | Debe existir en `animales` |
| fecha | Fecha | Sí | Fecha real en formato AAAA-MM-DD |
| peso kg | Numérico decimal | Sí | Mayor o igual a 0; Hasta 2 decimales |

**Bosquejo**

```
┌──────────────────────────────┐
│ ←  Formulario de pesaje        │
├──────────────────────────────┤
│ animal id                    │
│ [____________________]       │
│ fecha                        │
│ [____________________]       │
│ peso kg                      │
│ [____________________]       │
│                              │
│ [        Guardar        ]    │
└──────────────────────────────┘
```

**Estados**

| Estado | Qué ve el usuario |
|---|---|
| Cargando | Indicador breve; la base es local, rara vez se nota |
| Vacío | Todavía no hay pesajes. Tocá «Guardar» para empezar. |
| Con datos | Peso y fecha |
| Error | Mensaje «No se pudo guardar/cargar. Intentá de nuevo» con botón de reintento; el error técnico va a la consola |
| Sin cambios (formularios) | El botón guardar queda deshabilitado hasta que haya cambios válidos |

**Accesibilidad:** cada botón con `accessibilityLabel`, áreas táctiles de 48 px o más, no depender solo del color para indicar estado.

### 2.5 Formulario de sanidad

- **Archivo:** `app/formulario-de-sanidad.tsx`
- **Qué muestra:** Tipo, producto, fecha, próxima fecha
- **Acciones:** Guardar
- **Historias relacionadas:** HU-02, HU-03 (sugerido por coincidencia de temas; confirmar al construir).

**Campos del formulario**

| Campo | Control | Obligatorio | Validación |
|---|---|---|---|
| animal id | Selector de animales | Sí | Debe existir en `animales` |
| tipo | Selector / fichas | Sí | Uno de: `vacuna`, `desparasitacion`, `tratamiento` |
| producto | Texto | No | Texto de 1 a 80 caracteres sin espacios sobrantes |
| fecha | Fecha | Sí | Fecha real en formato AAAA-MM-DD |
| proxima | Fecha | No | Fecha real en formato AAAA-MM-DD; No anterior a la fecha de inicio/aplicación si ambas existen |

**Bosquejo**

```
┌──────────────────────────────┐
│ ←  Formulario de sanidad       │
├──────────────────────────────┤
│ animal id                    │
│ [____________________]       │
│ tipo                         │
│ [____________________]       │
│ producto                     │
│ [____________________]       │
│ fecha                        │
│ [____________________]       │
│ proxima                      │
│ [____________________]       │
│                              │
│ [        Guardar        ]    │
└──────────────────────────────┘
```

**Estados**

| Estado | Qué ve el usuario |
|---|---|
| Cargando | Indicador breve; la base es local, rara vez se nota |
| Vacío | Todavía no hay sanidad. Tocá «Guardar» para empezar. |
| Con datos | Tipo, producto, fecha, próxima fecha |
| Error | Mensaje «No se pudo guardar/cargar. Intentá de nuevo» con botón de reintento; el error técnico va a la consola |
| Sin cambios (formularios) | El botón guardar queda deshabilitado hasta que haya cambios válidos |

**Accesibilidad:** cada botón con `accessibilityLabel`, áreas táctiles de 48 px o más, no depender solo del color para indicar estado.

### 2.6 Ventas

- **Archivo:** `app/ventas.tsx`
- **Qué muestra:** Lista y total por período
- **Acciones:** Registrar venta
- **Historias relacionadas:** HU-01, HU-02, HU-03, HU-04, HU-05 (sugerido por coincidencia de temas; confirmar al construir).

**Bosquejo**

```
┌──────────────────────────────┐
│ ←  Ventas                      │
├──────────────────────────────┤
│ fecha · animal_id            │
│ fecha · animal_id            │
│ fecha · animal_id            │
│                              │
│                         (+)  │
└──────────────────────────────┘
```

**Estados**

| Estado | Qué ve el usuario |
|---|---|
| Cargando | Indicador breve; la base es local, rara vez se nota |
| Vacío | Todavía no hay ventas. Tocá «Registrar venta» para empezar. |
| Con datos | Lista y total por período |
| Error | Mensaje «No se pudo guardar/cargar. Intentá de nuevo» con botón de reintento; el error técnico va a la consola |
| Sin cambios (formularios) | El botón guardar queda deshabilitado hasta que haya cambios válidos |

**Accesibilidad:** cada botón con `accessibilityLabel`, áreas táctiles de 48 px o más, no depender solo del color para indicar estado.

### 2.7 Exportar

- **Archivo:** `app/exportar.tsx`
- **Qué muestra:** Opciones de CSV
- **Acciones:** Exportar y compartir
- **Historias relacionadas:** HU-06 (sugerido por coincidencia de temas; confirmar al construir).

**Bosquejo**

```
┌──────────────────────────────┐
│ ←  Exportar                    │
├──────────────────────────────┤
│ nombre · fecha               │
│ nombre · fecha               │
│ nombre · fecha               │
│                              │
│                         (+)  │
└──────────────────────────────┘
```

**Estados**

| Estado | Qué ve el usuario |
|---|---|
| Cargando | Indicador breve; la base es local, rara vez se nota |
| Vacío | Todavía no hay información para mostrar. |
| Con datos | Opciones de CSV |
| Error | Mensaje «No se pudo guardar/cargar. Intentá de nuevo» con botón de reintento; el error técnico va a la consola |
| Sin cambios (formularios) | El botón guardar queda deshabilitado hasta que haya cambios válidos |

**Accesibilidad:** cada botón con `accessibilityLabel`, áreas táctiles de 48 px o más, no depender solo del color para indicar estado.

## 3. Flujos principales

**HU-01 — Registrar animales con arete**

```
ingreso un arete que ya existe  →  la app rechaza el duplicado y muestra el animal existente
```

**HU-02 — Registrar pesajes**

```
abro su ficha  →  veo la ganancia diaria de peso y la curva simple
```

**HU-03 — Control sanitario**

```
la registro  →  queda en el historial y en la lista de próximos
```

**HU-04 — Registrar eventos**

```
registro un parto con cría hembra  →  se crea la cría vinculada a la madre y el evento queda en el historial
```

**HU-05 — Registrar ventas**

```
registro su venta por 3.500 Bs  →  pasa a «vendido» y suma al total de ventas del período
```

**HU-06 — Alertas y exportación**

```
llega la fecha del aviso  →  recibo una notificación local con arete y tratamiento
```
