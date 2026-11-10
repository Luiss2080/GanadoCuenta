// Cada elemento es una migración. Para cambiar el esquema, AGREGÁ uno nuevo al final;
// nunca edites uno ya publicado.
export const MIGRACIONES: string[] = [
  `CREATE TABLE animales (id INTEGER PRIMARY KEY AUTOINCREMENT, arete TEXT NOT NULL UNIQUE, especie TEXT NOT NULL DEFAULT 'bovino', sexo TEXT NOT NULL, raza TEXT, nacimiento TEXT, estado TEXT NOT NULL DEFAULT 'activo');
CREATE TABLE pesajes (id INTEGER PRIMARY KEY AUTOINCREMENT, animal_id INTEGER NOT NULL REFERENCES animales(id) ON DELETE CASCADE, fecha TEXT NOT NULL, peso_kg REAL NOT NULL);
CREATE TABLE sanidad (id INTEGER PRIMARY KEY AUTOINCREMENT, animal_id INTEGER NOT NULL REFERENCES animales(id) ON DELETE CASCADE, tipo TEXT NOT NULL, producto TEXT, fecha TEXT NOT NULL, proxima TEXT);
CREATE TABLE eventos (id INTEGER PRIMARY KEY AUTOINCREMENT, animal_id INTEGER NOT NULL REFERENCES animales(id) ON DELETE CASCADE, tipo TEXT NOT NULL, fecha TEXT NOT NULL, nota TEXT);
CREATE TABLE ventas (id INTEGER PRIMARY KEY AUTOINCREMENT, animal_id INTEGER NOT NULL REFERENCES animales(id) ON DELETE CASCADE, fecha TEXT NOT NULL, comprador TEXT, monto REAL NOT NULL);`,
];

export const TABLAS = ['animales', 'pesajes', 'sanidad', 'eventos', 'ventas'] as const;
