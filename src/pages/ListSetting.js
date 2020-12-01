const axios = require('axios');

export const ListSetting = (serverLists, accesstoken) => {
  var arrays = [];

  for(var i = 0; i < serverLists.length; i++) {
    arrays.push({id: i, team: serverLists[i].teamName});
  }

  const url = `http://3.35.229.52:5000/api/project/readproject`
  
  const headers = {
    headers: {
      Authentication: `${accesstoken}`
    }
  }
  
  var array2 = [];
  var code = '';
  var teammate = [];
  var leader = '';
  var teamId = '';

  const postArray = array => {
    return axios.post(url,{team: array.teamId}, headers)
    .then((res => {
      if (array.id === 0) {
        console.log(res);
        array2.push({ id: array.id+1, title: array.team, teamId: array.teamId, color: res.data[0].color, online: true });
        code = res.data[0].code;
        teammate = res.data[1];
        leader = res.data[0].name;
        teamId = res.data[0].num;
      } else {
        array2.push({ id: array.id+1, title: array.team, teamId: array.teamId, color: res.data[0].color, online: false })
      }
    }))
  }
  
  arrays.reduce((prevPrams, array) => {
    return prevPrams.then(() => {
      return postArray(array)
    })
  }, Promise.resolve())

  return [array2, code , teammate, leader, teamId];
};