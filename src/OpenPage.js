import React from "react";
import AddToDoList from "./AddToDoList";

function OpenPage({setToDoList}){
    const [showModal, setShowModal] = React.useState(false)

    return (
        <div>
            <div className=" flex flex-col justify-center items-center space-y-8">
                <h2 className=" text-2xl font-light font-mono">Hit the button below and get your things done and sorted TODAY</h2>
                
                <button onClick={() => setShowModal(true)}
                        className=" bg-green-500 text-white font-bold uppercase text-sm py-4 px-12 rounded-md active:shadow-[inset_3px_3px_3px_rgba(0,0,0,0.5)] outline-none focus:outline-none">
                    Create To-do List
                </button>
            </div>

            {showModal && <AddToDoList setToDoList={setToDoList} setShowModal={setShowModal} />}
        </div>
    )
}

export default OpenPage