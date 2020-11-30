import React, { useState } from 'react';
import styles from './ServerJoin.scss';
import classNames from 'classnames/bind';
import { AiOutlineDoubleLeft } from "react-icons/ai";
import joinImg2 from './../../../../images/join_img2.jpg';

const cx = classNames.bind(styles);

const ServerJoin = ({joinBack, pinChange, joinServer}) => {
  const [pin, setPin] = useState('');

  return (
    <div className={cx('serverjoin-back')}>
      <div className={cx('back-button')} onClick={joinBack}><AiOutlineDoubleLeft size="40" /></div>
      <img className={cx('serverjoin-img')} src={joinImg2}/>
      <input className={cx('pin-input')} placeHolder="PIN번호를 입력해주세요." onChange={pinChange}/>
      <button className={cx('team-join')} onClick={joinServer}>참여하기</button>
    </div>
  )
}

export default ServerJoin;
