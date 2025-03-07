import {$host} from './index';

export const fetchEmployees = async () => {
const {data} = await $host.get('api/employees/all');
return data;
}