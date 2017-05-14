import React from 'react';
import {Route, IndexRoute} from 'react-router';
import AppContainer from '../containers/appContainer';
import HomeContainer from '../containers/homeContainer';
import LandingContainer from '../containers/landingContainer';
import RegisterContainer from '../containers/registerContainer';
import DashboardContainer from '../containers/dashboardContainer';
// import UserIsAuthenticated from '../utils/authUtils';

export default () => {
    return (
        <Route path='/' component={AppContainer}>
            <IndexRoute component={LandingContainer}/>
            <Route path="/register" component={RegisterContainer}/>
            <Route path="/dashboard" component={DashboardContainer}/>
        </Route>
    )
}