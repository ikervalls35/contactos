const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { User } = require('../models');

passport.use(new LocalStrategy(
    async (username, password, done) => {
        try {
            const user = await User.findOne({ where: { username } });
            if (!user) {
                return done(null, false, { message: 'Usuario no encontrado' });
            }

            // Si usas un método de verificación o comparación simple
            const isValidPassword = user.password === password;
            // Nota: Si usas bcrypt, sería: await bcrypt.compare(password, user.password)

            if (!isValidPassword) {
                return done(null, false, { message: 'Contraseña incorrecta' });
            }

            return done(null, user);
        } catch (error) {
            return done(error);
        }
    }
));

// Serializar usuario en la sesión
passport.serializeUser((user, done) => {
    done(null, user.id);
});

// Deserializar usuario desde la sesión
passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findByPk(id);
        done(null, user);
    } catch (error) {
        done(error, null);
    }
});

module.exports = passport;