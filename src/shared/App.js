import React from 'react';
import {Route} from 'react-router-dom';
import {Main, signUp} from './../pages/index'

const App = () => {
    return(
        <div>
            <Route exact path="/" component={Main} />
            <Route path="/Join" component={signUp} />
        </div>
    )
};
export default App;