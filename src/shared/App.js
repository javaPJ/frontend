import React from 'react';
import {Route} from 'react-router-dom';
import {signUp} from './../pages/index'

const App = () => {
    return(
        <div>
            <Route path="/Join" component={signUp} />
            
        </div>
    )
};
export default App;