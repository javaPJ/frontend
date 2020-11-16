import React, { useState, useEffect } from 'react';
import styles from './SettingSchedule.scss';
import classNames from 'classnames/bind';

import { AiOutlineClose, AiOutlineDelete, AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";

const cx = classNames.bind(styles);

const SettingSchedule = ({
    textTitle, 
    settingCancel, 
    handleChangeTitle, 
    groupN, 
    itemN, 
    labels, 
    thisLabel, 
    handleLabelcolor, 
    handleSettingDelete, 
    noneVisibleSchedule,
    grpList,
    handleTaskClick
  }) => {
    
  const [title, setTitle] = useState(textTitle),
        [writer, setWriter] = useState('nickname'),
        [content, setContent] = useState(''),
        [year, setYear] = useState('2020'),
        [month, setMonth] = useState('10'),
        [day, setDay] = useState('9'),
        [members, setMembers] = useState([]),
        [memberTarget, setMemberTarget] = useState([]),
        [memberCheck, setMemberCheck] = useState(false),
        [thisMember, setThisMember] = useState([]),
        [tasks, setTasks] = useState([]),
        [taskTarget, setTaskTarget] = useState([]),
        [taskCheck, setTaskCheck] = useState(false),
        [thisTask, setThisTask] = useState(grpList[groupN]),
        [height, setHeight] = useState('20px'),
        [labelSelect, setLabelSelect] = useState(''),
        [titleChange, setTitleChange] = useState(false);

  useEffect(() => {
    setMembers([]);
    setTasks([]);

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

    if(taskCheck === true) {

      const taskId = taskTarget[0];

      if(taskId === undefined) {
        var array = [];

        for(var index=0;index<grpList.length;index++) {
          array.push({key: index+1, name: grpList[index]});
        }
        setTasks(array);

        return;
      } else {
        var array = [];

        for(var index=0;index<grpList.length;index++) {
          array.push({key: index+1, name: grpList[index]});
        }
        setTasks(array);

        setThisTask(taskTarget[1]);
      }

      setTaskTarget([]);
      setTaskCheck(false);
    } 
    
  }, [title, memberTarget, thisMember, memberCheck, taskTarget, thisTask, taskCheck])

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

  const taskList = tasks.map(
    task => {
      let decoration = task.check ? "line-through" : "none";
      let color = task.check ? "red" : "black";
      return (
        <div 
          className={cx('settingschedule-list-ID')} 
          style={{textDecoration: decoration, color: color}} 
          id={task.key} 
          onClick={(e) => {
            setTaskTarget([e.target.id, e.target.innerText]);
            handleTaskClick(groupN, itemN, e.target.id);
            noneVisibleSchedule();
          }}
        >
          {task.name}
        </div>
      )
    }
  )

  const thistask = (thisTask !== '') && <div className={cx('settingschedule-thisList-ID')}>{thisTask}</div>

  const labelCircle = labels.map(
    label => {
      let borderColor = (labelSelect === '')  
      ? ((thisLabel === label) ? "#43454D" : label) 
      : (labelSelect === label) ? "#43454D" : label;
      return(
        <div 
          className={cx('settingschedule-labelCircle')} 
          style={{backgroundColor: label, color: label, border: "3px solid" + borderColor}} 
          onClick={(e) => {handleLabelcolor(label, groupN, itemN);setLabelSelect(label)}}
        >
          .
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
        handleChangeTitle(e, groupN, itemN);
        setTitle(e.target.value);
        setTitleChange(false);
      }
    }

    if(e.keyCode === 27) {
      setTitleChange(false);
    }
  }

  const handleDayChange = () => {
    alert("해당 페이지에서는 날짜를 지정할 수 없습니다.");
  }

  return (
    <div className={cx('settingschedule-back')}>
      <div className={cx('settingschedule-header')}>
        <div className={cx('settingschedule-icon')}>
          <div className={cx('settingschedule-deleteIcon')}>
            <AiOutlineDelete 
              size="25"
              onClick={() => {handleSettingDelete(groupN, itemN);noneVisibleSchedule()}} 
            ></AiOutlineDelete>
          </div>
          <div className={cx('settingschedule-closeIcon')}>
            <AiOutlineClose onClick={() => settingCancel()} size="25"></AiOutlineClose>
          </div>
        </div>
        { titleChange === false ?
          <div className={cx('settingschedule-title')} onClick={() => setTitleChange(true)}>{title}</div>
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
            <input type="date" className={cx('settingschedule-dayInput')} onChange={() => handleDayChange()} value=""/>
          </div>
          <div className={cx('settingschedule-dayContent')}>
            <div className={cx('settingschedule-EndDay')}>마감일</div>
            <input type="date" className={cx('settingschedule-dayInput')} onChange={() => handleDayChange()} value=""/>
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
                  onClick={() => {setMemberCheck(true);setTaskCheck(false);}}
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
              <div>
                <AiOutlineMinus 
                  size="15" 
                  className={cx('settingschedule-plusIcon')} 
                  onClick={() => setTaskCheck(false)}
                ></AiOutlineMinus>
              </div>
              <div className={cx('settingshedule-listBox')}>
                <div className={cx('settingschedule-list')}>{taskList}</div>
              </div>
              <div className={cx('settingschedule-thisList')}>{thistask}</div>
            </div>
            :
            <div className={cx('settingSchedule-TaskList')}>
              <div>
                <AiOutlinePlus 
                  size="15" 
                  className={cx('settingschedule-plusIcon')} 
                  onClick={() => {setTaskCheck(true); setMemberCheck(false);}}
                ></AiOutlinePlus>
              </div>
              <div className={cx('settingschedule-thisList')}>{thistask}</div>
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
