import React, {useEffect, useState} from 'react';
import {fetchEmployees} from "../../http/employeesAPI";
import EmployeesItem from "../EmployeesItem/EmployeesItem";
import * as style from "./employees.module.scss"
import MySelect from "../UI/selected/MySelect";


const Employees = () => {
    const [employees, setEmployees] = useState([]);
    const [sortedEmployees, setSortedEmployees] = useState('');

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

    return (
        <div>
            <div className="title">
                <h1 className={style.title}>Все сотрудники</h1>
            </div>

            <div className="sorted-and-searching">
                <input placeholder='Поиск'></input>

                <MySelect
                    value={sortedEmployees}
                    onChange={sortEmployees}
                    defaultValue="Сортировка по..."
                    options={[
                        {value: "department", name: "По отделу"},
                        {value: "position", name: "По должности"},
                    ]}
                />
                <form action="">
                    <button>Добавить пользователя</button>
                </form>
                {employees.map((employee) => (
                    <EmployeesItem key={employee.id} employee={employee}/>
                ))}
            </div>
        </div>
    );
};

export default Employees;