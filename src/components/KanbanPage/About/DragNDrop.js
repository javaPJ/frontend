import React, {useState, useEffect} from 'react';
import styles from './../KanbanPage.scss';
import SettingSchedule from '../../SettingSchedule/SettingSchedule';
import classNames from 'classnames/bind';
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";

const cx = classNames.bind(styles);

const DragNDrop = ({
        data, 
        groupList,
        itemList,
        handleDragStart, 
        handleDragEnter, 
        dragging, getStyles, 
        handleDeleteGroup, 
        handleAddGroup, 
        handleSettingDelete,
        handleAddTitle, 
        handleGroupChange, 
        handleRightClick, 
        handleChangeTitle,
        handleLabelcolor,
        handleTaskClick
    }) => {

    const [list, setList] = useState([]),
          [addItemGroup, setAddItemGroup] = useState(-1),
          [deleteClick, setDeleteClick] = useState(false),
          [titleChange, setTitleChange] = useState(-1),
          [newTitleCreate, setNewTitleCreate] = useState(false),
          [viewSchedule, setViewSchedule] = useState([false, -1, -1]),
          [scheduleTitle, setScheduleTitle] = useState(''),
          [height, setHeight] = useState('20px'),
          labels = ['#FF8080', '#FFD080', '#FFFB80', '#A2FF80', '#80FFE1', '#8880FF', '#EE80FF', '#7D7D7D'];

    useEffect(() => {
        setList(data);

    }, [data]);

    const handleAddItem = (num) => {
        setAddItemGroup(num);
    }

    const ySize = (e, grpI) => {
        var sTextarea = document.getElementById("text_content");
        sTextarea.style.height = "1px";
        sTextarea.style.height = sTextarea.scrollHeight + "px";
        setHeight(sTextarea.style.height);

        if(e.keyCode === 13) {
            onItemTitle(grpI);
        }
        if(e.keyCode === 27) {
            setAddItemGroup(-1);
            setHeight('20px;');
        }
    }

    const onGroupTitle = (e) => {
        if(e.keyCode === 13) {
            if(e.target.value === '') {
                alert("다시 한 번 확인해주세요.");
                setNewTitleCreate(false);
            } else {
                var check = false;
            
                for(var index=0;index<groupList.length;index++) {
                    if(groupList[index] === e.target.value) {
                        check = true;
                    }
                }

                if(check === true) {
                    alert("입력하신 그룹명은 이미 있습니다.");
                    setNewTitleCreate(false);
                } else {
                    setNewTitleCreate(false);
                    handleAddGroup(e.target.value);
                }
            }
        }

        if(e.keyCode === 27) {
            setNewTitleCreate(false);
        }
    }

    const onGroupChange = (e, num) => {
        if(e.keyCode === 13) {
            if(e.target.value === '') {
                alert("다시 한 번 확인해주세요.");
                setTitleChange(-1);
            } else {
                var check = false;
            
                for(var index=0;index<groupList.length;index++) {
                    if(groupList[index] === e.target.value) {
                        check = true;
                    }
                }
                if(check === true) {
                    alert("입력하신 그룹명은 이미 있습니다.");
                    setTitleChange(-1);
                } else {
                    setTitleChange(-1);
                    handleGroupChange(e, num);
                }
            }
        }

        if(e.keyCode === 27) {
            setTitleChange(-1);
        }
    }

    const onItemTitle = (num) => {
        var title = document.getElementById('text_content').value;
        
        if(title === ''){
            alert("다시 한 번 확인해주세요.");
            setAddItemGroup(-1);
        } else {
            var check = false;

            for(var index=0;index<itemList.length;index++) {
                if(itemList[index] === title) {
                    check = true;
                }
            }
            if(check === true) {
                alert("입력하신 작업명은 이미 있습니다.");
                setAddItemGroup(-1);
            } else {
                handleAddTitle(num);
                setAddItemGroup(-1);
            }
        }

        setHeight('20px');
    }

    const itemClick = (num1, num2, num3, color) => {
        setTitleChange(-1);
        setAddItemGroup(-1); 
        setNewTitleCreate(false);

        if(viewSchedule[0] === false) {
            setViewSchedule([true, num1, num2, color]);
            setScheduleTitle(num3)
        }
    }

    return (
        <>
            <div className={cx('drag-n-group')}>
                {list.map((grp, grpI) => (
                    <div 
                        key={grp.title} 
                        className={cx('dnd-group')}
                        onDragEnter={dragging && !grp.items.length ?(e) => handleDragEnter(e, {grpI, itemI: 0}) : null}
                    >
                        <div className={cx('group-title')}>
                            { titleChange === grpI ?
                                <input onKeyDown={(e) => {onGroupChange(e, grpI);}} className={cx('title-input')} placeholder="그룹명을 입력해주세요." autoFocus/>
                                :
                                <div className={cx('title')} onClick={(e) => {e.preventDefault();setViewSchedule([false]);setTitleChange(grpI);}}>{grp.title}</div>
                            }
                            <div className={cx('plus')} onClick={(e) => {handleAddItem(grpI);setViewSchedule([false])}}><AiOutlinePlus></AiOutlinePlus></div>
                            <div 
                                className={cx('minus')} 
                                onClick={(e) => {handleDeleteGroup(grpI); setDeleteClick(true); setAddItemGroup(-1);}}
                            >
                                <AiOutlineMinus></AiOutlineMinus>
                            </div>
                        </div>
                        <div className={cx('item-group')}>
                            { grpI === addItemGroup &&
                                <div className={cx('addItem-back')}>
                                    <textarea 
                                        className={cx('addItem-textarea')} 
                                        id="text_content" 
                                        style={{height: height}} 
                                        onKeyDown={(e) => ySize(e, grpI)} 
                                        onKeyUp={(e) => ySize(e, grpI)} 
                                        placeholder="제목을 입력해주세요"
                                        autoFocus
                                    />
                                    <div className={cx('addItem-button')}>
                                        <button className={cx('addItem-add')} onClick={() => onItemTitle(grpI)}>만들기</button>
                                        <button className={cx('addItem-cancel')} onClick={() => {setAddItemGroup(-1);setHeight('20px;');}}>취소</button>
                                    </div>
                                </div>
                            }
                            {grp.items.map((item, itemI) => (
                                <div style={{height: "80px"}}>
                                    <div 
                                        draggable 
                                        onDragStart={(e) => {setViewSchedule([false]);handleDragStart(e, {grpI, itemI})}} 
                                        onDragEnter={dragging ?(e) => {setViewSchedule([false]);handleDragEnter(e, {grpI, itemI})} : null}
                                        key={item} 
                                        className={cx('dnd-item')}
                                        style={getStyles({grpI, itemI})}
                                        onClick={() => itemClick(grpI, itemI, item.title, item.color)}
                                        onContextMenu={(e) => {handleRightClick(e, grpI, itemI);setViewSchedule([false]);setTitleChange(-1);setNewTitleCreate(false);}}
                                    >
                                        {/* { labelArray.map((labelColor) => (
                                            (labelColor.first === grpI && labelColor.second === itemI) &&
                                            <div style={{color: labelColor.color, backgroundColor: labelColor.color}} className={cx('label-color')}>.</div>
                                         ))} */}
                                        <div style={{color: item.color, backgroundColor: item.color}} className={cx('label-color')}>.</div>

                                        <div className={cx('dnd-item-text')}>{item.title}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
                <div className={cx('new-group')}>
                    { newTitleCreate === false ?
                        <div className={cx('new-title')} onClick={() => {setNewTitleCreate(true);setViewSchedule([false])}}>새 리스트</div>
                        :
                        <input 
                            className={cx('new-title-input')} 
                            onKeyDown={(e) => onGroupTitle(e)}
                            placeholder="그룹 이름을 지정해주세요"
                            autoFocus
                        />
                    }
                    <div className={cx('newItem-group')}></div>
                </div>
            </div>
            { viewSchedule[0] === true &&
                <div style={{position: "absolute", top: '-80px', right: "-5px"}}>
                    <SettingSchedule 
                        textTitle={scheduleTitle} 
                        handleChangeTitle={handleChangeTitle} 
                        groupN={viewSchedule[1]} 
                        itemN={viewSchedule[2]} 
                        thisLabel={viewSchedule[3]}
                        handleSettingDelete={handleSettingDelete}
                        noneVisibleSchedule={() => setViewSchedule([false])}
                        settingCancel={() => setViewSchedule([false])}
                        labels={labels}
                        handleLabelcolor={handleLabelcolor}
                        grpList={groupList}
                        handleTaskClick={handleTaskClick}
                    ></SettingSchedule>
                </div>
            }
        </>
    )
}

export default DragNDrop;