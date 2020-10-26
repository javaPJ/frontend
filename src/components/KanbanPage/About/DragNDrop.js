import React, {useState, useEffect, useRef} from 'react';
import styles from './../KanbanPage.scss';
import classNames from 'classnames/bind';
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";

const cx = classNames.bind(styles);

const DragNDrop = ({data, handleDeleteGroup, handleAddGroup}) => {
    const [list, setList] = useState([]);
    const [dragging, setDragging] = useState(false);
    const [addItemGroup, setAddItemGroup] = useState(-1);
    const [deleteClick, setDeleteClick] = useState(false);

    const [height, setHeight] = useState('20px');

    const dragItem = useRef();
    const dragNode = useRef();

    useEffect(() => {
        setList(data);
    }, [data, deleteClick]);

    const handleDragStart = (e, params) => {
        console.log('drag starting...', params);
        dragItem.current = params;
        dragNode.current = e.target;
        dragNode.current.addEventListener('dragend', handleDragEnd);
        setTimeout(() => {
            setDragging(true);
        }, 0);
    }

    const handleDragEnter = (e, params) => {
        console.log('Entering drag...', params);
        const currentItem =dragItem.current;
        if(e.target !== dragNode.current) {
            console.log('Target is not the same');
            setList(oldList => {
                let newList = JSON.parse(JSON.stringify(oldList));
                newList[params.grpI].items.splice(params.itemI, 0, newList[currentItem.grpI].items.splice(currentItem.itemI,1)[0]);
                dragItem.current = params;
                return newList
            })
        }
    }

    const handleDragEnd = () => {
        console.log('Ending drag...');
        setDragging(false);
        dragNode.current.removeEventListener('dragend', handleDragEnd);
        dragItem.current = null;
        dragNode.current = null;
    }

    const handleAddItem = (num) => {
        console.log(num);
        setAddItemGroup(num);
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

    const ySize = () => {
        var sTextarea = document.getElementById("text_content");
        sTextarea.style.height = "1px";
        sTextarea.style.height = sTextarea.scrollHeight + "px";
        setHeight(sTextarea.style.height);
    }

    return (
        <div className={cx('drag-n-group')}>
            {list.map((grp, grpI) => (
                <div 
                    key={grp.title} 
                    className={cx('dnd-group')}
                    onDragEnter={dragging && !grp.items.length ?(e) => handleDragEnter(e, {grpI, itemI: 0}) : null}
                >
                    <div className={cx('group-title')}>
                        <div className={cx('title')}>{grp.title}</div>
                        <div className={cx('plus')} onClick={(e) => handleAddItem(grpI)}><AiOutlinePlus></AiOutlinePlus></div>
                        <div className={cx('minus')} onClick={(e) => {handleDeleteGroup(grpI); setDeleteClick(true); setAddItemGroup(-1);}}><AiOutlineMinus></AiOutlineMinus></div>
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
                                    <button className={cx('addItem-add')}>만들기</button>
                                    <button className={cx('addItem-cancel')} onClick={() => {setAddItemGroup(-1); setHeight('20px;')}}>취소</button>
                                </div>
                            </div>
                        }
                        {grp.items.map((item, itemI) => (
                            <div 
                                draggable 
                                onDragStart={(e) => {handleDragStart(e, {grpI, itemI})}} 
                                onDragEnter={dragging ?(e) => {handleDragEnter(e, {grpI, itemI})} : null}
                                key={item} 
                                className={cx('dnd-item')}
                                style={getStyles({grpI, itemI})}
                            >
                                {item}
                            </div>
                        ))}
                    </div>
                </div>
            ))}
            <div className={cx('new-group')}>
                <div className={cx('new-title')} onClick={() => handleAddGroup()}>새 리스트</div>
                <div className={cx('newItem-group')}>
                </div>
            </div>
        </div>
    )
}

export default DragNDrop;