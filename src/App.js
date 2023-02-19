import React from "react";
import { DisplayTable } from "./DisplayTable";
import OpenPage from "./OpenPage";

function App() {
    const [toDoList, setToDoList] = React.useState()

    return (
        <div className="App flex justify-center items-center min-h-screen bg-gradient-to-r from-purple-500 to-blue-600">
            {
                toDoList ?
                <DisplayTable {...toDoList} /> :
                <OpenPage setToDoList={setToDoList} />
            }
        </div>
    );
}

export default App;