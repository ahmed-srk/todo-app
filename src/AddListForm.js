import React from "react"
import { CustomInput } from "./FormComponents"

export function AddListForm({formValues, setFormValues, toDoList, setToDoList, errorMsg}){
    function handleChange (event, index){
        const { value } = event.target
        
        setFormValues((prev) => {
            return prev.map((item, itemIndex) => {
                return itemIndex === index ? {...item, value: value} : {...item}
            })
        })
    }

    return(
        <form className=" grid grid-flow-row grid-cols-2 gap-x-3">          
            <div className=" col-span-2">
                {  
                    formValues.map((obj, index) => (
                        <CustomInput
                            key = {index}
                            objValue = {obj}
                            onChange = {handleChange}
                            index = {index}
                            errorMsg = {obj.required && errorMsg}
                        />
                    ))
                }
            </div>
        </form>
    )
}
