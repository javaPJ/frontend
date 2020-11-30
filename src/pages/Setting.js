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
  const [teamId, setTeamId] = useState('');
  const [lists, setLists] = useState([]);
  const [mouseMove, setMouseMove] = useState(false);
  const [chatOnline, setChatOnline] = useState(false);
  const [positionY, setPositionY] = useState(0);
  const [serverNot, setServerNot] = useState(false);
  const [addServerN, setAddServerN] = useState(false);
  const [leader, setLeader] = useState('');
  const [code, setCode] = useState('');

  const [settingId, setSettingId] = useState(-1),
    [settingTitle, setSettingTitle] = useState(''),
    [settingColor, setSettingColor] = useState(''),
    [settingDelete, setSettingDelete] = useState(-1);

  const [teamMate, setTeamMate] = useState([]);

  let history = useHistory();
  let location = useLocation();

  useInterval(() => {
    axios.get(`http://3.35.229.52:5000/api/auth/refreshtoken`,
      {
        headers: {
          Authentication: refreshToken
        }
      })
      .then(res => { setAccessToken(res.data.accessToken) })
      .catch(err => { console.log(err); })
  }, 900000);

  useEffect(() => {
    if (typeof (location.state) !== 'undefined' && location.state !== null) {
      const { serverLists, email, nickname, accesstoken, refreshtoken, teamMate, leader, code, teamId } = location.state;
      for (var index = 0; index < serverLists.length; index++) {
        if (serverLists[index].online === true) {
          setSettingTitle(serverLists[index].title);
          setSettingColor(serverLists[index].color);
        }
      }

      console.log("setting start");
      console.log(leader);
      console.log(nickname);
      console.log(teamMate);
      console.log("setting end");
    

      setTeamId(teamId);
      setCode(code);
      setLeader(leader)
      setLists(serverLists);
      setTeamMate(teamMate);
      setEmail(email);
      setNickname(nickname);
      setAccessToken(accesstoken);
      setRefreshToken(refreshtoken);
      if (serverLists.length > 0) {
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
    if (lists.length === 0) {
      setServerNot(true)
    } else {
      setServerNot(false)
    }
  }, [lists]);

  const onClickServer = (e) => {
    for (var i = 0; i < lists.length; i++) {
      lists.splice(i, 1, { id: lists[i].id, title: lists[i].title, color: lists[i].color, online: false });
      if(i === e.target.id-1) {
        lists.splice(i, 1, { id: lists[i].id, title: lists[i].title, color: lists[i].color, online: true });
      }
    }

    console.log(e.target.title);

    axios.post(`http://3.35.229.52:5000/api/project/readproject`,
    {
      team: e.target.title
    },
    {
      headers: {
        Authentication: `${accessToken}`
      }
    })
    .then(res => {
      setMenubar(false);

      history.push({
        pathname: '/schedule',
        state: {
          serverLists: lists,
          nickname: nickname,
          email: email,
          accesstoken: accessToken,
          refreshtoken: refreshToken,
          teamMate: res.data[1],
          leader: res.data[0].name,
          code: res.data[0].code,
          teamId: res.data[0].num
        }
      });
    })
    .catch(err => {
      console.log(err);
    })
  }

  const addServer = () => {
    if (color !== '' && team !== '') {
      setMenubar(false);
      for (var i = 0; i < lists.length; i++) {
        lists.splice(i, 1, { id: lists[i].id, title: lists[i].title, color: lists[i].color, online: false });
      }

      axios.post(`http://3.35.229.52:5000/api/project/createProject`,
        {
          name: team,
          color: color
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
        { id: lists.length + 1, title: team, color: color, online: true }
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
    if (addServerN === true) {
      history.push({
        pathname: '/schedule',
        state: {
          serverLists: lists,
          nickname: nickname,
          email: email,
          accesstoken: accessToken,
          refreshtoken: refreshToken,
          teamMate: teamMate,
          leader: leader,
          code: code,
        }
      })
    }
  }, [addServerN])

  const handleMousePosition = (e) => {
    e.preventDefault();

    if (chatOnline === false) {
      if (e.clientX > 1514) {
        setMouseMove(true);
        setPositionY(e.clientY)
      } else {
        setMouseMove(false);
      }
    }
  }

  const handleSettingColor = (color) => {
    setSettingColor(color.hex);
    for (var i = 0; i < lists.length; i++)
      if (lists[i].online === true)
        setSettingId(lists[i].id);
  }

  const handleChangeTitle = (title) => {
    setSettingTitle(title);
    for (var i = 0; i < lists.length; i++)
      if (lists[i].online === true)
        setSettingId(lists[i].id);
  }

  useEffect(() => {
    if (settingId !== -1) {
      lists.splice(settingId - 1, 1, { id: settingId, title: settingTitle, color: settingColor, online: true });
      setSettingId(-1);

      axios.post(`http://3.35.229.52:5000/api/project/settingproject`,
      {
        team: teamId,
        team_name: settingTitle,
        color: settingColor
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
    }
  }, [settingId])

  const handleRemoveProject = () => {
    for (var i = 0; i < lists.length; i++)
      if (lists[i].online === true)
        setSettingDelete(i);
  }

  useEffect(() => {
    if (settingDelete !== -1 && settingDelete !== -2) {
      lists.splice(settingDelete, 1);

      for (var i = 0; i < lists.length; i++) {
        lists.splice(i, 1, { id: i + 1, title: lists[i].title, color: lists[i].color, online: false })
      }

      if (lists.length > 0) {
        if (settingDelete - 1 === -1) {
          lists.splice(settingDelete, 1, { id: lists[settingDelete].id, title: lists[settingDelete].title, color: lists[settingDelete].color, online: true });
        } else {
          lists.splice(settingDelete - 1, 1, { id: lists[settingDelete - 1].id, title: lists[settingDelete - 1].title, color: lists[settingDelete - 1].color, online: true });
        }
      }

      if (lists.length === 0) {
        setLists([]);
      }

      setSettingDelete(-2);
    } else if (settingDelete === -2) {
      history.push({
        pathname: '/schedule',
        state: {
          serverLists: lists,
          nickname: nickname,
          email: email,
          accesstoken: accessToken,
          refreshtoken: refreshToken,
          teamMate: teamMate,
          leader: leader,
          code: code
        }
      })
    } else {
      return;
    }
  }, [settingDelete])

  return (
    <div onMouseMove={(e) => handleMousePosition(e)}>
      { serverNot === true ?
        <div>
          <NotFound></NotFound>
          <MenuBar code={code} leader={false} title={title[0]} id={title[1]} menubar={menubar} onClick={() => setMenubar(!menubar)} serverlists={lists} nickname={nickname} email={email} accessToken={accessToken} refreshToken={refreshToken} teamMate={teamMate}></MenuBar>
          <Header code={code} leader={false} teamMate={teamMate} title={title[0]} nickname={nickname} email={email} accessToken={accessToken} refreshToken={refreshToken}></Header>
          <ServerBar lists={lists} createServer={() => setCreate(true)} onClickServer={onClickServer}></ServerBar>
          {create === true &&
            <div>
              <div className={cx('backOpacity')} onClick={() => setCreate(false)}></div>
              <MainCreate color={color} colorChange={(color) => setColor(color.hex)} teamChange={(e) => setTeam(e.target.value)} addServer={addServer}></MainCreate>
            </div>
          }
        </div>
        :
        <div>
          <SetProject
            code={code}
            menubar={menubar}
            pickerColor={settingColor}
            handleOnChangeComplete={(color) => handleSettingColor(color)}
            title={settingTitle}
            handleChangeTitle={handleChangeTitle}
            handleRemoveProject={handleRemoveProject}
            teamId={teamId}
            teamMate={teamMate}
          />
          <MenuBar code={code} leader={leader} title={title[0]} id={title[1]} menubar={menubar} onClick={() => setMenubar(!menubar)} serverlists={lists} nickname={nickname} email={email} accessToken={accessToken} refreshToken={refreshToken} teamMate={teamMate}></MenuBar>
          <Header code={code} leader={leader} teamMate={teamMate} title={title[0]} serverlists={lists} nickname={nickname} email={email} accessToken={accessToken} refreshToken={refreshToken}></Header>
          <ServerBar lists={lists} createServer={() => setCreate(true)} onClickServer={onClickServer}></ServerBar>
          <Chatting
            positionY={positionY}
            mouseMove={mouseMove}
            handleChattingOn={() => setChatOnline(true)}
            handleChattingOff={() => { setChatOnline(false); setMouseMove(false); }}
          />
          {create === true &&
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
