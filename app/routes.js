import React from 'react';
import { 
    BrowserRouter as Router, 
    Route, 
    Redirect, 
    Switch 
} from 'react-router-dom';

import Home from 'components/home';
import NotFound from 'components/404';

const Routes = (props) => (
    <Router {...props} >
        <div className="main-content">
            <Switch>
                <Route exact path='/' render={() => (
                    <Redirect to='/home'/>
                )}/>
                <Route exact path='/home' render={() => (
                    <Home loggedIn={props.loggedIn}/>
                )} />
                <Route path='*' component={NotFound} />
            </Switch>
        </div>
    </Router>
)

export default Routes;