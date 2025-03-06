require('dotenv').config();
const express = require('express');
const sequelize = require('./db');
const models = require('./models/models')
const cors = require('cors');


const app = express();
const PORT = process.env.PORT || 8080;



const start = async () => {
    try {
        // Подключение к БД
        await sequelize.authenticate();
        await sequelize.sync(); //Сверяет состояние таблиц в коде и в БД
        app.listen(PORT, () => {
            console.log(`Server started on port ${PORT}`)
        });
    } catch (e) {
        console.log(e);
    }
}

start()