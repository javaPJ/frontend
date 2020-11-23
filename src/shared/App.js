import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Main, Signup, Forgot, Schedule, Kanban, Roadmap, Setting, Profile, NotFound } from './../pages';

function App() {
  return (
    <div>
      <Switch>
        <Route path="/" exact component={Main}/>
        <Route path="/signup" component={Signup}/>
        <Route path="/forgot" component={Forgot}/>
        <Route path="/schedule" component={Schedule}/>
        <Route path="/kanban" component={Kanban}/>
        <Route path="/roadmap" component={Roadmap}/>
        <Route path="/setting" component={Setting}/>
        <Route path="/profile" component={Profile}/>
        <Route component={NotFound}/>
      </Switch>
    </div>
  );
}

export default App;
