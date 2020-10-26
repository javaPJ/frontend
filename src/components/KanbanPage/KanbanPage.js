import React, {useState, useEffect} from 'react';
import styles from './KanbanPage.scss';
import classNames from 'classnames/bind';
import DragNDrop from './About/DragNDrop';

const cx = classNames.bind(styles);

const KanbanPage = ({menubar}) => {
    const [data, setData] = useState([]);
    const [groupDelete, setGroupDelete] = useState(-1);

    useEffect(() => {

        if(groupDelete === -1) {
            console.log("-1");
            setData([
                {key: 1, title: 'Group 1', items: ['1', '2', '3', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']},
                {key: 2, title: 'Group 2', items: ['4', '5']},
                {key: 3, title: 'Group 3', items: ['6', '7']},
                {key: 4, title: 'Group 4', items: ['8', '9']},
                {key: 5, title: 'Group 5', items: ['10', '11']},
            ]);
        } else if(groupDelete === -2){
            return ;
        } else {
            data.splice(groupDelete, 1);
            console.log(data);
            setGroupDelete(-2);
        }

    }, [groupDelete]);

    const handleDeleteGroup = (num) => {
        console.log(num);
        setGroupDelete(num);
    }

    const handleAddGroup = () => {
        
    }

    let  backLeft = menubar? "250px" : "60px";
    let size = menubar ? "1270px" : "1470px";

    return(
        <div style={{left: backLeft, width: size}} className={cx('kanbanpage-back')}>
            <DragNDrop data={data} handleDeleteGroup={handleDeleteGroup} handleAddGroup={handleAddGroup}></DragNDrop>
        </div>
    )
}

export default KanbanPage;