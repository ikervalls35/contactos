const express = require('express');
const path = require('path');
const session = require('express-session');
const passport = require('./config/passport'); // Cargar la configuración de Passport

const app = express();

// Motor de plantillas EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Configurar sesiones de Express
app.use(session({
    secret: 'secreto_super_seguro_contactos',
    resave: false,
    saveUninitialized: false
}));

// Inicializar Passport y la sesión
app.use(passport.initialize());
app.use(passport.session());

// Middleware global para que 'user' esté disponible en todas las vistas EJS
app.use((req, res, next) => {
    res.locals.user = req.user || null;
    next();
});

// IMPORTAR Y MONTAR RUTAS
const contactosRoutes = require('./routes/contactos');
const authRoutes = require('./routes/auth');

app.use('/', authRoutes);
app.use('/contactos', contactosRoutes);

// Redirección base
app.get('/', (req, res) => {
    res.redirect('/contactos');
});

// Manejo 404
app.use((req, res) => {
    res.status(404).send('Página no encontrada');
});

// Servidor
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`🚀 Servidor ejecutándose en http://localhost:${PORT}`);
});