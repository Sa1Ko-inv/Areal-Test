import React from "react";
import {observer} from "mobx-react-lite";
import Employees from "../employees/employees";

const App = observer(() => {

    return (
        <div className="App">
            <form action="">
                <input type="text"/>
                <input type="text"/>
                <button>Добавить пользователя</button>
            </form>

            <Employees />
        </div>
    );
});

export default App;
