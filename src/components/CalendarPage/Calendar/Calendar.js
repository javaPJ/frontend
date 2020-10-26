import React, { useState, useEffect } from 'react';
import styles from './Calendar.scss';
import classNames from 'classnames/bind';
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";
import CalendarList from './../CalendarList/CalendarList';
import MoreSchedule from './../MoreSchedule/MoreSchedule.js';
import SettingSchedule from './../SettingSchedule/SettingSchedule.js';

const cx = classNames.bind(styles);

const Calendar = ({menubar}) => {
  var today = new Date();

  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth()+1);
  const [lists, setLists] = useState([]);
  const [onload, setOnload] = useState(false);
  const [thisYear, setThisYear] = useState('');
  const [thisMonth, setThisMonth] = useState('');
  const [thisDay, setThisDay] = useState('');
  const [more, setMore] = useState(false);
  const [scheduleVisible, setScheduleVisible] = useState(false);
  const [title, setTitle] = useState('');

  useEffect(() => {
      setLists([]);
      var week = new Date(year, month-1).getDay();
      var nextWeek = new Date(year, month).getDay();
      if (month === 1) {
        var i;
        for (i = dayCount(year-1, month+11)-week; i < dayCount(year-1, month+11); i++) {
          let day = i+1;
          setLists(lists => [...lists, {year: year-1, month: month+11, day: day, schedule: []}]);
        }
        for (i = 0; i < dayCount(year, month); i++) {
          let day = i+1;
          setLists(lists => [...lists, {year: year, month: month, day: day, schedule: [{id: 1, text:"asdf"}]}]);
        }

        if (week < 4) {
          for (i = 0; i < 14-nextWeek; i++) {
            let day = i+1;
            setLists(lists => [...lists, {year: year, month: month+1, day: day, schedule: [{id: 1, text:"asdf"},{id:2, text:"zxcv"}]}]);
          }
        } else {
          for (i = 0; i < 7-nextWeek; i++) {
            let day = i+1;
            setLists(lists => [...lists, {year: year, month: month+1, day: day, schedule: [{id: 1, text:"asdf"},{id:2, text:"zxcv"}]}]);
          }
        }

      } else if (month === 12) {
        for (i = dayCount(year, month-1)-week; i < dayCount(year, month-1); i++) {
          let day = i+1;
          setLists(lists => [...lists, {year: year, month: month-1, day: day, schedule: []}]);
        }
        for (i = 0; i < dayCount(year, month); i++) {
          let day = i+1;
          setLists(lists => [...lists, {year: year, month: month, day: day, schedule: [{id: 1, text:"asdf"}]}]);
        }

        if (week < 4) {
          for (i = 0; i < 14-nextWeek; i++) {
            let day = i+1;
            setLists(lists => [...lists, {year: year+1, month: month-11, day: day, schedule: [{id: 1, text:"qwer"},{id:2, text:"zxcv"}]}]);
          }
        } else {
          for (i = 0; i < 7-nextWeek; i++) {
            let day = i+1;
            setLists(lists => [...lists, {year: year+1, month: month-11, day: day, schedule: [{id: 1, text:"qwer"},{id:2, text:"zxcv"}]}]);
          }
        }

      } else {
        for (i = dayCount(year, month-1)-week; i < dayCount(year, month-1); i++) {
          let day = i+1;
          setLists(lists => [...lists, {year: year, month: month-1, day: day, schedule: []}]);
        }
        for (i = 0; i < dayCount(year, month); i++) {
          let day = i+1;
          setLists(lists => [...lists, {year: year, month: month, day: day, schedule: [{id: 1, text:"asdf"}]}]);
        }

        if ((dayCount(year, month) === 30 && week < 5) || (dayCount(year, month) === 31 && week < 4) || (dayCount(year, month) === 29 && week < 6) || dayCount(year, month) === 28) {
          for (i = 0; i < 14-nextWeek; i++) {
            let day = i+1;
            setLists(lists => [...lists, {year: year, month: month+1, day: day, schedule: [{id: 1, text:"qwer"},{id:2, text:"zxcv"}]}]);
          }
        } else {
          for (i = 0; i < 7-nextWeek; i++) {
            let day = i+1;
            setLists(lists => [...lists, {year: year, month: month+1, day: day, schedule: [{id: 1, text:"qwer"},{id:2, text:"zxcv"}]}]);
          }
        }
      }
  },[year, month]);

  function dayCount(year, month){
    switch(month) {
      case 1: case 3: case 5: case 7: case 8: case 10: case 12:
      return 31;

      case 4: case 6: case 9: case 11:
      return 30;

      case 2:
      if( (year%400) ===0 || (year%4)===0 && (year%100) !== 0) {
        return 29;
      } else {
        return 28;
      }
      default:
        return 0;
    }
  }

  const back = () => {
    setMore(false);
    if (month == 1) {
      setYear(year-1);
      setMonth(month+11);
    }
    else {
      setMonth(month-1);
    }
  }

  const next = () => {
    setMore(false);
    if(month === 12) {
      setYear(year+1)
      setMonth(month-11);
    } else {
      setMonth(month +1);
    }
  }

  function checkThisDay(element) {
    if(element.month === thisMonth && element.day === thisDay) return true;
  }

  const thisDayClick = (e) => {
    alert("dayClick");
    setMore(true);
    setScheduleVisible(false);
    setThisYear(parseInt((e.target.id).split(',')[0]))
    setThisMonth(parseInt((e.target.id).split(',')[1]));
    setThisDay(parseInt((e.target.id).split(',')[2]));
  }

  const scheduleView = (e) => {
    setMore(false);
    setScheduleVisible(true);
    setTitle(e.target.innerText);
  }

  let size = menubar ? "120px" : "0px";

  return(
    <div>
      <div style={{marginLeft: size}} className={cx('calendar-back')}>
        <div className={cx('calendar-header')}>
          <AiFillCaretLeft color="#343742" className={cx('calendar-icons')} size="30" onClick={back}/>
          <div className={cx('calendar-date')}>{year}년 {month}월</div>
          <AiFillCaretRight color="#343742" className={cx('calendar-icons')} size="30" onClick={next}/>
        </div>

        <div className={cx('calender-div')}>
          <div>
            <div className={cx('calendar-weekend')}>일요일</div>
            <div className={cx('calendar-weekend')}>월요일</div>
            <div className={cx('calendar-weekend')}>화요일</div>
            <div className={cx('calendar-weekend')}>수요일</div>
            <div className={cx('calendar-weekend')}>목요일</div>
            <div className={cx('calendar-weekend')}>금요일</div>
            <div className={cx('calendar-weekend')}>토요일</div>
          </div>
          <CalendarList lists={lists} thisDayClick={thisDayClick} scheduleView={scheduleView}/>
        </div>
      </div>
      { more === true &&
        <MoreSchedule year={thisYear} month={thisMonth} day={thisDay} moreCancel={() => {setMore(false); alert("cancelDay")}} scheduleView={scheduleView} check={lists[lists.findIndex(checkThisDay)].schedule} />
      }
      { scheduleVisible === true &&
        <SettingSchedule textTitle={title} settingCancel={() => setScheduleVisible(false)}></SettingSchedule>
      }
    </div>

  )
}

export default Calendar;
