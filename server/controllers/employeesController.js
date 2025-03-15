const ApiError = require("../error/ApiError");
const {User} = require("../models/models");

class EmployeesController {
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

            const userToUpdate = await User.findOne({where: {id}});

            if (!userToUpdate) {
                return next(ApiError.badRequest('Пользователь не найден'));
            }

            // Проверка, не уволен ли пользователь
            if (userToUpdate.status === 'Уволен') {
                return next(ApiError.forbidden('Редактирование информации уволенного сотрудника запрещена'));
            }

            await userToUpdate.update({
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

            return res.json(userToUpdate);
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
}

module.exports = new EmployeesController();