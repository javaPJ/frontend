import React, { useState } from 'react';
import styles from './ServerCreate.scss';
import classNames from 'classnames/bind';
import { AiOutlineDoubleLeft, AiOutlineClose } from "react-icons/ai";
import { SwatchesPicker } from 'react-color';

const cx = classNames.bind(styles);

const ServerCreate = ({color, colorChange, teamChange, createBack, addServer}) => {
  const [picker, setPicker] = useState(false);

  return (
    <div className={cx('servercreate-back')}>
      <div className={cx('back-button')} onClick={createBack}><AiOutlineDoubleLeft size="40" /></div>
      { picker === false ?
        <div className={cx('color-picker-button')} onClick={() => setPicker(true)}>+</div>
        :
        <div className={cx('color-picker-button')} onClick={() => setPicker(false)}>x</div>
      }
      <div className={cx('color-circle')} style={{backgroundColor: color}}></div>
      { picker === true &&
        <div className={cx('swatches-picker')}><SwatchesPicker color={color} onChangeComplete={colorChange}/></div>
      }
      <input className={cx('teamname-input')} placeHolder="팀의 이름을 입력해주세요." onChange={teamChange}/>
      <button className={cx('team-create')} onClick={addServer}>생성하기</button>
    </div>
  )
}

export default ServerCreate;
