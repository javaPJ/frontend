import React, { useState, useEffect } from 'react';
import styles from './SettingSchedule.scss';
import classNames from 'classnames/bind';

import { AiOutlineClose, AiOutlineDelete, AiOutlinePlus, AiOutlineMinus, AiOutlineSave } from "react-icons/ai";

const cx = classNames.bind(styles);

const SettingSchedule = ({
    textTitle, 
    settingCancel, 
    dateN,
    scheduleN,
    handleChangeTitle, 
    labels, 
    thisLabel, 
    handleLabelcolor, 
    handleSettingDelete, 
    noneVisibleSchedule,
    handleSaveSchedule,
    changeCheckList, 
    startYear,
    startMonth,
    startDay,
    endYear,
    endMonth,
    endDay,
    handleStartDateChange,
    handleEndDateChange
  }) => {
    
  const [title, setTitle] = useState(textTitle),
        [writer, setWriter] = useState('nickname'),
        [content, setContent] = useState(''),
        [year, setYear] = useState('2020'),
        [month, setMonth] = useState('10'),
        [day, setDay] = useState('9'),
        [startDate, setStartDate] = useState(''),
        [endDate, setEndDate] = useState(''),
        [members, setMembers] = useState([]),
        [memberTarget, setMemberTarget] = useState([]),
        [memberCheck, setMemberCheck] = useState(false),
        [thisMember, setThisMember] = useState([]),
        [taskCheck, setTaskCheck] = useState(false),
        [height, setHeight] = useState('20px'),
        [labelSelect, setLabelSelect] = useState(''),
        [titleChange, setTitleChange] = useState(false),
        [titleInput, setTitleInput] = useState('');

  useEffect(() => {
    setMembers([]);

    if(memberCheck === true) {
      const memberId = memberTarget[0];

      if(memberId === undefined) {
        setMembers([
          {key: 1, name: 'user', check: false},
          {key: 2, name: 'user2', check: false},
          {key: 3, name: 'user3', check: false},
          {key: 4, name: 'user4', check: false},
          {key: 5, name: 'useruseruseruseruseruser', check: false},
        ]);
        return;
      } else {
        setMembers([
          {key: 1, name: 'user', check: false},
          {key: 2, name: 'user2', check: false},
          {key: 3, name: 'user3', check: false},
          {key: 4, name: 'user4', check: false},
          {key: 5, name: 'useruseruseruseruseruser', check: false},
        ]);
  
        if(thisMember.length > 0) {
          for(var i = 0; i < members.length; i++) {
            for(var j = 0; j< thisMember.length; j++){
              if(members[i]['name'] === thisMember[j]['name']){
                members.splice(i, 1, {key: i, name: thisMember[j]['name'], check: true});
              }
            }
          }
        }
  
        const memberName = memberTarget[1];

        const thisCheck = members[parseInt(memberId)-1].check;
  
        if(thisCheck == false) {
          members.splice(parseInt(memberId)-1, 1, {key: parseInt(memberId), name: memberName, check: !thisCheck});
  
          thisMember.push({key: parseInt(memberId), name: memberName});
        } else {
          members.splice(parseInt(memberId)-1, 1, {key: parseInt(memberId), name: memberName, check: !thisCheck});
  
          for(i = 0; i < thisMember.length; i++) {
            if(thisMember[i]['name'] === memberName) {
              thisMember.splice(i, 1);
            }
          }
        }
      }

      setMemberTarget([]);

    }


    if(startMonth < 10) {
      startMonth = '0' + startMonth;
    }

    if(endMonth < 10) {
      endMonth = '0' + endMonth;
    }

    if(startDay < 10) {
      startDay = '0' + startDay;
    }

    if(endDay < 10) {
      endDay = '0' + endDay;
    }



    setStartDate(startYear+'-'+startMonth+'-'+startDay);
    setEndDate(endYear+'-'+endMonth+'-'+endDay);

    
  }, [title, memberTarget, thisMember, memberCheck])

  const ySize = () => {
    var sTextarea = document.getElementById("text_content");
    sTextarea.style.height = "1px";
    sTextarea.style.height = sTextarea.scrollHeight + "px";
    setHeight(sTextarea.style.height);
  }

  const memberList = members.map(
    member => {
      let decoration = member.check ? "line-through" : "none";
      let color = member.check ? "red" : "black";
      return (
        <div className={cx('settingschedule-list-ID')} style={{textDecoration: decoration, color: color}} id={member.key} onClick={(e) => setMemberTarget([e.target.id, e.target.innerText])}>{member.name}</div>
      )
    }
  )

  const thisMemerList = thisMember.map(
    member => {
      return(
        <div className={cx('settingschedule-thisList-ID')}>{member.name}</div>
      )
    }
  )

  const labelCircle = labels.map(
    label => {
      let borderColor = (labelSelect === '')  
      ? ((thisLabel === label) ? "#43454D" : label) 
      : (labelSelect === label) ? "#43454D" : label;
      return(
        <div>
        { scheduleN !== -1 ?
          <div 
            className={cx('settingschedule-labelCircle')} 
            style={{backgroundColor: label, color: label, border: "3px solid" + borderColor}} 
            onClick={(e) => {handleLabelcolor(label, dateN, scheduleN);setLabelSelect(label);}}
          >
            .
          </div> 
          :  
          <div 
            className={cx('settingschedule-labelCircle')} 
            style={{backgroundColor: label, color: label, border: "3px solid" + borderColor}} 
            onClick={(e) => {setLabelSelect(label);}}
          >
            .
          </div> 
        }
        </div>
      )
    }
  )

  const handleThisTitle = (e) => {
    if(e.keyCode === 13) {
      if(e.target.value === ''){
        alert("다시 한 번 확인해주세요.");
        setTitleChange(false);
      } else {
        var check = false;
        for(var index=0;index<changeCheckList.length;index++) {
          if(e.target.value === changeCheckList[index]) {
            check = true;
          }
        }
        if(check === false) {
          handleChangeTitle(e, dateN, scheduleN);
          setTitle(e.target.value);
          setTitleChange(false);
        } else {
          alert("중복된 제목이 있습니다. 다시 한 번 확인해주세요.");
          setTitleChange(false);
        }
      }
    }

    if(e.keyCode === 27) {
      setTitleChange(false);
    }
  }

  const handleCreateTitle = (e) => {
    if(e.keyCode===13){
      if(e.target.value === '') {
        alert("다시 한 번 확인해주세요.");
      } else {
        var check = false;
        for(var index=0;index<changeCheckList.length;index++) {
          if(e.target.value === changeCheckList[index]) {
            check = true;
          }
        }
        if(check === false) {
          setTitleInput(e.target.value);
          setTitleChange(true)
        } else {
          alert("중복된 제목이 있습니다. 다시 한 번 확인해주세요.");
          e.target.value = '';
        }
        
      }
    }
  }

  const handleSave = () => {
    if(titleInput === '') {
      alert("제목을 확인해주세요.");
    } else {
      handleSaveSchedule(dateN, titleInput, labelSelect);
      setLabelSelect('');
    }
  }

  const handleSetStartDate = (e) => {
    if(scheduleN === -1) {
      alert("일정을 생성 후 날짜를 조정해주세요.");
    } else {
      setStartDate(e.target.value);
      handleStartDateChange(textTitle, endDate, e);
    }
  }

  const handleSetEndDate = (e) => {
    if(scheduleN === -1) {
      alert("일정을 생성 후 날짜를 조정해주세요.");
    } else {
      setEndDate(e.target.value);
      handleEndDateChange(textTitle, startDate, e);
    }
  }

  return (
    <div className={cx('settingschedule-back')}>
      <div className={cx('settingschedule-header')}>
        { scheduleN === -1 ?
        <div className={cx('settingschedule-icon')}>
          <div className={cx('settingschedule-deleteIcon')}>
            <AiOutlineSave 
              size="25"
              onClick={() => handleSave()}
            ></AiOutlineSave>
          </div>
          <div className={cx('settingschedule-closeIcon')}>
            <AiOutlineClose onClick={() => {settingCancel();setLabelSelect('')}} size="25"></AiOutlineClose>
          </div>
        </div>
        :
        <div className={cx('settingschedule-icon')}>
          <div className={cx('settingschedule-deleteIcon')}>
            <AiOutlineDelete 
              size="25"
              onClick={() => {handleSettingDelete(dateN, scheduleN);noneVisibleSchedule()}} 
            ></AiOutlineDelete>
          </div>
          <div className={cx('settingschedule-closeIcon')}>
            <AiOutlineClose onClick={() => {settingCancel();setLabelSelect('')}} size="25"></AiOutlineClose>
          </div>
        </div>
        }
        { scheduleN === -1 ?
          titleChange === false ?
          <input className={cx('settingschedule-title-input')} 
            onKeyDown={(e) => handleCreateTitle(e)} 
            autoFocus
          />
          :
          <div className={cx('settingschedule-title')} title={titleInput}>{titleInput}</div>
          :
         titleChange === false ?
          <div className={cx('settingschedule-title')} onClick={() => setTitleChange(true)} title={title}>{title}</div>
          :
          <input className={cx('settingschedule-title-input')} onKeyDown={(e) => handleThisTitle(e)} autoFocus/>
        }
        <div className={cx('settingschedule-writer-impormation')}>
          <div className={cx('settingschedule-writer')}>작성자 {writer}</div>
          <div className={cx('settingschedule-writeday')}>작성일 {year}-{month}-{day}</div>
        </div>
      </div>
      <div className={cx('settingschedule-content')}>
        <div className={cx('settingschedule-textDiv')}>
          <div className={cx('settingschedule-textTitle')}>내용</div>
          <textarea 
          className={cx('settingschedule-textInput')} 
          style={{height: height}} 
          id="text_content" 
          onKeyDown={() => ySize()} 
          onKeyUp={() => ySize()} 
          onChange={(e) => setContent(e.target.value)} 
          placeHolder="내용을 입력해주세요."
          ></textarea>
        </div>

        <div className={cx('settingschedule-dayDiv')}>
          <div className={cx('settingschedule-dayTitle')}>일정</div>
          <div className={cx('settingschedule-dayContent')}>
            <div className={cx('settingschedule-StartDay')}>시작일</div>
            <input 
              type="date" 
              className={cx('settingschedule-dayInput')} 
              onChange={(e) => handleSetStartDate(e)} 
              value={startDate}
            />
          </div>
          <div className={cx('settingschedule-dayContent')}>
            <div className={cx('settingschedule-EndDay')}>마감일</div>
            <input 
              type="date" 
              className={cx('settingschedule-dayInput')} 
              onChange={(e) => handleSetEndDate(e)} 
              value={endDate}
            />
          </div>
        </div>

        <div className={cx('settingschedule-memberDiv')}>
          <div className={cx('settingschedule-memberTitle')}>배정된 멤버</div>
          { memberCheck === true ?
            <div className={cx('settingSchedule-MemberList')}>
              <div>
                <AiOutlineMinus 
                  size="15" 
                  className={cx('settingschedule-plusIcon')} 
                  onClick={() => setMemberCheck(false)}
                ></AiOutlineMinus>
              </div>
              <div className={cx('settingshedule-listBox')}>
                <div className={cx('settingschedule-list')}>{memberList}</div>
              </div>
              <div className={cx('settingschedule-thisList')}>{thisMemerList}</div>
            </div>
            :
            <div className={cx('settingSchedule-MemberList')}>
              <div>
                <AiOutlinePlus 
                  size="15" 
                  className={cx('settingschedule-plusIcon')} 
                  onClick={() => setMemberCheck(true)}
                ></AiOutlinePlus>
              </div>
              <div className={cx('settingschedule-thisList')}>{thisMemerList}</div>
            </div>
          }
        </div>

        <div className={cx('settingschedule-taskDiv')}>
          <div className={cx('settingschedule-taskTitle')}>업무상태</div>
          { taskCheck === true ?
            <div className={cx('settingSchedule-TaskList')}>
              <AiOutlineMinus 
                size="15" 
                className={cx('settingschedule-plusIcon')}
                onClick={() => setTaskCheck(false)}
              ></AiOutlineMinus>
            </div>
            :
            <div className={cx('settingSchedule-TaskList')}>
              <AiOutlinePlus 
                size="15" 
                className={cx('settingschedule-plusIcon')}
                onClick={() => setTaskCheck(true)}
              ></AiOutlinePlus>
            </div>
          }
        </div>

        <div className={cx('settingschedule-labelDiv')}>
          <div className={cx('settingschedule-labelTitle')}>라벨</div>
          <div className={cx('settingschedule-labelPosition')}>{labelCircle}</div>
        </div>
      </div>
    </div>
  )
}

export default SettingSchedule;
