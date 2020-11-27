import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import Header from '../components/Header/Header';
import ServerBar from '../components/ServerBarPage/ServerBar/ServerBar';
import MenuBar from '../components/MenuBarPage/MenuBar/MenuBar';
import ProfilePage from '../components/Profile/Profile';
import MainCreate from '../components/ServerBarPage/CreateServer/MainCreate/MainCreate';
import ProjectExit from '../components/MenuBarPage/ProjectExit/ProjectExit';
import styles from './pageSame.scss';
import classNames from 'classnames/bind';

import useInterval from './useInterval';

const cx = classNames.bind(styles);
const axios = require('axios');

function Profile() {
  const title = ["프로필", 0];
  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
  const [accessToken, setAccessToken] = useState('');
  const [refreshToken, setRefreshToken] = useState('');
  const [menubar, setMenubar] = useState(false);
  const [create, setCreate] = useState(false);
  const [color, setColor] = useState('');
  const [team, setTeam] = useState('');
  const [lists, setLists] = useState([]);
  const [exit, setExit] = useState(false);
  const [exitTrue, setExitTrue] = useState(-1);
  const [mouseMove, setMouseMove] = useState(false);
  const [chatOnline, setChatOnline] = useState(false);
  const [positionY, setPositionY] = useState(0);
  const [addServerN, setAddServerN] = useState(false);
  const [teamMate, setTeamMate] = useState([]);
  const [leader, setLeader] = useState('');
  const [code, setCode] = useState('');

  let history = useHistory();
  let location = useLocation();

  useInterval(() => {
    axios.get(`http://3.35.229.52:5000/api/auth/refreshtoken`,
    {
      headers: {
        Authentication: refreshToken
      }
    })
    .then(res => {setAccessToken(res.data.accessToken)})
    .catch(err => {console.log(err);})
  }, 900000);

  useEffect(() => {
    if (typeof (location.state) !== 'undefined' && location.state !== null) {
      const { serverLists, email, nickname, accesstoken, refreshtoken, teamMate, leader, code } = location.state;

      setTeamMate(teamMate);
      setCode(code);
      setLeader(leader);
      setLists(serverLists);
      setEmail(email);
      setNickname(nickname);
      setAccessToken(accesstoken);
      setRefreshToken(refreshtoken);
      
    } else {
      history.push({
        pathname: '/'
      })
      setLists([]);
    }
  }, [])

  const onClickServer = (e) => {
    for (var i = 0; i < lists.length; i++) {
      lists.splice(i, 1, { id: lists[i].id, title: lists[i].title, color: lists[i].color, online: false });
      if(i === e.target.id-1) {
        lists.splice(i, 1, { id: lists[i].id, title: lists[i].title, color: lists[i].color, online: true });
      }
    }
    
    history.push({
      pathname: '/schedule',
      state: {
        serverLists: lists,
        nickname: nickname,
        email: email,
        accesstoken : accessToken,
        refreshtoken : refreshToken,
        teamMate: teamMate,
        leader: leader,
        code: code
      }
    });
    setMenubar(false);
  }

  const addServer = () => {
    if (color !== '' && team !== '') {
      setMenubar(false);
      for (var i = 0; i < lists.length; i++) {
        lists.splice(i, 1, {id: lists[i].id, title: lists[i].title, color: lists[i].color, online: false});
      }

      axios.post(`http://3.35.229.52:5000/api/project/createProject`,
      {
        name: team,
        color:color
      },
      {
        headers: {
          Authentication: `${accessToken}`
        }
      })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      })

      setLists([
        ...lists,
        {id: lists.length + 1, title: team, color: color, online: true}
      ])
      setTeam('');
      setColor('');
      setCreate(false);
      setAddServerN(true);
    } else {
      alert("색상 또는 팀 이름을 확인해주세요.")
    }
  }

  useEffect(() => {
    if(addServerN === true) {
      history.push({
        pathname: '/schedule',
        state: {
          serverLists: lists,
          nickname: nickname,
          email: email,
          accesstoken : accessToken,
          refreshtoken : refreshToken,
          teamMate: teamMate,
          leader: leader,
          code: code
        }
      })
    }
  }, [addServerN])

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

  const handleProjectExit = () => {
    for(var i=0;i<lists.length;i++) {
      if(lists[i].online === true) {
        setExitTrue(i);
      }
    }

    setExit(false);
  }

  useEffect(() => {
    if(exitTrue !== -1 && exitTrue !== -2) {
      lists.splice(exitTrue, 1);

      for(var i=0;i<lists.length;i++) {
        lists.splice(i,1,{id: i+1, title: lists[i].title, color: lists[i].color, online: false })
      }

      if(lists.length > 0) {
        if(exitTrue-1 === -1) {
          lists.splice(exitTrue, 1, {id: lists[exitTrue].id, title: lists[exitTrue].title, color: lists[exitTrue].color, online: true});
        } else {
          lists.splice(exitTrue-1, 1, {id: lists[exitTrue-1].id, title: lists[exitTrue-1].title, color: lists[exitTrue-1].color, online: true});
        }
      }

      if(lists.length === 0) {
        setLists([]);
      }
      
      setExitTrue(-2);
      setMenubar(false);
    } else if(exitTrue === -2) {
      history.push({
        pathname: '/schedule',
        state: {
          serverLists: lists,
          nickname: nickname,
          email: email,
          accesstoken : accessToken,
          refreshtoken : refreshToken,
          teamMate: teamMate,
          leader: leader,
          code: code
        }
      })
    } else  {
      return;
    }
  }, [exitTrue])

  return (
    <div onMouseMove={(e) => handleMousePosition(e)}>
      <div>
        <ProfilePage menubar={menubar} getNickname={nickname} email={email} lists={lists} accessToken={accessToken} refreshToken={refreshToken}></ProfilePage>
        <MenuBar code={code} leader={leader} teamMate={teamMate} code={code} leader={leader} teamMate={teamMate} title={title[0]} id={title[1]} menubar={menubar} onClick={() => setMenubar(!menubar)} handleExit={() => setExit(true)} serverlists={lists} nickname={nickname} email={email} accessToken={accessToken} refreshToken={refreshToken}></MenuBar>
        <Header code={code} leader={leader} teamMate={teamMate} code={code} leader={leader} teamMate={teamMate} title={title[0]} serverlists={lists} nickname={nickname} email={email}></Header>
        <ServerBar lists={lists} createServer={() => setCreate(true)} onClickServer={onClickServer}></ServerBar>
        { create === true &&
          <div>
            <div className={cx('backOpacity')} onClick={() => setCreate(false)}></div>
            <MainCreate color={color} colorChange={(color) => setColor(color.hex)} teamChange={(e) => setTeam(e.target.value)} addServer={addServer}></MainCreate>
          </div>
        }
        { exit === true &&
          <div>
            <div className={cx('backOpacity')} onClick={() => setExit(false)}></div>
            <ProjectExit handleProjectExit={handleProjectExit} handleExitCancel={() => setExit(false)}></ProjectExit>
          </div>
        }
        </div>
    </div>
  );
}

export default Profile;
