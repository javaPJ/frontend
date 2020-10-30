import React, {useState, useEffect} from 'react';
import styles from './../KanbanPage.scss';
import SettingSchedule from '../../SettingSchedule/SettingSchedule';
import classNames from 'classnames/bind';
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";

const cx = classNames.bind(styles);

const DragNDrop = ({
        data, 
        handleDragStart, 
        handleDragEnter, 
        dragging, getStyles, 
        handleDeleteGroup, 
        handleAddGroup, 
        handleAddTitle, 
        handleGroupChange, 
        handleRightClick, 
        handleChangeTitle
    }) => {
    const [list, setList] = useState([]),
          [addItemGroup, setAddItemGroup] = useState(-1),
          [deleteClick, setDeleteClick] = useState(false),
          [titleChange, setTitleChange] = useState(-1),
          [newTitleCreate, setNewTitleCreate] = useState(false),
          [viewSchedule, setViewSchedule] = useState([false, -1, -1]),
          [scheduleTitle, setScheduleTitle] = useState(''),
          [height, setHeight] = useState('20px'),
          labels = ['#FF8080', '#FFD080', '#FFFB80', '#A2FF80', '#80FFE1', '#8880FF', '#EE80FF', '#7D7D7D'],
          [thisLabel, setThisLabel] = useState(''),
          [labelArray, setLabelArray] = useState([]);


    useEffect(() => {
        setList(data);
 

    }, [data, deleteClick]);

    const handleAddItem = (num) => {
        setAddItemGroup(num);
    }

    const ySize = () => {
        var sTextarea = document.getElementById("text_content");
        sTextarea.style.height = "1px";
        sTextarea.style.height = sTextarea.scrollHeight + "px";
        setHeight(sTextarea.style.height);
    }

    const handleLabelcolor = (label, num1, num2) => {
        if(label === thisLabel) {
            setThisLabel('');
            for(var index = 0; index < labelArray.length; index++) {
                if(labelArray[index].first === num1 && labelArray[index].second === num2) {
                    labelArray.splice(index, 1);
                }
            }
        } else {
            setThisLabel(label);
            labelArray.push({first: num1, second: num2, color: label});

            for(var index = 0; index < labelArray.length; index++) {
                if(labelArray[index].first === num1 && labelArray[index].second === num2 && labelArray[index].color !== label) {
                    labelArray.splice(index, 1);
                } 
            }
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
                                <input onKeyDown={(e) =>{if(e.keyCode === 13){setTitleChange(-1);handleGroupChange(e, grpI);}}} className={cx('title-input')}/>
                                :
                                <div className={cx('title')} onClick={(e) => {e.preventDefault();setTitleChange(grpI);}}>{grp.title}</div>
                            }
                            <div className={cx('plus')} onClick={(e) => {handleAddItem(grpI)}}><AiOutlinePlus></AiOutlinePlus></div>
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
                                        onKeyDown={() => ySize()} 
                                        onKeyUp={() => ySize()} 
                                        placeholder="제목을 입력해주세요"
                                    />
                                    <div className={cx('addItem-button')}>
                                        <button className={cx('addItem-add')} onClick={() => {handleAddTitle(grpI);setAddItemGroup(-1);}}>만들기</button>
                                        <button className={cx('addItem-cancel')} onClick={() => {setAddItemGroup(-1); setHeight('20px;')}}>취소</button>
                                    </div>
                                </div>
                            }
                            {grp.items.map((item, itemI) => (
                                <div style={{height: "80px"}}>
                                    <div 
                                        draggable 
                                        onDragStart={(e) => {handleDragStart(e, {grpI, itemI})}} 
                                        onDragEnter={dragging ?(e) => {handleDragEnter(e, {grpI, itemI})} : null}
                                        key={item} 
                                        className={cx('dnd-item')}
                                        style={getStyles({grpI, itemI})}
                                        onClick={() => {setViewSchedule([true, grpI, itemI]);setScheduleTitle(item)}}
                                        onContextMenu={(e) => handleRightClick(e, grpI, itemI)}
                                    >
                                        { labelArray.map((labelColor) => (
                                            (labelColor.first === grpI && labelColor.second === itemI) &&
                                            <div style={{color: labelColor.color, backgroundColor: labelColor.color}} className={cx('label-color')}>.</div>
                                         ))}
                                        <div className={cx('dnd-item-text')}>{item}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
                <div className={cx('new-group')}>
                    { newTitleCreate === false ?
                        <div className={cx('new-title')} onClick={() => setNewTitleCreate(true)}>새 리스트</div>
                        :
                        <input 
                            className={cx('new-title-input')} 
                            onKeyDown={(e) => {if(e.keyCode === 13){setNewTitleCreate(false);handleAddGroup(e.target.value);}}}
                            placeholder="그룹 이름을 지정해주세요"
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
                        settingCancel={() => {setViewSchedule([]);setThisLabel('')}}
                        labels={labels}
                        thisLabel={thisLabel}
                        handleLabelcolor={handleLabelcolor}
                    ></SettingSchedule>
                </div>
            }
        </>
    )
}

export default DragNDrop;