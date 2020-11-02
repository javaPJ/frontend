import React, { useState, useEffect } from 'react';
import styles from './MoreSchedule.scss';
import classNames from 'classnames/bind';
import { AiOutlineClose, AiOutlinePlus, AiOutlineDelete } from "react-icons/ai";

const cx = classNames.bind(styles);


const MoreSchedule = ({year, month, day, moreCancel, thisSchedule, handleTitleDelete}) => {
  const [schedules, setSchedules] = useState([]);
  
  useEffect(() => {
    setSchedules([]);


    if (thisSchedule.length === 0) {
      setSchedules([]);
      return;
    } else {
      setSchedules(thisSchedule);
    }
  },[])

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
            {thisSchedule.length !== 0 && 
              schedules.map(
              schedule => (
                <div className={cx('moreschedule-text-box')} style={{backgroundColor: schedule.color}}>
                  <div className={cx('moreschedule-text')}>{schedule.title}</div>
                  <div className={cx('moreschedule-text-delete')} onClick={() => handleTitleDelete(schedule.key)}><AiOutlineDelete></AiOutlineDelete></div>
                </div>
            ))}
        </div>
      </div>
    </div>
  )
}

export default MoreSchedule;
