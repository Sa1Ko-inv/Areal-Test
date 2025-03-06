const sequelize = require('./../db');
const {DataTypes} = require('sequelize');
const {parse, format, isValid} = require('date-fns');

// Функция для безопасного парсинга даты
const safeParseDateString = (dateString) => {
    try {
        const parsedDate = parse(dateString, 'dd/MM/yyyy', new Date());
        if (!isValid(parsedDate)) {
            throw new Error('Invalid date');
        }
        return format(parsedDate, 'yyyy-MM-dd');
    } catch (error) {
        throw new Error(`Invalid date format: ${dateString}`);
    }
};

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    fullName: {type: DataTypes.STRING, allowNull: false, comment: 'ФИО'},
    birthDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        comment: 'Дата рождения',
        get() {
            const rawValue = this.getDataValue('birthDate');
            return rawValue ? format(new Date(rawValue), 'dd/MM/yyyy') : null;
        },
        set(value) {
            const parsedDate = parse(value, 'dd/MM/yyyy', new Date());
            this.setDataValue('birthDate', format(parsedDate, 'yyyy-MM-dd'));
        }
    },
    passport: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {is: /^\d{4} \d{6}$/},
        comment: 'Серия/номер паспорта'
    },
    contactInfo: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {is: /^\+7-\d{3}-\d{3}-\d{2}-\d{2}$/},
        comment: 'Контактная информация'
    },
    address: {type: DataTypes.STRING, allowNull: false, comment: 'Адрес проживания'},
    department: {type: DataTypes.STRING, allowNull: false, comment: 'Отдел'},
    position: {type: DataTypes.STRING, allowNull: false, comment: 'Должность'},
    salary: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        comment: 'Размер зарплаты',
        get() {
            const rawValue = this.getDataValue('salary');
            return rawValue ? rawValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') : null;
        }
    },
    hireDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        comment: 'Дата принятия на работу',
        get() {
            const rawValue = this.getDataValue('hireDate');
            return rawValue ? format(new Date(rawValue), 'dd/MM/yyyy') : null;
        },
        set(value) {
            const parsedDate = parse(value, 'dd/MM/yyyy', new Date());
            this.setDataValue('hireDate', format(parsedDate, 'yyyy-MM-dd'));
        }
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: 'Работает',
        comment: 'Статус сотрудника (Работает/Уволен)'
    }
}, {
    tableName: 'users',
    timestamps: true,
    hooks: {
        beforeCreate: (user) => {
            if (user.salary) {
                user.salary = parseFloat(String(user.salary).replace(/\s+/g, ''));
            }
        },
        beforeUpdate: (user) => {
            if (user.salary) {
                user.salary = parseFloat(String(user.salary).replace(/\s+/g, ''));
            }
        }
    }
});

module.exports = {User};