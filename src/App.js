import React from "react";
import { DisplayTable } from "./DisplayTable";
import AddToDoList from "./AddToDoList";

function App() {
    const [showModal, setShowModal] = React.useState(false)    

    return (
        <div className="App">
            <DisplayTable />

            {showModal && <AddToDoList setShowModal={setShowModal} />}

            <button onClick={() => setShowModal(true)}>Create To-do List</button>
        </div>
    );
}

export default App;