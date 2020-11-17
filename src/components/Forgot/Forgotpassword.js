import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './Forgotpassword.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const Forgotpassword = () => {
    let history = useHistory();

    const handleForgot = () => {
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
                    <input className={cx('forgot-email-input')} placeholder="Email"/>
                    <button className={cx('forgot-send-email')}>Send</button>
                </div>
                <p className={cx('forgot-text1')}>본 이메일로 <span>임시 비밀번호</span>를 보냈습니다.</p>
                <p className={cx('forgot-text2')}><span>임시 비밀번호</span>로 로그인하여 비밀번호를 재설정해주세요.</p>
                <button className={cx('forgot-submit-button')} onClick={() => handleForgot()}>Submit</button>
            </div>
            <div className={cx('forgot-view')}></div>
            <div className={cx('forgot-opacity')}></div>
        </div>
    );
    
}

export default Forgotpassword; 