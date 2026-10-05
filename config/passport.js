const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const { User } = require('../models');

module.exports = function (passport) {
    passport.use(
        new LocalStrategy(
            { usernameField: 'username' },
            async (username, password, done) => {
                try {
                    // Cerca l'usuari per nom d'usuari
                    const user = await User.findOne({ where: { username } });
                    if (!user) {
                        return done(null, false, { message: 'Usuari no trobat' });
                    }

                    // Compara la contrasenya
                    const match = await bcrypt.compare(password, user.password);
                    if (match) {
                        return done(null, user);
                    } else {
                        return done(null, false, { message: 'Contrasenya incorrecta' });
                    }
                } catch (err) {
                    return done(err);
                }
            }
        )
    );

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await User.findByPk(id);
            done(null, user);
        } catch (err) {
            done(err, null);
        }
    });
};