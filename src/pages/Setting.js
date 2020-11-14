import React, { useEffect, useState } from 'react';
import Header from '../components/Header/Header';
import ServerBar from '../components/ServerBarPage/ServerBar/ServerBar';
import MenuBar from '../components/MenuBarPage/MenuBar/MenuBar';
import MainCreate from '../components/ServerBarPage/CreateServer/MainCreate/MainCreate';
import styles from './pageSame.scss';
import classNames from 'classnames/bind';
import ProjectExit from '../components/MenuBarPage/ProjectExit/ProjectExit';
import Chatting from './../components/ChattingModal/Chatting';

const cx = classNames.bind(styles);

function Setting() {
  const title = ["프로젝트 설정", 4]
  const [menubar, setMenubar] = useState(false);
  const [create, setCreate] = useState(false);
  const [color, setColor] = useState('');
  const [team, setTeam] = useState('');
  const [lists, setLists] = useState(
    [
      { id: 1, title: "test1", color: "#8D99AE", online: true},
      { id: 2, title: "test2", color: "#FF9696", online: false},
    ]
  );
  const [exit, setExit] = useState(false);
  const [exitTrue, setExitTrue] = useState(-1);
  const [mouseMove, setMouseMove] = useState(false);
  const [chatOnline, setChatOnline] = useState(false);
  const [positionY, setPositionY] = useState(0);

  const onClickServer = (e) => {
    for (var i = 0; i < lists.length; i++) {
      lists.splice(i, 1, {id: lists[i].id, title: lists[i].title, color: lists[i].color, online: false});
    }
    lists.splice(e.target.innerText-1, 1, {id: e.target.innerText, title: e.target.title, color: e.target.style.backgroundColor, online: true});
  }

  const addServer = () => {
    if (color !== '' && team !== '') {
      for (var i = 0; i < lists.length; i++) {
        lists.splice(i, 1, {id: lists[i].id, title: lists[i].title, color: lists[i].color, online: false});
      }

      setLists([
        ...lists,
        {id: lists.length + 1, title: team, color: color, online: true}
      ])
      setTeam('');
      setColor('');
      setCreate(false);
    } else {
      alert("색상 또는 팀 이름을 확인해주세요.")
    }
  }

  const handleProjectExit = () => {
    for(var i=0;i<lists.length;i++) {
      if(lists[i].online === true) {
        setExitTrue(i);
      }
    }

    setExit(false);
  }

  useEffect(() => {
    if(exitTrue !== -1) {
      lists.splice(exitTrue, 1);

      for(var i=0;i<lists.length;i++) {
        lists.splice(i,1,{id: i+1, title: lists[i].title, color: lists[i].color, online: false })
      }
      
      lists.splice(0, 1, {id: lists[0].id, title: lists[0].title, color: lists[0].color, online: true});

      setExitTrue(-1);
    }
  }, [exitTrue])

  const handleMousePosition = (e) => {
    e.preventDefault();

    if(chatOnline === false) {
      if(e.clientX > 1514) {
        setMouseMove(true);
        setPositionY(e.clientY)
      }else {
        setMouseMove(false);
      }
    }
  }

  return (
    <div onMouseMove={(e) => handleMousePosition(e)}>
      <MenuBar title={title[0]} id={title[1]} menubar={menubar} onClick={() => setMenubar(!menubar)} handleExit={() => setExit(true)}></MenuBar>
      <Header title={title[0]}></Header>
      <ServerBar lists={lists} createServer={() => setCreate(true)} onClickServer={onClickServer}></ServerBar>
      <Chatting 
        positionY={positionY}
        mouseMove={mouseMove} 
        handleChattingOn={() => setChatOnline(true)} 
        handleChattingOff={() => {setChatOnline(false);setMouseMove(false);}}
      />
      { create === true &&
        <div>
          <div className={cx('backOpacity')} onClick={() => setCreate(false)}></div>
          <MainCreate color={color} colorChange={(color) => setColor(color.hex)} teamChange={(e) => setTeam(e.target.value)} addServer={addServer}></MainCreate>
        </div>
      }
      { exit === true &&
        <div>
          <div className={cx('backOpacity')}></div>
          <ProjectExit handleProjectExit={handleProjectExit}></ProjectExit>
        </div>
      }
    </div>
  );
}

export default Setting;
