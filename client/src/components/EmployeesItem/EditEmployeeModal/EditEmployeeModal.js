import React, {useState} from 'react';
import * as styles from './EditEmployeeModal.module.scss';

const EditEmployeeModal = ({employee, onClose, onSave}) => {
    const [formData, setFormData] = useState(employee);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        onSave(formData);
    };

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modal}>
                <h2>Редактировать сотрудника</h2>
                <p>ФИО</p>
                <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} />
                <p>Дата рождения</p>
                <input type="text" name="birthDate" value={formData.birthDate} onChange={handleChange} />
                <p>Паспортные данные</p>
                <input type="text" name="passport" value={formData.passport} onChange={handleChange} />
                <p>Контактная информация</p>
                <input type="text" name="contactInfo" value={formData.contactInfo} onChange={handleChange} />
                <p>Адрес</p>
                <input type="text" name="address" value={formData.address} onChange={handleChange} />
                <p>Отдел</p>
                <input type="text" name="department" value={formData.department} onChange={handleChange} />
                <p>Должность</p>
                <input type="text" name="position" value={formData.position} onChange={handleChange} />
                <p>Зарплата</p>
                <input type="text" name="salary" value={formData.salary} onChange={handleChange} />
                <p>Дата приема на работу</p>
                <input type="text" name="hireDate" value={formData.hireDate} onChange={handleChange} />
                <div className={styles.buttons}>
                    <button onClick={handleSubmit}>Сохранить</button>
                    <button onClick={onClose}>Отмена</button>
                </div>
            </div>
        </div>
    );
};

export default EditEmployeeModal;