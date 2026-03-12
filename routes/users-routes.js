import { User } from '../sequelize.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { private_key } from '../auth/private_key.js';

export function userLogin(app) {
    app.post('/api/login', (req, res) => {

        User.findOne({ where: { username: req.body.username } }).then(user => {

            if (!user) {
                const message = "l'utilisateur demandé n'existe pas.";
                return res.status(404).json({ message });
            }

            bcrypt.compare(req.body.password, user.password).then(isPasswordValid => {
                if (!isPasswordValid) {
                    const message = 'Le mot de passe saisi n\'est pas correct.';
                    return res.status(401).json({ message, data: user });
                }

                const token = jwt.sign(
                    { userId: user.id },
                    private_key,
                    { expiresIn: '1h' }
                );

                const message = 'L\'utilisateur a été connecté avec succès.';
                return res.json({ message, data: user, token });
            });

        }).catch(error => {
            const message = "L'utilisateur n'a pas pu être connecté. Réessayez dans quelques instants.";
            return res.status(500).json({ message, data: error });
        });
    });
}