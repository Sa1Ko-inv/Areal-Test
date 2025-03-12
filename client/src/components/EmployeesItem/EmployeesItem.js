"use client"
import * as styles from "./employeesItem.module.scss"
import {observer} from "mobx-react-lite";
import userStore from "../../store/userStore";

const EmployeesItem = observer(({employee, onEditClick, onDismissClick}) => {
    const statusClassName = employee.status.toLowerCase() === "уволен" ? styles.statusDismissed : styles.statusActive
    console.log("status", userStore.user.status )

    return (
        <article className={styles.employee}>
            <div className={styles.idCell}>{employee.id}</div>
            <div className={styles.nameCell}>{employee.fullName}</div>
            <div className={styles.statusCell}>
                <span className={`${styles.status} ${statusClassName}`}>{employee.status}</span>
            </div>
            <div className={styles.infoContainer}>
                <div className={styles.infoCell}>{employee.birthDate}</div>
                <div className={styles.infoCell}>{employee.passport}</div>
                <div className={styles.infoCell}>{employee.contactInfo}</div>
                <div className={styles.infoCell}>{employee.address}</div>
                <div className={styles.infoCell}>{employee.department}</div>
                <div className={styles.infoCell}>{employee.position}</div>
                <div className={styles.infoCell}>{employee.salary}</div>
                <div className={styles.infoCell}>{employee.hireDate}</div>
            </div>
            <div className={styles.actionsCell}>
                <button
                    className={styles.editButton}
                    onClick={() => onEditClick(employee)}
                    // disabled={userStore.isFired}
                >
                    Редактировать
                </button>
                <button
                    className={styles.dismissButton}
                    onClick={() => onDismissClick(employee)}
                    disabled={employee.status.toLowerCase() === "уволен"}
                >
                    Уволить
                </button>
            </div>
        </article>
    )
});

export default EmployeesItem

