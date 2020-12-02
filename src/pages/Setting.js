import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import Header from '../components/Header/Header';
import ServerBar from '../components/ServerBarPage/ServerBar/ServerBar';
import MenuBar from '../components/MenuBarPage/MenuBar/MenuBar';
import SetProject from '../components/SetProject/SetProject/SetProject';
import MainCreate from '../components/ServerBarPage/CreateServer/MainCreate/MainCreate';
import styles from './pageSame.scss';
import classNames from 'classnames/bind';
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
  
  const [serverNot, setServerNot] = useState(false);
  const [leader, setLeader] = useState('');
  const [code, setCode] = useState('');

  const [settingId, setSettingId] = useState(-1),
    [settingTitle, setSettingTitle] = useState(''),
    [settingColor, setSettingColor] = useState(''),
    [settingDelete, setSettingDelete] = useState(-1);
    
  const [joinPin, setJoinPin] = useState('');
  const [addServerNum, setAddServerNum] = useState(-1);

  const [teamMate, setTeamMate] = useState([]);
  const [readScheduleList, setReadScheduleList] = useState([]);

  let history = useHistory();
  let location = useLocation();

  useInterval(() => {
    const headers = {
      headers: {
        refreshToken: `${refreshToken}`
      }
    }

    axios.get(`http://3.35.229.52:5000/api/auth/refreshtoken`, {}, headers)
    .then(res => { console.log(res); setAccessToken(res.data.accessToken) })
    .catch(err => { console.log(err); })
  }, 1000000000);

  useEffect(() => {
    if (typeof (location.state) !== 'undefined' && location.state !== null) {
      const { serverLists, email, nickname, accesstoken, refreshtoken, teamMate, leader, code, teamId, readScheduleList } = location.state;
      for (var index = 0; index < serverLists.length; index++) {
        if (serverLists[index].online === true) {
          setSettingTitle(serverLists[index].title);
          setSettingColor(serverLists[index].color);
        }
      }
      setReadScheduleList(readScheduleList);
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
      lists.splice(i, 1, { id: lists[i].id, title: lists[i].title, teamId: lists[i].teamId, color: lists[i].color, online: false });
      if(i === e.target.innerText-1) {
        lists.splice(i, 1, { id: lists[i].id, title: lists[i].title, teamId: lists[i].teamId, color: lists[i].color, online: true });
      }
    }

    axios.post(`http://3.35.229.52:5000/api/project/readproject`,
      {
        team: e.target.id
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
            leader: res.data[0].leadername,
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
      setLists([]);
      setMenubar(false);
      for (var i = 0; i < lists.length; i++) {
        lists.splice(i, 1, { id: lists[i].id, title: lists[i].title, teamId: lists[i].teamId, color: lists[i].color, online: false });
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

      setTeam('');
      setColor('');
      setCreate(false);
      setServerNot(false);
      setAddServerNum(0)
    } else {
      alert("색상 또는 팀 이름을 확인해주세요.")
    }
  }

  const joinServer = () => {
    axios.post(`http://3.35.229.52:5000/api/project/joinproject`,
    {
      pin: joinPin
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

    setCreate(false);
    setJoinPin('');
    setAddServerNum(0)
  }

  useEffect(() => { 
    if(addServerNum !== -1) {
      axios.post(`http://3.35.229.52:5000/api/account/profile`,{ }, {
        headers: {
          Authentication: `${accessToken}`
        }
      })
      .then(res => {
        var serverLists = [];

        for(var i=1;i<=2;i++){
          for(var j=0;j<res.data[i].length;j++) {
            serverLists.push((res.data[i])[j]);
          }
        }

        const arrays = [];

        for(var i = 0; i < serverLists.length; i++) {
          arrays.push({id: i, team: serverLists[i].teamName, teamId: serverLists[i].team, date: serverLists[i].createTime});
        }

        arrays.sort(function(a, b) { 
          return a.date < b.date ? -1 : a.date > b.date ? 1 : 0;
        });

        const url = `http://3.35.229.52:5000/api/project/readproject`
    
        const headers = {
          headers: {
            Authentication: `${accessToken}`
          }
        }
        
        var array2 = [];
  
        const postArray = array => {
          return axios.post(url,{team: array.teamId}, headers)
          .then((res => {
            if (array.id === arrays.length-1) {
              array2.push({ id: array.id+1, title: array.team, teamId: array.teamId, color: res.data[0].color, online: true });
              setCode(res.data[0].code);
              setTeamMate(res.data[1]);
              setLeader(res.data[0].leadername);
              setTeamId(res.data[0].num);
            } else {
              array2.push({ id: array.id+1, title: array.team, teamId: array.teamId, color: res.data[0].color, online: false })
            }
          }))
        }
        
        arrays.reduce((prevPrams, array) => {
          return prevPrams.then(() => {
            return postArray(array)
          })
        }, Promise.resolve())
  
        setLists(array2);


      })
      .catch(err => {
        console.log(err);
      })

      setAddServerNum(-1);
    }
  }, [addServerNum])



  

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
    <div>
      { serverNot === true ?
        <div>
          <NotFound></NotFound>
          <MenuBar readScheduleList={readScheduleList} teamId={teamId} code={code} leader={false} title={title[0]} id={title[1]} menubar={menubar} onClick={() => setMenubar(!menubar)} serverlists={lists} nickname={nickname} email={email} accessToken={accessToken} refreshToken={refreshToken} teamMate={teamMate}></MenuBar>
          <Header readScheduleList={readScheduleList} teamId={teamId} code={code} leader={false} teamMate={teamMate} title={title[0]} serverlists={lists} nickname={nickname} email={email} accessToken={accessToken} refreshToken={refreshToken}></Header>
          <ServerBar lists={lists} createServer={() => setCreate(true)} onClickServer={onClickServer}></ServerBar>
          {create === true &&
            <div>
              <div className={cx('backOpacity')} onClick={() => setCreate(false)}></div>
              <MainCreate color={color} colorChange={(color) => setColor(color.hex)} teamChange={(e) => setTeam(e.target.value)} addServer={addServer} pinChange={(e) => setJoinPin(e.target.value)} joinServer={joinServer}></MainCreate>
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
          <MenuBar readScheduleList={readScheduleList} teamId={teamId} code={code} leader={leader} title={title[0]} id={title[1]} menubar={menubar} onClick={() => setMenubar(!menubar)} serverlists={lists} nickname={nickname} email={email} accessToken={accessToken} refreshToken={refreshToken} teamMate={teamMate}></MenuBar>
          <Header readScheduleList={readScheduleList} teamId={teamId} code={code} leader={leader} teamMate={teamMate} title={title[0]} serverlists={lists} nickname={nickname} email={email} accessToken={accessToken} refreshToken={refreshToken}></Header>
          <ServerBar lists={lists} createServer={() => setCreate(true)} onClickServer={onClickServer}></ServerBar>

          {create === true &&
            <div>
              <div className={cx('backOpacity')} onClick={() => setCreate(false)}></div>
              <MainCreate color={color} colorChange={(color) => setColor(color.hex)} teamChange={(e) => setTeam(e.target.value)} addServer={addServer} pinChange={(e) => setJoinPin(e.target.value)} joinServer={joinServer}></MainCreate>
            </div>
          }
        </div>
      }
    </div>
  );
}

export default Setting;
