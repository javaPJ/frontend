import React from 'react';
import { Route } from 'react-router-dom';
import { Main, Signup, Forgot, Schedule, Kanban, Roadmap, Setting, Profile, Setproject } from './../pages';

function App() {
  return (
    <div>
      <Route path="/" exact component={Main}/>
      <Route path="/signup" component={Signup}/>
      <Route path="/forgot" component={Forgot}/>
      <Route path="/schedule" component={Schedule}/>
      <Route path="/kanban" component={Kanban}/>
      <Route path="/roadmap" component={Roadmap}/>
      <Route path="/setting" component={Setting}/>
      <Route path="/profile" component={Profile}/>
      <Route path="/setproject" component={Setproject}/>
    </div>
  );
}

export default App;
