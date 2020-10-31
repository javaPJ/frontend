import React from 'react';
import { useHistory } from 'react-router-dom';
import styles from './MenuItem.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const MenuItem = ({ id, title, now }) => {
  let history = useHistory();

  const handleMenuSelect = () => {
    switch(id) {
      case 1:
        history.push({
          pathname: '/schedule',
        })
        break;
      case 2:
        history.push({
          pathname: '/kanban',
        })
        break;
      case 3:
        history.push({
          pathname: '/roadmap',
        })
        break;
      case 4:
        history.push({
          pathname: '/setting',
        })
        break;
      default:
        return;
    }
  }
  console.log(now);
  let fontColor = now ? "#EF233C" : "#8D99AE";
  let fontBold = now ? "bold" : "none";

  return(
    <div className={cx('menuitem-back')} onClick={handleMenuSelect}>
        <div className={cx('menuitem-contents')}>
          <div className={cx('menuitem-title')} style={{color: fontColor, fontWeight: fontBold}}>{title}</div>
        </div>
    </div>
  )
}

export default MenuItem;
