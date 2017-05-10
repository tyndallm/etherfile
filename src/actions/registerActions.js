import * as Web3Api from '../api/web3Api';
import {createAction} from 'redux-actions';

export const registerUserRequest = "@@register/REGISTER_USER_REQUEST";
export const registerUserSuccess = "@@register/REGISTER_USER_SUCCESS";
export const registerUserFailure = "@@register/REGISTER_USER_FAILURE";

export function registerUser(userAddress, username) {
    return {
        types: [
            registerUserRequest,
            registerUserSuccess,
            registerUserFailure,
        ],
        callApi: () => Web3Api.registerUser(userAddress, username),
        payload: {}
    };
}
