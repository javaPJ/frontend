import React, {useState, useEffect} from 'react';
import styles from './KanbanPage.scss';
import classNames from 'classnames/bind';
import DragNDrop from './About/DragNDrop';

const cx = classNames.bind(styles);

const KanbanPage = ({menubar}) => {
    const [data, setData] = useState([]),
          [groupDelete, setGroupDelete] = useState(-1),
          [groupName, setGroupName] = useState(''),
          [groupItem, setGroupItem] = useState([]),
          [titleAdd, setTitleAdd] = useState(-1),
          [groupChange, setGroupChange] = useState(''),
          [groupChangeNum, setGroupChangeNum] = useState(-1),
          [newGroup, setNewGroup] = useState('');

    useEffect(() => {

        if(newGroup !== '') {
            data.push({key: data.length+1, title: newGroup, items: []});
            setNewGroup('');
        }

        if(titleAdd !== -1) {
            data.splice(titleAdd, 1, {key: titleAdd+1, title: groupName, items: groupItem});
            setTitleAdd(-1);
            setGroupName('');
            setGroupItem([]);
        }

        if(groupChangeNum !== -1) {
            data.splice(groupChangeNum, 1, {key: groupChangeNum+1, title: groupChange, items: groupItem});
            setGroupItem([]);
            setGroupChange('');
            setGroupChangeNum(-1);
        }

        if(groupDelete === -1) {
            setData([
                {key: 1, title: 'Group 1', items: ['1', '2', '3']},
                {key: 2, title: 'Group 2', items: ['4', '5']},
                {key: 3, title: 'Group 3', items: ['6', '7']},
                {key: 4, title: 'Group 4', items: ['8', '9']},
                {key: 5, title: 'Group 5', items: ['10', '11']},
            ]);
            setGroupDelete(-2);
        } else if(groupDelete === -2){
            return ;
        } else {
            data.splice(groupDelete, 1);
            console.log(data);
            setGroupDelete(-2);
            return ;
        }
    }, [groupDelete, titleAdd, groupChangeNum, newGroup]);

    const handleDeleteGroup = (num) => {
        setGroupDelete(num);
    }

    const handleAddGroup = (value) => {
        setNewGroup(value);
    }

    const handleGroupChange = (e, num) => {
        setGroupChange(e.target.value);
        setGroupChangeNum(num);
        setGroupItem(data[num].items);
    }

    const handleAddTitle = (num) => {
        var thistitle = document.getElementById('text_content').value;
        setGroupName(data[num].title);
        var array = data[num].items;
        array.unshift(thistitle);
        setGroupItem(array);
        setTitleAdd(num);
    }

    let  backLeft = menubar? "250px" : "60px";
    let size = menubar ? "1270px" : "1470px";

    return(
        <div style={{left: backLeft, width: size}} className={cx('kanbanpage-back')}>
            <DragNDrop 
                data={data} 
                handleDeleteGroup={handleDeleteGroup} 
                handleAddGroup={handleAddGroup}
                handleAddTitle={handleAddTitle}
                handleGroupChange={handleGroupChange}
            >
            </DragNDrop>
        </div>
    )
}

export default KanbanPage;