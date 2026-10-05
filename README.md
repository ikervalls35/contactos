# 📇 Gestor de Contactos - Express & Sequelize

Este proyecto es una aplicación web full-stack para la gestión de contactos (CRUD) con autenticación de usuarios, desarrollada como práctica de programación en el lado del servidor. El objetivo ha sido construir una aplicación robusta utilizando arquitectura MVC, gestión de sesiones seguras y relaciones jerárquicas en la base de datos (Contactos ➡️ Provincias ➡️ Países).

## 🚀 Tecnologías Utilizadas

-   ****Backend:**** Node.js / Express
-   ****Autenticación:**** Passport.js (Local Strategy) & bcrypt
-   ****Base de Datos:**** PostgreSQL
-   ****ORM:**** Sequelize
-   ****Motor de Plantillas & Estilos:**** EJS & Bootstrap 5 (con Bootstrap Icons)

## 🧠 ¿Cómo funciona esta arquitectura Express + Sequelize? (Guía rápida)

La aplicación sigue el patrón de diseño ****MVC (Modelo-Vista-Controlador)**** separando las responsabilidades de forma clara para mantener un código limpio y modular:

1.  ****Modelos (******`**/models**`******):**** Definen la estructura de las tablas (`User`, `Contacto`, `Provincia`, `Pais`) y sus asociaciones relacionales en la base de datos mediante Sequelize (claves foráneas y relaciones `belongsTo` / `hasMany`).
2.  ****Rutas / Controladores (******`**/routes**`******):**** Actúan como intermediarios interceptando las peticiones HTTP que llegan desde el navegador (`GET`, `POST`). Procesan la lógica de autenticación con Passport.js, gestionan la entrada de formularios y coordinan las consultas con la base de datos.
3.  ****Vistas (******`**/views**`******):**** Plantillas dinámicas EJS maquetadas con Bootstrap 5 que renderizan la interfaz gráfica: formularios de login/registro, listado de contactos y pantallas de creación o edición.

****El flujo básico de este proyecto es:**** El usuario entra a `/contactos` ➡️ El middleware de ****Passport**** valida la sesión ➡️ La ****Ruta**** consulta la lista de contactos a PostgreSQL mediante ****Sequelize**** (incluyendo sus Provincias y Países asociados) ➡️ La ****Ruta**** pasa los datos a la vista `.ejs` ➡️ Se renderiza el HTML final en pantalla.

## 🗄️ Configuración de la Base de Datos (PostgreSQL)

Para que el ORM de Express (Sequelize) pueda conectarse y sincronizar las tablas automáticamente, es necesario que el motor de base de datos esté instalado y configurado en Ubuntu.

****1\. Instalación del Motor****

Bash

sudo apt update  
sudo apt install postgresql postgresql-contrib -y  
sudo systemctl start postgresql  

****2\. Creación del Usuario y la Base de Datos**** Accede a la consola de administración de PostgreSQL:

Bash

sudo -u postgres psql  

Dentro de la consola SQL, ejecuta las siguientes instrucciones para preparar el entorno:

SQL

CREATE DATABASE proyecto\_contactos;  
CREATE USER alumno WITH ENCRYPTED PASSWORD 'alumno';  
ALTER DATABASE proyecto\_contactos OWNER TO alumno;  
\\q  

__Nota: Gracias a la sincronización de modelos (___`_sync()_`___), Sequelize genera y mapea automáticamente las tablas__ _`_users_`___,__ _`_contactos_`___,__ _`_provincias_`_ __y__ _`_paises_`_ __al arrancar el servidor.__

## ⚙️ Instalación y Despliegue

1.  ****Instalar las dependencias del proyecto:****  
    Bash
    
    npm install  
    
2.  ****Iniciar el servidor en modo desarrollo:****  
    Bash
    
    npm run dev  
    
3.  ****Acceder a la aplicación:**** Abre tu navegador web y visita:[http://localhost:8080/login](http://localhost:8080/login)

## 👨‍🏫 Notas para el profesor (Víctor Ponz)

Hola Víctor, en el siguiente enlace puedes ver el historial completo de la conversación y el proceso de razonamiento guiado mediante IA para estructurar, configurar y programar la práctica:

🔗[****Historial del proceso de desarrollo****](https://share.gemini.google/bZ7LZcYpRkPs)

__Desarrollado por Iker Valls Jiménez - 2º DAW__
