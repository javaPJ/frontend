import React from 'react';
import {Route} from 'react-router-dom';
import {Main, signUp, Forgot, Profile, setProject} from './../pages/index'

const App = () => {
    return(
        <div>
            <Route exact path="/" component={Main} />
            <Route path="/Join" component={signUp} />
            <Route path="/Forgot" component={Forgot} />
        </div>
    )
};
export default App;