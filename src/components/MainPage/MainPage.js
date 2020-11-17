import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './MainPage.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const MainPage = () => {
    let history = useHistory();

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
        history.push({
            pathname: "/schedule",
        })
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
                <input className={cx("main-email")} placeholder = "Email"/>
                <input className={cx("main-password")} placeholder="Password" type="password"/>
                <div className={cx("main-forgot")} onClick={() => handleForgot()}>Forgot Password?</div>
                <button className={cx("main-login-button")} onClick={() => handleLogin()}>Login</button>
            </div>
        </div>
    );
}

export default MainPage; 