import React, { useEffect, useState} from 'react';
import styles from './RoadMap.scss';
import classNames from 'classnames/bind';
import { AiOutlinePlus } from "react-icons/ai";
import SettingSchedule from '.././SettingSchedule/RoadMap/SettingSchedule';

const cx = classNames.bind(styles);

const RoadMap = ({menubar}) => {
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
          [positionY, setPositionY] = useState(0);

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
            // var date3 = today;
            // var i = 0;
            // for(i=0;i<20;i++) {
            //     array2.push({key: i, title: "test"+i});
            // }

            setScheduleLists(array2);

            var array3 = [];

            // var date3 = today;
            // var i = 0;
            // for(i=0;i<20;i++) {
            //     array3.push({key: i, startDay: new Date(Date.parse(date3)+i*1000*60*60*24), endDay: new Date(Date.parse(date3)+(i+10)*1000*60*60*24), color: "red"});
            // }

            setCalendarLists(array3);

            setLoad(1);
        } else if(load === 0) {
            var array = [];
            var array2 = [];
            var array3 = [];
            var monthLength = 0;

            for(var index=0;index<7;index++) {
                for(var index2=0;index2<dayLists[index].day.length;index2++) {
                    for(var index3=0;index3<20;index3++) {
                        if(calendarLists[index3].startDay.getFullYear() === dayLists[index].year && calendarLists[index3].startDay.getMonth()+1 === dayLists[index].month && calendarLists[index3].startDay.getDate() === dayLists[index].day[index2].day){
                            array.push(monthLength+index2);
                        }
                        if(calendarLists[index3].endDay.getFullYear() === dayLists[index].year && calendarLists[index3].endDay.getMonth()+1 === dayLists[index].month && calendarLists[index3].endDay.getDate() === dayLists[index].day[index2].day){
                            array2.push(monthLength+index2);
                        }
                    }
                }
                monthLength = monthLength + dayLists[index].day.length;
            }

            for(var i=0;i<20;i++) {
                array3.push({key: i, start: array[i], end: array2[i]-array[i]});
            }

            for(var i=0;i<20;i++) {
                calendarLists.splice(i,1,{key: calendarLists[i].key, startDay: calendarLists[i].startDay, endDay: calendarLists[i].endDay, start: array3[i].start, end: array3[i].end, color: calendarLists[i].color});
            }

            for(var i=0;i<20;i++) {
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

    //Schedule Click하여 setting 열어줄 때
    const handleScheduleClick = (num, color, start, end) => {
        setTitle(scheduleLists[num].title);
        setThisLabel(color);
        setScheduleN(num);

        setStartYaer(start.getFullYear());
        setStartMonth(start.getMonth()+1);
        setStartDay(start.getDate());

        setEndYaer(end.getFullYear());
        setEndMonth(end.getMonth()+1);
        setEndDay(end.getDate());

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

        setScheduleVisible(true);
    }

    //Save Schedule
    const handleSaveSchedule = (title, color, start, end) => {
        setSaveTitle(title);
        setSaveColor(color);
        setSaveStart(start);
        setSaveEnd(end);
        setSaveSchedule(0);
        setScheduleVisible(false);
    }

    //Save schedule update
    useEffect(() => {
        if(saveSchedule !== -1) {
            scheduleLists.unshift({key: 0, title: saveTitle});

            for(var i =0;i<scheduleLists.length;i++) {
                scheduleLists.splice(i,1,{key:i, title: scheduleLists[i].title});
            }

            var SYear = saveStart.substring(0,4);
            var SMonth = saveStart.substring(5,7);
            var SDay = saveStart.substring(8,10);

            var EYear = saveEnd.substring(0,4);
            var EMonth = saveEnd.substring(5,7);
            var EDay = saveEnd.substring(8,10);

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

            calendarLists.unshift({key: 0, startDay: new Date(SYear, SMonth-1, SDay), endDay: new Date(EYear, EMonth-1, EDay), start: startValue, end: endValue-startValue, color: saveColor});

            for(var i=0;i<calendarLists.length;i++) {
                calendarLists.splice(i,1, {key: i, startDay: calendarLists[i].startDay, endDay: calendarLists[i].endDay, start: calendarLists[i].start, end: calendarLists[i].end, color: calendarLists[i].color});
            }
            
            setSaveTitle('');
            setSaveColor('');
            setSaveStart('');
            setSaveEnd('');

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
                                        onClick={() => handleScheduleClick(list.key, list.color, list.startDay, list.endDay)}
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