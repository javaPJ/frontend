import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './Forgotpassword.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);
const axios = require('axios');

const Forgotpassword = () => {
    let history = useHistory();

    const [email, setEmail] = useState('');

    const handleForgotSend = () => {
        if(email !== '') {
            axios.post(`http://localhost:5000/api/auth/findpassword`, {
                email: email,
            })
            .then(res => {
                console.log(res.data.password);
            })
            .catch(err => {
                setEmail('');
                console.log(err);
            })
        } else {
            alert("이메일을 입력해주세요.")
        }
    }

    const handleForgotSubmit = () => {
        history.push({
            pathname: "/",
        })
    }

    const handleMain = () => {
        history.push({
            pathname: "/",
        })
    }

    return(
        <div className={cx('forgot-back')}>
            <div className={cx('forgot-header')}>
                <div className={cx("forgot-logo")} onClick={() => handleMain()}>Bagel</div>
            </div>
            <div className={cx('forgot-contents')}>
                <div className={cx('forgot-title')}>Forgot Password</div>
                <div className={cx('forgot-email')}>
                    <input className={cx('forgot-email-input')} onChange={(e) => setEmail(e.target.value)} value={email} type="email" placeholder="Email"/>
                    <button className={cx('forgot-send-email')} onClick={() => handleForgotSend()}>Send</button>
                </div>
                <p className={cx('forgot-text1')}>본 이메일로 <span>임시 비밀번호</span>를 보냈습니다.</p>
                <p className={cx('forgot-text2')}><span>임시 비밀번호</span>로 로그인하여 비밀번호를 재설정해주세요.</p>
                <button className={cx('forgot-submit-button')} onClick={() => handleForgotSubmit()}>Submit</button>
            </div>
            <div className={cx('forgot-view')}></div>
            <div className={cx('forgot-opacity')}></div>
        </div>
    );
    
}

export default Forgotpassword; 