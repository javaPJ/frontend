import React from 'react';
import {Route} from 'react-router-dom';
import {Main} from './../pages/index'

const App = () => {
    return(
        <div>
            <Route exact path="/" component={Main} />
        </div>
    )
};
export default App;