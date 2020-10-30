import React, {useState, useEffect, useRef} from 'react';
import styles from './KanbanPage.scss';
import classNames from 'classnames/bind';
import DragNDrop from './About/DragNDrop';

const cx = classNames.bind(styles);

const KanbanPage = ({menubar}) => {
    const [data, setData] = useState([]),
          [dragging, setDragging] = useState(false),
          [groupDelete, setGroupDelete] = useState(-1),
          [groupName, setGroupName] = useState(''),
          [groupItem, setGroupItem] = useState([]),
          [titleAdd, setTitleAdd] = useState(-1),
          [groupChange, setGroupChange] = useState(''),
          [groupChangeNum, setGroupChangeNum] = useState(-1),
          [newGroup, setNewGroup] = useState(''),
          [rightClick, setRightClick] = useState(false),
          [positionX, setPositionX] = useState(''),
          [positionY, setPositionY] = useState(''),
          [grpI, setGrpI] = useState(-1),
          [itemI, setItemI] = useState(-1),
          [move, setMove] = useState(-1),
          [deleteTitle, setDeleteTitle] = useState(-1),
          dragItem = useRef(),
          dragNode = useRef();

    useEffect(() => {

        if(move !== -1) {
            data.splice(move, 1, {key: move + 1, title: groupName, items: groupItem});
            setMove(-1);
        }

        if(deleteTitle !== -1) {
            data.splice(deleteTitle, 1, {key: deleteTitle+1, title: groupName, items: groupItem});
            setDeleteTitle(-1);
        }

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
    }, [groupDelete, titleAdd, groupChangeNum, newGroup, deleteTitle, move]);

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

    const handleRightClick = (e, num1, num2) => {
        e.preventDefault();

        setGrpI(num1);
        setItemI(num2);
        
        var btn = e.button;
        if (btn === 2) {
            setPositionX(e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft - 40);
            setPositionY(e.clientY + document.body.scrollTop + document.documentElement.scrollTop - 65);
            setRightClick(true);
        }
    }

    const handleUpMove = () => {
        var array = data[grpI].items;
        var tmp = array[itemI];
        array.splice(itemI, 1);
        array.unshift(tmp);
        setGroupItem(array);
        setGroupName(data[grpI].title);
        setMove(grpI);
        setRightClick(false);
    }

    const handleDownMove = () => {
        var array = data[grpI].items;
        var tmp = array[itemI];
        array.splice(itemI, 1);
        array.push(tmp);
        setGroupItem(array);
        setGroupName(data[grpI].title);
        setMove(grpI);
        setRightClick(false);
    }

    const handleDeleteTitle = () => {
        setGroupName(data[grpI].title);
        var array = data[grpI].items;
        array.splice(itemI, 1);
        setGroupItem(array);
        setDeleteTitle(grpI);
        setRightClick(false);
    }

    const handleDragStart = (e, params) => {
        dragItem.current = params;
        dragNode.current = e.target;
        dragNode.current.addEventListener('dragend', handleDragEnd);
        setTimeout(() => {
            setDragging(true);
        }, 0);
    }

    const handleDragEnter = (e, params) => {
        const currentItem =dragItem.current;
        if(e.target !== dragNode.current) {
            setData(oldList => {
                let newList = JSON.parse(JSON.stringify(oldList));
                newList[params.grpI].items.splice(params.itemI, 0, newList[currentItem.grpI].items.splice(currentItem.itemI,1)[0]);
                dragItem.current = params;
                return newList
            })
        }
    }

    const handleDragEnd = () => {
        setDragging(false);
        dragNode.current.removeEventListener('dragend', handleDragEnd);
        dragItem.current = null;
        dragNode.current = null;
    }

    const current = {
        background: "#E4E4E4",
        color: "#E4E4E4"
    }

    const getStyles = (params) => {
        if(dragging){
            const currentItem = dragItem.current;
            if(currentItem.grpI === params.grpI && currentItem.itemI === params.itemI) {
                return current;
            }
        }
    }

    let  backLeft = menubar? "250px" : "60px";
    let size = menubar ? "1270px" : "1470px";

    return(
        <div style={{left: backLeft, width: size}} className={cx('kanbanpage-back')}>
            <DragNDrop 
                data={data} 
                handleDragStart={handleDragStart}
                handleDragEnter={handleDragEnter}
                dragging={dragging}
                getStyles={getStyles}
                handleDeleteGroup={handleDeleteGroup} 
                handleAddGroup={handleAddGroup}
                handleAddTitle={handleAddTitle}
                handleGroupChange={handleGroupChange}
                handleDeleteTitle={handleDeleteTitle}
                handleRightClick={handleRightClick}
            >
            </DragNDrop>
            {  rightClick === true &&
                <div style={{top: positionY, left: positionX}} className={cx('dnd-item-delete')}>
                    <li onClick={() => {handleUpMove()}}>맨 위로 이동</li>
                    <li onClick={() => handleDownMove()}>맨 아래로 이동</li>
                    <li onClick={(e) => {handleDeleteTitle()}}>삭제</li>
                    <li onClick={() => setRightClick(false)}>취소</li>
                </div>
            }
        </div>
    )
}

export default KanbanPage;