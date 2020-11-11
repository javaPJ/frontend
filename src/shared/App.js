import React from 'react';
import {Route} from 'react-router-dom';
import {Main} from './../pages/index'

const App = () => {
    return(
        <div>
            <Route path="/main" component={Main} />
            
        </div>
    )
};
export default App;