import React from "react";
import {differenceInCalendarDays, format, isToday} from 'date-fns'

export function DisplayTable({startDate, dailyUpdate, setDailyUpdate, weekRange}){
    function onClickActivity(activity, day){
        setDailyUpdate((prev) => prev.map((act) => 
            activity === act.actName ?
            {...act, dayUpdate: act.dayUpdate.map((week) => week.map((item) => day === item.dayOfWeek ? {...item, completed: !item.completed} : {...item}))} : 
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
                            <th key={key} className=" min-w-[120px] p-3">
                                <p className=" text-gray-200">{format(new Date(val), 'yyyy-MM-dd') === format(new Date(startDate), 'yyyy-MM-dd') && `START`}</p>
                                <span className={isToday(new Date(val)) ? `text-yellow-200` : `` }>{isToday(new Date(val)) ? `TODAY` : format(new Date(val), 'dd/MM')}</span>
                            </th> 
                        )
                    }
                </tr>
            </thead>
            <tbody>
                {
                    dailyUpdate.map((activity, key) => 
                        <tr key={key} className='border-t'>
                            <th className=" border-r p-3 min-w-[100px]">{activity.actName[0].toUpperCase() + activity.actName.substring(1)}</th>
                            {
                                activity.dayUpdate.map((week) => {
                                    if(format(new Date(week[0].dayOfWeek), 'yyyy-MM-dd') === format(new Date(weekRange[0]), 'yyyy-MM-dd')){
                                        return week.map((item, key) => {
                                            if (differenceInCalendarDays(new Date(startDate), new Date(item.dayOfWeek)) > 0){
                                                return ( <td key={key} className= {`p-3 font-bold text-center text-white bg-gray-700 `}>&#8722;</td> )
                                            }
                                            else if (differenceInCalendarDays(new Date(item.dayOfWeek), new Date()) > 0){
                                                return ( <td key={key} className= {`p-3 font-bold text-center bg-gray-500`}>&#10007;</td> )
                                            }
                                            else if(!isToday(new Date(item.dayOfWeek))){
                                                return (
                                                    <td key={key} className= {`p-3 font-bold text-center ${item.completed ? `bg-green-500` : `bg-red-500`}`}>                                                      
                                                        {item.completed ? <span>&#10003;</span> : <span>&#10007;</span>}
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
                                    else {
                                        return null
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