TicketFlow es una aplicación de sistema de compra de tickets electrónicos para eventos musicales, tecnología, etc. Cuenta con un sistema backend robusto diseñado con Node + Express para la creación de las diferentes rutas. A su vez implmenta Sequelize para conectar las bases de datos relacionadas alojadas en la nube con la aplicación para una mayor eficiencia. El Frontend esta diseñado con React + TS e implemneta redux para gestionar los estados globales de la apliacion. 

🎉 Eventos:

Crear evento, buscar evento por título

🔐 Autenticación y Seguridad:

Registro e inicio de sesión seguro
Tokens JWT para autenticación
Contraseñas encriptadas con bcrypt
Middlewares de autorización
Protección contra ataques comunes

🗄️ Base de Datos:

Modelos relacionales optimizados
Migraciones y seeders
Consultas eficientes con Sequelize ORM
Escalabilidad
Versión Node.js node --version

Correr el servidor local: /backend npm start

Ejecutar migraciones con Sequelize: /backend npx sequelize-cli db:migrate

Crear una nueva migración: /backend npx sequelize-cli migration:generate --name nombre-migracion --attributes (todos los atributos con los tipos de datos de cada uno de ellos);

Compilar TypeScript: /backend/nombre-carpeta/ tsc

Ejecutar tests en el backend: /backend npm test
