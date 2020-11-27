import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './Profile.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);
const axios = require('axios');

const Profile = ({menubar, getNickname, email, lists, accessToken, refreshToken }) => {
    let history = useHistory();

    const [nickname, setNickname] = useState(''),
          [password, setPassword] = useState(''),
          [passwordCheck, setPasswordCheck] = useState('');

    useEffect(() => {
        setNickname(getNickname);
    }, [])


    const handleProfileSave = () => {
        if(password === passwordCheck || nickname !== '') {

            axios.patch(`http://3.35.229.52:5000/api/account/profile`, 
            {
                nickname: `${nickname}`,
                password: `${password}`, 
            },
            {headers : {
                Authentication : `${accessToken}`
            }})
            .then(res => {
                console.log(res);
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
                nickname: getNickname,
                email: email,
                accesstoken : accessToken,
                refreshtoken : refreshToken
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
                        <input className={cx('profile-nickname-input')} onChange={(e) => setNickname(e.target.value)} />
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