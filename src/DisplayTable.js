import React from "react";

export function DisplayTable({toDoList}){
    const dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    const dailyUpdate = toDoList.actsList.map((act) => ({actName: act, dayUpdate: dayNames.map((day) => ({dayOfWeek: day, completed: false}))}))

    return (
        <div className=" border-2 flex flex-col justify-center">
            <table>
                <thead>
                    <tr >
                        <th></th>
                        {dayNames.map((val, key) => <th className=" py-6 px-12 border-2" key={key}>{val}</th> )}
                    </tr>
                </thead>
                <tbody>
                    {
                        dailyUpdate.map((activity, key) => 
                            <tr key={key} className="m-4 border-2">
                                <th>{activity.actName[0].toUpperCase() + activity.actName.substring(1)}</th>
                                {activity.dayUpdate.map((item, key) => <td key={key}>{item.dayOfWeek}</td> )}
                            </tr>
                        )
                    }       
                </tbody>
            </table>
        </div>

    )
}