import React from "react";
import {addDays, eachDayOfInterval, format, isMonday, isToday, previousMonday} from 'date-fns'

export function DisplayTable({actsList, startDate}){
    const dayNames = ['mon', 'tues', 'wed', 'thurs', 'fri', 'sat', 'sun']
    const [dailyUpdate, setDailyUpdate] = React.useState(
        actsList.map((act) => ( {actName: act, dayUpdate: dayNames.map((day) => ( {dayOfWeek: day, completed: false} ))} ))
    )

    const [weekRange, setWeekRange] = React.useState(() => {
        const toDoStartDate = new Date(startDate)
        const weekStartDate = isMonday(toDoStartDate) ? toDoStartDate : previousMonday(toDoStartDate)

        return eachDayOfInterval( {start: weekStartDate, end: addDays(weekStartDate, 6)} )
    })

    function onClickActivity(activity, day){
        setDailyUpdate((prev) => prev.map((act) => 
            activity === act.actName ? 
            {...act, dayUpdate: act.dayUpdate.map((item) => day === item.dayOfWeek ? {...item, completed: !item.completed} : {...item})} : 
            {...act}
        ))
    }

    return (
        <table>
            <thead>
                <tr>
                    <th></th>
                    {
                        weekRange.map((val, key) => 
                            <th className=" min-w-[120px] p-3" key={key}>
                                {isToday(val) ? `TODAY` : format(val, 'dd/MM')}
                            </th> 
                        )
                    }
                </tr>
            </thead>
            <tbody>
                {
                    dailyUpdate.map((activity, key) => 
                        <tr key={key} className='border-t-2'>
                            <th className=" border-r-2 p-3">{activity.actName[0].toUpperCase() + activity.actName.substring(1)}</th>
                            {
                                activity.dayUpdate.map((item, key) => 
                                    <td className= {`p-3 font-bold text-center ${item.completed ? `bg-green-500 hover:bg-green-300` : `bg-red-500 hover:bg-red-300`}`}
                                        onClick={() => onClickActivity(activity.actName, item.dayOfWeek)} key={key}>                                                      
                                        {item.completed ? <span>&#10003;</span> : <span>&#10007;</span>}
                                    </td> 
                                )
                            }
                        </tr>
                    )
                }       
            </tbody>
        </table>
    )
}