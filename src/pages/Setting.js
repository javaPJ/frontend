import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import Header from '../components/Header/Header';
import ServerBar from '../components/ServerBarPage/ServerBar/ServerBar';
import MenuBar from '../components/MenuBarPage/MenuBar/MenuBar';
import SetProject from '../components/SetProject/SetProject/SetProject';
import MainCreate from '../components/ServerBarPage/CreateServer/MainCreate/MainCreate';
import styles from './pageSame.scss';
import classNames from 'classnames/bind';
import Chatting from './../components/ChattingModal/Chatting';
import NotFound from './../components/ServerBarPage/NotFound/NotFound';

import useInterval from './useInterval';

const cx = classNames.bind(styles);
const axios = require('axios');

function Setting() {
  const title = ["프로젝트 설정", 4];
  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
  const [accessToken, setAccessToken] = useState('');
  const [refreshToken, setRefreshToken] = useState('');
  const [menubar, setMenubar] = useState(false);
  const [create, setCreate] = useState(false);
  const [color, setColor] = useState('');
  const [team, setTeam] = useState('');
  const [lists, setLists] = useState([]);
  const [mouseMove, setMouseMove] = useState(false);
  const [chatOnline, setChatOnline] = useState(false);
  const [positionY, setPositionY] = useState(0);
  const [serverNot, setServerNot] = useState(false);
  const [addServerN, setAddServerN] = useState(false);

  const [settingId, setSettingId] = useState(-1),
        [settingTitle, setSettingTitle] = useState(''),
        [settingColor, setSettingColor] = useState(''),
        [settingDelete, setSettingDelete] = useState(-1);

  let history = useHistory();
  let location = useLocation();

  useInterval(() => {
    axios.get(`http://3.35.169.186:5000/api/auth/refreshtoken`,
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
      const { serverLists, email, nickname, accesstoken, refreshtoken } = location.state;
      
      var array = []

      for(var i=0;i<serverLists.length;i++) {
        axios.post(`http://3.35.169.186:5000/api/project/readproject`, 
        {
          team: serverLists[i]
        },
        { headers: {
          Authentication: accesstoken
        }})
        .then(res => {
          console.log(res);
          if(i===0) {
            array.push({id: i+1, title: serverLists[i], color: res.data.color, online: true})
          } else {
            array.push({id: i+1, title: serverLists[i], color: res.data.color, online: false})
          }
        })
        .error(err => {
          console.log(err);
        })
      }
      
      setLists(serverLists);

      setEmail(email);
      setNickname(nickname);
      setAccessToken(accesstoken);
      setRefreshToken(refreshtoken);
      if(serverLists.length > 0) {
        setServerNot(false)
      }
    } else {
      history.push({
        pathname: '/'
      })
      setLists([]);
    }
  }, [])

  useEffect(() => {
    if(lists.length === 0) {
      setServerNot(true)
    } else {
      setServerNot(false)
    }
  }, [lists]);

  const onClickServer = (e) => {
    for (var i = 0; i < lists.length; i++) {
      lists.splice(i, 1, {id: lists[i].id, title: lists[i].title, color: lists[i].color, online: false});
    }
    lists.splice(e.target.innerText-1, 1, {id: e.target.innerText, title: e.target.title, color: e.target.style.backgroundColor, online: true});
    history.push({
      pathname: '/schedule',
      state: {
        serverLists: lists,
        nickname: nickname,
        email: email,
        accesstoken : accessToken,
        refreshtoken : refreshToken
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

      axios.post(`http://3.35.169.186:5000/api/project/createProject`,
      {
        name: team,
        color:color
      },
      {
        header: {
          Authentication: accessToken
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
      setServerNot(false);
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
          refreshtoken : refreshToken
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

  const handleSettingColor = (color) => {
    setSettingColor(color.hex);
    for(var i=0;i<lists.length;i++)
      if(lists[i].online === true)
        setSettingId(lists[i].id);
  }

  const handleChangeTitle = (title) => {
    setSettingTitle(title);
    for(var i=0;i<lists.length;i++)
      if(lists[i].online === true)
        setSettingId(lists[i].id);
  }

  useEffect(() => {
    if(settingId !== -1) {
      lists.splice(settingId-1, 1, {id: settingId, title: settingTitle, color: settingColor, online: true});
      setSettingId(-1);
    }
  }, [settingId])

  const handleRemoveProject = () => {
    for(var i=0;i<lists.length;i++)
      if(lists[i].online === true)
        setSettingDelete(i);
  }

  useEffect(() => {
    if(settingDelete !== -1 && settingDelete !== -2) {
      lists.splice(settingDelete, 1);

      for(var i=0;i<lists.length;i++) {
        lists.splice(i,1,{id: i+1, title: lists[i].title, color: lists[i].color, online: false })
      }

      if(lists.length > 0) {
        if(settingDelete-1 === -1) {
          lists.splice(settingDelete, 1, {id: lists[settingDelete].id, title: lists[settingDelete].title, color: lists[settingDelete].color, online: true});
        } else {
          lists.splice(settingDelete-1, 1, {id: lists[settingDelete-1].id, title: lists[settingDelete-1].title, color: lists[settingDelete-1].color, online: true});
        }
      }

      if(lists.length === 0) {
        setLists([]);
      }
      
      setSettingDelete(-2);
    } else if(settingDelete === -2) {
      history.push({
        pathname: '/schedule',
        state: {
          serverLists: lists,
          nickname: nickname,
          email: email,
          accesstoken : accessToken,
          refreshtoken : refreshToken
        }
      })
    } else  {
      return;
    }
  }, [settingDelete])

  return (
    <div onMouseMove={(e) => handleMousePosition(e)}>
      { serverNot === true ?
        <div>
          <NotFound></NotFound>
          <MenuBar title={title[0]} id={title[1]} menubar={menubar} onClick={() => setMenubar(!menubar)} serverlists={lists} nickname={nickname} email={email} accessToken={accessToken} refreshToken={refreshToken}></MenuBar>
          <Header title={title[0]} nickname={nickname} email={email} accessToken={accessToken} refreshToken={refreshToken}></Header>
          <ServerBar lists={lists} createServer={() => setCreate(true)} onClickServer={onClickServer}></ServerBar>
          { create === true &&
            <div>
              <div className={cx('backOpacity')} onClick={() => setCreate(false)}></div>
              <MainCreate color={color} colorChange={(color) => setColor(color.hex)} teamChange={(e) => setTeam(e.target.value)} addServer={addServer}></MainCreate>
            </div>
          }
        </div>
        :
        <div>
          <SetProject 
            menubar={menubar} 
            pickerColor={settingColor} 
            handleOnChangeComplete={(color) => handleSettingColor(color)} 
            title={settingTitle} 
            handleChangeTitle={handleChangeTitle} 
            handleRemoveProject={handleRemoveProject}
          />
          <MenuBar title={title[0]} id={title[1]} menubar={menubar} onClick={() => setMenubar(!menubar)} serverlists={lists} nickname={nickname} email={email} accessToken={accessToken} refreshToken={refreshToken}></MenuBar>
          <Header title={title[0]} serverlists={lists} nickname={nickname} email={email} accessToken={accessToken} refreshToken={refreshToken}></Header>
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
        </div>
      }
    </div>
  );
}

export default Setting;
