import React from "react";
import Dashboard from "./Dashboard";
import OpenPage from "./OpenPage";

function App() {
    const [toDoList, setToDoList] = React.useState(() => JSON.parse(localStorage.getItem('toDoList')) || null)

    React.useEffect(() => {
        localStorage.setItem('toDoList', JSON.stringify(toDoList))
        if (!toDoList){ localStorage.setItem('dailyUpdate', null) }
    }, [toDoList])

    return (
        <div className="App flex justify-center items-center min-w-fit min-h-screen bg-gradient-to-r from-purple-500 to-blue-600">
            {
                toDoList === null ?
                <OpenPage setToDoList={setToDoList} /> :
                <Dashboard toDoList={toDoList} setToDoList={setToDoList} />
            }
        </div>
    );
}

export default App;