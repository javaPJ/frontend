import React from 'react';
import {Route} from 'react-router-dom';
import {Profile} from './../pages/index'

const App = () => {
    return(
        <div>
            <Route path = '/profile' component = {Profile}/>
            
        </div>
    )
};
export default App;