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

    const [formValues, setFormValues] = React.useState([
        {label: "start date", type: "date", value: format(new Date(), 'yyyy-MM-dd'), required: true},
        {label: "name", type: "text", value: "", required: true},
    ]);

    const [error, setError] = React.useState(false)
    const { errorMsg } = checkErrorForm(error)

    function createToDoList(){
        for(const key in toDoList){
            if(!toDoList[key].length){
                setError(true)
                return
            }
        }
        
        props.setShowModal(false)
    }

    console.log(toDoList.startDate.length)

    return(
        <div>
            {
                <CustomModal 
                    title = 'To-Do List'
                    setShowModal = {props.setShowModal}
                    createContent = {createToDoList}
                    body = {<AddListForm formValues={formValues} setFormValues={setFormValues} toDoList={toDoList} setToDoList={setToDoList} errorMsg={errorMsg} />}
                />
            }
        </div>
    )
}

export default AddToDoList