require('dotenv').config();
const express = require('express');
const sequelize = require('./db');
const models = require('./models/models')
const cors = require('cors');
const router = require("./routes/index");
const errorHandler = require("./middleware/ErrorHandlingMiddleware")


const app = express();
const PORT = process.env.PORT || 8080;

// cors нужен чтобы наше приложение могло отправлять запросы на другой домен
app.use(cors())

// Чтобы наше приложение могло парсить json
app.use(express.json())

// Подключаем роутер, первый параметр - это префикс, по которому будет доступен наш роутер
app.use('/api', router);

// Обработка ошибок, последний middleware
app.use(errorHandler);

const start = async () => {
    try {
        await sequelize.authenticate(); // Подключение к БД
        await sequelize.sync(); //Сверяет состояние таблиц в коде и в БД
        app.listen(PORT, () => {
            console.log(`Server started on port ${PORT}`)
        });
    } catch (e) {
        console.log(e);
    }
}

start()