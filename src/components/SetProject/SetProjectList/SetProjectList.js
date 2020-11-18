import React, {useState, useEffect} from 'react';
import styles from './SetProjectList.scss'
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const SetProjectList = ({team, handleRemoveMember}) => {

    const handleScroll = (id) => {
        var scroll = document.getElementById(id);

        var name = document.getElementById("namescroll");
        var email = document.getElementById("emailscroll");
        var date = document.getElementById("datescroll");
        var remove = document.getElementById("removescroll");
        
        name.scrollTop = scroll.scrollTop;
        email.scrollTop = scroll.scrollTop;
        date.scrollTop = scroll.scrollTop;
        remove.scrollTop = scroll.scrollTop;
    }

    return(
        <div className={cx('setprojectlist-back')}>
            <div className={cx('setprojectlist-name')}>
                <div className={cx('setprojectlist-name-title')}>이름</div>
                <div id="namescroll" style={{overflow: "scroll", maxHeight: "300px"}} onScroll={(e) => handleScroll(e.target.id)}>
                {team.map(
                    member => (
                    <div className={cx('setprojectlist-name-list')}>{member.name}</div>
                ))}
                </div>
            </div>
            <div className={cx('setprojectlist-email')}>
                <div className={cx('setprojectlist-email-title')}>이메일</div>
                <div id="emailscroll" style={{overflow: "scroll", maxHeight: "300px"}} onScroll={(e) => handleScroll(e.target.id)}>
                {team.map(
                    member => (
                    <div className={cx('setprojectlist-email-list')}>{member.email}</div>
                ))}
                </div>
            </div>
            <div className={cx('setprojectlist-date')}>
                <div className={cx('setprojectlist-date-title')}>최근 접속일</div>
                <div id="datescroll" style={{overflow: "scroll", maxHeight: "300px"}} onScroll={(e) => handleScroll(e.target.id)}>
                {team.map(
                    member => (
                    <div className={cx('setprojectlist-date-list')}>{member.date}</div>
                ))}
                </div>
            </div>
            <div className={cx('setprojectlist-remove')}>
                <div className={cx('setprojectlist-remove-title')}>강퇴</div>
                <div id="removescroll" style={{overflow: "scroll", maxHeight: "300px"}} onScroll={(e) => handleScroll(e.target.id)}>
                {team.map(
                    member => (
                    <div className={cx('setprojectlist-remove-list')}>
                        <button className={cx('setprojectlist-remove-button')} onClick={() => handleRemoveMember(member.id)}>강퇴</button>
                    </div>
                ))}
                </div>
            </div>
        </div>
    );
}

export default SetProjectList; 