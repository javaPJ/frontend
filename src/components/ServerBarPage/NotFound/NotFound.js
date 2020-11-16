import React from 'react';
import styles from './NotFound.scss';
import classNames from 'classnames/bind';
import {AiOutlineWarning} from 'react-icons/ai';

const cx = classNames.bind(styles);

const NotFound = () => {
    return (
        <div className={cx('notfound-back')}>
            <div className={cx('notfound-icon')}><AiOutlineWarning size="150"></AiOutlineWarning></div>
            <div className={cx('notfound-title')}>서버가 없습니다!!!</div>
            <div className={cx('notfound-content')}>서버를 생성하거나 참여해주세요</div>
        </div>
    )
}

export default NotFound;