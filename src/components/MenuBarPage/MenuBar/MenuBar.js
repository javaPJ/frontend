import React, { useState, useEffect } from 'react';
import styles from './MenuBar.scss';
import classNames from 'classnames/bind';
import MenuList from './../MenuList/MenuList';
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";

const cx = classNames.bind(styles);

const MenuBar = ({ leader, title, id, menubar, onClick, handleExit, serverlists, nickname, email, accessToken, refreshToken, teamMate, code, teamId, readScheduleList }) => {
  const [bar, setBar] = useState(),
        [lists,setLists] = useState([]),
        [owner, setOwner] = useState(false),
        [now, setNow] = useState(-1);

  useEffect(() => {
    setBar(menubar);

    if(leader !== false) {
      setNow(id);

      if(leader === nickname) {
        setLists([
          { id: 1, title: "일정", now: false },
          { id: 2, title: "칸반 보드", now: false },
          { id: 3, title: "로드맵", now: false },
          { id: 4, title: "프로젝트 설정", now: false },
        ]);
        setOwner(true)
      } else {
        setLists([
          { id: 1, title: "일정", now: false },
          { id: 2, title: "칸반 보드", now: false },
          { id: 3, title: "로드맵", now: false },
        ]);
        setOwner(false)
      }
    }
  }, [menubar]);

  useEffect(() => {
    if(now !== -1) {
      if(now === 0) {
        setNow(-1);
        return;
      } else {
        lists.splice(now-1, 1, {id: now, title: lists[now-1].title, now: true});
      }
      setNow(-1);
    }
  },[now])

  let size = bar ? "230px" : "25px"

  return(
    <div style={{width:size}} className={cx('menubar-back')}>
      {bar === true ?
        <div className={cx('menubar-next')}>
          <div className={cx('menubar-left')} onClick={onClick}><AiFillCaretLeft size="27px" color="gray"/></div>
          <MenuList readScheduleList={readScheduleList} teamId={teamId} code={code} leader={leader} lists={lists} Serverlists={serverlists} nickname={nickname} email={email} accessToken={accessToken} refreshToken={refreshToken} teamMate={teamMate}/>
          { owner === false &&
            <div className={cx('menubar-exit')} onClick={() => handleExit()}>프로젝트 나가기</div>
          }
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
