import React from 'react';
import {Route} from 'react-router-dom';
import {Main, signUp, Forgot, Profile, setProject} from './../pages/index'

const App = () => {
    return(
        <div>
            <Route path = "/setProject" component = {setProject}/>
        </div>
    )
};
export default App;