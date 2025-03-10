import MySelect from "../UI/selected/MySelect";

const EmployeesFilter = ({ sortedEmployees, sortEmployees, searchValue, setSearchValue }) => {

    return (
        <div className="sorted-and-searching">
            <input
                placeholder='Поиск'
                value={searchValue}
                onChange={event => setSearchValue(event.target.value)}
            ></input>

            <MySelect
                value={sortedEmployees}
                onChange={sortEmployees}
                defaultValue="Сортировка по..."
                options={[
                    { value: "department", name: "По отделу" },
                    { value: "position", name: "По должности" },
                ]}
            />
        </div>
    );
};

export default EmployeesFilter;