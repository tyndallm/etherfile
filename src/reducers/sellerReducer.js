import {handleActions} from 'redux-actions';

import {
    loginSellerRequest,
    loginSellerSuccess,
    loginSellerFailure,
    fetchProductsRequest,
    fetchProductsSuccess,
    fetchProductsFailure,
    createProductRequest,
    createProductSuccess,
    createProductFailure,
} from '../actions/sellerActions';

import {
    requestReducer,
    loginSellerSuccessReducer,
    fetchProductsSuccessReducer,
    createProductSuccessReducer,
    failureReducer,
} from './reducerUtil';

const initialState = {
    isFetching: false,
    fetchComplete: false,
    username: '',
    email: '',
    contractAddress: '',
    publicKey: '',
    creator: '',
    created: 0,
    productCount: 0,
    products: [],
}

const loginSuccessReducer = (property) => (state, action) => {
    return Object.assign({}, state, {
        isFetching: false,
        fetchComplete: true,
        username: action.payload.username,
        email: action.payload.email,
        publicKey: action.payload.publicKey,
        creator: action.payload.creator,
        created: action.payload.created,
        productCount: action.payload.productCount,
        contractAddress: action.payload.contractAddress
    });
    
}

export const sellerReducer = handleActions({
    [loginSellerRequest]: requestReducer,
    [loginSellerSuccess]: loginSuccessReducer(),
    [loginSellerFailure]: failureReducer,
    [fetchProductsRequest]: requestReducer,
    [fetchProductsSuccess]: fetchProductsSuccessReducer,
    [fetchProductsFailure]: failureReducer,
    [createProductRequest]: requestReducer,
    [createProductSuccess]: createProductSuccessReducer,
    [createProductFailure]: failureReducer,
}, initialState);