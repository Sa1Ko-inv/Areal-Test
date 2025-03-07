import React, {useEffect, useState} from 'react';
import {fetchEmployees} from "../../http/employeesAPI";
import EmployeesItem from "../EmployeesItem/EmployeesItem";
import * as style from "./employees.module.scss"


const Employees = () => {
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        const getEmployees = async () => {
            try {
                const data = await fetchEmployees();
                console.log("Полученные данные сотрудников:", data);
                setEmployees(data);
            } catch (error) {
                console.error("Ошибка при получении сотрудников:", error);
                setEmployees([]);
            }
        }
        getEmployees();
    }, []);

    return (
        <div>
            <h1 className={style.title}>Все сотрудники</h1>
            {employees.map((employee) => (
                <EmployeesItem key={employee.id} employee={employee} />
            ))}
        </div>
    );
};

export default Employees;