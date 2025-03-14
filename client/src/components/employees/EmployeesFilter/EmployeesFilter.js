import MySelect from "../../UI/selected/MySelect";
import * as styles from './EmployeesFilter.module.scss';

const EmployeesFilter = ({sortedEmployees, sortEmployees, searchValue, setSearchValue}) => {

    return (

        <form className={styles.filterForm}>
            <div className={styles.searchContainer}>
                <input
                    className={styles.searchInput}
                    type='search'
                    placeholder='Поиск'
                    value={searchValue}
                    onChange={event => setSearchValue(event.target.value)}
                ></input>
            </div>

            <div className="sorted-and-searching">
                <MySelect
                    value={sortedEmployees}
                    onChange={sortEmployees}
                    defaultValue="Сортировка по..."
                    options={[
                        {value: "department", name: "По отделу"},
                        {value: "position", name: "По должности"},
                    ]}
                />
            </div>
        </form>


    );
};

export default EmployeesFilter;