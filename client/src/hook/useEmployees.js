import { useEffect, useState } from 'react';
import { dismissEmployees, fetchEmployees, updateEmployees } from "@/http/employeesAPI";

export const useEmployees = () => {
    const [employees, setEmployees] = useState([]);
    const [sortedEmployees, setSortedEmployees] = useState('');
    const [editingEmployee, setEditingEmployee] = useState(null); // Состояние для редактирования сотрудника
    const [createEmployee, setCreateEmployee] = useState(null); // Состояние для создания нового сотрудника
    const [searchValue, setSearchValue] = useState(''); // Состояние для поиска сотрудника

    useEffect(() => {
        const getEmployees = async () => {
            try {
                const data = await fetchEmployees();
                const sortedData = data.sort((a, b) => a.id - b.id);
                setEmployees(sortedData);
            } catch (error) {
                console.error("Ошибка при получении сотрудников:", error);
                setEmployees([]);
            }
        };
        getEmployees();
    }, []);

    const sortEmployees = (sortKey) => {
        setSortedEmployees(sortKey);
        setEmployees([...employees].sort((a, b) => a[sortKey].localeCompare(b[sortKey])));
    };

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

    const dismissEmployee = async (employee) => {
        try {
            await dismissEmployees(employee.id, "Уволен");
            setEmployees((prev) =>
                prev.map((emp) =>
                    emp.id === employee.id ? { ...emp, status: "Уволен" } : emp
                )
            );
        } catch (error) {
            console.error("Ошибка при увольнении сотрудника:", error);
        }
    };

    const filteredEmployees = employees.filter(employee =>
        employee.fullName.toLowerCase().includes(searchValue.toLowerCase())
    );

    return {
        sortedEmployees,
        editingEmployee,
        setEditingEmployee,
        searchValue,
        setSearchValue,
        sortEmployees,
        handleSave,
        createEmployees,
        dismissEmployee,
        filteredEmployees,
    };
};