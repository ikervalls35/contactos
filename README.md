# 📇 Gestor de Contactos - Express & Sequelize

Este proyecto es una aplicación web full-stack para la gestión de contactos (CRUD) con autenticación de usuarios, desarrollada como práctica de programación en el lado del servidor. El objetivo ha sido construir una aplicación robusta con arquitectura MVC, gestión de sesiones seguras y relaciones jerárquicas en la base de datos (Contactos ➡️ Provincias ➡️ Países).

---

## 🚀 Tecnologías Utilizadas

* **Backend:** Node.js, Express
* **Autenticación:** Passport.js (Local Strategy), bcrypt
* **Base de Datos:** PostgreSQL
* **ORM:** Sequelize
* **Motor de Plantillas & Estilos:** EJS, Bootstrap 5 & Bootstrap Icons

---

## 🧠 ¿Cómo funciona esta arquitectura Express + Sequelize? (Guía rápida)

La aplicación sigue el patrón de diseño **MVC (Modelo-Vista-Controlador)** utilizando Express para el enrutamiento y Sequelize como ORM para la persistencia de datos:

* **Modelos (`/models`):** Definen la estructura de las tablas (`User`, `Contacto`, `Provincia`, `Pais`) y sus asociaciones (claves foráneas y relaciones `belongsTo` / `hasMany`).
* **Rutas / Controladores (`/routes`):** Actúan como intermediarios interceptando las peticiones HTTP (`GET`, `POST`). Procesan la lógica de autenticación con Passport, gestionan los formularios y delegan las consultas a Sequelize.
* **Vistas (`/views`):** Plantillas EJS maquetadas con Bootstrap 5 que renderizan de forma dinámica las listas, formularios de inicio de sesión/registro y edición/creación de contactos.

**El flujo de la aplicación es:**  
El usuario realiza una petición a `/contactos` ➡️ El middleware de Passport valida la sesión activa ➡️ La ruta consulta los contactos a PostgreSQL mediante Sequelize (incluyendo los modelos de Provincia y País) ➡️ Los datos se inyectan en la vista `.ejs` ➡️ Se envía el HTML procesado al navegador.

---

## 🗄️ Configuración de la Base de Datos (PostgreSQL)

Para que Sequelize pueda conectarse y sincronizar las tablas de la aplicación, es necesario que PostgreSQL esté instalado y configurado en el sistema (Ubuntu).

### 1. Instalación del Motor
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib -y
sudo systemctl start postgresql
