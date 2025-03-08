import MySelect from "../UI/selected/MySelect";

const EmployeesFilter = ({ sortedEmployees, sortEmployees }) => {
    return (
        <div className="sorted-and-searching">
            <input placeholder='Поиск'></input>

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