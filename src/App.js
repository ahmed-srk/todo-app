import React from "react";
import { DisplayTable } from "./DisplayTable";
import OpenPage from "./OpenPage";

function App() {
    const [toDoList, setToDoList] = React.useState()

    return (
        <div className="App flex justify-center items-center min-h-screen bg-gradient-to-r from-pink-700 to-blue-700">
            {
                toDoList ?
                <DisplayTable toDoList={toDoList} /> :
                <OpenPage setToDoList={setToDoList} />
            }
        </div>
    );
}

export default App;