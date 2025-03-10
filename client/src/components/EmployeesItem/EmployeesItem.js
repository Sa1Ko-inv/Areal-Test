import * as styles from "./employeesItem.module.scss"

const EmployeesItem = ({ employee, onEditClick, onDismissClick}) => {
    const statusClassName = employee.status.toLowerCase() === "уволен" ? styles.statusDismissed : styles.statusActive
    return (
        <div key={employee.id} className={styles.employee}>
            <div className={styles.header}>
                <h3 className={styles.name}>
                    {employee.id}. {employee.fullName}
                </h3>
                <span className={`${styles.status} ${statusClassName}`}>{employee.status}</span>
            </div>
            <div className={styles.infoContainer}>
                <div className={styles.detailItem}>
                    <div className={styles.label}>Дата Рождения</div>
                    <div className={styles.value}>{employee.birthDate}</div>
                </div>
                <div className={styles.detailItem}>
                    <div className={styles.label}>Паспортные данные</div>
                    <div className={styles.value}>{employee.passport}</div>
                </div>
                <div className={styles.detailItem}>
                    <div className={styles.label}>Контактная информация</div>
                    <div className={styles.value}>{employee.contactInfo}</div>
                </div>
                <div className={styles.detailItem}>
                    <div className={styles.label}>Адрес проживания</div>
                    <div className={styles.value}>{employee.address}</div>
                </div>
                <div className={styles.detailItem}>
                    <div className={styles.label}>Отдел</div>
                    <div className={styles.value}>{employee.department}</div>
                </div>
                <div className={styles.detailItem}>
                    <div className={styles.label}>Должность</div>
                    <div className={styles.value}>{employee.position}</div>
                </div>
                <div className={styles.detailItem}>
                    <div className={styles.label}>Зарплата</div>
                    <div className={styles.value}>{employee.salary}</div>
                </div>
                <div className={styles.detailItem}>
                    <div className={styles.label}>Дата принятия на работу</div>
                    <div className={styles.value}>{employee.hireDate}</div>
                </div>
            </div>
            <div className={styles.buttons}>
                <button
                    className={styles.editButton}
                    onClick={() => onEditClick(employee)}
                >
                    Редактировать</button>
                <button
                    className={styles.dismissButton}
                    onClick={() => onDismissClick(employee)}
                    disabled={employee.status.toLowerCase() === "Уволен"}
                >
                    Уволить</button>
            </div>
        </div>
    )
}

export default EmployeesItem

