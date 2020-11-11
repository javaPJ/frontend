import React from 'react';
import {Route} from 'react-router-dom';
import {Forgot} from './../pages/index'

const App = () => {
    return(
        <div>
            <Route path="/Join" component={Forgot} />
            
        </div>
    )
};
export default App;