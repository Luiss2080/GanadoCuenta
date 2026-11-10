# Arquitectura de GanadoCuenta

## Principios

- **Offline primero:** todo vive en SQLite dentro del dispositivo; no hay servidor.
- **Sin costos:** ninguna dependencia de pago ni suscripción.
- **Simple de evolucionar:** pantallas en `app/`, lógica de datos en `src/db/`, utilidades en `src/lib/`.

## Capas

| Carpeta | Responsabilidad |
|---|---|
| `app/` | Rutas y pantallas (Expo Router, rutas por archivo) |
| `src/db/` | Esquema, migraciones y consultas SQLite |
| `src/components/` | Componentes reutilizables de interfaz |
| `src/lib/` | Formato de montos y fechas, exportación CSV, utilidades puras |
| `src/theme.ts` | Colores y nombre de la app |

## Migraciones

El esquema se versiona con `PRAGMA user_version`. Cada elemento de `MIGRACIONES` en `src/db/schema.ts` se aplica una sola vez y en orden. Para cambiar tablas, agregá una migración nueva al final; nunca edites una ya publicada.

## Modelo de datos

### `animales`

- `id`
- `arete`
- `especie`
- `sexo`
- `raza`
- `nacimiento`
- `estado`

### `pesajes`

- `id`
- `animal_id`
- `fecha`
- `peso_kg`

### `sanidad`

- `id`
- `animal_id`
- `tipo`
- `producto`
- `fecha`
- `proxima`

### `eventos`

- `id`
- `animal_id`
- `tipo`
- `fecha`
- `nota`

### `ventas`

- `id`
- `animal_id`
- `fecha`
- `comprador`
- `monto`

## Distribución

Se distribuye como APK con `npm run build:apk` (EAS Build local, sin costo) o se prueba con Expo Go durante el desarrollo.
