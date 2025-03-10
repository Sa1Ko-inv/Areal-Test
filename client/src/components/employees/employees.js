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
                    emp.id === employee.id ? { ...emp, status: "уволен"} : emp
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
        <div>
            <h1 className={style.title}>Все сотрудники</h1>

            {/* Фильтр */}
            <EmployeesFilter
                sortedEmployees={sortedEmployees}
                sortEmployees={sortEmployees}
                searchValue={searchValue}
                setSearchValue={setSearchValue}
            />

            {/* Кнопка добавления сотрудника */}
            <button onClick={() => setIsCreateModalOpen(true)}>
                Добавить пользователя
            </button>

            {/* Список сотрудников */}
            {filteredEmployees.map((employee) => (
                <EmployeesItem key={employee.id} employee={employee} onEditClick={handleEditClick} onDismissClick={dismissEmployee}/>
            ))}

            {/* Модальные окна */}
            {isCreateModalOpen && (
                <CreateEmployeeModal onClose={() => setIsCreateModalOpen(false)} create={createEmployees}/>
            )}

            {editingEmployee && (
                <EditEmployeeModal employee={editingEmployee} onClose={() => setEditingEmployee(null)}
                                   onSave={handleSave}/>
            )}

        </div>
    );
};

export default Employees;