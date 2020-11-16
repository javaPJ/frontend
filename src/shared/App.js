import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { Schedule, Kanban, Roadmap, Setting, Profile } from './../pages';
import {Main, signUp, Forgot, Profile, setProject} from './../pages/index'

const App = () => {
    return(
        <div>
            <Route exact path="/" component={Main} />
            <Route path="/Join" component={signUp} />
            <Route path="/Forgot" component={Forgot} />
      <Route path="/schedule" component={Schedule}/>
      <Route path="/kanban" component={Kanban}/>
      <Route path="/roadmap" component={Roadmap}/>
      <Route path="/setting" component={Setting}/>
      <Route path="/profile" component={Profile}/>
    </div>
  );
}

export default App;