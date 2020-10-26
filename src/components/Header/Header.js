import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { AiOutlineUser } from 'react-icons/ai';
import styles from './Header.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const Header = ({title}) => {
  let history = useHistory();
  const [user, setUser] = useState(false);

  const handleProfile = () => {
    history.push({
      pathname: '/profile'
    })
  }

  return(
    <div className={cx('header-back')} >
      <div className={cx('header-pre')}>
        <div className={cx('header-name')}>{title}</div>
        <div className={cx('user-contents')} onClick={() => setUser(!user)}>
          <div className={cx('user-name')}>nickname</div>
          <AiOutlineUser size="27" className={cx('user-icon')}/>
        </div>
      </div>
      {user === true &&
        <div className={cx('header-next')}>
          <div className={cx('next-title')}>
            <div className={cx('account')}>Account</div>
          </div>
          <div className={cx('next-contents')}>
            <div className={cx('profile-button')} onClick={handleProfile}>Profile</div>
            <div className={cx('logout-button')}>Log Out</div>
          </div>
        </div>
      }
    </div>
  )
}

export default Header;
