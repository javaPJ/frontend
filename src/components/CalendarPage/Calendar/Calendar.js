import React, { useState, useEffect } from 'react';
import styles from './Calendar.scss';
import styles2 from './CalendarItem.scss';
import classNames from 'classnames/bind';
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";
import MoreSchedule from './../MoreSchedule/MoreSchedule.js';
import SettingSchedule from './../../SettingSchedule/Calendar/SettingSchedule.js';

const cx = classNames.bind(styles);
const cx2 = classNames.bind(styles2);
const axios = require('axios');

const Calendar = ({ menubar, leader, teamMate, team, nickname, accessToken, readScheduleList }) => {
  let ThisToday = new Date();
  var today = new Date();

  const [load, setLoad] = useState(-1),
    [year, setYear] = useState(today.getFullYear()),
    [month, setMonth] = useState(today.getMonth() + 1),
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
    weeks = ['일', '월', '화', '수', '목', '금', '토'],
    [rightClick, setRightClick] = useState(-1),
    [thisSchedule, setThisSchedule] = useState([]),
    [positionX, setPositionX] = useState(''),
    [positionY, setPositionY] = useState(''),
    [deleteSchedule, setDeleteSchedule] = useState(''),
    [moreDeleteN, setMoreDeleteN] = useState(''),
    [moreDelete, setMoreDelete] = useState([]),
    labels = ['#FF8080', '#FFD080', '#FFFB80', '#A2FF80', '#80FFE1', '#8880FF', '#EE80FF', '#7D7D7D'],
    [thisLabel, setThisLabel] = useState(''),
    [labelChange, setLabelChange] = useState(['', '']),
    [scheduleItem, setScheduleItem] = useState([]),
    [dateN, setDateN] = useState(-1),
    [scheduleN, setScheduleN] = useState(-1),
    [settingDelete, setSettingDelete] = useState(''),
    [saveSchedule, setSaveSchedule] = useState(-1),
    [saveTitle, setSaveTitle] = useState(''),
    [saveContent, setSaveContent] = useState(''),
    [saveColor, setSaveColor] = useState(''),
    [saveStart, setSaveStart] = useState(''),
    [saveEnd, setSaveEnd] = useState(''),
    [changeTitleN, setChangeTitleN] = useState(['', '']),
    [calendaerReadScheduleList, setCalendarReadScheduleList] = useState([]);


  useEffect(() => {
    var week = new Date(year, month - 1).getDay();
    var nextWeek = new Date(year, month).getDay();

    if (changeTitleN[0] !== '') {
      for (var index = 0; index < scheduleList.length; index++) {
        for (var index2 = 0; index2 < scheduleList[index].schedule.length; index2++) {
          if (scheduleList[index].schedule[index2].title === changeTitleN[0]) {
            scheduleList[index].schedule.splice(index2, 1, { key: scheduleList[index].schedule[index2].key, title: changeTitleN[1], color: scheduleList[index].schedule[index2].color });
          }
        }
      }
      setScheduleItem([]);
      setChangeTitleN(['', '']);
    }

    if (settingDelete !== '') {
      for (index = 0; index < scheduleList.length; index++) {
        for (index2 = 0; index2 < scheduleList[index].schedule.length; index2++) {
          if (scheduleList[index].schedule[index2].title === settingDelete) {
            scheduleList[index].schedule.splice(index2, 1);
          }
        }
      }
      setSettingDelete('');
      setScheduleItem([]);
    }

    if (labelChange[0] !== '') {
      for (index = 0; index < scheduleList.length; index++) {
        for (index2 = 0; index2 < scheduleList[index].schedule.length; index2++) {
          if (scheduleList[index].schedule[index2].title === labelChange[0]) {
            scheduleList[index].schedule.splice(index2, 1, { key: scheduleList[index].schedule[index2].key, title: scheduleList[index].schedule[index2].title, color: labelChange[1] });
          }
        }
      }

      setLabelChange(['', '']);
    }

    if (moreDeleteN !== '') {
      for (index = 0; index < scheduleList.length; index++) {
        for (index2 = 0; index2 < scheduleList[index].schedule.length; index2++) {
          if (scheduleList[index].schedule[index2].title === moreDeleteN) {
            scheduleList[index].schedule.splice(index2, 1);
          }
        }
      }

      setMoreDelete([]);
      setMoreDeleteN('');
    }

    if (deleteSchedule !== '') {
      for (index = 0; index < scheduleList.length; index++) {
        for (index2 = 0; index2 < scheduleList[index].schedule.length; index2++) {
          if (scheduleList[index].schedule[index2].title === deleteSchedule) {
            scheduleList[index].schedule.splice(index2, 1);
          }
        }
      }

      setDeleteSchedule('');
    }

    if (load === -1) {
      setLists([]);
      var i = 0;
      var j = 0;
      var array = [];
      if (month === 1) {
        i = 0;
        j = 0;
        for (i = dayCount(year - 1, month + 11) - week; i < dayCount(year - 1, month + 11); i++) {
          j += 1;
          let day = i + 1;
          array.splice(j, 1, { key: j, year: year - 1, month: month + 11, day: day });
        }
        for (i = 0; i < dayCount(year, month); i++) {
          j += 1;
          let day = i + 1;
          array.splice(j, 1, { key: j, year: year, month: month, day: day });
        }

        if (week < 4) {
          for (i = 0; i < 14 - nextWeek; i++) {
            j += 1;
            let day = i + 1;
            array.splice(j, 1, { key: j, year: year, month: month + 1, day: day });
          }
        } else {
          for (i = 0; i < 7 - nextWeek; i++) {
            j += 1;
            let day = i + 1;
            array.splice(j, 1, { key: j, year: year, month: month + 1, day: day });
          }
        }
      } else if (month === 12) {
        i = 0;
        j = 0;
        for (i = dayCount(year, month - 1) - week; i < dayCount(year, month - 1); i++) {
          j += 1;
          let day = i + 1;
          array.splice(j, 1, { key: j, year: year, month: month - 1, day: day });
        }
        for (i = 0; i < dayCount(year, month); i++) {
          j += 1;
          let day = i + 1;
          array.splice(j, 1, { key: j, year: year, month: month, day: day });
        }

        if (week < 4) {
          for (i = 0; i < 14 - nextWeek; i++) {
            j += 1;
            let day = i + 1;
            array.splice(j, 1, { key: j, year: year + 1, month: month - 11, day: day });
          }
        } else {
          for (i = 0; i < 7 - nextWeek; i++) {
            j += 1;
            let day = i + 1;
            array.splice(j, 1, { key: j, year: year + 1, month: month - 11, day: day });
          }
        }

      } else {
        i = 0;
        j = 0;
        for (i = dayCount(year, month - 1) - week; i < dayCount(year, month - 1); i++) {
          j += 1;
          let day = i + 1;
          array.splice(j, 1, { key: j, year: year, month: month - 1, day: day });
        }
        for (i = 0; i < dayCount(year, month); i++) {
          j += 1;
          let day = i + 1;
          array.splice(j, 1, { key: j, year: year, month: month, day: day });
        }

        if ((dayCount(year, month) === 30 && week < 5) || (dayCount(year, month) === 31 && week < 4) || (dayCount(year, month) === 29 && week < 6) || dayCount(year, month) === 28) {
          for (i = 0; i < 14 - nextWeek; i++) {
            j += 1;
            let day = i + 1;
            array.splice(j, 1, { key: j, year: year, month: month + 1, day: day });
          }
        } else {
          for (i = 0; i < 7 - nextWeek; i++) {
            j += 1;
            let day = i + 1;
            array.splice(j, 1, { key: j, year: year, month: month + 1, day: day });
          }
        }
      }

      for (index = 0; index < 42; index++) {
        scheduleList.splice(index, 1, { key: index + 1, schedule: [] });
      }

      setLists(array);
      setLoad(-2);
    }

    if (scheduleChangeN !== -1) {
      var settingArray = [];

      for (index = 0; index < 42; index++) {
        var listArray = scheduleList[index].schedule;
        for (index2 = 0; index2 < listArray.length; index2++) {
          settingArray[settingArray.length] = listArray[index2].title;
        }
      }
      setSchedule(settingArray);
      setScheduleChangeN(-1);
    }

  }, [year, month, load, deleteSchedule, moreDeleteN, labelChange, settingDelete, saveSchedule, changeTitleN, scheduleChangeN]);

  function dayCount(year, month) {
    switch (month) {
      case 1: case 3: case 5: case 7: case 8: case 10: case 12:
        return 31;

      case 4: case 6: case 9: case 11:
        return 30;

      case 2:
        if ((year % 400) === 0 || (year % 4) === 0 && (year % 100) !== 0) {
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
    if (month === 1) {
      setYear(year - 1);
      setMonth(month + 11);
    }
    else {
      setMonth(month - 1);
    }
  }

  const next = () => {
    setMore(false);
    setLoad(-1);
    if (month === 12) {
      setYear(year + 1)
      setMonth(month - 11);
    } else {
      setMonth(month + 1);
    }
  }
  
  const [threeSecond, setThreeSecond] = useState(false);
  const [clear, setClear] = useState(false);

  var timer = setTimeout(function() { 
    if(readScheduleList.length !== 0 && clear === false) {
      setThreeSecond(true);
      setCalendarReadScheduleList(readScheduleList);
      setClear(true);
      clearTimeout(timer);
    }
  }, 1000);


  const [startRead, setStartRead] = useState(false);
  var timer2 = setTimeout(function() {
    setStartRead(true);
    clearTimeout(timer2);
  }, 2000)

  const [teamMember, setTeamMember] = useState([]);
  const [readLength, setReadLength] = useState(-1);

  useEffect(() => {
    if(threeSecond === true && load === -2 && startRead === true && calendaerReadScheduleList.length >readLength ) {
      setReadLength(calendaerReadScheduleList.length);

      for(var readIndex=0;readIndex<calendaerReadScheduleList.length;readIndex++) {
        var SYear = calendaerReadScheduleList[readIndex].startDate.substring(0, 4);
        var SMonth = calendaerReadScheduleList[readIndex].startDate.substring(5, 7);
        var SDay = calendaerReadScheduleList[readIndex].startDate.substring(8, 10);
  
        var EYear = calendaerReadScheduleList[readIndex].endDate.substring(0, 4);
        var EMonth = calendaerReadScheduleList[readIndex].endDate.substring(5, 7);
        var EDay = calendaerReadScheduleList[readIndex].endDate.substring(8, 10);
  
        var startValue, endValue;
  
        for (var index = 0; index < lists.length; index++) {
          if (parseInt(SYear) === lists[index].year && parseInt(SMonth) === lists[index].month && parseInt(SDay) === lists[index].day) {
            startValue = index
          }
          if (parseInt(EYear) === lists[index].year && parseInt(EMonth) === lists[index].month && parseInt(EDay) === lists[index].day) {
            endValue = index;
          }
        }

  
        for (index = startValue; index < endValue + 1; index++) {
          var array = scheduleList[index].schedule;
  
          for (var index2 = 0; index2 < array.length; index2++) {
            array.splice(index2, 1, { key: index2 + 2, title: array[index2].title, color: array[index2].color, writer:array[index2]. writer, writeDate: array[index2].writeDate, contents: array[index2].contents })
          }

          var writer = '';


          var memberArray = [];
          for(var i=0;i<teamMate.length;i++) {
            memberArray.push({key: i+2, name: teamMate[i].name, check: false});
          }

          memberArray.unshift({key: 1, name: leader, check: false});

          setTeamMember(memberArray);

          for(var index3=0;index3<teamMate.length;index3++) {
            if(calendaerReadScheduleList[readIndex].writer === teamMate[index3].user) {
              writer = teamMate[index3].name;
            }
          }

          if(writer === '') {
            writer = leader;
          }
  
          scheduleList[index].schedule.unshift({ key: 1, title: calendaerReadScheduleList[readIndex].title, color: calendaerReadScheduleList[readIndex].color, writer: writer, writeDate: calendaerReadScheduleList[readIndex].date.substring(0, 10), contents: calendaerReadScheduleList[readIndex].contents});
        }
      }
    }
  }, [threeSecond, load, startRead, calendaerReadScheduleList])

  const thisDayClick = (e, num) => {
    moreDelete.push(num);
    setMore(true);
    setScheduleVisible(false);
    setThisYear(parseInt((e.target.id).split(',')[0]))
    setThisMonth(parseInt((e.target.id).split(',')[1]));
    setThisDay(parseInt((e.target.id).split(',')[2]));

    setStartYear(thisYear);
    setStartMonth(thisMonth);
    setStartDay(thisDay);
    setEndYear(thisYear);
    setEndMonth(thisMonth);
    setEndDay(thisDay);

    for (var index = 0; index < 42; index++) {
      if (parseInt((e.target.id).split(',')[3]) === scheduleList[index].key) {
        setThisSchedule(scheduleList[index].schedule);
      }
    }
  }

  const handleRightClick = (e, num) => {
    e.preventDefault();

    if (e.button === 2) {
      setMore(false);
      setMoreDelete([]);
      setScheduleVisible(false);
      setPositionX(e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft + 20);
      setPositionY(e.clientY + document.body.scrollTop + document.documentElement.scrollTop + 5);
      setRightClick(num);
      setScheduleChangeN(num);
    }
  }

  const handleDeleteSchedule = () => {
    var title = scheduleList[rightClick - 1].schedule[0].title;

    setDeleteSchedule(title);
    setRightClick(-1);
    setScheduleChangeN(0);
  }

  const handleTitleDelete = (num) => {
    moreDelete.unshift(num);
    var title = scheduleList[moreDelete[1] - 1].schedule[num - 1].title;
    setMoreDeleteN(title);

    setMore(false);
    setScheduleChangeN(num);
  }

  const handleSettingDelete = (num1, num2) => {
    var title = scheduleList[num1 - 1].schedule[num2 - 1].title;
    setSettingDelete(title);
    setScheduleChangeN(num1);
  }

  const [writer, setWriter] = useState(''),
        [writeDate, setWriteDate] = useState(''),
        [contents, setContents] = useState('');

  const handleScheduleClick = (num, object) => {
    setTitle(object[0].title);
    setDateN(num);
    setScheduleN(object[0].key);
    setWriter(object[0].writer);
    setWriteDate(object[0].writeDate);
    setContents(object[0].contents);

    for (var index = 0; index < scheduleList.length; index++) {
      var check = false;
      for (var index2 = 0; index2 < scheduleList[index].schedule.length; index2++) {
        if (scheduleList[index].schedule[index2] !== undefined) {
          if (object[0].title === scheduleList[index].schedule[index2].title) {
            setStartYear(lists[index].year);
            setStartMonth(lists[index].month);
            setStartDay(lists[index].day);
            check = true;
            break;
          }
          if (check === true) break;
        }
        if (check === true) break;
      }
      if (check === true) break;
    }

    for (index = 0; index < scheduleList.length; index++) {
      for (index2 = 0; index2 < scheduleList[index].schedule.length; index2++) {
        if (scheduleList[index].schedule[index2] !== undefined) {
          if (object[0].title === scheduleList[index].schedule[index2].title) {
            setEndYear(lists[index].year);
            setEndMonth(lists[index].month);
            setEndDay(lists[index].day);
          }
        }
      }
    }

    setThisLabel(object[0].color)
    setScheduleVisible(true);
  }

  const handleLabelcolor = (label, num1, num2) => {
    var title = scheduleList[num1 - 1].schedule[num2 - 1].title;
    setLabelChange([title, label]);
  }

  const handleMoreScheduleClick = (object, num) => {
    setTitle(object[num - 1].title);
    setDateN(moreDelete[0]);
    setScheduleN(object[num - 1].key);
    setThisLabel(object[num - 1].color);
    setWriteDate(object[num - 1].writeDate);
    setWriter(object[num - 1].writer);
    setContents(object[num - 1].contents);

    for (var index = 0; index < scheduleList.length; index++) {
      var check = false;
      for (var index2 = 0; index2 < scheduleList[index].schedule.length; index2++) {
        if (scheduleList[index].schedule[index2] !== undefined) {
          if (object[num - 1].title === scheduleList[index].schedule[index2].title) {
            setStartYear(lists[index].year);
            setStartMonth(lists[index].month);
            setStartDay(lists[index].day);
            check = true;
            break;
          }
          if (check === true) break;
        }
        if (check === true) break;
      }
      if (check === true) break;
    }

    for (index = 0; index < scheduleList.length; index++) {
      for (index2 = 0; index2 < scheduleList[index].schedule.length; index2++) {
        if (scheduleList[index].schedule[index2] !== undefined) {
          if (object[num - 1].title === scheduleList[index].schedule[index2].title) {
            setEndYear(lists[index].year);
            setEndMonth(lists[index].month);
            setEndDay(lists[index].day);
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
    setStartYear(thisYear.toString());
    setStartMonth(thisMonth.toString());
    setStartDay(thisDay.toString());
    setEndYear(thisYear.toString());
    setEndMonth(thisMonth.toString());
    setEndDay(thisDay.toString());

    var year = String(today.getFullYear());
    var month = today.getMonth() + 1 < 10 ? '0'+ today.getMonth() + 1 : String(today.getMonth());
    var day = today.getDate()<10 ? '0' + today.getDate() : String(today.getDate())

    setContents("");
    setWriter(leader);
    setWriteDate(year+"-"+month+"-"+day);

    var memberArray = [];
    for(var i=0;i<teamMate.length;i++) {
      memberArray.push({key: i+2, name: teamMate[i].name, check: false});
    }

    memberArray.unshift({key: 1, name: leader, check: false});

    setTeamMember(memberArray);

    setMore(false);
    setScheduleVisible(true);
    setScheduleChangeN(0);
  }

  const [saveMember, setSaveMember] = useState([]);

  const handleSaveSchedule = (input, content, label, start, end, thisMember) => {
    setScheduleVisible(false);
    setSaveTitle(input);
    setSaveContent(content)
    if (label === '') {
      setSaveColor("#A8A9Ac");
    } else {
      setSaveColor(label);
    }
    setSaveStart(start);
    setSaveEnd(end);
    setSaveMember(thisMember)
    setSaveSchedule(0);
  }

  useEffect(() => {
    if (saveSchedule !== -1) {

      var teamNum = 0;

      for(var i=0;i<team.length;i++) {
        if(team[i].online === true) {
          teamNum = i;
        }
      }

      var array = [];

      for(var i=0;i<saveMember.length;i++) {
        array.push(saveMember[i].name);
      }


      axios.post(`http://3.35.229.52:5000/api/project/createschedule`, {
        title: saveTitle,
        team: team[teamNum].title,
        contents: saveContent,
        writer: nickname,
        startDate: saveStart,
        endDate: saveEnd,
        member: array,
        stat: '',
        color: saveColor
      },
      {
        headers: {
          authentication: `${accessToken}`
        }
      })
      .then(res => {
        console.log(res);

        axios.post(`http://3.35.229.52:5000/api/project/readschedule`, {
          team: team[teamNum].title
        },{
          headers: {
            authentication: accessToken
          }
        })
        .then(res => {
          console.log(res);
          setCalendarReadScheduleList(res.data);
        })
        .catch(err => {
          console.log(err);
        })      

      })
      .catch(err => {
        console.log(err);
      })

      setSaveSchedule(-1);
      setLoad(-1);
    }
  }, [saveSchedule])


  const handleChangeTitle = (e, num1, num2) => {
    setScheduleVisible(false);
    var title = scheduleList[num1 - 1].schedule[num2 - 1].title;
    setChangeTitleN([title, e.target.value]);
  }

  const handleStartDateChange = (title, endDate, e) => {
    var startnum = 0;
    var endnum = 42;

    var label = '';

    for (var index = 0; index < 42; index++) {
      var listsArray = scheduleList[index].schedule
      for (var index2 = 0; index2 < listsArray.length; index2++) {
        if (listsArray[index2].title === title) {
          label = scheduleList[index].schedule[index2].color;
          scheduleList[index].schedule.splice(index2, 1);
        }
      }
    }

    var SYear = e.target.value.substring(0, 4);
    var SMonth = e.target.value.substring(5, 7);
    var SDay = e.target.value.substring(8, 10);


    for (index = 0; index < 42; index++) {
      if (lists[index].year === parseInt(SYear) && lists[index].month === parseInt(SMonth) && lists[index].day === parseInt(SDay)) {
        startnum = index;
      }
    }

    var EYear = endDate.substring(0, 4);
    var EMonth = endDate.substring(5, 7);
    var EDay = endDate.substring(8, 10);

    for (index = 0; index < 42; index++) {
      if (lists[index].year === parseInt(EYear) && lists[index].month === parseInt(EMonth) && lists[index].day === parseInt(EDay)) {
        endnum = index;
      }
    }

    var date1 = new Date(SYear, SMonth - 1, SDay);
    var date2 = new Date(EYear, EMonth - 1, EDay);
    var elapsedMSec = date2.getTime() - date1.getTime();
    const elapsedDay = elapsedMSec / 1000 / 60 / 60 / 24;

    if (startnum === 0) {
      for (index = startnum; index < endnum + 1; index++) {
        var array = scheduleList[index].schedule;
        if (array.length !== 0) {
          for (index2 = 0; index2 < array.length; index2++) {
            array.splice(index2, 1, { key: index2 + 2, title: array[index2].title, color: array[index2].color });
          }
        }
        scheduleList[index].schedule.unshift({ key: 1, title: title, color: label });
      }
    } else {
      for (index = startnum; index < elapsedDay + startnum + 1; index++) {
        array = scheduleList[index].schedule;
        if (array.length !== 0) {
          for (index2 = 0; index2 < array.length; index2++) {
            array.splice(index2, 1, { key: index2 + 2, title: array[index2].title, color: array[index2].color });
          }
        }
        scheduleList[index].schedule.unshift({ key: 1, title: title, color: label });
      }
    }


    setScheduleVisible(false);
  }

  const handleEndDateChange = (title, startDate, e) => {
    var endnum = 0;

    var label = '';

    for (var index = 0; index < 42; index++) {
      var listsArray = scheduleList[index].schedule
      for (var index2 = 0; index2 < listsArray.length; index2++) {
        if (listsArray[index2].title === title) {
          label = scheduleList[index].schedule[index2].color;
          scheduleList[index].schedule.splice(index2, 1);
        }
      }
    }

    let SYear = startDate.substring(0, 4);
    let SMonth = startDate.substring(5, 7);
    let SDay = startDate.substring(8, 10);


    for (var index = 0; index < 42; index++) {
      if (lists[index].year === parseInt(SYear) && lists[index].month === parseInt(SMonth) && lists[index].day === parseInt(SDay)) {
        endnum = index;
      }
    }
    let EYear = e.target.value.substring(0, 4);
    let EMonth = e.target.value.substring(5, 7);
    let EDay = e.target.value.substring(8, 10);

    let date1 = new Date(SYear, SMonth - 1, SDay);
    let date2 = new Date(EYear, EMonth - 1, EDay);
    let elapsedMSec = date2.getTime() - date1.getTime();
    const elapsedDay = elapsedMSec / 1000 / 60 / 60 / 24;

    for (index = endnum; index < elapsedDay + endnum + 1; index++) {
      if (index >= 42) {
        setScheduleVisible(false);
        return;
      }
      var array = scheduleList[index].schedule;
      if (array.length !== 0) {
        for (index2 = 0; index2 < array.length; index2++) {
          array.splice(index2, 1, { key: index2 + 2, title: array[index2].title, color: array[index2].color });
        }
      }
      scheduleList[index].schedule.unshift({ key: 1, title: title, color: label });
    }

    setScheduleVisible(false);
  }

  let size = menubar ? "310px" : "190px";

  return (
    <div style={{ width: "100%", height: "100%", position: "absolute" }}>
      <div style={{ left: size }} className={cx('calendar-back')}>
        <div className={cx('calendar-header')}>
          <AiFillCaretLeft color="#343742" className={cx('calendar-icons')} size="30" onClick={back} />
          <div className={cx('calendar-date')}>{year}년 {month}월</div>
          <AiFillCaretRight color="#343742" className={cx('calendar-icons')} size="30" onClick={next} />
        </div>

        <div className={cx('calender-div')}>
          <div>
            {weeks.map((week) => (
              <div className={cx('calendar-weekend')}>{week}요일</div>
            ))}
          </div>

          {lists.map(
            list => (
              <div className={cx2('calendarItem-back')}>
                { ((list.year === ThisToday.getFullYear()) && (list.month === ThisToday.getMonth() + 1) && (list.day === ThisToday.getDate())) ?
                  <div
                    className={cx2('calendarItem-day')}
                    id={[list.year, list.month, list.day, list.key]}
                    onClick={(e) => thisDayClick(e, list.key)}
                    style={{ backgroundColor: "#343742", color: "white" }}
                  >
                    {list.day}
                  </div>
                  :
                  <div
                    className={cx2('calendarItem-day')}
                    id={[list.year, list.month, list.day, list.key]}
                    onClick={(e) => thisDayClick(e, list.key)}
                  >
                    {list.day}
                  </div>
                }
                { list.key === scheduleList[list.key - 1].key &&
                  <div>
                    {scheduleList[list.key - 1].schedule.length !== 0 &&
                      <div
                        className={cx2('calendar-schedule0')}
                        style={{ backgroundColor: scheduleList[list.key - 1].schedule[0].color }}
                        onContextMenu={(e) => handleRightClick(e, list.key)}
                        onClick={() => handleScheduleClick(list.key, scheduleList[list.key - 1].schedule)}
                        title={scheduleList[list.key - 1].schedule[0].title}
                      >
                        {scheduleList[list.key - 1].schedule[0].title}
                      </div>
                    }

                    {scheduleList[list.key - 1].schedule.length >= 2 &&
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
            style={{ top: positionY, left: positionX }}
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
          moreCancel={() => { setMore(false); setMoreDelete([]); }}
          thisSchedule={thisSchedule}
          handleTitleDelete={handleTitleDelete}
          handleMoreScheduleClick={handleMoreScheduleClick}
          handleAddSchedule={handleAddSchedule}
        >
        </MoreSchedule>
      }
      { scheduleVisible === true &&
        <SettingSchedule
          textTitle={title}
          settingCancel={() => { setScheduleVisible(false); setMoreDelete([]); }}
          noneVisibleSchedule={() => setScheduleVisible(false)}
          labels={labels}
          thisLabel={thisLabel}
          handleLabelcolor={handleLabelcolor}
          dateN={dateN}
          scheduleN={scheduleN}
          handleSettingDelete={handleSettingDelete}
          handleChangeTitle={handleChangeTitle}
          handleSaveSchedule={handleSaveSchedule}
          changeCheckList={schedule}
          startYear={startYear}
          startMonth={startMonth}
          startDay={startDay}
          endYear={endYear}
          endMonth={endMonth}
          endDay={endDay}
          writer={writer}
          writeDate={writeDate}
          contents={contents}
          teamMember={teamMember}
          handleStartDateChange={handleStartDateChange}
          handleEndDateChange={handleEndDateChange}
        >
        </SettingSchedule>
      }
    </div>

  )
}

export default Calendar;
