# 📇 Gestor de Contactos - Express & Sequelize

Este proyecto es una aplicación web para la gestión de contactos (CRUD) con sistema de usuarios e inicio de sesión. Está construida desde cero utilizando el patrón de diseño ****MVC (Modelo-Vista-Controlador)****.

## 🚀 Tecnologías y para qué sirve cada una

-   ****Node.js & Express:**** Es el motor del servidor. Express se encarga de gestionar el tráfico de la web (las rutas como `/login` o `/contactos`), recibir los datos de los formularios y devolver las páginas al usuario.
-   ****PostgreSQL:**** La base de datos donde se guardan de forma permanente los usuarios, contactos, provincias y países.
-   ****Sequelize (ORM):**** Es el puente de comunicación entre Node.js y PostgreSQL. Permite hacer consultas a la base de datos escribiendo código JavaScript en lugar de consultas SQL complejas.
-   ****Passport.js & bcrypt:**** Se encarga de la seguridad. Permite iniciar sesión, mantener la sesión abierta del usuario y encriptar las contraseñas antes de guardarlas en la base de datos.
-   ****EJS & Bootstrap 5:**** Crean las pantallas visuales (HTML) con botones, tablas y formularios adaptables para cualquier pantalla.

## 🧠 ¿Cómo funciona la aplicación por dentro? (Guía básica)

El proyecto está organizado en tres partes principales para mantener el código ordenado:

1.  ****Los Modelos (******`**/models**`******):**** Definen la estructura de los datos. Le dicen a Sequelize cómo son las tablas en PostgreSQL (por ejemplo: la tabla `User` tiene usuario, correo, teléfono y contraseña; y la tabla `Contacto` tiene una provincia vinculada).
2.  ****Las Rutas y Controladores (******`**/routes**`******):**** Son la "lógica" de la aplicación. Cuando entras a una página o envías un formulario:
3.  -   Verifican si estás autenticado.
    -   Le piden los datos a Sequelize.
    -   Cifran contraseñas o guardan nuevos contactos.
    -   Te redirigen a la página correspondiente.
4.  ****Las Vistas (******`**/views**`******):**** Son las plantillas HTML (archivos `.ejs`). Muestran en pantalla los datos recuperados de la base de datos y los formularios estilizados con Bootstrap 5.

## 🔄 El flujo completo del usuario

1.  ****Registro e Inicio de Sesión (******`**/registro**`** ****y**** **`**/login**`******):**** El usuario crea una cuenta. La contraseña se cifra con `bcrypt` y se guarda en la tabla `users`. Al iniciar sesión, Passport valida los datos y mantiene la sesión activa.
2.  ****Lista de Contactos (******`**/contactos**`******):**** Una vez dentro, el usuario ve una tabla con sus contactos y la información de la provincia y país asociados.
3.  ****Creación y Edición (******`**/contactos/crear**`** ****y**** **`**/contactos/editar/:id**`******):**** Se puede añadir un nuevo contacto seleccionando su provincia desde un desplegable o modificar un contacto existente y guardarlo o borrarlo.

## 🗄️ Configuración de la Base de Datos

Para ejecutar el proyecto, se crea la base de datos en PostgreSQL:
sudo -u postgres psql  

CREATE DATABASE proyecto\_contactos;  
CREATE USER alumno WITH ENCRYPTED PASSWORD 'alumno';  
ALTER DATABASE proyecto\_contactos OWNER TO alumno;  
\\q  

__(Nota: Sequelize se encarga automáticamente de crear las tablas en la base de datos al arrancar el servidor).__

## ⚙️ Cómo ejecutar el proyecto

1.  ****Instalar dependencias:****  
    npm install  
    
2.  ****Iniciar el servidor:****  
    npm run dev  
    
3.  ****Abrir en el navegador:****  
    [http://localhost:8080/login](http://localhost:8080/login)

🔗[****Enlace IA****](https://share.gemini.google/bZ7LZcYpRkPs)

__Desarrollado por Iker Valls Jiménez - 2º DAW__
