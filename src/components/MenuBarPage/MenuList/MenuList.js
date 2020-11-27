import React from 'react';
import MenuItem from './../MenuItem/MenuItem';

const MenuList = ({ leader, lists, Serverlists, nickname, email, accessToken, refreshToken, teamMate, code }) => {
  const menuList = lists.map(
    list => (
      <MenuItem
        id={list.id}
        title={list.title}
        now={list.now}
        ket={list.id}
        lists={Serverlists}
        nickname={nickname} 
        email={email} 
        accessToken={accessToken} 
        refreshToken={refreshToken}
        teamMate={teamMate}
        leader={leader}
        code={code}
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
