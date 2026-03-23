const ApiError = require("../error/apiError");
const bcrypt = require("bcrypt");
const { User } = require("../models/models");
const jwt = require("jsonwebtoken");

const generateJwt = (id, login) => {
    return jwt.sign(
        { id, login },
        process.env.JWT_SECRET,
        { expiresIn: '3h' }
    );
}

class UserController {
    async registration(req, res, next) {
        try {
            const { login, password } = req.body;

            if (!login || !password) {
                return next(ApiError.badRequest('Пароль и логин не могут быть пустыми!'));
            }

            const candidate = await User.findOne({ where: { login } });

            if (candidate) {
                return next(ApiError.conflict('Пользователь с таким логином уже существует!'));
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            const user = await User.create({ login, password: hashedPassword });
            const token = generateJwt(user.id, user.login);

            return res.json({ token });
        } catch (e) {
            return next(ApiError.internal('Ошибка при регистрации'));
        }
    }

    async login(req, res, next) {
        try {
            const { login, password } = req.body;

            if (!login || !password) {
                return next(ApiError.badRequest('Пароль и логин не могут быть пустыми!'));
            }

            const user = await User.findOne({ where: { login } });

            if (!user) {
                return next(ApiError.unauthorized('Неверный логин или пароль'));
            }

            const comparePassword = await bcrypt.compare(password, user.password);

            if (!comparePassword) {
                return next(ApiError.unauthorized('Неверный логин или пароль'));
            }

            const token = generateJwt(user.id, user.login);

            return res.json({ token });
        } catch (e) {
            return next(ApiError.internal('Ошибка при авторизации'));
        }
    }

    async check(req, res) {
        const token = generateJwt(req.user.id, req.user.login);
        return res.json({ token });
    }
}

module.exports = new UserController();