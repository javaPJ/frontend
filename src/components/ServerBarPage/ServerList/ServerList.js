import React from 'react';
import ServerItem from './../ServerItem/ServerItem';

const ServerList = ({lists, bar, onClickServer}) => {
  const serverList = lists.map(
    list => (
      <ServerItem
        id={list.id}
        title={list.title}
        color={list.color}
        teamId={list.teamId}
        bar={bar}
        online={list.online}
        onClickServer={onClickServer}
        key={list.id}
      >
      </ServerItem>
    )
  )

  return(
    <div>
      {serverList}
    </div>
  );
}

export default ServerList;
