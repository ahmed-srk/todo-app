import React from "react";
import { format } from "date-fns";
import { AddListForm } from "./AddListForm";
import CustomModal from "./CustomModal";
import { checkErrorForm } from "./FormComponents";

function AddToDoList(props){
    const [toDoList, setToDoList] = React.useState({
        actsList: [],
        startDate: format(new Date(), 'yyyy-MM-dd'),
    })

    const [error, setError] = React.useState(false)
    const { errorMsg } = checkErrorForm(error)

    function createToDoList(){
        for(const key in toDoList){
            if(toDoList[key] === '' || toDoList[key] === isNaN){
                setError(true)
                return
            }
        }
        
        props.setShowModal(false)
    }

    return(
        <div>
            {
                <CustomModal 
                    title = 'To-Do List'
                    setShowModal = {props.setShowModal}
                    createContent = {createToDoList}
                    body = {<AddListForm toDoList={toDoList} setToDoList={setToDoList} errorMsg={errorMsg} />}
                />
            }
        </div>
    )
}

export default AddToDoList