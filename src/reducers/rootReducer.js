import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';

import {userReducer} from './userReducer';
import {sellerReducer} from './sellerReducer';

const rootReducer = combineReducers({
    user: userReducer,
    seller: sellerReducer,
    routing: routerReducer,
});

export default rootReducer;
