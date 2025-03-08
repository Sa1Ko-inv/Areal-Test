import React from "react";
import {observer} from "mobx-react-lite";
import Employees from "../employees/employees";

const App = observer(() => {

    return (
        <div className="App">
            <Employees />
        </div>
    );
});

export default App;
