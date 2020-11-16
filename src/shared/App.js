import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { Schedule, Kanban, Roadmap, Setting, Profile } from './../pages';


function App() {
  return (
    <div>
      <Route path="/schedule" component={Schedule}/>
      <Route path="/kanban" component={Kanban}/>
      <Route path="/roadmap" component={Roadmap}/>
      <Route path="/setting" component={Setting}/>
      <Route path="/profile" component={Profile}/>
    </div>
  );
}

export default App;
