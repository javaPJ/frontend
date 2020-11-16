import React from 'react';
import './List.scss';

const tableList = ({team, onRemove}) => {
    const{id, name, email, date} = team;
    return(
        <table className = {id % 2? "tableEven-List" : "tableOdd-List"}>
            <tr>
                <td className = "name-List">{name}</td>
                <td className = "email-List">{email}</td>
                <td className = "date-List">{date}</td>
                <td><button className = "button-List" onClick={() => onRemove(id)}>강퇴 </button></td>
            </tr>
        </table>
    )
}

export default tableList; 