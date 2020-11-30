import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import styles from './MainPage.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);
const axios = require('axios');

const MainPage = () => {
  let history = useHistory();

  const [email, setEmail] = useState(''),
    [password, setPassword] = useState(''),
    [accessToken, setAccessToken] = useState(''),
    [refreshToken, setRefreshToken] = useState('');

  const handleSignUp = () => {
    history.push({
      pathname: "/signup",
    })
  }

  const handleForgot = () => {
    history.push({
      pathname: "/forgot",
    })
  }

  const handleLogin = () => {
    if (email !== '' && password !== '') {
      axios.post(`http://3.35.229.52:5000/api/auth/login`, {
        email: email,
        password: password,
      })
        .then(res => {
          var accesstoken = res.data.accessToken;
          var refreshtoken = res.data.refreshToken;

          setAccessToken(accesstoken);
          setRefreshToken(refreshtoken);

          axios.post(`http://3.35.229.52:5000/api/account/profile`, {}, {
            headers: {
              Authentication: `${accesstoken}`
            }
          })
            .then(res => {
              var array = [];

              for(var i=1;i<=2;i++){
                for(var j=0;j<res.data[i].length;j++) {
                  array.push((res.data[i])[j]);
                }
              }

              history.push({
                pathname: "/schedule",
                state: {
                  nickname: res.data[0].name,
                  email: res.data[0].email,
                  serverLists: array,
                  accesstoken: accesstoken,
                  refreshtoken: refreshtoken,
                  teamMate: [],
                  leader: '',
                  code: '',
                  teamId: '',
                }
              })
            })
            .catch(err => {
              console.log(err); 
            })
        })
        .catch(err => {
          console.log(err);
          alert("다시 입력해주세요.");
          setEmail('');
          setPassword('');
        })
    } else if (email === '') {
      alert("이메일을 확인해주세요.")
    } else {
      alert("비밀번호를 확인해주세요.");
    }
  }

  const handleEnterKey = (e) => {
    if (e.keyCode === 13) {
      handleLogin();
    }
  }

  return (
    <div className={cx("main-back")}>
      <div className={cx("main-opacity")}></div>
      <div className={cx('main-header')}>
        <div className={cx("main-logo")}>Bagel</div>
        <button className={cx("main-signup")} onClick={() => handleSignUp()}>Sign up</button>
      </div>
      <div className={cx('main-contents')}>
        <div className={cx("main-text1")}>Java Project</div>
        <div className={cx("main-text2")}>This website is collabration site.</div>
      </div>
      <div className={cx('main-input')}>
        <div className={cx("main-login-title")}>Login</div>
        <input className={cx("main-email")} onChange={(e) => setEmail(e.target.value)} value={email} placeholder="Email" />
        <input className={cx("main-password")} onChange={(e) => setPassword(e.target.value)} onKeyDown={(e) => handleEnterKey(e)} value={password} placeholder="Password" type="password" />
        <div className={cx("main-forgot")} onClick={() => handleForgot()}>Forgot Password?</div>
        <button className={cx("main-login-button")} onClick={() => handleLogin()}>Login</button>
      </div>
    </div>
  );
}

export default MainPage;