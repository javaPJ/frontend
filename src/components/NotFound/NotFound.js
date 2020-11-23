import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './NotFound.scss';
import classNames from 'classnames/bind';
import { MdNotInterested } from "react-icons/md";

const cx = classNames.bind(styles);

const NotFound = () => {
    let history = useHistory();

    const handlehome = () => {
        history.push({
            pathname: '/'
        })
    }

    return(
        <div className={cx('notfound-back')}>
            <div className={cx('notfound-404')}>404</div>
            <h1 className={cx('notfound-text')}>Page Not Found</h1>
            <button className={cx('notfound-button')} onClick={handlehome}>Home</button>
        </div>
    );
    
}

export default NotFound; 