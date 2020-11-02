import React, { useState, useEffect } from 'react';
import styles from './Calendar.scss';
import styles2 from './CalendarItem.scss';

import classNames from 'classnames/bind';
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";
import MoreSchedule from './../MoreSchedule/MoreSchedule.js';
import SettingSchedule from './../../SettingSchedule/Calendar/SettingSchedule.js';

const cx = classNames.bind(styles);
const cx2 = classNames.bind(styles2);


const Calendar = ({menubar}) => {
  var today = new Date();

  const [load, setLoad] = useState(-1),
        [year, setYear] = useState(today.getFullYear()),
        [month, setMonth] = useState(today.getMonth()+1),
        [lists, setLists] = useState([]),
        [scheduleList, setScheduleList] = useState([]),
        [thisYear, setThisYear] = useState(''),
        [thisMonth, setThisMonth] = useState(''),
        [thisDay, setThisDay] = useState(''),
        [more, setMore] = useState(false),
        [scheduleVisible, setScheduleVisible] = useState(false),
        [title, setTitle] = useState(''),
        weeks = ['일','월','화','수','목','금','토'],
        [rightClick, setRightClick] = useState(-1),
        [thisSchedule, setThisSchedule] = useState([]),
        [positionX, setPositionX] = useState(''),
        [positionY, setPositionY] = useState(''),
        [deleteSchedule, setDeleteSchedule] = useState(-1),
        [moreDelete, setMoreDelete] = useState([]),
        labels = ['#FF8080', '#FFD080', '#FFFB80', '#A2FF80', '#80FFE1', '#8880FF', '#EE80FF', '#7D7D7D'],
        [thisLabel, setThisLabel] = useState(''),
        [labelChange, setLabelChange] = useState(-1),
        [scheduleItem, setScheduleItem] = useState([]),
        [dateN, setDateN] = useState(-1),
        [scheduleN, setScheduleN] = useState(-1),
        [settingDelete, setSettingDelete] = useState(-1);

  useEffect(() => {
      var week = new Date(year, month-1).getDay();
      var nextWeek = new Date(year, month).getDay();

      if(settingDelete !== -1) {
        scheduleList.splice(settingDelete, 1, {key: scheduleList[settingDelete].key, schedule: scheduleItem});
        for(var index=0;index<scheduleList[settingDelete].schedule.length;index++) {
          scheduleList[settingDelete].schedule.splice(index,1, {key: index+1, title: scheduleList[settingDelete].schedule[index].title, color: scheduleList[settingDelete].schedule[index].color});
        }
        setSettingDelete(-1);
        setScheduleItem([]);
      }

      if(labelChange !== -1) {
        scheduleList.splice(labelChange, 1, {key: scheduleList[labelChange].key, schedule: scheduleItem});
        setLabelChange(-1);
        setScheduleItem([]);
      }

      if(moreDelete.length > 1) {
        scheduleList.splice(moreDelete[1]-1, 1, {key: moreDelete[1], schedule: scheduleList[moreDelete[1]-1].schedule.splice(moreDelete[0],1)});
        for(var index=0;index<scheduleList[moreDelete[1]-1].schedule.length;index++) {
          scheduleList[moreDelete[1]-1].schedule.splice(index,1, {key: index+1, title: scheduleList[moreDelete[1]-1].schedule[index].title, color: scheduleList[moreDelete[1]-1].schedule[index].color});
        }
        setMoreDelete([]);
      }

      if(deleteSchedule !== -1) {
        scheduleList[deleteSchedule-1].schedule.splice(0,1)
        scheduleList.splice(deleteSchedule-1, 1, {key: deleteSchedule, schedule: scheduleList[deleteSchedule-1].schedule.splice(0,1)});

        for(var index=0;index<scheduleList[deleteSchedule-1].schedule.length;index++) {
          scheduleList[deleteSchedule-1].schedule.splice(index,1, {key: index+1, title: scheduleList[deleteSchedule-1].schedule[index].title, color: scheduleList[deleteSchedule-1].schedule[index].color});
        }
        setDeleteSchedule(-1);
      }

      if(load === -1){
        setLists([]);
        var array = [];
        if (month === 1) {
          var i = 0;
          var j = 0;
          for (i = dayCount(year-1, month+11)-week; i < dayCount(year-1, month+11); i++) {
            j += 1;
            let day = i+1;
            array.splice(j, 1, {key: j, year: year-1, month: month+11, day: day});
          }
          for (i = 0; i < dayCount(year, month); i++) {
            j += 1;
            let day = i+1;
            array.splice(j, 1, {key: j, year: year, month: month, day: day});
          }

          if (week < 4) {
            for (i = 0; i < 14-nextWeek; i++) {
              j += 1;
              let day = i+1;
              array.splice(j, 1, {key: j, year: year, month: month+1, day: day});
            }
          } else {
            for (i = 0; i < 7-nextWeek; i++) {
              j += 1;
              let day = i+1;
              array.splice(j, 1, {key: j, year: year, month: month+1, day: day});
            }
          }
        } else if (month === 12) {
          var i = 0;
          var j = 0;
          for (i = dayCount(year, month-1)-week; i < dayCount(year, month-1); i++) {
            j += 1;
            let day = i+1;
            array.splice(j, 1, {key: j, year: year, month: month-1, day: day});
          }
          for (i = 0; i < dayCount(year, month); i++) {
            j += 1;
            let day = i+1;
            array.splice(j, 1, {key: j, year: year, month: month, day: day});
          }

          if (week < 4) {
            for (i = 0; i < 14-nextWeek; i++) {
              j += 1;
              let day = i+1;
              array.splice(j, 1, {key: j, year: year+1, month: month-11, day: day});
            }
          } else {
            for (i = 0; i < 7-nextWeek; i++) {
              j += 1;
              let day = i+1;
              array.splice(j, 1, {key: j, year: year+1, month: month-11, day: day});
            }
          }

        } else {
          var i = 0;
          var j = 0;
          for (i = dayCount(year, month-1)-week; i < dayCount(year, month-1); i++) {
            j += 1;
            let day = i+1;
            array.splice(j, 1, {key: j, year: year, month: month-1, day: day});
          }
          for (i = 0; i < dayCount(year, month); i++) {
            j += 1;
            let day = i+1;
            array.splice(j, 1, {key: j, year: year, month: month, day: day});
          }

          if ((dayCount(year, month) === 30 && week < 5) || (dayCount(year, month) === 31 && week < 4) || (dayCount(year, month) === 29 && week < 6) || dayCount(year, month) === 28) {
            for (i = 0; i < 14-nextWeek; i++) {
              j += 1;
              let day = i+1;
              array.splice(j, 1, {key: j, year: year, month: month+1, day: day});
            }
          } else {
            for (i = 0; i < 7-nextWeek; i++) {
              j += 1;
              let day = i+1;
              array.splice(j, 1, {key: j, year: year, month: month+1, day: day});
            }
          }
        }

        for(var index=0;index<42;index++) {
          scheduleList.splice(index, 1, {key: index+1, schedule: [{key: 1, title: 'test', color: '#757575'},{key: 2, title: 'test2', color: '#757575'}]});
        }

        setLists(array);
        setLoad(-2);
      } else {
        console.log(scheduleList);

        return;
      }

  },[year, month, load, deleteSchedule, more, labelChange, settingDelete]);


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
    setLoad(-1);
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
    setLoad(-1);
    if(month === 12) {
      setYear(year+1)
      setMonth(month-11);
    } else {
      setMonth(month +1);
    }
  }

  // function checkThisDay(element) {
  //   if(element.month === thisMonth && element.day === thisDay) return true;
  // }

  const thisDayClick = (e, num) => {
    moreDelete.push(num);

    setMore(true);
    setScheduleVisible(false);
    setThisYear(parseInt((e.target.id).split(',')[0]))
    setThisMonth(parseInt((e.target.id).split(',')[1]));
    setThisDay(parseInt((e.target.id).split(',')[2]));

    for(var index=0;index<42;index++) {
      if(parseInt((e.target.id).split(',')[3]) === scheduleList[index].key) {
        setThisSchedule(scheduleList[index].schedule);
      }
    }
  }

  // const scheduleView = (e) => {
  //   setMore(false);
  //   setScheduleVisible(true);
  //   setTitle(e.target.innerText);
  // }
  

  const handleRightClick = (e, num) => {
    e.preventDefault();

    if(e.button == 2) {
      setMore(false);
      setMoreDelete([]);

      setPositionX(e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft + 20);
      setPositionY(e.clientY + document.body.scrollTop + document.documentElement.scrollTop+ 5);
      setRightClick(num);
    }
  }

  const handleDeleteSchedule = () => {
    setDeleteSchedule(rightClick);    
    setRightClick(-1);
  }

  const handleTitleDelete = (num) => {
    moreDelete.unshift(num);
    setMore(false);
  }

  const handleSettingDelete = (num1, num2) => {
    var array = scheduleList[num1-1].schedule;
    array.splice(num2-1, 1);
    setScheduleItem(array);
    setSettingDelete(num1-1);
  }

  const handleScheduleClick = (num, object) => {
    setTitle(object.title);
    setDateN(num);
    setScheduleN(object.key);
    setThisLabel(object.color)
    setScheduleVisible(true);
  }

  const handleLabelcolor = (label, num1, num2) => {
    var array = scheduleList[num1-1].schedule;
    array.splice(num2-1, 1, {key: array[num2-1].key, title: array[num2-1].title, color: label});
    setScheduleItem(array);
    setLabelChange(num1-1);
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
            { weeks.map((week) => (
              <div className={cx('calendar-weekend')}>{week}요일</div>
            ))}
          </div>
          
          { lists.map(
            list => (
          <div className={cx2('calendarItem-back')}>
            <div 
              className={cx2('calendarItem-day')} 
              id={[list.year, list.month, list.day, list.key]} 
              onClick={(e) => thisDayClick(e, list.key)}
            >
              {list.day}
            </div>
            { list.key === scheduleList[list.key-1].key &&
              <div>
                { scheduleList[list.key-1].schedule.length !== 0 &&
                  <div 
                    className={cx2('calendar-schedule0')} 
                    style={{backgroundColor: scheduleList[list.key-1].schedule[0].color}} 
                    onContextMenu={(e) => handleRightClick(e, list.key)}
                    onClick={() => handleScheduleClick(list.key, scheduleList[list.key-1].schedule[0])}
                  >
                    {scheduleList[list.key-1].schedule[0].title}
                  </div>
                }
             
                { scheduleList[list.key-1].schedule.length >= 2 &&
                  <div className={cx2('calendar-more')} id={[list.year, list.month, list.day, list.key]} onClick={(e) => thisDayClick(e)}>더보기</div>
                }
              </div>
            }
          </div>
          ))}
        </div>
      </div>
      { rightClick !== -1 &&
        <div className={cx2('calendar-clickDelete')}>
          <div className={cx2('calendar-clickDelete-back')} onClick={() => setRightClick(-1)}>.</div>
          <div className={cx2('calendar-clickDelete-text')} style={{top: positionY, left: positionX}} onClick={() => handleDeleteSchedule()}>삭제</div>
        </div>
      }
      { more === true &&
        <MoreSchedule 
          year={thisYear} 
          month={thisMonth} 
          day={thisDay} 
          moreCancel={() => {setMore(false);setMoreDelete([]);}}
          thisSchedule={thisSchedule}
          handleTitleDelete={handleTitleDelete}
        />
      }
      { scheduleVisible === true &&
        <SettingSchedule 
          textTitle={title} 
          settingCancel={() => setScheduleVisible(false)}
          noneVisibleSchedule={() => setScheduleVisible(false)}
          labels={labels}
          thisLabel={thisLabel}
          handleLabelcolor={handleLabelcolor}
          dateN={dateN}
          scheduleN={scheduleN}
          handleSettingDelete={handleSettingDelete}
          handleChangeTitle
        >
        </SettingSchedule>
      }
    </div>

  )
}

export default Calendar;
