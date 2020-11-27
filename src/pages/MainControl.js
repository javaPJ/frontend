import { useHistory } from 'react-router-dom';

const F5Control = (access, refresh) => {

  let history = useHistory();

  history.push({
    pathname: '/',
    state: {
      accesstoken: access,
      refreshtoken: refresh
    }
  })
}

export default F5Control;