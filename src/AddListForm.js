import React from "react"
import { CustomInput } from "./FormComponents"

export function AddListForm({formValues, setFormValues, errorMsg}){
    function handleChange (event, index){
        const { value } = event.target
        setFormValues((prev) => {
            return prev.map((item, itemIndex) => {
                return itemIndex === index ? {...item, value: value} : {...item}
            })
        })
    }

    function addInput(event){
        event.preventDefault()
        setFormValues((prev) => {
            return [...prev, {id: `acts`, label: `activity ${formValues.length}`, type: 'text', value: '', required: false}]
        })
    }

    function delInput(event){
        event.preventDefault() 
        setFormValues((prev) => {
            const arr = [...prev]
            arr.pop()
            return arr
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
                            errorMsg = {errorMsg}
                        />
                    ))
                }
            </div>
            <div className=" col-span-2 grid grid-cols-2 gap-2">
                <button onClick={(event) => addInput(event)} className="w-full bg-green-700 text-white font-bold uppercase text-sm py-3 rounded-md shadow hover:shadow-lg outline-none focus:outline-none">
                    Add Activity
                </button>
                <button onClick={(event) => delInput(event)} disabled={formValues.length < 3 && true} 
                        className={`w-full ${formValues.length < 3 ? `bg-gray-500` : `bg-red-600`} text-white font-bold uppercase text-sm py-3 rounded-md shadow hover:shadow-lg outline-none focus:outline-none`}>
                    Delete Activity
                </button>
            </div>
        </form>
    )
}
