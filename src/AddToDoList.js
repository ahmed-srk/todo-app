import React from "react";
import { format } from "date-fns";
import { AddListForm } from "./AddListForm";
import CustomModal from "./CustomModal";
import { checkErrorForm } from "./FormComponents";

function AddToDoList({setToDoList, setShowModal}){
    const [formValues, setFormValues] = React.useState([
        {id: 'startDate', label: 'start date', type: 'date', value: format(new Date(), 'yyyy-MM-dd'), required: true},
        {id: `acts`, label: 'activity', type: 'text', value: '', required: true},
    ]);

    const [error, setError] = React.useState(false)
    const { errorMsg } = checkErrorForm(error)

    function createToDoList(){
        for(const item of formValues){
            if(item.required && (item.value === '' || item.value === isNaN)){
                setError(true)
                return
            }
        }

        setToDoList(() => {
            const startDate = formValues[0].value
            const actsList = []
            for(let i = 1; i < formValues.length; i++){ actsList.push(formValues[i].value) }
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
                    body = {<AddListForm formValues={formValues} setFormValues={setFormValues} errorMsg={errorMsg} />}
                />
            }
        </div>
    )
}

export default AddToDoList