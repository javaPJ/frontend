import React, { useState } from 'react';
import styles from './MainCreate.scss';
import classNames from 'classnames/bind';
import createImg from './../../../../images/create_img.jpg';
import joinImg from './../../../../images/join_img.jpg';
import ServerCreate from './../ServerCreate/ServerCreate.js';
import ServerJoin from './../ServerJoin/ServerJoin.js';

const cx = classNames.bind(styles);

const MainCreate = ({color, colorChange, teamChange, addServer}) => {
  const [create, setCreate] = useState(false);
  const [join, setJoin] = useState(false);

  return (
    <div className={cx('maincreate-back')}>
      { (create == false && join == false) &&
        <div>
          <div className={cx('create-div')}>
            <img className={cx('img')} src={createImg}/>
            <div className={cx('text')}>자신만의 프로젝트를 만들어보세요.</div>
            <button className={cx('button')} style={{backgroundColor: "#FF9696"}} onClick={() => setCreate(true)}>생성하기</button>
          </div>
          <div className={cx('join-div')}>
            <img className={cx('img')} src={joinImg}/>
            <div className={cx('text')}>다른 사람의 프로젝트에 참여해보세요.</div>
            <button className={cx('button')} style={{backgroundColor: "#8D99AE"}} onClick={() => setJoin(true)}>참여하기</button>
          </div>
        </div>
      }
      { create == true &&
        <div>
          <ServerCreate color={color} colorChange={colorChange} teamChange={teamChange} addServer={addServer} createBack={() => setCreate(false)}/>
        </div>
      }
      { join == true &&
        <div>
          <ServerJoin joinBack={() => setJoin(false)}/>
        </div>
      }
    </div>
  )
}

export default MainCreate;
