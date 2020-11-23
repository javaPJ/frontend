import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './MainPage.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);
const axios = require('axios');

const MainPage = () => {
    let history = useHistory();
    const [email, setEmail] = useState(''),
          [password, setPassword] = useState('');

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
        if(email !== '' && password !== '') {
            axios.post(`http://3.35.169.186:5000/api/auth/login`, {
                email : email,
                password : password,
            })
            .then(res => {
                var accesstoken = res.data.accessToken;
                var refreshtoken = res.data.refreshToken;

                axios.post(`http://3.35.169.186:5000/api/account/profile`,{},{
                    headers : {
                        Authentication : `${accesstoken}`
                    }
                })
                .then(res => {
                    history.push({
                        pathname: "/schedule",
                        state: {
                            nickname: res.data.name,
                            email: res.data.email,
                            serverLists: res.data.team,
                            accesstoken : accesstoken,
                            refreshtoken : refreshtoken
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
        } else if(email === '') {
            alert("이메일을 확인해주세요.")
        } else {
            alert("비밀번호를 확인해주세요.");
        }
    }
    
    return(
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
                <input className={cx("main-email")} onChange={(e) => setEmail(e.target.value)} value={email} placeholder = "Email"/>
                <input className={cx("main-password")} onChange={(e) => setPassword(e.target.value)} value={password} placeholder="Password" type="password"/>
                <div className={cx("main-forgot")} onClick={() => handleForgot()}>Forgot Password?</div>
                <button className={cx("main-login-button")} onClick={() => handleLogin()}>Login</button>
            </div>
        </div>
    );
}

export default MainPage; 