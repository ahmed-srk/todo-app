import React from "react";
import "date-fns";

export function Table(props){
    const dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    const acts = ['prayer', 'exercise', 'study', 'fasting', 'eating']
    const dailyUpdate = acts.map((act) => ({actName: act, dayUpdate: dayNames.map((day) => ({dayOfWeek: day, completed: false}))}))

    return (
        <table>
            <thead>
                <tr>
                    <th></th>
                    {dayNames.map((val, key) => <th key={key}>{val}</th> )}
                </tr>
            </thead>
            <tbody>
                {
                    dailyUpdate.map((activity, key) => {
                        return (
                            <tr key={key}>
                                <th>{activity.actName[0].toUpperCase() + activity.actName.substring(1)}</th>
                                {activity.dayUpdate.map((item, key) => <td key={key}>{item.dayOfWeek}</td> )}
                            </tr>
                        )
                    })
                }       
            </tbody>
        </table>
    )
}