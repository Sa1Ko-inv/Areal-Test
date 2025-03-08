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
    await $host.put(`api/employees/edit/${id}`, {
        fullName: fullName, birthDate: birthDate,
        passport: passport, contactInfo: contactInfo,
        address: address, department: department,
        position: position, salary: salary,
        hireDate: hireDate
    });
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