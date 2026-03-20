🎟️ TicketFlow

🚀 Descripción:
TicketFlow es una plataforma de venta de tickets electrónicos para eventos (musicales, tecnológicos, entre otros), diseñada para ofrecer una experiencia de compra rápida, segura y escalable.
La aplicación está construida con una arquitectura moderna que integra:
- Backend robusto con Node.js + Express
- Base de datos relacional gestionada con Sequelize y MySQL en la nube
- Frontend dinámico con React + TypeScript
- Gestión de estado global mediante Redux
Además, incorpora testing automatizado con Jest para garantizar la calidad del backend.

✨ Características principales:
🎉 Eventos
- Creación de eventos
- Búsqueda y filtrado por título
- Gestión dinámica de eventos

🔐 Autenticación y Seguridad:
- Registro e inicio de sesión seguro
- Autenticación con JWT (JSON Web Tokens)
- Contraseñas encriptadas con bcrypt
- Middlewares de autorización
- Protección contra ataques comunes
- Uso de variables de entorno (.env) para datos sensibles

🗄️ Base de Datos
- Modelos relacionales optimizados
- Migraciones y seeders
- Consultas eficientes con Sequelize ORM
- Arquitectura escalable

⚙️ Requisitos
Node.js instalado
Verificar versión: node --version

🚀 Instalación y ejecución
📦 Backend
cd backend
npm start

🗄️ Base de datos (Sequelize)
Ejecutar migraciones: 
cd backend
npx sequelize-cli db:migrate

Crear una nueva migración:
cd backend
npx sequelize-cli migration:generate --name nombre-migracion

🔧 Compilar TypeScript
Compilar todo el proyecto: tsc
Compilar archivo individual: tsc nombre-archivo.ts

🧪 Ejecutar tests (backend)
cd backend
npm test

🏗️ Arquitectura:
🔙 Backend
Lenguaje: TypeScript
Entorno: Node.js
Framework: Express.js
ORM: Sequelize
Testing: Jest
Autenticación: JWT

🎨 Frontend
Lenguaje: TypeScript
Framework: React
Estado global: Redux

☁️ Infraestructura
Base de datos: MySQL
Alojamiento: Cloud (ej: Clever Cloud)
Características:
Escalabilidad
Alta disponibilidad
Mantenimiento automatizado

📈 Funcionalidades del sistema:
🎟️ Gestión de tickets y eventos
👤 Autenticación de usuarios
🔍 Búsqueda de eventos
🛠️ Panel de gestión (eventos)
🧪 Testing del backend

📌 Este proyecto fue desarrollado aplicando buenas prácticas de ingeniería:
Código tipado con TypeScript
Separación clara entre frontend y backend
Arquitectura escalable
Seguridad en autenticación y manejo de datos
