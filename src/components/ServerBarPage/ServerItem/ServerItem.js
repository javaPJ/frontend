import React, { useState } from 'react';
import styles from './ServerItem.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const ServerItem = ({ color, title, id, bar, online, onClickServer }) => {

  return(
    <div className={cx('serveritem-back')}>
      {bar === true ?
        <div className={cx('serveritem-contents')}>
          { online === true ?
            <div className={cx('serveritem-squre')} style={{backgroundColor: "white"}}></div>
            :
            <div className={cx('serveritem-squre')} style={{backgroundColor: "#343742"}}></div>
          }
          <div className={cx('serveritem-circle')} id={id} style={{backgroundColor: color, color: color}} title={title} onClick={onClickServer}>{id}</div>
        </div>
        :
        <div className={cx('serveritem-contents')}>
          { online === true ?
            <div className={cx('serveritem-squre')} style={{backgroundColor: color}} title={title}></div>
            :
            <div className={cx('serveritem-squre')} style={{borderColor: color, borderStyle: "solid", borderLeft: "0px",  backgroundColor: "#343742"}} title={title}></div>
          }
        </div>
      }
    </div>
  )
}

export default ServerItem;
