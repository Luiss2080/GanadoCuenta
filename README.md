<div align="center">

<img src="docs/assets/logo.svg" alt="GanadoCuenta" width="96" height="96">

# GanadoCuenta

**Registro de ganado: animales, vacunas, pesajes, partos y ventas, sin internet en el campo.** Pensado para ganaderos y pequeños productores, offline.

[🚀 Características](#-características) · [🧰 Stack](#-stack) · [📂 Estructura](#-estructura) · [🔧 Configuración](#-configuración) · [🧪 Pruebas](#-pruebas) · [🤝 Contribuir](#-contribuir) · [📄 Licencia](#-licencia)

</div>

---

## 🚀 Características

- Animales identificados por arete, con especie, sexo y raza.
- Pesajes y ganancia de peso en el tiempo.
- Sanidad: vacunas y desparasitaciones con próxima fecha.
- Eventos: partos, traslados y bajas.
- Ventas con comprador y monto.
- Exportación CSV del hato.

> Sin servidores, sin suscripciones y sin servicios de pago: todos los datos viven en el dispositivo (SQLite).

## 🧰 Stack

| Capa | Tecnología |
|---|---|
| App | React Native + Expo (TypeScript) |
| Datos | SQLite local (expo-sqlite) |
| Navegación | Expo Router |
| Recordatorios | Notificaciones locales (expo-notifications) |
| Compartir | Hoja de compartir del sistema (expo-sharing), WhatsApp incluido |
| Archivos | Exportación CSV al dispositivo (expo-file-system) |
| Distribución | APK / EAS Build local |

### Modelo de datos

- `animales` (id, arete, especie, sexo, raza, nacimiento, estado)
- `pesajes` (id, animal_id, fecha, peso_kg)
- `sanidad` (id, animal_id, tipo, producto, fecha, proxima)
- `eventos` (id, animal_id, tipo, fecha, nota)
- `ventas` (id, animal_id, fecha, comprador, monto)

El detalle de cada tabla y la política de migraciones están en [docs/ARQUITECTURA.md](docs/ARQUITECTURA.md).

## 🗺️ Roadmap

1. Estructura base y navegación
2. Animales y aretes
3. Pesajes y sanidad
4. Eventos y ventas
5. Alertas y exportación CSV

## 📂 Estructura

```
GanadoCuenta/
├── app/            # Pantallas y rutas (Expo Router)
├── src/
│   ├── db/         # Esquema, migraciones y consultas SQLite
│   ├── components/ # Componentes reutilizables
│   └── lib/        # Utilidades (formato, CSV)
├── docs/assets/    # Logo y recursos del README
└── .github/        # Plantillas, CI y Dependabot
```

## 🔧 Configuración

**Requisitos:** Node.js 20+ y la app Expo Go (o un emulador).

```bash
git clone https://github.com/Luiss2080/GanadoCuenta.git
cd GanadoCuenta
npm install
npx expo start
```

Escaneá el QR con Expo Go para abrir la app en tu teléfono. La base local se crea sola en el primer arranque.

El repositorio está en fase inicial: la estructura, la base de datos y la documentación están listas y la app se construye siguiendo el roadmap.

## 🧪 Pruebas

```bash
npm test
npm run lint
npx tsc --noEmit
```

## 🤝 Contribuir

Leé la [guía de contribución](CONTRIBUTING.md) y el [código de conducta](CODE_OF_CONDUCT.md). Para reportar vulnerabilidades consultá la [política de seguridad](SECURITY.md); para dudas, [SUPPORT.md](SUPPORT.md).

## 📄 Licencia

Distribuido bajo licencia MIT. Consultá [LICENSE](LICENSE).

---

<div align="center">

Hecho por [Luiss2080](https://github.com/Luiss2080)

</div>
