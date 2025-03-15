
import React, { useState } from 'react';
import EmployeesItem from "./EmployeesItem/EmployeesItem";
import * as style from "./employees.module.scss"
import EmployeesFilter from "./EmployeesFilter/EmployeesFilter";
import EditEmployeeModal from "./EmployeesItem/EditEmployeeModal/EditEmployeeModal";
import CreateEmployeeModal from "./EmployeesItem/CreateEmployeeModal/CreateEmployeeModal";
import { useEmployees } from '@/hook/useEmployees';
import ColumnHeaders from "@/components/employees/ColumnHeaders";

const Employees = () => {
    const {
        sortedEmployees,
        editingEmployee, setEditingEmployee,
        searchValue, setSearchValue,
        sortEmployees,
        handleSave,
        createEmployees,
        dismissEmployee,
        filteredEmployees,
    } = useEmployees();

    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    return (
        <main className={style.employeesContainer}>

            <header>
                <h1 className={style.title}>Все сотрудники</h1>
            </header>

            {/*Взаимодействия с пользователями*/}
            <section className={style.controlPanel}>
                <EmployeesFilter
                    sortedEmployees={sortedEmployees}
                    sortEmployees={sortEmployees}
                    searchValue={searchValue}
                    setSearchValue={setSearchValue}
                />

                <button className={style.addButton} onClick={() => setIsCreateModalOpen(true)}>
                    Добавить пользователя
                </button>
            </section>

            {/*Список сотрудников*/}
            <section className={style.employeesListSection}>
                <ColumnHeaders />

                <ul className={style.employeesList}>
                    {filteredEmployees.map((employee) => (
                        <li key={employee.id}>
                            <EmployeesItem employee={employee} onEditClick={setEditingEmployee} onDismissClick={dismissEmployee} />
                        </li>
                    ))}
                </ul>
            </section>

            {/*Модальные окна*/}
            {isCreateModalOpen && (
                <CreateEmployeeModal onClose={() => setIsCreateModalOpen(false)} create={createEmployees} />
            )}

            {editingEmployee && (
                <EditEmployeeModal employee={editingEmployee} onClose={() => setEditingEmployee(null)} onSave={handleSave} />
            )}
        </main>
    );
};

export default Employees;