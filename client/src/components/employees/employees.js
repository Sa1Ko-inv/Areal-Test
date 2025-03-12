import React, {useEffect, useState} from 'react';
import {dismissEmployees, fetchEmployees, updateEmployees} from "../../http/employeesAPI";
import EmployeesItem from "../EmployeesItem/EmployeesItem";
import * as style from "./employees.module.scss"
import EmployeesFilter from "../EmployeesFilter/EmployeesFilter";
import EditEmployeeModal from "../EmployeesItem/EditEmployeeModal/EditEmployeeModal";
import CreateEmployeeModal from "../EmployeesItem/CreateEmployeeModal/CreateEmployeeModal";


const Employees = () => {
    // Состояние для хранения данных сотрудников
    const [employees, setEmployees] = useState([]);
    const [sortedEmployees, setSortedEmployees] = useState('');
    const [editingEmployee, setEditingEmployee] = useState(null); // Состояние для редактирования сотрудника
    const [createEmployee, setCreateEmployee] = useState(null); // Состояние для создания нового сотрудника
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false); // Состояние для открытия/закрытия модального окна
    const [searchValue, setSearchValue] = useState(''); // Состояние для поиска сотрудника

    useEffect(() => {
        const getEmployees = async () => {
            try {
                const data = await fetchEmployees();
                console.log("Полученные данные сотрудников:", data);
                const sortedData = data.sort((a, b) => a.id - b.id);
                setEmployees(sortedData);
            } catch (error) {
                console.error("Ошибка при получении сотрудников:", error);
                setEmployees([]);
            }
        }
        getEmployees();
    }, []);

    // Сортировка сотрудников по отделу или должности
    const sortEmployees = (sortKey) => {
        setSortedEmployees(sortKey);
        setEmployees([...employees].sort((a, b) => a[sortKey].localeCompare(b[sortKey])));
    }

    // Открытие окна редактирования
    const handleEditClick = (employee) => {
        setEditingEmployee(employee);
    }

    // Сохранение изменений сотрудника
    const handleSave = async (updatedEmployee) => {
        try {
            await updateEmployees(
                updatedEmployee.id,
                updatedEmployee.fullName,
                updatedEmployee.birthDate,
                updatedEmployee.passport,
                updatedEmployee.contactInfo,
                updatedEmployee.address,
                updatedEmployee.department,
                updatedEmployee.position,
                updatedEmployee.salary,
                updatedEmployee.hireDate
            );
            setEmployees((prev) =>
                prev.map((emp) =>
                    emp.id === updatedEmployee.id ? updatedEmployee : emp
                )
            );
        } catch (error) {
            console.log("Ошибка при обновлении данных сотрудника:", error);
        }
        setEditingEmployee(null);
    };

    // Создание нового сотрудника
    const createEmployees = (newEmployee) => {
        setEmployees([...employees, newEmployee]);
        setCreateEmployee(null)
    }

    //Увольнение сотрудника
    const dismissEmployee = async (employee) => {
        try {
            await dismissEmployees(
                employee.id,
                "Уволен"
            );
            setEmployees((prev) =>
                prev.map((emp) =>
                    emp.id === employee.id ? {...emp, status: "уволен"} : emp
                )
            );
        } catch (error) {
            console.error("Ошибка при увольнении сотрудника:", error);
        }
    }

    const filteredEmployees = employees.filter(employee => {
        return employee.fullName.toLowerCase().includes(searchValue.toLowerCase())
    })

    return (

        <main className={style.employeesContainer}>

            <header>
                <h1 className={style.title}>Все сотрудники</h1>
            </header>

            <section className={style.controlPanel}>
                {/* Фильтр */}
                <EmployeesFilter
                    sortedEmployees={sortedEmployees}
                    sortEmployees={sortEmployees}
                    searchValue={searchValue}
                    setSearchValue={setSearchValue}
                />

                {/* Кнопка добавления сотрудника */}
                <button className={style.addButton} onClick={() => setIsCreateModalOpen(true)}>
                    Добавить пользователя
                </button>

            </section>

            <section className={style.employeesListSection}>
                {/* Заголовки столбцов */}
                <header className={style.columnHeaders}>
                    <div className={style.idColumn}>ID</div>
                    <div className={style.nameColumn}>ФИО</div>
                    <div className={style.statusColumn}>Статус</div>
                    <div className={style.infoColumns}>
                        <div className={style.column}>Дата Рождения</div>
                        <div className={style.column}>Паспортные данные</div>
                        <div className={style.column}>Контактная информация</div>
                        <div className={style.column}>Адрес проживания</div>
                        <div className={style.column}>Отдел</div>
                        <div className={style.column}>Должность</div>
                        <div className={style.column}>Зарплата</div>
                        <div className={style.column}>Дата принятия на работу</div>
                    </div>
                    <div className={style.actionsColumn}>Действия</div>
                </header>

                {/* Список сотрудников */}
                <ul className={style.employeesList}>
                    {filteredEmployees.map((employee) => (
                        <li key={employee.id}>
                            <EmployeesItem employee={employee} onEditClick={handleEditClick}
                                           onDismissClick={dismissEmployee}/>
                        </li>
                    ))}
                </ul>

            </section>
            {/* Модальные окна */}
            {isCreateModalOpen && (
                <CreateEmployeeModal onClose={() => setIsCreateModalOpen(false)} create={createEmployees}/>
            )}

            {editingEmployee && (
                <EditEmployeeModal employee={editingEmployee} onClose={() => setEditingEmployee(null)}
                                   onSave={handleSave}/>
            )}

        </main>

    );
};

export default Employees;