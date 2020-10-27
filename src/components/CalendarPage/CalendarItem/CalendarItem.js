import React, { useState, useEffect } from 'react';
import styles from './CalendarItem.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const CalendarItem = ({year, month, day, schedules, thisDayClick, scheduleView}) => {
  const today = new Date();
  const [rightClick, setRightClick] = useState(false),
        [x, setX] = useState(''),
        [y, setY] = useState('');

  useEffect(() => {
  }, [schedules])

  let color;
  let backcolor;
  if (today.getFullYear() === year && today.getMonth()+1 === month && today.getDate() === day) {
    color = "white";
    backcolor = "#343742";
  } else {
    backcolor = "white";
    color = "#343742";
  }

  const handleRightClick = (e) => {
    e.preventDefault();
    var btn = e.button;
    if (btn === 2) {
      setRightClick(true);
      setTimeout(() => {
        setRightClick(false)
      }, 1000)
    }
  }

  return (
    <div className={cx('calendarItem-back')} >
      <div className={cx('calendarItem-day')} id={[year, month, day]} style={{backgroundColor: backcolor, color: color}} onClick={thisDayClick}>{day}</div>
      { schedules.length >= 1 &&
        <div>
          <div className={cx('calendar-schedule0')} onContextMenu={(e) => handleRightClick(e)} onClick={scheduleView}>{schedules[0].text}</div>
          { rightClick === true &&
            <div className={cx('calendar-clickDelete')}>삭제</div>
          }
          { schedules.length >= 2 &&
            <div className={cx('calendar-more')} id={[year, month, day]} onClick={thisDayClick}>더보기</div>
          }
        </div>
      }
    </div>
  )
}

export default CalendarItem
