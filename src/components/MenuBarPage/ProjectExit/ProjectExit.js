import React, { useState } from 'react';
import styles from './ProjectExit.scss';
import classNames from 'classnames/bind';
import { AiOutlineClose } from "react-icons/ai";

const cx = classNames.bind(styles);

const ProjectExit = ({handleProjectExit}) => {
    const [password, setPassword] = useState('');

    const handleCheckPassword = () => {
        if(password === 'admin1234') {
            handleProjectExit();
        } else {
            alert("비밀번호를 다시 입력해주세요.");
            setPassword('');
        }
    }

    return (
        <div className={cx('exit-back')}>
            <div className={cx('exit-close')}><AiOutlineClose size="27"></AiOutlineClose></div>
            <div className={cx('exit-text')}>
                <div className={cx('exit-title')}>프로젝트 나가기</div>
                <p className={cx('exit-text-1')}>정말로 나가시겠습니까?</p>
                <p className={cx('exit-text-2')}>이 작업은 취소할 수 없습니다. 해당 프로젝트를 나가기를 원하신다면 사용자의 비밀번호를 입력해주세요.</p>
            </div>
            <div className={cx('exit-active')}>
                <input
                    type="password"
                    className={cx('exit-input')}
                    placeholder="비밀번호 입력"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />
                <button className={cx('exit-button')} onClick={() => handleCheckPassword()}>프로젝트 나가기</button>
            </div>
        </div>
    )
}

export default ProjectExit;