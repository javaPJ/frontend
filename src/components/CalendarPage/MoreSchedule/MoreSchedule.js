import React, { useState, useEffect } from 'react';
import styles from './MoreSchedule.scss';
import classNames from 'classnames/bind';
import { AiOutlineClose, AiOutlinePlus } from "react-icons/ai";

const cx = classNames.bind(styles);


const MoreSchedule = ({check, year, month, day, moreCancel, scheduleView}) => {
  const [sche, setSche] = useState([]);

  const moreSchedule = sche.map(
    sch => (
      <div className={cx('moreschedule-text')} onClick={scheduleView}>{sch.content}</div>
    )
  )

  useEffect(() => {
    setSche([]);
    if (check.length === 0) {
      return 0;
    } else {
      for (var i = 0; i < check.length; i++) {
        let id = i+1;
        let content = check[i].text;
        setSche(sche =>  [...sche, {id: id, content: content}]);
      }
    }
  },[check])

  return (
    <div className={cx('moreschedule-back')}>
      <div className={cx('moreschedule-header')}>
        <div className={cx('moreschedule-cancel')} onClick={moreCancel}><AiOutlineClose color="#343742" size="25"></AiOutlineClose></div>
        <div className={cx('moreschedule-day')}>{year}년 {month}월 {day}일</div>
      </div>
      <div className={cx('moreschedule-content')}>
        <div className={cx('moreschedule-content-header')}>내용</div>
        <div className={cx('moreschedule-plus')}><AiOutlinePlus color="#343742" size="25"></AiOutlinePlus></div>
        <div className={cx('moreschedule-schedule')}>
          {moreSchedule}
        </div>
      </div>
    </div>
  )
}

export default MoreSchedule;
