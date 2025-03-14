import React, {useState} from 'react';
import * as styles from "./CreateEmployeeModal.model.scss";
import {createEmployees} from "@/http/employeesAPI";
import {InputMask} from "@react-input/mask";

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
                <input type="text" name="fullName" value={newEmployee.fullName} onChange={handleChange} placeholder="Введите ФИО"/>

                <p>Дата рождения</p>
                <InputMask mask="##/##/####" replacement='#' type="text" name="birthDate" value={newEmployee.birthDate} onChange={handleChange} placeholder="dd/MM/yyyy"/>

                <p>Паспортные данные</p>
                <InputMask mask="#### ######" replacement='#' type="text" name="passport" value={newEmployee.passport} onChange={handleChange} placeholder="0000 000000"/>

                <p>Контактная информация</p>
                <InputMask mask="+7-###-###-##-##" replacement='#' type="text" name="contactInfo" value={newEmployee.contactInfo} onChange={handleChange} placeholder="+7-XXX-XXX-XX-XX"/>

                <p>Адрес</p>
                <input type="text" name="address" value={newEmployee.address} onChange={handleChange} placeholder="Введите адрес проживания"/>

                <p>Отдел</p>
                <input type="text" name="department" value={newEmployee.department} onChange={handleChange} placeholder="Введите отдел"/>

                <p>Должность</p>
                <input type="text" name="position" value={newEmployee.position} onChange={handleChange} placeholder="Введите должность"/>

                <p>Зарплата</p>
                <input type="text" name="salary" value={newEmployee.salary} onChange={handleChange} placeholder="Введите зарплату (например, 50 000)"/>

                <p>Дата приема на работу</p>
                <InputMask mask="##/##/####" replacement='#' type="text" name="hireDate" value={newEmployee.hireDate} onChange={handleChange} placeholder="dd/MM/yyyy"/>

                <div className={styles.buttons}>
                    <button onClick={handleCreate}>Создать</button>
                    <button onClick={onClose}>Отмена</button>
                </div>
            </div>
        </div>
    );
};

export default CreateEmployeeModal;