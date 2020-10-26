import React, { useState } from 'react';
import styles from './ServerBar.scss';
import classNames from 'classnames/bind';
import ServerList from './../ServerList/ServerList';

const cx = classNames.bind(styles);

const ServerBar = ({lists, createServer, onClickServer}) => {
  const [bar, setBar] = useState(false);

  let size = bar ? "100px" : "35px"

  return(
    <div style={{width:size}} className={cx('serverbar-back')} onClick={() => setBar(!bar)}>
      {bar === true ?
        <div className={cx('serverbar-next')}>
          <ServerList lists={lists} bar={bar} onClickServer={onClickServer}/>
          <button className={cx('plus-server')} onClick={createServer}>+</button>
        </div>
        :
        <div className={cx('serverbar-pre')}>
          <ServerList lists={lists} bar={bar}/>
        </div>
      }
    </div>
  )
}

export default ServerBar;
