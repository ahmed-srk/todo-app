import React from "react";
import {differenceInCalendarDays, format, isToday} from 'date-fns'

export function DisplayTable({startDate, dailyUpdate, setDailyUpdate, weekRange, setWeekRange}){
    function onClickActivity(activity, day){
        setDailyUpdate((prev) => prev.map((act) => 
            activity === act.actName ? 
            {...act, dayUpdate: act.dayUpdate.map((item) => day === item.dayOfWeek ? {...item, completed: !item.completed} : {...item})} : 
            {...act}
        ))
    }

    // React.useEffect(() => {
    //     setInterval(() => {
    //         const today = new Date()
    //         if(today.getTime() === startOfDay(today).getTime() && isMonday(today)){
    //             setWeekRange(eachDayOfInterval( {start: today, end: addDays(today, 6)} ))
    //         }

    //         // // For testing purposes
    //         // if(today.getMinutes() === 48){
    //         //     setWeekRange(eachDayOfInterval( {start: today, end: addDays(today, 6)} ))
    //         // }
    //     }, 1000)
    // }, [])

    return (
        <table>
            <thead>
                <tr>
                    <th></th>
                    {
                        weekRange.map((val, key) => 
                            <th key={key} className=" min-w-[120px] p-3">
                                <p className=" text-gray-200">{val.getDate() === new Date(startDate).getDate() && `START`}</p>
                                <span className={isToday(val) ? `text-yellow-200` : `` }>{isToday(val) ? `TODAY` : format(val, 'dd/MM')}</span>
                            </th> 
                        )
                    }
                </tr>
            </thead>
            <tbody>
                {
                    dailyUpdate.map((activity, key) => 
                        <tr key={key} className='border-t'>
                            <th className=" border-r p-3">{activity.actName[0].toUpperCase() + activity.actName.substring(1)}</th>
                            {
                                activity.dayUpdate.map((item, key) => {
                                    if (differenceInCalendarDays(new Date(startDate), new Date(item.dayOfWeek)) > 0){
                                        return (
                                            <td key={key} className= {`p-3 font-bold text-center text-white bg-gray-700 `}>                                                      
                                                <span>&#8722;</span>
                                            </td>
                                        )
                                    }
                                    else if (differenceInCalendarDays(new Date(item.dayOfWeek), new Date()) > 0){
                                        return (
                                            <td key={key} className= {`p-3 font-bold text-center bg-gray-500 hover:bg-gray-400`}>
                                                <span>&#10007;</span>
                                            </td>
                                        )
                                    }
                                    else {
                                        return(
                                            <td key={key} onClick={() => onClickActivity(activity.actName, item.dayOfWeek)}
                                                className= {`p-3 font-bold text-center cursor-pointer ${item.completed ? `bg-green-500 hover:bg-green-300` : `bg-red-500 hover:bg-red-300`}`}>                                                      
                                                {item.completed ? <span>&#10003;</span> : <span>&#10007;</span>}
                                            </td> 
                                        ) 
                                    }
                                })
                            }
                        </tr>
                    )
                }       
            </tbody>
        </table>
    )
}