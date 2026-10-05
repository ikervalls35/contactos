const express = require('express');
const path = require('path');
const session = require('express-session');
const passport = require('./config/passport');
const { sequelize } = require('./models');

const app = express();

// Middlewares de parseo de datos
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Motor de plantillas EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Configuración de sesiones Express
app.use(session({
    secret: 'secreto_super_seguro_contactos',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}));

// Inicializar Passport
app.use(passport.initialize());
app.use(passport.session());

// Middleware global para usuario en plantillas EJS
app.use((req, res, next) => {
    res.locals.user = req.user || null;
    next();
});

// Importar y montar rutas
const contactosRoutes = require('./routes/contactos');
const authRoutes = require('./routes/auth');

app.use('/', authRoutes);
app.use('/contactos', contactosRoutes);

// Redirección base
app.get('/', (req, res) => {
    res.redirect('/contactos');
});

// Manejo de 404
app.use((req, res) => {
    res.status(404).send('Página no encontrada');
});

// Manejo global de errores 500
app.use((err, req, res, next) => {
    console.error('❌ Error en el servidor:', err);
    res.status(500).send('Error interno del servidor: ' + err.message);
});

// Servidor HTTP
const PORT = process.env.PORT || 8080;

app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Servidor listo escuchando en http://localhost:${PORT}`);
});

// Conexión a la base de datos PostgreSQL
sequelize.authenticate()
    .then(() => console.log('✅ Base de datos conectada correctamente.'))
    .catch((err) => console.error('❌ Error de conexión con la base de datos:', err.message));