import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './SignUp.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const SignUp = () => {
    let history = useHistory();

    const handleSignUp = () => {
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
        <div className={cx('signup-back')}>
            <div className={cx('signup-header')}>
                <div className={cx("signup-logo")} onClick={() => handleMain()}>Bagel</div>
            </div>
            <div className={cx('signup-contents')}>
                <div className={cx('signup-title')}>Sign up</div>
                <div className={cx('signup-email')}>
                    <input className={cx('signup-email-input')} placeholder="Email"/>
                    <button className={cx('signup-send-email')}>Send</button>
                </div>
                <div className={cx('signup-authentication')}>
                    <input className={cx('signup-authentication-input')} placeholder="Authentication"/>
                    <button className={cx('signup-confirm-authentication')}>Confirm</button>
                </div>
                <input className={cx('signup-nickname')} placeholder="Nickname"/>
                <input className={cx('signup-password')} placeholder="Password" type="password"/>
                <input className={cx('signup-confirm-password')} placeholder="Confirm Password" type="password"/>
                <button className={cx('signup-submit-button')} onClick={() => handleSignUp()}>Sign up</button>
            </div>
            <div className={cx('signup-view')}></div>
            <div className={cx('signup-opacity')}></div>
        </div>
    );
    
}

export default SignUp; 