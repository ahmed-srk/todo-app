import React from "react"
import { styleClass } from "./FormComponents"

export function AddListForm({toDoList, setToDoList, errorMsg}){
    function handleChange(event){
        const {name, value} = event.target
        setToDoList((prev) => ({...prev, [name]: value}))
    }

    return(
        <form className=" grid grid-flow-row grid-cols-2 gap-x-3">
            <div className=" col-start-1 col-span-1">
                <h4 className=" text-sm font-light text-gray-500">Start Date <span className=" font-bold text-black">&#42;</span></h4>
                <input className={` form-input ${styleClass}`} type="date" value={toDoList.startDate} name="startDate" onChange={handleChange} style={errorMsg.styleTextBox(toDoList.startDate)}/>
                <p style={errorMsg.styleText}>{!toDoList.startDate && errorMsg.text}</p>
            </div>
        </form>
    )
}
