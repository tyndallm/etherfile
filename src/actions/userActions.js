import * as Web3Api from '../api/web3Api';
import {createAction} from 'redux-actions';

export const fetchAccountsRequest = "@@user/FETCH_ACCOUNTS_REQUEST";
export const fetchAccountsSuccess = "@@user/FETCH_ACCOUNTS_SUCCESS";
export const fetchAccountFailure = "@@user/FETCH_ACCOUNTS_FAILURE";
export const selectAccount = "@@user/SELECT_ACCOUNT";
export const checkUserExistsRequest = "@@user/CHECK_USER_EXISTS_REQUEST";
export const checkUserExistsSuccess = "@@user/CHECK_USER_EXISTS_SUCCESS";
export const checkUserExistsFailure = "@@user/CHECK_USER_EXISTS_FAILURE";

export function fetchAccountsAndBalances() {
    return {
        types: [
            fetchAccountsRequest,
            fetchAccountsSuccess,
            fetchAccountFailure,
        ],
        callApi: () => Web3Api.getAccounts(),
        payload: {}
    };
}

export function checkUserExists(userAddress) {
    return {
        types: [
            checkUserExistsRequest,
            checkUserExistsSuccess,
            checkUserExistsFailure
        ],
        callApi: () => Web3Api.checkIfUserExists(userAddress),
        payload: {}
    };
}

export const setSelectedAccount = createAction(selectAccount);