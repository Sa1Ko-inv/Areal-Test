import React, {useState} from 'react';
import * as styles from "./CreateEmployeeModal.model.scss";
import {createEmployees} from "../../../http/employeesAPI";

const CreateEmployeeModal = ({onClose, create}) => {
    const [newEmployee, setNewEmployee] = useState({
        fullName: "",
        birthDate: "",
        passport: "",
        contactInfo: "",
        address: "",
        department: "",
        position: "",
        salary: "",
        hireDate: ""
    });

    // Обработчик изменения полей
    const handleChange = (e) => {
        setNewEmployee({ ...newEmployee, [e.target.name]: e.target.value });
    };

    // Создание сотрудника
    const handleCreate = async () => {
        try {
            const createdEmployee = await createEmployees(newEmployee); // Отправляем на сервер
            create(createdEmployee); // Добавляем в список
            onClose(); // Закрываем модальное окно
        } catch (error) {
            console.error("Ошибка при создании сотрудника:", error);
        }
    };

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modal}>
                <h2>Создание сотрудника</h2>

                <p>ФИО</p>
                <input type="text" name="fullName" value={newEmployee.fullName} onChange={handleChange} />

                <p>Дата рождения</p>
                <input type="text" name="birthDate" value={newEmployee.birthDate} onChange={handleChange} />

                <p>Паспортные данные</p>
                <input type="text" name="passport" value={newEmployee.passport} onChange={handleChange} />

                <p>Контактная информация</p>
                <input type="text" name="contactInfo" value={newEmployee.contactInfo} onChange={handleChange} />

                <p>Адрес</p>
                <input type="text" name="address" value={newEmployee.address} onChange={handleChange} />

                <p>Отдел</p>
                <input type="text" name="department" value={newEmployee.department} onChange={handleChange} />

                <p>Должность</p>
                <input type="text" name="position" value={newEmployee.position} onChange={handleChange} />

                <p>Зарплата</p>
                <input type="text" name="salary" value={newEmployee.salary} onChange={handleChange} />

                <p>Дата приема на работу</p>
                <input type="text" name="hireDate" value={newEmployee.hireDate} onChange={handleChange} />

                <div className={styles.buttons}>
                    <button onClick={handleCreate}>Создать</button>
                    <button onClick={onClose}>Отмена</button>
                </div>
            </div>
        </div>
    );
};

export default CreateEmployeeModal;