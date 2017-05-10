import React from 'react';
import {Route, IndexRoute} from 'react-router';
import AppContainer from '../containers/appContainer';
import HomeContainer from '../containers/homeContainer';
import LandingContainer from '../containers/landingContainer';
import RegisterContainer from '../containers/registerContainer';

export default () => {
    return (
        <Route path='/' component={AppContainer}>
            <IndexRoute component={LandingContainer}/>
            <Route path="/register" component={RegisterContainer}/>
        </Route>
    )
}