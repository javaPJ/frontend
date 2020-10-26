import React, { useState } from 'react';
import Header from '../components/Header/Header';
import ServerBar from '../components/ServerBarPage/ServerBar/ServerBar';
import MenuBar from '../components/MenuBarPage/MenuBar/MenuBar';
import MainCreate from '../components/ServerBarPage/CreateServer/MainCreate/MainCreate';
import styles from './pageSame.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function Schedule() {
  const title = ["일정", 1]
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

  return (
    <div>
      <MenuBar title={title[0]} id={title[1]} menubar={menubar} onClick={() => setMenubar(!menubar)}></MenuBar>
      <Header title={title[0]}></Header>
      <ServerBar lists={lists} createServer={() => setCreate(true)} onClickServer={onClickServer}></ServerBar>
      { create === true &&
        <div>
          <div className={cx('backOpacity')} onClick={() => setCreate(false)}></div>
          <MainCreate color={color} colorChange={(color) => setColor(color.hex)} teamChange={(e) => setTeam(e.target.value)} addServer={addServer}></MainCreate>
        </div>
      }
    </div>
  );
}

export default Schedule;
