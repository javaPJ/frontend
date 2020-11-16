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
          [groupList, setGroupList] = useState([]),
          [titleAdd, setTitleAdd] = useState(-1),
          [itemList, setItemList] = useState([]),
          [itemTitle, setItemTitle] = useState(''),
          [preItemTitle, setPreItemTitle] = useState(''),
          [itemInGroup, setItemInGroup] = useState([]),
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
          [changeTitle, setChangeTitle] = useState(-1),
          [labelChange, setLabelChange] = useState(-1),
          [preItem, setPreItem] = useState([]),
          [nextItem, setNextItem] = useState([]),
          [preGroup, setPreGroup] = useState(-1),
          [nextGroup, setNextGroup] = useState(-1),
          dragItem = useRef(),
          dragNode = useRef();

    useEffect(() => {

        if(preGroup !== -1) {
            data.splice(preGroup, 1, {key: preGroup+1, title: data[preGroup].title, items: preItem});
            data.splice(nextGroup, 1, {key: newGroup+1, title: data[nextGroup].title, items: nextItem});
            setPreItem([]);
            setNextItem([]);
            setPreGroup(-1);
            setNextGroup(-1);
        }

        if(labelChange !== -1) {
            data.splice(labelChange, 1, {key: labelChange+1, title: data[labelChange].title, items: groupItem});
            setLabelChange(-1);
        }

        if(changeTitle !== -1) {
            data.splice(changeTitle, 1, {key: changeTitle+1, title: groupName, items: groupItem});
            for(var index=0;index<itemList.length;index++) {
                if(itemList[index] === preItemTitle) {
                    itemList.splice(index, 1, itemTitle);
                }
            }

            setItemTitle('');
            setPreItemTitle('');
            setChangeTitle(-1);
        }

        if(move !== -1) {
            data.splice(move, 1, {key: move + 1, title: groupName, items: groupItem});
            setMove(-1);
        }

        if(deleteTitle !== -1) {
            data.splice(deleteTitle, 1, {key: deleteTitle+1, title: groupName, items: groupItem});
            for(var index=0;index<itemList.length;index++) {
                if(itemTitle === itemList[index]) {
                    itemList.splice(index, 1);
                }
            }

            setItemTitle('');
            setDeleteTitle(-1);
        }

        if(newGroup !== '') {
            data.push({key: data.length+1, title: newGroup, items: []});
            groupList.push(newGroup)
            setNewGroup('');
        }

        if(titleAdd !== -1) {
            data.splice(titleAdd, 1, {key: titleAdd+1, title: groupName, items: groupItem});
            itemList.push(groupItem[0].title);

            setTitleAdd(-1);
            setGroupName('');
            setGroupItem([]);
        }

        if(groupChangeNum !== -1) {
            data.splice(groupChangeNum, 1, {key: groupChangeNum+1, title: groupChange, items: groupItem});
            groupList.splice(groupChangeNum, 1, groupChange);
            setGroupItem([]);
            setGroupChange('');
            setGroupChangeNum(-1);
        }

        if(groupDelete === -1) {
            setData([{key: 0, title: '미지정 그룹', items: []},]);
            setGroupList(['미지정 그룹']);
            setItemList([]);

            setGroupDelete(-2);
        } else if(groupDelete === -2){
            return ;
        } else {

            if(groupDelete === 0) {
                setItemInGroup([]);
                setGroupDelete(-2);
            } else {
                data.splice(groupDelete, 1);
                groupList.splice(groupDelete, 1);
               
                for(var index2=0;index2<itemInGroup.length;index2++) {
                    for(var index=0;index<itemList.length; index++) {
                        if(itemList[index] === itemInGroup[index2].title) {
                            itemList.splice(index, 1);
                        }
                    }
                }
                setItemInGroup([]);
                setGroupDelete(-2);
            }
            
        }

    }, [groupDelete, titleAdd, groupChangeNum, newGroup, deleteTitle, move, changeTitle, labelChange, preGroup]);

    const handleDeleteGroup = (num) => {
        setGroupDelete(num);
        setItemInGroup(data[num].items);
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
        for(var index=0;index<array.length;index++) {
            array.splice(index, 1, {key: index+2, title: array[index].title, color: array[index].color, start: array[index].start, end: array[index].end});
        }
        array.unshift({key: 0, title: thistitle, color: 'white', start: '', end: ''});

        setGroupItem(array);
        setTitleAdd(num);

        console.log(data);
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

    const handleSettingDelete = (num1, num2) => {
        setGroupName(data[num1].title);
        setItemTitle(data[num1].items[num2].title);
        var array = data[num1].items;
        array.splice(num2, 1);
        setGroupItem(array);
        setDeleteTitle(num1);
        setRightClick(false);
    }

    const handleDeleteTitle = () => {
        setGroupName(data[grpI].title);
        setItemTitle(data[grpI].items[itemI].title);
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

    const handleChangeTitle = (e, num1, num2) => {
        var changetitle = e.target.value;
        setPreItemTitle(data[num1].items[num2].title);
        setItemTitle(changetitle);
        setGroupName(data[num1].title);
        var array = data[num1].items;
        array.splice(num2, 1, {key: array[num2].key, title: changetitle, color: array[num2].color, start: array[num2].start, end: array[num2].end});
        setGroupItem(array);
        setChangeTitle(num1);
    }

    const handleLabelcolor = (label, num1, num2) => {
        var array = data[num1].items;
        array.splice(num2,1, {key: array[num2].key, title: array[num2].title, color: label, start: array[num2].start, end: array[num2].end});
        setGroupItem(array);
        setLabelChange(num1);
    }

    const handleTaskClick = (num1, num2, num3) => {
        var array = data[num3-1].items;
        for(var index=0;index<array.length;index++) {
            array.splice(index, 1, {key: index+2, title: array[index].title, color: array[index].color, start: array[index].start, end: array[index].end});
        }
        array.unshift({key:1, title: data[num1].items[num2].title, color: data[num1].items[num2].color, start: data[num1].items[num2].start, end: data[num1].items[num2].end});

        var array2 = data[num1].items;
        array2.splice(num2, 1);
        for(var index=0;index<array2.length;index++) {
            array2.splice(index, 1, {key: index+1, title: array2[index].title, color: array2[index].color, start: array2[index].start, end: array2[index].end});
        }

        setPreItem(array2);
        setNextItem(array);
        setPreGroup(num1);
        setNextGroup(num3-1);
    }

    const [dateChangeN, setDateChangeN] = useState(-1)

    const handleDateChange = (num, num2, start, end) => {
        var array = data[num].items;

        console.log(num2);

        var SYear = start.substring(0,4);
        var SMonth = start.substring(5,7);
        var SDay = start.substring(8,10);

        var EYear = end.substring(0,4);
        var EMonth = end.substring(5,7);
        var EDay = end.substring(8,10);

        array.splice(num2, 1, {key: array[num2].key, title: array[num2].title, color: array[num2].color, start: new Date(SYear, SMonth-1, SDay), end: new Date(EYear, EMonth-1, EDay)})
        setDateChangeN(num);
        setGroupItem(array)
    }

    useEffect(() => {
        if(dateChangeN !== -1) {
            data.splice(dateChangeN, {key: data[dateChangeN].key, title: data[dateChangeN].title, items: groupItem});
            setDateChangeN(-1)
            setGroupItem([])
        }
    }, [dateChangeN])

    let  backLeft = menubar? "250px" : "60px";
    let size = menubar ? "1270px" : "1470px";

    return(
        <div style={{left: backLeft, width: size}} className={cx('kanbanpage-back')}>
            <DragNDrop 
                data={data}
                groupList={groupList}
                itemList={itemList}
                handleDragStart={handleDragStart}
                handleDragEnter={handleDragEnter}
                dragging={dragging}
                getStyles={getStyles}
                handleDeleteGroup={handleDeleteGroup} 
                handleAddGroup={handleAddGroup}
                handleAddTitle={handleAddTitle}
                handleGroupChange={handleGroupChange}
                handleRightClick={handleRightClick}
                handleChangeTitle={handleChangeTitle}
                handleSettingDelete={handleSettingDelete}
                handleLabelcolor={handleLabelcolor}
                handleTaskClick={handleTaskClick}
                handleDateChange={handleDateChange}
            >
            </DragNDrop>
            {  rightClick === true &&
                <div>
                    <div className={cx('dnd-item-delete-hidden')} onClick={() => setRightClick(false)}></div>
                    <div style={{top: positionY, left: positionX}} className={cx('dnd-item-delete')}>
                        <li onClick={() => {handleUpMove()}}>맨 위로 이동</li>
                        <li onClick={() => handleDownMove()}>맨 아래로 이동</li>
                        <li onClick={(e) => {handleDeleteTitle()}}>삭제</li>
                    </div>
                </div>
            }
        </div>
    )
}

export default KanbanPage;