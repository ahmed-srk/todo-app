import React from "react";
import {addWeeks, differenceInCalendarDays, differenceInCalendarWeeks, eachDayOfInterval, isMonday, isThisWeek, nextMonday, nextSunday, previousMonday, previousSunday} from 'date-fns'
import { DisplayTable } from "./DisplayTable";

export default function Dashboard({toDoList, setToDoList}){
    const [today, setToday] = React.useState(new Date())
    const [numberOfWeeks, setNumberOfWeeks] = React.useState(1)

    const [weekRange, setWeekRange] = React.useState(() => {
        const toDoStartDate = new Date(toDoList.startDate)
        const weekStartDate = isMonday(toDoStartDate) ? toDoStartDate : previousMonday(toDoStartDate)
        return eachDayOfInterval( {start: weekStartDate, end: nextSunday(weekStartDate)} )
    })

    const [dailyUpdate, setDailyUpdate] = React.useState(
        () => JSON.parse(localStorage.getItem('dailyUpdate')) ||
        toDoList.actsList.map((act) => ( {actName: act, dayUpdate: [weekRange.map((day) => ( {dayOfWeek: day, completed: false} ))] } ))
    )

    const deleteToDoList = () => { setToDoList(null) }

    const changeWeekRange = (id) => {
        if (id === -1 && differenceInCalendarDays(new Date(weekRange[0]), new Date(toDoList.startDate)) > 0){
            setWeekRange((prev) => eachDayOfInterval( {start: previousMonday(prev[0]), end: previousSunday(prev[0])} ))
        }
        else if (id === 1 && !isThisWeek(new Date(weekRange[0]), {weekStartsOn: 1})){
            setWeekRange((prev) => eachDayOfInterval( {start: nextMonday(prev[prev.length-1]), end: nextSunday(prev[prev.length-1])} ))
        }
    }

    React.useEffect(() => {
        setInterval(() => {
            const currentDay = new Date()
            const diffInWeeks = differenceInCalendarWeeks(currentDay, weekRange[0], {weekStartsOn: 1})
            
            // checking if today is not equal to the currentDay and if the weekRange is within this week 
            // in order to update today and render the whole component, thus triggering the table to change
            if (today.getDate() !== currentDay.getDate() && diffInWeeks === 0){
                setToday(currentDay)
            }
            // checking if the week has changed
            // and then updating the dailyUpdate list with the previous weeks
            // and then updating the weekRange according to this current week
            // and finally updating the numberOfWeeks to update dailyUpdate
            else if (diffInWeeks > 0) {
                for(let i = 1; i < diffInWeeks; i++){
                    const monday = addWeeks(weekRange[0], i)
                    const week = (eachDayOfInterval( {start: monday, end: nextSunday(monday)} ))
                    setDailyUpdate((prev) => prev.map((act) => ({...act, dayUpdate: [...act.dayUpdate, week.map((day) => ({dayOfWeek: day, completed: false}))]})))
                }

                const monday = isMonday(currentDay) ? currentDay : previousMonday(currentDay)
                setWeekRange(eachDayOfInterval( {start: monday, end: nextSunday(monday)} ))
                setNumberOfWeeks((prev) => prev + diffInWeeks)
            }
        }, 1000)

        // eslint-disable-next-line
    }, [])

    console.log(dailyUpdate)

    React.useEffect(() => {
        if (numberOfWeeks > 1){
            setDailyUpdate((prev) => prev.map((act) => ({...act, dayUpdate: [...act.dayUpdate, weekRange.map((day) => ({dayOfWeek: day, completed: false}))]})))
        }
        // eslint-disable-next-line
    }, [numberOfWeeks])

    React.useEffect(() => {
        localStorage.setItem('dailyUpdate', JSON.stringify(dailyUpdate))
        // eslint-disable-next-line
    }, [toDoList, JSON.stringify(dailyUpdate)])

    return(
        <div className=" flex flex-col justify-center items-center space-y-12">
            <div className=" grid grid-flow-col col-span-3 justify-center items-center gap-x-24">
                { differenceInCalendarDays(new Date(weekRange[0]), new Date(toDoList.startDate)) > 0 && <ArrowButton id={-1} sign = "&lt;"  onClick={(id) => changeWeekRange(id)} /> }
                { <DisplayTable startDate={toDoList.startDate} dailyUpdate={dailyUpdate} setDailyUpdate={setDailyUpdate} weekRange={weekRange} /> }
                { !isThisWeek(new Date(weekRange[0]), {weekStartsOn: 1}) && <ArrowButton id={1} sign = "&gt;" onClick={(id) => changeWeekRange(id)} /> }
            </div>
            <button onClick={() => deleteToDoList()} 
                    className=" bg-gray-900 text-white font-bold uppercase text-sm py-4 px-12 rounded-md active:shadow-[inset_3px_3px_3px_rgba(0,0,0,0.5)] outline-none focus:outline-none">
                Make New To-Do List
            </button>
        </div>
    )
}

function ArrowButton(props){
    return (
        <span id={props.id} onClick={() => props.onClick(props.id)} className=" text-4xl text-gray-200 font-extrabold cursor-pointer">
            {props.sign}
        </span>
    )
}

