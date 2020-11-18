import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './Profile.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const Profile = ({menubar}) => {
    let history = useHistory();

    const handleProfileSave = () => {
        history.push({
            pathname: '/schedule'
        })
    }

    const handleProfileCancel = () => {
        history.push({
            pathname: '/schedule'
        })
    }
 
    let size = menubar ? "310px" : "190px";
    
    return (
        <div style={{width: "100%", height: "100%", position:"absolute"}}>
            <div style={{left: size}} className={cx('profile-back')}>
                <div className={cx('profile-contents')}>
                    <div className={cx('profile-email')}>
                        <div className={cx('profile-email-title')}>Email</div>
                        <input className={cx('profile-email-input')} readOnly/>
                    </div>
                    <div className={cx('profile-nickname')}>
                        <div className={cx('profile-nickname-title')}>Nickname</div>
                        <input className={cx('profile-nickname-input')}/>
                    </div>
                    <div className={cx('profile-password')}>
                        <div className={cx('profile-password-title')}>Password</div>
                        <input type="password" className={cx('profile-password-input')}/>
                    </div>
                    <div className={cx('profile-confirm')}>
                        <div className={cx('profile-confirm-title')}>Confirm Password</div>
                        <input type="password" className={cx('profile-confirm-input')}/>
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