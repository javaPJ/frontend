import React, { useState, useEffect } from 'react';
import styles from './SettingSchedule.scss';
import classNames from 'classnames/bind';

import { AiOutlineClose, AiOutlineDelete, AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";

const cx = classNames.bind(styles);

const SettingSchedule = ({textTitle, settingCancel}) => {
  const [title, setTitle] = useState('');
  const [writer, setWriter] = useState('nickname');

  var today = new Date();

  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth()+1);
  const [day, setDay] = useState(today.getDate());

  const [content, setContent] = useState('');
  const [startDay, setStartDay] = useState('');
  const [endDay, setEndDay] = useState('');

  const [members, setMembers] = useState([]);
  const [memberTarget, setMemberTarget] = useState([]);
  const [memberCheck, setMemberCheck] = useState(false);
  const [thisMember, setThisMember] = useState([]);

  const [tasks, setTasks] = useState([]);
  const [taskTarget, setTaskTarget] = useState([]);
  const [taskCheck, setTaskCheck] = useState(false);
  const [thisTask, setThisTask] = useState([]);

  const [labels, setLabels] = useState(['#FF8080', '#FFD080', '#FFFB80', '#A2FF80', '#80FFE1', '#8880FF', '#EE80FF', '#7D7D7D']);
  const [thisLabel, setThisLabel] = useState('');

  const [height, setHeight] = useState('20px');

  useEffect(() => {
    setTitle(textTitle);
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
  
          for(var i = 0; i < thisMember.length; i++) {
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
        setTasks([
          {key: 1, name: '해야할 일', check: false},
          {key: 2, name: '하는 중', check: false},
          {key: 3, name: '끝난 일', check: false},
        ]);
        return;
      } else {
        setTasks([
          {key: 1, name: '해야할 일', check: false},
          {key: 2, name: '하는 중', check: false},
          {key: 3, name: '끝난 일', check: false},
        ]);

        if(thisTask.length > 0) {
          for(var i = 0; i < tasks.length; i++) {
            for(var j = 0; j< thisTask.length; j++){
              if(tasks[i]['name'] === thisTask[j]['name']){
                tasks.splice(i, 1, {key: i, name: thisTask[j]['name'], check: true});
              }
            }
          }
        }

        const taskName = taskTarget[1];

        const thisCheck = tasks[(parseInt(taskId))-1].check;

        if(thisCheck == false) {
          tasks.splice(parseInt(taskId)-1, 1, {key: parseInt(taskId), name: taskName, check: !thisCheck});

          thisTask.push({key: parseInt(taskId), name: taskName});
        } else {
          tasks.splice(parseInt(taskId)-1, 1, {key: parseInt(taskId), name: taskName, check: !thisCheck});

          for(var i = 0; i < thisTask.length; i++) {
            if(thisTask[i]['name'] === taskName) {
              thisTask.splice(i, 1);
            }
          }
        }
      }

      setTaskTarget([]);

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
        <div className={cx('settingschedule-list-ID')} style={{textDecoration: decoration, color: color}} id={task.key} onClick={(e) => setTaskTarget([e.target.id, e.target.innerText])}>{task.name}</div>
      )
    }
  )

  const thisTaskList = thisTask.map(
    task => {
      return(
        <div className={cx('settingschedule-thisList-ID')}>{task.name}</div>
      )
    }
  )

  const labelCircle = labels.map(
    label => {
      let borderColor = (thisLabel === label) ? "#43454D" : label;
      return(
        <div className={cx('settingschedule-labelCircle')} style={{backgroundColor: label, color: label, border: "3px solid" + borderColor}} onClick={(e) => setThisLabel(label)}>#</div>  
      )
    }
  )

  return (
    <div className={cx('settingschedule-back')}>
      <div className={cx('settingschedule-header')}>
        <div className={cx('settingschedule-icon')}>
          <div className={cx('settingschedule-deleteIcon')}><AiOutlineDelete size="25"></AiOutlineDelete></div>
          <div className={cx('settingschedule-closeIcon')}><AiOutlineClose onClick={settingCancel} size="25"></AiOutlineClose></div>
        </div>
        <div className={cx('settingschedule-title')}>{title}</div>
        <div className={cx('settingschedule-writer-impormation')}>
          <div className={cx('settingschedule-writer')}>작성자 {writer}</div>
          <div className={cx('settingschedule-writeday')}>작성일 {year}-{month}-{day}</div>
        </div>
      </div>
      <div className={cx('settingschedule-content')}>
        <div className={cx('settingschedule-textDiv')}>
          <div className={cx('settingschedule-textTitle')}>내용</div>
          <textarea className={cx('settingschedule-textInput')} style={{height: height}} id="text_content" onKeyDown={() => ySize()} onKeyUp={() => ySize()} onChange={(e) => setContent(e.target.value)} placeHolder="내용을 입력해주세요."></textarea>
        </div>

        <div className={cx('settingschedule-dayDiv')}>
          <div className={cx('settingschedule-dayTitle')}>일정</div>
          <div className={cx('settingschedule-dayContent')}>
            <div className={cx('settingschedule-StartDay')}>시작일</div>
            <input type="date" className={cx('settingschedule-dayInput')} onChange={(e) => setStartDay(e.target.value)}/>
          </div>
          <div className={cx('settingschedule-dayContent')}>
            <div className={cx('settingschedule-EndDay')}>마감일</div>
            <input type="date" className={cx('settingschedule-dayInput')} onChange={(e) => setEndDay(e.target.value)}/>
          </div>
        </div>

        <div className={cx('settingschedule-memberDiv')}>
          <div className={cx('settingschedule-memberTitle')}>배정된 멤버</div>
          { memberCheck === true ?
            <div className={cx('settingSchedule-MemberList')}>
              <div>
                <AiOutlineMinus size="15" className={cx('settingschedule-plusIcon')} onClick={() => setMemberCheck(false)}></AiOutlineMinus>
              </div>
              <div className={cx('settingshedule-listBox')}>
                <div className={cx('settingschedule-list')}>{memberList}</div>
              </div>
              <div className={cx('settingschedule-thisList')}>{thisMemerList}</div>
            </div>
            :
            <div className={cx('settingSchedule-MemberList')}>
              <div>
                <AiOutlinePlus size="15" className={cx('settingschedule-plusIcon')} onClick={() => {setMemberCheck(true);setTaskCheck(false);}}></AiOutlinePlus>
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
                <AiOutlineMinus size="15" className={cx('settingschedule-plusIcon')} onClick={() => setTaskCheck(false)}></AiOutlineMinus>
              </div>
              <div className={cx('settingshedule-listBox')}>
                <div className={cx('settingschedule-list')}>{taskList}</div>
              </div>
              <div className={cx('settingschedule-thisList')}>{thisTaskList}</div>
            </div>
            :
            <div className={cx('settingSchedule-TaskList')}>
              <div>
                <AiOutlinePlus size="15" className={cx('settingschedule-plusIcon')} onClick={() => {setTaskCheck(true); setMemberCheck(false);}}></AiOutlinePlus>
              </div>
              <div className={cx('settingschedule-thisList')}>{thisTaskList}</div>
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
