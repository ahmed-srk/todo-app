import React from "react";
import {addDays, eachDayOfInterval, isMonday, previousMonday} from 'date-fns'
import { DisplayTable } from "./DisplayTable";

function Dashboard({toDoList, setToDoList}){
    const [weekRange, setWeekRange] = React.useState(() => {
        const toDoStartDate = new Date(toDoList.startDate)
        const weekStartDate = isMonday(toDoStartDate) ? toDoStartDate : previousMonday(toDoStartDate)
        return eachDayOfInterval( {start: weekStartDate, end: addDays(weekStartDate, 6)} )
    })

    const [dailyUpdate, setDailyUpdate] = React.useState(
        () => JSON.parse(localStorage.getItem('dailyUpdate')) ||
        toDoList.actsList.map((act) => ( {actName: act, dayUpdate: weekRange.map((day) => ( {dayOfWeek: day, completed: false} ))} ))
    )

    const deleteToDoList = () => { setToDoList(null) }

    React.useEffect(() => {
        localStorage.setItem('dailyUpdate', JSON.stringify(dailyUpdate))

        // eslint-disable-next-line
    }, [toDoList, JSON.stringify(dailyUpdate)])

    return(
        <div className=" flex flex-col justify-center items-center space-y-12">
            { <DisplayTable startDate={toDoList.startDate} dailyUpdate={dailyUpdate} setDailyUpdate={setDailyUpdate} weekRange={weekRange} setWeekRange={setWeekRange} /> }

            <button onClick={() => deleteToDoList()} 
                    className=" bg-gray-900 text-white font-bold uppercase text-sm py-4 px-12 rounded-md active:shadow-[inset_3px_3px_3px_rgba(0,0,0,0.5)] outline-none focus:outline-none">
                Make New To-Do List
            </button>
        </div>
    )
}

export default Dashboard