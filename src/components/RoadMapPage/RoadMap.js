import React, { useEffect, useState} from 'react';
import styles from './RoadMap.scss';
import classNames from 'classnames/bind';
import { AiOutlinePlus } from "react-icons/ai";
import SettingSchedule from '.././SettingSchedule/RoadMap/SettingSchedule';

const cx = classNames.bind(styles);
const axios = require('axios');

const RoadMap = ({ menubar, leader, teamMate, team, nickname, accessToken, readScheduleList }) => {
    var today = new Date();

    const [load, setLoad] = useState(-1),  //처음 로드했는지 확인하는 변수

          [dayLists, setDayLists] = useState([]), //날짜 리스트
          [scheduleLists, setScheduleLists] = useState([]),  //스케쥴 리스트
          [calendarLists, setCalendarLists] = useState([]), //캘린더 리스트
          [checkTitleArray, setCheckTitleArray] = useState([]), //스케쥴 확인 배열

          [scheduleVisible, setScheduleVisible] = useState(false), //setting 뷰
          [title, setTitle] = useState(''), //setting에 보낼 제목

          labels = ['#FF8080', '#FFD080', '#FFFB80', '#A2FF80', '#80FFE1', '#8880FF', '#EE80FF', '#7D7D7D'], //lable 색상
          [thisLabel, setThisLabel] = useState(''), //라벨 선택 색상
          [changeLabel, setChangeLabel] = useState(-1), //라벨 선택 변수
          [selectLabel, setSelectLabel] = useState(''), //라벨 색상 변수

          [scheduleN, setScheduleN] = useState(-1), //schedule Number

          [startYear, setStartYaer] = useState(''), //시작년도
          [startMonth, setStartMonth] = useState(''), //시작월
          [startDay, setStartDay] = useState(''), //시작일

          [endYear, setEndYaer] = useState(''), //마감년도
          [endMonth, setEndMonth] = useState(''), //마감월
          [endDay, setEndDay] = useState(''), //마감일

          [settingDelete, setSettingDelete] = useState(-1), //setting 삭제 변수
          
          [saveSchedule, setSaveSchedule] = useState(-1), //save schedule 변수
          [saveTitle, setSaveTitle] = useState(''), //save 제목 변수
          [saveColor, setSaveColor] = useState(''), //save 색상 변수
          [saveStart, setSaveStart] = useState(''), //save 시작일 변수
          [saveEnd, setSaveEnd] = useState(''), //save 마감일 변수

          [changeStart, setChangeStart] = useState(''), //시작일 변경 변수
          [changeEnd, setChangeEnd] = useState(''), //마감일 변경 변수
          [changeDate, setChangeDate] = useState(-1), //날짜 변경 값 변수

          [changeTitle, setChangeTitle] = useState(''), //제목 변경 변수
          [changeTitleN, setChangeTitleN] = useState(-1), //제목 변경 값 변수

          [rightClick, setRightClick] = useState(-1),
          [positionX, setPositionX] = useState(0),
          [positionY, setPositionY] = useState(0),

          [teamMember, setTeamMember] = useState([]),

          [calendaerReadScheduleList, setCalendarReadScheduleList] = useState([]),  //readScheduleList를 저장하기 위한 배열
          [clear, setClear] = useState(false);


    // 1초 후 readScehdulList를 불러옴
    var timer = setTimeout(function() { 
      if(readScheduleList.length !== 0 && clear === false) {
        setCalendarReadScheduleList(readScheduleList);
        setClear(true);
        clearTimeout(timer);
      }
    }, 1000);

    //처음 로드했을 때 날짜와 스케쥴을 불러옴..
    useEffect(() => {
        if(load === -1) {
            var array = [];
            var i = 0;
            var j = 0;

            var date1 = today;
            let date2 = new Date(Date.parse(date1)-90*1000*60*60*24);

            for(i=0;i<180;i++) {
                let settingDate =  new Date(Date.parse(date2)+i*1000*60*60*24);
                if(i === 0 || settingDate.getDate() === 1) {
                    var k=0;
                    array.push({key: j, year: settingDate.getFullYear(), month: settingDate.getMonth()+1, day: [{key: k, day : settingDate.getDate()}]});
                    k++;
                    j++;
                } else {
                    let list = array[j-1].day;
                    list.push({key: k, day : settingDate.getDate()})
                    k++;
                }
            }
            setDayLists(array);

            var array2 = [];
            var i = 0;

            for(i=0;i<calendaerReadScheduleList.length;i++) {
                var writer = '';

                for(var index3=0;index3<teamMate.length;index3++) {
                    if(calendaerReadScheduleList[i].writer === teamMate[index3].user) {
                        writer = teamMate[index3].name;
                    }
                }
    
                if(writer === '') {
                    writer = leader;
                }

                array2.push({key: i, title: calendaerReadScheduleList[i].title, writer: writer, writeDate: calendaerReadScheduleList[i].date.substring(0, 10), contents: calendaerReadScheduleList[i].contents});
            }

            setScheduleLists(array2);

            var array3 = [];

            var i = 0;
            for(i=0;i<calendaerReadScheduleList.length;i++) {

                var SYear = calendaerReadScheduleList[i].startDate.substring(0, 4);
                var SMonth = calendaerReadScheduleList[i].startDate.substring(5, 7);
                var SDay = calendaerReadScheduleList[i].startDate.substring(8, 10);

                var EYear = calendaerReadScheduleList[i].endDate.substring(0, 4);
                var EMonth = calendaerReadScheduleList[i].endDate.substring(5, 7);
                var EDay = calendaerReadScheduleList[i].endDate.substring(8, 10);

                array3.push({key: i, startDay: new Date(SYear, SMonth - 1, SDay), endDay: new Date(EYear, EMonth - 1, EDay), color: calendaerReadScheduleList[i].color});
            }

            setCalendarLists(array3);


            var memberArray = [];
            for(var i=0;i<teamMate.length;i++) {
                memberArray.push({key: i+2, name: teamMate[i].name, check: false});
            }

            memberArray.unshift({key: 1, name: leader, check: false});
            setTeamMember(memberArray);

            setLoad(0);
        } else if(load === 0) {
            var array = [];
            var array2 = [];
            var array3 = [];


            for(var index3=0;index3<calendarLists.length;index3++) {
                var startElapsedMSec = 0;
                if(today.getTime() >= calendarLists[index3].startDay.getTime()) {
                    startElapsedMSec = today.getTime() - calendarLists[index3].startDay.getTime();
                    const startElapsedDay = startElapsedMSec / 1000 / 60 / 60 / 24;
                    array.push(90 - Math.round(startElapsedDay) + 1)
                } else {
                    startElapsedMSec = calendarLists[index3].startDay.getTime() - today.getTime();
                    const startElapsedDay = startElapsedMSec / 1000 / 60 / 60 / 24;
                    array.push(90 + Math.round(startElapsedDay) + 1)
                }

                var endElapsedMSec = 0;
                if(today.getTime() >= calendarLists[index3].endDay.getTime()) {
                    endElapsedMSec = today.getTime() - calendarLists[index3].endDay.getTime();
                    const endElapsedDay = endElapsedMSec / 1000 / 60 / 60 / 24;
                    array2.push(90 - Math.round(endElapsedDay) + 1)
                } else {
                    endElapsedMSec = calendarLists[index3].endDay.getTime() - today.getTime();
                    const endElapsedDay = endElapsedMSec / 1000 / 60 / 60 / 24;
                    array2.push(90 + Math.round(endElapsedDay) + 1)
                }
            }

            for(var i=0;i<calendarLists.length;i++) {
                array3.push({key: i, start: array[i], end: array2[i]-array[i]});
            }

            

            for(var i=0;i<calendarLists.length;i++) {
                calendarLists.splice(i,1,{key: calendarLists[i].key, startDay: calendarLists[i].startDay, endDay: calendarLists[i].endDay, start: array3[i].start, end: array3[i].end, color: calendarLists[i].color, writer: scheduleLists[i].writer, writeDate: scheduleLists[i].writeDate, contents: scheduleLists[i].contents });
            }

            for(var i=0;i<calendarLists.length;i++) {
                checkTitleArray.push(scheduleLists[i]);
            }

            setLoad(1);
        } else {
        }
    }, [load]);
    
    //처음 로드했을 때 달력의 scroll 조절함
    useEffect(() => {
        var scroll = document.getElementById("headerScroll");
        scroll.scrollLeft = 5984.4/2-33.2*5;
    }, [dayLists])

    //header scroll 할 시 schedule scroll 조절
    const handleRightLeftHeaderScroll = () => {
        var scroll = document.getElementById("headerScroll");
        var schedule = document.getElementById("scheduleScroll");
        schedule.scrollLeft = scroll.scrollLeft;
    } 

    //schedule scroll 할 시 header scroll 조절
    const handleRightLeftScheduleScroll = () => {
        var scroll = document.getElementById("headerScroll");
        var schedule = document.getElementById("scheduleScroll");
        scroll.scrollLeft = schedule.scrollLeft;
    }

    //text scroll 할 시 schedule scroll 조절
    const handleUpDownTextScroll = () => {
        var scroll = document.getElementById("textScroll");
        var schedule = document.getElementById("scheduleScroll");
        schedule.scrollTop = scroll.scrollTop;
    }

    //schedule scroll 할 시 text scroll 조절
    const handleUpDownScheduleScroll = () => {
        var scroll = document.getElementById("textScroll");
        var schedule = document.getElementById("scheduleScroll");
        scroll.scrollTop = schedule.scrollTop;
    }

    const [writer,setWriter] = useState(''),//setting으로 보낼 작성자, 작성일, 내용
          [writeDate, setWriteDate] = useState(''),
          [contents, setContents] = useState('');

    //Schedule Click하여 setting 열어줄 때
    const handleScheduleClick = (num, color, start, end, writer, writeDate, contents) => {
        setTitle(scheduleLists[num].title);
        setThisLabel(color);
        setScheduleN(num);

        setStartYaer(start.getFullYear());
        setStartMonth(start.getMonth()+1);
        setStartDay(start.getDate());

        setEndYaer(end.getFullYear());
        setEndMonth(end.getMonth()+1);
        setEndDay(end.getDate());

        setWriter(writer)
        setWriteDate(writeDate)
        setContents(contents)

        setScheduleVisible(true);
    }

    //label 색상 업데이트
    useEffect(() => {
        if(changeLabel !== -1 ){
            calendarLists.splice(changeLabel, 1, {key: calendarLists[changeLabel].key, startDay: calendarLists[changeLabel].startDay, endDay: calendarLists[changeLabel].endDay, start: calendarLists[changeLabel].start, end: calendarLists[changeLabel].end, color: selectLabel});
            setSelectLabel('');
            setChangeLabel(-1);
        }
    },[changeLabel])

    //setting에서 삭제
    useEffect(() => {
        if(settingDelete !== -1) {
            scheduleLists.splice(settingDelete,1);
            calendarLists.splice(settingDelete,1);

            for(var i=0;i<scheduleLists.length;i++) {
                scheduleLists.splice(i,1, {key: i, title: scheduleLists[i].title});
            }

            for(var i=0;i<calendarLists.length;i++) {
                calendarLists.splice(i,1, {key: i, startDay: calendarLists[i].startDay, endDay: calendarLists[i].endDay, start: calendarLists[i].start, end: calendarLists[i].end, color: calendarLists[i].color});
            }

            setSettingDelete(-1);
            setScheduleVisible(false);
        }
    }, [settingDelete])

    //Plus button Click
    const handleAddSchedule = () => {
        setScheduleN(-1);

        setStartYaer('');
        setStartMonth('');
        setStartDay('');

        setEndYaer('');
        setEndMonth('');
        setEndDay('');

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

        setScheduleVisible(true);
    }

    //Save Schedule
    const handleSaveSchedule = (title, content, color, start, end, thisMember) => {
        setSaveTitle(title);
        setSaveColor(color);
        setSaveStart(start);
        setSaveEnd(end);

        var array = [];

        for(var i=0;i<thisMember.length;i++) {
            array.push(thisMember[i].name);
        }

        var teamNum = 0;

        for(var i=0;i<team.length;i++) {
            if(team[i].online === true) {
            teamNum = i;
            }
        }

        axios.post(`http://3.35.229.52:5000/api/project/createschedule`, {
            title: title,
            team: team[teamNum].title,
            contents: content,
            writer: nickname,
            startDate: start,
            endDate: end,
            member: array,
            stat: '',
            color: color
        },
        {
            headers: {
            authentication: `${accessToken}`
            }
        })
        .then(res => {
            console.log(res);
        })
        .catch(err => {
            console.log(err);
        })


        setSaveSchedule(0);
        setScheduleVisible(false);
    }

    //Save schedule update
    useEffect(() => {
        if(saveSchedule !== -1) {
            
            setSaveSchedule(-1);
        }
    }, [saveSchedule])

    //Date Change
    
    const handleDateChange = (num, start, end) => {
        setChangeStart(start);
        setChangeEnd(end);
        setChangeDate(num);
    }

    //Date Change update
    useEffect(() => {
        if(changeDate !== -1) {
            var SYear = changeStart.substring(0,4);
            var SMonth = changeStart.substring(5,7);
            var SDay = changeStart.substring(8,10);

            var EYear = changeEnd.substring(0,4);
            var EMonth = changeEnd.substring(5,7);
            var EDay = changeEnd.substring(8,10);

            var monthLength=0;
            var startValue, endValue;

            for(var index=0;index<7;index++) {
                for(var index2=0;index2<dayLists[index].day.length;index2++) {
                    if(parseInt(SYear) === dayLists[index].year && parseInt(SMonth) === dayLists[index].month && parseInt(SDay) === dayLists[index].day[index2].day){
                        startValue = monthLength+index2;
                    }
                    if(parseInt(EYear) === dayLists[index].year && parseInt(EMonth) === dayLists[index].month && parseInt(EDay) === dayLists[index].day[index2].day){
                        endValue = monthLength+index2;
                    }
                }
                monthLength = monthLength + dayLists[index].day.length;
            }

            calendarLists.splice(changeDate ,1, {key: calendarLists[changeDate].key, startDay: new Date(SYear, SMonth-1, SDay), endDay: new Date(EYear, EMonth-1, EDay), start: startValue, end: endValue-startValue,  color: calendarLists[changeDate].color});

            setChangeStart('');
            setChangeEnd('');
            setChangeDate(-1);
            setScheduleVisible(false);
        }
    }, [changeDate])

    //Title change
    const handleChangeTitle = (num, title) => {
        setChangeTitle(title);
        setChangeTitleN(num);
    }

    //Title change update
    useEffect(() => {
        if(changeTitleN !== -1) {
            scheduleLists.splice(changeTitleN,1,{key: scheduleLists[changeTitleN], title: changeTitle});

            setChangeTitleN(-1);
            setScheduleVisible(false);
        }
    }, [changeTitleN])

    //Schedule Right Click
    const handleRightClick = (e, num) => {
        e.preventDefault();
    
        if(e.button == 2) {
          setScheduleVisible(false);
          setPositionX(e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft + 20);
          setPositionY(e.clientY + document.body.scrollTop + document.documentElement.scrollTop+ 5);
          setRightClick(num);
        }
    }

    let size = menubar ? "120px" : "0px";

    return (
        <div style={{width: "100%", height: "100%", position: "absolute"}}>
            <div style={{marginLeft: size}} className={cx('roadmap-back')}>
                <div className={cx('roadmap-header')}>
                    <div className={cx('roadmap-title-back')}>
                        <div className={cx('roadmap-title')}>작업명</div>
                        <div className={cx('roadmap-plusButton')} onClick={() => handleAddSchedule()}>
                            <AiOutlinePlus size="27" color="white" ></AiOutlinePlus>
                        </div>
                    </div>
                    <div id="headerScroll" className={cx('roadmap-calendar-back')} onScroll={() => handleRightLeftHeaderScroll()}>
                        <div className={cx('roadmap-calendar')}>
                            { dayLists.map(
                                Monthlist => (
                                <div className={cx('roadmap-month')}>
                                    <div className={cx('roadmap-N-month')}>{Monthlist.month}월</div>
                                    <div className={cx('roadmap-days')}>
                                        { Monthlist.day.map(
                                            dayItem => (
                                            Monthlist.month === today.getMonth()+1 && dayItem.day === today.getDate() ?
                                            <div className={cx('roadmap-day')} style={{backgroundColor: "#8D99AE"}}>{dayItem.day}</div>
                                            :
                                            <div className={cx('roadmap-day')}>{dayItem.day}</div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className={cx('roadmap-main')}>
                    <div id="textScroll" className={cx('roadmap-text-list')} onScroll={() => handleUpDownTextScroll()}>
                        { scheduleLists.map(
                            list => (
                            <div className={cx('roadmap-text')}>{list.title}</div>
                        ))}
                    </div>
                    
                    <div id="scheduleScroll" className={cx('roadmap-schedule-back')} onScroll={() => {handleRightLeftScheduleScroll();handleUpDownScheduleScroll();}}>
                        <div className={cx('roadmap-schedule-list')}>
                            { calendarLists.map(
                                list => (
                                <div className={cx('roadmap-schedule')}>
                                    <div 
                                        style={{backgroundColor: list.color, color: list.color, marginLeft: list.start*33.2+1.2, width: 33.2*(list.end+1)}} 
                                        className={cx('roadmap-schedule-label')}
                                        onClick={() => handleScheduleClick(list.key, list.color, list.startDay, list.endDay, list.writer, list.writeDate, list.contents)}
                                        onContextMenu={(e) => handleRightClick(e, list.key)}
                                    >.
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            { rightClick !== -1 &&
                <div className={cx('roadmap-clickDelete')}>
                    <div className={cx('roadmap-clickDelete-back')} onClick={() => setRightClick(-1)}>.</div>
                    <div 
                        className={cx('roadmap-clickDelete-text')} 
                        style={{top: positionY, left: positionX}} 
                        onClick={() => {setSettingDelete(rightClick);setRightClick(-1);}}
                    >
                        삭제
                    </div>
                </div>
            }
            { scheduleVisible === true &&
                <SettingSchedule
                    textTitle={title}
                    settingCancel={() => {setScheduleVisible(false);setScheduleN(-1)}}
                    labels={labels}
                    handleLabelcolor={(color, num) => {setSelectLabel(color);setChangeLabel(num);}}
                    thisLabel={thisLabel}
                    scheduleN={scheduleN}
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
                    handleSettingDelete={(num) => setSettingDelete(num)}
                    changeCheckList={checkTitleArray}
                    handleSaveSchedule={handleSaveSchedule}
                    handleStartDateChange={handleDateChange}
                    handleEndDateChange={handleDateChange}
                    handleChangeTitle={handleChangeTitle}
                >
                </SettingSchedule>
            }
        </div>
    );
}

export default RoadMap;