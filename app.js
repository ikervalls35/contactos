require('dotenv').config();
const express = require('express');
const path = require('path');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');

const { sequelize } = require('./models');
const routes = require('./routes/index');

const app = express();

// Configuración de Motor de Plantillas (EJS)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middlewares de lectura de datos
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Sesiones y Flash Messages
app.use(session({
    secret: process.env.SESSION_SECRET || 'secreto',
    resave: false,
    saveUninitialized: false
}));
app.use(flash());

// Inicialización de Passport
require('./config/passport')(passport);
app.use(passport.initialize());
app.use(passport.session());

// Variables globales para vistas
app.use((req, res, next) => {
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.errores = req.flash('errores');
    res.locals.user = req.user || null;
    next();
});

// Cargar enrutador principal
app.use('/', routes);

// Verificar conexión con PostgreSQL (sin bloquear el servidor)
sequelize.authenticate()
    .then(() => console.log('✅ Conexión con PostgreSQL establecida correctamente.'))
    .catch((err) => console.error('❌ Error al conectar a PostgreSQL:', err));

// Levantar el servidor HTTP
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`🚀 Servidor ejecutándose en http://localhost:${PORT}`);
});