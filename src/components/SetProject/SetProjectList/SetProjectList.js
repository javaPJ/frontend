import React, {useState, useEffect} from 'react';
import styles from './SetProjectList.scss'
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const SetProjectList = ({team, handleRemoveMember}) => {
    
    return(
        <div className={cx('setprojectlist-back')}>
            <div className={cx('setprojectlist-title')}>
                <div className={cx('setprojectlist-name-title')}>이름</div>
                <div className={cx('setprojectlist-email-title')}>이메일</div>
                <div className={cx('setprojectlist-date-title')}>최근 접속일</div>
                <div className={cx('setprojectlist-remove-title')}>강퇴</div>
            </div>
            <div className={cx('setprojectlist-list-back')}>
            {team.map(
                member => (
                <div className={cx('setprojectlist-list')}>
                    <div className={cx('setprojectlist-name-list')}>{member.name}</div>
                    <div className={cx('setprojectlist-email-list')}>{member.email}</div>
                    <div className={cx('setprojectlist-date-list')}>{member.date}</div>
                    <div className={cx('setprojectlist-remove-list')}>
                        <button className={cx('setprojectlist-remove-button')} onClick={() => handleRemoveMember(member.id)}>강퇴</button>
                    </div>
                </div>
            ))}
            </div>
        </div>
    );
}

export default SetProjectList; 