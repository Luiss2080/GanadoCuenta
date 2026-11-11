# Modelo de datos — GanadoCuenta

> Diseño detallado de la base SQLite: campos, validaciones, consultas y migraciones. Complementa la sección 6 de [SPEC.md](SPEC.md).

## 1. Convenciones

- Base local `SQLite` con `expo-sqlite`; versión del esquema en `PRAGMA user_version`.
- Claves primarias `INTEGER AUTOINCREMENT` llamadas `id`.
- Fechas como texto ISO `AAAA-MM-DD` (y `AAAA-MM-DDTHH:MM` cuando hay hora). Nunca se guardan textos como «hoy».
- Montos como `REAL` en bolivianos; se redondean a 2 decimales al guardar y se formatean al mostrar.
- Booleanos como `INTEGER` 0/1.
- Los textos se guardan sin espacios sobrantes (`trim()`).
- Todas las consultas usan parámetros (`?`), nunca concatenan texto del usuario.
- Las claves foráneas se activan con `PRAGMA foreign_keys = ON` al abrir la base.

## 2. Relaciones

| Campo | Apunta a | Comportamiento |
|---|---|---|
| `pesajes.animal_id` | `animales` | Al borrar el padre se borran los hijos |
| `sanidad.animal_id` | `animales` | Al borrar el padre se borran los hijos |
| `eventos.animal_id` | `animales` | Al borrar el padre se borran los hijos |
| `ventas.animal_id` | `animales` | Al borrar el padre se borran los hijos |

```
animales  ──<  pesajes, sanidad, eventos, ventas
pesajes
sanidad
eventos
ventas
```

## 3. Detalle por tabla

### 3.1 `animales`

Cada animal con su arete, especie, sexo y raza.

| Campo | Tipo SQL → TS | Control en formulario | Validación | Mensaje de error |
|---|---|---|---|---|
| `id` | INTEGER | Automático | Clave primaria | — |
| `arete` | TEXT → `string` | Texto | Obligatorio; Texto de 1 a 80 caracteres sin espacios sobrantes; Único en la tabla | «Escribí arete» |
| `especie` | TEXT → `string` | Selector / fichas | Obligatorio; Uno de: `bovino`, `ovino`, `porcino`, `caprino`, `otro`; Valor inicial `bovino` | «Elegí una opción» |
| `sexo` | TEXT → `string` | Selector / fichas | Obligatorio; Uno de: `macho`, `hembra`, `sin_definir` | «Elegí una opción» |
| `raza` | TEXT → `string \| null` | Texto | Opcional; Texto de 1 a 80 caracteres sin espacios sobrantes | «Escribí raza» |
| `nacimiento` | TEXT → `string \| null` | Fecha | Opcional; Fecha real en formato AAAA-MM-DD | «Fecha no válida» |
| `estado` | TEXT → `string` | Selector / fichas | Obligatorio; Uno de: `activo`, `vendido`, `baja`; Valor inicial `activo` | «Elegí una opción» |

**Índices recomendados** (agregarlos en la migración si aún no existen):

```sql
CREATE INDEX IF NOT EXISTS idx_animales_estado ON animales(estado);
```

**Consultas base** (en `src/db/animales.ts`):

```ts
listar(): Promise<Animal[]>            // SELECT * FROM animales ORDER BY id DESC
obtener(id: number): Promise<Animal | null>   // SELECT * FROM animales WHERE id = ?
crear(datos: NuevoAnimal): Promise<number>   // INSERT INTO animales (arete, especie, sexo, raza, nacimiento, estado) VALUES (?, ?, ?, ?, ?, ?)
actualizar(id: number, datos: NuevoAnimal): Promise<void>   // UPDATE animales SET arete = ?, especie = ?, sexo = ?, raza = ?, nacimiento = ?, estado = ? WHERE id = ?
eliminar(id: number): Promise<void>      // DELETE FROM animales WHERE id = ?
```

### 3.2 `pesajes`

Pesos registrados en el tiempo.

| Campo | Tipo SQL → TS | Control en formulario | Validación | Mensaje de error |
|---|---|---|---|---|
| `id` | INTEGER | Automático | Clave primaria | — |
| `animal_id` | INTEGER → `number` | Selector de animales | Obligatorio; Debe existir en `animales` | «Elegí un registro» |
| `fecha` | TEXT → `string` | Fecha | Obligatorio; Fecha real en formato AAAA-MM-DD | «Fecha no válida» |
| `peso_kg` | REAL → `number` | Numérico decimal | Obligatorio; Mayor o igual a 0; Hasta 2 decimales | «Ingresá un número válido» |

**Índices recomendados** (agregarlos en la migración si aún no existen):

```sql
CREATE INDEX IF NOT EXISTS idx_pesajes_animal_id ON pesajes(animal_id);
CREATE INDEX IF NOT EXISTS idx_pesajes_fecha ON pesajes(fecha);
```

**Consultas base** (en `src/db/pesajes.ts`):

```ts
listar(): Promise<Pesaje[]>            // SELECT * FROM pesajes ORDER BY id DESC
obtener(id: number): Promise<Pesaje | null>   // SELECT * FROM pesajes WHERE id = ?
crear(datos: NuevoPesaje): Promise<number>   // INSERT INTO pesajes (animal_id, fecha, peso_kg) VALUES (?, ?, ?)
actualizar(id: number, datos: NuevoPesaje): Promise<void>   // UPDATE pesajes SET animal_id = ?, fecha = ?, peso_kg = ? WHERE id = ?
eliminar(id: number): Promise<void>      // DELETE FROM pesajes WHERE id = ?
listarPorAnimal(animal_id: number): Promise<Pesaje[]>   // WHERE animal_id = ?
```

### 3.3 `sanidad`

Vacunas y desparasitaciones con próxima fecha.

| Campo | Tipo SQL → TS | Control en formulario | Validación | Mensaje de error |
|---|---|---|---|---|
| `id` | INTEGER | Automático | Clave primaria | — |
| `animal_id` | INTEGER → `number` | Selector de animales | Obligatorio; Debe existir en `animales` | «Elegí un registro» |
| `tipo` | TEXT → `string` | Selector / fichas | Obligatorio; Uno de: `vacuna`, `desparasitacion`, `tratamiento` | «Elegí una opción» |
| `producto` | TEXT → `string \| null` | Texto | Opcional; Texto de 1 a 80 caracteres sin espacios sobrantes | «Escribí producto» |
| `fecha` | TEXT → `string` | Fecha | Obligatorio; Fecha real en formato AAAA-MM-DD | «Fecha no válida» |
| `proxima` | TEXT → `string \| null` | Fecha | Opcional; Fecha real en formato AAAA-MM-DD; No anterior a la fecha de inicio/aplicación si ambas existen | «Fecha no válida» |

**Índices recomendados** (agregarlos en la migración si aún no existen):

```sql
CREATE INDEX IF NOT EXISTS idx_sanidad_animal_id ON sanidad(animal_id);
CREATE INDEX IF NOT EXISTS idx_sanidad_fecha ON sanidad(fecha);
CREATE INDEX IF NOT EXISTS idx_sanidad_proxima ON sanidad(proxima);
```

**Consultas base** (en `src/db/sanidad.ts`):

```ts
listar(): Promise<Sanidad[]>            // SELECT * FROM sanidad ORDER BY id DESC
obtener(id: number): Promise<Sanidad | null>   // SELECT * FROM sanidad WHERE id = ?
crear(datos: NuevoSanidad): Promise<number>   // INSERT INTO sanidad (animal_id, tipo, producto, fecha, proxima) VALUES (?, ?, ?, ?, ?)
actualizar(id: number, datos: NuevoSanidad): Promise<void>   // UPDATE sanidad SET animal_id = ?, tipo = ?, producto = ?, fecha = ?, proxima = ? WHERE id = ?
eliminar(id: number): Promise<void>      // DELETE FROM sanidad WHERE id = ?
listarPorAnimal(animal_id: number): Promise<Sanidad[]>   // WHERE animal_id = ?
```

### 3.4 `eventos`

Partos, traslados y bajas.

| Campo | Tipo SQL → TS | Control en formulario | Validación | Mensaje de error |
|---|---|---|---|---|
| `id` | INTEGER | Automático | Clave primaria | — |
| `animal_id` | INTEGER → `number` | Selector de animales | Obligatorio; Debe existir en `animales` | «Elegí un registro» |
| `tipo` | TEXT → `string` | Selector / fichas | Obligatorio; Uno de: `parto`, `traslado`, `baja` | «Elegí una opción» |
| `fecha` | TEXT → `string` | Fecha | Obligatorio; Fecha real en formato AAAA-MM-DD | «Fecha no válida» |
| `nota` | TEXT → `string \| null` | Texto largo | Opcional; Hasta 280 caracteres | «Máximo 280 caracteres» |

**Índices recomendados** (agregarlos en la migración si aún no existen):

```sql
CREATE INDEX IF NOT EXISTS idx_eventos_animal_id ON eventos(animal_id);
CREATE INDEX IF NOT EXISTS idx_eventos_fecha ON eventos(fecha);
```

**Consultas base** (en `src/db/eventos.ts`):

```ts
listar(): Promise<Evento[]>            // SELECT * FROM eventos ORDER BY id DESC
obtener(id: number): Promise<Evento | null>   // SELECT * FROM eventos WHERE id = ?
crear(datos: NuevoEvento): Promise<number>   // INSERT INTO eventos (animal_id, tipo, fecha, nota) VALUES (?, ?, ?, ?)
actualizar(id: number, datos: NuevoEvento): Promise<void>   // UPDATE eventos SET animal_id = ?, tipo = ?, fecha = ?, nota = ? WHERE id = ?
eliminar(id: number): Promise<void>      // DELETE FROM eventos WHERE id = ?
listarPorAnimal(animal_id: number): Promise<Evento[]>   // WHERE animal_id = ?
```

### 3.5 `ventas`

Ventas con comprador y monto.

| Campo | Tipo SQL → TS | Control en formulario | Validación | Mensaje de error |
|---|---|---|---|---|
| `id` | INTEGER | Automático | Clave primaria | — |
| `animal_id` | INTEGER → `number` | Selector de animales | Obligatorio; Debe existir en `animales` | «Elegí un registro» |
| `fecha` | TEXT → `string` | Fecha | Obligatorio; Fecha real en formato AAAA-MM-DD | «Fecha no válida» |
| `comprador` | TEXT → `string \| null` | Texto | Opcional; Texto de 1 a 80 caracteres sin espacios sobrantes | «Escribí comprador» |
| `monto` | REAL → `number` | Numérico decimal | Obligatorio; Mayor a 0; Hasta 2 decimales | «Ingresá un monto mayor a 0» |

**Índices recomendados** (agregarlos en la migración si aún no existen):

```sql
CREATE INDEX IF NOT EXISTS idx_ventas_animal_id ON ventas(animal_id);
CREATE INDEX IF NOT EXISTS idx_ventas_fecha ON ventas(fecha);
```

**Consultas base** (en `src/db/ventas.ts`):

```ts
listar(): Promise<Venta[]>            // SELECT * FROM ventas ORDER BY id DESC
obtener(id: number): Promise<Venta | null>   // SELECT * FROM ventas WHERE id = ?
crear(datos: NuevoVenta): Promise<number>   // INSERT INTO ventas (animal_id, fecha, comprador, monto) VALUES (?, ?, ?, ?)
actualizar(id: number, datos: NuevoVenta): Promise<void>   // UPDATE ventas SET animal_id = ?, fecha = ?, comprador = ?, monto = ? WHERE id = ?
eliminar(id: number): Promise<void>      // DELETE FROM ventas WHERE id = ?
listarPorAnimal(animal_id: number): Promise<Venta[]>   // WHERE animal_id = ?
```

## 4. Tipos TypeScript

Copiar a `src/db/tipos.ts`:

```ts
export interface Animal {
  id: number;
  arete: string;
  especie: string;
  sexo: string;
  raza: string | null;
  nacimiento: string | null;
  estado: string;
}
export type NuevoAnimal = Omit<Animal, 'id'>;

export interface Pesaje {
  id: number;
  animal_id: number;
  fecha: string;
  peso_kg: number;
}
export type NuevoPesaje = Omit<Pesaje, 'id'>;

export interface Sanidad {
  id: number;
  animal_id: number;
  tipo: string;
  producto: string | null;
  fecha: string;
  proxima: string | null;
}
export type NuevoSanidad = Omit<Sanidad, 'id'>;

export interface Evento {
  id: number;
  animal_id: number;
  tipo: string;
  fecha: string;
  nota: string | null;
}
export type NuevoEvento = Omit<Evento, 'id'>;

export interface Venta {
  id: number;
  animal_id: number;
  fecha: string;
  comprador: string | null;
  monto: number;
}
export type NuevoVenta = Omit<Venta, 'id'>;

```

## 5. Valores permitidos (enumeraciones)

SQLite no tiene tipo enumerado: se valida en la capa de datos y se muestra con la etiqueta de la tabla.

**`animales.especie`**

| Valor guardado | Etiqueta en pantalla |
|---|---|
| `bovino` | Bovino |
| `ovino` | Ovino |
| `porcino` | Porcino |
| `caprino` | Caprino |
| `otro` | Otro |

**`animales.sexo`**

| Valor guardado | Etiqueta en pantalla |
|---|---|
| `macho` | Macho |
| `hembra` | Hembra |
| `sin_definir` | Sin definir |

**`animales.estado`**

| Valor guardado | Etiqueta en pantalla |
|---|---|
| `activo` | Activo |
| `vendido` | Vendido |
| `baja` | Baja |

**`sanidad.tipo`**

| Valor guardado | Etiqueta en pantalla |
|---|---|
| `vacuna` | Vacuna |
| `desparasitacion` | Desparasitacion |
| `tratamiento` | Tratamiento |

**`eventos.tipo`**

| Valor guardado | Etiqueta en pantalla |
|---|---|
| `parto` | Parto |
| `traslado` | Traslado |
| `baja` | Baja |

```ts
export const ANIMALES_ESPECIE = ['bovino', 'ovino', 'porcino', 'caprino', 'otro'] as const;
export const ANIMALES_SEXO = ['macho', 'hembra', 'sin_definir'] as const;
export const ANIMALES_ESTADO = ['activo', 'vendido', 'baja'] as const;
export const SANIDAD_TIPO = ['vacuna', 'desparasitacion', 'tratamiento'] as const;
export const EVENTOS_TIPO = ['parto', 'traslado', 'baja'] as const;
```

## 6. Migraciones

Migración 1 = esquema inicial (ya en `src/db/schema.ts`). Cada cambio posterior es una migración nueva al final de la lista; nunca se edita una ya publicada.

| Versión | Fase | Motivo |
|---|---|---|
| 2 | 4 | Vincular la cría con su madre al registrar un parto. |
| 3 | 5 | Días de anticipación de las alertas sanitarias. |

**Migración 2** (fase 4)

```sql
ALTER TABLE animales ADD COLUMN madre_id INTEGER REFERENCES animales(id);
```

**Migración 3** (fase 5)

```sql
CREATE TABLE ajustes (clave TEXT PRIMARY KEY, valor TEXT NOT NULL);
```

## 7. Esquema inicial completo

```sql
CREATE TABLE animales (id INTEGER PRIMARY KEY AUTOINCREMENT, arete TEXT NOT NULL UNIQUE, especie TEXT NOT NULL DEFAULT 'bovino', sexo TEXT NOT NULL, raza TEXT, nacimiento TEXT, estado TEXT NOT NULL DEFAULT 'activo');
CREATE TABLE pesajes (id INTEGER PRIMARY KEY AUTOINCREMENT, animal_id INTEGER NOT NULL REFERENCES animales(id) ON DELETE CASCADE, fecha TEXT NOT NULL, peso_kg REAL NOT NULL);
CREATE TABLE sanidad (id INTEGER PRIMARY KEY AUTOINCREMENT, animal_id INTEGER NOT NULL REFERENCES animales(id) ON DELETE CASCADE, tipo TEXT NOT NULL, producto TEXT, fecha TEXT NOT NULL, proxima TEXT);
CREATE TABLE eventos (id INTEGER PRIMARY KEY AUTOINCREMENT, animal_id INTEGER NOT NULL REFERENCES animales(id) ON DELETE CASCADE, tipo TEXT NOT NULL, fecha TEXT NOT NULL, nota TEXT);
CREATE TABLE ventas (id INTEGER PRIMARY KEY AUTOINCREMENT, animal_id INTEGER NOT NULL REFERENCES animales(id) ON DELETE CASCADE, fecha TEXT NOT NULL, comprador TEXT, monto REAL NOT NULL);
```

## 8. Reglas de integridad que NO delega a la base

- **RN-01** El arete es único por animal dentro del hato.
- **RN-02** La ganancia diaria de peso = (último peso − peso anterior) ÷ días entre pesajes.
- **RN-03** Un animal vendido o dado de baja pasa a estado inactivo y deja de aparecer en el hato activo.
- **RN-04** Una vacuna o desparasitación se considera por vencer a 10 días de la próxima fecha.
- **RN-05** Un parto registra la cría como un animal nuevo vinculado a la madre.
- **RN-06** Una venta cambia el estado del animal a «vendido» y guarda comprador y monto.

Estas reglas se implementan en `src/lib/` como funciones puras y se prueban de forma automática (ver [PRUEBAS.md](PRUEBAS.md)).
