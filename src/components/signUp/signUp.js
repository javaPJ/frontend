import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './SignUp.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);
const axios = require('axios');

const SignUp = () => {
    let history = useHistory();

    const [email, setEmail] = useState(''),
          [emailBlock, setEmailBlock] = useState(false),
          [authentication, setAuthentication] = useState(''),
          [authenticationBlock, setAuthenticationBlock] = useState(false),
          [nickname, setNickname] = useState(''),
          [pasword, setPassword] = useState(''),
          [passwordCheck, setPasswordCheck] = useState('');

    const handleEmailSend = () => {
        if(email !== '') {
            axios.get(`http://localhost:5000/api/auth/idcheck/${email}`)
            .then(res => {
                axios.post(`http://localhost:500/api/auth/emailsend`, {
                    email: email,
                })
                .then(res => {
                    setEmailBlock(true);
                    console.log(res);
                })
                .catch(err => {
                    console.log(err);
                })
            })
            .catch(err => {
                alert('해당 이메일은 이미 사용되고 있습니다.');
                setEmail('');
                console.log(err);
            })
        }
    }

    const handleAuthenticationConfirm = () => {
        if(authentication !== '') {
            axios.get(`http://localhost:5000/api/auth/emailcheck?id=${email}&code=${authentication}`)
            .then(res => {
                setAuthenticationBlock(true);
                console.log(res);
            })
            .catch(err => {
                setAuthentication('');
                alert('인증번호를 다시 한 번 확인해주세요.');
                console.log(err);
            })
        }
    }

    const handleSignUp = () => {
        if(emailBlock && authenticationBlock) {
            if(pasword === passwordCheck && nickname !== '') {
                axios.post(`http://localhost:5000/api/auth/signup`, {
                    id : nickname,
                    password : pasword,
                    email : email,
                })
                .then(res => {
                    console.log(res.data);
                    history.push({
                        pathname: "/",
                    })
                })
                .catch(err => {
                    console.log(err);
                });
            } else if(nickname === '') {
                alert('닉네임을 다시 한 번 확인해주세요.')
            }else {
                alert('비밀번호 또는 비밀번호 확인란을 다시 한 번 확인해주세요.');
            }
        } else if(emailBlock === false){
            alert('이메일을 확인하세요.');
        } else {
            alert('이메일을 인증해주세요.')
        }
        
    }

    const handleMain = () => {
        history.push({
            pathname: "/",
        })
    }
    
    return(
        <div className={cx('signup-back')}>
            <div className={cx('signup-header')}>
                <div className={cx("signup-logo")} onClick={() => handleMain()}>Bagel</div>
            </div>
            <div className={cx('signup-contents')}>
                <div className={cx('signup-title')}>Sign up</div>
                <div className={cx('signup-email')}>
                    { emailBlock ?
                        <input style={{color: "gray"}} className={cx('signup-email-input')} value={email} readOnly/>
                        :
                        <input className={cx('signup-email-input')} onChange={(e) => setEmail(e.target.value)} value={email} placeholder="Email" type="email"/>
                    }
                    <button className={cx('signup-send-email')} onClick={() => handleEmailSend()}>Send</button>
                </div>
                <div className={cx('signup-authentication')}>
                    { authenticationBlock ?
                        <input style={{color: "gray"}} className={cx('signup-authentication-input')} value={authentication} readOnly/>
                        :
                        <input className={cx('signup-authentication-input')} onChange={(e) => setAuthentication(e.target.value)} value={authentication} placeholder="Authentication"/>
                    }
                    <button className={cx('signup-confirm-authentication')} onClick={() => handleAuthenticationConfirm()}>Confirm</button>
                </div>
                <input className={cx('signup-nickname')} onChange={(e) => setNickname(e.target.value)} placeholder="Nickname"/>
                <input className={cx('signup-password')} onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="password"/>
                <input className={cx('signup-confirm-password')} onChange={(e) => setPasswordCheck(e.target.value)} placeholder="Confirm Password" type="password"/>
                <button className={cx('signup-submit-button')} onClick={() => handleSignUp()}>Sign up</button>
            </div>
            <div className={cx('signup-view')}></div>
            <div className={cx('signup-opacity')}></div>
        </div>
    );
    
}

export default SignUp; 