const Router = require('express')
const router = new Router
const userController = require('../controllers/userController')

router.post('/create', userController.createUser) // Создание нового пользователя
router.get('/all', userController.getAllUsers) // Получение всех пользователей
router.put('/edit/:id', userController.updateUser) // Редактирование пользователя по ID
router.put('/dismiss/:id', userController.dissmisUser) // Увольнение пользователя по ID

router.post('/clear', userController.clearUsers) // Очистка таблицы пользователей и сброс автоинкремента

module.exports = router