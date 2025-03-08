import React, {useEffect, useState} from 'react';
import {fetchEmployees, updateEmployees} from "../../http/employeesAPI";
import EmployeesItem from "../EmployeesItem/EmployeesItem";
import * as style from "./employees.module.scss"
import EmployeesFilter from "../EmployeesFilter/EmployeesFilter";
import EditEmployeeModal from "../EmployeesItem/EditEmployeeModal/EditEmployeeModal";


const Employees = () => {
    const [employees, setEmployees] = useState([]);
    const [sortedEmployees, setSortedEmployees] = useState('');
    const [editingEmployee, setEditingEmployee] = useState(null);

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
    const sortEmployees = (sort) => {
        setSortedEmployees(sort);
        setEmployees([...employees].sort((a, b) => a[sort].localeCompare(b[sort])));
    }

    // При нажатии на кнопку "Редактировать", сохраняем данные сотрудника в состояние
    const handleEditClick = (employee) => {
        setEditingEmployee(employee);
    }

    // Обновление данных сотрудника
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
                prev.map((employee) =>
                    employee.id === updatedEmployee.id ? updatedEmployee : employee
                )
            );
        } catch (error) {
            console.log("Ошибка при обновлении данных сотрудника:", error);
        }
        setEditingEmployee(null);
    };

    return (
        <div>
            <div className="title">
                <h1 className={style.title}>Все сотрудники</h1>
            </div>

            <EmployeesFilter
                sortedEmployees={sortedEmployees}
                sortEmployees={sortEmployees}
            />

            <form action="">
                <button>Добавить пользователя</button>
            </form>

            {employees.map((employee) => (
                <EmployeesItem
                    key={employee.id}
                    employee={employee}
                    onEditClick={handleEditClick}
                />
            ))}

            {editingEmployee && (
                <EditEmployeeModal
                employee={editingEmployee}
                onClose={() => setEditingEmployee(null)}
                onSave={handleSave}

                />
            )}
        </div>
    );
};

export default Employees;