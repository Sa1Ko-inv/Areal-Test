const ApiError = require("../error/ApiError");
const {User} = require("../models/models");
const bcrypt = require('bcrypt')

class UserController {
    //Создание нового пользователя
    async createUser(req, res, next) {
        try {
            const {
                fullName,
                birthDate,
                passport,
                contactInfo,
                address,
                department,
                position,
                salary,
                hireDate
            } = req.body;

            const user = await User.create({
                fullName,
                birthDate,
                passport,
                contactInfo,
                address,
                department,
                position,
                salary,
                hireDate
            });
            return res.json(user);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    //Получение всех пользователей
    async getAllUsers(req, res, next) {
        try {
            const users = await User.findAll();
            return res.json(users);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    // Обновление информации о пользователе по ID
    async updateUser(req, res, next) {
        try {
            const {id} = req.params;
            const {
                fullName,
                birthDate,
                passport,
                contactInfo,
                address,
                department,
                position,
                salary,
                hireDate
            } = req.body;

            const user = await User.findOne({where: {id}});

            if (!user) {
                return next(ApiError.badRequest('Пользователь не найден'));
            }

            // Проверка, не уволен ли пользователь
            if (user.status === 'Уволен') {
                return next(ApiError.forbidden('Редактирование информации уволенного сотрудника запрещено'));
            }

            await user.update({
                fullName,
                birthDate,
                passport,
                contactInfo,
                address,
                department,
                position,
                salary,
                hireDate
            })
            return res.json(user);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    // Увольнение пользователя по ID
    async dissmisUser(req, res, next) {
        try {
            const {id} = req.params;
            const user = await User.findOne({where: {id}});

            if (!user) {
                return next(ApiError.badRequest('Пользователь не найден'));
            }

            await user.update({status: 'Уволен'});
            return res.json({user, message: 'Пользователь успешно уволен'});
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    // Очистка таблицы пользователей и сброс автоинкремента
    async clearUsers(req, res, next) {
        try {
            await User.truncate({restartIdentity: true});
            return res.json({message: 'Таблица пользователей очищена, автоинкремент сброшен'});
        } catch (error) {
            return next(ApiError.internal(error.message));
        }
    }
}

module.exports = new UserController();