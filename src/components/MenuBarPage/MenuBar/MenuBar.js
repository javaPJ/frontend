import React, { useState, useEffect } from 'react';
import styles from './MenuBar.scss';
import classNames from 'classnames/bind';
import MenuList from './../MenuList/MenuList';
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";

const cx = classNames.bind(styles);

const MenuBar = ({ title, id, menubar, onClick }) => {
  const [bar, setBar] = useState();
  const [lists,setLists] = useState([
      { id: 1, title: "일정", now: false },
      { id: 2, title: "칸반 보드", now: false },
      { id: 3, title: "로드맵", now: false },
      { id: 4, title: "프로젝트 설정", now: false },
    ]);

  useEffect(() => {
    setBar(menubar)
    if (id === 0) {
      return;
    } else {
      lists.splice(id-1, 1, {id: id, title: title, now: true});
    }
  });


  let size = bar ? "230px" : "25px"

  return(
    <div style={{width:size}} className={cx('menubar-back')}>
      {bar === true ?
        <div className={cx('menubar-next')}>
          <div className={cx('menubar-left')} onClick={onClick}><AiFillCaretLeft size="27px" color="gray"/></div>
          <MenuList lists={lists}/>
          <div className={cx('menubar-exit')}>프로젝트 나가기</div>
        </div>
        :
        <div className={cx('menubar-pre')}>
          <div className={cx('menubar-right')} onClick={onClick}><AiFillCaretRight size="27px" color="gray"/></div>
        </div>
      }
    </div>
  )
}

export default MenuBar;
