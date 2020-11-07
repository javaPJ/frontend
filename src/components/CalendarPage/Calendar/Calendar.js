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
        [schedule, setSchedule] = useState([]),
        [lists, setLists] = useState([]),
        [scheduleChangeN, setScheduleChangeN] = useState(-1),
        [scheduleList, setScheduleList] = useState([]),
        [thisYear, setThisYear] = useState(''),
        [thisMonth, setThisMonth] = useState(''),
        [thisDay, setThisDay] = useState(''),
        [startYear, setStartYear] = useState(''),
        [startMonth, setStartMonth] = useState(''),
        [startDay, setStartDay] = useState(''),
        [endYear, setEndYear] = useState(''),
        [endMonth, setEndMonth] = useState(''),
        [endDay, setEndDay] = useState(''),
        [more, setMore] = useState(false),
        [scheduleVisible, setScheduleVisible] = useState(false),
        [title, setTitle] = useState(''),
        weeks = ['일','월','화','수','목','금','토'],
        [rightClick, setRightClick] = useState(-1),
        [thisSchedule, setThisSchedule] = useState([]),
        [positionX, setPositionX] = useState(''),
        [positionY, setPositionY] = useState(''),
        [deleteSchedule, setDeleteSchedule] = useState(-1),
        [moreDeleteN, setMoreDeleteN] = useState(-1),
        [moreDelete, setMoreDelete] = useState([]),
        labels = ['#FF8080', '#FFD080', '#FFFB80', '#A2FF80', '#80FFE1', '#8880FF', '#EE80FF', '#7D7D7D'],
        [thisLabel, setThisLabel] = useState(''),
        [labelChange, setLabelChange] = useState(-1),
        [scheduleItem, setScheduleItem] = useState([]),
        [dateN, setDateN] = useState(-1),
        [scheduleN, setScheduleN] = useState(-1),
        [settingDelete, setSettingDelete] = useState(-1),
        [saveSchedule, setSaveSchedule] = useState(-1),
        [changeTitleN, setChangeTitleN] = useState(-1);


  useEffect(() => {
      var week = new Date(year, month-1).getDay();
      var nextWeek = new Date(year, month).getDay();


      if(changeTitleN !== -1) {
        setScheduleItem([]);
        setChangeTitleN(-1);
      }

      if(saveSchedule !== -1) {
        scheduleList.splice(saveSchedule,1, {key: scheduleList[saveSchedule].key, schedule: scheduleItem});
        setSaveSchedule(-1);
        setScheduleItem([]);
        setMoreDelete([]);
      }

      if(settingDelete !== -1) {
        scheduleList.splice(settingDelete, 1, {key: settingDelete+1, schedule: scheduleItem});
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

      if(moreDeleteN !== -1) {
        scheduleList.splice(moreDelete[1]-1, 1, {key: moreDelete[1], schedule: scheduleItem});
        for(var index=0;index<scheduleList[moreDelete[1]-1].schedule.length;index++) {
          scheduleList[moreDelete[1]-1].schedule.splice(index,1, {key: index+1, title: scheduleList[moreDelete[1]-1].schedule[index].title, color: scheduleList[moreDelete[1]-1].schedule[index].color});
        }
        setScheduleItem([])
        setMoreDelete([]);
        setMoreDeleteN(-1);
      }

      if(deleteSchedule !== -1) {
        scheduleList.splice(deleteSchedule-1, 1, {key: deleteSchedule, schedule: scheduleItem});

        for(var index=0;index<scheduleList[deleteSchedule-1].schedule.length;index++) {
          scheduleList[deleteSchedule-1].schedule.splice(index,1, {key: index+1, title: scheduleList[deleteSchedule-1].schedule[index].title, color: scheduleList[deleteSchedule-1].schedule[index].color});
        }
        setDeleteSchedule(-1);
        setScheduleItem([]);
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
          scheduleList.splice(index, 1, {key: index+1, schedule: []});
        }

        setLists(array);
        setLoad(-2);
      }
        
      if(scheduleChangeN !== -1){
        var settingArray = [];
        
        for(var index=0;index<42;index++) {
          var listArray = scheduleList[index].schedule;
          for(var index2=0;index2<listArray.length;index2++) {
            settingArray[settingArray.length] = listArray[index2].title;
          }
        }
        setSchedule(settingArray);
        setScheduleChangeN(-1);
      }

  },[year, month, load, deleteSchedule, moreDeleteN, labelChange, settingDelete, saveSchedule, changeTitleN, scheduleChangeN]);


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

  const thisDayClick = (e, num) => {
    moreDelete.push(num);
    setMore(true);
    setScheduleVisible(false);
    setThisYear(parseInt((e.target.id).split(',')[0]))
    setThisMonth(parseInt((e.target.id).split(',')[1]));
    setThisDay(parseInt((e.target.id).split(',')[2]));

    setStartYear('');
    setStartMonth('');
    setStartDay('');
    setEndYear('');
    setEndMonth('');
    setEndDay('');

    for(var index=0;index<42;index++) {
      if(parseInt((e.target.id).split(',')[3]) === scheduleList[index].key) {
        setThisSchedule(scheduleList[index].schedule);
      }
    }
  }

  const handleRightClick = (e, num) => {
    e.preventDefault();

    if(e.button == 2) {
      setMore(false);
      setMoreDelete([]);
      setScheduleVisible(false);
      setPositionX(e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft + 20);
      setPositionY(e.clientY + document.body.scrollTop + document.documentElement.scrollTop+ 5);
      setRightClick(num);
      setScheduleChangeN(num);
    }
  }

  const handleDeleteSchedule = () => {
    var array = scheduleList[rightClick-1].schedule;
    array.splice(0,1)
    setScheduleItem(array);
    setDeleteSchedule(rightClick);    
    setRightClick(-1);
    setScheduleChangeN(0);
  }

  const handleTitleDelete = (num) => {
    setMoreDeleteN(num);
    moreDelete.unshift(num);
    var array = scheduleList[moreDelete[1]-1].schedule;
    array.splice(num-1, 1);
    setScheduleItem(array);
    setMore(false);
    setScheduleChangeN(num);
  }

  const handleSettingDelete = (num1, num2) => {
    var array = scheduleList[num1-1].schedule;
    array.splice(num2-1, 1);
    setScheduleItem(array);
    setSettingDelete(num1-1);
    setScheduleChangeN(num1);
  }

  const handleScheduleClick = (num, object) => {
    setTitle(object[0].title);
    setDateN(num);
    setScheduleN(object[0].key);

    for(var index=0;index<scheduleList.length;index++) {
      var check = false;
      for(var index2=0;index2<scheduleList[index].schedule.length;index2++) {
        if(scheduleList[index].schedule[index2] !== undefined) {
          if(object[0].title === scheduleList[index].schedule[index2].title) {
            setStartYear(lists[index].year);
            setStartMonth(lists[index].month);
            setStartDay(lists[index].day);
            check = true;
            break;
          }
          if(check === true) break;
        }
        if(check === true) break;
      }
      if(check === true) break;
    }

    for(var index=0;index<scheduleList.length;index++) {
      for(var index2=0;index2<scheduleList[index].schedule.length;index2++) {
        if(scheduleList[index].schedule[index2] !== undefined) {
          if(object[0].title === scheduleList[index].schedule[index2].title) {
            setEndYear(lists[index].year);
            setEndMonth(lists[index].month);
            setEndDay(lists[index].day);
          } else {
            setEndYear(lists[num-1].year);
            setEndMonth(lists[num-1].month);
            setEndDay(lists[num-1].day);
          }
        }
      }
    }

    setThisLabel(object[0].color)
    setScheduleVisible(true);
  }

  const handleLabelcolor = (label, num1, num2) => {
    var array = scheduleList[num1-1].schedule;
    array.splice(num2-1, 1, {key: array[num2-1].key, title: array[num2-1].title, color: label});
    setScheduleItem(array);
    setLabelChange(num1-1);
  }

  const handleMoreScheduleClick = (object, num) => {
    setTitle(object[num-1].title);
    setDateN(moreDelete[0]);
    setScheduleN(object[num-1].key);
    setThisLabel(object[num-1].color);

    for(var index=0;index<scheduleList.length;index++) {
      var check = false;
      for(var index2=0;index2<scheduleList[index].schedule.length;index2++) {
        if(scheduleList[index].schedule[index2] !== undefined) {
          if(object[num-1].title === scheduleList[index].schedule[index2].title) {
            setStartYear(lists[index].year);
            setStartMonth(lists[index].month);
            setStartDay(lists[index].day);
            check = true;
            break;
          }
          if(check === true) break;
        }
        if(check === true) break;
      }
      if(check === true) break;
    }

    for(var index=0;index<scheduleList.length;index++) {
      for(var index2=0;index2<scheduleList[index].schedule.length;index2++) {
        if(scheduleList[index].schedule[index2] !== undefined) {
          if(object[0].title === scheduleList[index].schedule[index2].title) {
            setEndYear(lists[index].year);
            setEndMonth(lists[index].month);
            setEndDay(lists[index].day);
          } else {
            setEndYear(lists[moreDelete[0]-1].year);
            setEndMonth(lists[moreDelete[0]-1].month);
            setEndDay(lists[moreDelete[0]-1].day);
          }
        }
      }
    }
    setMore(false);
    setScheduleVisible(true);
  }

  const handleAddSchedule = () => {

    setTitle(' ');
    setDateN(moreDelete[0]);
    setScheduleN(-1);
    setThisLabel('white');
    setStartYear('');
    setStartMonth('');
    setStartDay('');
    setEndYear('');
    setEndMonth('');
    setEndDay('');
    setMore(false);
    setScheduleVisible(true);
    setScheduleChangeN(0);
  }

  const handleSaveSchedule = (num, input, label) => {

    setScheduleVisible(false);
    var array = scheduleList[num-1].schedule;
    for(var index=0;index<array.length;index++) {
      array.splice(index, 1, {key: index+2, title: array[index].title, color: array[index].color});
    }
    if(label === '') {
      label = "#C0C0C0";
    }
    array.unshift({key:1, title: input, color: label});
    setScheduleItem(array);
    setSaveSchedule(num-1);
    setDateN(-1);
    setScheduleChangeN(num);
  }

  const handleChangeTitle = (e, num1, num2) => {

    setScheduleVisible(false);
    var array = scheduleList[num1-1].schedule;
    array.splice(num2-1, 1, {key: num2, title: e.target.value, color: array[num2-1].color});
    setScheduleItem(array);
    setChangeTitleN(num1);
    setScheduleChangeN(num1);
  }

  const handleStartDateChange = (year, month, day, title, endDate, e) => {
    var startnum = 0;

    var label = '';

    for(var index=0;index<42;index++) {
      var listsArray = scheduleList[index].schedule
      for(var index2=0;index2<listsArray.length;index2++) {
        if(listsArray[index2].title === title) {
          label = scheduleList[index].schedule[index2].color;
          scheduleList[index].schedule.splice(index2, 1);
        }
      }
    }

    var SYear = e.target.value.substring(0,4);
    var SMonth = e.target.value.substring(5,7);
    var SDay = e.target.value.substring(8,10);


    for(var index=0;index<42;index++) {
      if(lists[index].year === parseInt(SYear) && lists[index].month === parseInt(SMonth) && lists[index].day === parseInt(SDay)) {
        startnum = index;
      }
    }

    var EYear = endDate.substring(0,4);
    var EMonth = endDate.substring(5,7);
    var EDay = endDate.substring(8,10);

    var date1 = new Date(SYear, SMonth, SDay);
    var date2 = new Date(EYear, EMonth, EDay);
    var elapsedMSec = date2.getTime() - date1.getTime(); 
    const elapsedDay = elapsedMSec / 1000 / 60 / 60 / 24;

    for(var index=startnum;index<elapsedDay+startnum+1;index++) {
      var array = scheduleList[index].schedule;
      if(array.length !== 0) {
        for(var index2=0;index2<array.length;index2++) {
          array.splice(index2, 1, {key: index2+2, title: array[index2].title, color: array[index2].color});
        }
      }
      scheduleList[index].schedule.unshift({key: 1, title: title, color: label});
    }

    setScheduleVisible(false);
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
                    onClick={() => handleScheduleClick(list.key, scheduleList[list.key-1].schedule)}
                  >
                    {scheduleList[list.key-1].schedule[0].title}
                  </div>
                }
             
                { scheduleList[list.key-1].schedule.length >= 2 &&
                  <div 
                    className={cx2('calendar-more')} 
                    id={[list.year, list.month, list.day, list.key]} 
                    onClick={(e) => thisDayClick(e, list.key)}
                  >
                    더보기
                  </div>
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
          <div 
            className={cx2('calendar-clickDelete-text')} 
            style={{top: positionY, left: positionX}} 
            onClick={() => handleDeleteSchedule()}
          >
            삭제
          </div>
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
          handleMoreScheduleClick={handleMoreScheduleClick}
          handleAddSchedule={handleAddSchedule}
        />
      }
      { scheduleVisible === true &&
        <SettingSchedule 
          textTitle={title} 
          settingCancel={() => {setScheduleVisible(false);setMoreDelete([]);}}
          noneVisibleSchedule={() => setScheduleVisible(false)}
          labels={labels}
          thisLabel={thisLabel}
          handleLabelcolor={handleLabelcolor}
          dateN={dateN}
          scheduleN={scheduleN}
          handleSettingDelete={handleSettingDelete}
          handleChangeTitle={handleChangeTitle}
          handleSaveSchedule={handleSaveSchedule}
          changeCheckList = {schedule}
          startYear={startYear}
          startMonth={startMonth}
          startDay={startDay}
          endYear={endYear}
          endMonth={endMonth}
          endDay={endDay}
          handleStartDateChange={handleStartDateChange}
        >
        </SettingSchedule>
      }
    </div>

  )
}

export default Calendar;
