import React from 'react';
import MenuItem from './../MenuItem/MenuItem';

const MenuList = ({lists, Serverlists}) => {
  const menuList = lists.map(
    list => (
      <MenuItem
        id={list.id}
        title={list.title}
        now={list.now}
        ket={list.id}
        lists={Serverlists}
      >
      </MenuItem>
    )
  )

  return(
    <div>
      {menuList}
    </div>
  );
}

export default MenuList;
