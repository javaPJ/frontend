import React, { useState, useEffect } from 'react';
import { SwatchesPicker } from 'react-color';
import SetProjectList from './../SetProjectList/SetProjectList';
import styles from './SetProject.scss'
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const SetProject = ({menubar}) => {
    const [projectName, setProjectName] = useState('Project#1'), //프로젝트 이름 변수
          [projectNameClick, setProjectNameClick] = useState(false), //프로젝트 이름 클릭 시 boolean 값
          [projectNameChange, setProjectNameChange] = useState(''), //프로젝트 이름 변경 변수
          [picker, setPicker] = useState(false), //색상 변경 버튼 클릭 시 boolean 값
          [pickerColor, setPickerColor] = useState('#ffffff'),
          [team, setTeam] = useState([
              {id: 1, name: 'unknown#1', email: 'unknown#1@gmail.com', date: '2020-09-11'},
              {id: 2, name: 'unknown#2', email: 'unknown#2@naver.com', date: '2020-09-12'},
              {id: 3, name: 'unknown#3', email: 'unknown#3@gmail.com', date: '2020-09-13'},
              {id: 4, name: 'unknown#4', email: 'unknown#4@naver.com', date: '2020-09-14'},
              {id: 5, name: 'unknown#5', email: 'unknown#5@gmail.com', date: '2020-09-15'},
              {id: 6, name: 'unknown#6', email: 'unknown#6@naver.com', date: '2020-09-16'},
              {id: 7, name: 'unknown#7', email: 'unknown#7@gmail.com', date: '2020-09-17'},
              {id: 8, name: 'unknown#8', email: 'unknown#8@naver.com', date: '2020-09-18'},
              {id: 9, name: 'unknown#9', email: 'unknown#9@gmail.com', date: '2020-09-19'},
              {id: 10, name: 'unknown#10', email: 'unknown#10@naver.com', date: '2020-09-20'},
          ]), //팀원 리스트
          [teamRemove, setTeamRemove] = useState(-1), //member kick 변수
          [listMargin, setListMargin] = useState(''); //list div's bottom margin 변수 값
    
    // color change
    const colorChange = (color) => {
        setPicker(false)
        setPickerColor(color);
    }
    
    //when you change project name, you put the Enter key 
    const handleKeyDown = (e) => {
        if(e.keyCode === 13) {
            setProjectNameClick(false);
            setProjectNameChange(e.target.value);
        }
    }

    //projectName update 
    useEffect(() => {
        if(projectNameChange !== '') {
            setProjectName(projectNameChange);
            setProjectNameChange('');
        }
    }, [projectNameChange])

    //team member remove
    useEffect(() => {
        if(teamRemove !== -1) {
            team.splice(teamRemove-1, 1);

            for(var i=0;i<team.length;i++) {
                team.splice(i,1, {id: i+1, name: team[i].name, email: team[i].email, date: team[i].date});
            }

            setTeamRemove(-1)

            if(team.length > 8) {
                setListMargin("400px");
            } else {
                setListMargin((team.length+1)*51+40+ "px");
            }

        }
    }, [teamRemove])

    let size = menubar ? "450px" : "330px";

    return (
        <div style={{width: "100%", height: "100%", position: "absolute"}}>
            <div style={{left: size}} className={cx('setproject-back')}>
                <div className={cx('setproject-header')}>
                    <div className={cx('setproject-color')}>
                        <div style={{backgroundColor: pickerColor}} className={cx('setproject-color-circle')}></div>
                        { picker===false &&
                            <button style={{marginLeft: "22px"}} className={cx('setproject-color-button')} onClick={() => setPicker(true)}>색상 변경</button>
                        }
                        { picker &&
                            <div className={cx('setproject-color-view')}>
                                <SwatchesPicker color={pickerColor} onChangeComplete={(color) => {setPicker(false);setPickerColor(color.hex)}}/>
                            </div>
                        }
                    </div>
                    <div className={cx('setproject-title')} onClick={() => setProjectNameClick(true)}>
                        { projectNameClick === true ?
                            <input 
                                className={cx('setproject-title-input')}
                                onKeyDown={(e) => handleKeyDown(e)} 
                                autoFocus
                                placeholder={projectName}
                            />
                        :
                            <div className={cx('setproject-title-text')}>{projectName}</div>
                        }
                    </div>
                </div>
                <div style={{marginBottom: listMargin}} className={cx('setproject-list')}>
                    <SetProjectList team={team} handleRemoveMember={(num) => setTeamRemove(num)}/>
                </div>
                <div className={cx('setproject-delete')}>
                    <div className={cx('setproject-delete-text')}>
                        <div className={cx('setproject-delete-text1')}>프로젝트 삭제하기</div>
                        <div className={cx('setproject-delete-text2')}>프로젝트를 삭제하면 다시 되돌릴 수 없습니다. 정말 삭제하시겠습니까?</div>
                    </div>
                    <button className={cx('setproject-delete-button')}>프로젝트 삭제</button>
                </div>
            </div>
        </div>
    );
    
}

export default SetProject; 