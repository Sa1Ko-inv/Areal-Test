// src/components/employees/ColumnHeaders.js
import React from 'react';
import * as style from "./employees.module.scss";

const ColumnHeaders = () => (
    <header className={style.columnHeaders}>
        <div className={style.idColumn}>ID</div>
        <div className={style.nameColumn}>ФИО</div>
        <div className={style.statusColumn}>Статус</div>
        <div className={style.infoColumns}>
            <div className={style.column}>Дата Рождения</div>
            <div className={style.column}>Паспортные данные</div>
            <div className={style.column}>Контактная информация</div>
            <div className={style.column}>Адрес проживания</div>
            <div className={style.column}>Отдел</div>
            <div className={style.column}>Должность</div>
            <div className={style.column}>Зарплата</div>
            <div className={style.column}>Дата принятия на работу</div>
        </div>
        <div className={style.actionsColumn}>Действия</div>
    </header>
);

export default ColumnHeaders;