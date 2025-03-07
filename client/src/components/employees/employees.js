import React, {useEffect, useState} from 'react';
import {fetchEmployees} from "../../http/employeesAPI";

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
            <h1>All Employees</h1>
            {employees.map((employee) => (
                <div key={employee.id} className="employee">
                    <div className="employee__content">
                        <strong>{employee.id}. {employee.fullName}</strong>
                        <div>Birth Date: {employee.birthDate}</div>
                        <div>Passport: {employee.passport}</div>
                        <div>Contact Info: {employee.contactInfo}</div>
                        <div>Address: {employee.address}</div>
                        <div>Department: {employee.department}</div>
                        <div>Position: {employee.position}</div>
                        <div>Salary: {employee.salary}</div>
                        <div>Hire Date: {employee.hireDate}</div>
                        <div>Status: {employee.status}</div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Employees;