const sequelize = require('./../db');
const {DataTypes} = require('sequelize');

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    fullName: {type: DataTypes.STRING, allowNull: false, comment: 'ФИО',},
    birthDate: {type: DataTypes.DATEONLY, allowNull: false, comment: 'Дата рождения',},
    passport: {type: DataTypes.STRING, allowNull: false, unique: true, validate: {is: /^\d{4} \d{6}$/}, comment: 'Серия/номер паспорта (формат ввода по маске)',},
    contactInfo: {type: DataTypes.STRING, allowNull: false, validate: {is: /^\+7-\d{3}-\d{3}-\d{2}-\d{2}$/}, comment: 'Контактная информация (формат ввода по маске)',},
    address: {type: DataTypes.STRING, allowNull: false, comment: 'Адрес проживания',},
    department: {type: DataTypes.STRING, allowNull: false, comment: 'Отдел',},
    position: {type: DataTypes.STRING, allowNull: false, comment: 'Должность',},
    salary: {type: DataTypes.DECIMAL(10, 2), allowNull: false, comment: 'Размер зарплаты',},
    hireDate: {type: DataTypes.DATEONLY, allowNull: false, comment: 'Дата принятия на работу',},
}, {
    tableName: 'users',
    timestamps: true, // Добавляет поля createdAt и updatedAt
    hooks: {
        beforeCreate: (user) => {
            if (user.birthDate) {
                const [day, month, year] = user.birthDate.split('-');
                user.birthDate = `${year}-${month}-${day}`;
            }
            if (user.hireDate) {
                const [day, month, year] = user.hireDate.split('-');
                user.hireDate = `${year}-${month}-${day}`;
            }
        }
    }
});

module.exports = {User};