import React from "react";
import { AddListForm } from "./AddListForm";
import CustomModal from "./CustomModal";
import { checkErrorForm } from "./FormComponents";

function AddToDoList({setToDoList, setShowModal}){
    const [formValues, setFormValues] = React.useState([
        {id: 'startDate', label: 'start date', type: 'date', value: '', required: true, condition: true},
        {id: `acts`, label: 'activity', type: 'text', value: 'Activity 1', required: true, condition: true},
    ]);

    const [error, setError] = React.useState(false)
    const { errorMsg } = checkErrorForm(error)

    function createToDoList(){
        for(let item of formValues){
            if(item.required && (item.value === '' || item.value === isNaN || item.condition === false)){
                setError(true)
                return
            }
            else{
                setError(false)
            }
        }

        setToDoList(() => {
            const startDate = formValues[0].value
            const actsList = []
            for(let i = 1; i < formValues.length; i++){ formValues[i].value && actsList.push(formValues[i].value) }
            return {actsList: actsList, startDate: startDate}
        })

        setShowModal(false)
    }

    return(
        <div>
            {
                <CustomModal 
                    title = 'To-Do List'
                    setShowModal = {setShowModal}
                    createContent = {createToDoList}
                    body = {<AddListForm formValues={formValues} setFormValues={setFormValues} error={error} errorMsg={errorMsg} />}
                />
            }
        </div>
    )
}

export default AddToDoList