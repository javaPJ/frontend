import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './Profile.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);
const axios = require('axios');

const Profile = ({menubar, getNickname, email, lists, token}) => {
    let history = useHistory();

    const [load, setLoad] = useState(false),
          [nickname, setNickname] = useState(''),
          [password, setPassword] = useState(''),
          [passwordCheck, setPasswordCheck] = useState('');

    useEffect(() => {
        if(load === false) {
            setNickname(getNickname);
            setLoad(true);
        }
    }, [load])


    const handleProfileSave = () => {
        if(password === passwordCheck || nickname !== '') {
            axios.patch(`http://localhost:5000/api/account/profile`, {
                nickname: nickname,
                password: password,
                headers : {
                    Authentication : token
                }
            })
            .then(res => {
                console.log(res);
                history.push({
                    pathname: '/schedule',
                    state: {
                        serverLists: lists,
                        nickname: nickname,
                        email: email,
                        token: token
                    }
                })
            })
            .catch(err => {
                console.log(err);
            })            
        } else if(nickname === ''){
            alert('닉네임을 입력해주세요.')
        } else {
            setPassword('');
            setPasswordCheck('');
            alert('비밀번호와 비밀번호 확인란을 확인해주세요.');
        }
    }

    const handleProfileCancel = () => {
        history.push({
            pathname: '/schedule',
            state: {
                serverLists: lists,
                nickname: nickname,
                email: email,
                token: token,
            }
        })
    }
 
    let size = menubar ? "310px" : "190px";
    
    return (
        <div style={{width: "100%", height: "100%", position:"absolute"}}>
            <div style={{left: size}} className={cx('profile-back')}>
                <div className={cx('profile-contents')}>
                    <div className={cx('profile-email')}>
                        <div className={cx('profile-email-title')}>Email</div>
                        <input className={cx('profile-email-input')} value={email} readOnly/>
                    </div>
                    <div className={cx('profile-nickname')}>
                        <div className={cx('profile-nickname-title')}>Nickname</div>
                        <input className={cx('profile-nickname-input')} onChange={(e) => setNickname(e.target.value)} placeholder={nickname}/>
                    </div>
                    <div className={cx('profile-password')}>
                        <div className={cx('profile-password-title')}>Password</div>
                        <input type="password" className={cx('profile-password-input')} onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    <div className={cx('profile-confirm')}>
                        <div className={cx('profile-confirm-title')}>Confirm Password</div>
                        <input type="password" className={cx('profile-confirm-input')} onChange={(e) => setPasswordCheck(e.target.value)}/>
                    </div>
                    <div className={cx('profile-button')}>
                        <button className={cx('profile-save')} onClick={() => handleProfileSave()}>Save</button>
                        <button className={cx('profile-cancel')} onClick={() => handleProfileCancel()}>Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile