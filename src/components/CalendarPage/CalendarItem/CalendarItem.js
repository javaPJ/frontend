import React, { useState, useEffect } from 'react';
import styles from './CalendarItem.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const CalendarItem = ({year, month, day, schedules, thisDayClick, scheduleView}) => {
  const today = new Date();

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

  return (
    <div className={cx('calendarItem-back')}>
      <div className={cx('calendarItem-day')} id={[year, month, day]} style={{backgroundColor: backcolor, color: color}} onClick={thisDayClick}>{day}</div>
      { schedules.length >= 1 &&
        <div>
          <div className={cx('calendar-schedule0')} onClick={scheduleView}>{schedules[0].text}</div>
          { schedules.length >= 2 &&
            <div className={cx('calendar-more')} id={[year, month, day]} onClick={thisDayClick}>더보기</div>
          }
        </div>
      }
    </div>
  )
}

export default CalendarItem
