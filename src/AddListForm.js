import React from "react"
import { differenceInCalendarDays, isThisWeek } from "date-fns"
import { CustomInput } from "./FormComponents"

export function AddListForm({formValues, setFormValues, errorMsg}){
    function handleChange (event, index){
        const { value } = event.target
        setFormValues((prev) => {
            return prev.map((item, itemIndex) => {
                if (itemIndex === index){
                    if (index === 0){
                        return (
                            isThisWeek(new Date(value), { weekStartsOn: 1 }) && differenceInCalendarDays(new Date(value), new Date()) <= 0 ?
                            {...item, value: value, condition: true} :
                            {...item, value: value, condition: false}
                        )
                    }
                    else {
                        for (let j = 1; j < formValues.length; j++){
                            if (index === j){ continue }
                            else if (value === formValues[j].value){ return {...item, value: value, condition: false} }
                        } 
                        return {...item, value: value, condition: true}
                    }
                }
                else {
                    if (itemIndex === 0){ return {...item} }
                    else {
                        for (let j = 1; j < formValues.length; j++){
                            if (itemIndex === j || index === j){ continue }
                            else if (item.value === formValues[j].value || item.value === value){ return {...item, condition: false} }
                        }
                        return {...item, condition: true}
                    }
                }
            })
        })
    }

    function addInput(event){
        event.preventDefault()
        setFormValues((prev) => {
            return [...prev, {id: `acts`, label: `Activity ${formValues.length}`, type: 'text', value: `Activity ${formValues.length}`, required: false, condition: true}]
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

    React.useEffect(() => {
        setFormValues((prev) => {
            return prev.map((item, index) => {
                if (index === 0){ return {...item} }
                else {
                    for (let j = 1; j < formValues.length; j++){
                        if (index === j){ continue }
                        else if (item.value === formValues[j].value){ return {...item, condition: false} }
                    }  
                    return {...item, condition: true}
                }
            })
        })

        // eslint-disable-next-line
    }, [formValues.length])

    return(
        <form className=" grid grid-flow-row grid-cols-2 gap-x-3">          
            <div className=" col-span-2">
                {  
                    formValues.map((obj, index) => (
                        <div key = {index}>
                            <CustomInput          
                                objValue = {obj}
                                onChange = {handleChange}
                                index = {index}
                                errorMsg = {errorMsg}
                            />

                            {index === 0 && !obj.condition && obj.value && <p style={{...errorMsg.styleText, marginTop: '-16px'}}>Date should be within this week till Today!</p>}
                            {index !== 0 && !obj.condition && obj.value && <p style={{...errorMsg.styleText, marginTop: '-16px'}}>Activity names cannot be the same!</p>}
                        </div>                        
                    ))
                }
                
            </div>

            <div className=" col-span-2 grid grid-cols-2 gap-2">
                <button onClick={(event) => addInput(event)} className="w-full bg-green-700 text-white font-bold uppercase text-sm py-3 rounded-md shadow hover:shadow-lg">
                    Add Activity
                </button>
                <button onClick={(event) => delInput(event)} disabled={formValues.length < 3 && true} 
                        className={`w-full ${formValues.length < 3 ? `bg-gray-500` : `bg-red-600`} text-white font-bold uppercase text-sm py-3 rounded-md shadow hover:shadow-lg`}>
                    Delete Activity
                </button>
            </div>
        </form>
    )
}
