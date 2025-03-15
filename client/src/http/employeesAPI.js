import {$host} from './index';

export const fetchEmployees = async () => {
    const {data} = await $host.get('api/employees/all');
    return data;
}

export const updateEmployees = async (id, fullName,
                                      birthDate, passport,
                                      contactInfo, address,
                                      department, position,
                                      salary, hireDate
) => {
    try {
        await $host.put(`api/employees/edit/${id}`, {
            fullName: fullName, birthDate: birthDate,
            passport: passport, contactInfo: contactInfo,
            address: address, department: department,
            position: position, salary: salary,
            hireDate: hireDate
        });
    } catch (error) {
        if (error.response) {
            alert(error.response.data.message);
        }
    }
};

export const createEmployees = async (employeeData) => {
    try {
        const response = await $host.post("api/employees/create", employeeData);
        return response.data; // Возвращаем созданного сотрудника
    } catch (error) {
        console.error("Ошибка при создании сотрудника:", error);
        throw error; // Пробрасываем ошибку для обработки в компоненте
    }
};

export const dismissEmployees = async (id, status) => {
    await $host.put(`api/employees/dismiss/${id}`, {status: status});
}